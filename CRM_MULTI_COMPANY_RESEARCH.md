# Multi-Company CRM Research for Jennifer Holmes
## Royal Group & Multiple Business Entities

**Date:** December 10, 2025
**Prepared for:** Jennifer Holmes (Royal Group / Engel & Völkers)

---

## Executive Summary

Jennifer needs a CRM solution to manage contacts across multiple businesses, primarily Royal Group (Engel & Völkers real estate) and potentially other ventures. This research evaluates 7 CRM platforms for multi-company capabilities, focusing on contact segmentation, separate branding, lead routing, and unified/per-company reporting.

### Quick Recommendation

**For Jennifer's Real Estate + Multiple Businesses:**

1. **Best Overall:** **Odoo** - Native multi-company support, comprehensive features, reasonable cost
2. **Best Budget:** **Twenty CRM** - Open-source, multi-workspace capable, modern interface
3. **Best Enterprise:** **HubSpot Business Units** - Professional but expensive ($1,000/mo per unit)
4. **Real Estate Specific:** **Method CRM** - Purpose-built for multi-business management

---

## Detailed Platform Comparison

### 1. Mautic (Marketing Automation + CRM)

**Multi-Company Approach:** Multiple separate instances (NOT single-instance multi-tenancy)

#### Strengths
- Open-source marketing automation platform
- Excellent email marketing and campaign management
- Powerful segmentation and tagging capabilities
- Can run multiple instances with Docker/Kubernetes

#### Multi-Company Implementation
- **Recommended:** Deploy separate Mautic instances per company
- Each instance has its own database, domain (e.g., royal.mautic.com, company2.mautic.com)
- Can use containerization (Docker/Kubernetes) for easy deployment
- Single-instance multi-tenancy is NOT recommended by Mautic developers

#### Limitations for Multi-Company
- Not designed for true multi-tenancy
- Extension licenses incompatible with multi-tenant setups
- Performance degradation if trying to use one instance for multiple companies
- Data isolation requires completely separate instances

#### Separate Branding
- ✅ YES - Each instance can have unique branding, email templates, domains
- ✅ YES - Completely separate email sender identities per instance

#### Cost
- **Free** (open-source)
- Infrastructure costs: ~$20-50/month per instance (VPS/cloud hosting)
- Optional: Acquia Campaign Factory (commercial multi-tenant version) - Enterprise pricing

#### Complexity
- **Moderate-High** - Requires technical setup, server management
- Easier with Docker/Kubernetes orchestration
- Need to manage multiple instances, databases, cron jobs

#### Best For
- Companies with technical resources
- Heavy email marketing and automation needs
- Budget-conscious organizations willing to self-host

#### Verdict for Jennifer
⚠️ **Not Ideal** - Too complex for multiple instances, better options exist for multi-company CRM

