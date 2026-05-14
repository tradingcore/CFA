# CFA Blog Content

Articles for `/cfa/[slug]`. Each article is a single Markdown file with YAML frontmatter.

## Creating a new article

1. Create `your-article-slug.md` here. The filename (without `.md`) becomes the URL: `/cfa/your-article-slug`.
2. Start with frontmatter (see template below), then write Markdown.
3. Set `draft: true` while writing — drafts are visible in development but hidden in production.
4. When ready, set `draft: false` (or remove the line) and commit.

The sitemap, OG image, breadcrumbs, FAQ schema, and routing all update automatically.

## Frontmatter reference

```yaml
---
title: "Best CFA Level I Study Plan for 2026"          # required
description: "A realistic, week-by-week plan for…"      # required, used for meta + OG
slug: "best-cfa-level-1-study-plan-2026"                # optional, defaults to filename
publishedAt: "2026-05-15"                                # required
updatedAt: "2026-06-01"                                  # optional
author: "Trading Core"                                   # optional
level: "I"                                               # I | II | III | All — shows badge
tags: ["study plan", "level 1", "schedule"]              # optional, drives related-by-tag
ogImage: "/custom-og.png"                                # optional, otherwise dynamic OG
draft: false                                              # optional, default false

quickAnswer: |
  - Recommend **300 hours** over 6 months
  - Start with **Quant + FRA** (heaviest)
  - Begin mocks **6 weeks before exam**

faq:
  - q: "Is 300 hours enough for CFA Level I?"
    a: "Yes for most candidates with a finance background; non-finance backgrounds typically need 400+."
  - q: "When should I start mocks?"
    a: "Six weeks before the exam, with at least 5 full mocks completed."

related:
  - "cfa-level-2-study-plan"
  - "how-many-hours-to-study-cfa-level-1"
---
```

## Markdown features supported

- Standard Markdown + GitHub-flavored (tables, task lists, strikethrough)
- Math: `$inline$` and `$$block$$` (KaTeX)
- Auto-generated heading anchors (`##` and `###` get IDs and an in-article TOC on desktop when ≥ 3 headings)
- Code blocks with language tags
- Images: `![alt](/path-or-url.png)`

## Conversion / SEO checklist per article

- Title: 50–60 chars, contains the primary keyword
- Description: 140–160 chars, descriptive + has a hook
- At least 6 `##` headings (drives TOC + featured snippet eligibility)
- One `quickAnswer` (boosts featured snippet chances)
- 5+ `faq` entries (renders `FAQPage` schema → can show in Google directly)
- 2–3 internal links to related `/cfa/*` articles
- 1 internal link to `/register` or `/plan`
- Mention the primary keyword in: H1, first paragraph, at least one H2, conclusion

## File naming

Use the **target keyword** as the slug. Example:

- ✅ `best-cfa-level-1-study-plan-2026.md`
- ❌ `study-plan.md`
