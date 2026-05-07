---
title: "L1 2024 Formula Sheet PDF"
source_pdf: "L1_2024_Formula_Sheet.PDF.pdf"
converter: "mistral-ocr-latest"
date_converted: "2026-05-07T00:09:27Z"
pages: 17
category: "level-1/books"
sanitized: true
reviewed: false
---
![img-0.jpeg](img-0.jpeg)

# Mark Meldrum.com

## 2024
## Level 1 - Formula Sheet

This document should be used in conjunction with the corresponding readings in the 2024 Level 1 CFA® Program curriculum. Some of the graphs, charts, tables, examples, and figures are copyright 2022, CFA Institute. Reproduced and republished with permission from CFA Institute. All rights reserved.

Required disclaimer: CFA Institute does not endorse, promote, or warrant accuracy or quality of the products or services offered by MarkMeldrum.com. CFA Institute, CFA®, and Chartered Financial Analyst® are trademarks owned by CFA Institute.

© markmeldrum.com. All rights reserved.
M
Mark Meldrum.com

# Quantitative Methods

## Financial Calculator Keys

N = Number of Compounding Periods
I/Y = Interest Rate per Year
*In whole numbers (i.e. SN is entered as S)
PV = Present Value
PMT = Payment
FV = Future Value

## End-of-period payments

*Used for regular annuity
2nd [BGN]
2nd Enter
Display END

## Beginning-of-period payments

*Used for annuity due
2nd [BGN]
2nd Enter
Display BGN

## Cash Flow Worksheet

CFₓ: cash flow at time period n
Using the arrow keys and the ENTER key to input cash flow amounts and their frequencies.
Solving for net present value: the NPV key will prompt you to input a discount rate (I). Then pressing the down key and CPT to find the NPV.
Solving for the internal rate of return: use the IRR key and press CPT.

## ICONV

Used to calculate effective rates
Nom = Nominal Rate
C/Y = Compounding Frequency
EFF → CPT = outputs effective rate

## Other Helpful Keys

STO = allows you to store values.
RCL = allows you to recall stored values.

## FORMAT

2nd + FORMAT allows you to change the number of decimal places displayed on the calculator.

## DATA &amp; STAT

Computes multiple values (mean, standard deviation, etc...)

2nd + DATA allows you to your input variables. Once inputted, exit the page, and click 2nd + STAT to find the computed outputs. Use the down arrow keys scroll through the various outputs.

## Future Value (FV) of a single cash flow


FV = PV \times (1 + r)^n


## Present Value (PV) of a single cash flow


PV = \frac{FV}{(1 + r)^n}


## Present Value (PV) of Perpetuity


PV(\text{perpetuity}) = \frac{A}{r}

A = \text{Payment amount}


## Future Value (FV) with continuous compounding


FV_n = PV e^{r} / n


QM (1/14)
QM (2/14)
QM (3/14)

## Effective Annual Rate (EAR)


\text{EAR} = (1 + \text{Periodic rate})^m - 1


Periodic rate
\frac{\text{Stated Annual Rate}}{\text{Number of Compounding Periods One Year}} = \frac{1}{n}

m = Number of Compounding Periods One Year

## EAR with continuous compounding


\text{EAR} = e^{r_0} - 1


## Relative Frequency

Relative Frequency
\frac{\text{Absolute frequency of each interval}}{\text{Total number of observations}}

## Cumulative Relative Frequency

Cumulative Relative Frequency
= Add the relative frequencies while proceeding from the first to the last interval

## Arithmetic Mean


X = \frac{\sum_{n=1}^{m} X}{N}


## Median

In an ordered sample of n items:
For even number of observations
= Mean of values \frac{n}{2} \&amp; \frac{n + 2}{2}
For odd number of observations = \frac{n + 1}{2}

## Mode

the most frequently occurring value in a distribution
M
Mark Meldrum.com

# Weighted Average Mean


\overline{X}_w = \sum_{i=1}^{n} w_i \times X_i


# Geometric Mean


G = \sqrt[n]{(1 + r_1)(1 + r_2) \dots (1 + r_n)} \quad \text{with } r_i \geq 0 \text{ for } i = 1, 2, \dots, n


# Harmonic Mean


\mathrm{HM} = \frac{n}{\sum_{i=1}^{n} \left(\frac{1}{X_i}\right)} \quad \text{with } X_i &gt; 0 \text{ for } i = 1, 2, \dots, n


# Mean Absolute Deviation


\mathrm{MAD} = \frac{\sum_{i=1}^{n} (x_i - \bar{x})}{n}


# Percentile


\text{Percentile} = \mathrm{Ly} = (n + 1) \times \frac{\mathrm{y}}{100}

\text{Quartile} = \frac{\text{Distribution}}{4}

\text{Quintile} = \frac{\text{Distribution}}{5}

\text{Decile} = \frac{\text{Distribution}}{10}


# Range


\text{Range} = \text{Maximum value} - \text{Minimum value}


# Population Variance


\sigma^2 = \frac{\sum_{i=1}^{n} (x_i - \mu)^2}{N}


# Sample Variance


s^2 = \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}


# Standard Deviation

Square root of the variance value

# Sample Target Semi-Deviation


S_{\text{Target}} = \sqrt{\sum_{f \text{ or all } X_f \leq B}^{n} \frac{(X_f - B)^2}{n - 1}}


where $B$ is the target and $n$ is the total number of sample observations.

# Coefficient of Variation


CV = \frac{\text{Standard Deviation of } x}{\text{Average Value of } s} = \frac{x_s}{\bar{x}}


# Skewness

Positive Skew; Mean &gt; Median &gt; Mode

Negative Skew; Mean &lt; Median &lt; Mode

# Probability Stated as Odds


\text{Odds for an Event } "E" = \frac{P(E)}{1 - P(E)}

\text{Odds against an Event } "E" = \frac{1 - P(E)}{P(E)}


# Probability of A or B


P(A \text{ or } B) = P(A) + P(B) - P(AB)


# Joint Probability of Two Events


P(AB) = P(A|B) \times P(B)


# Conditional Probability of A given B


P(A|B) = \frac{P(AB)}{P(B)}


# Joint Probability of any number of independent events


P(ABCDE) = P(A) \times P(B) \times P(C) \times P(D) \times P(E)


# Total Probability Rule


\begin{array}{r l}
P(A) &amp; = P(A|B_1) \times P(B_2) + P(A|B_2) \times P(B_3) \\
&amp; \quad + P(A|B_3) \times P(B_4) \\
&amp; \quad + \dots P(A|B_n) \times P(B_n)
\end{array}


# Expected Value of a Random Variable


E(X) = P(X_1|X_2) + P(X_3|X_4) + \dots + P(X_n|X_n) = \sum_{i=1}^{n} P(X_i|X_i)


# Variance of a Random Variable


\sigma^2(X) = \sum_{i=1}^{n} P(X_i) [X_i - E(X)]^2


QM (4/14) QM (5/14) QM (6/14)
M
Mark Meldrum.com

# Portfolio Expected Return


E(R_p) = w_1 E(R_1) + w_2 E(R_2) + w_3 E(R_3) \dots w_n E(R_n)


# Portfolio Variance


\begin{array}{l}
\operatorname{var}(R_p) = w_2^t \sigma^A(R_p) + w_3^t \sigma^A(R_p) \\
\quad + 2w_1 w_2 \sigma(R_2) \sigma(R_p) \rho(R_p, R_p)
\end{array}


