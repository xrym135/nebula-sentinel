# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.8.x   | :white_check_mark: |
| < 0.8   | :x:                |

## Reporting a Vulnerability

If you discover a security issue in Nebula Sentinel:

1. **Do not** open a public GitHub issue for sensitive reports
2. Email the maintainers (replace with your contact): `security@your-domain.com`
3. Or use GitHub **Private vulnerability reporting** if enabled on the repository

Include:

- Description of the vulnerability
- Steps to reproduce
- Impact assessment
- Suggested fix (optional)

We aim to acknowledge reports within **72 hours** and provide a status update within **7 days**.

## Scope

- Nebula Sentinel application code in this repository
- Misconfiguration of `MIMO_API_KEY` or deployment secrets (user responsibility)

Out of scope: third-party services (Vercel, MiMo API infrastructure) unless introduced by our integration code.

## Secure Development

- Never commit API keys or `.env.local`
- Use `.env.example` as the only committed env template
- Rotate `MIMO_API_KEY` if exposed
