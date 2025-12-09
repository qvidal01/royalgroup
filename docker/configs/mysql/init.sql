-- MySQL/MariaDB initialization for Mautic
-- Creates required databases and users

-- Mautic database is created by environment variables
-- This file can contain additional initialization if needed

-- Grant additional privileges
GRANT ALL PRIVILEGES ON mautic.* TO 'mautic'@'%';
FLUSH PRIVILEGES;
