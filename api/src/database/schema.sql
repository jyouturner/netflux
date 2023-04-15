-- src/database/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS shows (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  meta JSONB
);
