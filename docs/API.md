# API Reference (Planned)

> **Note:** v0.8 operates as a standalone console. The endpoints below define the **v0.9 contract** and are listed for integrators and contributors.

Base URL: `https://your-deployment.com/api/v1`

Authentication: `Authorization: Bearer <MIMO_API_KEY>` (server-side)

---

## Incidents

### `GET /incidents`

List security incidents.

**Query:** `severity`, `status`, `limit`, `cursor`

**Response:**

```json
{
  "data": [
    {
      "id": "INC-2026-8821",
      "title": "Kubernetes Privilege Escalation",
      "severity": "CRITICAL",
      "status": "investigating"
    }
  ],
  "meta": { "total": 42 }
}
```

### `GET /incidents/:id`

Full incident detail with correlated attack path.

### `POST /incidents/:id/actions`

Dispatch a response action.

**Body:**

```json
{
  "action": "isolate_pod",
  "params": { "namespace": "payment", "pod": "api-7f2" }
}
```

---

## Agents

### `GET /agents`

Current multi-agent pipeline status.

### `POST /agents/analyze`

Trigger parallel analysis for an incident.

**Body:**

```json
{
  "incidentId": "INC-2026-8821",
  "agents": ["threat", "cve", "forensics", "response"]
}
```

---

## Attack Graph

### `GET /graphs/:incidentId`

Kill-chain nodes and correlation scores.

---

## MCP Tools

### `POST /mcp/invoke`

Execute a registered MCP tool.

**Body:**

```json
{
  "tool": "query_threat_intel",
  "arguments": { "ioc": "185.220.x.x" }
}
```

---

## AI Assistant

### `POST /chat`

Stream MiMo-powered security Q&A.

**Body:**

```json
{
  "message": "Summarize critical incident",
  "context": { "incidentId": "INC-2026-8821" }
}
```

**Response:** Server-Sent Events stream (v0.9).

---

## Telemetry

### `WS /telemetry`

Real-time security events (v0.9).

---

## Error Format

```json
{
  "error": {
    "code": "AGENT_BUSY",
    "message": "Analysis pipeline already running"
  }
}
```
