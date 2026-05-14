---
title: "CFA Level I Fixed Income Cheat Sheet (2026)"
description: "Every Level I Fixed Income concept, formula, and relationship in one place — bond pricing, yields, term structure, duration, convexity, and credit. Bookmark and review."
slug: "cfa-level-1-fixed-income-cheat-sheet"
publishedAt: "2026-05-06"
author: "Trading Core"
level: "I"
tags: ["cfa", "level 1", "fixed income", "cheat sheet", "formulas"]
related:
  - "cfa-level-1-term-structure-spot-par-forward-curves"
  - "best-way-to-prepare-for-cfa-level-1"
  - "how-to-study-for-cfa-level-1"

quickAnswer: |
  - **Fixed Income** is 11–14% of Level I — high-yield topic with lots of formulas.
  - **Master 5 things**: bond pricing (spot vs YTM), yield measures, term structure (spot/par/forward), duration & convexity, credit risk basics.
  - **Calculator-heavy**. Drill the BA II Plus until your fingers know the steps automatically.
  - **Most-tested**: bond price-yield mechanics, modified duration, basic spread analysis.

faq:
  - q: "How heavily is Fixed Income tested on CFA Level I?"
    a: "11–14% of the exam — roughly 20–25 questions out of 180. Combined with Quant and FRA, it makes up a third of the exam. Treat it as a priority topic."
  - q: "What's the most-tested Fixed Income concept?"
    a: "Bond price-yield mechanics: pricing a bond given a YTM, computing YTM given price, and understanding the inverse price-yield relationship. Closely followed by duration and convexity."
  - q: "Do I need to memorize all the formulas?"
    a: "Most of them, yes. Build a 1-page formula sheet and drill it with spaced repetition. The exam doesn't give you a formula sheet."
  - q: "Is fixed income harder than equity on Level I?"
    a: "Mechanically yes — more formulas, more calculator work, and the term structure / duration concepts trip up first-time candidates. Conceptually, the curriculum is well-structured if you study in order."
  - q: "How many practice questions should I do for Fixed Income?"
    a: "300–500 minimum across the topic, with 50+ specifically on duration/convexity and 30+ on spot/par/forward conversions."
  - q: "What calculator should I use for Fixed Income?"
    a: "TI BA II Plus (or Professional). Master TVM functions, bond pricing (using TVM), and statistical functions. The HP 12C is also approved but less efficient for the bond-pricing flow."
  - q: "What is the difference between Macaulay and modified duration?"
    a: "Macaulay duration is the weighted average time to receive cash flows. Modified duration adjusts Macaulay for the bond's yield: ModDur = MacDur / (1 + y). Modified duration directly estimates % price change for 1% yield change."
---

## How to use this cheat sheet

This is a one-page-style reference for **CFA Level I Fixed Income**. It's organized by sub-topic in the order most candidates encounter them. **Don't read this passively** — that's what kills retention. Use it to:

1. **Self-test**: cover the right column, write the formula from memory, then check.
2. **Spot weak areas**: any item you can't reproduce becomes a flashcard.
3. **Pre-mock review**: skim the entire sheet 24 hours before each mock.

For deeper coverage of the highest-leverage Fixed Income topic, see [Term structure: spot, par, and forward curves](/cfa/cfa-level-1-term-structure-spot-par-forward-curves).

## 1. Basic bond features

| Concept | Definition |
|---|---|
| Issuer | Government, corporation, supranational, agency |
| Maturity | Time until principal is repaid |
| Par / face / nominal | Amount repaid at maturity (typically $1,000) |
| Coupon rate | Annual interest as % of par |
| Coupon frequency | Annual, semi-annual (most US), quarterly |
| Currency denomination | Affects yield comparison and FX risk |

**Bond cash flows for an annual-coupon bond with face $F$ and coupon $c$:**

- Years 1 to $n-1$: $cF$
- Year $n$: $cF + F$

For semi-annual: divide coupon by 2, double the periods, halve the period yield.

## 2. Bond pricing using YTM

**Annual-coupon bond** with $n$ periods and YTM $y$:

$$
P = \sum_{t=1}^{n} \frac{cF}{(1 + y)^t} + \frac{F}{(1 + y)^n}
$$

**Semi-annual-coupon bond:**

$$
P = \sum_{t=1}^{2n} \frac{cF/2}{(1 + y/2)^t} + \frac{F}{(1 + y/2)^{2n}}
$$

**Calculator (BA II Plus, semi-annual bond):**

- N = 2 × years
- I/Y = YTM / 2 (entered as decimal × 100)
- PMT = annual coupon / 2
- FV = 1000 (or face)
- CPT PV → price (negative sign convention)

**Price-yield relationships (memorize):**

