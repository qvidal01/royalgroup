# AIQSO Client Deployment Architecture

## Overview

This document describes the deployment architecture for AIQSO client tech stacks, including the POV (Proof of Value) phase on AIQSO infrastructure and production deployment on client hardware.

---

## Deployment Phases

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CLIENT DEPLOYMENT LIFECYCLE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1: POC (Proof of Concept)                                           │
│  └── Demo environment on aiqso.app                                          │
│  └── Sales demonstrations, initial interest                                 │
│                                                                             │
│  PHASE 2: POV (Proof of Value)          ◄── ROYAL GROUP IS HERE            │
│  └── Full stack on AIQSO infrastructure (proxmain)                         │
│  └── Client tests with real data before commitment                          │
│  └── Hosted on *.aiqso.biz subdomains                                       │
│                                                                             │
│  PHASE 3: PRODUCTION                                                        │
│  └── Migrate to client's Proxmox server (M920Q at their location)          │
│  └── Client's own domain                                                    │
│  └── Remote management via Tailscale                                        │
│  └── AIQSO infrastructure becomes backup/failover                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Infrastructure Components

### AIQSO Infrastructure (Your Equipment)

| Server | IP (Local) | Tailscale IP | Purpose |
|--------|------------|--------------|---------|
| **proxmain** | 192.168.0.165 | - | POV hosting, backup for client stacks |
| **proxmicro** | 192.168.0.166 | - | Cloudflare tunnel primary |
| **AI Server** | 192.168.0.234 | 100.86.26.85 | Ollama/GPU workloads |
| **Synology NAS** | 192.168.0.25 | - | Backups, storage |

### Client Infrastructure (Royal Group Example)

| Server | IP (Local) | Tailscale IP | Purpose |
|--------|------------|--------------|---------|
| **proxroyal** | 192.168.0.203* | 100.118.244.71 | Client production server |

*Local IP will change when deployed at client site

---

## Network Architecture

### POV Phase (Current - Royal Group)

```
                    INTERNET
                        │
                        ▼
               ┌────────────────┐
               │   Cloudflare   │
               │    Tunnel      │
               └───────┬────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│   proxmain       │      │   proxmicro      │
│  192.168.0.165   │      │  192.168.0.166   │
│                  │      │  (tunnel host)   │
│  ┌────────────┐  │      └──────────────────┘
│  │  CT 600    │  │
│  │ royalgroup │  │
│  │ stack      │  │───────► AI Server (Ollama)
│  │192.168.0.53│  │         192.168.0.234
│  └────────────┘  │
└──────────────────┘

URLs:
├── royalgroup.aiqso.biz      → CT 600 :3001 (Website)
├── royalgroup-crm.aiqso.biz  → CT 600 :8081 (Mautic)
└── royalgroup-auto.aiqso.biz → CT 600 :5678 (n8n)
```

### Production Phase (After Client Purchase)

```
                    INTERNET
                        │
           ┌────────────┴────────────┐
           ▼                         ▼
   ┌───────────────┐         ┌───────────────┐
   │  Cloudflare   │         │   Tailscale   │
   │   (client's   │         │   (remote     │
   │    domain)    │         │   management) │
   └───────┬───────┘         └───────┬───────┘
           │                         │
           │                         │
           ▼                         ▼
┌──────────────────────────────────────────────┐
│              CLIENT SITE                      │
│  ┌────────────────────────────────────────┐  │
│  │         proxroyal (M920Q)              │  │
│  │         Tailscale: 100.118.244.71      │  │
│  │                                        │  │
│  │   ┌──────────────────────────────┐    │  │
│  │   │  LXC Container               │    │  │
│  │   │  - Website (Next.js)         │    │  │
│  │   │  - Mautic CRM                │    │  │
│  │   │  - n8n Automation            │    │  │
│  │   │  - PostgreSQL/MariaDB        │    │  │
│  │   │  - Redis                     │    │  │
│  │   └──────────────────────────────┘    │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
           │
           │ (Ollama API calls via Tailscale)
           ▼
┌──────────────────────────────────────────────┐
│              AIQSO INFRASTRUCTURE            │
│  ┌────────────────────────────────────────┐  │
│  │  AI Server (192.168.0.234)             │  │
│  │  Tailscale: 100.86.26.85               │  │
│  │  - Ollama (RTX 3090)                   │  │
│  │  - AI Models                           │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  proxmain (192.168.0.165)              │  │
│  │  - BACKUP of client stack              │  │
│  │  - Failover capability                 │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

---

## Remote Access Strategy

### Tailscale Network

All managed devices connect via Tailscale for secure remote access:

| Device | Tailscale Hostname | Tailscale IP | Purpose |
|--------|-------------------|--------------|---------|
| proxroyal | proxroyal | 100.118.244.71 | Client Proxmox server |
| hp840 | hp840 | 100.86.26.85 | AI Server |
| qdesk | qdesk | 100.69.208.26 | Admin workstation |

### SSH Access

```bash
# Direct SSH via Tailscale (from anywhere)
ssh aiqso@proxroyal          # Uses Tailscale DNS
ssh dunkin@100.118.244.71    # Via Tailscale IP

