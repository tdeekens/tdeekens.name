---
name: blogroll-add
description: Add new blog posts from the Anybox "Reading" folder to lib/blogroll.ts. Use whenever the user says "new blog posts", "add to blogroll", "blog roll", "update blogroll", "let's go" in a blogroll context, or asks to pull new entries from Anybox. Reads bookmarks via the mcp__anybox MCP, filters against URLs already present in lib/blogroll.ts, fans out Haiku subagents to write style-matched teasers in parallel, then inserts new TBlogrollEntry objects at the top of the array. Trigger even if the user only says "do it again" or "go" right after a recent blogroll update.
---

# blogroll-add

Adds new blog posts from the user's Anybox "Reading" folder to `lib/blogroll.ts` in this repo. Style and ordering match what already exists. The user runs this often; keep it boring and consistent.

## Why it exists

User curates reading in Anybox. Posts they like end up in the **Reading** folder. The blogroll on the site is the public surface for that. Manually copying titles, writing teasers in a consistent voice, and tagging is repetitive. This skill collapses it to one prompt.

## Inputs you need

- The repo is the current working directory: `/Users/tdeekens/Development/tdeekens`.
- Blogroll data: `lib/blogroll.ts`. Entries are `TBlogrollEntry` objects inside `export const blogroll: TBlogrollEntry[] = [...]`. Newest sits at the top of the array. `pages/blogroll.tsx` renders from this array — do not edit it.
- RSS feed `public/blogroll.xml` is generated from the array at build time via `scripts/generate-blogroll-rss.ts`. No manual update needed; the build script picks it up.
- Anybox Reading folder ID: `C116BEF6-87B5-4661-94E7-557665E1889D`. Fetch via `mcp__anybox__search_bookmarks` with `folder_id`. If the ID has rotated, call `mcp__anybox__list_folders` and look for `Reading`.

## Workflow

### 1. Pull recent bookmarks

Call `mcp__anybox__search_bookmarks` with the Reading folder ID. A `limit` of 15-25 is usually enough; bump higher only if the user says they've added a lot since last time. Results come back newest-first.

### 2. Filter out what's already in the blogroll

Read `lib/blogroll.ts`. Build a set of existing `href:` values from the array. Drop any Anybox bookmark whose URL is already in that set. Also drop:

- Twitter/X posts (`x.com`, `twitter.com`) - the teaser format does not fit threads.
- Anything obviously not a long-form post (raw image links, Anybox itself, etc).

If WebFetch later returns 403/404 for a URL, drop that entry from the batch. Mention it in the final summary so the user knows.

### 3. Fan out Haiku subagents to summarize in parallel

Group the remaining URLs into batches of 3-5 and spawn one `Agent` per batch in a single message (parallel tool calls). Use `subagent_type: general-purpose` and `model: haiku`. Each subagent fetches each URL via WebFetch and returns a JSON array.

Use this prompt template per batch:

```
Fetch each URL (WebFetch), output JSON array of blogroll entries.
Teaser: 2 short sentences, 25-50 words, observation-driven, no fluff/marketing.
Mirror style: "RSCs became a paradigm you orbit around, not a primitive you reach
for. TanStack reframes them as just streams of data the client fetches, caches,
and composes."

Tags must come from: frontend, engineering, leadership, ai, career.
Map coding -> engineering or frontend (judge by content). Pick 1-2 tags.

Output ONLY JSON. Items: {title, href, author, teaser, tags}. Concise title,
drop site suffixes like " | Medium" or " - MDN Blog". Do not include addedAt;
the orchestrator stamps it.

URLs:
1. <url> - author: <author>
2. <url> - author: <author>
...
```

The reason to batch and parallelize: 15+ WebFetches in series is slow, and the user wants this fast. Haiku is fine for summarization quality at this scope. The reason to constrain the teaser style explicitly: existing entries set a voice (terse, observational, no marketing verbs). Without the example, Haiku drifts into "this post explores..." filler.

### 4. Insert entries at the top of the array

Order new entries newest-first, matching Anybox's order (already newest-first from the API). Insert the whole block immediately after `export const blogroll: TBlogrollEntry[] = [` and before the existing first object.

Each entry follows this exact shape — match the indentation in the file (2 spaces before `{`, 4 spaces before fields):

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

`addedAt` is mandatory. Use the current time in ISO 8601 (`new Date().toISOString()`). All new entries in a single run share the same `addedAt`; that becomes their RSS `pubDate`. Write valid TS string literals — prettier reformats quote choice (single vs double) automatically when content contains the conflicting quote, so do not hand-escape. Drop the `tags:` line entirely if no tags apply (the field is optional).

Use a single `Edit` call with `old_string` matching the existing first entry and `new_string` being all new entries followed by that same existing first entry. This keeps the diff to one hunk.

### 5. Report back

One sentence: how many added, how many skipped (and why - tweets, dupes, fetch failures). Do not list every title - the diff already shows them.

## Style rules for teasers (because Haiku drifts)

- **2 sentences**, 25-50 words total.
- **Observation, not pitch**. Describe what the post argues, not why it is great. "Hands-on managers stall the layer below them" beats "A must-read guide to managing managers."
- **No em dashes** in the teaser (project convention - user prefers shorter sentences).
- **No first-person**. Even if the post is a memoir, frame it third-person.
- **Concrete nouns** over abstract ones where possible.

If a Haiku output violates these, rewrite it inline before inserting rather than re-spawning the agent.

## Tag mapping

Anybox tags do not map 1:1. Translate:

| Anybox     | Blogroll                                                |
| ---------- | ------------------------------------------------------- |
| coding     | engineering (or frontend if the post is web/UI-focused) |
| ai         | ai                                                      |
| leadership | leadership                                              |
| a11y       | frontend                                                |
| (none)     | infer from content                                      |

Limit to 1-2 tags. The blogroll has no `a11y` tag class today.

## Edge cases

- **User says "do it again" / "let's go" / "new posts" with no other context**: assume blogroll update. Run the full workflow.
- **No new posts found**: say so plainly, do not edit the file.
- **WebFetch 403 on one URL**: skip it, continue with the rest, note it in the summary.
- **Anybox returns more posts than expected**: trust the dedupe step. Do not artificially cap.
- **User adds posts manually between runs**: dedupe by URL handles it.

## Do not

- Do not write a teaser without fetching the post. The Anybox description field is often a marketing blurb and produces bad teasers.
- Do not change existing entries. Only insert.
- Do not commit the change. The user reviews diffs before committing.
- Do not invent tags outside the allowed set.
