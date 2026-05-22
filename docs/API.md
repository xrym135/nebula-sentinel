# API Reference (v0.9)

Base URL: `/api/v1` · Authentication: `Authorization: Bearer <AI_API_KEY>` (server-side only)

## Incidents

- `GET /incidents` — list with filters
- `GET /incidents/:id` — detail and attack path
- `POST /incidents/:id/actions` — dispatch response action

## Agents

- `GET /agents` — pipeline status
- `POST /agents/analyze` — trigger parallel analysis

## Attack Graph

- `GET /graphs/:incidentId` — nodes and correlation scores

## MCP

- `POST /mcp/invoke` — execute registered tool

## Assistant

- `POST /chat` — security Q&A (SSE stream in v0.9)

## Telemetry

- `WS /telemetry` — real-time events (v0.9)
