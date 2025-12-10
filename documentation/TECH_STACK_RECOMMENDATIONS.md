# Royal Group - Tech Stack Recommendations

> **Updated:** December 10, 2024
> **Based on:** Client meeting 12/09/2024

---

## Executive Summary

Based on the meeting discussion, the recommended approach is a **phased implementation** starting with the current Next.js + Mautic stack, with options to enhance or migrate specific components as needs evolve.

### Key Client Requirements (from meeting)
- Professional luxury website as foundation for client acquisition
- Landing pages: Golf, International Properties, Team Member subdomains
- Gamified first-time home ownership experience
- Automation for repetitive tasks
- CRM that's "simple and user-friendly"
- Cost savings vs. current Lofty CRM

---

## Recommended Tech Stack

### Tier 1: Core Stack (Current - Ready to Deploy)

| Component | Technology | Status | Notes |
|-----------|------------|--------|-------|
| **Frontend** | Next.js 14 | Implemented | TypeScript, App Router |
| **Styling** | Tailwind CSS 3.4 | Implemented | Utility-first, responsive |
| **CRM** | Mautic 5 | Implemented | Open-source, self-hosted |
| **Automation** | n8n | Implemented | Visual workflow builder |
| **AI/LLM** | Ollama | Implemented | Local, RTX 3090 GPU |
| **Database** | PostgreSQL 16 | Implemented | Primary data store |
| **Cache** | Redis 7 | Implemented | Sessions, caching |
| **Proxy** | Traefik 2.10 | Implemented | SSL, routing |

**Recommendation:** Continue with this stack for Phase 1 (January launch).

---

### Tier 2: Recommended Enhancements (Phase 2-3)

#### CRM Alternatives Research

Per meeting: *"Quinn to research alternative open source CRM tools"*

| CRM | Pros | Cons | Best For |
|-----|------|------|----------|
| **Mautic** (current) | Full marketing automation, visual campaigns, landing pages | Learning curve, PHP-based | Marketing-heavy workflows |
| **Twenty CRM** | Modern UI (Notion-like), TypeScript, GraphQL API | Newer, less mature | Teams wanting simple UX |
| **ERPNext CRM** | Full business suite, invoicing, inventory | Overkill for real estate | Larger operations |
| **SuiteCRM** | Salesforce alternative, mature | Dated UI | Enterprise needs |
| **Odoo CRM** | Modular, 30+ apps | Complexity | Growing businesses |

**Recommendation:** Start with Mautic. If client finds it complex, consider Twenty CRM for its modern, intuitive interface. Twenty CRM can be deployed alongside Mautic for evaluation.

```bash
# Deploy Twenty CRM for evaluation
docker run -d -p 3001:3000 \
  -e DATABASE_URL=postgresql://twenty:pass@postgres:5432/twenty \
  twentycrm/twenty:latest
```

#### Content Management (Phase 2)

| Option | Description | Recommendation |
|--------|-------------|----------------|
| **Payload CMS** | Headless CMS, native Next.js | Best for developer control |
| **Strapi** | Popular headless CMS | Good balance of features |
| **Sanity** | Real-time collaboration | Best for team editing |
| **WordPress (headless)** | Familiar to many | If client prefers WordPress |

**Recommendation:** Payload CMS 3.0 - installs directly into Next.js app folder, TypeScript-first, self-hosted.

---

### Tier 3: Feature-Specific Recommendations

#### Landing Pages (Client Priority)

**Requested:** Golf, International Properties, Team Subdomains

| Approach | Implementation | Effort |
|----------|---------------|--------|
| **Static Pages** | Next.js static routes | Low |
| **CMS-Managed** | Payload/Strapi + templates | Medium |
| **Mautic Landing Pages** | Built-in page builder | Low |

**Recommendation:** Hybrid approach
- Use Next.js for main site and team pages
- Use Mautic landing page builder for campaign-specific pages (golf, international)
- Subdomains handled via Traefik routing

```
# Subdomain structure
jennifer.royalgroup-ev.com  → /team/jennifer-holmes
adavien.royalgroup-ev.com   → /team/adavien-holmes
golf.royalgroup-ev.com      → Mautic landing page
international.royalgroup-ev.com → Mautic landing page
```

#### Calendar/Scheduling

**Options:**
| Tool | Type | Cost | Features |
|------|------|------|----------|
| **Cal.com** | Self-hosted | Free | Full control, team scheduling |
| **Calendly** | SaaS | $10-15/user | Simple, well-known |
| **n8n + Google Calendar** | Integration | Free | Custom workflows |

**Recommendation:** Cal.com (self-hosted) - already in Docker stack, free, professional.

#### Analytics/Tracking

Per meeting: *"Investigate site tracking/analytics and migration from current CRM"*

| Tool | Type | Privacy | Cost |
|------|------|---------|------|
| **Mautic Tracking** | Built-in | Self-hosted | Free |
| **Plausible** | Self-hosted | Privacy-focused | Free |
| **Umami** | Self-hosted | Privacy-focused | Free |
| **Google Analytics 4** | SaaS | Google data | Free |
| **Fathom** | SaaS | Privacy-focused | $14/mo |

**Recommendation:**
1. Use Mautic's built-in tracking for lead behavior
2. Add Plausible/Umami for website analytics (privacy-focused, GDPR compliant)
3. Keep GA4 as backup if client needs it

#### Email Sending

| Provider | Cost | Deliverability | Notes |
|----------|------|----------------|-------|
| **Amazon SES** | $0.10/1000 emails | Excellent | Best value |
| **SendGrid** | Free tier (100/day) | Good | Easy setup |
| **Mailgun** | $0.80/1000 emails | Excellent | Good API |
| **Resend** | $0.10/1000 emails | Good | Modern API |

