# Royal Group Real Estate - Self-Hosted Solution Proposal

## Executive Summary

This document outlines a comprehensive self-hosted technology stack to replace Jennifer's current Lofty (formerly Chime) CRM and website solution. The proposed architecture delivers:

- **Luxe, elegant website design** (matching McLaurin Realty Group aesthetic)
- **Full-featured CRM with AI capabilities**
- **Drip campaigns and marketing automation**
- **Landing pages and form builders**
- **Team member microsites with centralized admin**
- **Newsletter and retargeting capabilities**
- **Email and calendar integration**

**Deployment Target:** Proxmox environment with RTX 3090 GPU support for local AI

---

## Client Requirements Analysis

| Requirement | Current (Lofty) | Proposed Solution |
|-------------|-----------------|-------------------|
| Users/Seats | 10 | Unlimited (self-hosted) |
| Contacts | ~500+ | Unlimited |
| CRM with AI | Limited templates | Mautic + Local LLM via n8n |
| Landing Pages | Template-based, "bland" | WordPress + Elementor (luxury themes) |
| Drip Campaigns | Complex, unused | Mautic (visual campaign builder) |
| Forms | Google Forms external | Native form builder (Mautic/WPForms) |
| Newsletter Retargeting | Difficult to use | Listmonk or Mautic campaigns |
| Team Member Pages | Lofty subdomain | WordPress multisite or custom pages |
| Email Integration | Basic | n8n automation + SMTP |
| Calendar Integration | Basic | Cal.com (self-hosted) or n8n sync |

---

## Proposed Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PROXMOX HOST                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────┐    ┌──────────────────────┐                   │
│  │   VM: Web Frontend   │    │   VM: CRM/Marketing  │                   │
│  │                      │    │                      │                   │
│  │  - WordPress         │    │  - Mautic            │                   │
│  │  - Houzez/Real       │    │  - Contact Mgmt      │                   │
│  │    Estate 7 Theme    │    │  - Drip Campaigns    │                   │
│  │  - Elementor Pro     │    │  - Landing Pages     │                   │
│  │  - WPForms           │    │  - Lead Scoring      │                   │
│  │  - Nginx/Caddy       │    │  - Forms             │                   │
│  │                      │    │                      │                   │
│  └──────────┬───────────┘    └──────────┬───────────┘                   │
│             │                           │                                │
│             └───────────┬───────────────┘                                │
│                         ▼                                                │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    VM: Automation & AI                            │   │
│  │                                                                   │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │   │
│  │  │    n8n      │  │   Ollama    │  │      PostgreSQL         │  │   │
│  │  │  Workflow   │◄─┤  Local LLM  │  │   (Shared Database)     │  │   │
│  │  │  Automation │  │  (RTX 3090) │  │                         │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │   │
│  │                                                                   │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │   │
│  │  │  Listmonk   │  │  Cal.com    │  │      Redis Cache        │  │   │
│  │  │ Newsletter  │  │  Calendar   │  │                         │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    Shared Services                                │   │
│  │  - Traefik/Nginx Proxy Manager (reverse proxy + SSL)             │   │
│  │  - Synology NAS (media storage, backups)                         │   │
│  │  - Cloudflare (DNS, CDN, SSL certificates)                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Website Platform: WordPress + Luxury Theme

**Why WordPress:**
- The McLaurin Realty Group site Jennifer admires uses WordPress (Blok/Agenta theme)
- Massive ecosystem of real estate plugins and themes
- Full control over design and customization
- Self-hosted = no monthly platform fees

**Recommended Themes (Luxury Real Estate):**

| Theme | Price | Key Features | Notes |
|-------|-------|--------------|-------|
| **Houzez** | $69 | Drag-drop builder, CRM features, agent management | Best overall for real estate |
| **Real Estate 7** | $79 | Built-in CRM, AI chat, home valuations | Includes conversational AI |
| **WP Residence** | $59 | Virtual tours, agent dashboards | 35% higher mobile engagement |
| **Flavor Theme (Flavor + Flavor Theme Kit)** | $99 | Premium look, highly customizable | Matches McLaurin aesthetic |

**Recommended Stack:**
```bash
# WordPress + Theme Installation
WordPress 6.x
├── Theme: Houzez or Real Estate 7
├── Elementor Pro (page builder)
├── WPForms Pro (forms - replaces Google Forms)
├── Yoast SEO
├── WP Rocket (caching)
├── Wordfence (security)
└── UpdraftPlus (backups to Synology)
```

**Design Goals (Matching McLaurin Aesthetic):**
- Clean typography (serif headers, sans-serif body)
- Generous white space
- Full-width hero images with parallax
- Testimonial carousels
- "By the Numbers" statistics sections
- Elegant neighborhood guides
- Soft color palette (creams, golds, deep blues)

---

### 2. CRM & Marketing Automation: Mautic

**Why Mautic:**
- Open-source, self-hosted = complete data control
- Full-featured marketing automation (rivals HubSpot)
- Visual campaign builder for drip campaigns
- Built-in landing page builder
- Lead scoring and contact management
- REST API for integrations
- Unlimited users at no extra cost

