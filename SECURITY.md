# Security policy

## Supported versions

Until the first stable release, only the latest commit on `main` receives security fixes.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting feature instead of opening a public issue.
Include reproduction steps, impact and a suggested mitigation when possible. Do not include
access tokens, viewer data or other secrets in reports.

## Secrets

Twitch, Spotify and OBS credentials must be stored in local environment variables or the
operating-system credential store. They must never be bundled into frontend code or committed.