# Covariance


\operatorname{cov}(R_1, R_2) = E\left[(R_1 - E(R_1)[R_2 - E(R_1)]\right]


# Correlation


\rho(R_1, R_2) = \frac{\operatorname{cov}(R_1, R_2)}{\sigma(R_1) \sigma(R_2)}


# Bayes' Formula


\begin{array}{l}
P(\text{Event} | \text{Information}) \\
= \frac{P(\text{Information} | \text{Event})}{P(\text{Information})} \times P(\text{Event})
\end{array}


# Multiplication Rule of Counting


n! = n(n-1)(n-2)(n-3)\dots 1


# Multinomial Formula for Labeling Problems


n! = \frac{n!}{n1!n2!\dots nk!}


# Combination Formula

# of ways we can choose r objects from a total of n objects, when order does not matter.


nCi = \frac{n!}{(n-r)!r!}


QM (7/14)

# Permutation Formula

# of ways that we can choose r objects from a total of n objects, when order does matter.


nPr = \frac{n!}{(n-r)!}


# Probabilities for a Random Variable given its Cumulative Distribution Function

To find $F(x)$, sum up, or cumulate, values of the probability function for all outcomes less than or equal to $x$.

# Probabilities given the Discrete Uniform Function

Cumulative distribution function for the nth outcome $F(Xn) = nP(X)$

# Probability function for a Binomial Random Variable

Probability of x successes in n trials


= \frac{n!}{(n-x)!x!} \times p^x (1-p)^{n-x}


# Expected Value and Variance of a Binomial Random Variable

Expected Value of $X = nP$

Variance of $X = nP(1-p)$

# Continuous Uniform Distribution


f(x) = \frac{1}{b-a} \text{ for } a &lt; x &lt; b \text{ or } 0

F(x) = \frac{x-a}{b-a} \text{ for } a &lt; x &lt; b


QM (8/14)

# Standardizing a Random Normal Variable


S = \frac{\bar{x} - \mu}{\sigma}


approximately...

50% of all observations fall within $\mu \pm (2/3)\sigma$

68% of all observations fall within $\mu \pm 1\sigma$

95% of all observations fall within $\mu \pm 2\sigma$

99% of all observations fall within $\mu \pm 3\sigma$

# Safety-First Ratio


SFRatio = \frac{[E(R_p) - R_1)]}{\sigma_p}


Portfolio with the highest ratio is preferred

# Continuously Compounded Return

from $t = 0$ to $t = 1$
r_{0,1} = \frac{\ln\left(\frac{r_t}{r_0}\right)}{r_p}


# Degrees of Freedom of Student's T-distribution

$df =$ number of sample observations $-1 = n-1$

# Standard Error of the Sample Mean ($\sigma$ known)


\sigma_d = \frac{a}{\sqrt{n}}


$(\sigma \text{ unknown})$
s_d = \frac{x}{\sqrt{n}}


QM (9/14)
M
Mark Meldrum.com

# Normally Distributed Population with Known Variance


\text{Confidence intervals} = \bar{X} \pm z_{e/2} \times \left(\frac{\pi}{\sqrt{n}}\right)

z_{e/2} \approx 1.65 \text{ for } 90\% \text{ Confidence Interval}, 5\% \text{ in each tail}

z_{e/2} = 1.96 \text{ for } 95\% \text{ Confidence Interval}, 2.5\% \text{ in each tail}

z_{e/2} \approx 2.58 \text{ for } 99\% \text{ Confidence Interval}, 8.5\% \text{ in each tail}


# Large sample, Population Variance Unknown


\text{Confidence intervals} = \bar{X} \pm z_{e/2} \times \left(\frac{1}{\sqrt{n}}\right)


# Small sample, Population Variance Unknown


\text{Confidence intervals} = \bar{X} \pm t_{e/2} \times \left(\frac{\pi}{\sqrt{n}}\right)


# Type I and II Errors

Type I – Reject $H_2$ when true

Type II – Accept $H_2$ when false

# Power of a Test


1 - P(\text{Type II error})


# Test of a Single Mean


z = \frac{\bar{X} - \mu_0}{\sigma / \sqrt{n}} \quad \text{or} \quad t_{n-1} = \frac{\bar{X} - \mu_0}{\bar{\sigma} / \sqrt{n}}


# Test of the Difference in Means (Equal Variances)


t = \frac{(\bar{X}_1 - \bar{X}_2) - (\mu_1 - \mu_2)}{\left(\frac{s_e^2}{n_1} + \frac{s_e^2}{n_2}\right)^{\frac{2}{3}}}

\text{where } s_e^2 = \frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}


# Test of the Difference in Means (Unequal Variances)


t = \frac{(\bar{X}_1 - \bar{X}_2) - (\mu_1 - \mu_2)}{\left(\frac{s_e^2}{n_1} + \frac{s_e^2}{n_2}\right)^{\frac{2}{3}}}

\text{where } df = \frac{\left(\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1} + \frac{(s_2^2/n_2)^2}{n_2}}


# Test of Mean of Differences


t = \frac{\bar{d} - \mu_{d0}}{s_d} \quad \text{where} \quad \bar{d} = \frac{1}{n} \sum_{i=1}^{n} d_i


# Test of a Single Variance


z^2 = \frac{(n - 1)z^2}{\sigma_0^2}


# Test of the differences in Variances


F = \frac{\pi^2}{s_e^2}


QM (10/14)

QM (11/14)

# Test of a Correlation


r = \frac{r \sqrt{n - 2}}{\sqrt{1 - r^2}}


# Regression Coefficient


Y = b_0 + b_1 X_i + \varepsilon_i


# Assumptions of Simple Linear Regression

Linearity: a linear relation exists between the dependent variable and the independent variable.

Homoscedasticity: variance of the error term is the same for all observations.

Independence: the error term is uncorrelated across observations

Normality: the error term is normally distributed


TSS = SSE + RSS

\sum_{i=1}^{n} (Y_i - \bar{Y})^2 = \sum_{i=1}^{n} (Y_i - \bar{Y}_i)^2 + \sum_{i=1}^{n} (\bar{Y}_i - \bar{Y})^2


where;

TSS: total sum of squares (total variance)


\sum_{i=1}^{n} (Y_i - \bar{Y})^2


SSE: sum of the squares errors (unexplained variance)


\sum_{i=1}^{n} (\bar{Y}_i - \bar{Y}_i)^2


RSS: regression sum of squares (explained variance)


\sum_{i=1}^{n} (\bar{Y}_i - \bar{Y})^2


QM (12/14)
M
Mark Meldrum.com

# Coefficient of Determination


R ^ {2} = \frac {\text {explained variance}}{\text {total variance}}

R ^ {2} = \frac {T S S - S S E}{T S S}


# Standard Error of Estimate


s _ {e} = \sqrt {\frac {\sum_ {i = 1} ^ {n} (Y _ {i} - \bar {Y} _ {i}) ^ {2}}{n - 2}}


# F-Statistic


F = \frac {R S S / k}{S S E / n - (k + 1)} = \frac {M S R}{M S E}


a significant F-statistic implies the regression as a whole is significant.

where;

$K$ is the number of slope coefficients

# Test of the Slope Coefficient


t = \frac {\hat {b} _ {1} - b _ {1}}{s _ {\hat {b} _ {1}}} = \frac {S _ {e}}{\sqrt {\sum_ {i = 1} ^ {n} (X _ {i} - \bar {X}) ^ {2}}}


