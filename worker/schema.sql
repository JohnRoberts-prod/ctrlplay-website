CREATE TABLE IF NOT EXISTS subscribers (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT UNIQUE NOT NULL,
  source     TEXT,
  country    TEXT,
  created_at TEXT NOT NULL
);
