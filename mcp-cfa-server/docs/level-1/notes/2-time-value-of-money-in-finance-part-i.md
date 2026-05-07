---
title: "2 Time Value of Money in Finance - Part I"
source_pdf: "2._Time_Value_of_Money_in_Finance_-_Part_I.pdf"
converter: "mistral-ocr-latest"
date_converted: "2026-05-07T00:28:22Z"
pages: 43
category: "level-1/notes"
sanitized: true
reviewed: false
---
Level I
of the
CFA® Program

Quantitative Methods
TIME VALUE OF MONEY IN FINANCE
PART I
# Learning Outcome Statements

- LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.
- LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flow.
- LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Introducing Time Value of Money

- The time value of money is a concept that states that cash received today is more valuable than cash received in the future.
- This concept of **of opportunity** cost.
- **Inflation** poses a threat to the purchasing power of money in the future.
- Element of **uncertainty regarding future cash flows**.
- Time value of money calculations allow us to establish the future value of a given amount of money.
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

An investment of $1 today will be worth a certain amount N years from now, if it is invested at an interest rate of r per year.


F V _ {N} = P V \times (1 + r) ^ {N}


Where FV = Future value at time N, PV = Present value, and r = Interest rate per year.

If N is large such that N→ ∞ the initial cashflow is compounded continuously:


F V _ {N} = P V e ^ {r N}

LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

Therefore, in order to have a single cash flow of $1 N$ years from today, you must make a single investment today of the following amount:


\mathrm{PV} = \frac{\mathrm{FV}_N}{(1 + r)^N}


Where FV = Future value at time N, PV = Present value, and r = Interest rate per year.

And for the continuous compounding:


PV = FV_N e^{-rN}

LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Present Value

Suppose you need to have $10,000 in your savings account at the end of the next 3 years. Assume that the account offers a return of 10 percent per year. How much would you need to invest today?
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Present Value

Suppose you need to have $10,000 in your savings account at the end of the next 3 years. Assume that the account offers a return of 10 percent per year. How much would you need to invest today?

![img-0.jpeg](img-0.jpeg)
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Present Value

Suppose you need to have $10,000 in your savings account at the end of the next 3 years. Assume that the account offers a return of 10 percent per year.

How much would you need to invest today?


\begin{array}{l}
\mathbf{PV} = \frac{\mathbf{FV}_{\mathbf{N}}}{(1 + r_{s})^{\mathbf{N}}} \\
= \frac{\$10,000}{(1 + 10\%)^{3}} = \$7,513.15 \\
\end{array}

LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

Which can also be done on the financial calculator:

![img-1.jpeg](img-1.jpeg)

N: Number of periods
I/Y: Interest rate per period
PV: Present value
FV: Future value
Press 2nd FV to clear memory

| BA II Plus | | | HP 12C | |
| --- | --- | --- | --- | --- |
| Press | Display | Press | Display | |
| 10,000 | “FV” | FV= 10,000 | 10,000 CHS FV | 10,000 |
| 3 | “N” | N= 3 | 12 ENTER n | 3 |
| 10 | “I/Y” | I/Y= 10 | 2.5 ENTER i | 10 |
| “CPT” | “PV” | PV= -7,513.15 | PV | -7,513.15 |
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

When compounding periods are different than annual compounding, use the formulas for future and present values:


\mathbf{FV_N} = \mathbf{PV} \left(1 + \frac{r_s}{m}\right)^{-mN}

\mathbf{PV} = \mathbf{FV_N} \left(1 + \frac{r_s}{m}\right)^{-mN}


Where $m$ is the number of compounding periods in a year, and $r_s$ is the stated annual rate of interest.

NOTE: In following discussion, we shall let $t = mN$ denote the number of compounding periods and $\frac{r_s}{m} = r$ to denote the stated discount rate per period.
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Time Value of Money in Fixed-Income Instruments

☐ Fixed-income instruments are debt securities where an issuer borrows money from an investor (lender) in exchange for a promised future payment
&gt; Examples include bonds, loans, and notes.