| If yield... | Then price... |
|---|---|
| Yield ↓ | Price ↑ (always) |
| Yield ↑ | Price ↓ (always) |
| Yield = coupon | Price = par |
| Yield > coupon | Price < par (discount bond) |
| Yield < coupon | Price > par (premium bond) |

The price-yield curve is **convex** — price falls less when yield rises than it rises when yield falls by the same amount.

## 3. Bond pricing using spot rates

For a coupon bond, the **no-arbitrage price** discounts each cash flow by its specific spot rate $S_t$:

$$
P = \sum_{t=1}^{n} \frac{CF_t}{(1 + S_t)^t}
$$

YTM is a single rate; spot rates are many. Both can price the same bond, but spot is the no-arbitrage approach. See [the term structure article](/cfa/cfa-level-1-term-structure-spot-par-forward-curves) for worked examples.

## 4. Yield measures

| Measure | Definition |
|---|---|
| **Current yield** | Annual coupon / current price. Ignores time value, capital gain/loss. |
| **YTM** | Single rate that equates PV of CFs to price. Assumes reinvestment at YTM. |
| **Yield to call (YTC)** | YTM assuming bond is called at first call date and price |
| **Yield to worst** | Lowest of YTM and all YTC scenarios — conservative for callable bonds |
| **Effective yield** | Annualized yield that accounts for compounding frequency |
| **Bond equivalent yield (BEY)** | Semi-annual yield × 2; standard quotation in US |

**Effective annual yield (EAY) from semi-annual yield:**

$$
EAY = \left(1 + \frac{y_{sa}}{2}\right)^2 - 1
$$

**BEY from EAY:**

$$
BEY = 2 \cdot \left[(1 + EAY)^{1/2} - 1\right]
$$

## 5. Spot, par, and forward rates

Detailed in [the dedicated article](/cfa/cfa-level-1-term-structure-spot-par-forward-curves). Key formulas:

**Forward rate from spots ($_{a}F_b$ = $b$-period rate starting in $a$ periods):**

$$
(1 + S_{a+b})^{a+b} = (1 + S_a)^a \cdot (1 + \,_aF_b)^b
$$

**1-period forward starting at year $n$:**

$$
\,_nF_1 = \frac{(1 + S_{n+1})^{n+1}}{(1 + S_n)^n} - 1
$$

**Curve shape relationships:**

| Shape | Spot vs Par | Spot vs Forward |
|---|---|---|
| Upward | Par < Spot | Forward > Spot |
| Flat | Par = Spot | Forward = Spot |
| Downward | Par > Spot | Forward < Spot |

## 6. Duration

Duration measures sensitivity of bond price to interest rate changes.

### Macaulay duration

Weighted average time to receive cash flows, weights = PV of CFs / price:

$$
MacDur = \sum_{t=1}^{n} t \cdot \frac{CF_t / (1 + y)^t}{P}
$$

Units: years.

### Modified duration

Macaulay adjusted for the yield:

$$
ModDur = \frac{MacDur}{1 + y/k}
$$

where $k$ = compounding periods per year.

**% change in price from a yield change $\Delta y$:**

$$
\%\Delta P \approx -ModDur \cdot \Delta y
$$

If ModDur = 7.0 and yield rises 50 bps:

$$
\%\Delta P \approx -7.0 \cdot 0.005 = -3.5\%
$$

### Effective duration

Used for bonds with **embedded options** (callable, putable, MBS) where cash flows change with yield:

$$
EffDur = \frac{P_{-} - P_{+}}{2 \cdot P_0 \cdot \Delta y}
$$

where $P_{-}$ = price after yield decrease, $P_{+}$ = price after yield increase.

### Money duration and price value of a basis point (PVBP)

$$
\text{Money Duration} = ModDur \cdot P
$$

$$
PVBP = ModDur \cdot P \cdot 0.0001
$$

PVBP = dollar change in price per 1 bp yield change. Used for hedging and DV01-equivalent analyses.

## 7. Convexity

Convexity captures the curvature of the price-yield relationship — what duration alone misses.

### Convexity adjustment to price change

$$
\%\Delta P \approx -ModDur \cdot \Delta y + \frac{1}{2} \cdot Conv \cdot (\Delta y)^2
$$

The convexity term is **always positive** (for non-callable bonds), so:

- For a yield decrease: actual price rise > duration estimate (convexity helps you).
- For a yield increase: actual price fall < duration estimate (convexity protects you).

### Effective convexity (for option-embedded bonds)

$$
EffConv = \frac{P_{-} + P_{+} - 2 P_0}{P_0 \cdot (\Delta y)^2}
$$

**Key relationships to memorize:**

| Bond feature | Effect on duration | Effect on convexity |
|---|---|---|
| Longer maturity | ↑ | ↑ |
| Higher coupon | ↓ | ↓ |
| Higher YTM | ↓ | ↓ |
| Embedded call (price ↑ → call exercised) | ↓ | Can become **negative** at low yields |
| Embedded put | Similar magnitude, less negative convexity issue | More positive convexity |

