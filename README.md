👋 Hi, my name is **Tobias Deekens**. I'm a **Software Engineer**, retired basketball player, coffee snob an lousy guitar player.

## Development

The site is built with [Astro](https://astro.build) and served from [Bunny](https://bunny.net) (storage + CDN + one edge script). See [`docs/migration-plan.md`](docs/migration-plan.md) for the architecture and deployment setup.

```sh
pnpm dev            # Astro dev server
pnpm test           # Vitest
pnpm build          # static site (dist/), markdown + chat context, edge bundle (dist-edge/)
pnpm serve:local    # serve dist/ through the edge handler on :4322
pnpm parity snapshot <url> <file> && pnpm parity diff <a> <b>
```

The "Ask about me" chat needs `AI_API_KEY` and `AI_MODEL` (plus `AI_BASE_URL` for a gateway, `AI_PROVIDER=openai-compatible` for non-Anthropic APIs).
