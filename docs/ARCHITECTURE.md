# Architecture

## Overview

Nebula Sentinel is a **layered AI SOC platform**. Release `v0.8` ships the operator console and client-side agent orchestration UI. Backend services and persistence roll out in v0.9+.

## System Layers

### 1. Presentation Layer

Next.js 16 · React 19 · Tailwind CSS 4

- Attack graph and incident visualization
- Agent workflow monitoring
- MCP tool invocation UI
- AI assistant and operator console

### 2. Application State (`components/soc/`)

| Module | Role |
|--------|------|
| `data.ts` | Incidents, agents, CVEs, attack nodes |
| `SocUI.tsx` | Drawers, toasts, interaction hooks |

### 3. Agent Orchestrator (v0.9)

- Parallel pipelines: Threat → CVE → Forensics → Response
- Tool-call audit trail
- Streaming reasoning output

### 4. MCP Tool Gateway

| Tool | Purpose |
|------|---------|
| `query_threat_intel` | IOC / ATT&CK enrichment |
| `search_logs` | Hybrid log + vector retrieval |
| `isolate_pod` | Kubernetes network isolation |
| `generate_report` | Incident export |
| `run_sandbox` | Sample detonation |

### 5. Inference Layer

- Multi-step threat analysis
- Long-context correlation across logs and events
- Parallel tool calling for agent pipelines

### 6. Data Plane (v0.9+)

PostgreSQL · object storage · vector index · optional Redis cache

## Target Request Flow (v1.0)

```
UI → API / BFF → Orchestrator → Inference API + Telemetry
                      ↓
                 MCP Tools → Cloud / K8s / SIEM
```

## Version Matrix

| Component | v0.8 | v0.9 | v1.0 |
|-----------|------|------|------|
| SOC Console | ✅ | ✅ | ✅ |
| Agent UI | ✅ | ✅ | ✅ |
| Inference API | UI ready | ✅ | ✅ |
| Persistence | — | Partial | ✅ |
| SOAR Editor | — | — | ✅ |
