# Releasing Jinx.exe

Releases are deliberate and maintainer-controlled. Version changes must pass through the same
protected pull-request workflow as every other change.

## Version policy

Jinx.exe follows Semantic Versioning:

- `PATCH` for backwards-compatible fixes.
- `MINOR` for backwards-compatible features.
- `MAJOR` for breaking changes.
- Versions below `1.0.0` may still contain intentional breaking changes.

Keep the version identical in `package.json`, `package-lock.json`,
`src-tauri/tauri.conf.json` and `src-tauri/Cargo.toml`.

## Release checklist

1. Create a branch named `release/vX.Y.Z` from an up-to-date `main`.
2. Update every project version and run `npm install --package-lock-only`.
3. Move relevant entries from `Unreleased` into `## [X.Y.Z] - YYYY-MM-DD` in
   `CHANGELOG.md`, then add a fresh empty `Unreleased` section.
4. Open a PR titled `chore(release): vX.Y.Z` and apply the `release` label.
5. Wait for every required check, review the generated changelog and squash merge.
6. Create and push the annotated tag from the merge commit:

   ```bash
   git switch main
   git pull --ff-only
   git tag -a vX.Y.Z -m "Jinx.exe vX.Y.Z"
   git push origin vX.Y.Z
   ```

7. GitHub Actions validates the tag, builds all desktop targets and creates or updates a draft
   GitHub Release with generated release notes.
8. Download and smoke-test the installers, edit the notes if needed, then publish the draft.

Never move or reuse a published version tag. If a release is broken, fix it in a new patch
release.
