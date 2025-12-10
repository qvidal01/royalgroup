# Royal Group Demo Platform - Credentials & Access Guide

## Quick Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Website** | https://royalgroup.aiqso.biz | Main luxury real estate website |
| **CRM (Mautic)** | https://royalgroup-crm.aiqso.biz | Contact management & marketing automation |
| **Automation (n8n)** | https://royalgroup-auto.aiqso.biz | Workflow automation & AI integrations |

---

## Login Credentials

### Mautic CRM
```
URL: https://royalgroup-crm.aiqso.biz
Username: admin
Password: RoyalDemo2024!
Email: admin@royalgroup-ev.com
```

### n8n Automation
```
URL: https://royalgroup-auto.aiqso.biz
Username: admin
Password: RoyalDemo2024!
```

### MinIO Storage (Internal)
```
URL: http://192.168.0.53:9001 (internal network only)
Username: royaladmin
Password: RoyalMinio2024!
```

---

## Infrastructure Details

### Container Information
```
Host: proxmain (192.168.0.165)
Container ID: 600
Container Name: royalgroup-stack
Container IP: 192.168.0.53
Root Password: RoyalDemo2024!
```

### Docker Services
| Service | Container | Internal Port | Status |
|---------|-----------|---------------|--------|
| Website | rg-website | 3001 | Running |
| Mautic CRM | rg-mautic | 8081 | Running |
| n8n Automation | rg-n8n | 5678 | Running |
| PostgreSQL | rg-postgres | 5432 | Running |
| MariaDB | rg-mariadb | 3306 | Running |
| Redis | rg-redis | 6379 | Running |
| MinIO | rg-minio | 9000/9001 | Running |

### Database Credentials

**PostgreSQL (n8n)**
```
Host: rg-postgres
Port: 5432
Database: n8n
Username: royalgroup
Password: RoyalPostgres2024!
```

**MariaDB (Mautic)**
```
Host: rg-mariadb
Port: 3306
Database: mautic
Username: mautic
Password: MauticDemo2024!
```

---

## External Services

### Cloudflare Tunnel
```
Tunnel ID: 200a0350-45ca-4e71-98e4-bada2de9d46f
Tunnel Name: royalgroup-pov
Status: Active
DNS Zone: aiqso.biz
```

### Ollama AI Server
```
Host: 192.168.0.234
Port: 11434
API Endpoint: http://192.168.0.234:11434/api
Recommended Models:
  - quick-responder:latest (fast, 3B params)
  - llama3.2:3b (general purpose)
  - aiqsochat:latest (custom chatbot)
```

---

## Sample Data Loaded

### Contacts (8 sample leads)
| Name | Company | Tags | Score |
|------|---------|------|-------|
| John Smith | Royal Group RE | Royal Group, Buyer, Hot Lead | 90 |
| Sarah Johnson | Royal Group RE | Royal Group, Seller, Warm Lead | 65 |
| Mike Williams | Engel & Völkers | Engel Volkers, Buyer, Golf Properties | 75 |
| Emily Brown | Engel & Völkers | Engel Volkers, Investor, International | 80 |
| David Davis | Royal Group RE | Royal Group, First Time Buyer, Warm Lead | 55 |
| Jennifer Wilson | Engel & Völkers | Engel Volkers, Luxury, Hot Lead | 95 |
| Robert Martinez | Royal Group RE | Royal Group, Relocation, Warm Lead | 60 |
| Lisa Garcia | Engel & Völkers | Engel Volkers, Second Home, Golf Properties | 70 |

### Tags Created (14 total)
- **Company Tags:** Royal Group, Engel Volkers
- **Lead Types:** Buyer, Seller, Investor
- **Lead Scores:** Hot Lead, Warm Lead, Cold Lead
- **Special Interest:** First Time Buyer, Luxury, Golf Properties, International, Relocation, Second Home

### Email Templates (4 total)
1. Welcome New Lead
2. Hot Lead Follow-up
3. Property Alert
4. Market Update

---

## n8n Workflows

### Imported Workflows
1. **01 - Website Lead Capture & AI Qualification**
   - Webhook: /webhook/new-lead
   - AI Lead Scoring via Ollama
   - Status: Active (requires UI activation for webhook)

2. **02 - AI Property Description Generator**
   - Generates luxury property descriptions
   - Status: Inactive (ready to activate)

3. **05 - Website Chatbot Backend**
   - Powers AI chat widget
   - Status: Inactive (ready to activate)

### Activating Workflows
1. Log into n8n at https://royalgroup-auto.aiqso.biz
2. Open the workflow
3. Toggle the "Active" switch in the top-right corner
4. Webhooks will be registered automatically

---

## SSH Access (Internal)

```bash
# From local network
ssh qvidal01@192.168.0.165

# Execute commands in container
sudo pct exec 600 -- bash -c 'COMMAND'

# Access container shell
sudo pct enter 600
```

---

## Common Tasks

### Restart Services
```bash
ssh qvidal01@192.168.0.165 "sudo pct exec 600 -- docker restart rg-mautic"
ssh qvidal01@192.168.0.165 "sudo pct exec 600 -- docker restart rg-n8n"
```

### View Logs
```bash
ssh qvidal01@192.168.0.165 "sudo pct exec 600 -- docker logs rg-mautic --tail=50"
ssh qvidal01@192.168.0.165 "sudo pct exec 600 -- docker logs rg-n8n --tail=50"
```

### Check Service Status
```bash
ssh qvidal01@192.168.0.165 "sudo pct exec 600 -- docker ps --format 'table {{.Names}}\t{{.Status}}'"
```

---

## Security Notes

1. **Demo Environment**: This is a POV (Proof of Value) environment on aiqso.biz
2. **Change Passwords**: All passwords should be changed before production use
3. **Email Configuration**: Email sending requires SMTP setup (Amazon SES recommended)
4. **Backups**: No automated backups configured - implement before production
5. **SSL/TLS**: All external URLs use HTTPS via Cloudflare Tunnel

---

## Support Contacts

**Technical Support:** Quinn Vidal
**Email:** quinn@aiqso.io

---

*Last Updated: December 10, 2025*
*Platform Version: 1.0.0-POV*
