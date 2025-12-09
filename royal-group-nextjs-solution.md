# Royal Group Real Estate - Next.js Solution Architecture

## Executive Summary

Yes, this can absolutely be accomplished with Next.js! In fact, a Next.js-based stack offers several advantages over the WordPress approach:

| Aspect | WordPress Stack | Next.js Stack |
|--------|-----------------|---------------|
| Performance | Good (with caching) | Excellent (SSG/SSR native) |
| Customization | Theme-limited | Unlimited |
| Learning Curve | Lower initial | Higher, but more transferable skills |
| AI Integration | Plugin-based | Native (Vercel AI SDK, direct Ollama) |
| Modern UX | Template-dependent | Full control (React components) |
| SEO | Plugin-dependent | Built-in (metadata API) |
| Long-term Maintainability | PHP ecosystem | TypeScript/React ecosystem |

**Recommendation**: For your goal of learning AI/ML and coding, the Next.js stack is the better choice. You'll gain skills that transfer across the industry while building a more performant, customizable solution.

---

## Proposed Next.js Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PROXMOX HOST                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    NEXT.JS MONOREPO (Turborepo)                        │ │
│  │                                                                         │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐│ │
│  │  │   apps/web      │  │  apps/admin     │  │    packages/ui          ││ │
│  │  │                 │  │                 │  │                         ││ │
│  │  │  Public Website │  │  Payload CMS    │  │  Shared Components      ││ │
│  │  │  - Listings     │  │  Admin Panel    │  │  - Property Cards       ││ │
│  │  │  - Agent Pages  │  │  - Content Mgmt │  │  - Forms                ││ │
│  │  │  - Landing Pages│  │  - Media Library│  │  - Navigation           ││ │
│  │  │  - Contact Forms│  │  - User Mgmt    │  │  - Luxury Design System ││ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘│ │
│  │                                                                         │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐│ │
│  │  │ packages/db     │  │ packages/email  │  │   packages/ai           ││ │
│  │  │                 │  │                 │  │                         ││ │
│  │  │  Prisma ORM     │  │  React Email    │  │  Vercel AI SDK          ││ │
│  │  │  PostgreSQL     │  │  Resend/SES     │  │  Ollama Integration     ││ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘│ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────────────────┐│
│  │   Twenty CRM     │  │     Ollama       │  │      n8n                   ││
│  │                  │  │                  │  │                            ││
│  │  Contact Mgmt    │  │  Llama 3.2       │  │  Workflow Automation       ││
│  │  Deal Tracking   │  │  Mistral         │  │  CRM ↔ Website Sync        ││
│  │  Email Sync      │  │  RTX 3090 GPU    │  │  Email Triggers            ││
│  │  Lead Scoring    │  │                  │  │  Lead Routing              ││
│  └──────────────────┘  └──────────────────┘  └────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         Shared Services                               │   │
│  │  PostgreSQL │ Redis │ MinIO (S3) │ Traefik │ Synology Backup         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Frontend & CMS: Next.js + Payload CMS

**Payload CMS 3.0** is the perfect choice because:
- **Native Next.js integration** - installs directly into your `/app` folder
- **Code-first approach** - schema defined in TypeScript (great for learning)
- **Self-hosted** - runs on your Proxmox, no SaaS fees
- **Beautiful admin panel** - auto-generated from your schema
- **Built-in auth** - handles user/agent authentication
- **Media management** - S3-compatible (MinIO on your NAS)

```typescript
// payload.config.ts - Example collections for real estate
import { buildConfig } from 'payload/config';
import { Properties } from './collections/Properties';
import { Agents } from './collections/Agents';
import { Leads } from './collections/Leads';
import { LandingPages } from './collections/LandingPages';

export default buildConfig({
  collections: [
    Properties,    // Listing management
    Agents,        // Team member profiles
    Leads,         // Form submissions
    LandingPages,  // Marketing pages
  ],
  // ... rest of config
});
```

### 2. CRM: Twenty CRM

**Twenty CRM** is the modern, open-source alternative:
- **TypeScript/React frontend** - same stack as your website
- **GraphQL + REST APIs** - easy integration with Next.js
- **Self-hosted** - Docker deployment on Proxmox
- **Notion-like UX** - modern, intuitive interface
- **Email sync** - connects to Gmail/Outlook
- **Custom fields** - JSON object fields for flexibility
- **Zapier/n8n integration** - automation ready

```yaml
# Twenty CRM Docker deployment
services:
  twenty:
    image: twentycrm/twenty:latest
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://twenty:password@postgres:5432/twenty
      - REDIS_URL=redis://redis:6379
      - ACCESS_TOKEN_SECRET=${ACCESS_SECRET}
      - REFRESH_TOKEN_SECRET=${REFRESH_SECRET}
```