QM (13/14)

# Test of the Intercept Coefficient


t _ {i n t e r c e p t} = \frac {\hat {b} _ {0} - B _ {0}}{s _ {\hat {b} _ {0}}}

s _ {\hat {B} _ {0} =} \sqrt {\frac {1}{n} + \frac {\bar {X} ^ {2}}{\sum_ {i = 1} ^ {n} (X _ {i} - \bar {X}) ^ {2}}}


# Prediction Interval


\bar {Y} \pm t _ {\text {c r i t i c a l}} \cdot s _ {f}

s _ {f} = s _ {e} \sqrt {1 + \frac {1}{n} + \frac {(X _ {f} - \bar {X}) ^ {2}}{\sum_ {i = 1} ^ {n} (X _ {i} - \bar {X}) ^ {2}}}


# Economics

## Price Elasticity of Demand


\frac {\% \Delta Q}{\% \Delta P} = \left(\frac {P _ {0}}{Q _ {0}}\right) \times \left(\frac {\Delta Q}{\Delta P}\right)


$\left(\frac{\Delta Q}{\Delta P}\right)$ is the slope coefficient

Demand Elastic if absolute value &gt; 1

Demand Inelastic if absolute value &lt; 1

## Income Elasticity of Demand


\frac {\% \Delta Q}{\% \Delta I} = \left(\frac {I _ {0}}{Q _ {0}}\right) \times \left(\frac {\Delta Q}{\Delta I}\right)


$\left(\frac{\Delta Q}{\Delta I}\right)$ is the slope coefficient

Normal good if positive

Inferior good if negative

## Cross Elasticity of Demand


\frac {\% \Delta Q}{\% \Delta P _ {c}} = \left(\frac {P _ {c}}{Q _ {0}}\right) \times \left(\frac {\Delta Q}{\Delta P _ {c}}\right)


$\left(\frac{\Delta Q}{\Delta P_c}\right)$ is the slope coefficient

$P_c =$ Price of the related good

Substitute good if positive

Complementary good if negative

QM (14/14) ECON (1/7)

# Breakeven and Shutdown Points

Breakeven Point: Total Revenue = Total Cost

Shutdown Point (Short-Run): Total Revenue &lt; Total Variable Cost

Shutdown Point (Long-Run): Total Revenue &lt; Total Cost

# Firm Structures

Perfect Competition: Numerous firms; low barriers to entry; homogenous products; no pricing power;

Monopolistic Competition: Numerous firms; low barriers to entry; differentiated products; some pricing power

Oligopoly: Few firms; high barriers to entry; products can be homogeneous or differentiated; significant pricing power

Monopoly: Single firm; high barriers to entry; high pricing power

# Profit Maximization Point (All Firms)

Marginal Revenue = Marginal Cost

# Gross Domestic Product (GDP)

GDP (Expenditure Approach) = Consumption + Investment + Government Spending + Net Exports

GDP (Income Approach) = Household Income + Business Income + Government Income

GDP (Value-Added Approach): Sum Incremental Value-Added at each Stage of Production

# Nominal and Real GDP

Nominal GDP = $P_{c} \times Q_{c}$

Real GDP = $P_{c} \times Q_{c}$

h = how your price

ECON (2/7)
M
Mark Meldrum.com

# GDP Deflator

GDP Deflator
- Value of current year output at current year prices
- Value of current year output at base year prices
× 100

# National income, Personal income &amp; Personal disposable Income

National income
= Compensation of employees
+ Corporate and government enterprise profits before taxes
+ interest income
+ unincorporated business net income + rent
+ indirect business taxes less subsidies

Personal Income
= National Income – Indirect business taxes
- Corporate income taxes
- Undistributed corporate profit
+ Transfer payments

Personal disposable income = personal income – personal taxes

# Aggregate Demand

Shifts due to changes in household wealth, consumer and business expectations, capacity utilization, monetary policy, fiscal policy, exchange rates and foreign GDP

# Aggregate Supply

Short-Run Shifts: changes in changes in potential GDP, nominal wages, input prices, future price expectations, business taxes and subsidies and exchange rate

Long-Run Shifts: changes in labor supply, supply of physical and human capital and productivity and technology

ECON (3/7)

# Growth Accounting Equation

Growth in Potential GDP
= Growth in technology
+ w₁(Growth in labor)
+ w₂(Growth in capital)

# Business Cycle Phases

Trough (Lowest Point); Expansion; Peak (Highest Point); Contraction

# Economic Indicators

Leading: Turn ahead of peaks and troughs of business cycle (S&amp;P500, manufacturing new orders, building permits)

Coincidental: Turns coincide with phase of business cycle (Employee Payrolls, Manufacturing Sales, Personal Income)

Logging: Turns after the business cycle movements (Average Prime Rate, Inventory-Sales Ratio, Duration of Unemployment)

# Types of Unemployment

Frictional: Unemployment from time lag to find new job

Cyclical: Unemployment due to business cycle fluctuations

Structural: Unemployment due to lack of skills for job openings or distance factors

# Consumer Price Index (CPI)


CPI = \frac{\text{Cost of basket at current prices}}{\text{Cost of basket at base period prices}} \times 100


ECON (4/7)

# Monetary Policy

Monetary Policy: central bank activities that influence the supply of money and credit; expansionary when policy rate &lt; neutral interest rate; contractionary when policy rate &gt; neutral interest rate

Central Bank Objectives: Full Employment and Price Stability


\text{Money Multiplier} = \frac{1}{\text{Reserve Requirement}}


# Fiscal Policy

Fiscal Policy: government decisions about taxation and spending; expansionary when government budget balance decreasing; contractionary when government budget balance increasing


\text{Fiscal Multiplier} = \frac{1}{1 - \text{MPC}(1 - t)}


# Equation of Exchange

M x V = P x Y

# Gross Domestic Product vs Gross National Product

GDP: Final value of goods and services produced within a country/economy

GNP: Final value of goods and services produced by citizens of a country/economy
M
Mark Meldrum.com

## Regional Trading Agreements (RTA)

Free trade areas (FTA): Trade barriers removed among members; Countries still have own policies against non-members

Customs Union: FTA with common policy against non-members

Common Market: Customs union with free movement of factors of production among members

Economic Union: All aspects of common market with common economic institutions and economic policy

Monetary Union: If members of economic union adopt a common currency

## Balance of Payments

Current Account: measures flow of goods and services (Merchandise Trade, Services, Income Receipts, Unilateral Transfers)

Capital Account: measures transfers of capital (Capital Transfers, Sales and Purchases of Non-Produced, Non-Financial Assets)

Financial Account: records investment flows (Financial Assets Abroad, Foreign-Owned Financial Assets)

## Real Exchange Rate

Real exchange rate $\left(\frac{d}{f}\right)$
= \operatorname{Spot rate} \left(\frac{d}{f}\right) \times \frac{\text{CPI foreign}}{\text{CPI domestic}}


## Change in Nominal Exchange Rate


\begin{aligned}
&amp; \Delta \text{exchange rate} \left(\frac{d}{f}\right) \\
&amp; = \frac{\operatorname{Spot rate} \left(\frac{d}{f}\right) \text{ at the end of the period}}{\operatorname{Spot rate} \left(\frac{d}{f}\right) \text{ at the beginning of the period}} - 1
\end{aligned}


## Change in Real Exchange Rate