# SSH via Tailscale SSH (no keys needed, identity via Tailscale)
# Requires --ssh flag on tailscale up (already configured)
```

### Web UI Access

When on Tailscale network:
- Proxmox Web UI: https://proxroyal:8006 or https://100.118.244.71:8006
- Services via container IP: http://100.118.244.71:PORT (requires port forwarding setup)

---

## User Accounts

### proxroyal (Client Server)

| User | Password | Purpose | Permissions |
|------|----------|---------|-------------|
| root | Revelation!21:34 | Emergency access | Full |
| **aiqso** | AiqsoAdmin2024! | Quinn's admin account | sudo NOPASSWD |
| **dunkin** | DunkinAuto2024! | Claude automation | sudo NOPASSWD |

### Proxmox Web UI

| User | Realm | Role |
|------|-------|------|
| root@pam | PAM | Administrator |
| aiqso@pam | PAM | Administrator |
| dunkin@pam | PAM | Administrator |

---

## Migration Procedure

### Pre-Migration Checklist

- [ ] Client has signed service agreement
- [ ] M920Q is on-site and connected to their network
- [ ] Client provides their public IP / ISP info
- [ ] Client provides domain they want to use
- [ ] Backup of POV stack created on AIQSO infrastructure

### Migration Steps

1. **Export POV Stack**
   ```bash
   # On proxmain, backup container 600
   vzdump 600 --storage local --compress zstd --mode snapshot
   ```

2. **Transfer to Client Server**
   ```bash
   # Via Tailscale (secure, works anywhere)
   scp /var/lib/vz/dump/vzdump-lxc-600-*.tar.zst root@proxroyal:/var/lib/vz/dump/
   ```

3. **Restore on Client Server**
   ```bash
   # On proxroyal
   pct restore 600 /var/lib/vz/dump/vzdump-lxc-600-*.tar.zst --storage local-lvm
   ```

4. **Update Configuration**
   - Update container network settings for client's network
   - Update Cloudflare DNS to point to client's tunnel
   - Update n8n Ollama endpoint if using shared AI server

5. **Setup Cloudflare Tunnel on Client Server**
   ```bash
   # Install cloudflared in container
   # Configure tunnel for client's domain
   ```

6. **Verify & Test**
   - All services accessible
   - AI integration working
   - Email sending configured
   - Backups configured

---

## Backup Strategy

### During POV (on AIQSO infrastructure)

- Daily snapshots of CT 600 on proxmain
- Weekly full backup to Synology NAS

### In Production (on client hardware)

- Daily Proxmox snapshots (retained 7 days)
- Weekly sync to AIQSO infrastructure via Tailscale
- Monthly full backup export

### Failover Procedure

If client server fails:
1. Restore latest backup on proxmain CT 600
2. Update Cloudflare DNS to point to AIQSO tunnel
3. Client is back online within minutes
4. Investigate and repair client hardware
5. Sync changes back to repaired client server

---

## Service Level Expectations

| Metric | POV Phase | Production |
|--------|-----------|------------|
| Uptime Target | Best effort | 99.5% |
| Response Time | Business hours | 4 hours |
| Backup Frequency | Weekly | Daily |
| Remote Access | Via your network | Via Tailscale |

---

## Security Considerations

1. **Tailscale**: All remote access via encrypted Tailscale mesh
2. **SSH Keys**: Password + key authentication
3. **Firewall**: Only Cloudflare tunnel ports exposed publicly
4. **Updates**: Regular Proxmox and container updates
5. **Secrets**: Stored in 1Password, not in code

---

## Quick Reference Commands

```bash
# Connect to client server (from anywhere with Tailscale)
ssh aiqso@proxroyal

# Check server status
ssh aiqso@proxroyal "pveversion && uptime && df -h /"

# Manage containers
ssh aiqso@proxroyal "sudo pct list"
ssh aiqso@proxroyal "sudo pct start 600"
ssh aiqso@proxroyal "sudo pct enter 600"

# View container logs
ssh aiqso@proxroyal "sudo pct exec 600 -- docker logs rg-mautic --tail=50"

# Create backup
ssh aiqso@proxroyal "sudo vzdump 600 --compress zstd"

# Check Tailscale status
ssh aiqso@proxroyal "tailscale status"
```

---

## Contact Information

**AIQSO Technical Support**
- Quinn Vidal
- Email: quinn@aiqso.io
- Emergency: Via Tailscale SSH to any managed device

---

*Last Updated: December 10, 2025*
*Architecture Version: 1.0*
