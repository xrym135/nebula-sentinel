# Architecture

## Overview

Nebula Sentinel is a **layered AI SOC platform**. The current Early Access release (`v0.8`) ships the **operator console** and **client-side agent orchestration UI**. Backend services and persistent stores are introduced incrementally in v0.9+.

## System Layers

### 1. Presentation Layer (`app/`, `components/`)

- Next.js 16 App Router
- React 19 client components for real-time SOC interactions
- Tailwind CSS 4 for enterprise dark-theme UI

Responsibilities:

- Attack graph and incident visualization
- Agent workflow monitoring
- MCP tool invocation UI
- AI assistant and operator console

### 2. Application State (`components/soc/`)

| Module | Role |
|--------|------|
| `data.ts` | Domain models: incidents, agents, CVEs, attack nodes |
| `SocUI.tsx` | Shared UI primitives, drawers, interaction hooks |

State is held in React hooks today; v0.9 will sync with server state via WebSocket and REST.

### 3. Agent Orchestrator (v0.9)

Planned service responsibilities:

- Schedule parallel agent pipelines (Threat → CVE → Forensics → Response)
- Track job status and tool-call audit trail
- Stream partial reasoning output from MiMo V2.5

### 4. MCP Tool Gateway

Standardized security tools exposed to agents:

| Tool | Purpose |
|------|---------|
| `query_threat_intel` | IOC / ATT&CK enrichment |
| `search_logs` | Hybrid log + vector retrieval |
| `isolate_pod` | Kubernetes network isolation |
| `generate_report` | Incident export |
| `run_sandbox` | Sample detonation |

### 5. AI Engine — MiMo V2.5

- **Reasoner** model for multi-step threat analysis
- **1M token** context for cross-source correlation
- **Parallel tool calling** for agent pipelines

### 6. Data Plane (v0.9+)

| Store | Usage |
|-------|--------|
| PostgreSQL | Incidents, playbooks, audit logs |
| Object storage | Report artifacts, forensic dumps |
| Vector index | Threat docs, historical telemetry |
| Redis (optional) | Session cache, rate limits |

## Request Flow (Target v1.0)

```
Operator Action
      │
      ▼
┌─────────────┐     ┌──────────────────┐
│  Next.js UI │────▶│  API Routes / BFF  │
└─────────────┘     └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        Orchestrator    MiMo API      Telemetry WS
              │
              ▼
         MCP Tools → Cloud / K8s / SIEM
```

## Security Model

- API keys only on server-side routes (never exposed to browser)
- RBAC for operator actions (planned)
- Audit log for all autonomous mitigations

## Version Matrix

| Component | v0.8 | v0.9 | v1.0 |
|-----------|------|------|------|
| SOC Console | ✅ | ✅ | ✅ |
| Agent UI | ✅ | ✅ | ✅ |
| MiMo API | UI ready | ✅ | ✅ |
| Persistence | — | Partial | ✅ |
| SOAR Editor | — | — | ✅ |
