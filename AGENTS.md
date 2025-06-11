# 🏥 Thai Clinic SaaS — Developer Workspace Overview

This document serves as the starting point for project implementation, Codex collaboration, and development guidance.

---

## 🔧 Tech Stack

- **Frontend**: Next.js (App Router) with Tailwind CSS
- **UI Kit**: shadcn/ui (used wherever possible for consistency)
- **Backend**: NestJS
- **Database**: PostgreSQL
- **Cache/Queue**: Redis
- **DevOps**: Docker
- **Workflow**: SaaS, subscription-based, multi-tenant architecture

---

## 👥 User Roles

- **Owner**: Manages the clinic, staff, billing, and reports
- **Staff**: Registers patients, handles queue, billing, payments
- **Doctor**: Manages consultation, notes, prescriptions
- **Admin**: Oversees all clinics and system settings (internal)

---

## 🧱 Frontend Structure Guidelines

- Use **shadcn/ui** where possible
- Custom components should be **generic and reusable**
- Layout follows this pattern:

```
src/
├── app/
│   ├── dashboard
│   ├── queue
│   ├── patients
│   ├── orders
│   ├── billing
│   ├── settings
├── components/
│   ├── layout/
│   ├── ui/
│   └── shared/
```

- Naming examples: `PatientCard`, `QueueTable`, `VisitNoteEditor`

---

## 🎨 UI/UX Collaboration

- **Stitch** is used to generate HTML/CSS
- When importing from Stitch:
  - Use Codex or GPT to split HTML into components
  - Replace inline styles with Tailwind classes
  - Place shared elements into `components/layout/` or `components/ui/`
  - Keep business logic minimal during componentization

### 🧼 Tailwind Style Convention

To maintain clean and readable React components:

#### ✅ Use Class Constants (Preferred)
- Declare reusable Tailwind strings in `const` variables.
- Keeps class logic colocated with JSX.
- Easier to maintain when used with GPT/Codex tools.
- Ideal for small teams and consistent shadcn/ui integration.

```tsx
const cardBase = "rounded-lg shadow-md p-4 bg-white";
return <div className={cardBase}>...</div>;
```

#### 🚫 Avoid Excessive Inline Tailwind
- Inline class strings can clutter JSX and make components hard to scan.
- Use class constants instead for readability.

#### 🟡 `@apply` in CSS (Optional)
- Useful for complex, shared styles across non-React contexts.
- Suitable when CSS Modules or design tokens are involved.
- Less ideal for Tailwind + component-based workflows unless needed.

---

## 📦 Reusable Page Composition Pattern

Pages with similar structure should share grouped components:

**Structure:**
1. **Top Section**: Filter bar
2. **Middle Section**: Summary cards, metrics, or chart
3. **Bottom Section**: Table with export buttons (CSV, PDF)

> Codex/GPT should help scaffold `ReportFilterBar`, `SummaryCardRow`, `DataTableWithExport`

---

## 🔁 Role-Based Workflow Summary

### Owner:
1. View and manage queue and patient list
2. Monitor clinic performance via reports
3. Invite and manage staff and doctors
4. Configure clinic settings and services
5. Manage subscription and billing

### Staff:
1. Register new or returning patients
2. Add patients to queue
3. Check and input patient vitals
4. Finalize doctor's orders for billing
5. Process payments

### Doctor:
1. View assigned patients from queue
2. Start consultation and review patient history
3. Record visit notes, prescriptions, and services
4. Use templates or autocomplete
5. Add follow-up if needed
6. Mark consultation as completed
7. Optionally generate MC (Medical Certificate)

### Admin:
1. Monitor all clinics and usage stats
2. Review and verify subscription payments
3. Manage global system settings and feature flags
4. Access system logs and audit data

---

## 🔐 Role-Based Permissions

| Feature / Module         | Owner | Staff | Doctor | Admin |
|--------------------------|:-----:|:-----:|:------:|:-----:|
| View Queue               |   ✅   |   ✅   |   ✅    |   🔍   |
| Add to Queue             |   ✅   |   ✅   |   ❌    |   ❌   |
| Manage Queue (Reorder/Cancel) | ✅ | ✅ | ❌ | 🔍 |
| Patient Registration     |   ✅   |   ✅   |   ❌    |   🔍   |
| View Patient List        |   ✅   |   ✅   |   ✅    |   🔍   |
| Input Vitals             |   ✅   |   ✅   |   ❌    |   ❌   |
| Start Consultation       |   ❌   |   ❌   |   ✅    |   ❌   |
| Write Notes & Prescriptions | ❌ | ❌ | ✅ | ❌ |
| Use Prescription Templates | ✅ | 🔧 | ✅ | ❌ |
| Finalize Order for Billing | ✅ | ✅ | ❌ | 🔍 |
| Payment Processing       |   ✅   |   ✅   |   ❌    |   ❌   |
| Staff & Doctor Management|   ✅   |   ❌   |   ❌    |   🔍   |
| Clinic Settings          |   ✅   |   🔧   |   ❌    |   🔍   |
| View Reports             |   ✅   |   ❌   |   ❌    |   ✅   |
| Subscription & Billing   |   ✅   |   ❌   |   ❌    |   ✅   |
| Global Settings & Logs   |   ❌   |   ❌   |   ❌    |   ✅   |

---

## 📝 Permission Notes

- 🔧 **Partial Access** means owners can toggle specific permissions for trusted staff, such as:
  - Managing clinic services and pricing
  - Editing prescription templates
- This helps balance control and flexibility in smaller clinics with limited staff.