\begin{aligned}
&amp; \Delta \text{Real exchange rate} \left(\frac{d}{f}\right) \\
&amp; = \left(1 + \frac{\Delta x_{d}}{S_{d}}\right) \times \left(\frac{1 + \frac{\Delta p_{c}}{P_{c}}}{1 + \frac{\Delta p_{c}}{P_{a}}}\right) - 1
\end{aligned}


## Forward Discount/Premium

Forward Premium or Discount


= \frac{\text{Forward rate} \left(\frac{d}{f}\right)}{\text{Spot rate} \left(\frac{d}{f}\right)} - 1


## No-Arbitrage Forward Exchange Rate

Forward Rate $\left(\frac{d}{f}\right)$
\begin{aligned}
&amp; = \operatorname{Spot rate} \left(\frac{d}{f}\right) \\
&amp; \times \frac{(1 + \text{interest rate domestic} \times \frac{\text{actual}}{\text{stat}})}{(1 + \text{interest rate foreign} \times \frac{\text{actual}}{\text{stat}})}.
\end{aligned}


## Exchange Rate Regimes

Monetary Union: Members adopt common currency

Dollarization: Members adopt foreign currency

Fixed Parity: $\pm 1$ percent around the parity level

Target Zone: up to $\pm 2$ percent around the parity level

Crawling Peg: Pegged exchange rate periodically adjusted

Managed Float: Central Bank acts to influence exchange rate without a specific target

Independent Float: Exchange rate freely determinedly by the market

## Financial Statement Analysis

### Accounting Equation (Balance Sheet)

Assets = Liabilities + Owners' Equity

Assets = Liabilities + Contributed Capital + Ending Retained Earnings

Assets = Liabilities + Contributed Capital + Beginning Retained Earnings + Revenues - Expenses - Dividends

### Income Statement Equation

Revenues + Other Income - Expenses = Net Income

## Financial Statement Analysis Framework

1) Articulate the purpose and context of the analysis.
2) Collect input data.
3) Process data.
4) Analyze/interpret the processed data
5) Develop and communicate conclusions and recommendations
6) Follow-Up

## Revenue Recognition Principles

Requirements: 1) Risk and reward of ownership is transferred 2) Collectability is probable

## Five-Step Revenue Recognition Model

1. Identify the contract(s) with a customer
2. Identify the separate or distinct performance obligations in the contract
3. Determine and allocate the transaction price to the performance obligations in the contract
4. Recognize revenue when (or as) the entity satisfies a performance obligation

## Expense Recognition Principles

Matching principle – match expenses with the revenues they help generate

ECON (6/7)
ECON (7/7)
FSA (1/10)
M
Mark Meldrum.com

# Basic Earnings Per Share


\text{Basic EPS} = \frac{\text{Net income} - \text{Preferred dividends}}{\text{Weighted Average}}

\text{Number of Common Shares Outstanding}


# Diluted Earnings Per Share


\begin{array}{l}
\text{Diluted EPS} \\
= \frac{\text{Net Income}}{\text{Weighted Average}} \\
\end{array}

= \frac{\text{Number of Common Shares Outstanding}}{+ \text{New Common Shares Issued at Conversion}}


*if-converted method


\begin{array}{l}
\text{Diluted EPS} \\
= \frac{\text{Net Income} + \text{Convertible Debt Interest (1 - t)} - \text{Preferred Dividends}}{\text{Weighted Average Number of Common Shares Outstanding}} \\
\end{array}

= \frac{\text{Weighted Average Number of Common Shares Outstanding}}{\text{New shares that would be issued from Option Exercise} - \text{Shares that could be purchased with cash proceeds from exercise}} \times (\text{Proportion of Year Financial Instruments Outstanding})


*Treasury stock method

# Comprehensive Income

Comprehensive Income = Net Income + Other

Comprehensive Income

# Financial Asset Measurement

**Held-for-trading**: measured at fair value on B/S, Dividends/Interest and Unrealized/Realized PnL on I/S

**Available-for-sale**: measured at fair value on B/S; realized PnL I/S; unrealized PnL OCI

**Held-to-maturity**: Amortized cost on B/S; Coupons/Dividends through I/S; realized PnI I/S

# IFRS vs US GAAP

## IFRS

Interest Received: Operating or Investing

Interest Paid: Operating or Financing

Dividends Received: Operating or Investing

Dividends Paid: Operating or Financing

## US GAAP

Interest Received: Operating

Interest Paid: Operating

Dividends Received: Operating

Dividends Paid: Financing

# Direct Method vs Indirect Method

**Direct Method**: disclose cash inflows by source and cash outflows by use

**Indirect Method**: reconcile change in cash from net income with non-cash items and net changes in working capital

# Free Cash Flow to the Firm (FCFF)

FCFF

= NI + NCC + Int(1 - Tax rate) - FCinv - WClov

FCFF = CFO + Int(1 - Tax rate) - FCinv

# Free Cash Flow to Equity (FCFE)

FCFE = CFO - FCInv + Net borrowing

FCFE = NI + NCC - CapEx - ΔWorking Capital + Net Borrowing

# Activity Ratios


\text{Receivables Turnover} = \frac{\text{Revenue}}{\text{Average receivables}}

\text{Days of sales outstanding} = \frac{\text{Number of days in period}}{\text{Receivables turnover}}

\text{Inventory turnover} = \frac{\text{Cost of sales or cost of goods sold}}{\text{Average inventory}}

\text{Days of inventory on hand} = \frac{\text{Number of days in period}}{\text{Inventory turnover}}

\text{Payables turnover} = \frac{\text{Purchases}}{\text{Average trade payables}}

\text{Number of days of payables} = \frac{\text{Number of days in period}}{\text{Payables turnover}}

\text{Fixed asset turnover} = \frac{\text{Revenue}}{\text{Average net fixed assets}}

\text{Total asset turnover} = \frac{\text{Revenue}}{\text{Average total assets}}


# Liquidity Ratios


\text{Current ratio} = \frac{\text{Current assets}}{\text{Current liabilities}}

\text{Quick ratio} = \frac{\text{Cash} + \text{Short term Marketable securities} + \text{receivables}}{\text{Current liabilities}}

\text{Cash ratio} = \frac{\text{Cash} + \text{Short term Marketable securities}}{\text{Current liabilities}}

\text{Defensive interval ratio} = \frac{\text{Cash} + \text{Short term Marketable securities} + \text{receivables}}{\text{Daily cash expenditures}}

\text{Cash conversion cycle} = \text{Days of Inventory on hand} + \text{Day Sales Outstanding} - \text{Number of days of payables}


FSA (2/10)

FSA (3/10)

FSA (4/10)
M
Mark Meldrum.com

# Solvency Ratios


\text{Debt to Assets} = \frac{\text{Total debt}}{\text{Total assets}}

\text{Debt to equity} = \frac{\text{Total debt}}{\text{Total equity}}

\text{Financial leverage} = \frac{\text{Total assets}}{\text{Total equity}}


# Coverage Ratios


\text{Interest coverage} = \frac{\text{EBIT}}{\text{Interest payments}}

\text{Fixed charge coverage} = \frac{\text{EBIT} + \text{Lease payments}}{\text{Interest payments} + \text{Lease payments}}


# Profitability Ratios


\text{Gross profit margin} = \frac{\text{Gross profit}}{\text{Revenue}}

\text{Net profit margin} = \frac{\text{Net income}}{\text{Revenue}}

