# Royal Group - Next Phase Implementation Approach

> **Target Launch:** January 2025
> **Overlap Period:** 2 weeks before full transfer
> **Updated:** December 10, 2024

---

## Phase Overview

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            IMPLEMENTATION TIMELINE                                │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  Dec 2024                Jan 2025                Feb 2025               Mar 2025  │
│  ────────                ────────                ────────               ────────  │
│                                                                                   │
│  ┌─────────────┐  ┌─────────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  PHASE 1    │  │      PHASE 2        │  │    PHASE 3      │  │  PHASE 4    │ │
│  │ Foundation  │─►│ Website & Landing   │─►│  CRM Migration  │─►│ Enhancement │ │
│  │  + Review   │  │    Pages Launch     │  │  & Automation   │  │  & Growth   │ │
│  └─────────────┘  └─────────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                                                   │
│  Current ─────►  Client Assets ─────►  Lofty Export ─────►  AI Features          │
│                                                                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Foundation & Review (Current - December 2024)

### Status: IN PROGRESS

#### Completed
- [x] Demo website deployed (Next.js 14)
- [x] Mautic CRM configured
- [x] n8n automation workflows (6 total)
- [x] AI integration (Ollama on RTX 3090)
- [x] Team member landing pages (3 agents)
- [x] Demo presentation (12/09/2024)

#### In Progress
- [ ] Client review of demo
- [ ] Gather client feedback on design direction
- [ ] Research CRM alternatives (Twenty CRM evaluation)

#### Waiting on Client
| Item | Priority | Notes |
|------|----------|-------|
| Brand package (Canva/zip) | High | Colors, fonts, logos |
| Landing page templates | High | Current designs to replicate |
| List of repetitive tasks | Medium | For automation planning |
| Phase/priority preferences | High | Feature prioritization |
| Team photos (high-res) | High | For agent pages |

#### Developer Tasks This Week
1. Set up Twenty CRM instance for comparison
2. Prepare credentials list for migration
3. Investigate site tracking/analytics options
4. Create development website preview URL

---

## Phase 2: Website & Landing Pages (January 2025 - Week 1-2)

### Goal: Launch polished website with key landing pages

#### Website Polish
| Task | Description | Effort |
|------|-------------|--------|
| Apply brand colors/fonts | From client brand package | 2-4 hrs |
| Add team photos | High-res professional images | 1-2 hrs |
| Update property listings | Real properties if available | 2-4 hrs |
| Mobile optimization | Verify responsive design | 2-3 hrs |
| Performance tuning | Lighthouse score > 90 | 2-3 hrs |

#### Landing Pages

**Priority 1: Golf Properties**
```
URL: golf.royalgroup-ev.com OR royalgroup-ev.com/golf
Content:
- Hero with golf course imagery
- Golf community listings
- Golf lifestyle content
- Lead capture form → Routes to Jennifer
Template: Mautic landing page builder
```

**Priority 2: International Properties**
```
URL: international.royalgroup-ev.com
Content:
- Global property showcase
- Investment opportunities
- Luxury vacation homes
- Multi-language considerations (future)
Template: Mautic landing page builder
```

**Priority 3: Team Subdomains**
```
jennifer.royalgroup-ev.com → /team/jennifer-holmes
adavien.royalgroup-ev.com → /team/adavien-holmes
jill.royalgroup-ev.com → /team/jill-govan

Implementation: Traefik routing rules
```

#### Technical Setup
| Task | Description | Status |
|------|-------------|--------|
| DNS Configuration | Point domain to server | Pending |
| SSL Certificates | Via Cloudflare/Let's Encrypt | Pending |
| Email Deliverability | SPF, DKIM, DMARC | Pending |
| Analytics Setup | Plausible + Mautic tracking | Pending |

---

## Phase 3: CRM Migration & Automation (January 2025 - Week 3-4)

### Goal: Migrate from Lofty, activate automation workflows

#### Data Migration

**Step 1: Export from Lofty**
```
Data to export:
- Contacts (~500)
- Email history (if possible)
- Notes/activity logs
- Tags/segments
- Property interests
```

