---
title: "Sample article — preview only"
description: "This is a draft sample showing how an article looks. It is hidden in production. Delete this file when the first real article is published."
slug: "sample"
publishedAt: "2026-05-13"
author: "Trading Core"
level: "I"
tags: ["sample", "preview"]
draft: true

quickAnswer: |
  - This is the **Quick Answer** box — appears at the very top of every article
  - Use it to summarize the answer in **3–5 bullets** so Google can lift it as a featured snippet
  - Supports markdown: **bold**, *italic*, lists, links

faq:
  - q: "Is this a real article?"
    a: "No — it is a sample to preview the layout in development. Set draft: false on real articles for them to appear in production."
  - q: "How does the FAQ schema work?"
    a: "Each FAQ entry is rendered visually and also injected as schema.org FAQPage JSON-LD. Google may show these directly in search results."
  - q: "Do I need a credit card to use Trading Core?"
    a: "No — free to start, no card required. Daily limits reset at midnight."
---

## What this page demonstrates

This sample article exists only so you can preview how the blog layout behaves when there's actual content in `src/content/blog/`. It has `draft: true` so it never reaches production.

When you're ready to ship the real first article, **delete this file** and create your own following the [README](./README.md).

## Heading hierarchy and TOC

The on-page table of contents (visible on desktop) is auto-generated from `##` and `###` headings. It only appears when there are at least 3 headings — so this short sample probably won't show one.

### A subsection looks like this

Subsections (`###`) get smaller spacing and indent in the TOC.

## Tables, lists, and emphasis

| Phase | Weeks | Focus |
|---|---|---|
| Foundation | 1–8 | Quant, FRA |
| Coverage | 9–14 | Equity, FI, Derivs |
| Reinforcement | 15–18 | Weak areas |
| Mocks | 19–22 | Full exams + review |

Bullets:

- Active recall beats passive reading
- Mock review > raw question count
- Ethics is high-yield — don't skip it

## Math via KaTeX

The DCF formula renders inline like $PV = \frac{CF}{(1+r)^t}$ or as a block:

$$
PV = \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t}
$$

## Code blocks

```python
def present_value(cash_flows, rate):
    return sum(cf / (1 + rate) ** t for t, cf in enumerate(cash_flows, start=1))
```

## Internal linking

Link to other articles like [`/cfa/another-slug`](/cfa/another-slug) and to the product like [your study plan](/plan). Internal links help SEO and conversion.

## Closing

After the article body, the page automatically shows:

1. A primary CTA card
2. The FAQ accordion (built from frontmatter)
3. Related articles (3 cards, ranked by tag overlap)

That's it — write content, ship it.
