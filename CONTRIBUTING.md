# Contributing

Thanks for helping make the chaos better.

## Branch workflow

1. Create a branch from `main` using `feat/`, `fix/`, `docs/`, `chore/` or `refactor/`.
2. Keep commits focused and use Conventional Commits, for example:
   `feat(twitch): handle raid events`.
3. Add or update tests for behavioral changes.
4. Open a pull request using the repository template.
5. Resolve all conversations and wait for every required check to pass.
6. Squash merge using the PR title as the final commit message.

Direct pushes, force-pushes and branch deletion are disabled on `main`.

## Quality expectations

- No secrets, API tokens or copyrighted game assets may be committed.
- New integrations must degrade gracefully when disconnected.
- Viewer-provided text must be validated before display or TTS playback.
- Accessible UI and reduced-motion preferences are part of the definition of done.
- User-visible changes belong under `Unreleased` in `CHANGELOG.md`.

## Releases

Releases follow Semantic Versioning and are prepared through a dedicated release PR. See
[docs/RELEASING.md](docs/RELEASING.md) for the complete checklist.
