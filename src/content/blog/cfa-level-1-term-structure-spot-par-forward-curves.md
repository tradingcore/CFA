---
title: "Term Structure of Interest Rates: Spot, Par, and Forward Curves (CFA Level I)"
description: "Spot rates, par rates, and forward rates explained from scratch — definitions, formulas, bootstrapping, and worked examples for CFA Level I Fixed Income."
slug: "cfa-level-1-term-structure-spot-par-forward-curves"
publishedAt: "2026-05-07"
author: "Trading Core"
level: "I"
tags: ["cfa", "level 1", "fixed income", "term structure", "spot curve", "forward rates"]
related:
  - "cfa-level-1-fixed-income-cheat-sheet"
  - "best-way-to-prepare-for-cfa-level-1"
  - "how-to-study-for-cfa-level-1"

quickAnswer: |
  - **Spot rates** are yields on hypothetical default-risk-free zero-coupon bonds — the cleanest building block for fixed income.
  - **Par rates** are coupon rates that make a bond price equal to par; they're derived from spot rates.
  - **Forward rates** are interest rates for periods that start in the future, implied by today's spot rates under no-arbitrage.
  - **Curve shape relationships**: Upward-sloping → forwards above spots, pars below spots. Downward-sloping → reverse.
  - On the exam, expect 2–4 questions on spot/par/forward conversions and bond pricing using spot rates.

faq:
  - q: "What is a spot rate?"
    a: "A spot rate is the yield on a default-risk-free zero-coupon bond for a specific maturity. It is the discount rate that prices a single cash flow at that future date back to today, with no intermediate coupons."
  - q: "What is the difference between spot and YTM?"
    a: "YTM is a single rate that discounts all of a coupon bond's cash flows to its market price. Spot rates are individual rates, one per maturity, used to discount each cash flow separately. YTM is essentially a complex average of the spot rates relevant to a bond's cash flows."
  - q: "How are forward rates calculated?"
    a: "Forward rates come from no-arbitrage between investing in a longer spot rate vs. rolling shorter periods. The 1-year forward rate starting in year 1 satisfies: (1 + S_2)^2 = (1 + S_1)(1 + 1F1)."
  - q: "What is bootstrapping?"
    a: "Bootstrapping is the process of deriving spot rates iteratively from observed par or coupon bond prices, starting with the shortest maturity and working forward. It's the standard way to build a spot curve from market data."
  - q: "Why do par rates equal spot rates only for the 1-period rate?"
    a: "Because for a single-period bond, there's only one cash flow at maturity (coupon + principal), so the discount rate that prices it at par is identical to the spot rate. Beyond one period, par rates blend several spot rates."
  - q: "How does curve shape affect spot vs forward rates?"
    a: "Upward-sloping curve → forwards lie ABOVE spots (each marginal period requires a higher rate to justify the longer spot). Downward-sloping → forwards lie BELOW spots. Flat curve → forwards equal spots."
  - q: "Are forward rates a forecast of future spot rates?"
    a: "Under the pure expectations theory, yes. Under liquidity preference theory, forward rates include a term premium and overstate expected future spots. The CFA curriculum tests both interpretations."
---

## Why this matters

The **term structure of interest rates** is the relationship between yields and time to maturity for default-risk-free bonds. It is foundational to almost everything in fixed income — pricing bonds, valuing swaps, building yield curves, and assessing duration and convexity.

For CFA Level I, this is one of the highest-yield (pun intended) areas of the Fixed Income topic. Expect 2–4 questions on spot/par/forward conversions and bond pricing using spot rates.

## Three curves you must know

| Curve | What it is | Built from |
|---|---|---|
| **Spot curve** | Yields on default-risk-free zero-coupon bonds, one per maturity | Direct observation of zeros (rare) or bootstrapped from par bonds |
| **Par curve** | Coupon rates that make a bond price = par for each maturity | Quoted by dealers or derived from spot |
| **Forward curve** | Interest rates for periods that start in the future | Derived from spot under no-arbitrage |

All three describe the **same underlying term structure** from different angles. Once you know any one of them completely, you can derive the other two.

## 1. Spot rates and the spot curve

A **spot rate** $S_T$ is the yield on a hypothetical default-risk-free zero-coupon bond maturing in $T$ years. It is sometimes called a **zero rate**.

Pricing a zero-coupon bond with face value $F$ paid at time $T$, given spot rate $S_T$:

$$
P = \frac{F}{(1 + S_T)^T}
$$

For a coupon bond with cash flows $CF_t$ at each time $t = 1, 2, \dots, n$:

$$
P = \sum_{t=1}^{n} \frac{CF_t}{(1 + S_t)^t}
$$

This is the **no-arbitrage price** — each cash flow is discounted by the spot rate that matches its specific maturity. If you used a single YTM instead, you'd get an approximation that may not equal the no-arbitrage price.