**Key Features Jennifer Needs:**

| Feature | Mautic Capability |
|---------|-------------------|
| AI Templates & Smart Plans | Pre-built campaign templates + custom workflows |
| Drip Campaigns | Visual drag-drop campaign builder |
| Landing Pages | Built-in page builder (or use WordPress) |
| Form Builder | Native forms with progressive profiling |
| Contact Retargeting | Dynamic segments + automated emails |
| Team Lead Routing | Lead scoring + assignment rules |
| Email Templates | WYSIWYG editor + template library |

**Mautic Docker Deployment:**
```yaml
# docker-compose.yml for Mautic
version: '3.8'
services:
  mautic:
    image: mautic/mautic:latest
    ports:
      - "8080:80"
    volumes:
      - mautic_data:/var/www/html
    environment:
      - MAUTIC_DB_HOST=db
      - MAUTIC_DB_NAME=mautic
      - MAUTIC_DB_USER=mautic
      - MAUTIC_DB_PASSWORD=${DB_PASSWORD}
    depends_on:
      - db

  db:
    image: mysql:8.0
    volumes:
      - mysql_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=mautic
      - MYSQL_USER=mautic
      - MYSQL_PASSWORD=${DB_PASSWORD}

volumes:
  mautic_data:
  mysql_data:
```

---

### 3. AI-Powered Automation: n8n + Ollama

**Why n8n:**
- Self-hosted workflow automation (like Zapier)
- 400+ integrations
- Native AI/LLM nodes
- Connects Mautic, WordPress, email, calendar
- Visual workflow builder

**Why Ollama (Local AI):**
- Runs on RTX 3090 GPU
- Private, no data leaves your infrastructure
- Models: Llama 3.2, Mistral, Qwen 2.5
- Provides AI features for CRM (smart replies, content generation)

**AI Use Cases for Real Estate CRM:**

| Use Case | Implementation |
|----------|---------------|
| Smart email drafts | n8n triggers Ollama to generate personalized follow-ups |
| Lead scoring assistance | AI analyzes contact behavior patterns |
| Property description generation | AI generates listing copy from keywords |
| Chat assistant | Embedded AI chat for website visitors |
| Newsletter content | AI-assisted content suggestions |

**n8n + Ollama Docker Setup:**
```yaml
# Self-hosted AI Starter Kit
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_SECURE_COOKIE=false

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  qdrant:  # Vector database for RAG
    image: qdrant/qdrant
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage
```

---

### 4. Newsletter System: Listmonk

**Why Listmonk:**
- Single binary, minimal resources
- Self-hosted email campaigns
- Template builder (HTML/WYSIWYG)
- Subscriber management and segmentation
- Campaign analytics
- Multi-SMTP support
- API for automation

**Listmonk vs Mautic Email:**
- Use **Mautic** for: automated drip campaigns, behavioral triggers
- Use **Listmonk** for: one-off newsletters, announcements, mass communications