### 3. Email Marketing: React Email + Listmonk/Mautic

For drip campaigns and newsletters, you have options:

**Option A: Keep Mautic** (recommended for complex campaigns)
- Visual campaign builder
- Pre-built drip templates
- Integrates via n8n webhooks

**Option B: Build Custom with React Email**
- Beautiful email templates in React
- Send via Amazon SES or Resend
- Full control over design
- Integrate with n8n for automation

```typescript
// Example React Email template
import { Html, Head, Body, Container, Text } from '@react-email/components';

export const WelcomeEmail = ({ name, agentName }) => (
  <Html>
    <Head />
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Text style={styles.heading}>Welcome to Royal Group, {name}!</Text>
        <Text>Your dedicated agent, {agentName}, will be in touch shortly.</Text>
      </Container>
    </Body>
  </Html>
);
```

### 4. AI Integration: Native to Next.js

This is where Next.js really shines for your learning goals:

```typescript
// app/api/ai/generate-description/route.ts
import { generateText } from 'ai';
import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama({
  baseURL: 'http://ollama:11434/api',
});

export async function POST(req: Request) {
  const { propertyDetails } = await req.json();
  
  const { text } = await generateText({
    model: ollama('llama3.2'),
    prompt: `Generate a luxury real estate listing description for: ${propertyDetails}`,
  });
  
  return Response.json({ description: text });
}
```

**AI Features You Can Build:**
- Property description generator
- Smart lead scoring
- Chatbot for website visitors
- Email content suggestions
- Market analysis summaries

### 5. Automation: n8n

Same as WordPress stack - n8n connects everything:
- Payload CMS → Twenty CRM sync
- Form submissions → Lead routing
- AI-powered email sequences
- Calendar integrations

---

## Project Structure

```
royal-group-nextjs/
├── apps/
│   ├── web/                      # Public website
│   │   ├── app/
│   │   │   ├── (marketing)/      # Landing pages
│   │   │   ├── properties/       # Listings
│   │   │   ├── agents/           # Team pages
│   │   │   ├── neighborhoods/    # Area guides
│   │   │   ├── api/
│   │   │   │   ├── ai/           # AI endpoints
│   │   │   │   ├── contact/      # Form handlers
│   │   │   │   └── webhooks/     # n8n integrations
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── property-card.tsx
│   │   │   ├── agent-profile.tsx
│   │   │   ├── testimonial-carousel.tsx
│   │   │   ├── hero-section.tsx
│   │   │   └── contact-form.tsx
│   │   └── lib/
│   │       ├── payload.ts        # CMS client
│   │       ├── twenty.ts         # CRM client
│   │       └── ai.ts             # Ollama helpers
│   │
│   └── admin/                    # Payload CMS admin
│       ├── payload.config.ts
│       └── collections/
│           ├── Properties.ts
│           ├── Agents.ts
│           ├── Leads.ts
│           └── Pages.ts
│
├── packages/
│   ├── ui/                       # Shared components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── form.tsx
│   ├── db/                       # Database schema
│   │   ├── schema.prisma
│   │   └── client.ts
│   └── email/                    # Email templates
│       ├── welcome.tsx
│       ├── listing-alert.tsx
│       └── newsletter.tsx
│
├── docker/
│   ├── docker-compose.yml
│   └── nginx.conf
│
├── turbo.json
├── package.json
└── .env
```

---

## Luxury Design System

To match the McLaurin Realty Group aesthetic, build a custom design system:

```typescript
// packages/ui/theme.ts
export const luxuryTheme = {
  colors: {
    primary: '#1a1a2e',      // Deep navy
    secondary: '#c9a227',    // Gold accent
    background: '#fafafa',   // Off-white
    text: '#2d2d2d',         // Charcoal
    muted: '#6b6b6b',        // Gray
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Inter, sans-serif',
  },
  spacing: {
    section: '120px',        // Generous whitespace
    container: '1200px',
  },
};
```

**Key Design Components:**
- Full-width hero with parallax images
- Elegant property cards with hover effects
- Testimonial carousel with smooth transitions
- "By the Numbers" statistics section
- Neighborhood guides with rich imagery
- Agent profiles with contact forms

---

## Docker Compose - Full Next.js Stack