☐ Market discount rate for fixed income instruments is the interest rate investors demand to invest in a particular fixed-income instrument.
&gt; Also called yield-to-maturity (YTM)

☐ Present value of a fixed-income instrument is calculated by discounting each cash flow using the market discount rate.
&gt; Cash flows in fixed-income instruments occur in three general patterns

- Cash flow patterns of fixed-income instruments include:
- Discount cash flow patterns
- Level payments (annuity instruments)
- Periodic interest (coupon instruments)
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## 1. Discount Cash Flow Patterns

- An investor pays an **initial discounted price (PV)** for the instrument and gets one payment (FV) at the end maturity.
- The investor’s return is the interest earned, that is, the **difference between the initial price and principle** $(FV - PV)$.

![img-2.jpeg](img-2.jpeg)
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## 1. Discount Cash Flow Patterns

☐ A discount bond is sold for less than its face value for $r &gt; 0$.
&gt; Also called zero coupon bonds

☐ The price of a discount bond can be calculated using the present value formula.


\mathbf{PV} = \mathbf{FV}_t(1 + r)^{-t}


Where:
$\mathbf{FV}_t$ = Future value.
$\mathbf{PV}$ = Present value.
$r$ = Stated discount rate per period.
$t$ = Number of compounding periods.

Example
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## 1. Discount Cash Flow Patterns

Suppose Chad Vincent invests $8,000 in a financial institution that pays interest at a rate of 8% compounded annually. The future value after four years is closest to:

### Solution

Recall that,


\mathrm{FV} = \mathrm{PV}(1 + r)^t


In this case, we have $\mathbf{PV} = \mathbf{8,000}, \mathbf{r} = \mathbf{8\%}, t = 4$ so that:


\mathrm{FV} = 8,000(1 + 8\%)^4 = \mathbf{10,883.91}

LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## 1. Discount Cash Flow Patterns

☐ Zero-coupon bonds can be issued at negative interest rates.
&gt; Price (PV) of the bond is higher than the face value (FV).

### Example: Present Value

In January 2018, the Swiss government issued 15-year sovereign bonds at a negative yield of -0.08%. The present value (PV) of the bond per CHF100 of principal (FV) at the time of issuance is closet to:

### Solution


\begin{array}{l}
\mathrm{FV} = \mathrm{PV}(1 + r)^N \\
= 100(1 - 0.0008)^{-15} = 101.21
\end{array}

LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## 2. Coupon Instrument: Periodic Interest

☐ A coupon instrument (for example, a coupon bond) is a fixed-income investment that involves periodic interest payments and repayment of the principal at maturity.

&gt; The cash flow pattern follows a predefined schedule, with identical periodic payments occurring at regular intervals.

![img-3.jpeg](img-3.jpeg)
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## 2. Coupon Instrument: Periodic Interest

☐ Pricing of a coupon bond involves calculating its present value (PV) based on the market discount rate
&gt; Discounting coupon payments (PMTs) and the final principal payment (FV) using the market discount rate (r).

☐ General formula:


\text{PV(Coupon Bond)} = \frac{\text{PMT}}{(1 + r)^1} + \frac{\text{PMT}}{(1 + r)^2} + \cdots + \frac{(\text{PMT}_N + \text{FV}_N)}{(1 + r)^N}


Where:
- PMT = Coupon payment.
- FV = Future value.
- $r$ = Market discount rate (YTM).
- $N$ = Number of periods.

Example
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example 1: Annual Payments

Suppose we have a 5-year bond with a face value of $1,000 and an annual coupon rate of 5%. The market discount rate is 6%. The bond's price is closest to:

## Solution


\mathrm{PV}(\text{Coupon Bond}) = \frac{\mathrm{PMT}}{(1 + r)^1} + \frac{\mathrm{PMT}}{(1 + r)^2} + \cdots + \frac{(\mathrm{PMT}_N + \mathrm{FV}_N)}{(1 + r)^N}


Where PMT = 5% of $1,000 = $50, r = 6%, N = 5 years, FV = $1,000 so that:


