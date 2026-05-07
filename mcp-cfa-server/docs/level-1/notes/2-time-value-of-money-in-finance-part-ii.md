---
title: "2 Time value of Money in Finance - Part II"
source_pdf: "2._Time_value_of_Money_in_Finance_-_Part_II.pdf"
converter: "mistral-ocr-latest"
date_converted: "2026-05-07T00:28:28Z"
pages: 27
category: "level-1/notes"
sanitized: true
reviewed: false
---
Level I
of the
CFA® Program

Quantitative Methods
TIME VALUE OF MONEY IN FINANCE
PART II
# Learning Outcome Statements

- LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.
- LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flow.
- LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Implied Return of Fixed-Income Instruments

☐ Implied return: Reflects a return based on the current price and future cash flows of a security.
☐ Growth rate: Rate at which the market expects an asset to grow.
☐ For fixed-income instruments, the discount rate or yield-to-maturity is a measure of the implied return.
☐ The implied return provides a view of the market expectations incorporated into an asset’s market price.
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Implied Return of Fixed-Income Instruments

### Discount Bond

☐ Recall:

☐ Investor receives a single principal cash flow (FV) at maturity, with (FV − PV) representing the implied return.

☐ Solving for implied return:

&gt; Rearrange the single cash flow present value formula to make $r$, stated discount rate per period, the subject:


\begin{array}{l}
PV = FV_t(1 + r)^{-t} \\
\Rightarrow r = \sqrt[t]{\frac{FV_t}{PV}} - 1 = \left(\frac{FV_t}{PV}\right)^{\frac{1}{t}} - 1
\end{array}


Example
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Example: Discount Bond

Consider a zero-coupon bond with price of $900, a future value of $1,000, and a maturity of 5 years. Calculate the implied annualized return, $r$.

## Solution

Recall that,


r = \left(\frac{FV_t}{PV}\right)^{\frac{1}{t}} - 1


In this case, $t = 5$, $FV = \$1,000$, $PV = \$900$
r = \left(\frac{1000}{900}\right)^{\frac{1}{5}} - 1 = 2.13\%

LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Implied Return of Fixed-Income Instruments

## Discount Bond

## Example: Discount Bond

Using the financial calculator...

![img-0.jpeg](img-0.jpeg)

| BA II Plus | | |
| --- | --- | --- |
| Press | | Display |
| 5 | “N” | N = 5 |
| -900 | “PV” | PV= -900 |
| 0 | “PMT” | PMT = 0 |
| 1,000 | “FV” | FV = 1,000 |
| “CPT” | “I/Y” | I/Y = 2.13 |
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Implied Return of Fixed-Income Instruments

### Coupon Bonds

☐ Pay periodic interest have cash flows throughout their life until maturity
☐ Yield-to-maturity (YTM) is a single implied market discount rate for all cash flows, regardless of timing.
☐ Assumes an investor expects to receive all promised cash flows and reinvest any cash received at the same YTM.
☐ Recall the PV of a coupon bond:


\text{PV(Coupon Bond)} = \frac{\text{PMT}}{(1 + r)^{1}} + \frac{\text{PMT}}{(1 + r)^{2}} + \cdots + \frac{(\text{PMT}_N + \text{FV}_N)}{(1 + r)^N}


### Where:

PMT = Coupon payment.
FV = Future value.
$r$ = Market discount rate (YTM).
$N$ = Number of periods.
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Implied Return of Fixed-Income Instruments

### Coupon Bonds

☐ We usually use a financial calculator to solve yield-to-maturity (YTM):

## Example: Coupon Bonds

CityGroup Corp. issued a corporate bond 7 years ago with a face value of $1,000 and a 20-year maturity. The bond pays annual interest at a coupon rate of 6%. Currently, the bond is trading at $1,120.

The yield to maturity (YTM) of CityGroup Corp.'s bond is closest to:
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Implied Return of Fixed-Income Instruments

## Coupon Bonds

## Example: Coupon Bonds

Using the financial calculator...

![img-1.jpeg](img-1.jpeg)

| BA II Plus | | |
| --- | --- | --- |
| Press | | Display |
| 13 | “N” | N = 13 |
| -1,120 | “PV” | PV= -1,120 |
| 60 | “PMT” | PMT = 60 |
| 1,000 | “FV” | FV = 1,000 |
| “CPT” | “I/Y” | I/Y = 4.74% |
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Implied Return and Growth of Equity Instruments

☐ Recall present value of a stock for constant growth of dividends:


\mathrm{PV}_t = \frac{\mathrm{D}_t(1 + g)}{r - g} = \frac{\mathrm{D}_{t+1}}{r - g}


## Where:

$\mathrm{PV}_t = \text{Present value at time } t.\mathrm{D}_t = \text{Expected dividend in the next period.}r = \text{Required rate of return.}g = \text{Constant growth rate.}$
r - g &gt; 0

LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Implied Return and Growth of Equity Instruments

### Implied Return:

- Rearranging the above formula as follows:

Dividend yield


r = \frac {\mathrm {D} _ {t} (1 + g)}{\mathrm {P V} _ {t}} + g = \frac {\mathrm {D} _ {t + 1}}{\mathrm {P V} _ {t}} + g


