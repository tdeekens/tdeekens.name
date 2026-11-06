---
name: blogroll-add
description: Add new blog posts from the Anybox "Reading" folder to lib/blogroll.ts. Use whenever the user says "new blog posts", "add to blogroll", "blog roll", "update blogroll", "let's go" in a blogroll context, or asks to pull new entries from Anybox. Reads bookmarks via the mcp__anybox MCP, filters against URLs already present in lib/blogroll.ts, fetches each post and writes style-matched teasers (in parallel subagents when available), then inserts new TBlogrollEntry objects at the top of the array. Trigger even if the user only says "do it again" or "go" right after a recent blogroll update.
---

# blogroll-add

Adds new blog posts from the user's Anybox "Reading" folder to `lib/blogroll.ts`. Style and ordering match what already exists. Keep it boring and consistent.

## Inputs

- Repo root is the current working directory (`/Users/tdeekens/Development/tdeekens`).
- Blogroll data: `lib/blogroll.ts`. Entries are `TBlogrollEntry` objects inside `export const blogroll: TBlogrollEntry[] = [...]`. Newest is at the top. `pages/blogroll.tsx` renders from this array; do not edit it.
- `public/blogroll.xml` is generated at build time by `scripts/generate-blogroll-rss.ts`. No manual update.
- Anybox Reading folder ID: `C116BEF6-87B5-4661-94E7-557665E1889D`. Use `mcp__anybox__search_bookmarks` with `folder_id`. If the ID has rotated, call `mcp__anybox__list_folders` and find `Reading`.
- If the `mcp__anybox__*` tools are not available, the Anybox MCP is not connected. Check `.pi/mcp.json` (project, requires trust) and `~/.pi/agent/mcp.json`, then stop and tell the user. Do not guess at bookmarks.

## Workflow

### 1. Pull recent bookmarks

Call `mcp__anybox__search_bookmarks` with the Reading folder ID and `limit` 15-25 (more only if the user says they added a lot). Results are newest-first.

### 2. Filter out what's already in the blogroll

Read `lib/blogroll.ts` and collect every `href:` value. Drop Anybox bookmarks whose URL is already present. Also drop:

- Twitter/X posts (`x.com`, `twitter.com`). Teaser format does not fit threads.
- Anything not a long-form post (raw images, Anybox links, etc.).

If fetching a URL returns 403/404, drop it and mention it in the summary.

### 3. Fetch and write teasers

Fetch each remaining post with `fetch_content` (readable mode). Do not write a teaser from the Anybox description; it is often a marketing blurb.

If the subagent tool is available, split the URLs into batches of 3-5 and run them in parallel, one child per batch, with a fast, cheap model. Each child fetches its URLs and returns only a JSON array. If subagents are not available, fetch and write the teasers yourself, one URL at a time.

Child prompt template:

```
Fetch each URL (fetch_content, readable mode), output JSON array of blogroll entries.
Teaser: 2 short sentences, 25-50 words, observation-driven, no fluff/marketing.
Mirror style: "RSCs became a paradigm you orbit around, not a primitive you reach
for. TanStack reframes them as just streams of data the client fetches, caches,
and composes."

Tags must come from: frontend, engineering, leadership, ai, career.
Map coding -> engineering or frontend (judge by content). Pick 1-2 tags.

Output ONLY JSON. Items: {title, href, author, teaser, tags}. Concise title,
drop site suffixes like " | Medium" or " - MDN Blog". Do not include addedAt.

URLs:
1. <url> - author: <author>
2. <url> - author: <author>
```

### 4. Insert entries at the top of the array

Order new entries newest-first, matching Anybox. Insert the block right after `export const blogroll: TBlogrollEntry[] = [` and before the existing first object. Use one `edit` call whose `oldText` is the existing first entry and whose `newText` is the new entries followed by that same entry, so the diff is one hunk.

Entry shape (2 spaces before `{`, 4 spaces before fields):

```ts
  {
    title: '...',
    href: '...',
    author: '...',
    teaser: '...',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-28T14:00:00.000Z',
  },
```

`addedAt` is mandatory: use the current time as ISO 8601. All entries in one run share it; it becomes the RSS `pubDate`. Drop the `tags:` line if no tags apply. Do not hand-escape quotes; prettier handles quote choice.

### 5. Report back

One sentence: how many added, how many skipped and why (tweets, dupes, fetch failures). Do not list every title.

## Style rules for teasers

- **2 sentences**, 25-50 words total.
- **Observation, not pitch.** Describe what the post argues, not why it is great.
- **No em dashes** in teasers.
- **No first person**, even for memoirs.
- **Concrete nouns** over abstract ones.

If a teaser breaks these, rewrite it inline rather than re-running the child.

## Tag mapping

| Anybox     | Blogroll                                                |
| ---------- | ------------------------------------------------------- |
| coding     | engineering (or frontend if web/UI-focused)             |
| ai         | ai                                                      |
| leadership | leadership                                              |
| a11y       | frontend                                                |
| (none)     | infer from content                                      |

Limit to 1-2 tags. Only use the allowed set.

## Edge cases

- "do it again", "let's go", "new posts" with no other context: assume a blogroll update and run the full workflow.
- No new posts found: say so, do not edit the file.
- Fetch fails on one URL: skip it, continue, note it in the summary.
- Do not cap the Anybox results artificially; the dedupe step handles volume.

## Do not

- Do not write a teaser without fetching the post.
- Do not change existing entries. Only insert.
- Do not commit. The user reviews the diff first.
- Do not invent tags outside the allowed set.
