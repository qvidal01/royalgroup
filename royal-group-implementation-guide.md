# Royal Group - Claude Code CLI Implementation Guide

## Quick Start Commands

This guide provides the commands and configurations for deploying Jennifer's real estate solution via Claude Code CLI on your Proxmox infrastructure.

---

## 1. Initial Setup

### Create Project Directory
```bash
mkdir -p ~/projects/royal-group-re
cd ~/projects/royal-group-re
mkdir -p docker/{wordpress,mautic,n8n,ollama,traefik}
mkdir -p configs/{nginx,ssl}
mkdir -p scripts/{backup,migration}
```

### Environment File
```bash
# Create .env file
cat > .env << 'EOF'
# Domain Configuration
DOMAIN=royalgroup-ev.com
WP_DOMAIN=www.royalgroup-ev.com
MAUTIC_DOMAIN=crm.royalgroup-ev.com
N8N_DOMAIN=automation.royalgroup-ev.com

# Database Credentials
MYSQL_ROOT_PASSWORD=$(openssl rand -base64 32)
WP_DB_PASSWORD=$(openssl rand -base64 24)
MAUTIC_DB_PASSWORD=$(openssl rand -base64 24)

# Application Secrets
MAUTIC_SECRET=$(openssl rand -base64 32)
N8N_ENCRYPTION_KEY=$(openssl rand -base64 24)

# Email (Amazon SES)
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-user
SMTP_PASS=your-ses-smtp-pass
SMTP_FROM=noreply@royalgroup-ev.com

# Cloudflare
CF_API_EMAIL=your@email.com
CF_API_KEY=your-cloudflare-api-key
EOF
```

---

## 2. Docker Compose - Full Stack

### Main docker-compose.yml
```yaml
# docker/docker-compose.yml
version: '3.8'

services:
  # ====================
  # REVERSE PROXY
  # ====================
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik/traefik.yml:/etc/traefik/traefik.yml:ro
      - ./traefik/acme.json:/acme.json
    environment:
      - CF_API_EMAIL=${CF_API_EMAIL}
      - CF_API_KEY=${CF_API_KEY}
    networks:
      - frontend

  # ====================
  # DATABASES
  # ====================
  mariadb:
    image: mariadb:10.11
    container_name: mariadb
    restart: unless-stopped
    volumes:
      - mariadb_data:/var/lib/mysql
      - ./configs/mysql/init:/docker-entrypoint-initdb.d
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
    networks:
      - backend
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    networks:
      - backend

  # ====================
  # WORDPRESS
  # ====================
  wordpress:
    image: wordpress:6-php8.2-fpm
    container_name: wordpress
    restart: unless-stopped
    depends_on:
      mariadb:
        condition: service_healthy
    volumes:
      - wordpress_data:/var/www/html
      - ./configs/wordpress/php.ini:/usr/local/etc/php/conf.d/custom.ini
    environment:
      - WORDPRESS_DB_HOST=mariadb
      - WORDPRESS_DB_NAME=wordpress
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=${WP_DB_PASSWORD}
      - WORDPRESS_CONFIG_EXTRA=
          define('WP_REDIS_HOST', 'redis');
          define('WP_CACHE', true);
    networks:
      - frontend
      - backend
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.wordpress.rule=Host(`${WP_DOMAIN}`)"
      - "traefik.http.routers.wordpress.tls.certresolver=cloudflare"

  wordpress-nginx:
    image: nginx:alpine
    container_name: wordpress-nginx
    restart: unless-stopped
    depends_on:
      - wordpress
    volumes:
      - wordpress_data:/var/www/html:ro
      - ./configs/nginx/wordpress.conf:/etc/nginx/conf.d/default.conf:ro
    networks:
      - frontend

  # ====================
  # MAUTIC CRM
  # ====================
  mautic:
    image: mautic/mautic:5-apache
    container_name: mautic
    restart: unless-stopped
    depends_on:
      mariadb:
        condition: service_healthy
    volumes:
      - mautic_data:/var/www/html
    environment:
      - MAUTIC_DB_HOST=mariadb
      - MAUTIC_DB_NAME=mautic
      - MAUTIC_DB_USER=mautic
      - MAUTIC_DB_PASSWORD=${MAUTIC_DB_PASSWORD}
      - MAUTIC_RUN_CRON_JOBS=true
    networks:
      - frontend
      - backend
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.mautic.rule=Host(`${MAUTIC_DOMAIN}`)"
      - "traefik.http.routers.mautic.tls.certresolver=cloudflare"

  # ====================
  # N8N AUTOMATION
  # ====================
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    volumes:
      - n8n_data:/home/node/.n8n
      - ./shared:/data/shared
    environment:
      - N8N_HOST=${N8N_DOMAIN}
      - N8N_PROTOCOL=https
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - WEBHOOK_URL=https://${N8N_DOMAIN}/
      - GENERIC_TIMEZONE=America/Chicago
    networks:
      - frontend
      - backend
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.n8n.rule=Host(`${N8N_DOMAIN}`)"
      - "traefik.http.routers.n8n.tls.certresolver=cloudflare"

  # ====================
  # OLLAMA (AI)
  # ====================
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    restart: unless-stopped
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    networks:
      - backend
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
      interval: 30s
      timeout: 10s
      retries: 3

  # ====================
  # CAL.COM (SCHEDULING)
  # ====================
  calcom:
    image: calcom/cal.com:latest
    container_name: calcom
    restart: unless-stopped
    environment:
      - DATABASE_URL=postgresql://calcom:${CAL_DB_PASS}@postgres:5432/calcom
      - NEXTAUTH_SECRET=${CAL_SECRET}
      - CALENDSO_ENCRYPTION_KEY=${CAL_ENCRYPTION}
    networks:
      - frontend
      - backend
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.calcom.rule=Host(`schedule.${DOMAIN}`)"
      - "traefik.http.routers.calcom.tls.certresolver=cloudflare"

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge

volumes:
  mariadb_data:
  redis_data:
  wordpress_data:
  mautic_data:
  n8n_data:
  ollama_data:
```

