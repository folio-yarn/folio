-- Existing FOLIO. users and projects are preserved.
-- Store password hashes separately from user profiles.

CREATE TABLE IF NOT EXISTS user_passwords (
  user_id TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS user_passwords_updated_at
ON user_passwords(updated_at);