- The implied return is the sum of its anticipated dividend yield and the constant growth rate.

### Growth:

- Rearrange the formula as follows:


g = \frac {r \times \mathrm {P V} _ {t} - \mathrm {D} _ {t}}{\mathrm {P V} _ {t}} + \mathrm {D} _ {t} = r - \frac {\mathrm {D} _ {t + 1}}{\mathrm {P V} _ {t}}


Example
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Example: Implied Return

Suppose FFH is trading at a share price of USD150.00, and its annualized expected dividend per share during the next year is USD2.00.

Moh Tran, an analyst, projects that FFH’s dividend per share will increase at a constant rate of 5% per year indefinitely. The required return expected by investors is closest to:

## Solution


r = \frac{D_{t+1}}{PV_t} + g


So,


r = \frac{2.00 \times 1.05}{150} + 0.05 = 6.40\%

LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Relating P/E Ratio to Expected Future Cash Flows of Equity Investments

☐ What is price-to-earnings (P/E) ratio?

- Valuation metric that compares the current share price of a stock to its earnings per share.
- Investors and analysts use it to determine the relative value of a company's shares compared to other companies or the market.

☐ How does P/E rate to price of an equity investment?

☐ By dividing the present value equation by earnings per share (Eₜ), we get the equation:


\frac{\mathrm{PV}_t}{\mathrm{E}_t} = \frac{\frac{\mathrm{D}_t}{\mathrm{E}_t} \times (1 - g)}{r - g}

LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Relating P/E Ratio to Expected Future Cash Flows of Equity Investments

☐ Typically, the forward P/E ratio, which is based on a projection of a company's earnings per share for the next period (t + 1) is used.


\frac {\mathbf {P V} _ {t}}{\mathbf {E} _ {t}} = \frac {\frac {\mathbf {D} _ {t}}{\mathbf {E} _ {t}} \times (\mathbf {1} - \mathbf {g})}{\mathbf {r} - \mathbf {g}}


Into:


\frac {\mathbf {P V} _ {t}}{\mathbf {E} _ {t + 1}} = \frac {\frac {\mathbf {D} _ {t + 1}}{\mathbf {E} _ {t + 1}}}{\mathbf {r} - \mathbf {g}} = \frac {\mathbf {D} _ {t + 1}}{\mathbf {E} _ {t + 1}} \times \frac {\mathbf {1}}{\mathbf {r} - \mathbf {g}}


Expected payout ratio

☐ The forward P/E ratio is positively related to higher expected dividend payout ratio and growth, and negatively related to the required return.

&gt; Given P/E ratio and dividend payout ratio we can fin either required return or implied dividend growth rate.

Example
LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

## Example: Implied Dividend Growth Rate

Suppose a company has a forward P/E ratio of 15, a dividend payout ratio of 40%, and a required return of 10%, implied dividend growth rate for this company is closest to:

## Solution

☐ Using the formula:


\frac {\mathbf {P V} _ {t}}{\mathbf {E} _ {t + 1}} = \frac {\mathbf {D} _ {t + 1}}{\mathbf {E} _ {t + 1}} \times \frac {1}{r - g}


☐ Substituting the given values into the formula


\begin{array}{l}
15 = \frac{0.4}{0.1 - g} \\
\Rightarrow g = 0.1 - \frac{0.4}{15} = 0.0733
\end{array}

LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Cashflow Additivity Principle

☐ According to Cashflow additivity:

- Present value of any stream of cashflows indexed at the same point equals the sum of the present values of the cashflows.
- Ensures that market prices reflect the condition of no arbitrage - no possibility exists to earn a riskless profit in the absence of transaction costs.
LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Calculating Forward Rates

Consider two zero-coupon bonds. Bond A has a maturity of two years and a yield of 2% per annum, while bond B has a maturity of four years and a yield of 3%. A risk-neutral investor, has $1,000 to invest.

The investor has two investment options that earn the same return.

## Option 1:

- Invest in bond B.
- So that FV after four years is:

\begin{array}{l}
\mathrm{FV}_4 = \mathrm{PV}_0(1 + r_4)^4 \\
= 1000(1.03)^4
\end{array}


## Option 2:

- Invest in bond A and after two years reinvest the proceeds at a two-year forward rate starting in year two, $F_{2,2}$
- So that FV after four years is:

\mathbf{FV}_4 = \mathbf{PV}_0(1 + r_2)^2(1 + F_{2,2})^2

LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Calculating Forward Rates

☐ By the **cash flow additivity principle**, a risk-neutral investor will not prefer one option over the other – they are **indifferent between options 1 and 2**.

☐ Future values of both investments at the end of four years should be the same:


\mathbf{FV}_4 = \mathbf{PV}_0(1 + r_4)^4 = \mathbf{PV}_0(1 + r_2)^2(1 + F_{2,2})


☐ In this scenario, this simplifies to:


\begin{array}{l}
1,125.51 = 1,000(1.02)^2(1 + F_{2,2})^2 \\
\Rightarrow F_{2,2} = \left(\frac{1,125.51}{1,000(1.02)^2}\right)^{0.5} - 1 = 4.01\%
\end{array}