\begin{array}{l}
\mathrm{PV} = \frac{\$50}{(1 + 0.06)^1} + \frac{\$50}{(1 + 0.06)^2} + \frac{\$50}{(1 + 0.06)^3} + \frac{\$50}{(1 + 0.06)^4} + \frac{\$50 + \$1,000}{(1 + 0.06)^5} \\
= \$47.17 + \$44.50 + \$41.98 + \$39.60 + \$784.62 = \$957.88
\end{array}

LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

On the financial calculator...

![img-4.jpeg](img-4.jpeg)

Enter the data:
5 into N,
6 into I/Y
50 into PMT, and
1,000 into FV.
Now, press CPT PV and you will find that the value of the bond is $957.88.
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Semi-annual Payments

- Suppose we have a 2-year bond with semi-annual coupons of 6%.
- If the required rate of return is 5%, determine the bonds price per $100 of par value.

## Solution

- Periodic coupon payment = $\left(\frac{\$100 \times \frac{6\%}{2}}{}\right) = \$3$
- $r = \frac{5\%}{2} = 2.5$ per period
- $N = 4$

![img-5.jpeg](img-5.jpeg)
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

On the financial calculator...

![img-6.jpeg](img-6.jpeg)

Enter the data:
4 into N,
2.5 into I/Y
3 into PMT, and
100 into FV.
Now, press CPT PV and you will find that the value of the bond is $101.88.
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Perpetual bonds

- Rare types of coupon bonds that do not have a stated date of maturity
- Issued by firms seeking equity-like financing and usually include redemption provisions.
- The bond of this nature will continue to pay interest indefinitely.
- The price of a perpetual bond can be calculated using the present value formula for perpetuity as follows:


PV \left(\text{perpetual bond}\right) = \lim_{N \rightarrow \infty} A \left[ \frac{\text{PMT}}{(1 + r)^1} + \frac{\text{PMT}}{(1 + r)^2} + \cdots + \frac{(\text{PMT}_N + \text{FV}_N)}{(1 + r)^N} \right] = \frac{\text{PMT}}{r}


Example
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Yield to Maturity

In 2021, XYZ Financial (the holding company for XYZ Bank) issued $500 million in perpetual bonds with a 4.00 percent semi-annual coupon. Calculate the bond’s yield to maturity (YTM) if the market price was $98.50 (per $100).

## Solution

- The present value of a perpetual bond is given by:


PV = \frac{PMT}{r}


- Making $r$ the subject:


r = \frac{PMT}{PV}


Where:


\begin{array}{l}
\text{PMT (semiannual coupon payment)} = \frac{\$100 \times 4\%}{2} = \$2 \\
\therefore r = \frac{\$2}{\$98.50} = 0.0203 = 2.03\%
\end{array}


Annualized yield-to-maturity is:


r = 0.0203 \times 4 \approx 8.12\%

LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## 3. Level Payments (Annuity Instruments)

- An **annuity** is a finite series of cash flows, all with the same value.
- A fixed-income instrument with level payments provides a stream of equal cash inflows over a finite period.
- Level payments consist of interest and principal payments.
- Example: fully armotizing loans such as mortgages
- Types of annuities: ordinary annuities and annuities due.
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

In an annuity due, payments start immediately (in advance), beginning at time $t = 0$.

- Example: Insurance premiums.

![img-7.jpeg](img-7.jpeg)
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

In an ordinary annuity, payments are made at the end of each time period, usually a month or year, beginning at time $t = 1$.

- Example: Mortgage payments.

![img-8.jpeg](img-8.jpeg)
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

The present value (PV) and future value (FV) of an ordinary annuity are given by the following:


\mathbf{PV} = \mathbf{A} \times \frac{1 - \frac{1}{(1 + r)^N}}{r}

\mathbf{FV} = \mathbf{A} \times \frac{(1 + r)^N - 1}{r}


Where:

$A =$ Annuity amount, $r =$ Interest rate per period, and $N =$ Number of annuity payments.
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

The periodic cashflow of an ordinary annuity is calculated as follows:


A = \frac {r (\mathrm {P V})}{1 - (1 + r) ^ {- N}}