**Recommendation:** Amazon SES - highest deliverability, lowest cost, already have AWS access.

---

### AI/ML Integrations

Per meeting: *"Gamified first-time home ownership experience"*

#### Current AI Capabilities (Ollama)
- Property description generation
- Email response drafting
- Lead scoring
- Market analysis
- Chatbot responses

#### Recommended AI Enhancements

| Feature | Implementation | Priority |
|---------|---------------|----------|
| **First-Time Buyer Quiz** | Next.js + Ollama flow | High |
| **Property Matching** | Vector search + LLM | Medium |
| **Market Report Generator** | n8n workflow + AI | High |
| **Social Content Generator** | n8n + Canva API | Medium |

**Gamified First-Time Buyer Experience:**
```
1. Interactive Quiz → Qualifies buyer
2. AI Generates Personalized Journey Map
3. Progress Tracker (milestone badges)
4. Educational Content Library
5. Budget Calculator with AI Advice
6. Property Matching Score
```

#### Google NotebookLM Integration

Per meeting: *"Quinn demonstrated Google NotebookLM for content creation"*

Use cases:
- Create educational content from property listings
- Generate FAQs from website content
- Build training materials for team
- Analyze competitor content

**Implementation:** Export NotebookLM outputs → Import to CMS/n8n workflows

---

### Social Media / Canva Integration

Per meeting: *"Holmes inquired about compatibility with Canva"*

| Integration | Method | Status |
|-------------|--------|--------|
| **Canva** | Canva Connect API | Available |
| **Buffer/Hootsuite** | n8n integration | Available |
| **Direct Posting** | Meta/LinkedIn APIs | Available |

**Recommendation:**
1. Use n8n to automate content distribution
2. Canva designs → n8n → Social platforms
3. AI generates captions/hashtags

---

## Infrastructure Recommendations

### Current: AI Server (192.168.0.234)

| Resource | Spec | Adequate |
|----------|------|----------|
| GPU | RTX 3090 24GB | Yes |
| RAM | 192GB | Yes |
| CPU | 2x Xeon E5-2699 v3 | Yes |
| Storage | /aidata volume | Yes |

**Recommendation:** Current AI server is more than adequate. No changes needed.

### Production Deployment Options

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **AI Server (current)** | GPU, existing, free | Single point of failure | $0/mo |
| **Proxmox Cluster** | HA, redundancy | Setup complexity | $0/mo |
| **AWS/GCP** | Scalable, managed | Recurring cost, no local AI | $100-500/mo |
| **Hybrid** | Best of both | Complexity | Varies |

**Recommendation:**
- Phase 1: AI Server (simple, demo-proven)
- Phase 2: Proxmox cluster for redundancy
- Add Cloudflare Tunnel for external access

### Failover System

Per meeting: *"Build backend failover and notification system for local 'black box' server"*

```
Primary: 192.168.0.234 (AI Server)
    │
    ├──► Health Check (every 30s)
    │
    ▼
Failover: Cloudflare Workers (edge)
    │
    ├──► Notification → Slack/Email
    │
    ▼
Secondary: 192.168.0.165 (Proxmox Main)
```

**Implementation:** n8n workflow + Cloudflare failover

---

## Cost Analysis

### Monthly Operating Costs

| Item | Lofty (Current) | Recommended Stack |
|------|-----------------|-------------------|
| CRM Platform | $500-800 | $0 (Mautic) |
| Website Hosting | Included | $0 (self-hosted) |
| Email Sending | Included | $20-50 (SES) |
| AI/LLM | N/A | $0 (Ollama) |
| Analytics | Included | $0 (Plausible) |
| Domain/SSL | ~$20/year | ~$15/year (Cloudflare) |
| **Total Monthly** | **$600-1,000** | **$25-55** |
| **Annual Cost** | **$7,200-12,000** | **$300-660** |
| **Annual Savings** | - | **$6,540-11,340** |

### One-Time Costs

| Item | Cost | Notes |
|------|------|-------|
| Premium Theme (optional) | $69-99 | If using WordPress |
| Development Time | Included | AIQSO partnership |
| Migration | Included | Lofty → Mautic |
| Training | Included | Team training |

---

## Decision Matrix

| Requirement | Mautic | Twenty CRM | Lofty (current) |
|-------------|--------|------------|-----------------|
| Cost | Free | Free | $500-800/mo |
| Ease of Use | Medium | High | High |
| AI Integration | Via n8n | API-based | Limited |
| Landing Pages | Built-in | External | Template-based |
| Customization | Full | Full | Limited |
| Data Ownership | 100% | 100% | Vendor |
| Learning Curve | Medium | Low | Low |
| Support | Community | Community | Paid |

---

## Recommendations Summary

### Phase 1 (January 2025)
1. **Keep current stack** - Next.js + Mautic + n8n + Ollama
2. **Focus on:** Website polish, landing pages, CRM migration
3. **Add:** Cal.com for scheduling, Plausible for analytics

### Phase 2 (February 2025)
1. **Evaluate:** Twenty CRM vs Mautic based on user feedback
2. **Implement:** First-time buyer gamification
3. **Add:** Canva/social media automation

### Phase 3 (March 2025+)
1. **Consider:** Payload CMS for content management
2. **Implement:** Failover system
3. **Optimize:** AI workflows based on usage patterns

---

## Next Steps

1. [ ] Client to review CRM options (Mautic demo)
2. [ ] Client to provide brand assets for landing pages
3. [ ] Developer to deploy Twenty CRM for comparison
4. [ ] Developer to implement Plausible analytics
5. [ ] Joint review meeting to finalize tech decisions

---

*Document prepared by AIQSO | December 2024*