**Step 2: Data Mapping**
| Lofty Field | Mautic Field | Transform |
|-------------|--------------|-----------|
| First Name | firstname | Direct |
| Last Name | lastname | Direct |
| Email | email | Direct |
| Phone | phone | Direct |
| Lead Source | utm_source | Map values |
| Lead Score | points | Recalculate |
| Agent | owner_id | Map to user |
| Stage | stage | Custom field |
| Property Interest | Tags | Parse & tag |

**Step 3: Import to Mautic**
```bash
# CSV Import via Mautic CLI
docker exec mautic php bin/console mautic:import:contacts \
  /var/www/html/import/lofty-contacts.csv \
  --batch-limit=100
```

**Step 4: Verify & Clean**
- Deduplicate contacts
- Verify email validity
- Assign to correct agents
- Apply segments

#### Automation Activation

| Workflow | Description | Activation |
|----------|-------------|------------|
| Lead Capture | Website → CRM | Day 1 |
| Welcome Sequence | 3-email drip | Day 2 |
| Agent Notification | Email/Slack alerts | Day 1 |
| Lead Scoring | AI qualification | Day 3 |
| Follow-up Reminders | 4-hour check | Day 5 |
| Property Descriptions | AI generation | On demand |

#### Email Configuration

**Amazon SES Setup**
```
1. Verify domain: royalgroup-ev.com
2. Create SMTP credentials
3. Configure Mautic:
   - SMTP Host: email-smtp.us-east-1.amazonaws.com
   - Port: 587
   - Encryption: TLS
4. Set up DNS records:
   - SPF: v=spf1 include:amazonses.com ~all
   - DKIM: Provided by SES
   - DMARC: v=DMARC1; p=none; rua=mailto:admin@royalgroup-ev.com
```

---

## Phase 4: AI Enhancement & Growth (February 2025+)

### Goal: Activate advanced AI features, optimize based on usage

#### First-Time Buyer Gamification

Per meeting: *"Gamified first-time home ownership experience"*

**Implementation Plan:**

```
┌─────────────────────────────────────────────────────────────────┐
│                 FIRST-TIME BUYER JOURNEY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. DISCOVER                2. PREPARE                           │
│  ┌─────────────┐            ┌─────────────┐                     │
│  │ Quiz:       │            │ Budget      │                     │
│  │ "Am I Ready │ ────────► │ Calculator  │                     │
│  │  to Buy?"   │            │ + AI Advice │                     │
│  └─────────────┘            └─────────────┘                     │
│         │                          │                             │
│         ▼                          ▼                             │
│  3. LEARN                   4. SEARCH                            │
│  ┌─────────────┐            ┌─────────────┐                     │
│  │ Educational │            │ Property    │                     │
│  │ Modules +   │ ◄───────── │ Matching    │                     │
│  │ Progress    │            │ (AI Score)  │                     │
│  └─────────────┘            └─────────────┘                     │
│         │                          │                             │
│         ▼                          ▼                             │
│  5. CONNECT                 6. CLOSE                             │
│  ┌─────────────┐            ┌─────────────┐                     │
│  │ Agent       │            │ Transaction │                     │
│  │ Matching    │ ────────► │ Tracker +   │                     │
│  │             │            │ Celebration │                     │
│  └─────────────┘            └─────────────┘                     │
│                                                                  │
│  BADGES: Ready Researcher │ Budget Pro │ Smart Searcher │ etc.  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Tech Implementation:**
- Next.js pages for quiz/calculator
- Ollama for personalized recommendations
- Progress stored in database
- Email triggers at milestones

#### AI Chatbot Enhancement

Current: Basic property Q&A
Enhanced:
- Property database knowledge
- Scheduling integration (Cal.com)
- Lead qualification routing
- Multi-turn conversation memory

```typescript
// Enhanced chatbot with context
const response = await ollama.chat({
  model: 'llama3.2',
  messages: [
    { role: 'system', content: royalGroupContext },
    { role: 'user', content: userQuestion },
  ],
  tools: [
    { function: searchProperties },
    { function: scheduleViewing },
    { function: getAgentInfo },
  ],
});
```

#### Social Media Automation

Per meeting: *"Canva integration inquiry"*

**Workflow:**
```
New Listing → AI generates content → Canva template → n8n → Social platforms
                                                        │
                                                        ├── Instagram
                                                        ├── Facebook
                                                        ├── LinkedIn
                                                        └── Twitter/X
