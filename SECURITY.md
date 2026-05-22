# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.8.x   | Yes       |
| < 0.8   | No        |

## Reporting a Vulnerability

Do not open public issues for sensitive reports. Use GitHub private vulnerability reporting or contact the maintainers.

## Scope

- Nebula Sentinel application code in this repository
- Misconfiguration of API keys or deployment secrets

## Secure Development

- Never commit `.env.local` or API keys
- Use `.env.example` as the only committed env template
- Rotate credentials if exposed