\text{Operating profit margin} = \frac{\text{Operating income}}{\text{Revenue}}

\text{ROA} = \frac{\text{Net income}}{\text{Average total assets}}

\text{ROE} = \frac{\text{Net income}}{\text{Average total equity}}


# Du Pont Analysis


\text{ROE} = \text{ROA} \times \text{Leverage}


# Traditional Dupont


\text{ROE} = \text{Net profit margin} \times \text{Total asset turnover} \times \text{Leverage}

\text{ROE} = \frac{\text{Net Income}}{\text{Sales}} \times \frac{\text{Sales Assets}}{\text{Assets}} \times \frac{\text{Assets Equity}}{\text{Equity}}


# Extended Dupont


\text{ROE} = \text{Tax burden} \times \text{Interest burden} \times \text{EBIT margin} \times \text{Total asset turnover} \times \text{Leverage}

\text{ROE} = \frac{\text{Net Income}}{\text{EBT}} \times \frac{\text{EBT}}{\text{EBIT}} \times \frac{\text{EBIT Revenue}}{\text{Total Assets}} \times \frac{\text{Assets Equity}}{\text{Equity}}


# Dividend Related Ratios

Dividends payout ratio


\text{Common share dividends} = \frac{\text{Common share dividends}}{\text{Net income attributable to common shares}}


Retention rate


\text{Net income attributable to common shares} = \frac{\text{Common share dividends}}{\text{Net income attributable to common shares}}


Sustainable growth rate $(g) = b \times \text{ROE}$

# Weighted Average Cost per Unit


\text{Weighted average cost per unit} = \frac{\text{Cost of goods available for sale}}{\text{Number of units available for sale}}


COGS using weighted average cost


= \text{Units sold} \times \text{Weighted average cost per unit}


# Cost of Goods Sold (FIFO/LIFO)


\text{COGS}' = \text{Beginning Inventory} + \text{Purchases} - \text{Ending Inventory}


# LIFO to FIFO Conversion


\text{FIFO COGS} = \text{LIFO COGS} - (\text{Ending LIFO reserve} - \text{Beginning LIFO reserve})


FIFO Ending Inventory


= \text{LIFO Ending Inventory} + \text{LIFO reserve}

\text{Net Income(FIFO)} = \text{Net Income(LIFO)} + (\text{Ending LIFO reserve} - \text{Beginning LIFO reserve}) \times (1 - \text{tax rate})


LIFO liquidation occurs when older LIFO inventory is sold (Ending LIFO reserve &lt; Beginning LIFO reserve)

# LIFO vs FIFO

LIFO is only allowed under US GAAP

Under a period of rising prices and stable or increasing inventory:

**LIFO leads to:**

- Higher COGS
- Lower Gross Profit
- Lower Ending Inventory
- Higher CFO from tax savings

**FIFO leads to:**

- Lower COGS
- Higher Gross Profit
- Higher Ending Inventory
- Lower CFO higher relative taxes

# Inventory Measure

**IFRS:** Lower of Cost and Net Realisable Value (NRV)

**US GAAP:** Lower of Cost, Market Value or Net Realisable Value (NRV)

FSA (5/10)
FSA (6/10)
FSA (7/10)
M
Mark Meldrum.com

$NBV =$ Expected sales price
– Estimated selling costs
– Completion costs

## Depreciation Methods

### Straight-Line

Depreciation expense
 \frac{\text{Original cost} - \text{Salvage value}}{\text{Useful Life}} 

### Double Declining Balance

Depreciation expense
 = \frac{2}{\text{Useful Life}} 
× Net Book Value at Beginning of Year X

### Units of Production Method

Amortization
– Original cost – Salvage value
* Total number of output units
× Output units produced in the period

## Revaluation of Long-Lived Assets

**US GAAP:** Revaluation Prohibited
**IFRS:** Revaluation recognized in net income to the point it reverses previous impairment losses; additional gains go into revaluation surplus

## Capitalizing vs. Expensing

**Capitalizing:** smooths net income impact; higher ROE and ROA initially; lower ROE and ROA later on;
**Expensing:** short-term net income decline; lower ROE and ROA initially; higher ROE and ROA later on;

## Income Tax Expense

Income Tax Expense
 = \text{Taxes payable} + \Delta DTL - \Delta DTA 

## Effective Tax Rate

Effective Tax Rate
 = \frac{\text{Income Tax Expense}}{\text{Pretas Income}} 

FSA (8/10)

## Deferred Tax Asset (DTA)

Arise when excess amount paid for income taxes (taxable income &gt; pre-tax income)
DTA = (Tax Base – Carrying Amount) × Tax Rate

## Deferred Tax Liabilities (DTL)

Appear when a deficit amount exists for income tax payment (taxable income &lt; pre-tax income)
DTL = (Carrying Amount – Tax Base) × Tax Rate

## Permanent Differences

### Permanent Differences

Income or expense items not allowed by tax legislation
Tax credits for some expenditures that directly reduce taxes

## Temporary Differences

Asset; Carrying Amount &gt; Tax Base; DTL
Asset; Carrying Amount &lt; Tax Base; DTA
Liability; Carrying Amount &gt; Tax Base; DTA
Liability; Carrying Amount &lt; Tax Base; DTL

## Interest Expense

Total interest expense of a discount bound
= Interest payment
+ Amortization of discount

Total interest expense of a premium bound
= Interest payment
– Amortization of premium

## Effective Interest Method

Interest expense
= Carrying value of the bond at the beginning of the period
× Effective interest rate

Interest Payment = Face value of bond
× Coupon Rate

Amortization of Discount(Premium)
= interest expense
– interest payment

FSA (9/10)

## Leasing vs Purchasing

Tax incentives (if lessee is in a low tax bracket and lessor in a high tax bracket)
Usually less costly for lessee
Lessor better able to bear risk associated with ownership
Economies of scale for lessor

## Finance Lease vs Operating Lease

**Operating Lease:** more similar to renting an asset, leasee records lease payable and a “right-of-use” asset on B/S, all risks and ownership remain with lessor.

**Finance Lease:** more similar to owning an asset, leasee records lease payable and a “right-of-use” asset on B/S, risks of ownership are transferred to the leasee.

## Pension Plans

**Defined Contribution Plan:** Amount of contribution is expensed.
**Defined Benefit Plan:** Contributions also expensed. Underfunded/Overfunded status appears on B/S as an A or L.

## Corporate Issuers

### Net Present Value (NPV)

$NPV = PV$ of cashflows – Initial Investment outlay
 = \sum_{i=1}^{n} \frac{CPt}{(1+i)^t} 

$CFt =$ the expected after tax cash flow at time t
$N =$ the project’s expected life

$r =$ the required rate of return for project or opportunity cost of capital
*Refer to Cash Flow Worksheet under TVM section

FSA (10/10) CORP (1/3)
M
Mark Meldrum.com

## Internal Rate of Return (IRR)


\sum_{t=1}^{N} \frac{CFt}{(1 + \text{IRR})^t} = \beta


IRR is the discount rate that sets NPV to zero
*Refer to Cash Flow Worksheet under TVM section

## Weighted Average Cost of Capital (WACC)


WACC = w_p r_p (1 - t) + w_p r_p + w_n r_n


## Cost of Equity using CAPM


E(R_i) = R_P + \beta_1 [E(R_M) - R_P]


## Cost of Debt Capital

After tax cost of debt = $r_A (1 - t)$