---

## 3. Traefik Configuration

### traefik/traefik.yml
```yaml
api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: frontend

certificatesResolvers:
  cloudflare:
    acme:
      email: ${CF_API_EMAIL}
      storage: /acme.json
      dnsChallenge:
        provider: cloudflare
        resolvers:
          - "1.1.1.1:53"
          - "8.8.8.8:53"
```

---

## 4. Database Initialization

### configs/mysql/init/01-create-databases.sql
```sql
-- WordPress Database
CREATE DATABASE IF NOT EXISTS wordpress;
CREATE USER IF NOT EXISTS 'wordpress'@'%' IDENTIFIED BY '${WP_DB_PASSWORD}';
GRANT ALL PRIVILEGES ON wordpress.* TO 'wordpress'@'%';

-- Mautic Database
CREATE DATABASE IF NOT EXISTS mautic;
CREATE USER IF NOT EXISTS 'mautic'@'%' IDENTIFIED BY '${MAUTIC_DB_PASSWORD}';
GRANT ALL PRIVILEGES ON mautic.* TO 'mautic'@'%';

FLUSH PRIVILEGES;
```

---

## 5. Post-Deployment Commands

### Pull AI Models
```bash
# SSH into the Ollama container and pull models
docker exec -it ollama ollama pull llama3.2
docker exec -it ollama ollama pull mistral
docker exec -it ollama ollama pull qwen2.5
```

### WordPress Theme Installation
```bash
# Download and install Houzez theme (requires purchase)
docker exec -it wordpress bash -c "
  cd /var/www/html/wp-content/themes
  # Upload houzez.zip via WordPress admin or wget
  unzip houzez.zip
  chown -R www-data:www-data houzez
"

# Install WP-CLI for easier management
docker exec -it wordpress bash -c "
  curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
  chmod +x wp-cli.phar
  mv wp-cli.phar /usr/local/bin/wp
"

# Activate theme
docker exec -it wordpress wp theme activate houzez --allow-root
```

### Mautic Initial Setup
```bash
# Run Mautic setup
docker exec -it mautic php bin/console mautic:install

# Install cron jobs
docker exec -it mautic bash -c "
  echo '*/5 * * * * php /var/www/html/bin/console mautic:segments:update' >> /etc/crontab
  echo '*/5 * * * * php /var/www/html/bin/console mautic:campaigns:trigger' >> /etc/crontab
  echo '*/15 * * * * php /var/www/html/bin/console mautic:emails:send' >> /etc/crontab
"
```

---

## 6. n8n Workflow Templates

### Workflow 1: New Lead Notification
```json
{
  "name": "New Lead Alert",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "new-lead"
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook"
    },
    {
      "parameters": {
        "model": "llama3.2",
        "prompt": "Generate a brief, professional welcome message for a new real estate lead named {{$json.name}} interested in {{$json.property_type}}"
      },
      "name": "Generate Welcome",
      "type": "n8n-nodes-base.ollama"
    },
    {
      "parameters": {
        "to": "jennifer@royalgroup-ev.com",
        "subject": "New Lead: {{$json.name}}",
        "body": "={{$node['Generate Welcome'].json.response}}"
      },
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend"
    }
  ]
}
```

