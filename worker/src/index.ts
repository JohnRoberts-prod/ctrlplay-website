export interface Env {
  DB: D1Database;
}

const CORS = {
  'Access-Control-Allow-Origin': 'https://ctrlplay.co.uk',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS });
    }

    let email: string;
    try {
      const body = await request.json() as { email?: unknown };
      email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const country = request.headers.get('CF-IPCountry') ?? null;
    const createdAt = new Date().toISOString();

    try {
      await env.DB.prepare(
        'INSERT INTO subscribers (email, source, country, created_at) VALUES (?, ?, ?, ?)'
      ).bind(email, 'ctrlplay', country, createdAt).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 201, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    } catch (err: unknown) {
      // Duplicate email — treat as success so we don't leak whether an email is registered
      if (err instanceof Error && err.message.includes('UNIQUE')) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200, headers: { ...CORS, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }
  },
};