☐ Consider a fully armotizing loan:

&gt; The borrower receives the mortgage loan now and promises to make periodic payments equal to the sum of interest and principal payments.
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

![img-9.jpeg](img-9.jpeg)

Level payments, each equal to the sum of interest and principal payments
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

- The periodic mortgage payment is constant, but the proportion of the interest payment decreases while the principal payment increases.
- The cash flow pattern of a fully amortizing mortgage follows the pattern of an ordinary annuity with a series of equal cash flows.
- Therefore, the periodic annuity (periodic payment) of a fully amortizing mortgage is given by:


A = \frac{r(\mathrm{PV})}{1 - (1 + r)^{-t}}


Where:
- $A$ = Periodic cash flow.
- $r$ = Market interest rate per period.
- PV = Present value or principal amount of loan or bond.
- $t$ = Number of payment periods.
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Periodic Annuity

Jake is looking to secure a fixed-rate 25-year mortgage to finance 75% of the value of an $800,000 residential property. If the annual interest rate on the mortgage is 4.5%, Jake’s monthly mortgage payment is close to:

## Using the formula:


A = \frac{r(\mathrm{PV})}{1 - (1 + r)^{-t}}


## Where:

- $ r = 0.375\% \left(= \frac{4.5\%}{12}\right) $
- $ N = 300 $ months ($ = 25 $ years $ \times $ 12 $ months/year)
- $ \mathrm{PV} = \$600,000 \left(= 75\% \times \$800,000\right) $
\Rightarrow A = \frac{0.00375 \times \$600,000}{1 - (1 + 0.00375)^{-300}} = \$3,334.995 \approx \$3,335

LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

Using the financial calculator...

![img-10.jpeg](img-10.jpeg)

| BA II Plus | | |
| --- | --- | --- |
| Press | | Display |
| 300 | “N” | N = 300 |
| 0.375 | “I/Y” | I/Y = 0.375 |
| 600,000 | “PV” | PV = 600,000 |
| 0 | “FV” | FV = 0 |
| “CPT” | “PMT” | PMT = -3,334.99 |
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Time Value of Money in Equity Instruments

- Equity investments such as stocks enables an investor to acquire a fractional share/ownership by the issuing company
- The right to receive a share of the company’s available cash flows as dividends.
- Time value of money (TVM) is used to discount expected future cash flows to determine their present value.
- Allow investors to value the company’s shares.
- The present value is calculated using a discount rate, $r$, which represents the expected rate of return on the investment.
- Common approaches for valuing equity instruments based on dividend cash flows which can take one of three forms:
- Constant dividends.
- Constant dividend growth rate.
- Changing dividend growth rate model.
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

☐ Constant dividends model values stocks based on the assumption that dividends will remain constant over time., i.e., pay a fixed dividend periodically.


\mathrm{PV}_t = \frac{\mathrm{D}_t}{r}


Where: $\mathrm{PV}_t$ = Present value at time $t$, $\mathrm{D}_t$ = Dividend payment at time $t$, $r$ = discount rate

## Example: Constant Dividend Model

A preferred stock with a dividend payment of $5 per year, discount rate is 8%. The present value of the stock is closest to:

Solution


\mathrm{D} = \$5, \mathrm{r} = 8\%, \mathrm{PV} = ?

\mathrm{PV} = \frac{5}{0.08} = \$62.5

LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

- Constant dividend growth model estimates the value of a stock based on its future dividends, assuming they will grow at a constant rate forever.
- The present value of the stock is equal to the sum of its future dividends, discounted by the required rate of return.


\mathrm{PV}_t = \frac{\mathrm{D}_t(1 + g)}{r - g} = \frac{\mathrm{D}_{t+1}}{r - g}


Where:

$\mathrm{PV}_t$ = Present value at time $t$.

$\mathrm{D}_t$ = Expected dividend in the next period.

$r$ = Required rate of return.

$g$ = Constant growth rate.


r - g &gt; 0


Example
LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Constant Dividend Model #2