☐ To prevent arbitrage opportunities, the forward rate $F_{2,2}$ should be set to $4.01\%$.

&gt; Ensures that there is **no potential for risk-free profits**, maintaining market efficiency.
LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Option Pricing

☐ Cash flow additivity can be used to determine the fair price of an option contract.

☐ Option contract gives the buyer the right, but not the obligation, to buy (call) or sell (put) an underlying asset at a specified price within a certain period.

## Example: Call Option

☐ Consider a stock that costs $100 now. Its price might increase by 30% to $130 or decrease by 15% to $85 in one year.

![img-2.jpeg](img-2.jpeg)
LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Option Pricing

☐ Assume that an investor wants to sell a call on the stock that gives the buyer the right, but not the obligation, to purchase the asset for $120.

☐ If the stock price goes up, the contract is worth $c_1^u = 130 - 120 = 10$ and worthless if it declines.

&gt; The buyer wouldn't want to use the contract to buy the asset for $120 when they could just buy it for $85 without the contract.

☐ Denote:

✓ $c_0 =$ Initial value of the call option (we wish to determine).

✓ $V_0 =$ Values of the portfolio at $t = 0$.

✓ $V_1^u =$ Value of the portfolio if stock price increases.

✓ $V_1^d =$ Value of the portfolio if stock price decreases.

☐ Assume that at $t = 0$ an investor creates a risk-free portfolio by selling a call option at $c_0$ and buying 0.2222 units of underlying assets so that:


V_0 = 0.2222 \times 100 - c_0


&gt; This portfolio is called a replicating portfolio – creating a matching future cash flow stream to that of a risk-free asset.

Continued...
LOS : Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

# Applying Cash Flow Additivity: Option Pricing

Similarly, in each scenario of stock price decrease and increase:


V _ {1} ^ {u} = 0.2222 \times 130 - 10 = 18.89

V _ {1} ^ {d} = 0.2222 \times 85 - 0 = 18.89


![img-3.jpeg](img-3.jpeg)
LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Option Pricing

☐ Value replicating portfolio equals 18.89, whether the stock prices rise or decline.

➤ Replicating portfolio is risk-free and can be discounted as a risk-free asset.

☐ Assuming that risk-free rate is $r = 2.5\%$, then:


\begin{array}{l}
V_0 = V_1^u (1 + r)^{-1} = V_1^d (1 + r)^{-1} \\
= 18.89 (1.025)^{-1} = 18.43
\end{array}


☐ Value of $c_0$:


\begin{array}{l}
V_0 = 0.2222 \times 100 - c_0 \\
\Rightarrow 18.43 = 0.2222 \times 100 - c_0 \\
\therefore c_0 = 3.79
\end{array}


➤ The fair price of the call option is $3.57, which the seller expects to receive from the buyer.
LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Forward Exchange Rates Using No Arbitrage

☐ The principle of cash flow additivity can be applied to scenarios involving different currencies by converting all cash flows to a common currency using the appropriate exchange rates

&gt; Allows us to compare and combine cash flows from different currencies and make investment decisions based on their combined value.

## Example:

☐ Consider an investor with USD 2,000 who wants to invest it for three months. The investor can choose between two options: investing in the US government debt or German government debt.
LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Forward Exchange Rates Using No Arbitrage

- Option 1: Investing in US Government Debt
- Invest his USD 2,000 in a three-month US Treasury bill.
- Assume the US risk-free rate is 3%.
- After 3 months the future vale the investor will receive:
- $FV = USD2,000 \times e^{0.03 \times \frac{3}{12}} = USD2015$
LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Forward Exchange Rates Using No Arbitrage

### Option 2: Investing in German Government Debt

- Invest in German government debt.
- Investor must convert his USD 2,000 into Euros.
- Assume the exchange rate of EUR/USD = 0.92 (1 USD = 0.92 EUR) so that the investor receives $(2,000 \times 0.92) = \text{EUR } 1840$.
- Then invest in German government debt.
- Assume the German risk-free rate of $6\%$ so after three months the investor receives:


FV = \text{EUR } 1840 \times e^{0.03 \times \frac{3}{12}} = \text{EUR } 1,853.85


- Assuming the investor wants his money in US dollars, we need to convert the EUR 1853.85 back into USD
- Assume a forward exchange rate of USD/EUR = 1.0870

Continued...
LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.

## Applying Cash Flow Additivity: Forward Exchange Rates Using No Arbitrage

### Option 2: Investing in German Government Debt

- After three months, the investor receives:

\frac{\text{EUR1,853.85} \times \text{USD1.0870}}{1 \text{ EUR}} = \$2,015.13 \approx 2,015

- Both options give you the same amount of money after three months: USD 2,015.
- Evidently, the important element is the 3-month forward exchange rate of USD/EUR = 1.0870
- If the forward exchange rate differs from 1.0870, there would be an arbitrage opportunity in converting Euros to dollars.
# Learning Outcome Statements

- LOS: Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.
- LOS: Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flow.
- LOS: Explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values.
