# Royal Group Demo - Access Guide

**Demo Ready for 11am Presentation**

---

## Quick Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Website** | http://192.168.0.234:3001 | Luxury real estate website |
| **n8n Automation** | http://192.168.0.234:5678 | Workflow automation platform |
| **Mautic CRM** | http://192.168.0.234:8081 | Marketing automation & CRM |
| **Traefik Dashboard** | http://192.168.0.234:8080/dashboard/ | Reverse proxy management |
| **Ollama AI** | http://192.168.0.234:11434 | Local AI/LLM (existing) |

---

## Credentials

### n8n (Workflow Automation)
- **URL:** http://192.168.0.234:5678
- **Username:** admin
- **Password:** RoyalDemo2024!

### Mautic CRM (First-time Setup Required)
- **URL:** http://192.168.0.234:8081
- **Database Host:** royal-mariadb
- **Database Name:** mautic
- **Database User:** mautic
- **Database Password:** MauticDemo2024!
- **Admin Email:** jennifer@royalgroup-ev.com (suggest)
- **Admin Password:** RoyalDemo2024! (suggest)

---

## Demo Flow

### 1. Website Tour (http://192.168.0.234:3001)
- Show luxury design matching McLaurin Realty aesthetic
- Navigate through sections: Hero, Properties, About, Stats, Testimonials, Contact
- Highlight AI-powered features mentioned
- Fill out contact form to demonstrate lead capture

### 2. n8n Automation (http://192.168.0.234:5678)
- Log in with credentials above
- Show workflow canvas capability
- Explain how leads flow from website to CRM
- Demonstrate Ollama AI integration (already on this server)
- Show webhook endpoints for real-time processing

### 3. Mautic CRM (http://192.168.0.234:8081)
- Complete first-time setup wizard
- Show contact management
- Demonstrate email campaign builder
- Show landing page builder
- Explain drip campaign automation

### 4. AI Integration
- Ollama is running on http://192.168.0.234:11434
- Available models: llama3.2, qwen2.5-coder, and more
- Demonstrate AI-powered features:
  - Property description generation
  - Smart email responses
  - Lead qualification

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   AI Server (192.168.0.234)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Website   │  │    n8n      │  │        Mautic           │ │
│  │   :3001     │  │   :5678     │  │        :8081            │ │
│  │             │  │             │  │                         │ │
│  │  Next.js    │  │  Workflow   │  │   CRM + Marketing       │ │
│  │  Luxury     │  │  Automation │  │   Automation            │ │
│  │  Design     │  │             │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│         │                │                    │                  │
│         └────────────────┼────────────────────┘                  │
│                          │                                       │
│  ┌─────────────┐  ┌──────┴──────┐  ┌─────────────────────────┐ │
│  │  PostgreSQL │  │   Ollama    │  │        MariaDB          │ │
│  │   (n8n)     │  │   :11434    │  │       (Mautic)          │ │
│  └─────────────┘  │  RTX 3090   │  └─────────────────────────┘ │
│                   │  24GB VRAM  │                               │
│                   └─────────────┘                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Selling Points for Jennifer

### Cost Savings
| Item | Lofty (Current) | Self-Hosted (Monthly) |
|------|-----------------|----------------------|
| CRM Platform | ~$500-800/mo | **$0** |
| Website Hosting | Included | **$0** (existing server) |
| Email Sending | Included | ~$10-30/mo (Amazon SES) |
| **Monthly Total** | **$500-800** | **~$30** |
| **Annual Savings** | - | **$5,640-9,240** |

### Features Included
- Unlimited users (vs. 10 seats on Lofty)
- Unlimited contacts
- Full AI integration with local LLM (privacy preserved)
- Custom luxury design matching brand
- Complete control over data
- No platform lock-in

### AI Capabilities
- Property description generation
- Smart lead scoring
- Automated email personalization
- Website chatbot
- Market analysis summaries

---

## Next Steps After Demo

1. **Get approval** from Jennifer on design direction
2. **Migrate contacts** from Lofty (~500 contacts)
3. **Set up DNS** for royalgroup-ev.com
4. **Configure email** with Amazon SES
5. **Create initial drip campaigns** in Mautic
6. **Train team** on new system

---

## Troubleshooting

### If services aren't accessible:
```bash
ssh dunkin@192.168.0.234
cd /home/dunkin/royal-group-demo
sudo docker compose ps
sudo docker compose logs <service-name>
```

### Restart all services:
```bash
sudo docker compose restart
```

### View container status:
```bash
sudo docker compose ps
```

---

## Technical Notes

- All containers use `royal-` prefix
- Data persisted in Docker volumes
- Network: `royal-group-demo_royal-network`
- Existing Ollama/Open WebUI unaffected

**Deployment Location:** `/home/dunkin/royal-group-demo/`

---

*Demo prepared by AIQSO | December 2024*