## 8. Credit risk basics

| Concept | Meaning |
|---|---|
| Default risk | Probability the issuer fails to pay |
| Recovery rate | % of par recovered after default |
| Loss given default (LGD) | 1 − recovery rate |
| Expected loss | Probability of default × LGD |
| Credit spread | Yield premium over default-free benchmark |

**Approximate decomposition:**

$$
\text{Spread} \approx \text{Expected Loss} + \text{Risk Premium}
$$

### Spread measures

| Measure | What it is |
|---|---|
| **G-spread** | Bond yield − interpolated government bond yield, same maturity |
| **I-spread** | Bond yield − swap rate, same maturity |
| **Z-spread** | Constant spread added to spot curve to price the bond at market |
| **OAS** | Z-spread minus the option cost; the "true" credit/liquidity spread for option-embedded bonds |

OAS isolates credit risk by stripping out the value of embedded options.

## 9. Money market and short-term yields

Money market instruments (T-bills, commercial paper, banker's acceptances) use simple-interest conventions, not the compounded yields of long bonds.

| Convention | Formula |
|---|---|
| **Bank discount yield (BDY)** | $(F - P)/F \times 360/t$ |
| **Holding period yield (HPY)** | $(F - P)/P$ (or with income) |
| **Money market yield (MMY)** | $HPY \times 360/t$ |
| **Effective annual yield (EAY)** | $(1 + HPY)^{365/t} - 1$ |

To convert BDY → MMY:

$$
MMY = \frac{360 \cdot BDY}{360 - t \cdot BDY}
$$

To convert MMY → EAY: compute HPY first, then apply EAY formula.

## 10. Securitization and structured products (light touch at L1)

| Product | Key idea |
|---|---|
| **MBS** | Pool of mortgages → tranched into agency or non-agency securities |
| **ABS** | Pool of receivables (auto loans, credit cards, student loans) |
| **CMO** | MBS sliced into time-tranches (sequential pay, planned amortization) |
| **CDO** | Pool of credits → tranched by seniority |

**Prepayment risk** = risk that mortgage borrowers prepay early (often when rates fall), shortening MBS duration when investors don't want it.

**Extension risk** = risk that prepayments slow (when rates rise), lengthening MBS duration when investors don't want it.

**MBS exhibit negative convexity** at low yields because of prepayment risk — borrowers refinance, capping the price upside.

## 11. Yield curve theories

| Theory | Says |
|---|---|
| **Pure expectations** | Forward rates = expected future spot rates. No premium. |
| **Liquidity preference** | Forward rates = expected spots **+ liquidity premium**. Curve naturally upward. |
| **Segmented markets** | Investors have maturity preferences; curve shape reflects supply/demand at each segment. |
| **Preferred habitat** | Like segmented markets, but investors can be coaxed away from preferred maturities by sufficient yield. |

## 12. Most-tested checkpoint questions

If you can answer all of these in 30 seconds each, you're solid on Level I FI:

1. Price a 5-year, 6% annual-coupon bond at par yield 5%. (Answer: ~$1,043.30)
2. Modified duration 6.5, yield rises 25 bps. % price change? (Answer: ~−1.625%)
3. Spot rates 3%, 4%. Compute the 1-year forward in 1 year. (Answer: ~5.01%)
4. Define OAS in one sentence. (Spread that isolates credit/liquidity from option value.)
5. Why does a callable bond have lower price upside than a straight bond? (Negative convexity / embedded call cap.)
6. BDY 4%, 90-day T-bill, $1M face. Compute price. (Answer: $990,000)
7. Curve is upward-sloping. Order par, spot, forward yields for the same maturity. (Par < Spot < Forward)

If any feel rusty, drill 20 questions on that sub-topic.

## How to actually use this in study

1. **Print or screenshot** this page; keep it next to your study area.
2. **Cover formulas, write them from memory** every 3 days for 4 weeks.
3. **Run the checkpoint questions** before each mock exam.
4. **Add anything you missed on a mock** to your personal cheat sheet.

For the deepest dive, see [the term structure article](/cfa/cfa-level-1-term-structure-spot-par-forward-curves), which is the most calculation-heavy sub-topic and the one most candidates underprepare.

## Where to go next

- See [the highest-yield FI sub-topic in detail](/cfa/cfa-level-1-term-structure-spot-par-forward-curves)
- Study how to [study smarter, not longer](/cfa/how-to-study-for-cfa-level-1)
- Build a [structured Level I plan](/cfa/best-way-to-prepare-for-cfa-level-1) that gives FI the right hours

If you want infinite fresh practice questions on these exact concepts with step-by-step explanations, [Trading Core](/register) generates them on demand — free, no card.