## Cost of Preferred Stock


r_p = \frac{D_p}{R_p}


## Cost of Equity using DDM Approach


r_e = \frac{D_e}{P_e} + \beta


## Sustainable Growth Rate


\beta = \left(1 - \frac{D}{E P E}\right) \times BOE


## Estimating Beta

Unlevering the peer company's beta


\beta_{\text{Unlevered}} = \beta_{\text{Equity}} \left[ \frac{1}{[1 + ((1 - t) \times \frac{D}{E})^t]} \right]


## Relever using capital structure of the estimated company.


\beta_{\text{Equity}} = \beta_{\text{unlevered}} \left[ 1 + \left((1 - t) \times \frac{D}{E}\right) \right]


## Operating &amp; Cash Conversion Cycle

### Operating cycle

- Number of days of inventory
- Number of days of receivables

### Cash conversion cycle

- Number of days of inventory
- Number of days of receivables
- Number of days of payables

## Accounts Payable Management

Cost of trade credit = $\left(1 + \frac{\text{Adjustment}}{\text{1 - NetIncrease}}\right)^{\frac{1}{\text{Adjustment}}}$ - 1

## Equity

### Margin Call Price

Margin call price = $P_A \times \left( \frac{1 - \text{Initial margin}}{1 - \text{maintenance margin}} \right)$

### Leverage

Initial equity % = $\frac{1}{\text{Leverage ratio}}$

Leverage ratio = $\frac{\text{Value of the position}}{\text{Value of the equity investment}}$

### Rate of Return on Margin Transaction

Rate of return = $\frac{\text{Remaining Equity} - \text{Initial Outlay}}{\text{Initial Outlay}}$

### Price Weighted Index


\text{Value}_{\text{PRC}} = \frac{\sum_{t=1}^{N} w_p P_t}{\text{Division}}

w_p r_p = \frac{P_t}{\sum_{t=1}^{N} P_t}


### Market-Value Weighted Index


\text{Value}_{\text{MVW}} = \frac{\text{Current total market value}}{\text{Base year total market value}} \times \text{Base year index value}

w_t w_t = \frac{Q_t P_t}{\sum_{t=1}^{T} Q_t P_t}


## Equal Weighted Index


\text{Value}_{\text{EW}} = \frac{\text{Initial Index value}}{\text{Total Index value}} \times (1 + \% \text{Change in Index Value})

w_p r_p = \frac{1}{N}


## Price and Total Return of an Index


\text{Price Return}_{\text{Index}} = \frac{\text{Index Value}_1 - \text{Index Value}_p}{\text{Index Value}_p}

\text{Total Return}_{\text{Index}} = \frac{\text{Index Value}_1 - \text{Index Value}_p + \text{Income}}{\text{Index Value}_p}


## Forms of Market Efficiency

Weak Form; security prices fully reflect all past market data; past trading data is already reflected in prices; technical analysis won't lead to superior risk-adjusted performance

Semi-Strong Form; prices reflect all publicly known and available information; new information is rapidly reflected in prices; fundamental and technical analysis can't achieve excess returns

Strong Form; security prices fully reflect both public and private information; technical analysis, fundamental analysis and private information can't be used to achieve excess returns

## Porter's Five Forces and Competitive Strategies

- Threat of Entry
- Power of Suppliers
- Power of Buyers
- Threat of Substitutes

## Rivalry among existing Competitors

Two Competitive Strategies: Product Differentiation and Cost Leadership

CORP (2/3)
CORP (3/3) EQ (1/4)
EQ (2/4)
M
Mark Meldrum.com

# Value of Common Stock

## Dividend Discount Model


V_{d} = \sum_{i=1}^{n} \frac{D_{k} \times (1 + g_{c})^{c}}{(1 + r)^{t}} + \frac{V_{c}}{(1 + r)^{n}}


## Gordon Growth Model


V_{g} = \frac{D_{k} \times (1 + g)}{r - g}


Sustainable growth = (1 - dividend payout ratio) × BOE


g = b \times BOE


# Value of Preferred Stock


V_{p} = \frac{\bar{D}_{k}}{r}

V_{P} = \sum_{i=1}^{n} \frac{D_{i}}{(1 + r)^{t}} + \frac{\text{Par Value}}{(1 + r)^{n}}


# Price Multiples


\text{Justified } P/E = \frac{\sum_{i=1}^{n} r - g}{\text{payout ratio}}

P/E = \frac{\text{Price per share}}{\text{Earnings per share}}

P/CF = \frac{\text{Price per share}}{\text{Cash flow per share}}

P/S = \frac{\text{Price per share}}{\text{Sales per share}}

P/B = \frac{\text{Price per share}}{\text{Book value per share}}


# Enterprise Value Multiples


\frac{EV}{EBITDA} = \frac{\text{Enterprise value}}{\bar{EBITDA}}


EQ (3/4)

# Asset Based Model

Equity value

= Market or fair value of the company's assets
- Market or fair value of the company's liabilities

# Portfolio Management

## Return Measures

### Holding Period Return


HPR = \frac{P_{1} - P_{2} + D_{1}}{P_{0}}


### Arithmetic Return


\text{Arithmetic return} = \frac{R_{1} + R_{2} + R_{3} + R_{4} + \cdots + R_{N}}{n}


### Geometric Mean Return


\text{Geometric mean return} = \left[ (1 + R_{1}) \times (1 + R_{2}) \times \dots \times (1 + R_{n}) \right]^{1/2} - 1


### Money Weighted Rate of Return


\sum_{i=1}^{n} \frac{CPi}{(1 + MWRR)^{2}} = 0


*Use IRR function on calculator to solve this

### Time Weighted Rate of Return


r_{tW} = \left[ (1 + t_{1}) \times (1 + t_{2}) \times \dots \times (1 + t_{N}) \right]^{1/2} - 1


### Nominal Return

Nominal return $(r) = (1 + t_{rP}) \times (1 + \pi) - 1$

# Variance (Asset Returns)


\sigma^{2} = \frac{\sum_{i=1}^{r} (R_{i} - \mu)^{2}}{T}

s^{2} = \frac{\sum_{i=1}^{r} (R_{i} - \bar{R})^{2}}{T - 1}


EQ (4/4) PM (1/3)

# Standard Deviation

Square root of variance

# Covariance (Asset Returns)