A stock currently pays an annual dividend of $2.00 per share. The required rate of return for this stock is 10%, and the dividends are expected to grow at a constant rate of 5% per year indefinitely. Using the constant dividend growth model, the present value of this stock is closest to:

## Solution


\mathrm{PV}_t = \frac{\mathrm{D}_t(1 + g)}{r - g} = \frac{\mathrm{D}_{t+1}}{r - g}


In this case, we know that: $\mathrm{D}_1 = \$2.00$, $r = 10\%$, and $g = 5\%$.


\mathrm{PV} = \frac{2 \times 1.05}{r - g} = \frac{2.10}{0.10 - 0.05} = \$42

LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

☐ The changing dividend growth rate model accounts for changes in the dividend growth rate over time.

☐ One common approach is to use a multi-stage dividend discount model, which assumes different rates of dividend growth during different stages of the company’s growth.

☐ Multi-stage dividend discount model is an extension of the constant dividend growth model that allows for an initial period of higher dividend growth followed by a subsequent period of lower, more stable growth.

☐ Case:

✓ Consider a company with a higher short term growth rate of $g_s$ followed by indefinite lower and stable growth rate of $g_l$.

✓ The present value (PV) of a stock at time $t$ using this model is calculated as the sum of two growth stages:
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

□ Stage 1:

The formula for the first part, which calculates the present value of dividends during the initial period of higher growth $(g_s)$, is:


\mathrm{PV}_t = \sum_{i=1}^{n} \frac{D_t (1 + g_s)^i}{(1 + r)^i}


Where:

- PV = Present value.
- $n$ = Number of periods.
- $D_t$ = Dividend at time $(t)$.
- $g_s$ = Initial higher dividend growth rate.
- $r$ = required rate of return.
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

☐ Stage 2:

The formula for the second part, which calculates the present value of dividends after the initial period, assuming constant growth at a lower rate, is:


\mathrm{PV}_t = \frac{\mathrm{E}(S_t + n)}{(1 + r)^n}


Where:


E(S_t + n) = \frac{D_{t+n+1}}{(r - g_l)}


$g_l$ = lower, more stable dividend growth rate

Example
LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Two-stage Model

A stock has an expected dividend payment of $2 in one period, discount rate is 10%, high dividend growth rate of 20% for the first three years, followed by a slower growth rate of 5% thereafter. Calculate the present value of the stock.

## Solution

High growth period:


PV_t = \sum_{i=1}^{n} \frac{D_t (1 + g_s)^i}{(1 + r)^i}


In this case, $D_t = \$2$, $g_s = 0.20$, $r = 0.10$, $n = 3$
\begin{array}{l}
PV_1 = \frac{2}{(1 + 0.10)^1} + \frac{2 \times (1 + 0.20)^1}{(1 + 0.10)^2} + \frac{2 \times (1 + 0.20)^2}{(1 + 0.10)^3} \\
= 1.818 + 1.983 + 2.163 = \$5.965
\end{array}

LOS : Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Two-stage Model

A stock has an expected dividend payment of $2 in one period, discount rate is 10%, high dividend growth rate of 20% for the first three years, followed by a slower growth rate of 5% thereafter. Calculate the present value of the stock.

## Solution

**Lower growth period:**


E(S_t + n) = \frac{D_{t+n+1}}{(r - g_l)}


So,


E(S_t + n) = \frac{2(1 + 0.20)^2 \times (1 + 0.05)}{0.10 - 0.05} = \frac{3.024}{0.05} = \$60.48


Finally, we discount this to the present:


PV_2 = \frac{\$60.48}{(1 + 0.10)^3} = \$45.440

LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows

## Example: Two-stage Model

A stock has an expected dividend payment of $2 in one period, discount rate is 10%, high dividend growth rate of 20% for the first three years, followed by a slower growth rate of 5% thereafter. Calculate the present value of the stock.

## Solution


\begin{array}{l}
\mathbf{PV}_{\text{total}} = \mathbf{PV}_1 + \mathbf{PV}_2 \\
= \$5.965 + \$45.440 \\
= \$51.41 \\
\end{array}

# Learning Outcome Statements

- LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.
- LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flow.
- LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.
