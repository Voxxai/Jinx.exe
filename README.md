# Jinx.exe

[![CI](https://github.com/Voxxai/Jinx.exe/actions/workflows/ci.yml/badge.svg)](https://github.com/Voxxai/Jinx.exe/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Voxxai/Jinx.exe/actions/workflows/codeql.yml/badge.svg)](https://github.com/Voxxai/Jinx.exe/actions/workflows/codeql.yml)
[![Release](https://img.shields.io/github/v/release/Voxxai/Jinx.exe?include_prereleases&sort=semver)](https://github.com/Voxxai/Jinx.exe/releases)
[![License](https://img.shields.io/github/license/Voxxai/Jinx.exe)](LICENSE)

> An interactive, chaos-powered desktop companion for streams.

Jinx.exe is a long-term passion project by **Voxxai**. The app will react to Twitch events,
OBS, music and manual Stream Deck triggers through animations, speech and sound.

The repository currently contains the first project foundation: a Tauri 2 desktop shell,
React control surface and a tested event-to-reaction engine.

## Planned integrations

- Twitch EventSub for follows, subscriptions, raids and channel-point rewards
- OBS WebSocket for scene-aware reactions and a transparent browser-source overlay
- Spotify-aware animation states
- Configurable TTS, cooldowns and moderation safeguards
- Stream Deck controls and a plugin-friendly event bus

## Tech stack

- Tauri 2 and Rust
- React 19, TypeScript and Vite
- Vitest and Testing Library
- ESLint, Prettier, Commitlint and Husky
- GitHub Actions, CodeQL and Dependabot

## Development

Prerequisites: Node.js 24+, npm 11+, Rust stable and the
[Tauri system dependencies](https://v2.tauri.app/start/prerequisites/).

```bash
npm ci
npm run dev
```

Run the desktop application with:

```bash
npm run tauri dev
```

Before opening a pull request:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:coverage
npm run build
```

## Workflow

`main` is protected. All changes go through a pull request and must pass the required CI
checks. Pull-request titles and commits use [Conventional Commits](https://www.conventionalcommits.org/).
Squash merging keeps the history linear.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md) and the
[project roadmap](docs/ROADMAP.md) for details.

## Releases

Releases follow Semantic Versioning. Version changes and changelog entries go through a
protected release PR; a `vX.Y.Z` tag then produces draft releases and native desktop builds.
See the [changelog](CHANGELOG.md), [release history](https://github.com/Voxxai/Jinx.exe/releases)
and [maintainer release guide](docs/RELEASING.md).

## Fan-project notice

This is an unofficial, non-commercial fan project. It is not endorsed by or affiliated with
Riot Games. Jinx, League of Legends and related marks belong to Riot Games. The MIT license
applies to the original source code in this repository only; it does not grant rights to any
third-party characters, names, artwork, audio or trademarks.

## License

Original source code is available under the [MIT License](LICENSE).
