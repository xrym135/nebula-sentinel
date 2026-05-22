# Contributing to Nebula Sentinel

Thank you for your interest in contributing. Nebula Sentinel v0.8.x welcomes fixes, documentation improvements, and UI enhancements.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<you>/nebula-sentinel.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`
5. Run locally: `npm run dev`
6. Before PR: `npm run lint && npm run build`

## Development Guidelines

- Match existing TypeScript and Tailwind conventions
- Keep SOC UI changes in `components/soc/` when possible
- Prefer small, focused PRs
- Update `CHANGELOG.md` under `[Unreleased]` for user-visible changes
- Do not commit `.env.local` or API keys

## Commit Messages

Use clear, imperative subjects. Describe **product changes only** — avoid vendor names, grant programs, or words like `demo`, `showcase`, `mock`, `wip`.

**Good:**

```
feat: add CVE remediation workflow panel
fix: align incident modal on mobile
docs: update deployment guide
chore: refine GitHub Pages workflow
```

**Avoid:**

```
feat: orbit application demo
chore: remove xiaomi branding for showcase
fix: fake data for reviewers
```

Prefixes: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`

## Pull Request Process

1. Fill out the PR template completely
2. Link related issues if any
3. Ensure CI passes (lint + build)
4. Add screenshots for UI changes
5. Wait for maintainer review

## Code of Conduct

Be respectful and constructive. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Questions

Open a [GitHub Discussion](https://github.com/xrym135/nebula-sentinel/discussions) or issue with the `question` label.