### Worked example: pricing a 3-year coupon bond with spot rates

Bond: 3-year, 5% annual coupon, face value $1,000.

Spot curve:
- $S_1 = 3.00\%$
- $S_2 = 3.50\%$
- $S_3 = 4.00\%$

Cash flows:
- Year 1: $50 (coupon)
- Year 2: $50 (coupon)
- Year 3: $1,050 (coupon + principal)

Price:

$$
P = \frac{50}{1.03^1} + \frac{50}{1.035^2} + \frac{1{,}050}{1.04^3}
$$

$$
P = 48.54 + 46.69 + 933.49 = 1{,}028.72
$$

So the bond's no-arbitrage price is **$1,028.72**.

If you computed the YTM that prices this bond at $1,028.72, it would be roughly **3.96%** — a complex average of the three spot rates, weighted by the cash flow timing.

## 2. Par rates and the par curve

A **par rate** $P_T$ is the coupon rate on a $T$-year bond that, when priced using the spot curve, results in a price exactly equal to par.

For an annual-coupon bond:

$$
1 = \sum_{t=1}^{T-1} \frac{P_T}{(1 + S_t)^t} + \frac{1 + P_T}{(1 + S_T)^T}
$$

Solving for $P_T$ gives the par rate.

### Why par rates exist

Par curves are convenient because **dealers naturally quote par yields** for hypothetical benchmark bonds (typically Treasury bonds). Par yields are also the natural input to **bootstrapping** the spot curve from observable market data.

### Worked example: deriving par from spot

Using the same spot curve from above, find the 2-year par rate.

A 2-year bond at par with annual coupon $P_2$ satisfies:

$$
1 = \frac{P_2}{1.03} + \frac{1 + P_2}{1.035^2}
$$

$$
1 = \frac{P_2}{1.03} + \frac{1 + P_2}{1.071225}
$$

Multiply through:

$$
1 = 0.97087 \cdot P_2 + 0.93351 \cdot (1 + P_2)
$$

$$
1 = 0.97087 P_2 + 0.93351 + 0.93351 P_2
$$

$$
1 - 0.93351 = (0.97087 + 0.93351) P_2
$$

$$
0.06649 = 1.90438 \cdot P_2
$$

$$
P_2 = 0.03491 = 3.49\%
$$

The 2-year par rate is **~3.49%**, slightly below the 2-year spot rate of 3.50% — consistent with the upward-sloping curve.

### Bootstrapping (deriving spot from par)

In practice, dealers quote **par yields** and analysts back out spot rates. The procedure is:

1. The 1-year par rate equals the 1-year spot rate.
2. Use the 2-year par bond price (=par) to solve for $S_2$ given $S_1$.
3. Use the 3-year par bond price to solve for $S_3$ given $S_1$, $S_2$.
4. Continue.

This iterative procedure is **bootstrapping** the spot curve from the par curve.

## 3. Forward rates

A **forward rate** $\,_{T_1}F_{T_2-T_1}$ is the interest rate for a loan that starts at time $T_1$ and ends at time $T_2$.

The notation that the CFA uses: **$_{a}F_{b}$** = the rate for a $b$-period loan starting in $a$ periods.

The defining no-arbitrage relationship:

$$
(1 + S_{T_2})^{T_2} = (1 + S_{T_1})^{T_1} \cdot (1 + \,_{T_1}F_{T_2 - T_1})^{T_2 - T_1}
$$

In words: **investing in a $T_2$-year zero must give the same return as investing in a $T_1$-year zero and rolling at the forward rate**.

### The most-tested case: 1-year forwards

For 1-year forward rates starting at year $n$:

$$
(1 + S_{n+1})^{n+1} = (1 + S_n)^n \cdot (1 + \,_{n}F_1)
$$

Solving:

$$
\,_{n}F_1 = \frac{(1 + S_{n+1})^{n+1}}{(1 + S_n)^n} - 1
$$

### Worked example: 1-year forwards from the spot curve

Same spot curve:
- $S_1 = 3.00\%$
- $S_2 = 3.50\%$
- $S_3 = 4.00\%$

**1-year forward in 1 year** ($_{1}F_1$):

$$
\,_{1}F_1 = \frac{1.035^2}{1.03} - 1 = \frac{1.071225}{1.03} - 1 = 0.04003 = 4.00\%
$$

**1-year forward in 2 years** ($_{2}F_1$):

$$
\,_{2}F_1 = \frac{1.04^3}{1.035^2} - 1 = \frac{1.124864}{1.071225} - 1 = 0.05006 = 5.01\%
$$

So the implied forwards are **4.00% (year 2)** and **5.01% (year 3)** — both above the corresponding spot rates, as expected for an upward-sloping curve.

### Pricing a bond using forward rates

