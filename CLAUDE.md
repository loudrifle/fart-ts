# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`fart-ts` is a TypeScript rewrite of `fart.js` — a browser-based audio library for playing fart sounds. It has no build system or package.json; `fart.ts` is the entire library.

## Architecture

- **`fart.ts`** — the full library. Exports a single `Fart` class that wraps a browser `HTMLAudioElement`. Sound files are served from `/farts/` as either `.mp3` or `.wav` (chosen at runtime via `canPlayType`).
- **`index.html`** — a demo page that uses the compiled output (`../js/fart.js`) and jQuery. It is not wired to a build step in this repo.

## Key design points

- `farts` is a const object mapping human-readable names → filenames (`fart1`–`fart14`). `FartName` is derived from its keys via `keyof typeof farts`.
- `Options.volume` is 0–100 (divided by 100 before setting on the `HTMLAudioElement`).
- `preload()` is idempotent (guarded by `this.preloaded`), called automatically in `init()`.
- There is no bundler, test runner, or linter configured. To compile: `tsc fart.ts`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