### Workflow 2: WordPress to Mautic Sync
```json
{
  "name": "WP Form to Mautic",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "wp-form-submission"
      },
      "name": "WPForms Webhook",
      "type": "n8n-nodes-base.webhook"
    },
    {
      "parameters": {
        "operation": "create",
        "email": "={{$json.email}}",
        "firstName": "={{$json.first_name}}",
        "lastName": "={{$json.last_name}}",
        "additionalFields": {
          "phone": "={{$json.phone}}"
        }
      },
      "name": "Create Mautic Contact",
      "type": "n8n-nodes-base.mautic"
    }
  ]
}
```

---

## 7. Backup Script

### scripts/backup/daily-backup.sh
```bash
#!/bin/bash
# Daily backup script

BACKUP_DIR="/mnt/synology/backups/royal-group"
DATE=$(date +%Y-%m-%d)
RETENTION_DAYS=30

# Create backup directory
mkdir -p ${BACKUP_DIR}/${DATE}

# Backup databases
docker exec mariadb mysqldump -u root -p${MYSQL_ROOT_PASSWORD} --all-databases > ${BACKUP_DIR}/${DATE}/mariadb.sql

# Backup WordPress files
docker run --rm -v wordpress_data:/data -v ${BACKUP_DIR}/${DATE}:/backup alpine tar czf /backup/wordpress.tar.gz /data

# Backup Mautic files
docker run --rm -v mautic_data:/data -v ${BACKUP_DIR}/${DATE}:/backup alpine tar czf /backup/mautic.tar.gz /data

# Backup n8n workflows
docker run --rm -v n8n_data:/data -v ${BACKUP_DIR}/${DATE}:/backup alpine tar czf /backup/n8n.tar.gz /data

# Cleanup old backups
find ${BACKUP_DIR} -type d -mtime +${RETENTION_DAYS} -exec rm -rf {} +

echo "Backup completed: ${DATE}"
```

---

## 8. Migration Checklist

### From Lofty to New Stack

```bash
# 1. Export contacts from Lofty (CSV)
# Download via Lofty admin panel

# 2. Import contacts to Mautic
docker exec -it mautic php bin/console mautic:import:contacts /path/to/contacts.csv

# 3. Export website content
# Use WordPress Import/Export or manual content transfer

# 4. Configure DNS (Cloudflare)
# A Record: royalgroup-ev.com → your-server-ip
# CNAME: www → royalgroup-ev.com
# CNAME: crm → royalgroup-ev.com
# CNAME: automation → royalgroup-ev.com
# CNAME: schedule → royalgroup-ev.com

# 5. Test all services
curl -I https://www.royalgroup-ev.com
curl -I https://crm.royalgroup-ev.com
curl -I https://automation.royalgroup-ev.com
```

---

## 9. Monitoring & Health Checks

### scripts/healthcheck.sh
```bash
#!/bin/bash

# Check all services
services=("wordpress" "mautic" "n8n" "ollama" "mariadb" "redis")

for service in "${services[@]}"; do
    if docker ps --filter "name=${service}" --filter "status=running" | grep -q ${service}; then
        echo "✓ ${service} is running"
    else
        echo "✗ ${service} is NOT running"
        # Send alert
        curl -X POST "https://automation.royalgroup-ev.com/webhook/alert" \
             -H "Content-Type: application/json" \
             -d "{\"service\": \"${service}\", \"status\": \"down\"}"
    fi
done
```

---

## 10. Quick Reference URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Website | https://www.royalgroup-ev.com | Public website |
| Mautic | https://crm.royalgroup-ev.com | CRM admin |
| n8n | https://automation.royalgroup-ev.com | Automation workflows |
| Cal.com | https://schedule.royalgroup-ev.com | Appointment booking |
| Traefik | https://traefik.royalgroup-ev.com | Proxy dashboard |

---

## Notes for Claude Code CLI

When implementing via Claude Code CLI:

1. **Start with infrastructure**: Create Proxmox VMs first
2. **Use Docker Compose**: All services containerized for easy management
3. **Test incrementally**: Verify each service before moving to next
4. **Document credentials**: Store in password manager + .env file
5. **Automate backups**: Critical for production readiness

---

*Implementation Guide v1.0*
*Target: Proxmox + Docker deployment*
*GPU: RTX 3090 for Ollama*
