# Royal Group Digital Platform

[![GitHub Repository](https://img.shields.io/badge/GitHub-royalgroup-blue?style=flat&logo=github)](https://github.com/qvidal01/royalgroup)
[![Status](https://img.shields.io/badge/Status-Phase%201%20Development-green)]()
[![Target Launch](https://img.shields.io/badge/Target%20Launch-January%202025-orange)]()

> **Client:** Jennifer Holmes | Royal Group | Engel & Volkers
> **Prepared by:** AIQSO - AI-Driven Business Solutions
> **Last Updated:** December 10, 2024

---

## Project Overview

A comprehensive self-hosted digital platform to replace the client's current Lofty CRM system, delivering:

- **Luxury Real Estate Website** - Modern Next.js site with elegant design
- **AI-Powered CRM** - Mautic with local AI integration via Ollama
- **Marketing Automation** - n8n workflows for lead nurturing
- **Team Member Landing Pages** - Individual agent microsites
- **Cost Savings** - From ~$800/mo (Lofty) to ~$30/mo

---

## Quick Links

| Resource | Link |
|----------|------|
| **GitHub Repository** | [qvidal01/royalgroup](https://github.com/qvidal01/royalgroup) |
| **Meeting Summary (12/09/2025)** | [Zoom Meeting Summary](./Zoom%20Meeting%20summary%2012_09_2025.md) |
| **Demo Guide** | [DEMO_GUIDE.md](./DEMO_GUIDE.md) |
| **Full Proposal** | [documentation/JENNIFER_ROYAL_PROPOSAL.md](./documentation/JENNIFER_ROYAL_PROPOSAL.md) |

---

## Current Demo Access

| Service | URL | Credentials |
|---------|-----|-------------|
| **Website** | http://192.168.0.234:3001 | - |
| **Mautic CRM** | http://192.168.0.234:8081 | admin / RoyalDemo2024! |
| **n8n Workflows** | http://192.168.0.234:5678 | admin / RoyalDemo2024! |
| **AI (Ollama)** | http://192.168.0.234:11434 | - |

### Team Member Pages
- [Jennifer D. Holmes](http://192.168.0.234:3001/team/jennifer-holmes.html)
- [Adavien Holmes](http://192.168.0.234:3001/team/adavien-holmes.html)
- [Jill Govan](http://192.168.0.234:3001/team/jill-govan.html)

---

## Project Structure

```
royalgroup/
├── apps/
│   └── web/                          # Next.js 14 Website
│       ├── app/                      # App Router pages
│       │   ├── api/contact/          # Contact form API
│       │   ├── layout.tsx
│       │   └── page.tsx
│       └── components/               # React components
│           ├── Header.tsx
│           ├── Hero.tsx
│           ├── FeaturedProperties.tsx
│           ├── AboutSection.tsx
│           ├── StatsSection.tsx
│           ├── Testimonials.tsx
│           ├── ContactSection.tsx
│           └── Footer.tsx
│
├── docker/                           # Docker Compose configurations
│   ├── docker-compose.yml            # Main stack
│   ├── docker-compose.ai-server.yml  # AI server config
│   ├── configs/                      # Service configurations
│   │   ├── nginx/
│   │   ├── postgres/
│   │   └── mysql/
│   ├── n8n-workflows/                # Automation workflows (6 total)
│   ├── mautic-import/                # CRM import data
│   ├── mautic-templates/             # Email templates
│   └── website-static/               # Static team pages
│       └── team/                     # Individual agent pages
│
├── documentation/                    # Project documentation
│   ├── JENNIFER_ROYAL_PROPOSAL.md    # Client proposal
│   ├── PRICING_GUIDE.md              # Pricing comparison
│   └── CLAUDE_WEBUI_PROMPT.md        # AI chat prompts
│
├── scripts/                          # Deployment scripts
├── DEMO_GUIDE.md                     # Demo walkthrough
├── deploy.sh                         # Deployment script
└── README.md                         # This file
```

---

## Tech Stack

### Current Implementation (Phase 1)

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Frontend** | Next.js | 14.2.15 | React framework |
| **Styling** | Tailwind CSS | 3.4.14 | Utility-first CSS |
| **Icons** | Lucide React | 0.454.0 | Icon library |
| **CRM** | Mautic | 5.x | Marketing automation |
| **Automation** | n8n | Latest | Workflow automation |
| **AI/LLM** | Ollama | Latest | Local AI (Llama 3.2, Qwen 2.5) |
| **Database** | PostgreSQL/MariaDB | 16/10.11 | Data storage |
| **Cache** | Redis | 7.x | Session/cache |
| **Storage** | MinIO | Latest | S3-compatible storage |
| **Reverse Proxy** | Traefik | 2.10 | SSL/routing |

### Recommended Enhancements (Phase 2+)

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **CMS** | Payload CMS 3.0 | Native Next.js, code-first, self-hosted |
| **CRM Alternative** | Twenty CRM | Modern TypeScript CRM, Notion-like UX |
| **Email** | React Email + Amazon SES | Beautiful templates, high deliverability |
| **Calendar** | Cal.com | Self-hosted scheduling |
| **Analytics** | Plausible/Umami | Privacy-focused, self-hosted |
| **IDX Integration** | RESO Web API | MLS data integration |

---

## n8n Automation Workflows

| # | Workflow | Description | Use Case |
|---|----------|-------------|----------|
| 01 | Website Lead Capture | Webhook receives leads, AI scores Hot/Warm/Cold | AI qualification |
| 02 | AI Property Description | Send property details, get luxury listing copy | Content generation |
| 03 | AI Email Responder | Draft professional email responses | Time saver |
| 04 | Market Analysis | Generate neighborhood market reports | AI insights |
| 05 | Chatbot Backend | Powers website chat with property knowledge | 24/7 engagement |
| 06 | Scheduled Follow-up | Every 4 hours, generates follow-up reminders | Automation |

---

## Implementation Phases

### Phase 1: Foundation (Current - January 2025)
**Target: January go-live with 2-week overlap period**

- [x] Demo website with luxury design
- [x] Mautic CRM setup with demo contacts
- [x] n8n workflows (6 automated processes)
- [x] AI integration with Ollama
- [x] Team member landing pages (3 agents)
- [ ] **Waiting on client:**
  - [ ] Brand package (Canva or zip file)
  - [ ] Current landing page templates
  - [ ] List of repetitive tasks for automation
  - [ ] Phase/priority approach preferences

### Phase 2: Website Polish & Landing Pages (January)
**From meeting: "Start with basic website updates and landing pages"**

- [ ] Apply actual brand colors and fonts
- [ ] Add real team photos
- [ ] Golf landing page (client requested)
- [ ] International properties landing page
- [ ] Team member subdomains
- [ ] IDX/MLS integration research

### Phase 3: CRM Migration & Automation (January-February)
**From meeting: "Research alternative CRM tools"**

- [ ] Export contacts from Lofty (~500 contacts)
- [ ] Import to Mautic with field mapping
- [ ] Configure drip campaigns
- [ ] Set up email sending (Amazon SES)
- [ ] DNS configuration for royalgroup-ev.com
- [ ] Evaluate Twenty CRM as alternative

### Phase 4: AI Enhancement (February)
**From meeting: "Gamified first-time home ownership experience"**

- [ ] Enhanced AI chatbot with property knowledge
- [ ] First-time homebuyer educational content
- [ ] AI-powered market reports
- [ ] Smart lead scoring refinement
- [ ] Google NotebookLM integration for content

### Phase 5: Advanced Features (Post-Launch)
- [ ] Backend failover system for local "black box" server
- [ ] Site tracking/analytics migration
- [ ] Team training (CRM: 2-3 hours, Admin: 2 hours)
- [ ] Canva/social media integration investigation

---

## Action Items from 12/09 Meeting

### Quinn (Developer) Tasks
- [x] Create development website for review
- [ ] Research alternative open-source CRM tools
- [ ] Investigate site tracking/analytics options
- [ ] Prepare list of required credentials for migration
- [ ] Build backend failover notification system
- [ ] Send meeting invite and summary

### Holmes (Client) Tasks
- [ ] Review n8n automation workflows
- [ ] Send landing page templates and brand package
- [ ] Compile list of repetitive tasks for automation
- [ ] Provide phase/priority approach for features
- [ ] Stop sharing current landing page templates (send finals)
- [ ] Send communication to contacts announcing new website (at launch)

### Joint Tasks
- [ ] Schedule follow-up meeting (target: Tuesday)
- [ ] Review tool selection
- [ ] Plan migration and automation details

---

## Cost Comparison

| Item | Lofty (Current) | Self-Hosted |
|------|-----------------|-------------|
| CRM Platform | $500-800/mo | **$0** |
| Website Hosting | Included | **$0** |
| AI Features | Extra cost | **$0** |
| Email Sending | Included | ~$10-30/mo |
| Users/Seats | 10 | **Unlimited** |
| Contacts | Limited | **Unlimited** |
| **Monthly Total** | **$600-1,000** | **~$30** |
| **Annual Savings** | - | **$6,840-11,640** |

---

## Development

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/qvidal01/royalgroup.git
cd royalgroup

# Install dependencies
cd apps/web
npm install

# Start development server
npm run dev
```

### Docker Deployment
```bash
# Navigate to docker directory
cd docker

# Copy and configure environment
cp .env.example .env
# Edit .env with your values

# Start all services
docker compose up -d

# View logs
docker compose logs -f
```

### Useful Commands
```bash
# Check service status
docker compose ps

# Restart specific service
docker compose restart mautic

# Pull AI models
docker exec ollama ollama pull llama3.2

# Backup databases
./scripts/backup/daily-backup.sh
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   AI Server (192.168.0.234)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Website   │  │    n8n      │  │        Mautic           │ │
│  │   :3001     │  │   :5678     │  │        :8081            │ │
│  │             │  │             │  │                         │ │
│  │  Next.js    │  │  Workflow   │  │   CRM + Marketing       │ │
│  │  React/TS   │  │  Automation │  │   Automation            │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│         │                │                    │                 │
│         └────────────────┼────────────────────┘                 │
│                          ▼                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  PostgreSQL │  │   Ollama    │  │        MariaDB          │ │
│  │   (n8n)     │  │   :11434    │  │       (Mautic)          │ │
│  │             │  │  RTX 3090   │  │                         │ │
│  │             │  │  24GB VRAM  │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Resources

### Documentation
- [Full Proposal](./documentation/JENNIFER_ROYAL_PROPOSAL.md)
- [Demo Guide](./DEMO_GUIDE.md)
- [Pricing Guide](./documentation/PRICING_GUIDE.md)
- [Next.js Solution Architecture](./royal-group-nextjs-solution.md)
- [Implementation Guide](./royal-group-implementation-guide.md)
- [Tech Stack Recommendations](./documentation/TECH_STACK_RECOMMENDATIONS.md) *(NEW)*
- [Next Phase Approach](./documentation/NEXT_PHASE_APPROACH.md) *(NEW)*

### Meeting Notes
- [12/09/2025 Zoom Meeting Summary](./Zoom%20Meeting%20summary%2012_09_2025.md)

### External References
- [Mautic Documentation](https://docs.mautic.org/)
- [n8n Documentation](https://docs.n8n.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Ollama Documentation](https://ollama.ai/docs)

---

## Support

For questions or issues, contact:
- **Developer:** Quinn @ AIQSO
- **GitHub Issues:** [royalgroup/issues](https://github.com/qvidal01/royalgroup/issues)

---

*Royal Group Digital Platform - Powered by AIQSO*
*Target Launch: January 2025*