```yaml
# docker-compose.yml
version: '3.8'

services:
  # ===================
  # NEXT.JS APP
  # ===================
  nextjs:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/royalgroup
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
      - OLLAMA_BASE_URL=http://ollama:11434
      - TWENTY_API_URL=http://twenty:3000
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
      - ollama
    volumes:
      - ./apps:/app/apps
      - ./packages:/app/packages
    networks:
      - frontend
      - backend

  # ===================
  # TWENTY CRM
  # ===================
  twenty:
    image: twentycrm/twenty:latest
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://twenty:password@postgres:5432/twenty
      - REDIS_URL=redis://redis:6379
      - ACCESS_TOKEN_SECRET=${TWENTY_ACCESS_SECRET}
      - REFRESH_TOKEN_SECRET=${TWENTY_REFRESH_SECRET}
    depends_on:
      - postgres
      - redis
    networks:
      - frontend
      - backend

  # ===================
  # OLLAMA (AI)
  # ===================
  ollama:
    image: ollama/ollama:latest
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

  # ===================
  # N8N AUTOMATION
  # ===================
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=automation.royalgroup-ev.com
      - N8N_PROTOCOL=https
      - N8N_ENCRYPTION_KEY=${N8N_KEY}
    volumes:
      - n8n_data:/home/node/.n8n
    networks:
      - frontend
      - backend

  # ===================
  # MAUTIC (OPTIONAL)
  # ===================
  mautic:
    image: mautic/mautic:5-apache
    ports:
      - "8080:80"
    environment:
      - MAUTIC_DB_HOST=postgres
      - MAUTIC_DB_NAME=mautic
    depends_on:
      - postgres
    networks:
      - frontend
      - backend

  # ===================
  # DATABASES
  # ===================
  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - backend

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - backend

  # ===================
  # MINIO (S3 Storage)
  # ===================
  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=${MINIO_USER}
      - MINIO_ROOT_PASSWORD=${MINIO_PASSWORD}
    volumes:
      - minio_data:/data
    networks:
      - backend

  # ===================
  # TRAEFIK (PROXY)
  # ===================
  traefik:
    image: traefik:v2.10
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./docker/traefik.yml:/etc/traefik/traefik.yml
    networks:
      - frontend

networks:
  frontend:
  backend:

volumes:
  postgres_data:
  redis_data:
  ollama_data:
  n8n_data:
  minio_data:
```

---

## Learning Path

Since you want to learn AI/ML and coding, here's the progression:

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Next.js project with Turborepo
- [ ] Deploy Payload CMS with basic collections
- [ ] Create first property listing pages
- [ ] Style with Tailwind CSS

### Phase 2: Design System (Week 3)
- [ ] Build luxury UI components
- [ ] Implement responsive layouts
- [ ] Create agent profile pages
- [ ] Add image galleries

### Phase 3: CRM Integration (Week 4)
- [ ] Deploy Twenty CRM
- [ ] Build API integration layer
- [ ] Create contact forms
- [ ] Set up lead routing

### Phase 4: AI Features (Week 5-6)
- [ ] Deploy Ollama with Llama 3.2
- [ ] Build property description generator
- [ ] Create AI chat widget
- [ ] Implement smart lead scoring

### Phase 5: Automation (Week 6-7)
- [ ] Deploy n8n
- [ ] Build form → CRM workflows
- [ ] Create email sequences
- [ ] Set up notification triggers

### Phase 6: Production (Week 8)
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Backup configuration
- [ ] DNS cutover

---

## Claude Code CLI Commands

```bash
# Initialize the monorepo
npx create-turbo@latest royal-group-nextjs
cd royal-group-nextjs

# Add Payload CMS to admin app
cd apps/admin
npx create-payload-app@latest . --template website

# Add shadcn/ui for components
cd apps/web
npx shadcn-ui@latest init

# Add AI dependencies
pnpm add ai ollama-ai-provider

# Add email dependencies
pnpm add @react-email/components resend

# Start development
pnpm dev
```

---

## Cost Comparison

| Item | WordPress Stack | Next.js Stack |
|------|-----------------|---------------|
| Theme | $69-99 (one-time) | $0 (custom) |
| Plugins | ~$200-400 | $0 |
| CRM | $0 (Mautic) | $0 (Twenty) |
| Hosting | $0 (Proxmox) | $0 (Proxmox) |
| Email | ~$30/mo (SES) | ~$30/mo (SES) |
| **Total Monthly** | **~$30** | **~$30** |
| **Learning Value** | Low | **High** |

---

## Recommendation

**Go with Next.js if:**
- You want to learn modern web development
- You want full control over every pixel
- AI/ML integration is important
- You prefer TypeScript over PHP
- Performance is critical

**Stick with WordPress if:**
- You need to launch in < 2 weeks
- Budget for development time is tight
- Client needs to edit content with minimal training
- You want plugin ecosystem shortcuts

For Jennifer's project with your goals of learning AI/ML and coding, I recommend the **Next.js stack**. You'll build transferable skills while creating a superior product.

---

## Next Steps

1. **Confirm stack choice** with the client
2. **Start with Payload CMS** template as foundation
3. **Build design system** matching McLaurin aesthetic
4. **Add Twenty CRM** for contact management
5. **Integrate Ollama** for AI features
6. **Connect everything** with n8n

Want me to create a more detailed implementation guide for any specific component?