**Sources:**
- [Multi-tenant Mautic deployment discussion](https://forum.mautic.org/t/multi-tenant-mautic-deployment-and-customization/30645)
- [Scaling email marketing with multi-tenant Mautic](https://mautic.org/case-study/scaling-email-marketing-with-multi-tenant-mautic-for-an-ecommerce-saas-solution/)
- [How To Run Multiple Instances Of Mautic](https://www.axelerant.com/blog/run-multiple-instances-of-mautic-for-marketing-automation-needs)

---

### 2. Twenty CRM (Modern Open-Source CRM)

**Multi-Company Approach:** Multi-workspace architecture (native support)

#### Strengths
- Modern, clean interface
- Multi-tenant by design
- Open-source (GPL licensed - you own it)
- Deep customization capabilities
- No per-user fees

#### Multi-Company Implementation
- **Native multi-workspace support** built-in
- Each workspace is completely isolated
- Users can belong to multiple workspaces
- Switch between workspaces in single session
- Self-hosted option: Set `IS_MULTIWORKSPACE_ENABLED=true`

#### How Contacts Work
- ✅ Contacts exist per-workspace (company)
- ✅ Can manually duplicate contacts across workspaces if needed
- ✅ No accidental cross-contamination between companies
- ❌ No native "shared contacts" across workspaces (by design for security)

#### Separate Branding
- ✅ YES - Custom workspace domains (e.g., royalgroup.twenty.com)
- ✅ YES - Custom roles and permissions per workspace
- ⚠️ Email branding capabilities still developing (newer platform)

#### Lead Routing
- ✅ YES - Different teams/users per workspace
- ✅ YES - Custom workflows and automation per workspace
- ✅ YES - Auto-assign leads based on custom rules

#### Reporting
- ✅ Per-workspace dashboards and reports
- ✅ Custom views and analytics per workspace
- ❌ No unified cross-workspace reporting (requires manual aggregation)

#### Cost
- **Free** (self-hosted open-source)
- **SaaS Option:** Pricing not yet publicly available (in beta)
- Infrastructure: ~$10-20/month for VPS hosting

#### Complexity
- **Low-Moderate** - Modern interface, Docker deployment available
- Well-documented for self-hosting
- Active development community

#### Best For
- Tech-savvy small to medium businesses
- Companies wanting full data ownership
- Modern interface preferences
- Budget-conscious with technical resources

#### Verdict for Jennifer
✅ **Good Option** - Modern, native multi-workspace, affordable, but email features still maturing

**Sources:**
- [Twenty Multi-Workspace Discussion](https://github.com/twentyhq/twenty/discussions/3646)
- [Twenty Settings FAQ](https://twenty.com/user-guide/section/settings/settings-faq)
- [Transform Your Customer Relationships with Twenty](https://dev.to/adityadeshlahre/transform-your-customer-relationships-with-the-leading-open-source-crm-twenty-161d)

---

### 3. EspoCRM (PHP-Based Open-Source CRM)

**Multi-Company Approach:** Workaround with custom fields OR multiple instances

#### Strengths
- Lightweight, fast PHP-based CRM
- Good for small-medium teams
- Active development community
- Reasonable feature set for traditional CRM needs

#### Multi-Company Implementation
- **Official Position:** NOT designed for true multi-tenancy
- **Workaround Option 1:** Add custom "Company" field + Security Groups
- **Workaround Option 2:** Deploy separate EspoCRM instances per company
- Extension licenses incompatible with multi-tenant setups

#### Developer Statement
> "EspoCRM is not suitable for true multi-tenancy... In the era of containers, having multiple databases, app instances and sub-domains is not a problem."

#### How Contacts Work (Workaround #1)
- Add custom "Business Unit" or "Company" field to contacts
- Use Security Groups to restrict access
- Manually segment by company field
- ⚠️ Risk of data mixing without careful setup

#### Separate Branding
- ⚠️ Limited - Would need custom development per instance
- ❌ Not practical within single instance
- ✅ Possible with completely separate instances

#### Cost
- **Free** (open-source)
- Paid Extensions: ~$50-150/each (one-time)
- Infrastructure: ~$10-20/month per instance

#### Complexity
- **Moderate** - Requires PHP/web hosting knowledge
- Security Groups setup can be tricky
- Multiple instances = multiple maintenance tasks

#### Best For
- Single company with departments/teams
- Users comfortable with workarounds
- PHP hosting environments

#### Verdict for Jennifer
❌ **Not Recommended** - Not designed for multi-company, better alternatives exist

**Sources:**
- [EspoCRM Multi-tenant Discussion](https://forum.espocrm.com/forum/general/57225-multi-tenant-multi-companies-feature)
- [Implementing multi-tenancy in EspoCRM](https://forum.espocrm.com/forum/developer-help/93561-implementing-multi-tenancy-in-espocrm)
- [Setting Up Multi-Tenant Environment in SuiteCRM](https://www.ictinnovations.com/multi-tenant-setup-in-suite-crm)

---

### 4. Odoo (Full ERP with CRM Module)

**Multi-Company Approach:** Native multi-company module (enterprise-grade)

#### Strengths
- **Built-in multi-company support** from the ground up
- Comprehensive CRM + accounting + inventory + more
- Single database, shared users across companies
- Mature, enterprise-tested solution
- No per-user fees (pay for compute capacity only)

#### Multi-Company Implementation
- **Native multi-company module** included
- Each company has separate:
  - Accounting/financial records
  - Tax rules and compliance settings
  - Branding and configurations
  - Sales pipelines and teams
- Users can access multiple companies with permission controls
- **Switch between companies in same session**

#### How Contacts Work
- ✅ Contacts can be shared across companies
- ✅ Contacts can be company-specific
- ✅ Granular permissions: "User can access Company A and Company B but not Company C"
- ✅ Multi-currency support (great for international)

#### Separate Branding
- ✅ YES - Custom logos, colors, email templates per company
- ✅ YES - Separate email sending domains per company
- ✅ YES - Different invoicing and document branding

#### Lead Routing
- ✅ YES - Assign leads by region, industry, or company
- ✅ YES - Multiple sales pipelines (one per company if needed)
- ✅ YES - Custom workflows and automation per company
- ✅ YES - Multiple sales teams with different permissions

#### Reporting
- ✅ Per-company dashboards and reports
- ✅ Unified cross-company reporting (consolidation)
- ✅ Custom reports filtered by company
- ✅ Advanced analytics and KPIs

#### Cost
- **Community Edition:** Free (self-hosted)
- **Enterprise Edition:** ~$30-50/user/month (includes all apps)
- **Odoo.com SaaS:** Starting at ~$25/user/month
- No linear scaling costs (flat rate, not per-company)

#### Complexity
- **Moderate** - More comprehensive than simple CRM
- Steeper learning curve due to ERP features
- Excellent documentation and large community
- Can start with CRM only, add modules as needed

#### Best For
- Businesses wanting CRM + accounting + more
- International operations (multi-currency)
- Growing companies needing scalability
- Multiple legal entities requiring separate books

#### Verdict for Jennifer
✅✅ **HIGHLY RECOMMENDED** - Best native multi-company support, comprehensive features, reasonable cost

**Sources:**
- [Odoo CRM 2025 Features & Benefits](https://muchconsulting.com/blog/odoo-2/odoo-crm-66)
- [Odoo for Multi-Company Businesses](https://ahex.co/odoo-multi-company-management/)
- [Odoo Multi CRM Solution](https://apps.odoo.com/apps/modules/18.0/odoo_multi_channel_crm)

---

### 5. ERPNext (Open-Source ERP + CRM)

**Multi-Company Approach:** Native multi-company support (ERP foundation)

#### Strengths
- Built-in multi-company accounting and CRM
- Open-source with strong community
- No per-user licensing fees
- Scalable from small to large businesses
- Integrated CRM, accounting, inventory

#### Multi-Company Implementation
- **Native multi-company support** from basic version
- Manage multiple legal entities in one account
- Separate financial records per company
- Multi-currency and multi-language support
- Complete data isolation per company

#### How Contacts Work
- ✅ Contacts can belong to specific companies
- ✅ Lead tracking with company assignment
- ✅ 360-degree customer view across touchpoints
- ✅ Auto-capture leads from multiple channels

#### Separate Branding
- ✅ YES - Custom branding per company entity
- ✅ YES - Separate email templates and letterheads
- ✅ YES - Different document formats per company

#### Lead Routing
- ✅ YES - Auto-assign leads by territory, source, or custom rules
- ✅ YES - Lead scoring and prioritization
- ✅ YES - Custom workflows per company
- ✅ YES - Sales teams with different permissions

#### Reporting
- ✅ Per-company financial and sales reports
- ✅ Cross-company consolidated reporting
- ✅ Custom dashboards and analytics
- ✅ Strong reporting capabilities

#### Cost
- **Self-Hosted:** Free (open-source)
- **Frappe Cloud:** ~$10-50/month (hosted by developers)
- **Enterprise Support:** Available from Frappe Technologies
- Infrastructure: ~$20-50/month for self-hosting

#### Complexity
- **Moderate-High** - Full ERP system (more than CRM)
- Python/Frappe framework (requires technical knowledge)
- Extensive features = longer learning curve
- Great for manufacturing, retail, distribution

#### Best For
- Companies needing ERP + CRM together
- Manufacturing, retail, distribution sectors
- Budget-conscious with technical resources
- Standard CRM needs without deep specialization

#### Verdict for Jennifer
⚠️ **Overkill for Real Estate** - Strong multi-company support but too ERP-focused for real estate business

**Sources:**
- [ERPNext Software Review 2025](https://softwareconnect.com/reviews/erpnext/)
- [ERPNext CRM System](https://www.sigzen.com/erpnext/crm/)
- [ERPNext Features & Capabilities 2025](https://www3.technologyevaluation.com/features-list/erpnext-54247)

---

### 6. HubSpot Business Units (Premium SaaS)

**Multi-Company Approach:** Business Units Add-on (native but expensive)

#### Strengths
- **Industry-leading CRM** with excellent UI/UX
- Native Business Units feature for multi-brand management
- All-in-one marketing, sales, and service platform
- World-class automation and reporting
- No technical setup required (SaaS)

#### Multi-Company Implementation
- **Business Units Add-on** required
- Each business unit gets:
  - Separate domain
  - Custom email subscription preferences
  - Unique branding (logos, colors, brand kits)
  - Dedicated campaigns and workflows
  - Asset organization by unit

#### How Contacts Work
- ✅ Contacts can belong to multiple business units
- ✅ Contacts can be shared across units or isolated
- ✅ Segment by business unit property
- ✅ Lead scoring per business unit
- ⚠️ Overlapping markets supported but complex setup

#### Separate Branding
- ✅ YES - Custom brand kits per business unit
- ✅ YES - Separate email sender identities
- ✅ YES - Different landing pages per unit
- ✅ YES - Unit-specific campaigns and assets

#### Lead Routing
- ✅ YES - Advanced lead routing by business unit
- ✅ YES - Different sales teams per unit
- ✅ YES - Unit-specific workflows and automation
- ✅ YES - Complex routing rules supported

#### Reporting
- ✅ Per-business-unit dashboards and reports
- ✅ Cross-unit consolidated reporting
- ✅ Advanced analytics with custom reports
- ✅ Campaign performance by unit

#### Cost
- **Base Requirement:** Marketing Hub Enterprise (~$3,600/month)
- **Business Units Add-on:** $300-1,000/month per unit
- **Total for 2 units:** ~$4,200-5,200/month
- ❌ **EXPENSIVE** for small businesses

#### Complexity
- **Low** - SaaS platform, no technical setup
- Excellent documentation and support
- Intuitive interface
- Requires strategic planning for unit structure

#### Best For
- Large enterprises with big budgets
- Companies already using HubSpot
- Marketing-heavy organizations
- Multiple brands with overlapping markets

#### Alternative: Multiple HubSpot Portals
- Completely separate HubSpot instances
- Higher cost but complete isolation
- Better for non-overlapping businesses

#### Verdict for Jennifer
⚠️ **Too Expensive** - Excellent features but cost ($4K+/month) is prohibitive for most small businesses

**Sources:**
- [HubSpot Business Units vs Domains](https://www.hubspot.com/hubfs/Business%20Units%20vs.%20Domains%20One-Pagers.pdf)
- [Breaking Down HubSpot 2025 Pricing](https://makewebbetter.com/blog/hubspot-pricing/)
- [Guide to Using HubSpot Business Units](https://www.hublead.io/blog/hubspot-business-units)
- [Introducing HubSpot's Business Units Add-on](https://www.blendb2b.com/blog/introducing-hubspots-business-units-add-on)

---

### 7. SuiteCRM (SugarCRM Open-Source Fork)

**Multi-Company Approach:** Security Groups + MultiCompany Add-on

#### Strengths
- Open-source (fork of SugarCRM)
- Mature CRM with traditional features
- Active community and marketplace
- Security Groups for access control

#### Multi-Company Implementation
- **Option 1:** Use Security Groups + Role-Based Access Control
  - Create groups per company
  - Assign records to groups
  - Control access via roles
  - Single database, logical separation

- **Option 2:** Install MultiCompany Add-on
  - Unique record numbering per company
  - Hide panels/fields per company
  - Different numbering formats (invoices, etc.)
  - Supports multiple branches/locations

- **Option 3:** Deploy separate SuiteCRM instances

#### How Contacts Work (With MultiCompany Add-on)
- ✅ Contacts tagged by company
- ✅ Separate record numbering per company
- ✅ Access control via Security Groups
- ⚠️ Requires careful setup to avoid data mixing

#### Separate Branding
- ⚠️ Limited within single instance
- ✅ Possible with custom development
- ✅ Better with separate instances

#### Lead Routing
- ✅ YES - Team-based routing with Security Groups
- ✅ YES - Workflow automation per company
- ⚠️ Complex setup required

#### Cost
- **Core:** Free (open-source)
- **MultiCompany Add-on:** ~$149 (one-time purchase)
- **SecuritySuite Premium:** ~$495-995 (one-time)
- Infrastructure: ~$10-20/month

#### Complexity
- **Moderate-High** - Security Groups can be tricky
- Older interface compared to modern CRMs
- Requires technical knowledge for optimal setup

#### Best For
- Organizations already using SuiteCRM
- Users wanting traditional CRM interface
- Companies with separate branches needing record isolation

#### Verdict for Jennifer
⚠️ **Mediocre** - Can work but requires workarounds, better options available

**Sources:**
- [SuiteCRM Multi-tenancy Discussion](https://community.suitecrm.com/t/suitecrm-multi-tenancy/65205)
- [Setting Up Multi-Tenant Environment in SuiteCRM](https://www.ictinnovations.com/multi-tenant-setup-in-suite-crm)
- [MultiCompany Add-on](https://store.suitecrm.com/addons/multicompany)
- [SecuritySuite Premium](https://www.sugaroutfitters.com/docs/securitysuite/go-premium)

---

## Special Mention: Purpose-Built Multi-Business CRMs

### Method CRM
**Best for QuickBooks Users with Multiple Businesses**

- **Purpose-built** for managing multiple companies in one system
- Isolated data sets per business entity
- Entity-level workflows and automation
- Unified login with easy switching
- Supports multiple QuickBooks accounts
- Pricing: Contact for quote

**Verdict:** Excellent if using QuickBooks for each business entity

**Source:** [7 Best CRMs for Multiple Businesses](https://www.method.me/blog/crm-for-multiple-businesses/)

---

## Real Estate Industry Consideration

### Engel & Völkers Corporate CRM
Jennifer's Royal Group is affiliated with Engel & Völkers, which has partnered with **Chime** (now Lofty) for their Americas network CRM:

- Custom CRM experience powered by Chime/Lofty
- Automated lead capture and routing
- AI-powered lead scoring
- Branded nurturing campaigns
- Integration with E&V websites and portals
- Mobile-compatible solution

**Question for Jennifer:** Does Royal Group have access to the E&V CRM, or does she need a separate solution?

**Sources:**
- [Engel & Völkers Unveils New CRM](https://www.evrealestate.com/en-US/blog/engel-and-voelkers-unveils-new-crm)
- [Engel & Völkers selects Chime/Lofty](https://lofty.com/blog/engel-volkers-selects-chime-to-power-an-all-new-crm-experience-for-their-agents)

---

## Comparison Matrix

| CRM | Multi-Company | Separate Branding | Contact Sharing | Monthly Cost | Complexity | Best For |
|-----|---------------|-------------------|-----------------|--------------|------------|----------|
| **Mautic** | Multiple instances | ✅ Per instance | ❌ No | Free + hosting ($20-50) | High | Marketing automation |
| **Twenty CRM** | ✅ Native workspaces | ✅ Per workspace | ⚠️ Manual only | Free + hosting ($10-20) | Low-Moderate | Modern interface lovers |
| **EspoCRM** | ⚠️ Workarounds | ❌ Limited | ⚠️ Via custom fields | Free + hosting ($10-20) | Moderate | Single company better |
| **Odoo** | ✅✅ Native multi-company | ✅ Full control | ✅ Yes | $25-50/user | Moderate | Best overall value |
| **ERPNext** | ✅ Native multi-company | ✅ Full control | ✅ Yes | Free + hosting ($20-50) | Moderate-High | ERP needs |
| **HubSpot** | ✅ Business Units | ✅ Full control | ✅ Yes | $4,200-5,200 | Low | Enterprise budgets |
| **SuiteCRM** | ⚠️ Add-ons needed | ⚠️ Limited | ⚠️ Via groups | Free + hosting ($10-20) | Moderate-High | Branch separation |
| **Method CRM** | ✅ Purpose-built | ✅ Full control | ✅ Yes | Contact for quote | Low-Moderate | QuickBooks users |

---

## Recommendations for Jennifer Holmes

### Scenario 1: Royal Group Only (Focus on Real Estate)
**Recommendation:** Check if Engel & Völkers provides CRM access first

If E&V CRM is available:
- Use the E&V/Chime CRM for real estate business
- It's designed specifically for E&V agents
- Already integrated with E&V systems

If E&V CRM is NOT available or insufficient:
- Consider **Odoo** or **Twenty CRM** for flexibility

### Scenario 2: Royal Group + 1-2 Other Businesses
**Recommendation: Odoo (Community or Enterprise)**

**Why Odoo:**
1. ✅ Native multi-company support (no workarounds)
2. ✅ Contacts can be shared OR isolated per company
3. ✅ Separate branding, email domains, templates per company
4. ✅ Unified reporting + per-company reporting
5. ✅ Reasonable cost ($25-50/user vs. HubSpot's $4K+/month)
6. ✅ Can start with CRM, add accounting/invoicing later
7. ✅ Multi-currency support (if international)
8. ✅ Mature, enterprise-tested platform

**Setup Approach:**
- Company 1: Royal Group (Real Estate)
- Company 2: Second Business
- Company N: Additional ventures

**Cost Estimate:**
- 1-2 users: ~$50-100/month (Community Edition self-hosted) or ~$50-100/month (Odoo.com SaaS)
- 3-5 users: ~$150-250/month

### Scenario 3: Budget is Primary Concern
**Recommendation: Twenty CRM (Self-Hosted)**

**Why Twenty:**
1. ✅ Free and open-source
2. ✅ Native multi-workspace design
3. ✅ Modern, clean interface
4. ✅ Low hosting costs (~$10-20/month)
5. ⚠️ Email features still maturing (can integrate with external email tools)

**Trade-offs:**
- Newer platform (less mature than Odoo)
- Smaller ecosystem
- May need to integrate with external email marketing tool

### Scenario 4: Want Simplicity, Have Budget
**Recommendation: HubSpot Business Units**

**Only if:**
- Budget allows $4,000-5,000/month
- Marketing automation is critical
- Prefer SaaS (no technical management)
- Want best-in-class features and support

### Scenario 5: Using QuickBooks for Each Business
**Recommendation: Method CRM**

**Why Method:**
- Purpose-built for multi-business QuickBooks users
- Native QuickBooks integration per company
- Designed specifically for this use case

---

## Implementation Approaches

### Approach A: Single CRM Instance with Multi-Company
**Best for:** Related businesses, shared contacts, unified operations

**Platforms:**
- Odoo (best)
- ERPNext (if ERP needed)
- HubSpot Business Units (if budget allows)
- Twenty CRM (budget option)

**Pros:**
- ✅ One login, switch between companies
- ✅ Shared contacts when needed
- ✅ Unified reporting across all businesses
- ✅ Lower total cost of ownership

**Cons:**
- ⚠️ Requires platform with native multi-company support
- ⚠️ More complex initial setup

### Approach B: Multiple Separate CRM Instances
**Best for:** Completely unrelated businesses, different teams, maximum isolation

**Platforms:**
- Mautic (multiple Docker instances)
- EspoCRM (multiple subdomains)
- SuiteCRM (multiple installations)
- Twenty CRM (multiple workspaces = middle ground)

**Pros:**
- ✅ Complete data isolation
- ✅ No risk of cross-contamination
- ✅ Can use different CRMs per business if needed
- ✅ Independent customization

**Cons:**
- ❌ Multiple logins required
- ❌ No unified reporting (manual aggregation)
- ❌ Higher maintenance overhead
- ❌ More expensive (infrastructure per instance)

### Approach C: Hybrid (CRM + Tagging)
**Best for:** Single primary business with side projects

**Implementation:**
- Use any CRM (even simple ones like Odoo, Twenty, or SuiteCRM)
- Add custom "Business Unit" or "Company" field/tag
- Segment contacts by tag
- Use filtered views per business

**Pros:**
- ✅ Simplest setup
- ✅ Works with most CRMs
- ✅ Lowest cost

**Cons:**
- ⚠️ No true isolation (careful filtering needed)
- ⚠️ Separate branding more difficult
- ⚠️ No built-in per-company reporting

---

## Key Questions for Jennifer

1. **Does Royal Group have access to Engel & Völkers' corporate CRM (powered by Chime/Lofty)?**
   - If yes, can it be used for non-real-estate businesses too?

2. **How many businesses/brands need to be managed?**
   - Just Royal Group + 1 other?
   - Or 3+ separate entities?

3. **Do contacts overlap between businesses?**
   - Same person might be a client for multiple services?
   - Or completely separate customer bases?

4. **What's the monthly budget for CRM?**
   - Under $100/month (open-source options)
   - $100-500/month (Odoo, Method CRM)
   - $1,000+/month (HubSpot, enterprise)

5. **Technical resources available?**
   - Comfortable with self-hosting (Odoo, Twenty, ERPNext)?
   - Need fully managed SaaS (HubSpot)?
   - Have IT support or developer on team?

6. **Primary use cases beyond contact management?**
   - Heavy email marketing? (Mautic, HubSpot)
   - Invoicing/accounting? (Odoo, ERPNext)
   - Real estate-specific features? (E&V CRM, specialized real estate CRMs)
   - Basic CRM only? (Twenty, EspoCRM)

7. **Team size?**
   - Solo (Jennifer only)?
   - 2-5 people?
   - Larger team?

---

## Final Recommendation

**For Jennifer Holmes with Royal Group (Engel & Völkers) + Other Businesses:**

### Top Choice: Odoo Community Edition (Self-Hosted) or Odoo.com (SaaS)

**Why:**
1. Native multi-company support (no hacks)
2. Comprehensive CRM + optional accounting, invoicing, inventory
3. Reasonable pricing (~$50-100/month for 1-2 users)
4. Mature, well-documented, large community
5. Can handle real estate + any other business type
6. Separate branding, emails, reporting per company
7. Unified dashboard with cross-company visibility

**Getting Started:**
1. **Free Trial:** Start with Odoo.com 15-day trial (no credit card)
2. **Setup:** Create Company 1 (Royal Group), Company 2 (Other Business)
3. **Test:** Import sample contacts, test segmentation and email branding
4. **Decide:** Choose SaaS ($25/user/month) or self-host (free software, hosting ~$20/month)

**Alternative if Budget is Tight:** Twenty CRM (free, modern, multi-workspace)

**Alternative if Already Using QuickBooks:** Method CRM (purpose-built for multi-business QB users)

---

## Next Steps

1. **Clarify with Jennifer:**
   - Engel & Völkers CRM access?
   - Number of businesses to manage?
   - Budget constraints?
   - Technical comfort level?

2. **Trial Top Options:**
   - Odoo.com (15-day free trial)
   - Twenty CRM (self-host or wait for SaaS beta)
   - Method CRM (request demo if using QuickBooks)

3. **Pilot with Real Data:**
   - Import 50-100 contacts
   - Test separate branding per company
   - Create sample email campaigns
   - Generate reports

4. **Make Final Decision:**
   - Based on hands-on experience
   - Consider long-term scalability
   - Factor in team training time

---

## Additional Resources

### CRM Selection & Segmentation
- [7 Best CRMs for Multiple Businesses](https://www.method.me/blog/crm-for-multiple-businesses/)
- [CRM Segmentation Guide 2025](https://monday.com/blog/crm-and-sales/customer-segmentation/)
- [10 Best Customer Segmentation Tools](https://clevertap.com/blog/customer-segmentation-tools/)
- [How to Use CRM Tags for Organization](https://www.officeclip.com/blog/post/organize-information-in-your-crm-using-tags)

### Multi-Company CRM Insights
- [Open Source Multi-Tenant CRM 2025](https://www.ictinnovations.com/searching-for-a-crm-to-empower-your-team-discover-the-potential-of-open-source-multi-tenant-crm)

---

**Document Version:** 1.0
**Last Updated:** December 10, 2025
**Contact:** For questions about this research, reach out to your implementation team.