cov(R_{i}, R_{j}) = \frac{\sum_{i=1}^{n} \left\{ (R_{i} - E(R_{i}) \left( R_{j} - E(R_{j}) \right) \right\}}{n - 1}


# Correlation (Asset Returns)


\rho(R_{i}, R_{j}) = \frac{cov(R_{i}, R_{j})}{a(R_{i}) a(R_{j})}


# Investment Utility


\text{Utility} = E(r) - \frac{1}{2} A\sigma^{2}

A = \text{measure of risk aversion}


# Portfolio Return


R_{p} = w_{1}(R_{1}) + w_{2}(R_{2}) + w_{3}(R_{3}) \cdots w_{n}(R_{n})


# Portfolio Standard Deviation


a_{p} = \sqrt{(w_{1}^{2} a_{1}^{2} + w_{2}^{2} a_{2}^{2} + 2w_{1}w_{2}\rho_{1,2}a_{1}a_{2})}

a_{p} = \sqrt{(w_{1}^{2} a_{1}^{2} + w_{2}^{2} a_{2}^{2} + 2w_{1}w_{2}Cov(R_{1}, R_{2}))}


# Capital Allocation Line (CAL)

Portfolio Expected Return and Standard Deviation

Plot of combinations Risk-Free and Risky Asset


E(t_{j}) = t_{j} + a_{j} \frac{E(t_{p}) - r_{j}}{a_{p}}


# Capital Market Line (CML)

Tangency point of efficient frontier on Capital Allocation Line. The risky portfolio becomes the market portfolio.

PM (2/3)
M
Mark Meldrum.com

# Beta


\beta_ {1} = \frac {\operatorname {C o v} \left(R _ {c} , R _ {m}\right)}{\alpha_ {m} ^ {2}} = \frac {\rho_ {1 , m} \alpha_ {1}}{\alpha_ {m}}


# Expected Return (CAPM)


E \left(R _ {i}\right) = R _ {p} + \beta_ {1} \left(E \left(R _ {m}\right) - R _ {p}\right)


# Security Market Line

Expected Return and Beta Plot with CAPM used to form the SML. Stocks above the line are undervalued. Stocks below the line are overvalued.

# Sharpe Ratio


\text {S h a r p e R a t i o} = \frac {R _ {p} - R _ {f}}{a _ {p}}


# Treynor Ratio


\text {T r e y n o r m e a s u r e} = \frac {R _ {p} - R _ {f}}{R _ {p}}


# M-Squared


M ^ {2} = \left(R _ {p} - R _ {f}\right) \frac {\alpha_ {m}}{\alpha_ {p}} - \left(R _ {m} - R _ {f}\right)


# Jensen's Alpha


\alpha_ {p} = R _ {p} - \left\{R _ {p} + \beta_ {1} \left(E \left(R _ {m}\right) - R _ {p}\right) \right\}


# Total Risk

Total Risk = Systematic Risk + Non-Systematic Risk

# Investment Policy Statement (IPS)

Introduction

Statement of Purpose

Statement of Duties and Responsibilities

Procedures

Investment Objectives (Risk and Return Objectives)

Investment Constraints (Liquidity, Time Horizon,

Regulatory Requirements, Tax Status)

Investment Guidelines

Evaluation and Review

PM (3/3)

FI (1/6)

# Fixed Income

Basic Features of Fixed-Income Securities

Coupon Rate: Interest rate issuer agrees to pay

Maturity: Time until principal paid

Par Value: Bond's Principal/Face Value

Issuer: Sovereign Governments, Corporate Issuers

Sinking Fund Provision: Periodic payments to retire bonds early

# Types of Bonds

**Calable Bonds**: Issuer can force investors to sell their bonds. Increases yield and lowers duration.

**Putable Bonds**: Investor can sell bond back to issuer. Lowers yield and duration.

**Convertible Bonds**: Bondholders can convert bonds to common shares

**Eurobond**: international bond denominated in currency not native to country where it is issued.

Embedded Option Value

= Bond Value with Option

= Bond Value without Option

# Structured Financial Instruments

**Collateralized Debt Obligations (CDO)**: securities backed by pool of debt obligations

**Capital Protected Instruments**: Zero coupon bond + Option Payoff

**Yield Enhancement Instruments**: Credit Linked Note

**Participation Instruments**: Floating Rate Bonds

**Leveraged Instruments**: Inverse Floater

# Bond Pricing

## Annual Bond

PV


= \frac {\text {C o u p o n}}{(1 + \text {Y T M}) ^ {2}} + \frac {\text {C o u p o n}}{(1 + \text {Y T M}) ^ {2}}

= \frac {\text {C o u p o n}}{(1 + \text {Y T M}) ^ {2}} + \dots + \frac {\text {C o u p o n} + \text {P r i n c i p a l}}{(1 + \text {Y T M}) ^ {4}}


# Semi-Annual Bond

PV


= \frac {\text {C o u p o n}}{(1 + \frac {\text {Y T M}}{2})} + \frac {\text {C o u p o n}}{(1 + \frac {\text {Y T M}}{2})}

= \frac {\text {C o u p o n}}{(1 + \frac {\text {Y T M}}{2})} + \dots + \frac {\text {C o u p o n} + \text {P r i n c i p a l}}{(1 + \frac {\text {Y T M}}{2})} + \dots


# Pricing with Spot Rates

No arbitrage price


= \frac {\text {C o u p o n}}{(1 + S _ {1})} + \frac {\text {C o u p o n}}{(1 + S _ {2}) ^ {2}}

= \frac {\text {C o u p o n}}{(1 + S _ {3}) ^ {2}} + \dots + \frac {\text {C o u p o n} + \text {P r i n c i p a l}}{(1 + S _ {n}) ^ {4}}


# Pricing with Forward Rates

Bond value


= \frac {\text {C o u p o n}}{1 + S _ {1}} + \frac {\text {C o u p o n}}{(1 + S _ {2}) \times (1 + 1 y 1 y)}

= \frac {\text {C o u p o n}}{(1 + S _ {1}) \times (1 + 1 y 1 y) \times (1 + 2 y 1 y)}


# Opti-Adjusted Price

Value of non-callable bond


= \text {Flat price of callable bond}

+ \text {value of embedded call option}


FI (2/6)
M
Mark Meldrum.com

# Yield Measures

## Current Yield


Current Yield = \frac{\text{annual cash coupon payment}}{\text{bond price}}


## Effective Annual Yield


EAF = (1 + \text{Periodic rate})^m - 1

m = \text{Number of Compounding Periods One Year}


## Conversion for Periodicity


\left(1 + \frac{\Delta PB}{m}\right)^m = \left(1 + \frac{\Delta PB}{n}\right)^n


# Money Market Instruments

**Money market yield**


= \left(\frac{\text{Face value} - \text{Price}}{\frac{\text{Price}}{360}}\right)

\times \left(\frac{\text{Price}}{\text{Days to maturity}}\right)


**Bond equivalent yield**


= \left(\frac{\text{Face value} - \text{Price}}{\frac{\text{Price}}{365}}\right)

\times \left(\frac{\text{Price}}{\text{Days to maturity}}\right)


**Discount basis yield**


= \left(\frac{\text{Face value} - \text{Price}}{\text{Face value}}\right) \times \left(\frac{\text{104}}{\text{Days to maturity}}\right)


# Yield Spreads

## G-Spread


G \text{ spread} = YTM_{\text{Corporate Bond}} - YTM_{\text{Government Bond}}


## I-Spread


I \text{ spread} = YTM_{\text{Corporate Bond}} - \text{Swap rate}


## Z-Spread


PV = \frac{PMT}{(1 + z_1 + Z)} + \frac{PMT}{(1 + z_2 + Z)^2} + \cdots + \frac{PMT + PV}{(1 + z_n + Z)^N}


FI (3/6)

# Option-Adjusted-Spread


OAS = Z \text{ spread} - \text{Option value (bps per year)}


# Securitization Parties

## Seller of the Collateral (Pool of Loans)

## Loan Servicer

## Special Purpose Entity (SPE)

# Asset-Backed Securities

Collateralized Debt Obligations (CDOs): MBS, Automotive Loans, Credit Card Loans

*can be tranched by credit risk and prepayment risk

**Prepayment Risk**: Contraction and Extension Risk

Pass through rate

= Mortgage rate on the underling pool of mortgages
- Servicing fee - Other fee

**Single Month Mortality Rate (SMM)**


= \frac{\text{Prepayment for the month}}{\text{Beginning Monthly Principal} - \text{Scheduled Principal Repayment}}


# Credit Risk Ratios

**Debt-Service-Coverage Ratio (DSCR)**


= \frac{\text{Net operating income}}{\text{Debt service}}


**Loan-to-Value ratio (LTV)**


= \frac{\text{Current mortgage amount}}{\text{Current appraised value}}


# Bond Return

**Total Return**


= \left(\frac{\text{Coupon \&amp; Reinvestment Income} + P_C}{P_C}\right)^1 - 1


# Duration

## Macaulay Duration


\text{MacDur} = \left(\frac{1 + r}{r} - \frac{1 + r + [N \times (c - r)]}{(c \times [(1 + r)^N - 1] + r)}\right) - \frac{r}{r}


FI (4/6)

# Modified Duration


\text{ModDur} = \frac{\text{MacDur}}{1 + YTM}

\text{Approximate ModDur} = \frac{V_c - V_1}{(2 \times V_0 \times \Delta YTM)}


# Effective Duration


\text{Effective duration} = \frac{V_c - V_1}{(2 \times V_0 \times \Delta \text{Curve})}


# Portfolio Duration

**Portfolio duration**


= w_1(D_1) + w_2(D_2) + w_3(D_3) - w_4(D_4)


# Money Duration

**Money Duration**


= \text{Annual Modified Duration} \times PV^{\text{Full}}

\Delta PV^{\text{Full}} = -\text{Money Duration} \times \Delta \text{Field}


**Duration gap**


= \text{Macaulay duration} - \text{Investment horizon}


# Price Value of a Basis Point


PVBF = \frac{V_c - V_1}{3}


# Convexity


\text{Approximate Effective Convexity} = \frac{V_c + V_2 - 2 \times V_0}{(\Delta YTM)^2 \times V_0}

\text{Effective Convexity} = \frac{V_c + V_2 - 2 \times V_0}{(\Delta \text{curve})^2 \times V_0}


# Price Change Estimate


\Delta \text{Price} = -\text{annual ModDur} \times (\Delta \text{Field})

+ \frac{1}{2} \times \text{annual convexity} \times (\Delta \text{Field})^2


# Expected Loss


\text{Expected loss} = \text{Default probability} \times (1 - \text{recovery rate})


FI (5/6)
M
Mark Meldrum.com

# Loss Given Default (LGD)
Loss Given Default (LGD) = (1 - recovery rate)

## Four C's of Credit
- Capacity
- Collateral
- Covenants
- Character

## Derivatives
### Exchange Traded vs OTC Derivatives
- Exchange Traded
- Public
- Standardized
- Regulated
- No counterparty risk

### OTC Derivatives
- Private
- Customizable
- Lower regulation
- Counterparty Risk

### Option Payoff
- Call Option
- Expiration Value (Long)

c_T = \text{Max}(0, S_T - X)

- Profit (Long)

11 = c_T - c_0

- Expiration Value (Short)

- c_T = - \text{Max}(0, S_T - X)

- Profit (Short)

11 = - c_T + c_0


# Put Option
- Expiration Value (Long)

p_T = \text{Max}(0, X - S_T)


- Profit (Long)

11 = p_T - p_0


- Expiration Value (Short)

- p_T = - \text{Max}(0, X - S_T)


- Profit (Short)

11 = - p_T + p_0


- European Option: Only exercisable at maturity
- American Option: Can be exercised at any time; Can't be priced less than European options

## Future/Forward Payoff

\text{Long Payoff} = S_T - F_0(T)

\text{Short Payoff} = F_0(T) - S_T


## Interest Rate Swaps
Can be viewed as series of Forward Rate Agreements to lend/borrow at a future date. Helpful for transforming the nature of debt.

## Forward Price

F_0(T) = S_0(1 + r)^T

F_0(T) = (S_0 - 1 + C)(1 + r)^T

F_0(T) = S_0(1 + r)^T - (1 - C)(1 + r)^T

$I$ = present value of benefits
$C$ = present value of costs

# Value of Forward

V_1(T) = S_T - F_0(T)(1 + r)^{-(T-t)}

V_1(T) = (S_1 - 1 + C) - F_0(T)(1 + r)^{-(T-t)}

V_1(T) = S_T + C - 1 - \frac{F_0(T)}{(1 + R_1)^{T-t}}


# Option Value Factors
Option Value = Time Value + Intrinsic Value

- Increase in:
- Stock Price: (C ↑); (P ↓)
- Exercise Price: (C ↓); (P ↑)
- Time to Expiration: (C ↑); (P ↑)
- Volatility: (C ↑); (P ↑)
- Risk-Free-Rate: (C ↑); (P ↓)

# Put-Call Parity

S_0 + p_0 = c_0 + \frac{X}{(1 + r)^T}

*can be rearranged*

# Options Strategies
- Protective Put: Long Underlying, Long Put
- Covered Call: Long Underlying, Short Call
- Fiduciary Call: Long Call, Long Risk-Free Bond

# Binomial Option Model

c_0 = \frac{\pi c^* + (1 - \pi)c^*}{1 + r}

\pi = \frac{1 + r - d}{u - d}


# Hedge Ratio

n = \frac{c^* - c^*}{S^* - S^*}


FI (6/6) DER (1/3)
DER (2/3)
DER (3/3)
Mark Meldrum.com

# Alternative Investments

## Hedge Funds

Equity Hedge: Market Neutral, Fundamental Growth, Fundamental Value, Quantitative Directional, Short Bias, Sector Specific

Event-Driven: Merger Arbitrage, Distressed/Restructuring, Activist, Special Situations

Relative Value: FI Convertible Arbitrage, FI Asset Backed, FI General, Volatility, Multi-Strategy

## Macro

Fee Structure: Typically, 2 and 20; 2% of AUM and 20% of Profits

## Private Equity

Leveraged Buyouts (LBOs): substantial use of leverage to take companies private

LBO Target Characteristics: Strong and Sustainable Cash Flows; Depressed Prices; Inefficient Companies

Venture Capital: Characterized by stage of company of interest

1. Formative-stage financing: a) Angel Investing b) Seed-Stage c) Early-Stage
2. Later-stage financing
3. Mezzanine-stage financing

Exit Strategies: Trade Sale, IPO, Recapitalization, Secondary Sales, Write-Off/Liquidation

Valuation Methods: market or comparables, discounted cash flow (DCF) and asset-based

## Real Estate

Private Debt (Mortgages, Construction Lending)

Public Debt (MBS, CMOs)

Private Equity (Direct/Indirect Ownership)

Public Equity (REITs, Real Estate Development Companies)

Valuation Approaches: Comparable Sales, Income, Cost

## Commodities

Precious Metals

Base Metals

Energy Products

Agricultural Products

Managed Futures: actively managed investment funds

Futures price = Spot price (1 + r) + Storage costs - Convenience yield

Return Sources: Roll Yield, Collateral Yield, Changes in Spot Price

## Infrastructure

Long lived and capital intensive. These assets are intended for public use, as they provide essential services.

## Fee Calculations

Management Fee = Assets under management × % Management fee

Incentive Fee = Gains net of management fee × % Incentive fee

Hurdle Rate: Rate above which incentive fees are paid. Hard hurdle rate: fees only apply to returns that exceed the hurdle rate. Soft hurdle rate: fees apply to the entire return.

High Water Mark: Highest cumulative return used to calculate incentive fees

ALT (1/2)

ALT (2/2)