```

#### Analytics & Reporting

Weekly automated reports:
- Website traffic summary
- Lead quality breakdown
- Conversion funnel analysis
- Agent performance metrics

---

## Launch Checklist

### 1 Week Before Launch

| Task | Owner | Status |
|------|-------|--------|
| Final content review | Client | [ ] |
| Test all forms | Developer | [ ] |
| Test email delivery | Developer | [ ] |
| Load test website | Developer | [ ] |
| Backup current Lofty data | Client | [ ] |
| Team access credentials | Developer | [ ] |

### 3 Days Before Launch

| Task | Owner | Status |
|------|-------|--------|
| DNS propagation check | Developer | [ ] |
| SSL certificate verification | Developer | [ ] |
| Final import of contacts | Developer | [ ] |
| Team training session | Both | [ ] |
| Create support documentation | Developer | [ ] |

### Launch Day

| Task | Owner | Status |
|------|-------|--------|
| DNS cutover | Developer | [ ] |
| Monitor for issues | Developer | [ ] |
| Send client announcement email | Client | [ ] |
| Verify all systems operational | Developer | [ ] |
| Begin 2-week overlap period | Both | [ ] |

### Post-Launch (2-Week Overlap)

| Task | Owner | Status |
|------|-------|--------|
| Daily check-ins | Both | [ ] |
| Address any issues | Developer | [ ] |
| Gather user feedback | Client | [ ] |
| Optimize based on usage | Developer | [ ] |
| Confirm Lofty cancellation | Client | [ ] |

---

## Risk Mitigation

| Risk | Mitigation | Contingency |
|------|------------|-------------|
| Data loss during migration | Full backups, staged import | Restore from Lofty |
| Email deliverability issues | Warm-up period, SPF/DKIM | Use alternative SMTP |
| User adoption challenges | Training, documentation | Extended support period |
| Technical issues at launch | 2-week overlap with Lofty | Revert to Lofty temporarily |
| AI service outage | Fallback responses in place | Manual processes |

---

## Success Metrics

### Phase 2 (Website Launch)
- [ ] Lighthouse performance score > 90
- [ ] All forms submitting to CRM
- [ ] Mobile-responsive on all devices
- [ ] SSL/HTTPS working properly
- [ ] Landing pages live and tracking

### Phase 3 (CRM Migration)
- [ ] 100% contact migration verified
- [ ] Email deliverability > 95%
- [ ] Automation workflows active
- [ ] Team trained and using system
- [ ] Lofty cancelled

### Phase 4 (Enhancement)
- [ ] First-time buyer journey live
- [ ] AI chatbot enhanced
- [ ] Social media automation active
- [ ] Weekly reports generated automatically

---

## Meeting Schedule

| Meeting | Frequency | Topics |
|---------|-----------|--------|
| Follow-up meeting | Dec 10-11 | Review phase approach, tool selection |
| Progress check | Weekly | Development updates, blockers |
| Pre-launch review | Jan (TBD) | Final checks, training |
| Post-launch check-in | Daily (2 weeks) | Issues, feedback |
| Monthly review | Ongoing | Optimization, new features |

---

## Resources Needed from Client

### Immediate (This Week)
1. **Brand Package**
   - Logo files (SVG, PNG)
   - Brand colors (hex codes)
   - Approved fonts
   - Style guide if available

2. **Current Landing Page Examples**
   - Screenshots or URLs
   - Content to preserve
   - Design elements to keep

3. **Team Information**
   - High-resolution photos
   - Bios/descriptions
   - Specialties/certifications
   - Contact preferences

### Before Migration
4. **Lofty Export**
   - Contact CSV export
   - Email template exports (if possible)
   - Activity/notes export

5. **Domain Access**
   - DNS credentials (Cloudflare/registrar)
   - Or transfer DNS to AIQSO management

6. **Repetitive Tasks List**
   - Daily/weekly recurring tasks
   - Pain points to automate
   - Time estimates for each

---

## Contact & Support

**Developer:** Quinn @ AIQSO
**GitHub:** [qvidal01/royalgroup](https://github.com/qvidal01/royalgroup)
**Response Time:** 24 hours (business days)

**Emergency Contact:** (for launch week)
- Phone: [To be shared]
- Slack/Discord: [Channel to be created]

---

*Implementation Plan v1.0*
*Royal Group Digital Platform*
*Prepared by AIQSO | December 2024*