**Alternative:** Keep all email in Mautic for simplicity (Jennifer's preference for "simple and user-friendly")

---

### 5. Calendar Integration: Cal.com

**Why Cal.com:**
- Self-hosted scheduling (like Calendly)
- Team scheduling with round-robin
- Email/calendar sync (Google, Outlook)
- Booking pages for agents
- Embeddable widgets

```yaml
# Cal.com Docker
services:
  calcom:
    image: calcom/cal.com
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://cal:password@postgres:5432/calcom
      - NEXTAUTH_SECRET=${SECRET}
```

---

### 6. Team Member Microsites

**Two Approaches:**

**Option A: WordPress Multisite**
- Single WordPress installation
- Each agent gets subdomain: `jordan.royalgroup-ev.com`
- Shared theme, individual customization
- Centralized admin control

**Option B: Theme Agent Profiles (Recommended)**
- Houzez/Real Estate 7 have built-in agent profiles
- Each agent has dedicated profile page
- Agent-specific lead capture forms
- Leads route to master admin
- Much simpler to manage

**Lead Routing Flow:**
```
Website Form → Mautic → n8n Workflow → Assign to Agent → Notify via Email/Slack
                ↓
         Lead Scoring
                ↓
         Admin Dashboard
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Proxmox VM setup (WordPress, Mautic, n8n VMs)
- [ ] PostgreSQL database cluster
- [ ] Reverse proxy (Traefik/Nginx Proxy Manager)
- [ ] SSL certificates via Cloudflare

### Phase 2: Website (Week 2-3)
- [ ] WordPress installation
- [ ] Theme installation and configuration (Houzez recommended)
- [ ] Design customization (luxury aesthetic)
- [ ] Content migration from Lofty
- [ ] Form builder setup (replace Google Forms)
- [ ] Team member profiles/pages

### Phase 3: CRM & Marketing (Week 3-4)
- [ ] Mautic installation and configuration
- [ ] Contact import from Lofty (~500 contacts)
- [ ] Email template creation
- [ ] Drip campaign setup (3-5 initial campaigns)
- [ ] Lead scoring configuration
- [ ] Landing page templates

### Phase 4: AI & Automation (Week 4-5)
- [ ] n8n deployment
- [ ] Ollama setup with RTX 3090
- [ ] AI workflow creation (smart replies, content assist)
- [ ] WordPress ↔ Mautic integration
- [ ] Email/calendar sync workflows

### Phase 5: Testing & Launch (Week 5-6)
- [ ] End-to-end testing
- [ ] Team training
- [ ] Soft launch (parallel operation with Lofty)
- [ ] DNS cutover to new website
- [ ] Lofty cancellation

---

## Cost Comparison

| Item | Lofty (Current) | Self-Hosted (Monthly) |
|------|-----------------|----------------------|
| CRM Platform | ~$500-800/mo | $0 |
| Website Hosting | Included | $0 (Proxmox) |
| Email Sending | Included | ~$10-30/mo (Amazon SES) |
| Theme (one-time) | N/A | $69-99 |
| Plugins (one-time) | N/A | ~$200-400 |
| **Monthly Total** | **$500-800** | **~$30** |
| **Annual Savings** | - | **$5,640-9,240** |

---

## Technical Requirements

### Proxmox VM Specifications

| VM | vCPUs | RAM | Storage | Purpose |
|----|-------|-----|---------|---------|
| web-frontend | 4 | 8GB | 100GB | WordPress, Nginx |
| crm-marketing | 4 | 8GB | 100GB | Mautic, MariaDB |
| automation-ai | 8 | 32GB | 200GB | n8n, Ollama (GPU passthrough) |
| database | 2 | 4GB | 100GB | PostgreSQL, Redis |

### GPU Passthrough for AI
```bash
# Enable IOMMU in BIOS
# Edit /etc/default/grub
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"

# Add GPU to VM
qm set <vmid> -hostpci0 <pci-address>,pcie=1,x-vga=1
```

---

## Claude Code CLI Implementation Notes

For deployment via Claude Code, the recommended approach:

1. **Create infrastructure-as-code:**
```bash
# Create Proxmox Terraform configs
mkdir royal-group-infra
cd royal-group-infra

# Key files to create:
# - main.tf (Proxmox provider, VM definitions)
# - docker-compose/ (service compositions)
# - ansible/ (configuration playbooks)
```

2. **Docker Compose for each service stack**
3. **Ansible playbooks for configuration**
4. **Backup scripts to Synology NAS**

---

## Recommendations Summary

| Component | Recommendation | Rationale |
|-----------|---------------|-----------|
| Website | WordPress + Houzez theme | Matches McLaurin aesthetic, agent management built-in |
| CRM | Mautic | Full-featured, visual campaigns, unlimited users |
| Automation | n8n | Connects everything, AI-ready |
| AI | Ollama + Llama 3.2 | Local, private, uses existing RTX 3090 |
| Email | Amazon SES + Mautic | Cost-effective, high deliverability |
| Calendar | Cal.com or n8n sync | Self-hosted scheduling |
| Newsletter | Mautic (built-in) | Keep stack simple |

---

## Next Steps

1. **Schedule discovery call** to confirm requirements
2. **Create mockup** (as promised in conversation)
3. **Get access to current Lofty data** for migration planning
4. **Confirm timeline** - targeting January 1st launch
5. **Begin Phase 1** infrastructure setup

---

## Appendix A: WordPress Plugin Stack

```
# Core Plugins
wordpress-core/
├── houzez-theme/                    # Premium real estate theme
├── elementor-pro/                   # Page builder
├── houzez-theme-functionality/      # Theme extensions
│
# Forms & Lead Capture
├── wpforms-pro/                     # Replace Google Forms
├── forminator/                      # Alternative form builder
│
# SEO & Performance
├── yoast-seo/                       # SEO optimization
├── wp-rocket/                       # Caching
├── imagify/                         # Image optimization
│
# Security & Backup
├── wordfence/                       # Security
├── updraftplus-premium/             # Backups to Synology
│
# Integration
├── mautic-integration/              # CRM sync
├── webhook-integration/             # n8n triggers
└── google-analytics/                # Analytics
```

---

## Appendix B: Mautic Campaign Templates

### Template 1: New Lead Welcome Sequence
```
Trigger: New contact added
├── Day 0: Welcome email + property search guide
├── Day 2: Featured listings email
├── Day 5: Buyer/Seller guide download offer
├── Day 7: Agent introduction email
└── Day 14: Market report subscription offer
```

### Template 2: Listing Alert Sequence
```
Trigger: Contact searches specific area
├── Immediate: Matching listings email
├── Day 3: Similar properties email
├── Day 7: Price reduction alerts
└── Ongoing: Weekly market updates
```

### Template 3: Nurture Campaign
```
Trigger: Downloaded resource
├── Day 1: Thank you + related content
├── Day 7: Market insights
├── Day 14: Success stories
├── Day 21: Consultation offer
└── Day 30: Re-engagement email
```

---

*Document prepared by AIQSO for Royal Group | Engel & Völkers*  
*Deployment target: Proxmox homelab with RTX 3090 GPU*  
*Timeline: Before January 1, 2025*
