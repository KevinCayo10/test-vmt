-- Init data for development
-- Creates roles, users and menus per role

-- Enable pgcrypto for bcrypt-style hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Roles
INSERT INTO roles (name)
SELECT 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'ADMIN');

INSERT INTO roles (name)
SELECT 'USER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'USER');

-- Admin user
INSERT INTO users (first_name, last_name, identification, email, username, password, status, failed_attempts, role_id)
SELECT 'Admin', 'System', '0000000000', 'admin@example.com', 'admin', crypt('Admin123!', gen_salt('bf')), 'ACTIVE', 0, r.id
FROM roles r
WHERE r.name = 'ADMIN'
  AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'admin');

-- Regular user
INSERT INTO users (first_name, last_name, identification, email, username, password, status, failed_attempts, role_id)
SELECT 'Regular', 'User', '1111111111', 'user@example.com', 'user', crypt('User123!', gen_salt('bf')), 'ACTIVE', 0, r.id
FROM roles r
WHERE r.name = 'USER'
  AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'user');

-- Menus per role (menus_by_role)
INSERT INTO menus_by_role (name, path, role_id)
SELECT 'Admin Dashboard', '/admin', r.id
FROM roles r
WHERE r.name = 'ADMIN'
  AND NOT EXISTS (SELECT 1 FROM menus_by_role m WHERE m.name = 'Admin Dashboard' AND m.role_id = r.id);

INSERT INTO menus_by_role (name, path, role_id)
SELECT 'User Dashboard', '/home', r.id
FROM roles r
WHERE r.name = 'USER'
  AND NOT EXISTS (SELECT 1 FROM menus_by_role m WHERE m.name = 'User Dashboard' AND m.role_id = r.id);

-- Example additional menu shared
INSERT INTO menus_by_role (name, path, role_id)
SELECT 'Profile', '/profile', r.id
FROM roles r
WHERE r.name IN ('ADMIN','USER')
  AND NOT EXISTS (SELECT 1 FROM menus_by_role m WHERE m.name = 'Profile' AND m.role_id = r.id);

-- Commit
COMMIT;
