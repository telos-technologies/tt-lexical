# Telos Technologies Lexical Editor Standalone Build Only Files

## How to update this package with the latest changes from the Lexical official repo?

This branch is base on `main -> tt-lexical -> tt-lexical-editor` branches

- `git checkout main`
- `git pull upstream/main` to update
- `git push`
- `git checkout tt-lexical`
- `git rebase main`
- `git push`
- `git checkout tt-lexical-editor`
- `git rebase tt-lexical`
- `yarn build`
- `git push`
- `git checkout tt-lexical-standalone-build-only`
- `git rebase tt-lexical-editor`
- `git push`
