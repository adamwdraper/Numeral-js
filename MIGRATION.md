# Migration Guide

## Upgrading to 3.0.0

Version `3.0.0` keeps the public runtime behavior from `2.0.x`, but modernizes the project internals and packaging.

### Breaking changes

1. Node.js requirement is now `>=18`.
2. The project source of truth is now TypeScript in `src/**/*.ts`.

### Notable updates

1. First-party TypeScript declarations are bundled via `numeral.d.ts`.
2. CI now runs on GitHub Actions against Node `18`, `20`, and `22`.
3. Core build/test scripts now compile TypeScript before running Grunt tasks.

### New development commands

1. `npm run build:core` compiles TypeScript sources into JavaScript files.
2. `npm run build` compiles TypeScript and runs the Grunt build pipeline.
3. `npm run dist` compiles TypeScript and builds minified distribution files.
4. `npm test` compiles TypeScript and runs the Node test suite.
