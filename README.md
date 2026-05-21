# Nebula Sentinel

<p align="center">
  <strong>AI-native Security Operations Center</strong><br/>
  Powered by <a href="https://www.xiaomimimo.com/">MiMo V2.5</a> · Early Access <code>v0.8.2</code>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#roadmap">Roadmap</a> ·
  <a href="docs/DEPLOYMENT.md">Deploy</a> ·
  <a href="CHANGELOG.md">Changelog</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.8.2-blue" alt="version"/>
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/MiMo-V2.5-purple" alt="MiMo"/>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license"/>
</p>

---

Nebula Sentinel is an enterprise **AI SOC platform** that unifies threat correlation, multi-agent reasoning, MCP tool orchestration, and autonomous incident response — built on **MiMo V2.5** long-context and parallel tool-calling capabilities.

> **Status:** Early Access — core console and agent workflows are functional; API gateway and persistence layers are rolling out in v0.9.

<p align="center">
  <a href="https://YOUR_USERNAME.github.io/nebula-sentinel-ai-soc/"><strong>🌐 Live Demo (GitHub Pages)</strong></a> ·
  <a href="https://nebula-sentinel-ai-soc.vercel.app"><strong>Live Demo (Vercel)</strong></a> ·
  <a href="docs/GITHUB_SHOWCASE.md">如何部署展示</a>
</p>

## Features

| Module | Description |
|--------|-------------|
| **Attack Graph** | Kill-chain visualization with stage intelligence and correlation confidence |
| **Multi-Agent Workflow** | Threat · CVE · Forensics · Response agents with live pipeline status |
| **AI Threat Analysis** | MiMo-V2.5-Reasoner pattern detection and playbook suggestions |
| **Incident Timeline** | Severity-ranked events with one-click response actions |
| **CVE Intelligence** | CVSS prioritization and remediation workflows |
| **MCP Tool Gateway** | `query_threat_intel`, `search_logs`, `isolate_pod`, and more |
| **Agent Console** | CLI-style orchestration for security operators |
| **AI Assistant** | Natural-language incident summaries and graph explanations |
| **Dynamic Risk Engine** | Real-time risk score, GPU, and inference token metrics |

## Quick Start

**Requirements:** Node.js 20+, npm 10+

```bash
git clone https://github.com/YOUR_USERNAME/nebula-sentinel-ai-soc.git
cd nebula-sentinel-ai-soc
npm install
cp .env.example .env.local   # optional — UI runs without API key
npm run dev
```

Open **http://localhost:3000**

```bash
npm run build   # production build
npm run start   # production server
npm run lint    # ESLint
```

## Configuration

See [`.env.example`](.env.example) for all variables.

| Variable | Required | Description |
|----------|----------|-------------|
| `MIMO_API_KEY` | v0.9+ | MiMo Open Platform API key |
| `MIMO_BASE_URL` | No | API endpoint (default: MiMo cloud) |
| `SOC_CLUSTER_ID` | No | Target cluster identifier |
| `TELEMETRY_WS_URL` | v0.9+ | Real-time telemetry WebSocket |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Nebula Sentinel UI                     │
│         (Next.js · Attack Graph · Timeline · CVE)      │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│              Agent Orchestrator (in progress)            │
│   Threat Agent │ CVE Agent │ Forensics │ Response       │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   MCP Tool Gateway                       │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│              MiMo V2.5 API · Telemetry · Event Store     │
└─────────────────────────────────────────────────────────┘
```

Full details: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Project Structure

```
nebula-sentinel/
├── app/                      # Next.js App Router
├── components/
│   ├── NebulaSentinelSOC.tsx # SOC shell
│   └── soc/                  # SOC modules (UI, state, data)
├── docs/                     # Architecture, API, deployment
├── .github/                  # CI, issue & PR templates
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

## Roadmap

| Version | Focus |
|---------|--------|
| **v0.8** ✅ | SOC console, agents, MCP UI, AI assistant |
| **v0.9** 🚧 | MiMo API streaming, WebSocket telemetry |
| **v1.0** 📋 | PostgreSQL incidents, SOAR playbooks, React Flow graph |

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Deploy

One-click deploy on Vercel or Netlify — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Contributing

Contributions welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.

## Security

Report vulnerabilities via [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2026 Nebula Sentinel Contributors

## Acknowledgments

- [MiMo V2.5](https://www.xiaomimimo.com/) — reasoning, long context, tool calling
- Built with [Next.js](https://nextjs.org/) and [Cursor](https://cursor.com/)
