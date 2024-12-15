# Telos Technologies Lexical Editor

The main difference between this branch and the `tt-lexical` is that we manually removed all functionality related to Excalidraw, Mentions, Comments, Hashtags, Keywords, Figma, Poll, Table of Content and Collaboration.

## How to update this package with the latest changes from the Lexical official repo?

This branch is base on `main -> tt-lexical` branches

- `git checkout main`
- `git pull upstream/main` to update
- `git push`
- `git checkout tt-lexical`
- `git rebase main`
- `git push`
- `git checkout feature/sa/tt-lexical-editor`
- `git rebase tt-lexical`
- do necessary changes
- `npm run build:standalone`
- `git push`
- `git checkout tt-lexical-standalone-build-only`
- `git rebase feature/sa/tt-lexical-editor`
- when rebasing if changes are in the files that were deleted commit them and accept deletion
- `git rebase --continue`
- `bump up version in package.json`
- `git push`