You can also price the same 3-year, 5% coupon bond using forward rates:

$$
P = \frac{50}{(1 + S_1)} + \frac{50}{(1 + S_1)(1 + \,_1F_1)} + \frac{1{,}050}{(1 + S_1)(1 + \,_1F_1)(1 + \,_2F_1)}
$$

$$
P = \frac{50}{1.03} + \frac{50}{1.03 \cdot 1.04003} + \frac{1{,}050}{1.03 \cdot 1.04003 \cdot 1.05006}
$$

$$
P = 48.54 + 46.69 + 933.49 = 1{,}028.72
$$

**Identical to pricing with spots** — as it must be under no-arbitrage.

## The shape relationships (must memorize)

These three relationships appear constantly on the exam:

| Curve shape | Spot vs Par | Spot vs Forward |
|---|---|---|
| **Upward-sloping** | Par < Spot | Forward > Spot |
| **Flat** | Par = Spot | Forward = Spot |
| **Downward-sloping** | Par > Spot | Forward < Spot |

**Intuition:**

- An upward-sloping curve means each additional period of maturity requires a higher rate. Forwards represent the *marginal* rate of extending one more period, so they overshoot the average (spot).
- Par rates are coupon rates on bonds priced at par — they're a blended yield across all maturities up to $T$. With higher long-term spots, the blend (par) is below the long-term spot.

## Practice problems

### Problem 1

Given:
- $S_1 = 2.5\%$
- $S_2 = 3.0\%$
- $S_3 = 3.5\%$

Calculate the 1-year forward rate starting in year 2 ($_{2}F_1$).

**Solution:**

$$
\,_{2}F_1 = \frac{(1.035)^3}{(1.030)^2} - 1
$$

$$
= \frac{1.108718}{1.060900} - 1 = 0.04508 = 4.51\%
$$

**Answer: 4.51%**

### Problem 2

A 2-year bond has 4% annual coupons and is priced at $999.05 per $1,000 face. The 1-year spot rate is 3.5%. What is the 2-year spot rate?

**Solution:**

$$
999.05 = \frac{40}{1.035} + \frac{1{,}040}{(1 + S_2)^2}
$$

$$
999.05 = 38.65 + \frac{1{,}040}{(1 + S_2)^2}
$$

$$
\frac{1{,}040}{(1 + S_2)^2} = 960.40
$$

$$
(1 + S_2)^2 = \frac{1{,}040}{960.40} = 1.08288
$$

$$
1 + S_2 = 1.04062 \implies S_2 = 4.06\%
$$

**Answer: 4.06%**

### Problem 3

You observe an upward-sloping spot curve. Order the following from lowest to highest yield, holding maturity at 5 years constant:

A. 5-year spot rate
B. 5-year par rate
C. 1-year forward in 4 years

**Answer: B < A < C**

(Par below spot; forward above spot; upward slope.)

## Common exam traps

1. **Forgetting to compound forward rates correctly.** Multi-year forwards use $(1 + F)^n - 1$ inside the chain.
2. **Mixing periodicities.** Annual vs semi-annual coupons require consistent compounding. Many candidates confuse $S_T$ (annual) with semi-annual yields.
3. **Confusing spot with YTM.** YTM is one rate; spot is many. Pricing a coupon bond by discounting all CFs at YTM is convenient but not the no-arbitrage approach.
4. **Misreading forward notation.** $_{2}F_3$ means a 3-year rate starting in 2 years, **not** "2-year forward in 3 years." The CFA convention is **$_{a}F_b$ = $b$-period rate starting in $a$ periods**.

## Summary

- **Spot rates** are zero-coupon yields, the cleanest building block.
- **Par rates** are coupon rates that price bonds at par; they blend spots.
- **Forward rates** are no-arbitrage rates for future periods, derivable from spots.
- All three curves describe the same term structure; converting between them is mechanical algebra.
- **Curve shape** determines the ordering of spot, par, forward.

This topic alone is worth several Level I points if you internalize the conversions and shape relationships. Drill 30+ practice questions specifically on spot/par/forward — most candidates over-read this section and under-practice the calculations.

## Where to go next

- Get the [full Level I Fixed Income cheat sheet](/cfa/cfa-level-1-fixed-income-cheat-sheet)
- See the [study techniques that lock in formulas](/cfa/how-to-study-for-cfa-level-1)
- Build a [Level I study plan that gives FI the right time](/cfa/best-way-to-prepare-for-cfa-level-1)

If you want a tutor that drills you on exactly this topic with fresh AI-generated questions and step-by-step solutions, [Trading Core](/register) is free to start — no credit card.

## Sources

- CFA Institute. ["The Term Structure of Interest Rates: Spot, Par, and Forward Curves."](https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/the-term-structure-of-interest-rates-spot-par-and-forward-curves) 2026 Refresher Reading.
