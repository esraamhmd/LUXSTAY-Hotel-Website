-- LuxStay database schema
-- Run this once against a fresh database to create the required tables.
-- (The app also runs this automatically on first connection — see src/lib/db.js)
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS), so existing
-- databases pick up new columns automatically on next deploy.

CREATE TABLE IF NOT EXISTS bookings (
  id                SERIAL PRIMARY KEY,
  full_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  country           TEXT,
  check_in          DATE NOT NULL,
  check_out         DATE NOT NULL,
  guests            INTEGER NOT NULL DEFAULT 1,
  room_type         TEXT NOT NULL,
  arrival_time      TEXT,
  message           TEXT,
  status            TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | cancelled
  amount_cents      INTEGER, -- total price charged, in cents
  payment_status    TEXT NOT NULL DEFAULT 'unpaid', -- unpaid | paid | refunded
  stripe_session_id TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Adds these columns automatically if you already had a bookings table from
-- before payments/double-booking were added.
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS amount_cents INTEGER;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_session_id TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS arrival_time TEXT;

CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comments (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text        TEXT NOT NULL,
  image_url   TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE comments ADD COLUMN IF NOT EXISTS image_url TEXT;

CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings (email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_room_dates ON bookings (room_type, check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments (created_at DESC);