---
title: "CH-1-Quantitative Methods-Answers"
source_pdf: "CH-1-Quantitative_Methods-Answers.pdf"
converter: "mistral-ocr-latest"
date_converted: "2026-05-07T00:28:06Z"
pages: 310
category: "level-1/notes"
sanitized: true
reviewed: false
---
1

Level I of the CFA® 2025 Exam

Questions with Answers - Quantitative Methods

Offered by AnalystPrep

Last Updated: Aug 1, 2024

©2024 AnalystPrep "This document is protected by International copyright laws. Reproduction and/or distribution of this document is prohibited. Infringers will be prosecuted in their local jurisdictions."
# Table of Contents

1 - Rate and Return 3
2 - The Time Value of Money in Finance 75
3 - Statistical Measures of Asset Returns 111
4 - Probability Trees and Conditional Expectations 112
5 - Portfolio Mathematics 167
6 - Simulation Methods 168
7 - Estimation and Inference 183
8 - Hypothesis Testing 204
9 - Parametric and Non Parametric Tests of Independence 264
10 - Simple Linear Regression 304
11 - Introduction to Big Data Techniques 305

© 2014-2024 AnalystPrep.
# Learning Module 1: Rate and Return

Q.13 A bank offers you a Certificate of Deposit (CD) with a three-year maturity with a stated annual interest rate of 8% compounded quarterly and allows you to reinvest the interests at the same rate. The worth of the CD at maturity if you invest $150,000 now is closest to:

A. $188,956.80
B. $189,797.85
C. $190,236.27

The correct answer is C.

The question requires the calculation of the Future Value of a lump sum with quarterly compounding as follows;


\mathrm{FV_N} = \mathrm{PV}\left[1 + \frac{\mathrm{r_s}}{\mathrm{m}}\right]^{\mathrm{mN}}


Where;

PV = Present value of the investment.
rs = Annual interest rate.
m = Quarterly compounding annually.
mN = Total compounding for the investment period (4 x 3 years = 12 quarters)

Therefore;


\mathrm{FV_N} = \$150,000\left[1 + \frac{0.08}{4}\right]^{12} = \$150,000 \times 1.268 = \$190,236.27


A is incorrect. The amount represents the future value with annual and not with quarterly compounding as follows;


\mathrm{FV_N} = \$150,000(1 + 0.08)^3 = \$188,956.80


B is incorrect. The amount represents the future value with half-yearly compounding and not with quarterly compounding as follows;


\mathrm{FV_N} = \$150,000\left[1 + \frac{0.08}{2}\right]^{3 \times 2} = \$150,000 \times 1.265 = \$189,797.85


© 2014-2024 AnalystPrep.
CFA Level I, Quantitative Methods, Learning Module 1: Rate and Return. LOS (d): Calculate and interpret annualized return measures and continuously compounded returns and describe their appropriate uses.

Q.15 Spire Bank offers to pay an investor a 10% interest payment compounded monthly. If interest payments are reinvested at 10%, the investor's future value if the initial investment is $2,000,000 for one year is closest to:

A. $2,200,000
B. $2,205,000
C. $2,209,426

The correct answer is C.

The question requires the calculation of the Future Value of a lump sum with monthly Compounding as follows;


\mathrm{FV_N} = \mathrm{PV} \left[ 1 + \frac{\mathrm{r}}{\mathrm{m}} \right]^{\mathrm{mN}}


Where;

PV = Initial investment amount.

r = Interest rate compounded monthly.

m = Interest periods.

N = Investment period.

Therefore;


\mathrm{FV_N} = \$2,000,000 \left[ 1 + \frac{0.1}{12} \right]^{12 \times 1} = \$2,000,000 \times 1.105 = \$2,209,426.14


Using the financial calculator:

PV=-2,000,000; I/Y=10/12=0.83; N=1×12=12; PMT=0; CPT =&gt; FV = 2,209,426.14

A is incorrect. The amount represents the future value compounded annually instead of monthly as follows;


\mathrm{FV_N} = \$2,000,000 (1 + 0.1)^1 = \$2,200,000.00


© 2014-2024 AnalystPrep.
B is incorrect. The amount represents the future value compounded bi-annually instead of monthly as follows;


\mathrm{FV_N} = \$2,000,000[1 + \frac{0.1}{2}]^{1 \times 2} = \$2,000,000 \times 1.103 = \$2,205,000.00


CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses

Q.24 An investment asset offers to pay a 13% interest compounded quarterly with a maturity of 3 years. In addition, the investor has the right to reinvest the interests at the same rate of 13%. If an investor currently invests $400,000, the worth of the investment asset at maturity is closest to.

A. USD 577,158.80
B. USD 583,656.92
C. USD 587,138.71

The correct answer is C.

The question requires the calculation of the Future Value of a lump sum with quarterly compounding as follows;


\mathrm{FV_N} = \mathrm{PV}[1 + \frac{\mathrm{r_s}}{\mathrm{m}}]^{\mathrm{mN}}


Where;

- rs - Quarterly compound interest
- m - Annual compounding periods
- N - Investment maturity period

Therefore;


\mathrm{FV_N} = \$400,000[1 + \frac{0.13}{4}]^{(4 \times 3)} = \$400,000 \times 1.468 = \$587,138.71


Using the BA II Plus Pro Calculator: N=3×4 =12; I/Y=13/4 =3.25; PMT=0; PV = -$400,000; CPT=&gt;FV = $587,138.71

© 2014-2024 AnalystPrep.
A is incorrect. The amount represents the future value assuming annual compounding as opposed to quarterly compounding as follows;


\mathrm{FV_N} = \$400,000(1 + 0.13)^3 = \$577,158.80


B is incorrect. The amount represents the future value assuming bi-annual compounding as opposed to quarterly compounding as follows;


\mathrm{FV_N} = \$400,000\left[1 + \frac{0.13}{2}\right]^{2 \times 3} = \$400,000 \times 1.459 = \$583,656.92


CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses

© 2014-2024 AnalystPrep.
Q.26 An investor wants to invest $600,000 in an asset paying a 5% interest compounded continuously for four years. The value of the investment in 4 years is closest to:

A. $729,303.75
B. $732,831.62
C. $732,841.65

The correct answer is C.

The question requires the calculation of the Future Value of a lump sum with continuous compounding as follows;


\mathrm{FV_N} = \mathrm{PV e^{\mathrm{n} N}}


Where;

PV = Initial investment.

e = Transcendental number e ≈ 2.7182818

$r_s$ = Interest rate.

N = Investment period.

Therefore;


\mathrm{FV_N} = \$600,000 \times e^{(0.05 \times 4)} = \$732,841.65


Note that the Plus Pro- Calculator is not applicable when calculating continuously compounded interest.

A is incorrect. The amount represents the FutureValue after 4four years, assuming annual and not continuous compounding as follows;


\mathrm{FV} = \$600,000(1 + 0.05)^4 = \$600,000 \times 1.216 = \$729,303.75


B is incorrect. The amount represents the Future Value after four years, assuming daily and not continuous compounding as follows;


\mathrm{FV} = \$600,000\left[1 + \frac{0.05}{365}\right]^{(365 \times 4)} = \$600,000 \times 1.221 = \$732,831.62


CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded

© 2014-2024 AnalystPrep.
returns, and describe their appropriate uses

Q.45 Consider an investment with a stated annual interest rate of 11%. The effective interest rate (EAR) using quarterly compounding for this investment is closest to:

A. 2.75%
B. 11.00%
C. 11.50%.

The correct answer is C.

It's important to note that the stated annual interest rate does not give a future value directly. We, therefore, need a formula for the EAR as follows;


\mathrm{EAR} = (1 + \text{periodic interest rate})^{\mathrm{m}} - 1


Where;

The periodic interest rate is the stated annual interest rate divided by m, where m is the number of compounding periods in one year as follows;


\text{Periodic interest rate} = \frac{11}{4} = 2.75


Therefore;


\mathrm{EAR} = (1 + 0.0275)^{4} - 1 = 0.115 \text{ or } 11.50


A is incorrect. The indicated rate depicts the periodic interest rate and not the EAR as required in the question.

B is incorrect. It assumes that the annual interest rate is equal to the EAR, which is not the case.

CFA Level I, Quantitative Methods, Learning Module 1: Rate and Return. LOS (d): Calculate and interpret annualized return measures and continuously compounded returns and describe their appropriate uses.

© 2014-2024 AnalystPrep.
Q.128 An asset manager's portfolio had the following annual rates of return:

2012: +8%
2013: +6%
2014: -2%

What is the holding period return for this portfolio?

A. 3.91%
B. 4%
C. 12.19%

The correct answer is C.

The holding period return (HPR) for a portfolio over multiple periods can be calculated by multiplying the individual period returns together and then subtracting 1. This approach takes into account the compounding effect of the returns over time. For the given portfolio, the calculation of HPR over the three years is as follows:


\mathrm{HPR} = \left[ \left(1 + \mathrm{R}_1\right) \times \left(1 + \mathrm{R}_2\right) \times \left(1 + \mathrm{R}_3\right) \right] - 1

\mathrm{HPR} = (1 + 0.08) \times (1 + 0.06) \times (1 - 0.02) - 1 = 12.19


A is incorrect. The option suggesting a 3.91% return does not correctly apply the compounding effect of the annual returns over the three years.

B is incorrect. A 4% return might be an oversimplified interpretation of the portfolio's performance, possibly an average of the annual returns without considering the negative impact of the -2% return in 2014 and the compounding effect over the years. This calculation fails to accurately reflect the cumulative impact of the annual returns on the portfolio's overall performance.

CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (b) Calculate and interpret different approaches to return measurement over time and describe their appropriate uses.

© 2014-2024 AnalystPrep.
Q.219 You expect XYZ's stock to have a price of USD 142 at the end of the year. Also, you expect to receive a dividend of USD 4. How much will you pay for a stock today in order to realize a return on investment of 11%?

A. USD 144.60
B. USD 122.80
C. USD 131.50

The correct answer is C.

Let P be the price you are willing to pay today.


\mathrm{HPR} = \frac{(142 - \mathrm{P} + 4)}{\mathrm{P}} = 0.11

142 - \mathrm{P} + 4 = 0.11\mathrm{P}

146 = 1.11\mathrm{P}

\mathrm{P} = 131.5


A is incorrect. The calculation for option A does not correctly apply the formula for determining the price to pay today to achieve the desired return on investment. It seems to ignore the dividend and does not correctly account for the 11% desired return.

B is incorrect. The calculation for option B likely results from a misunderstanding of the relationship between the future price, the dividend, and the desired return on investment.

CFA Level 1, Portfolio Management, Learning Module 1: Portfolio Risk and Return: Part I, LOS (a) Describe characteristics of the major asset classes that investors consider in forming portfolios.

© 2014-2024 AnalystPrep.
Q.221 An investor buys 4 shares of UUA stock at $44. During the year, the company pays a $3 special dividend per share. Then, at the end of the first year, the investor buys 5 more shares at $46. Lastly, at the end of the second year, he sold all the shares for $57. If there was no dividend during the second year, what is the time-weighted rate of return of this investment?

A. 11.4%
B. 15.2%
C. 17.4%

The correct answer is C.


\mathrm{HPR}(\text{first year}) = \frac{(46 - 44 + 3)}{44} = 0.1136

\mathrm{HPR}(\text{second year}) = \frac{(57 - 46)}{46} = 0.2391


Time-weighted return = $((1 + 0.1136) \times (1 + 0.2391))^{1/2} - 1 = 0.174$ or $17.4\%$

A is incorrect. An 11.4% return would suggest only considering the first year's performance without properly accounting for the compounding effect over the two years.

B is incorrect. A 15.2% return underestimates the combined effect of the first year's dividend and the second year's capital gain. It does not accurately reflect the geometric linking of the two periods' returns as required by the TWR calculation.

CFA Level 1, Portfolio Management, Learning Module 1: Portfolio Risk and Return: Part I, LOS (a) Describe characteristics of the major asset classes that investors consider in forming portfolios.

© 2014-2024 AnalystPrep.
Q.397 For an investment of ¥10,000, an institution promises to pay you a lump sum 10 years from now at a 6 % annual interest rate. The future amount you can expect if the interest is compounded monthly is closest to:

A. ¥17,908.48
B. ¥18,193.97
C. ¥18,220.29

The correct answer is B.

The future value is determined using the following formula;


\mathrm{FV_N} = \mathrm{PV}(1 + r)^N


Where;

PV = Present value of the investment.
r = Interest rate compounded monthly.
N = Monthly investment period.

Therefore;


\mathrm{FV_N} = \frac{\text{¥10,000}}{12} \times \frac{10 \times 10^1}{12} = \text{¥18,193.97}


A is incorrect. It represents the future value of the investment but with annual compounding as follows;


\mathrm{FV_N} = \frac{\text{¥10,000}}{12} \times \frac{10 \times 10^1}{12} = \text{¥17,908.48}


C is incorrect. It represents the future value of the investment but with daily compounding as follows;


\mathrm{FV_N} = \frac{\text{¥10,000}}{12} \times \frac{10 \times 10^1}{12} = \text{¥18,220.29}


CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses.

© 2014-2024 AnalystPrep.
Q.399 Chris Wright wants to save money to travel around the world. He decides to save $30,000 for a year in a bank, and the bank offers to pay him 9% compounded monthly. The future value of Mr. Wright's investment if interest payments are reinvested at 9% is closest to:

A. USD 32,700.00
B. USD 32,792.50
C. USD 32,814.21

The correct answer is C.

The question requires the calculation of the Future Value of a lump sum with monthly Compounding as follows;


\mathrm{FV_N} = \mathrm{PV} \left[ 1 + \frac{\mathrm{r_s}}{\mathrm{m}} \right]^{\mathrm{mN}} = \$30,000 \left[ 1 + \frac{0.09}{12} \right]^{12 \times 1} = \$32,814.21


Where;

PV = Present value of the investment.

$\mathrm{r_s} =$ Annual interest rate.

$\mathrm{m} =$ Monthly compounding.

$\mathrm{N} =$ Investment period.

A is incorrect. The amount represents 9% with annual compounding as follows;


\mathrm{FV_N} = \$30,000 (1.09) = \$32,700.00


B is incorrect. The amount represents 9% with quarterly compounding as follows;


\mathrm{FV_N} = \$30,000 \left[ 1 + \frac{0.09}{4} \right]^{4 \times 1} = \$32,792.50


© 2014-2024 AnalystPrep.
Q.404 An 8% annual-coupon bond was purchased for $1,000. Exactly one year later, the bond was sold for $975. What is the investor's holding period yield if the face value of the bond is $1,000?

A. -2.5%
B. 5.5%
C. 8%

The correct answer is B.

The holding period return is defined as:


R = \frac{(P_1 - P_0) + I_1}{P_0} = \frac{(975 - 1000) + 80}{1000} = 0.055 = 5.5\%


## Alternative explanation:

To calculate the holding period yield, we need to first calculate the total dollar return on the investment. To do this, we take the difference between the selling price and the purchase price and add any coupon payments received during the holding period. In this case, the investor received an annual coupon payment of $8\% \times \$1,000$ face value = $80$, so the total dollar return was $80 + ($975 - $1,000) = $55$.

The holding period yield is then calculated by dividing the total dollar return by the purchase price, and expressing the result as a percentage. In this case, the holding period yield is $\frac{\$55}{\$1,000} = 5.5\%$.

A is incorrect. This option suggests a holding period yield of $-2.5\%$, which would imply a loss on the investment. However, when considering both the capital loss of $25$ and the coupon payment of $80$, the overall return is positive, not negative.

C is incorrect. This option suggests a holding period yield of $8\%$, which corresponds to the annual coupon rate of the bond but does not account for the capital loss incurred from selling the bond at a lower price than it was purchased. The holding period yield must reflect both the income from coupon payments and the capital gain or loss on the bond, which is not the case with an $8\%$ yield in this scenario.

© 2014-2024 AnalystPrep.
Q.770 Rick Hassler earned the following annual rates of return by holding shares of XYZ Inc. for a period of five years:

| Year | Return (%) |
| --- | --- |
| 2011 | 13 |
| 2012 | 19 |
| 2013 | -11 |
| 2014 | 25 |
| 2015 | 30 |

The share's holding period return over the five-year period is closest to:

A. 94%.
B. 21%.
C. 14%.

The correct answer is A.


\mathrm{HPR} = (1 + 0.13) \times (1 + 0.19) \times (1 - 0.11) \times (1 + 0.25) \times (1 + 0.30) - 1 = 0.94 \text{ or } 94\%


The holding period return (HPR) is the return on an asset or portfolio over the whole period during which it was held. It is one of the simplest and most important measures of investment performance.

**B is incorrect.** The option suggesting a 21% return does not accurately reflect the compounded annual growth rate (CAGR) or the overall HPR for the investment. It might represent an average or simple mean of the annual returns, but this method does not account for the compounding of returns, which is crucial for calculating the total return over multiple periods.

**C is incorrect.** Suggesting a 14% return significantly underestimates the actual compounded return over the five-year period. This figure might represent a misunderstanding of how to calculate the HPR or a miscalculation that fails to account for the compounding of annual returns, especially the recovery and significant growth following the negative return year.

© 2014-2024 AnalystPrep.
Q.1303 A stock returned 2%, 9%, -3%, 13%, and x over five years. If the arithmetic mean return over the five years is 2.8%, then the fifth year return is closest to:

A. 10%.
B. 21%.
C. -7%.

The correct answer is C.

To find the fifth year return, x, we use the formula for the arithmetic mean return over the five years. The arithmetic mean return is given by the sum of the annual returns divided by the number of years. Therefore, we have:


\frac{(2\% + 9\% - 3\% + 13\% + x)}{5} = 2.8\%

(2\% + 9\% - 3\% + 13\% + x) = 14\%

x = 14\% - 2\% - 9\% + 3\% - 13\% = -7\%


A is incorrect. Suggesting a fifth year return of 10% does not align with the arithmetic mean calculation. Using a 10% return for the fifth year would result in an arithmetic mean that is higher than 2.8%, which contradicts the given condition.

B is incorrect. Proposing a fifth year return of 21% significantly deviates from the required arithmetic mean of 2.8%. Incorporating a 21% return for the fifth year would substantially increase the average beyond the specified mean, demonstrating a misunderstanding of how the arithmetic mean is calculated in this context.

CFA Level I, Portfolio Management, Learning Module 1: Portfolio Risk &amp; Return: Part I. LOS (d): Calculate and interpret the mean, variance, and covariance (or correlation) of asset returns based on historical data.

© 2014-2024 AnalystPrep.
Q.1305 Calculate the geometric mean of a fund that returned -22%, 18%, 9%, 6% and -2% in 5 years.

A. 0.83%
B. 6%
C. 18%

The correct answer is A.


\text{Geometric mean} = ((0.78)(1.18)(1.09)(1.06)(0.98))^{1/5} - 1 = 0.83\%


B is incorrect. Calculating a simple average of the returns or misunderstanding the formula for geometric mean could lead to an incorrect answer such as 6%. This does not accurately reflect the compounded growth rate of the investment over the period.

C is incorrect. An answer of 18% significantly overestimates the performance of the fund.

© 2014-2024 AnalystPrep.
Q.1317 An investment grows in value from $1000 to $1352. However, the investor had invested $500 of his money and the remaining $500 was borrowed money. Assuming no interest, the return on the leveraged position is closest to:

A. 70%.
B. 35%.
C. 105%.

The correct answer is A.

If the entire $1000 was the investor's money, then it is an unleveraged position, and the investor's returns would be:


R = \frac{(1,352 - 1,000)}{1,000} = 35.2\%


Since the investor had invested $500 of his money and the remaining $500 was borrowed money, this is a leveraged position. Assuming no interest cost, the return on the leveraged position is:


R = \frac{(1,352 - 1,000)}{500} = 70.4\%


B is incorrect. The 35% return would be accurate if the investment was not leveraged, meaning if the entire $1000 was the investor's own money. This calculation reflects the simple gain on the total investment without considering the effects of leverage. It's a common mistake to overlook the impact of borrowing on the return calculations, which significantly alters the outcome in scenarios involving leveraged investments.

C is incorrect. A return of 105% would imply an even greater amplification of the investment's performance than what is actually achieved through the leverage used in this scenario. This option might result from a misunderstanding of how leverage impacts returns or a miscalculation involving the proportion of borrowed funds to own funds. It's essential to accurately calculate the return on the equity portion of a leveraged investment to understand the true impact of leverage on investment performance.

© 2014-2024 AnalystPrep.
Q.1318 A portfolio return which is calculated after deducting fees from its return is called:

A. Gross return.
B. Net return.
C. Geometric return.

The correct answer is B.

Net return is calculated after deducting management fees. This is because net return takes into account all costs associated with managing and operating the investment, including management fees, performance fees, and other expenses. By deducting these fees, the net return provides a more accurate reflection of the actual return the investor receives. It is an essential measure for investors to consider, as it shows the real performance of their investment after all costs have been accounted for.

A is incorrect. Gross return refers to the total return on an investment before any fees, expenses, or taxes are deducted. It represents the raw earnings of the portfolio without considering the costs that affect the investor's actual gains. While gross return can be useful for comparing the performance of different investments without the variable of differing fee structures, it does not provide a realistic view of what the investor will ultimately receive.

C is incorrect. Geometric return, also known as the compound annual growth rate (CAGR), is a different concept altogether. It measures the average rate of return of an investment over a specified time period, assuming the investment has been compounding over that time. The geometric return is useful for comparing the performance of investments over time, taking into account the effect of compounding. However, it does not specifically refer to the deduction of fees or expenses from the return.

CFA Level I, Portfolio Management, Learning Module 1: Portfolio Risk &amp; Return: Part I. LOS (g): Describe and interpret the minimum-variance and efficient frontiers of risky assets and the global minimum-variance portfolio.

© 2014-2024 AnalystPrep.
Q.1319 A 3-year fund returned -3%, 6% and 8% respectively. The geometric mean for this fund is closest to:

A. 3.55%.
B. 4%.
C. 2.78%.

The correct answer is A.


\text{Geometric mean} = ((0.97)(1.06)(1.08))^{(1/3)} - 1 = 3.55\%


B is incorrect. It suggests the geometric mean is 4%, which overestimates the compounded effect of the given returns. The calculation of the geometric mean takes into account the negative return in the first year, which impacts the overall growth rate of the investment.

C is incorrect. It suggests the geometric mean is 2.78%, which underestimates the compounded growth of the investment. This might result from a miscalculation or misunderstanding of how the geometric mean accounts for the sequence of returns, especially the recovery and growth in the subsequent years after a negative return. The geometric mean accurately reflects the rate at which the investment has grown on average per year, taking into account the effect of compounding, which is not as low as 2.78% in this case.

CFA Level I, Portfolio Management, Learning Module 1: Portfolio Risk &amp; Return: Part I. LOS (d): Calculate and interpret the mean, variance, and covariance (or correlation) of asset returns based on historical data.

© 2014-2024 AnalystPrep.
Q.1320 An investor holds a stock that has been quite volatile over the past few years. The geometric mean return value will most likely be:

A. Higher than the arithmetic mean return value.
B. Lower than the arithmetic mean return value.
C. The same as the arithmetic mean return value.

The correct answer is B.

The geometric mean return value will be less than the arithmetic mean return value if the returns have varied significantly from year to year. This is because the arithmetic mean tends to overstate the actual average return by a greater and greater amount the more the inputs vary.

A is incorrect. The arithmetic mean simply calculates the average of returns without considering the compounding effect, which can lead to an overestimation of the actual performance of an investment. In scenarios where there is significant volatility, the arithmetic mean does not accurately reflect the impact of negative returns, which can be mitigated in the geometric mean through its multiplicative process.

C is incorrect. The geometric mean accounts for the compounding effect and the sequence of returns, which can significantly affect the investment's growth over time. Therefore, for volatile investments, the geometric mean provides a more accurate and often more conservative measure of average return.

© 2014-2024 AnalystPrep.
Q.1322 Which of the following is used to measure the return on an investment over a specific period?

A. Holding period return
B. Geometric mean
C. Arithmetic mean

The correct answer is A.

HPR is used to calculate the return over a specific period.

Arithmetic and geometric means are used to calculate the returns over many periods.

B is incorrect. The arithmetic mean is a simple average of returns over multiple periods and does not accurately reflect the compounding effects or the variability of returns over time. It is calculated by summing the returns for each period and dividing by the number of periods. While useful for estimating average returns, it does not provide a precise measure of the actual return realized over a specific investment period.

C is incorrect. The geometric mean, on the other hand, is a better measure for calculating the average rate of return per period on an investment that is compounded over multiple periods. It accounts for the compounding effect by taking the nth root (where n is the number of periods) of the product of (1 + return for each period), minus one. This method ensures that the sequence of returns is accurately reflected in the average, making it more suitable for evaluating the performance of an investment over multiple periods. However, it does not specifically measure the return over a single, specific period like the HPR does.

© 2014-2024 AnalystPrep.
Q.1324 Janet Taylor purchased a single share of AMC Corp for $30 at t=0. She bought an additional unit for $42 at t=1. If at t=2 she sold both shares for $55 each, the money-weighted return of the investment is closest to:

A. 33.88%.
B. 31.78%.
C. 29.45%.

The correct answer is A.

The money-weighted rate of return (MWRR) refers to the internal rate of return on a portfolio. It is the rate of discount, r, at which:

PV of cash outflows = PV of cash inflows

The money-weighted rate of return on a fund satisfies the equation of value by taking into account the initial and final fund values, as well as the intermediate cash flows. When dealing with an investment portfolio, cash inflows comprise of: The beginning value, dividends /interest reinvested, withdrawals made. Cash outflows, on the other hand, refer to; the final value of the fund, dividends/interest received, contributions.

Since the money-weighted rate of return is equivalent to the internal rate of return (IRR), the best way to solve this problem is by using the financial calculator with the following inputs:

CF1=30; CF2=42; CF3=-110; CPT -&gt; IRR = 33.88%

B is incorrect. A MWRR of 31.78% does not accurately reflect the internal rate of return for the given cash flows. This value might result from a miscalculation or misunderstanding of the cash flows' timing and amounts.

C is incorrect. A MWRR of 29.45% significantly underestimates the actual return on Janet Taylor's investment.

© 2014-2024 AnalystPrep.
Q.1325 What is the exact real return of an investment which earned a yearly nominal return of 11% if the inflation during the same period was 4%?

A. 7%
B. 9.34%
C. 6.73%

The correct answer is C.


\text{Real return} = \frac{(1 + \text{Nominal return})}{(1 + \text{Inflation})} - 1

\text{Real return} = \frac{(1 + 0.11)}{(1 + 0.04)} - 1 = 6.73\%


A is incorrect. Suggesting a real return of 7% overlooks the impact of inflation on the nominal return. Simply subtracting the inflation rate from the nominal return, a common mistake, does not accurately account for how inflation erodes the purchasing power of the returns.

B is incorrect. Indicating a real return of 9.34% significantly overestimates the effect of adjusting the nominal return for inflation.

© 2014-2024 AnalystPrep.
Q.2670 Jane Sonam is a value investor who recently started investing in tech companies. As her financial adviser, you are given a task to calculate the money-weighted return of her investments in Solar Inc. In the beginning, Jane Sonam purchases 10 shares of Solar Inc. at $110. One year later, she purchased an additional 5 shares at $120. Assuming that the stock paid a dividend of $2 per share each year, calculate the money-weighted return if she sold all 15 shares for $122 at the end of the second year.

A. 6.31%
B. 10.58
C. 12.35%

The correct answer is A.

The money-weighted return of the portfolio can be calculated using the Cash Flow function of the financial calculator.

As presented in the following table, the money-weighted return or IRR is: CF0 = -1,100, CF1 = -580, CF2 = 1,860, CPT=&gt;IRR = 6.31%

| Time | Share Value | Dividend | Net Cash Flow |
| --- | --- | --- | --- |
| Year 0 | 10 × -$110 = $1,100 | 0 | -$1,100 |
| Year 1 | 5 × -$120 | 10 × $2 = $20 | -$580 |
| Year 2 | 15 × $122 = $1,830 | 15 × $2 = $30 | $1,860 |

B is incorrect. The figure 10.58% does not accurately reflect the money-weighted return of Jane's investment based on the given cash flows. This option may result from a miscalculation or misunderstanding of the money-weighted return concept, which requires accurately accounting for the timing and amount of each cash flow.

C is incorrect. The figure 12.35% also does not match the calculated money-weighted return of 6.31%. The money-weighted return must be precisely calculated using the actual cash flows associated with the investment, including the cost of buying shares, dividend payments, and the proceeds from selling shares.

CFA Level I, Portfolio Management, Learning Module 1: Portfolio Risk &amp; Return: Part I. LOS (g): Describe and interpret the minimum-variance and efficient frontiers of risky assets and the global minimum-variance portfolio.

Q.2673 A university endowment fund invests in emerging market economies to fund its research and development projects. The value of the fund's assets is provided in the following table. Assuming all cash flows occur at the beginning of the year, the time-weighted return of the fund is closest to:

© 2014-2024 AnalystPrep.
| | Year 1 | Year 2 | Year 3 | Year 4 |
| --- | --- | --- | --- | --- |
| Beginning Value | $7,945,600 | $10,750,200 | $12,000,000 | $9,995,000 |
| Additional Inflow (Outflow) | $1,200,000 | $850,000 | ($1,750,000) | $1,100,000 |
| Ending Market Value | $10,750,200 | $12,000,000 | $9,995,000 | $10,090,000 |

A. $7.7\%$ .
B. $5.4\%$ .
C. $1.9\%$ .

The correct answer is C.

To compute the annualized time-weighted return for the year, we first compute each year's holding period return:


\mathrm {H P R} _ {\mathrm {t}} = \frac {\mathrm {M V E} _ {\mathrm {t}} - \mathrm {M V B} _ {\mathrm {t}}}{\mathrm {M V B} _ {\mathrm {t}}}


Where $\mathrm{MVB_t}$ and $\mathrm{MVE_t}$ are the market values at the beginning and end of year t, respectively.

| | Year 1 | Year 2 | Year 3 | Year 4 |
| --- | --- | --- | --- | --- |
| Beginning Value | $7,945,600 | $10,750,200 | $12,000,000 | $9,995,000 |
| Additional Inflow (Outflow) | $1,200,000 | $850,000 | ($1,750,000) | $1,100,000 |
| Total Beginning Value | $9,145,600 | $11,600,200 | $10,250,000 | $11,095,000 |
| Ending Market Value | $10,750,200 | $12,000,000 | $9,995,000 | $10,090,000 |
| HPR + 1 | 1.175 | 1.034 | 0.975 | 0.909 |


\begin{array}{l} r _ {t w} = \left[ \left(1 + H P R _ {1}\right) \times \left(1 + H P R _ {2}\right) \times \left(1 + H P R _ {3}\right) \times \dots \times \left(1 + H P R _ {N}\right) \right] _ {N} ^ {\frac {1}{2}} - 1 \\ r _ {b w} = (1. 1 7 5 \times 1. 0 3 4 \times 0. 9 7 5 \times 0. 9 0 9) ^ {\frac {1}{4}} - 1 = 0. 0 1 8 6 \cong 1. 9 \% \\ \end{array}


A is incorrect. A TWR of $7.7\%$ would suggest a significantly higher performance of the fund over the period than what is calculated using the time-weighted return method. This option likely does not account for the geometric linking of sub-period returns or misinterprets the effect of cash flows on the fund's performance.

B is incorrect. A TWR of $5.4\%$ also does not accurately reflect the fund's performance as calculated using the correct method for time-weighted returns.

CFA Level I, Portfolio Management, Learning Module 1: Portfolio Risk &amp; Return: Part I. LOS (g): Describe and interpret the minimum-variance and efficient frontiers of risky assets and the global minimum-variance portfolio.

© 2014-2024 AnalystPrep.
Q.2674 An investor purchased 1,000 shares of Indian Transport Co. for INR 33.23 per share and received a dividend of INR 0.41 per share. Assuming that the investor sold the shares for INR 33.92, calculate the Holding Period Return (HPR) of the investment.

A. 1.04%
B. 3.31%
C. 10.33%

The correct answer is B.


\mathrm{HPR} = \frac{(\text{Ending Value} + \text{Dividend} - \text{Beginning Value})}{\text{Beginning Value}}

\mathrm{HPR} = \frac{(33,920 + 410 - 33,230)}{33,230} = 3.31\%


A is incorrect. The option suggesting an HPR of 1.04% does not correctly account for the dividend received in addition to the capital gain. This underestimation overlooks the dividend's contribution to the total return, leading to an inaccurate calculation of HPR.

C is incorrect. The option indicating an HPR of 10.33% significantly overestimates the return on the investment.

CFA Level I, Portfolio Management, Learning Module 1: Portfolio Risk &amp; Return: Part I. LOS (d): Calculate and interpret the mean, variance, and covariance (or correlation) of asset returns based on historical data.

© 2014-2024 AnalystPrep.
Q.2676 What is the sale price of a bond that paid a coupon of $20 and was purchased for $890, assuming that the holding period return of the bond is 4.49%?

A. $1,000
B. $910
C. $930

The correct answer is B.


\text{Holding period return} = \frac{(\text{Price at time 1} + \text{Coupon} - \text{Price at time 0})}{\text{Price at time 0}}

\text{Price at time 1} = (\text{HPY} \times \text{Price at time 0}) - \text{Coupon} + \text{Price at time 0}

\text{Price at time 1} = (0.0449 \times 890) - 20 + 890 = 909.96


A is incorrect. A sale price of $1,000 does not accurately reflect the calculation based on the given holding period return, coupon, and purchase price. This option disregards the specific financial metrics provided and does not follow the formula for calculating the sale price based on the holding period return.

C is incorrect. A sale price of $930 does not align with the calculated result using the holding period return formula. This option seems arbitrary and does not consider the precise calculation required to determine the sale price of the bond given the initial purchase price, coupon, and holding period return.

© 2014-2024 AnalystPrep.
Q.2680 A small investor purchased 100 shares of stock HHL at $10 per share on January 4th, 2014. A year later, he purchased an additional 200 shares at $15 per share. If the investor sold all 300 shares at $17 per share on January 4th, 2016, then the annualized time-weighted return of the investment is closest to:

A. 27.5%.
B. 30.38%.
C. 21.11%.

The correct answer is B.


\text{Annualized time-weighted return} = (\text{HPR year 1} \times \text{HPR year 2})^{1/n} - 1

\text{Annualized time-weighted return} = \left(\frac{\$15}{\$10} \times \frac{\$17}{\$15}\right)^{1/2} - 1 = 30.38\%


A is incorrect. The option suggesting a 27.5% return does not correctly apply the formula for calculating the annualized time-weighted return.

C is incorrect. The option suggesting a 21.11% return also fails to correctly apply the formula for calculating the annualized time-weighted return.

© 2014-2024 AnalystPrep.
Q.2835 For the past 5 year, an investor has had the following returns: 6%, 2.5%, -3%, 8%, and -6%. Which of the following statements is most likely accurate?

A. The geometric mean return is equal to the arithmetic return.
B. The geometric mean return is smaller than the arithmetic return.
C. The geometric mean return is greater than the arithmetic return.

The correct answer is B.

When returns vary, the geometric mean is smaller than the arithmetic mean.


\text{Arithmetic return} = \frac{(6\% + 2.5\% - 3\% + 8\% - 6\%)}{5} = 1.5\%

\text{Geometric mean} = (1.06 \times 1.025 \times 0.97 \times 1.08 \times 0.94)^{1/5} - 1 = 1.36\%


A is incorrect. The arithmetic mean simply averages the returns without considering the compounding effect, which can lead to an overestimation of the actual performance of the investment. In the given scenario, with returns of 6%, 2.5%, -3%, 8%, and -6%, the variability in returns means that the geometric mean will account for the compounding effect and thus, will not be equal to the arithmetic mean.

C is incorrect. The arithmetic mean does not accurately reflect the decrease in investment value due to negative returns, as it treats all returns equally without considering their sequential impact. This is because the geometric mean more accurately reflects the compound growth rate of an investment over time, taking into account the effect of volatility and negative returns, which the arithmetic mean fails to do. The calculation provided in the original solution demonstrates this principle clearly, showing a geometric mean return of 1.36% compared to an arithmetic mean return of 1.5% for the given set of returns.

© 2014-2024 AnalystPrep.
Q.2836 TexCo is a textile firm in Shanghai. The stock of Tex Co has been closing higher every year for the past 7 years. Using the stock data provided in the following table, calculate the Holding Period Return on TexCo's stock for the year 2012.

| Year | Closing Price | Dividend |
| --- | --- | --- |
| 2009 | $23.78 | $1.10 |
| 2010 | $25.25 | $1.80 |
| 2011 | $28.21 | $2.00 |
| 2012 | $30.50 | $2.50 |
| 2013 | $31.50 | $1.50 |
| 2014 | $32.00 | $3.00 |
| 2015 | $34.00 | $2.00 |

A. 19.64%
B. 18.85%
C. 16.98%

The correct answer is C.


\text{Holding Period Return} = \frac{(\text{Closing Price} + \text{Dividend} - \text{Opening Price})}{\text{Opening Price}}

\text{Holding Period Return} = \frac{(30.50 + 2.5 - 28.21)}{28.21} = 16.98\%


A is incorrect. An HPR of 19.64% would suggest either a higher closing price, a higher dividend, or a lower opening price than what was provided for the year 2012. This option does not accurately reflect the calculation based on the given data.

B is incorrect. An HPR of 18.85% similarly indicates a discrepancy in the calculation, suggesting a different set of values for the closing price, dividend, or opening price.

© 2014-2024 AnalystPrep.
Q.2838 Which of the following return measures will most likely be the lowest?

A. Gross return
B. Net return
C. Pre-tax nominal return

The correct answer is B.

Net return is calculated after deducting the commission and management fees.

Gross return is the return on an investment before the deduction of any fees, expenses or commission.

Pre-tax nominal return is the return before deducting the tax expense in the returns earned which results in an after-tax return.

A is incorrect. It represents the investment's performance without subtracting the costs associated with generating that performance. It is an important measure for understanding the overall effectiveness of the investment strategy but does not provide a complete picture of what the investor ultimately earns.

C is incorrect. It does not include the impact of taxes, which can significantly reduce the amount of money an investor ultimately receives. However, it is lower than the gross return because it still accounts for some deductions such as management fees and commissions. Pre-tax nominal return provides insight into the investment's performance in a tax-agnostic manner, making it useful for comparing investments across different tax environments.

© 2014-2024 AnalystPrep.
Q.2839 An investor is interested in knowing the real return his portfolio has earned over a certain period. Assuming that the nominal return of his portfolio is 18%, the CPI is 6%, and the tax rate is 38.9%, then the real return of the portfolio is closest to:

A. 19.08%
B. 11.32%
C. 6.92%

The correct answer is B.


\text{Real rate of return} = \frac{(1 + \text{Nominal rate})}{(1 + \text{Inflation})} - 1

\text{Real rate of return} = \left(\frac{1.18}{1.06}\right) - 1 = 11.32\%


A is incorrect. This calculation seems to ignore the inflation effect altogether, which is a critical component in determining the real rate of return. The real return must account for the decrease in purchasing power due to inflation, which is not reflected in this option.

C is incorrect. The option indicating a real return of 6.92% significantly underestimates the actual real return of the portfolio.

© 2014-2024 AnalystPrep.
Q.3404 Melvin Brown deposits $20,000 in a bank account which promises to pay an interest of 12% with quarterly compounding. The sum Brown should receive after five years is closest to:

A. $36,122.
B. $35,817.
C. $35,247.

The correct answer is A.


\begin{array}{l}
\text{Final Amount} = \text{Principal} \times \left(1 + \frac{\text{Annual rate}}{\text{Compounding frequency}}\right)^{\text{Compounding Frequency} \times \text{Number of years}} \\
= 20,000 \times \left(1 + \frac{12\%}{4}\right)^{4 \times 5} = \$36,122.22
\end{array}


Using a financial calculator: $N = 20$; $I/Y = 12/4 = 3$; $PV = 20,000$; $PMT = 0$; $CPT \to FV = 36,122.22$

B is incorrect. It is the future value of the amount with half-yearly and not quarterly compounding.


20,000 \left(1 + \frac{0.12}{2}\right)^{5 \times 2} = 35,817


C is incorrect. It is the future value of the amount with an annual, and not a quarterly compounding frequency.


20,000 (1 + 0.12)^5 = 35,247


CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses.

© 2014-2024 AnalystPrep.
Q.3465 The price of a stock increases from $24 to $40 in two years. The continuously compounded 2-year return for the stock is closest to:

A. 25.54%.
B. 28.00%.
C. 51.08%.

The correct answer is C.

The continuously compounded 2-year return is given by


= \ln \left(\frac{40}{24}\right) = 51.08\%


A is incorrect: Annually compounded rate of return


= \frac{51.08\%}{2} = 25.54\%


B is incorrect. It is the monetary change of the stock price misrepresented as a percentage.

CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses.

© 2014-2024 AnalystPrep.
Q.3467 If an investor expects to earn an annual return of 10% by holding a stock, the continuously compounded annual return earned by the investor would be closest to:

A. 9.53%
B. 10.00%
C. 11.53%.

The correct answer is A.

As per the formula


\text{Continuously compounded return} = \ln(1 + \text{HPR}) = \ln(1 + 10\%) = 9.53\%


B is incorrect. The rate assumes the annual return indicated as 10%.

C is incorrect. The rate assumes a monthly compounded return rate.

CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses.

© 2014-2024 AnalystPrep.
Q.3497 Jose Calzon currently has $5,040.11 in his bank account. If he plans to buy a car for $5,500 next year, the monthly interest rate that a bank must pay so that James receives a sum of $5,500 next year is closest to:

A. 0.73%.
B. 0.76%
C. 9.12%

The correct answer is A.

Interest rate can also be considered as the required rate of return. In the above case, James wants his $5,000 to grow to $5,500. The rate required to achieve this return can be calculated as under:


\text{Amount deposited today} \times (1 + \text{Rate of interest}) = \text{Amount next year}

\text{Rate of interest} = \frac{(\text{Amount next year})}{(\text{Amount deposited})} \times 1 = \frac{\$5,500}{\$5,040.11} - 1 = 0.0912 = 9.12\%


To turn the annual interest rate into a monthly rate,


\text{Monthly rate} = (1 + \text{Annual rate})^{\frac{1}{12}} - 1 = 0.0073 = 0.73\%


To obtain the monthly rate directly using the financial calculator: PV = -5040.11, FV = 5500, N=12; CPT 1/Y =&gt; 0.73

B is incorrect. The monthly rate is 0.73%, not 0.76%.

C is incorrect. It is the annual interest rate and not the monthly interest rate as required by the question.

CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (b) Calculate and interpret different approaches to return measurement over time and describe their appropriate uses.

© 2014-2024 AnalystPrep.
Q.3498 A bank offers an annual interest of 12% with quarterly compounding. If the initial deposited sum is $1,011, then the sum received at the end of one year is closest to:

A. $1,132.32.
B. $1,135.96
C. $1,137.89

The correct answer is C.


\begin{array}{l}
\text{Final value} = \text{Present value} \left(1 + \frac{\text{Annual rate of interest}}{\text{Compounding frequency}}\right)^{(\text{No. of years} \times \text{compounding frequency})} \\
= \$1,011 \times \left(1 + \frac{12}{4}\right)^{(1 \times 4)} \\
= \$1,137.89
\end{array}


You can also solve the question using the financial calculator with the following inputs:

N = 4; (4 quarters in a year)

I/Y = 12/4 = 3; (12 percent divided by the number of periods)

PV = -$1,011;

PMT = 0;

CPT =&gt; FV = 1,137.89

A is incorrect. It is the future value compounded with yearly and not quarterly compounding.


1011(1 + 0.12)^1 = 1,132.32.


B is incorrect. It is the future value compounded with half half-yearly and not quarterly compounding.


1011\left(1 + \frac{0.12}{2}\right)^2 = 1,135.96


CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses.

© 2014-2024 AnalystPrep.
Q.3499 An investor received $100,000 after five years from a certificate of deposit which paid him an interest of 12% with monthly compounding. The sum deposited by the investor at the beginning of the 5 years is closest to:

A. $55,044.96.
B. $55,367.58
C. $56,742.69.

The correct answer is A.


\text{Final amount} = \text{Principal} \times \left(1 + \frac{\text{annual rate}}{\text{compounding frequency}}\right)^{\text{(compounding frequency} \times \text{no. of years)}}


In this case, we have


\$100,000 = \text{Principal} \times \left(1 + \frac{12\%}{12}\right)^{12 \times 5} = \text{Principal} = \frac{\$100,000}{(1 + 1\%)^{60}} = \$55,044.96


Steps on a financial calculator: N = 5 × 12 = 60, 1/Y = 12/12 = 1, FV = 100,000, PMT = 0; CPTPV =&gt; 55,044.96

B is incorrect. It is the present value of the amount with quarterly and not monthly compounding of the interest rate.

C is incorrect. The present value of the amount with yearly, not monthly compounding, of the interest rate.

CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses.

© 2014-2024 AnalystPrep.
# Learning Module 2: The Time Value of Money in Finance

Q.8 If you invest $100,000 currently in a project paying an 8% interest rate compounded annually, the amount of the investment after three years is closest to:

A. $108,000.00
B. $108,215.23
C. $125,971.20

The correct answer is C.

The question requires the calculation of the future value of a single-sum investment. Recall that future value is the total to which a present deposit will grow over time when placed in an account paying compound interest.

The formula for calculating FV is as follows:


\mathrm{FV} = \mathrm{PV}\left[1 + \frac{\mathrm{I}}{\mathrm{Y}}\right]^{\mathrm{N}}


Where:

- FV = Future Value,
- PV = Present Value of the investment.
- I/Y = Rate of return per compounding period.
- N = Total number of compounding periods.

Therefore;


\mathrm{FV} = \$100,000[1 + 0.08]^3 = \$125,971.20


A is incorrect. It represents the amount after one year using simple interest as follows:


\mathrm{FV} = \$100,000 + (0.08 \times \$100,000) = \$108,000


B is incorrect. The calculation divides the interest (8%) by the number of compounding periods (3 years) as follows:


\mathrm{FV} = \$100,000\left[1 + \frac{0.08}{3}\right]^3 = \$108,215.23


© 2014-2024 AnalystPrep.
Q.11 How much is an asset worth today, if it is supposed to pay $7,000 per year for 10 years? The first payment is due one year from now and the required rate is 6% per year.

A. $12,535.93
B. $51,520.61
C. $54,611.85

The correct answer is B.

The question requires the calculation of the Present Value of an ordinary annuity as follows:


\mathrm{PV} = \mathrm{A} \left[ \frac{1 - \frac{1}{(1 + r)^N}}{r} \right]


Where;

A = Amount of the annuity.
r = Required rate of return.
N = Number of years of the investment.

Therefore;


\mathrm{PV} = \$7,000 \left[ \frac{1 - \frac{1}{(1 + 0.06)^{10}}}{0.06} \right] = \$7,000 \left[ \frac{1 - \frac{1}{1.791}}{0.06} \right] = \$7,000 \left[ \frac{1 - 0.558}{0.06} \right] = \$51,520.61


Using the BA II Plus Pro Calculator;

N=10; I/Y=6; PMT=$7,000; FV=0; CPT=&gt;PV=$51,520.61

A is incorrect. The amount represents the future value, assuming that it was not an annuity as follows:


\mathrm{FV} = \mathrm{PV} (1 + r)^N = \$7,000 (1 + 0.06)^{10} = \$12,535.93


C is incorrect. The amount indicates the present value of the annuity, supposing it was an annuity in advance and not an ordinary annuity as follows;


\mathrm{PV} = \mathrm{PV}_{\text{Ordinary Annuity}} (1 + r) = \$51,520.61 (1 + 0.06) = \$54,611.85


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.19 Suppose a $200,000 investment will earn 6% compounded continuously for 4 years. The future value of this asset is closest to:

A. $252,495.39
B. $253,354.02
C. $254,249.83

The correct answer is C.

The question requires the calculation of the future value of an asset compounded continuously as follows;


\mathrm{FV}_\mathrm{N} = \mathrm{PV} e^{\mathrm{r}^\mathrm{N}}


Where;

PV = Present value of investment.
r = Interest rate.
N = Investment period.

Therefore;


\mathrm{FV}_\mathrm{N} = \$200,000 \times 2.7182818^{(0.06 \times 4)} = \$200,000 \times 1.271 = \$254,249.83


A is incorrect. The amount represents the future value of the amount, compounded annually, for 4four years and not continuously as follows;


\mathrm{FV}_\mathrm{N} = \$200,000(1 + 0.06)^4 = \$252,495.39


B is incorrect. The amount represents the future value compounded semi-annually instead of continuously as follows;


\mathrm{FV}_\mathrm{N} = \$200,000\left[1 + \frac{0.06}{2}\right]^{(4 \times 2)} = \$253,354.02


CFA Level 1, Quantitative Methods, Learning Module 1: Rate and Return, LOS (d) Calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses

© 2014-2024 AnalystPrep.
Q.21 An asset will pay $2,500 per year for seven years, with the first payment being made one year from today. If the required rate of return is 14% per year, the amount you will pay for this asset is closest to:

A. $10,720.76
B. $12,221.67
C. $26,826.23

The correct answer is A.

The question requires the calculation of the Present Value of an ordinary annuity as follows;


\mathrm{PV} = \mathrm{A} \left[ \frac{1 - \frac{1}{(1 + \mathrm{r})^{\mathrm{N}}}}{\mathrm{r}} \right]


Where;

A = Annuity payable per year.
r = Rate of return.
N = Investment period.

Therefore, in this case:


\mathrm{PV} = \$2,500 \times \left[ \frac{1 - \frac{1}{(1 + 0.14)^7}}{0.14} \right] = \$2,500 \times 4.288 = \$10,720.76


Using the Plus Pro- Calculator;

N=7; FV=0; I/Y=14; PMT=$2,500; CPT =&gt; PV = $10,720.76

B is incorrect. The amount represents the future value of an annuity in advance and not of an ordinary annuity as required by the question as follows;


\mathrm{FV}_{\text{Annuity Advance}} = \$10,720.76(1 + 0.14) = \$12,221.67


C is incorrect. The amount represents the future value of the ordinary annuity and not its present value calculated using the BA II Plus Pro Calculator as follows;

N=7; PV=0; I/Y=14; PMT=$2,500; CPT=&gt;FV=$26,826.23

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.22 The amount of money an investor has after ten years if they invest $25,000 per year in an index fund that pays 7% annually is closest to:

A. $349,178.78
B. $349,744.72
C. $345,411.20

The correct answer is C.

The question requires the calculation of the future value of an annuity as follows; Step I: Determine the Future Value annuity factor as follows;


\mathrm{FV}_{\mathrm{Annu}^{\mathrm{i}} \sigma \mathrm{F}_{\mathrm{actor}}} = \frac{(1 + r)^{\mathrm{N}} - 1}{r} = \frac{(1 + 0.07)^{10} - 1}{0.07} = 13.816


Step II: Determine the Future Value of the annuity as follows;


\mathrm{FV} = \text{Annual investment} \times \mathrm{FV}_{\mathrm{Annu}^{\mathrm{i}} \sigma \mathrm{F}_{\mathrm{actor}}} = \$25,000 \times 13.816 = \$345,411.20


Using the BA II Pro Plus Calculator;

N= 10; I/Y= 7; PMT=$25,000; PV = 0; CPT=&gt;FV = $345,411.20

A is incorrect. The value of $349,178.78 is higher than the correct future value of the annuity.

B is incorrect. The value of $349,744.72 is also higher than the correct future value of the annuity.

CFA Level I, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance. LOS (b): Calculate and interpret the implied return of fixed-income instruments and the required return and implied growth of equity instruments given the present value (PV) and cash flows.

Q.23 An index fund is projected to pay an investor a 9% annual interest for eight years. The investor intends to invest $15,000 every year, beginning next year. The total amount of money the investor will have at the end of the eight years is closest to:

A. $120,000.00
B. $165,427.11
C. $180,315.55

The correct answer is B.

© 2014-2024 AnalystPrep.
The question requires the calculation of the Future Value of an annuity payment as follows;

Step I: Determine the Future Value annuity factor as follows;


\mathrm{FV}_{\text{Annuity Factor}} = \left[ \frac{(1 + r)^N - 1}{r} \right]


Where;

- r = Annual interest rate
- N = Investment period

Therefore;


\mathrm{FV}_{\text{Annuity Factor}} = \left[ \frac{(1 + 0.09)^8 - 1}{0.09} \right] = 11.028


Step II: Determine the total expected future amount as follows;


\mathrm{FV} = \text{Annual Investment} \times \mathrm{FV}_{\text{Annuity Factor}} = \$15,000 \times 11.028 = \$165,427.11


Using BA II Plus Calculator

N = 8; I/Y = 9 = 0.5; PV = 0; CPT = 15,000; CPT -&gt; FV = $165,427.11

A is incorrect. The amount represents the annuity after 8 eight years without considering the interest earned for the investment as follows:


\mathrm{FV} = \$15,000 \times 8 \text{ years} = \$120,000.00


C is incorrect. The amount represents the future value of an annuity in advance and not ordinary as follows;


\mathrm{FV}_{\text{Annuity Advance}} = \$165,427.11 (1 + 0.09) = \$180,315.55


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

© 2014-2024 AnalystPrep.
Q.25 Assume an investment asset will pay $75,000 after two years with an interest rate of 11%. The current value of the investment asset is closest to:

A. $60,871.70
B. $92,407.50
C. $128,439.25

The correct answer is A.

The question requires the calculation of the Present Value of future lumpsum payment as follows;


\mathrm{PV} = \mathrm{FV_N} (1 + \mathrm{r})^{-N}


Where;

$\mathrm{FV_N} =$ The expected future payment.

$\mathrm{r} =$ Applicable rate of interest.

$\mathrm{N} =$ Investment maturity period.

Therefore;


\mathrm{PV} = \$75,000(1 + 0.11)^{-2} = \$75,000 \times 0.812 = \$60,871.68


Using the Plus Pro- Calculator:

N= 2; I/Y= 11; PMT=0; FV = $75,000; CPT=&gt;PV = $60,871.68

B is incorrect. The amount represents the future value and not the present value as required in the question as follows;


\mathrm{FV} = \$75,000(1 + 0.11)^2 = \$75,000 \times 1.232 = \$92,407.50


C is incorrect. The amount represents the present value of an ordinary annuity which is not stated in the question as follows;


\mathrm{PV} = \mathrm{A} \left[ \frac{1 - \frac{1}{(1 + \mathrm{r})^N}}{\mathrm{r}} \right] = \$75,000 \left[ \frac{1 - \frac{1}{(1 + 0.11)^2}}{0.11} \right] = \$75,000 \times 1.713 = \$128,439.25


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.34 You have a choice to take your retirement benefit either as a lump-sum or as an annuity. You can take a lump-sum of $4.5 million or an annuity with 15 payments of $400,000 a year with the first payment starting t =1. The interest rate is 7% per year compounded annually. Which option is preferable, on the basis that it has the greater present value?

A. The annuity payment option.

B. The lump-sum payment option.

C. There is no significant difference between the two options.

The correct answer is B.

The question requires calculating the present value of a series of equal cash flows compared to the lump sum payment. The annuity payment qualifies as an ordinary annuity since it has equal annuity payments, with the first payment starting at time t=1. Hence the formula is as follows:


N = 15; I/Y = 7; PMT = 400,000; FV = 0; CPT \Rightarrow PV = 3,643,165.60


The total annuity payment amount of $3,643,165.60 is less than the lump sum payment of $4.5 million; hence settle for a lump sum payment.

A is incorrect. The present value of the lump sum is greater than the present value of the annuity payments, as evidenced in Choice B.

C is incorrect. The present value of the lump sum is greater than the present value of the annuity payments.

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.35 XYZ Pension Fund plans to pay its retirees a total of $29 million every year beginning in 2017. The payments will be made at the end of each year until 2031 for a total of 15 payments. Assuming a discount rate of 4% compounded annually, the present value of the pension payments to the retirees in 2017 is closest to:

A. $52,277,361.66
B. $322,433,235.50
C. $335,330,564.90

The correct answer is B.

The question requires calculating the Present Value of an ordinary annuity whereby the annuity makes N payments, with the first payment at t = 1 and the last at t = N.

The present value of an ordinary annuity can be expressed as the sum of the present values of each annuity payment as follows,


\mathrm{PV} = \mathrm{A} \left[ \frac{1 - \frac{1}{(1 + r)^N}}{r} \right]


Where;

A = the annuity amount.
r = The interest rate per period corresponding to the frequency of annuity payments compounded annually.
N = The number of annuity payments.

Using the BA II Plus Pro Calculator;

N = 15; I/Y = 4; PMT = $29,000,000; FV = 0; CPT =&gt; PV = $322,433,235.50

A is incorrect. The amount represents the future value of a lump sum with annual compounding as follows;


\mathrm{FV_N} = \$29,000,000 \left[ 1 + \frac{0.04}{1} \right]^{(15 \times 1)} = \$29,000,000 \times 1.801 = \$52,227,361.66


C is incorrect. The amount represents the future value of the annuity payment, assuming an annuity in advance and not an ordinary annuity as required by the question as follows;


\mathrm{FV}_{\text{Annuity Advance}} = \$322,433,235.50 (1 + 0.04) = \$335,330,564.90


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.37 Consider an annuity due with 20 payments of $55,000 every year with a required rate of interest of 10% compounded annually. The present value of the annuity if the first payment is due at the end of the year is closest to:

A. $370,012.50
B. $468,246.00
C. $566,577.67

The correct answer is B.

Hence the present value of an ordinary annuity is expressed as the sum of the present values of each annuity payment, as follows;


\mathrm{PV} = \mathrm{A} \left[ \frac{1 - \frac{1}{(1 + r)^N}}{\mathrm{r}} \right]


Where;

A = The annuity amount.
r = The interest rate per period corresponding to the frequency of annuity payments.
N = The number of annuity payments.

Therefore;


\mathrm{PV} = \$55,000 \left[ \frac{1 - \frac{1}{(1 + 0.1)^{20}}}{0.1} \right] = \$468,246


A is incorrect. The amount represents the projected future value of a lump sum with no interim Cash as follows;


\mathrm{FV_N} = \$55,000 (1 + 0.1)^{20} = \$370,012.50


C is incorrect. The amount represents the future value of the annuity payment, assuming an annuity in advance and not an ordinary annuity as required by the question as follows;


\mathrm{FV}_{\text{Annuity Advance}} = \$515,070.60 (1 + 0.1) = \$566,577.67


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.38 ABC Company Ltd has been in operation since 1966. In 2012 the company recorded revenue of $15.8 million compared to $11.4 million in 2006. The revenue growth rate for the company for the six years is closest to:

A. -5.30%
B. 5.59%
C. 38.60%

The correct answer is B.

The question requires the calculation of the growth rate in revenue as follows;


g = \left[ \frac {F V _ {N}}{P V} \right] ^ {\frac {1}{N}} - 1


Where;

$\mathrm{FV_N} =$ Future value at time N.

$\mathrm{PV} =$ Current present value.

$\mathrm{N} =$ Number of periods.

Therefore;


g = \left[ \sqrt {\frac {\$ 15,800,000}{\$ 11,400,000}} - 1 = 5.59\% \right.


The calculated growth rate of about 5.6 percent a year shows that ABC Company Ltd's revenue grew during the 2006-2012 period.

Using the BA II Pro Plus Calculator;

N=6; PV= -$11.4; PMT=0; FV=$15.8 CPT=&gt; I/Y = 5.59%

NOTE: Remember to include a negative sign before the present value when calculating the financial calculator's interest rate.

A is incorrect. The rate is as a result of the inverse calculation as per choice B above as follows;


g = \left[ \sqrt {\frac {\$ 11,400,000}{\$ 15,800,000}} - 1 = -5.30 \right.


C is incorrect. The rate ignores the applicable formula and has been determined as follows;


\text{Growth} = \$15.8 \text{ million} - \$11.4 \text{ million} = \$4.4 \text{ million}


And

© 2014-2024 AnalystPrep.

g = \left[ \frac {\$ 4 , 4 0 0 , 0 0 0}{\$ 1 1 , 4 0 0 , 0 0 0} \right] \times 1 0 0 = 3 8. 6 0 \%


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows

© 2014-2024 AnalystPrep.
Q.39 A Government Bond pays $2,500 per quarter year in perpetuity. If the required rate of return is 10%, price of the bond today is closest to:

A. $11,000
B. $25,000
C. $100,000

The correct answer is C.

The question requires the calculation of the present value of a perpetuity with level payments for an indefinite period as follows;


\mathrm{PV} = \frac{\mathrm{A}}{\mathrm{r}}


Where;

A = Quarterly perpetuity payments
r = Required rate of return

Therefore;


\mathrm{PV} = \left[ \frac{\$2,500}{0.1} \times 4 \right] = \$100,000


A is incorrect. The amount ignores the aspect of perpetuity calculation as follows;


\mathrm{PV} = \$2,500 \times (1 + 0.1) \times 4 = \$11,000


B is incorrect. The resulting amount ignores the quarterly perpetuity payments as follows;


\mathrm{PV} = \frac{\$2,500}{0.1} = \$25,000


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows

© 2014-2024 AnalystPrep.
Q.40 Mr. Smith is planning to borrow $150,000 from ABC Bank with a 20-year fixed-rate mortgage with monthly payments, and the first payment is due in exactly one month. Mr. Smith's monthly payment if the interest rate is 7% compounded monthly is closest to:

A. $1,162.93
B. $1,245.02
C. $1,156.20

The correct answer is A.

The question requires the calculation of the size of payments on a Fixed-Rate Mortgage and ABC Bank will define the mortgage payments such that at the specified periodic interest rate, the present value of the payments will be equal to the amount borrowed, which is $150,000.

The amount borrowed by Mr. Smith of $150,000 is equivalent to approximately 129 monthly payments of $1,163.56 with a stated interest rate of 7%.

Using the BA II Plus Pro Calculator;

N=12* 20=240; (12 months for 20 years)

I/Y=7/12=0.5833; (7% put into monthly interest)

PV=-$150,000;

FV=0;

CPT =&gt; PMT = $1,162.93

B is incorrect. The amount represents an annuity in advance, yet the first payment is due in exactly one month, not immediately as follows:


FV_{Ann u^{1} t Y A d_{vance}} = \$1,163.56(1 + 0.07) = \$1,245.02


C is incorrect. The interest rate has not been divided by 12 to reflect monthly payments while using the BA II Plus Pro Calculator as follows;

N=12* 20=240; (12 months for 20 years)

I/Y=7;

PV=-$150,000;

FV=0;

CPT =&gt; PMT = $10,500.00

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

© 2014-2024 AnalystPrep.
Q.42 Consider a level perpetuity of $27,000 per year, with its first payment being at the end of year seven (t = 7). Its present value today (at t = 0), given an 8% discount rate is closest to:

A. $124,817.75
B. $212,682.25
C. $337,500.00

The correct answer is B.

The question requires the calculation of the present value of projected perpetuity as follows;

Step I: Determine the present value of the perpetuity at $t = 6$ and then discount that amount back to $t = 0$.

It is important to note that perpetuity or an ordinary annuity has its first payment one period away, explaining the $t = 6$ index for our present value calculation.


\mathrm{PV} = \frac{\mathrm{A}}{\mathrm{r}}


Where;

A = Annual perpetuity payment.
r = Discount rate.


= \mathrm{PV} = \frac{\$27,000}{0.08} = \$337,500.00


Step II: Determine the present value of the future amount at $t = 6$.

Recall that from the perspective of $t = 0$, the present value of $337,500.00 can be considered a future value.

Therefore, we need to find the present value of a lump sum as follows;


\mathrm{PV} = \mathrm{FV}_\mathrm{N}(1 + \mathrm{r})^{-\mathrm{N}} = \$337,500.00(1 + 0.08)^{-6} = \$212,682.25


A is incorrect. The amount represents the difference between the present value of the perpetuity at $t = 6$ and $t = 0$.

C is incorrect. The amount represents the present value at $t = 6$, not at $t = 0$, as calculated above.

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows

© 2014-2024 AnalystPrep.
Q.43 You are presented with 2 investment opportunities and must choose the one with the greater present value: A lump-sum of $2.5 million or an annuity with 25 payments of $250,000 a year with the first payment starting today. The interest rate is 9% per year compounded annually. Which one will you choose?

A. Annuity option.
B. Lump-sum.
C. Invest in both options since there's no difference between the two.

The correct answer is A.

The question requires the calculation of an annuity due as the present value of an immediate cash flow plus an ordinary annuity and comparing the outcome with the lump sum payment as follows;

Step I: Compare the present value of each investment option at time $t = 0$ and select the one with the larger value. For example, the first option's present value is $2 million in this scenario, already stated in today's dollars, while the second option is an annuity due.

Step II: Since the first payment for the annuity due occurs at $t = 0$, we need to isolate the annuity benefits into two portions: an immediate $250,000 to be paid today ($t = 0$) and an ordinary annuity of $250,000 per year for 24 years.

Therefore;


\mathrm{PV} = \mathrm{A} \left[ \frac{1 - \frac{1}{(1 + \gamma)^N}}{\mathrm{r}} \right]


Where:

A = Ordinary annuity payments.
r = Applicable rate of interest.
N = Number of payments.

Hence;


\mathrm{PV} = \$250,000 + \$250,000 \left[ \frac{1 - \frac{1}{(1 + 0.09)^{24}}}{0.09} \right] = \$2,676,652.94


Using the BA II Plus Pro Calculator as follows;

N = 24

© 2014-2024 AnalystPrep.
I/Y = 9

PMT = $250,000

FV = 0

CPT =&gt; PV = $2,426,652.94,

and total annuity payment becomes;


\mathrm{PV} = (\$250,000 + \$2,426,652.94) = \$2,676,652.94


Since the total value of the annuity option is $2,676,652.94, the present value of the annuity is greater than the lump sum alternative of $2.5 million.

**B is incorrect.** The above calculations show that the present value of the annuity is greater than the present value of the lump sum.

**C is incorrect.** As indicated in the above calculations, both options are quite different, with annuity being the superior option.

**CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows**

© 2014-2024 AnalystPrep.
Q.44 Consider an investor with a Certificate of Deposit (CD) worth $3 million and pays a 5% interest rate compounded annually. The number of years that it will take for the CD to triple in value in closest to:

A. 2.9 years
B. 3 years
C. 22.5 years

The correct answer is C.

The question requires the calculation of the number of annual compounding periods needed for an investment to reach a specific value using the formula as follows;


\mathrm{FV_N} = \mathrm{PV}(1 + \mathrm{r})^{\mathrm{N}}


To solve for the number of periods N, we readjust the formula and make N the subject as follows;


(1 + r)^{\mathrm{N}} = \frac{\mathrm{FV_N}}{\mathrm{PV}} = \frac{\$9,000,000}{\$3,000,000} = 3 \Rightarrow \mathrm{N} = \frac{\ln(3)}{\ln(1.05)} = 22.5 \text{ years}


Using the financial calculator, we use the following commands: I/Y = 5, PV = -3, PMT = 0, FV = 9, CPT = -&gt; N = 22.5171

A is incorrect. The result assumes the natural logarithm in the formula as follows;


\mathrm{N} = \frac{3}{1.05} = 2.9 \text{ years}


B is incorrect. The result assumes that by dividing the future value by the present value of the deposit certificate, it automatically gives the actual triple value, which is not the case.

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows

© 2014-2024 AnalystPrep.
Q.46 XYZ company's EPS at the beginning of each 4 consecutive years is as follows:

| Year | EPS ($) |
| --- | --- |
| Year 1 | $3.00 |
| Year 2 | $4.20 |
| Year 3 | $5.50 |
| Year 4 | $7.60 |

The EPS compound annual growth rate during this period is closest to:

A. 16.80%
B. 20.40%
C. 36.320%

The correct answer is C.

To calculate the EPS growth rate, we use the following formula;


g = \left[ \frac {F V _ {N}}{P V} \right] ^ {\frac {1}{N}} - 1


Where;

$\mathrm{FV_N} =$ Future EPS Value.

$\mathrm{PV} =$ Present EPS Value.

$\mathrm{N} =$ Number of periods.

Therefore;


g = \sqrt{\frac{\$7.60}{\$3.00}} - 1 = 1.3632 - 1 = 36.32\%


© 2014-2024 AnalystPrep.
Q.47 Consider a series of payments, each amounting to £6,500 is set to be received by an investor in perpetuity. Payments are to be made at the end of each year, with the first payment expected to start at the end of year 4. Suppose the discount rate is 9%, the present value of the perpetuity at t = 0 is closest to:

A. £51,164.03
B. £55,768.79
C. £72,222.20

The correct answer is B.

The question requires the calculation of the Present Value of projected perpetuity as follows;

Step I: Determine the present value of the perpetuity at t = 3 and then discount that amount back to t = 0.

It's important to note that perpetuity or an ordinary annuity has its first payment one period away, explaining the t = three indexes for our present value calculation.


\mathrm{PV} = \frac{\mathrm{A}}{\mathrm{r}}


Where;

A = Annuity amount.

r = Discount rate.

Therefore;


\mathrm{PV} = \frac{\text{£6,500}}{0.09} = \text{£72,222.20}


Step II: Determine the present value of the future amount at t = 3. Note that from the perspective of t = 0, the present value of £72,22.20 can be considered a future value. So now we need to find the present value of a lump sum:


\mathrm{PV} = \mathrm{FV}_\mathrm{N} (1 + \mathrm{r})^{-\mathrm{N}} = \text{£72,222.20} (1 + 0.09)^{-3} = \text{£55,768.79}


A is incorrect. At year 4 (t=3), the present value has been discounted by 4 instead of by 3 years as follows;


\mathrm{PV} = \text{£72,222.20} (1 + 0.09)^{-4} = \text{£51,164.03}


C is incorrect. The amount represents the present value at time t=3 and not at time t=0.

© 2014-2024 AnalystPrep.
Q.49 Consider a homeowner who wants to purchase a £230,000 home by making a down payment of £60,000 and borrowing the remainder with a 25 year fixed rate mortgage with monthly payments and the stated annual interest rate of 9% with monthly compounding. The monthly rate of mortgage repayment is closest to:

A. £1,267.50
B. £1,426.63
C. £1,901.30

The correct answer is B.

The question requires the calculation of the size of payments on a Fixed-Rate Mortgage repayment is as follows;

Note that the lending institution will determine the mortgage payments. At the stated periodic interest rate, the present value of the payments will be equal to the amount borrowed (in this case, £170,000).


\mathrm{PV} = \mathrm{A} \left[ \frac{1 - \frac{1}{(1 + \mathrm{r})^{\mathrm{N}}}}{\mathrm{r}} \right]


Determine the annuity amount (A) as the present value divided by the present value annuity factor as follows;


\mathrm{PV}_{\text{Annuity Factor}} = \left[ \frac{1 - \frac{1}{\frac{(1 + \mathrm{r}_s)^{\mathrm{mN}}}{\mathrm{m}}}}{\frac{\mathrm{r}_s}{\mathrm{m}}} \right]


Where;

$\mathrm{r}_s =$ Monthly compounding interest rate.

$\mathrm{m} =$ Monthly compounding.

$\mathrm{N} =$ Mortgage remainder period.

Therefore;


\mathrm{PV}_{\text{Annuity Factor}} = \frac{1 - \frac{1}{\frac{(1 + 0.09)12}{12} + 25}}{\frac{0.09}{12}} = 0.894 \times \frac{12}{0.09} = 119.162


The annuity amount (A) is thus calculated as follows;


\mathrm{A} = \frac{\mathrm{PV}}{\mathrm{PV}_{\text{Annuity Factor}}} = £170,000 119.62 = £1,426.63


© 2014-2024 AnalystPrep.
Using the financial calculator:
N=25×12=300; I/Y=9/12=0.75 (make sure to use 0.75 and not 0.0075); PV=230,000-60,000=170,000; FV=0;
CPT =&gt; PMT = 1,426.63

A is incorrect. The amount represents the mortgage repayments payable for annual and not for monthly compounding.

C is incorrect. The calculation has not subtracted the down payment of £60,000 from the initial cost of the house to obtain the amount borrowed to finance the purchase.

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows

© 2014-2024 AnalystPrep.
Q.50 Suppose a Certificate of Deposit (CD) pays a 10% annual interest rate, the Effective Annual Rate (EAR) if the CD compounded monthly is closest to:

A. 10.30%
B. 10.40%
C. 10.50%

The correct answer is C.

The question requires the calculation of EAR given a stated annual interest rate that does not give a future value directly as follows;


\mathrm{EAR} = (1 + \text{periodic interest rate})^{\mathrm{m}} - 1


Where;

m = The number of compounding periods in one year.

Periodic interest rate = The stated annual interest rate divided by m.

Therefore;


\mathrm{EAR} = \left[1 + \frac{0.1}{12}\right]^{12} - 1 = 0.105 \text{ or } 10.50\%


A is incorrect. It has equated the compounding periods to semi-annually as opposed to monthly compounding as follows;


\mathrm{EAR} = \left[1 + \frac{0.1}{2}\right]^{2} - 1 = 0.103 \text{ or } 10.30\%


B is incorrect. It has equated the compounding periods to quarterly as opposed to monthly compounding as follows;


\mathrm{EAR} = \left[1 + \frac{0.1}{4}\right]^{4} - 1 = 0.104 \text{ or } 10.40\%


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.52 Consider an investor who wants to double his £1,500,000 worth of investments. If the interest rate is 9% compounded annually, the time it will take for the value of the investment to double is closest to:

A. 1 year.

B. 8 years.

C. 12 years.

The correct answer is B.

The question requires the calculation of the number of annual compounding periods required for an investment to reach a specific value as follows;


\mathrm{FV_N} = \mathrm{PV}(1 + \mathrm{r})^{\mathrm{N}}


Where;

$\mathrm{FV_N} =$ The future value of the investment amount.

$\mathrm{PV} =$ The present value of the investment amount.

$\mathrm{r} =$ Interest rate compounded annually.

$\mathrm{N} =$ Required number of periods for the investment to double.

Therefore;


(1 + 0.09)^{\mathrm{N}} = \frac{\mathrm{FV_N}}{\mathrm{PV}} = £3,000,00£1,500,000 = 2 \Rightarrow \mathrm{N} = \frac{\ln(2)}{\ln(1.09)} = \frac{0.693}{0.086} = 8.042 \text{ years}


Note that you can solve this question easily using a financial calculator by letting $\mathrm{I}\backslash \mathrm{Y} = 9$, $\mathrm{PV} = -1,500,000$, $\mathrm{PMT} = 0$ and $\mathrm{FV} = 3,000,000$ then hit the CBT button followed by N. You will get $\mathrm{N} = 8.0432$ (4 sf).

A is incorrect. As per the calculation in A above, it's practical that the investment will only double in 8 years.

C is incorrect. The number of years indicated only applies if the amount of investment is tripled, but rather the question specifically required the investment to double.

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.53 GHG Corp.'s net profit increased from £2,300,000 in 2012 to £4,800,000 in 2016. The net profit growth rate is closest to:

A. 15.90%
B. 20.20%
C. 52.10%

The correct answer is B.

To determine the growth rate, we use the following formula;


= \left[ \frac {\mathrm {F V} _ {\mathrm {N}}}{\mathrm {P V}} \right] ^ {\frac {1}{\mathrm {N}}} - 1 = \left(\frac {\mathrm {f} 4 , 8 0 0 , 0 0 0}{\mathrm {f} 2 , 3 0 0 , 0 0 0}\right) ^ {\frac {1}{\mathrm {N}}} - 1 = 2 0. 2 0 \%


Or we can use the financial calculator with the following inputs:

N=4; PV=-2,300,000; PMT=0; FV=4,800,000;

CPT =&gt; I/Y = 20.19%

Note: When computing 1/Y, a negative sign has to be included before the Present Value.

A is incorrect. The indicated growth rate assumes that N=5 instead of 4 as follows;


\mathrm {g} = \left(\frac {\mathrm {f} 4 , 8 0 0 , 0 0 0}{\mathrm {f} 2 , 3 0 0 , 0 0 0}\right) ^ {\frac {1}{\mathrm {N}}} - 1 = 0. 1 5 9 \mathrm {o r} 1 5. 9 0 \%


C is incorrect. The indicated growth rate has been arrived at as follows;


= \left(\frac {\mathrm {f} 4 , 8 0 0 , 0 0 0 - \mathrm {f} 2 , 3 0 0 , 0 0 0}{\mathrm {f} 2 , 3 0 0 , 0 0 0}\right) ^ {\frac {1}{\mathrm {N}}} - 1 = 5 2. 1 0 \%


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

© 2014-2024 AnalystPrep.
Q.398 The Effective Annual Rate (EAR) of an investment with a stated annual interest rate of 33%, if the rate is compounded daily is closest to:

A. 35.70%
B. 37.30%
C. 39.10%

The correct answer is C.

The EAR is calculated using the following formula;


\mathrm{EAR} = (1 + \text{periodic interest rate})^{\mathrm{m}} - 1


Note that the periodic interest rate is the stated annual interest rate divided by m, where m is the number of compounding periods in one year.


\mathrm{EAR} = \left[1 + \frac{0.33}{365}\right]^{365} - 1 = 39.10\%


A is incorrect. It represents the EAR of the investment compounded half-yearly as follows;


\mathrm{EAR} = \left[1 + \frac{0.33}{2}\right]^{2} - 1 = 35.70\%


B is incorrect. It represents the EAR of the investment compounded quarterly as follows;


\mathrm{EAR} = \left[1 + \frac{0.33}{4}\right]^{4} - 1 = 37.30\%


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

© 2014-2024 AnalystPrep.
Q.401 The current valuation of Genius Corporation confirms a networth of AUD 2.5 million. Three years ago, the firm was sold to its new investors for AUD 800,000. The growth rate for the Genius Corporation within the three years is closest to:

A. 32.00%
B. 46.20%
C. 68.00%

The correct answer is B.

The growth rate is calculated using the formula as follows;


= \left[ \frac {\mathrm {F V} _ {\mathrm {N}}}{\mathrm {P V}} \right] ^ {\frac {1}{\mathrm {N}}} - 1 = \sqrt {\frac {\mathrm {A U D} 2 , 5 0 0 . 0 0}{\mathrm {A U D} 8 0 0 , 0 0 0}} 1 = 4 6. 2 0 \%


Where;

$\mathrm{FV_N} =$ Future value after the three years.

$\mathrm{PV} =$ Present value at three years.

$\mathrm{N} =$ The period during the investment growth.

A is incorrect. The growth rate indicates the erroneous calculation as follows;


\mathrm {g} = \frac {\mathrm {A U D 8 0 0 , 0 0}}{\mathrm {A U D 2 , 5 0 0 , 0 0}} \times 100 \% = 32 \%


C is incorrect. The growth rate indicates the erroneous calculation as follows;


\mathrm {g} = \left[ \frac {\mathrm {A U D 2 , 5 0 0 , 0 0 0 - A U D 8 0 0}}{\mathrm {A U D 2 , 5 0 0 , 0 0}} \right] \times 100 \% = 68 \%


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (a) Calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows.

Q.402 Mr. Thomas Newborn wants to purchase a $150,000 home and has already made a cash deposit of $20,000. The balance is financed through a 25-year mortgage borrowing with an annual interest rate of 6% compounded monthly. The first monthly mortgage payment is due at t = 1. The monthly mortgage repayment rate is closest to:

A. $837.59
B. $875.92

© 2014-2024 AnalystPrep.
C. $966.49

The correct answer is A.

The question requires the calculation of the size of payments on a Fixed-Rate Mortgage, and it's important to note that the mortgage lender will determine the mortgage payments such that at the stated periodic interest rate, the present value of the payments will be equal to the amount borrowed (in this case, $130,000).


\mathrm{PV} = \mathrm{A} \left[ \frac{1 - \frac{1}{(1 + \mathrm{r})^{\mathrm{N}}}}{\mathrm{r}} \right]


To solve for the annuity amount, A, as the present value divided by the present value annuity factor as follows;


\mathrm{PV}_{\text{Annuity Factor}} = \left[ \frac{1 - \frac{1}{(1 + \frac{\mathrm{rs}}{\mathrm{m}})}^{\mathrm{mN}}}{\frac{\mathrm{rs}}{\mathrm{m}}} \right]


Where;

$\mathrm{PV} =$ Present value of the mortgage.

$\mathrm{rs} =$ Annual interest rate.

$\mathrm{m} =$ Monthly compounding periods

$\mathrm{N} =$ Amount of mortgage repayment period

Therefore;


\mathrm{PV}_{\text{Annuity Factor}} = \left[ \frac{1 - \frac{1}{(1 + \frac{0.06}{12})^{12 \times 25}}}{\frac{0.06}{12}} \right] = 0.776 \times \frac{12}{0.06} = 155.207


And;


\mathrm{A} = \frac{\mathrm{PV}}{\mathrm{PV}_{\text{Annuity Factor}}} = \frac{\$130,000}{155.207} = \$837.59


We could also use the financial calculator:

$\mathrm{N} = 300$; $\mathrm{I/Y} = 6/12 = 0.5$; $\mathrm{PV} = -130,000$; $\mathrm{FV} = 0$; $\mathrm{CPT} \rightarrow \mathrm{PMT} = 837.59$

In conclusion, the amount borrowed, $130,000, is equivalent to 155 monthly payments of $837.59 with a stated interest rate of 6%.

B is incorrect. It represents the monthly payment that would have been made if the payments were to be expected at the beginning (annuity in advance) and not at the end of the year

© 2014-2024 AnalystPrep.
(ordinary annuity).

C is incorrect. The amount has not considered the cash payment of $20,000, which should be deducted from $150,000.

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

Q.3403 A bank advertises that it pays an annual interest of 10% with semi-annual compounding on its savings account. The effective annual rate is closest to:

A. 10.25%.
B. 10.38%.
C. 10.47%.

The correct answer is A.

Recall that:


\text{Effective annual rate (EAR)} = \left(1 + \frac{\text{Annual rate}}{\text{Compounding frequency}}\right)^{\text{(Compounding frequency)}} - 1 = \left[1 + \frac{10\%}{2}\right]^2 - 1


B is incorrect. It is the effective annual interest rate with quarterly compounding.


\mathrm{EAR} = \left(1 + \frac{0.10}{4}\right)^4 - 1 = 0.1038 = 10.38\%


C is incorrect. It is the effective annual interest rate with monthly compounding.


\mathrm{EAR} = \left(1 + \frac{0.10}{12}\right)^{12} - 1 = 0.1047 = 10.47\%


CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

Q.3405 Norman Smith is considering an investment opportunity presented by his portfolio

© 2014-2024 AnalystPrep.
manager, which involves making an annual investment of $1,000 at the end of each year for a duration of 10 years. Assuming the investment yields an annual return of 10%, the amount that Smith can expect to receive at the end of the 10th year is closest to:

A. $10,000.00.
B. $15,937.42.
C. $17,531.17

The correct answer is B.

The investment pattern above is similar to an ordinary annuity. In an ordinary annuity, the cash flows occur at the end of the compounding period. Therefore, we can consider this problem as involving ordinary annuity.

To understand the principle behind the question, let's construct the cash flow pattern of the investment.

| Investment at the end of the... | Sum | Withdrawal of investment | Period until which the money is invested | Maturity amount of the money at the end of 10 years |
| --- | --- | --- | --- | --- |
| 1st year | $1,000 | End of 10 years | 9 years | $1,000 × (1 + 10%)^{9} = $2,357.95 |
| 2nd year | $1,000 | End of 10 years | 8 years | $1,000 × (1 + 10%)^{8} = $2,143.95 |
| 3rd year | $1,000 | End of 10 years | 7 years | $1,000 × (1 + 10%)^{7} = $1,948.72 |
| 4th year | $1,000 | End of 10 years | 6 years | $1,000 × (1 + 10%)^{6} = $1,771.56 |
| 5th year | $1,000 | End of 10 years | 5 years | $1,000 × (1 + 10%)^{5} = $1,610.51 |
| 6th year | $1,000 | End of 10 years | 4 years | $1,000 × (1 + 10%)^{4} = $1,464.10 |
| 7th year | $1,000 | End of 10 years | 3 years | $1,000 × (1 + 10%)^{3} = $1,331.00 |
| 8th year | $1,000 | End of 10 years | 2 years | $1,000 × (1 + 10%)^{2} = $1,210.00 |
| 9st year | $1,000 | End of 10 years | 1 years | $1,000 × (1 + 10%)^{1} = $1,100.00 |
| 10th year | $1,000 | End of 10 years | 0 years | $1,000 × (1 + 10%)^{0} = $1,000.00 |
| Total | | | | $15,937.42 |

The above illustration shows the main basis of the calculation. However, it can also be calculated by using the calculator as:


N = 10; I / Y = 10; PMT = -1,000; PV = 0

CPT = FV = 15,937.42


A is incorrect. It is simply the amount after ten years, excluding the interest earned on the amount.

C is incorrect. It is the future value of an annuity in advance, yet this is an ordinary annuity. To arrive at this answer using a financial calculator, set the calculator to BGN mode and proceed as above. i.e., N=10; I/Y=10; PMT= -1,000; PV=0 CPT = FV=17,531.17

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the

© 2014-2024 AnalystPrep.
present value (PV) and cash flows.

Q.3406 An investor wants to invest $1,000 at the beginning of each year for the next 10 years, after which he can redeem his investment at the beginning of the 10th year. The amount received by the investor at the end of the 10th year, if the investment generates a yearly return of 10%, is closest to:

A. $2,593.74
B. $15,937.42
C. $17,531.17.

The correct answer is C.


\text{Annuity due} = \text{Ordinary Annuity} \times (1 + \text{Rate of compounding})


We can first calculate the ordinary annuity using the financial calculator as:


N = 10; \text{I/Y} = 10; \text{PMT} = -1,000; \text{PV} = 0

\text{CPT} = \text{FV} = \$15,937.42

\text{FV (annuity due)} = 15,937.42 \times 1.1 = 17,531.17


To calculate annuity due directly using the financial calculator: First, set the calculator to BGN mode. This is done by pressing 2ND PMT, then 2ND ENTER, then 2ND CPT. Then input values: PMT=1,000; N=10; I/Y=10; CPT=&gt;FV=17,531.17

**A is incorrect.** It is the future value of a lump sum amount and not an annuity.


1,000(1 + 0.10)^{10} = 2,593.74


**B is incorrect.** It is the future value of an ordinary annuity and not that of an annuity in advance as required by the question.

**CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.**

© 2014-2024 AnalystPrep.
Q.3407 Nathan Lewis is planning to subscribe to an investment plan which will generate a return of 5% and provide him with $2,000 at the end of each year for the next 5 years. However, due to financial constraints, he plans to subscribe to the investment plan in 2 years. The present value of the investment plan today is closest to:

A. $4,942.26
B. $8,246.62
C. $8,658.95

The correct answer is A.

The PV of the ordinary annuity after 2 years, when Lewis starts the investment plan, can be calculated as under:


\mathrm{N} = 3; \mathrm{I} / \mathrm{Y} = 5; \mathrm{PMT} = -2,000; \mathrm{FV} = 0

\mathrm{CPT} = \mathrm{PV} = \$5,446.52


However, this plan will start in 2 years. Assuming the rate of interest in these two years is 5%, the PV of the annuity today can be computed as:


\mathrm{PV} = \frac{\$5,446.52}{(1.05)^2} = \$4,942.26


A is incorrect. It is the present value of the annuity at time $t = 2$ and not at time $t = 0$.

C is incorrect. It is the present value of an annuity in advance, not of an ordinary annuity as required by the question, at time $t = 0$.

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

Q.3408 A construction company is bidding for a new project. The projected cash flows of the project for the next 2 years are given in the following exhibit.

Exhibit: Projected Cash Flows

| Year | Cash Flow |
| --- | --- |
| End of the 1st year | $100,000 |
| End of the 2nd year | $600,000 |

© 2014-2024 AnalystPrep.
If the company intends to generate a return of 10%, then the present value of the projected cash flows today is closest to:

A. $525,920.36
B. $578,512.40.
C. $586,776.86.

The correct answer is C.

The cash flows and the corresponding details are as given below:

| Year | Cash Flow | Time from Today |
| --- | --- | --- |
| End of the 1st year | $100,000 | 1 year |
| End of the 2nd year | $600,000 | 2 years |


\text{PV of } \$100,000 \text{ today} = \frac{\$100,000}{1.1} = \$90,909.09

\text{PV of } \$600,000 = \frac{\$600,000}{1.1^2} = \$495,867.77

\text{PV of combined cash flows} = \$90,909.09 + \$495,867.77 = \$586,776.86


We can also use the CF button of the BA II Plus Pro calculator to determine the present value of the cash flow.


\text{CF0} = 0\ \text{L},\ \text{CF1} = 100,000\ \text{ENTER}\ \text{L}\ \text{L};\ \text{CF2} = 600,000\ \text{ENTER}


Then press "CPT NPV" after inputting all CFs, then input I/Y=10 ENTER↓, press the "down arrow button", then finally press "CPT" to get the NPV.

**A is incorrect. It assumes the calculation as follows;**


\text{PV of } \$600,000 = \frac{\$700,000}{1.1^3} = \$525,920.36


**B is incorrect. It assumes the calculation as follows:**


\text{PV of } \$100,000 \text{ today} = \frac{\$100,000}{1.1^2} = \$82,644.63

\text{PV of } \$600,000 = \frac{\$600,000}{1.1^2} = \$495,867.77

\text{PV of combined cash flows} = \$82,644.63 + \$495,867.77 = \$578,512.40


**CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income**

© 2014-2024 AnalystPrep.
instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

Q.3409 A project manager is looking to fund his new project through bank borrowings. The new project requires a funding of $1,000,000, so the manager approaches a commercial bank. The bank is willing to fund the project at an interest rate of 3% and wants the firm to pay back the entire loan in 10 years in 10 equal payments. The yearly payment required to completely pay off the loan is closest to:

A. $101,380.15
B. $104,171.23.
C. $117,230.51.

The correct answer is C.

Using the financial calculator:

N=10; I/Y=3; PV=-1,000,000, FV=0
CPT = PMT = $117,230.51

A is incorrect. The amount assumes a monthly interest rate and not annual as follows.
N=10; I/Y=3/12=0.25; PV=-1,000,000, FV=0 CPT = PMT = $101,380.15

B is incorrect. The amount assumes a Quarterly interest rate and not annual as follows.
N=10; I/Y=3/4=0.75; PV=-1,000,000, FV=0 CPT = PMT = $104,171.23

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

Q.3410 Veronica Rose borrowed $5,000 from GRF Bank. The terms and conditions of the loan are given in the following exhibit.

Exhibit: GRF Bank - $5,000 Loan

© 2014-2024 AnalystPrep.
| Loan | Short Term |
| --- | --- |
| Amount | $5,000 |
| Tenure | 3 years |
| Payment | 3 equal payments |
| Rate | 3% |
| Prepayment Penalty | Nil |

If Rose decided to make a payment of $2,000 at the end of the 1st year, then the payments required for the remaining 2 years would be closest to:

A. $1,646.22
B. $1,676.22
C. $1,686.22

The correct answer is A.

The payments required to be made so that the loan is completely paid off in three years can be calculated as:

N=3; I/Y=3; FV= 0; PV=5000;

CPT = PMT = $1,767.65

The amortization schedule of the loan is:

| Year | Amount | Rate | Payment | Interest | Principal Payment | Principal Left |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | $5,000.00 | 3% | $1,767.65 | $150.00 | $1,617.65 | $3,382.35 |
| 2 | $3,382.35 | 3% | $1,767.65 | $101.47 | $1,666.18 | $1,716.17 |
| 1 | $1,716.17 | 3% | $1,767.65 | $51.49 | $1,716.17 | $0.00 |

However, since Rose makes a payment of $2,000 at the end of the 1st year:

| Year | Amount | Rate | Payment | Interest | Principal Payment | Principal Left |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | $5,000.00 | 3% | $2,000.00 | $150.00 | $1,850.00 | $3,150.00 |

Therefore, at the end of the 1st year, Rose needs to pay $3,150 in two years. The payment required to clear the remaining part of the loan can be computed as:

N = 2; I/Y = 3; FV= 0; PV = 3,150;

CPT = PMT = $1,646.22

© 2014-2024 AnalystPrep.
B is incorrect. It is the yearly mortgage payment that would have been made if she had not paid the 2,000 at the end of the first year.

C is incorrect. It is basically what remains after paying the 2,000, divided by 2, without factoring in interest payments.

CFA Level 1, Quantitative Methods, Learning Module 2: The Time Value of Money in Finance, LOS (b) Calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows.

© 2014-2024 AnalystPrep.
# Learning Module 3: Statistical Measures of Asset Returns

Q.102 Last year, the S&amp;P 500 has had the following returns: 2% in the first quarter, -3% in the second quarter, 5% in the third quarter, and 11% in the last quarter. The S&amp;P 500's yearly return is closest to:

A. 3.63%
B. 11.00%
C. 15.31%

The correct answer is A.

To calculate the annual return of the S&amp;P 500, we need to combine the quarterly returns. We can use the following formula to calculate the total return:


\text{Total Return} = (1 + Q_1 \text{Return}) \times (1 + Q_2 \text{Return}) \times (1 + Q_3 \text{Return})] \times (1 + Q_4 \text{Return}) - 1

\begin{array}{l}
\text{Yearly return} = [(1 + r_1)(1 + r_2) \dots (1 + r_n)]^{\frac{1}{8}} - 1 \\
= [(1 + 0.02)(1 - 0.03)(1 + 0.05)(1 + 0.11)]^{\frac{1}{4}} - 1 \\
= 0.0363 \approx 3.63\%
\end{array}


Q.235 Which of the following statements is most likely in a positively skewed distribution:

A. Mean = Median
B. Mode &gt; Median
C. Mean &gt; Median

The correct answer is C.

The mean is greater than the median for positively skewed distribution.

A is incorrect. The mean is greater than the mode in a positively skewed distribution.

B is incorrect. The median is greater than the mode in a positively skewed distribution.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

© 2014-2024 AnalystPrep.
Q.236 You are provided the following sample values:
{ 12, 7, 14, 11 }

The sample variance is closest to:

A. 5.20.
B. 6.50.
C. 8.67.

The correct answer is C.

We know that the sample variance is given by:


\begin{array}{l}
\text{Sample variance} = \sum \frac{(\mathrm{X} - \mathrm{E}(\mathrm{X}))^{2}}{\mathrm{n} - 1} \\
= \frac{(12 - 11)^{2} + (7 - 11)^{2} + (14 - 11)^{2} + (11 - 11)^{2}}{4 - 1} = 8.67
\end{array}


## Steps Using a financial Calculator

Set the calculator to "DATA" by pressing 2ND 7.

X01=12 ENTER↓↓, X02=7 ENTER↓↓, X03=14 ENTER↓↓, X04=11 ENTER 2ND QUIT

Set the calculator to "STAT" by pressing 2ND 8

↓↓↓ Sₓ = 2.9439

Square it to get the variance. 2.9439² = 8.67

For population variance, the value to be picked would have been σₓ.

A is incorrect. It assumes an (n+1) in the formula.

B is incorrect. It ignores the (n-1) in the formula.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
Q.410 Which one of the following statements is most likely accurate?

A. The geometric mean is always less than or equal to the arithmetic mean.
B. The geometric mean is always more than or equal to the arithmetic mean.
C. The geometric mean and the arithmetic mean are always equal.

The correct answer is A.

The only time the two means are equal is when there is no variability in the observation.

B is incorrect. The geometric mean may be less than or equal to the arithmetic mean but not more than the arithmetic mean.

C is incorrect. The geometric and arithmetic mean are not always equal. Sometimes, the arithmetic mean may be more than the geometric mean.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

© 2014-2024 AnalystPrep.
Q.778 Which of the following statements is most accurate if two securities are perfectly correlated?

A. Risk-return opportunity set will be represented by a straight line connecting these two securities.

B. Risk-return opportunity set will be represented by a curve bulging on the left.

C. Risk-return opportunity set will be represented by a curve bulging on the right.

The correct answer is A.

If two assets are perfectly correlated, the risk-return opportunity is represented by a straight line connecting these two assets. The line contains portfolios formed by changing the weight of each asset invested in the portfolio.

B is incorrect. The returns of the securities move together in the same direction and to the same extent, leaving no room for risk reduction through diversification.

C is incorrect. Proposing that the risk-return opportunity set will be represented by a curve bulging on the right is also incorrect for two perfectly correlated securities. A curve bulging to the right would suggest an inefficient risk-return trade-off, where increasing risk does not proportionately increase expected returns. However, in the case of perfect correlation, the risk-return trade-off is linear, as the returns of the two securities move in tandem, allowing for a predictable increase in expected returns with an increase in risk, represented by a straight line rather than a curve.

© 2014-2024 AnalystPrep.
Q.2686 The South Korea Stock Exchange posted returns of 10% for the past fiscal year. The 10 mutual funds in the same market underperformed and overperformed the South Korean market return at different scales. The following table shows the interval of returns under and above the South Korean market return, while the returns of mutual funds are -5.75%, -3.5%, -1.7%, 0.9%, 1.2%, 2.3%, 3.2%, 5.5%, 5.8%, and 6.25%.

| Interval | Values |
| --- | --- |
| A | (-5.75 to -2.75) |
| B | (-2.75 to 0.25) |
| C | (0.25 to 3.25) |
| D | (3.25 to 6.25) |

Using the given data, the relative frequency of Interval C is closest to:

A. 30%
B. 40%
C. 70%

The correct answer is B.

To solve this question we need to calculate the frequency distribution table as shown below. The relative frequency is calculated by dividing the absolute frequency of a specific interval by the number of observation.


\text{Relative frequency of Interval C} = \frac{\text{Absolute frequency}}{\text{Total number of observation}} = \frac{4}{10} = 40\%


| Intervals | Absolute Frequency | Relative Frequency (%) | Cumulative Frequency | Cumulative Relative Frequency |
| --- | --- | --- | --- | --- |
| A (-5.75 to -2.75) | 2 | 20.00% | 2 | 20.00% |
| B (-2.75 to 0.25) | 1 | 10.00% | 3 | 30.00% |
| C (0.25 to 3.25) | 4 | 40.00% | 7 | 70.00% |
| D (3.25 to 6.25) | 3 | 30.00% | 10 | 100.00% |

A is incorrect. The percentage relates to Absolute Frequency of Interval D as indicated above.

C is incorrect. The percentage represents Cumulative Relative Frequency of Interval C.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
Q.2688 Which of the following is the most appropriate example of the mean of time-series data?

A. The mean annual P/E ratio in the steel sector.

B. The mean profit margin of the Fast 500 companies in 2016.

C. The quarterly mean EPS of the technology sector for the last 10 years.

The correct answer is C.

Observation or data that spreads through time is called time-series data. Option C) is the most appropriate example of a mean of time series data as it calculates the mean EPS of the technology sector based on the quarterly EPS data that spread over 10 years.

A is incorrect. It represents cross-sectional data. Cross-sectional data is data that is collected by observing a number of subjects at one point in time. P/E ratio of the steel sector at a particular point in time represents cross-sectional data.

B is incorrect. It represents the mean of cross-sectional data, not time series data.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

Q.2689 MZJ Corp. is the market leader firm in the consultancy business. The data related to daily share price for the month of February 2015 is provided in the following table.

© 2014-2024 AnalystPrep.
| Date | High Price ($) | Close Price ($) |
| --- | --- | --- |
| Monday, February 02, 2015 | 19.15 | 19.01 |
| Tuesday, February 03, 2015 | 19.27 | 19.10 |
| Wednesday, February 04, 2015 | 19.30 | 19.27 |
| Thursday, February 05, 2015 | 20.10 | 19.50 |
| Friday, February 06, 2015 | 21.00 | 20.75 |
| Monday, February 09, 2015 | 21.00 | 19.80 |
| Tuesday, February 10, 2015 | 20.00 | 18.97 |
| Wednesday, February 11, 2015 | 19.00 | 18.50 |
| Thursday, February 12, 2015 | 18.50 | 17.95 |
| Friday, February 13, 2015 | 19.50 | 18.00 |
| Monday, February 16, 2015 | 18.20 | 17.44 |
| Tuesday, February 17, 2015 | 17.46 | 17.40 |
| Wednesday, February 18, 2015 | 17.20 | 16.99 |
| Thursday, February 19, 2015 | 18.00 | 17.95 |
| Friday, February 20, 2015 | 19.00 | 18.75 |
| Monday, February 23, 2015 | 20.10 | 19.55 |
| Tuesday, February 24, 2015 | 19.60 | 19.55 |
| Wednesday, February 25, 2015 | 21.00 | 20.75 |
| Thursday, February 26, 2015 | 21.00 | 19.91 |
| Friday, February 27, 2015 | 20.20 | 19.25 |

Using the given data, the arithmetic mean of the 'high price' of MZJ stock for the month of February is closest to:

A. $13.87.
B. $18.92.
C. $19.43.

The correct answer is C.

The mean of the high prices of MZJ shares for the month of February is calculated as


\frac {\text {Sum of observation (high prices)}}{\text {Number of observation}} = \frac {88.58}{20} = 19.43 \text {(as calculated in the following table)}


© 2014-2024 AnalystPrep.
| Date | High Price ($) | Close Price ($) Sorted Ascending |
| --- | --- | --- |
| Wednesday, February 18, 2015 | 17.20 | 16.99 |
| Tuesday, February 17, 2015 | 17.46 | 17.40 |
| Monday, February 16, 2015 | 18.20 | 17.44 |
| Thursday, February 19, 2015 | 18.00 | 17.95 |
| Thursday, February 12, 2015 | 18.50 | 17.95 |
| Friday, February 13, 2015 | 19.50 | 18.00 |
| Wednesday, February 11, 2015 | 19.00 | 18.50 |
| Friday, February 20, 2015 | 19.00 | 18.75 |
| Tuesday, February 10, 2015 | 20.00 | 18.97 |
| Monday, February 02, 2015 | 19.15 | 19.01 |
| Tuesday, February 03, 2015 | 19.27 | 19.10 |
| Friday, February 27, 2015 | 20.20 | 19.25 |
| Wednesday, February 04, 2015 | 19.30 | 19.27 |
| Thursday, February 05, 2015 | 20.10 | 19.50 |
| Monday, February 23, 2015 | 20.10 | 19.55 |
| Tuesday, February 24, 2015 | 19.60 | 19.55 |
| Monday, February 09, 2015 | 21.00 | 19.80 |
| Thursday, February 26, 2015 | 21.00 | 19.91 |
| Friday, February 06, 2015 | 21.00 | 20.75 |
| Wednesday, February 25, 2015 | 21.00 | 20.75 |
| Sum of High Prices | $388.58 | |
| Arithmetic Mean | $19.43 | |

A is incorrect. It is the sum of observations, and not the mean, of "high price."

B is incorrect. It is the arithmetic mean of "close price," as shown in the table above.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

© 2014-2024 AnalystPrep.
Q.2691 The data related to the hypothetical sovereign debt rating of Latin American countries is provided below:

| Country | Sovereign Debit Rating |
| --- | --- |
| Bolivia | BB- |
| Brazil | BB+ |
| Chile | AA- |
| Colombia | BBB+ |
| Costa Rica | BB |
| Dominican Republic | BB- |
| Ecuador | B |
| Mexico | BBB+ |
| Panama | BBB |
| Peru | AA |
| Uruguay | BBB- |
| Venezuela | CCC |

The data related to the sovereign debt rating is most likely:

A. bimodal.
B. trimodal.
C. unimodal.

The correct answer is A.

A mode is the most frequently occurring value in the data set. In the given question, the sovereign debt ratings of BB- and BBB+ are occurring twice while all other ratings are occurring once. Therefore, the data is bimodal because the data has two modes.

B is incorrect. A trimodal data will have three modes.

C is incorrect. A unimodal data will have only one mode.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

Q.2693 The data pertaining to the profit margin of Gecko Inc. from 1990 to 1995 is provided in the following table.

© 2014-2024 AnalystPrep.
| Year | Profit Margin (%) |
| --- | --- |
| 1990 | 11% |
| 1991 | 15% |
| 1992 | 5% |
| 1993 | 9.50% |
| 1994 | 15% |
| 1995 | 17% |

Using the given data, which of the following statements is least likely correct?

A. The median profit margin lies between 1992 and 1993.
B. The median profit margin of Gecko Inc. falls between 1990 and 1991.
C. The median profit margin of Gecko Inc. is more than the mean return.

The correct answer is A.

To find the median profit margin, it is required to arrange the data in ascending order as shown in the table below. Since the sample data has an even number of observations the median profit margin will fall between the $n/2 = 6/2 = 3$ rd and $(n+2)/2 = 8/2 = 4$ th observation. Therefore, option A) is LEAST likely correct.

| Year | Profit Margin (%) Ascending Order |
| --- | --- |
| 1992 | 5% |
| 1993 | 9.50% |
| 1990 | Median: 11% |
| 1991 | Median: 15% |
| 1994 | 15% |
| 1995 | 17% |

B is incorrect. It is a true statement. The median return of Gecko Inc falls between 1990 and 1991, as seen in the table above.

C is incorrect. It is a true statement. The median return of Gecko Inc is greater than its mean return. The mean return of Gecko Inc is


\frac{5\% + 9.5\% + 11\% + 15\% + 15\% + 17\%}{6} = 12.08\%


while the median return of Gecko Inc is


\frac{11\% + 15\%}{2} = 13\%.


© 2014-2024 AnalystPrep.
CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

Q.2694 Smith Hermes is a portfolio manager that invests in small cap stocks that are subject to mergers and acquisitions. The asset allocation and the return data of Smith's portfolio are provided in the following table. Using the given data, the deviation of the weighted average (mean) return from the arithmetic mean return of the portfolio will be closest to:

| Asset | Asset Return | Asset Allocation |
| --- | --- | --- |
| Solar Panel Corp. | 21% | 13% |
| Crowd fund Inc. | 17.50% | 24% |
| Peer-Loaning Co. | -11% | 27% |
| Dimitri Bogus Ltd. | -9% | 17% |
| Hanover Corp. | 27% | 19% |

A. The weighted average mean deviates by -1.54%
B. The weighted average mean deviates by 7.80%
C. The weighted average mean deviates by 1.21%

The correct answer is A.

Weighted average return on each asset = Weight of asset × Return of asset

Note the above formula has been used in the following table. We then sum up the individual weighted means of all the assets to get the weighted mean of the portfolio

Deviation of the weighted average mean = Weighted average mean - Arithmetic mean return from the arithmetic mean return


\begin{array}{l}
= 7.56\% - 9.10\% \\
= -1.54\%
\end{array}


| Asset | Asset Return | Asset Allocation | Weighted Avg. |
| --- | --- | --- | --- |
| Solar Panel Corp. | 21% | 13% | 2.73% |
| Crowd fund Inc. | 17.50% | 24% | 4.20% |
| Peer-Loaning Co. | -11% | 27% | -2.97% |
| Dimitri Bogus Ltd. | -9% | 17% | -1.53% |
| Hanover Corp. | 27% | 19% | 5.13% |
| Arithmetic Mean | 9.10% | | |
| Weighted Average Mean | 7.56% | | |

© 2014-2024 AnalystPrep.
Note the arithmetic and weighted average mean is calculated as:


\text{Weighted Average mean} = \frac{(21\% \times 13\%)}{100\%} + \frac{(17.5\% \times 24\%)}{100\%} + \frac{(-11\% \times 27\%)}{100\%} + \frac{(-9\% \times 17\%)}{100\%} + \frac{(27\% \times 100\%)}{100\%} = 7.56\%

\text{Arithmetic mean} = \frac{21\% + 17.5\% + (-11\%) + (-9\%) + 27\%}{5} = 9.10\%


**B is incorrect.** It indicates the Weighted Average Mean.

**C is incorrect.** It indicates the Arithmetic Mean.

**CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.**

© 2014-2024 AnalystPrep.
Q.2696 Jennifer Hollanda is a long-term trader who purchased a Petro Co. share at the price of $50 at the beginning of the year. Assuming that the price of the share increased to $100 in Year 1, decreased to $50 in year 2, decreased to $25 in year 3 and increased to $50 in year 4, the geometric mean return of the Petro Co. share is closest to:

A. -50%
B. 0%
C. 100%

The correct answer is B.

Return for year 1: $\frac{100}{50} - 1 = 100\%$

Return for year 2: $\frac{20}{100} - 1 = -50\%$

Return for year 3: $\frac{25}{50} - 1 = -50\%$

Return for year 4: $\frac{50}{25} - 1 = 100\%$

Before we find the geometric mean, we must convert the percentage rates of return to $(1 + R_{t})$.

Year 1: = 1 + 100% = 2

Year 2: = 1 - 50% = 0.5

Year 3: = 1 - 50% = 0.5

Year 4: = 1 + 100% = 2


\text{Geometric mean} = (2 \times 0.5 \times 0.5 \times 2)^{\frac{1}{4}} - 1 = 0\%


A is incorrect. It indicates the returns for years 2 and 3, respectively.

C is incorrect. It indicates the returns for years 1 and 4, respectively.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

© 2014-2024 AnalystPrep.
Q.2698 After the 2008 financial crisis, the emerging market economies have demonstrated tremendous GDP growth. The following table contains the hypothetical GDP of 10 emerging markets.

| Emerging Markets | GDP (Trillion USD) |
| --- | --- |
| Taiwan | 1.1 |
| Thailand | 1.1 |
| Pakistan | 1.3 |
| Iran | 1.4 |
| Turkey | 1.5 |
| Saudi Arabia | 1.6 |
| Korea | 1.8 |
| Mexico | 2.2 |
| Indonesia | 2.8 |
| Brazil | 3.2 |

Using the given data, the 60th percentile of emerging markets GDP is closest to:

A. USD 6.6 trillion
B. USD 2.68 trillion
C. USD 1.72 trillion

The correct answer is C.

Since $n = 10$, then


60\text{th percentile} = (n + 1) \times \frac{L}{100} = (10 + 1) \times \frac{60}{100} = 6.6


The $X_6 = 1.6$ and $X_7 = 1.8$. Therefore


\text{Estimated 60th percentile} = X_6 + 0.6(X_7 - X_6) = 1.6 + 0.6 \times (1.8 - 1.6) = 1.72


A is incorrect. It indicates the approximate value of a percentile.

B is incorrect. It indicates the arithmetic mean of the resulting GDPs.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

Q.2699 Muller Investments has been investing in Curex Pharma for the last 6 years. The returns

© 2014-2024 AnalystPrep.
of Curex Pharma's shares are provided in the following table:

| Year | Returns |
| --- | --- |
| 2001 | 45% |
| 2002 | 29% |
| 2003 | -16% |
| 2004 | -9% |
| 2005 | 13% |
| 2006 | 16% |

Given the information, the mean absolute deviation (MAD) of the returns of Curex Pharma over the 6-year period is closest to:

A. $13\%$
B. $17\%$
C. $61\%$

The correct answer is B.

Recall that:


\mathrm {M A D} = \frac {\sum_ {\mathrm {i} = 1} ^ {\mathrm {n}} \left| \mathrm {X} _ {\mathrm {i}} - \hat {\mathrm {X}} \right|}{\mathrm {n}}


The calculation of the mean absolute deviation of Curex Pharma returns are provided in the following table:

| Year | Returns | [Xi - X̄] |
| --- | --- | --- |
| 2001 | 45% | [45% - 13%] |
| 2002 | 29% | [29% - 13%] |
| 2003 | -16% | [-16% - 13%] |
| 2004 | -9% | [-9% - 13%] |
| 2005 | 13% | [13% - 13%] |
| 2006 | 16% | [16% - 13%] |
| Arithmetic Mean | 78%/6 = 13% | Total = 102% |
| MAD | 102%/6 = 17% | |

A is incorrect. It denotes the Arithmetic Mean and not MAD.

C is incorrect. It represents the range of the returns.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset

© 2014-2024 AnalystPrep.
Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
Q.2700 Muller Investments has been investing in Curex Pharma for the last 6 years. The returns of Curex Pharma's shares are provided in the following table. As an analyst, the variance of the returns is closest to:

| Year | Returns |
| --- | --- |
| 2001 | 45% |
| 2002 | 29% |
| 2003 | -16% |
| 2004 | -9% |
| 2005 | 13% |
| 2006 | 16% |

A. $5.23\%$
B. $13.00\%$
C. $17.00\%$

The correct answer is A.

The calculation of the Mean Absolute Deviation of the share's returns are provided in the following table:

| Year | Returns | Return - Arithmetic Mean | Variance |
| --- | --- | --- | --- |
| 2001 | 45% | |45% - 13%| | (45% - 13%)2 |
| 2002 | 29% | |29% - 13%| | (29% - 13%)2 |
| 2003 | -16% | |-16% - 13%| | (-16% - 13%)2 |
| 2004 | -9% | |-9% - 13%| | (-9% - 13%)2 |
| 2005 | 13% | |13% - 13%| | (13% - 13%)2 |
| 2006 | 16% | |16% - 13%| | (16% - 13%)2 |
| Arithmetic Mean | 78%/6 = 13% | | |
| MAD | 102%/6 = 17% | | |
| Variance | 0.2614/5 = 5.23% | | |

B is incorrect. It denotes the Arithmetic Mean.

C is incorrect. It denotes the mean absolute deviation (MAD).

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
Q.2751 The continuous compounded daily return of Galata Corp's shares is given in the following table. The standard deviation of share returns during this four-day period is closest to:

| Date | Compounded Daily Return |
| --- | --- |
| 2-Jan-14 | 0.0298 |
| 15-Jan-14 | 0.0132 |
| 5-Feb-14 | -0.0202 |
| 8-Mar-14 | -0.0300 |

A. -0.18%
B. 2.43%
C. 5.89%

The correct answer is B.

First, we calculate the mean return of the population in percentages as:


\mu = \frac{2.98\% + 1.32\% - 2.02\% - 3.00\%}{4} = -0.18\%


Then, we calculate the variance and standard deviation:


\begin{array}{l}
\sigma^{2} = \frac{\sum (\chi_{i} - \mu)^{2}}{N} \\
= \frac{(2.98 - (-0.18))^{2} + (1.32 - (-0.18))^{2} + (-2.02 - (-0.18))^{2} + (-3.00 - (-0.18))^{2}}{4} \\
= 5.8934 \\
\end{array}

\begin{array}{l}
\Rightarrow \sigma = \sqrt{5.8934} \\
\approx 2.43\%
\end{array}


A is incorrect. It denotes the value of the mean in the above calculation. C is incorrect. It denotes the value of the variance in the above calculation.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3429 Which of the following is least likely accurate regarding frequency distributions?

A. Risk managers can use frequency distributions to find out tail events.

B. While constructing a frequency distribution, an observation can fall in more than one interval.

C. A frequency distribution can help in identifying whether the distribution is evenly distributed or lopsided.

The correct answer is B.

Frequency distribution displays the observations falling in a particular interval. Hence, frequency distributions help risk managers find out the frequency of a particular tail event. As it shows the frequency at which observations occur, it can be useful in identifying whether the distribution is evenly distributed or lopsided. However, an observation can fall in only one interval.

A is incorrect. Frequency distribution displays the observations falling in a particular interval. Hence, frequency distributions help risk managers find out the frequency of a particular tail event.

C is incorrect. As it shows the frequency at which observations occur, it can be useful in identifying whether the distribution is evenly distributed or lopsided.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3431 Consider the following statements:

I. The geometric mean is always greater or equal to the arithmetic mean.
II. The geometric mean measures the compounded rate of return.
III. If the returns in a data set have no volatility, then the geometric mean is equal to the arithmetic mean.

Which of these statements is/are most accurate?

A. I, II &amp; III.
B. I &amp; II only.
C. II &amp; III only.

The correct answer is C.

Statement I is incorrect. The geometric mean is always smaller or equal to the arithmetic mean.

Statement II is correct. The geometric mean measures the compounded rate of return.

Statement III is correct. If the returns in a data set have no volatility (volatility = 0), then the geometric mean is equal to the arithmetic mean.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

Q.3432 The returns generated by a sample of five stocks from the Karachi Stock Exchange are given in the exhibit below.

Exhibit: Karachi Stock Exchange Returns - Sample of 5 Stocks

| Stock | Return |
| --- | --- |
| A | 12% |
| B | 13% |
| C | 5% |
| D | 4% |
| E | 20% |

The standard deviation is closest to:

A. 5.84%

© 2014-2024 AnalystPrep.
B. $6.53\%$
C. $10.80\%$

The correct answer is B.

Mean $= (0.12 + 0.13 + 0.05 + 0.04 + 0.2) / 5 = 0.108$

| Stock | Return | X - Mean | X - Mean2 |
| --- | --- | --- | --- |
| A | 12% | 1.2% | 0.000144 |
| B | 13% | 2.2% | 0.000484 |
| C | 5% | -5.8% | 0.003364 |
| D | 4% | -6.8% | 0.004624 |
| E | 20% | 9.2% | 0.008464 |
| Total | | | 0.017080 |

Sample deviation $= \left(\frac{0.017080}{4}\right)^{\frac{1}{2}} = 6.53\%$

Note: The standard deviation calculated with a divisor of $n - 1$ is a standard deviation calculated from the sample as an estimate of the standard deviation of the population from which the sample was drawn.

Steps using the financial calculator. Set the calculator to "DATA" by pressing 2ND 7.

X01=12 ENTER↓↓, X02=13 ENTER↓↓, X03=5 ENTER↓↓, X04=4 ENTER, X05=20 ENTER↓↓

2ND QUIT

Set the calculator to "STAT" by pressing 2ND 8

$\downarrow \downarrow \downarrow S_{x} = 6.53.$

If the data was for a population and not for a sample, the value to be picked would have been $\sigma_{\mathrm{x}} = 5.845$

A is incorrect. It denotes the value of the population and not a sample.

C is incorrect. It denotes the mean.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3436 For a unimodal positively skewed distribution:

A. Mode &lt; Median &lt; Mean.
B. Median &lt; Mode &lt; Mean.
C. Mean &lt; Median &lt; Mode.

The correct answer is A.

For a positively skewed distribution that only has one mode, Mode &lt; Median &lt; Mean.

B is incorrect. For a positively skewed distribution the median is always greater than the mode.

C is incorrect. For a positively skewed distribution the mean is always greater than both the Median and the Mode.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (c) Interpret and evaluate measures of skewness and kurtosis to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3484 A research analyst has compiled the yearly returns of AZN stock in the following exhibit.

Exhibit: AZN Stock - Yearly Returns


12\% \mid 10\% \mid 4\% \mid 16\% \mid 18\% \mid 15\% \mid 25\% \mid 20\%


The second quartile of the distribution of returns is closest to:

A. 15%
B. 15.50%.
C. 16%.

The correct answer is B.

Second quartile is the point below which 50% of the observations lie.


L_y = (n + 1) \times \frac{y}{100}


As per the formula, the point can be identified as:


\text{Point} = (\text{No. of observations} + 1) \times \left(\frac{50}{100}\right) = (8 + 1) \times \left(\frac{50}{100}\right) = 4.5


The second step is to arrange the observations in ascending order:

4%, 10%, 12%, 15%, 16%, 18%, 20%, 25%

The 4th observation = 15%

The 5th observation = 16%

The second quartile lies between 15% and 16%, therefore the second quartile = 15.50%

A is incorrect. It represents the 4th observation.

C is incorrect. It represents the 5th observation.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3485 The annual returns of a fund of funds is given in the exhibit below.

Exhibit: Annual Returns - Fund of Funds

| Portfolio | Annual Return |
| --- | --- |
| Fund A | 12% |
| Fund B | 15% |
| Fund C | -5% |
| Fund D | 5% |

The mean absolute deviation (MAD) of the returns generated by the four funds is closest to:

A. 5.25%
B. 6.75%
C. 11.75%

The correct answer is B.


\text{Mean return} = \frac{(12\% + 15\% - 5\% + 5\%)}{4} = 6.75\%


Absolute difference from each individual observation:

| Portfolio | Difference from Mean |
| --- | --- |
| Fund A | 12% - 6.75%| = 5.25% |
| Fund B | 15% - 6.75%| = 8.25% |
| Fund C | -5% - 6.75%| = 11.75% |
| Fund D | 5% - 6.75%| = 1.75% |

We know that:


\begin{array}{l}
\mathrm{MAD} = \frac{\sum |\mathrm{X}_i - \hat{\mathrm{X}}|}{\mathrm{n}} \\
= \frac{(5.25\% + 8.25\% + 11.75\% + 1.75\%)}{4} = 6.75\%
\end{array}


A is incorrect. It depicts the difference from mean for Fund A.

C is incorrect. It depicts the difference from mean for Fund C.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset

© 2014-2024 AnalystPrep.
Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

Q.3486 A leptokurtic distribution is most likely defined as:

A. more peaked than a normal distribution.
B. a less peaked than a normal distribution.
C. similarly peaked to a normal distribution.

The correct answer is A.

A leptokurtic distribution is more peaked than a normal distribution.
A platykurtic distribution is less peaked than a normal distribution.

A mesokurtic distribution is similarly peaked as a normal distribution.

B is incorrect. A distribution that is less peaked than normal is known as a platykurtic distribution.

C is incorrect. A distribution that is similarly peaked to a normal distribution is known as a mesokurtic distribution.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (c) Interpret and evaluate measures of skewness and kurtosis to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3504 If a security has a mean expected return of 7% and a standard deviation of 0.005, its coefficient of variation is closest to:

A. 0.00035.
B. 0.0714.
C. 14.

The correct answer is B.


\text{Coefficient of variation} = \frac{(\text{Std. deviation})}{(\text{Mean})} = \frac{0.005}{0.07} = 0.0714


A is incorrect. It results in the multiplication of the mean expected return and the standard deviation.

C is incorrect. It results in the division of the mean expected return and the standard deviation.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3505 Which of the following statements is most accurate?

Skewness refers to the extent the distribution is:

A. symmetrical. In negatively skewed distributions, the mean is to the left of the peak.
B. non-symmetrical. In the left-skewed distribution, the mean is to the left of the peak.
C. non-symmetrical. In negatively skewed distributions, the mean is to the right of the peak.

The correct answer is B.

Skewness is an asymmetry in a statistical distribution. It can be quantified to define the extent to which a distribution differs from a normal distribution.

A left-skewed distribution is called a negatively skewed distribution because its long tail is in the negative direction on a number line. The peak of the distribution is what defines "peakness." A peak that tends to the left is left-skewed distribution.

A is incorrect. In symmetrical distributions, the mean is to the center of the distributions.

C is incorrect. In a non-symmetrical distribution, the mean is to the left of the peak.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (c) Interpret and evaluate measures of skewness and kurtosis to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3506 An equity analyst's performance measurement is linked with its historical returns generated by his investment decisions. The best way to measure the returns is the:

A. geometric mean.
B. arithmetic mean.
C. Both will provide the same result.

The correct answer is A.

The geometric mean captures how the total returns are linked over time. Hence, for measuring historical return, a geometric mean must be used.

B is incorrect. The arithmetic mean is mostly used to predict future performances.

C is incorrect. Geometric mean is best used to determine past performance, while arithmetic mean is best used to predict future performance. The two do not necessarily provide the same answer.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3721 Which of the following best describes the concept of skewness in statistics?

A. The degree to which a distribution is symmetric about its mean.
B. The degree to which a distribution is nonsymmetric about its mean.
C. The degree to which a distribution is nonsymmetric about its median.

The correct answer is B.

Skewness in statistics describes the asymmetry from the normal distribution in a set of data. Such a dataset differs from a normal curve which is bell-shaped and perfectly symmetrical. In layman's language, a symmetrical curve can be divided into two equal halves with the mean in the middle. When this is not possible, the curve (and the underlying data) is said to be skewed. A distribution can either be positively or negatively skewed, depending on where there is a higher concentration of data points.

A is incorrect. Skewness relates to the degree of non-symmetry and not to the degree of symmetry. The skewness in a symmetrical distribution is zero.

C is incorrect. A distribution is symmetric about its mean and not its median.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (c) Interpret and evaluate measures of skewness and kurtosis to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3722 Which of the following statements is least accurate about kurtosis?

A. Excess kurtosis that's positive indicates a leptokurtic distribution.
B. Excess kurtosis that's negative indicates a platykurtic distribution.
C. Excess kurtosis is a measure relative to the normal distribution, which has a kurtosis of 1.

The correct answer is C.

Statement C is the least likely true statement. Kurtosis basically measures the peakedness of a distribution. Data sets with high kurtosis tend to have many data points at the tails (outliers). Kurtosis is measured relative to the normal distribution, which has a kurtosis of exactly 3.

A is incorrect. It is a true statement. Positive excess kurtosis (&gt;3) indicates a leptokurtic distribution.

B is incorrect. It is a true statement. Excess kurtosis that is negative (&lt; -3) indicates a platykurtic distribution.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (c) Interpret and evaluate measures of skewness and kurtosis to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3723 Mary Noel, CFA, is tasked with analyzing the returns of two different assets - A and B. She finds that the two assets have the same mean, variance, and skewness, but A has a higher kurtosis than B. Which of the following statements is most likely true?

A. Asset B is riskier than asset A.
B. Asset A is riskier than asset B.
C. We cannot conclude anything based on the given information.

The correct answer is B.

In finance, Kurtosis affects the riskiness of an asset. The asset with a higher kurtosis is considered riskier than the one with a lower kurtosis. The underlying logic is that a high kurtosis indicates a high number of outliers, meaning that the return for such an asset is highly variable, and therefore highly risky.

A is incorrect. The higher the kurtosis, the riskier the asset. Asset A is riskier than asset B since it has a higher kurtosis.

C is incorrect. Kurtosis can help analysts deduce the riskiness of an asset. A higher kurtosis implies higher risk.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (c) Interpret and evaluate measures of skewness and kurtosis to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3736 At a certain investment firm, each of the firm's 5 managers is tasked with overseeing a project. During a given one-year period, the managers reported the following individual returns from their projects:

[24%, 26%, 30%, 18%, 20%]

The population variance of these returns is closest to:

A. 0.182%.
B. 0.228%.
C. 0.236%.

The correct answer is A.

Note that the data given is comprised of the entire population and NOT a sample. As such, we should use the formula for calculating the population variance. We know that


\sigma^2 = \frac{\sum (X_i - \mu)^2}{N}


where N is the size of the population and


\mu = \frac{(0.24 + 0.26 + 0.30 + 0.18 + 0.20)}{5} = 0.236


Thus,


\sigma^2 = \frac{[(0.24 - 0.236)^2 + (0.26 - 0.236)^2 + (0.30 - 0.236)^2 + (0.18 - 0.236)^2 + (0.20 - 0.236)^2]}{5} = \frac{0.000016 + 0.000576 + 0.004096 + 0.003136 + 0.001296}{5} = 0.001824 = 0.1824\%


Note: Had we been given sample data, the formula for the mean would remain unchanged but when calculating the variance, we would divide the sum of squared deviations by (n - 1) to remove bias.

B is incorrect. It represents the sample size variance.

C is incorrect. It represents the population mean.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3987 Consider the following annual returns of a stock for a period of 10 years:
{ 15%, 17%, 12.5%, 16%, 13.6%, 19%, 14.6%, 10%, 11%, 16% } The population mean is closest to:

A. 14.47%.
B. 14.80%.
C. 14.82%.

The correct answer is A.

The population mean is determined as follows;


\text{Population mean} = \frac{0.15 + 0.17 + 0.125 + 0.16 + 0.136 + 0.19 + 0.146 + 0.1 + 0.11 + 0.16}{10} = 14.47\%


B is incorrect. It assumes a sample mean for the first 5 years as follows:


\text{Sample Mean} = \frac{0.15 + 0.17 + 0.125 + 0.16 + 0.136}{5} = 14.82\%


C is incorrect. It assumes the median values as follows:
Rearranging the values in an ascendind order: 10%, 11%, 12.5%, 13.6%, 14.6%, 15%, 16%, 16%, 17%, 19%. So that the media is given by:


\text{Median Value} = \frac{0.146 + 0.15}{2} = 14.80\%


CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (a) Calculate, interpret, and evaluate measures of central tendency and location to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3988 In kurtosis, the distribution that has thinner tails than the normal distribution is best described as:

A. leptokurtic.
B. mesokurtic.
C. platykurtic.

The correct answer is C.

Platykurtic, also known as thin tailed, is the distribution that has thinner tails (lower peak) than the normal distribution.

![img-0.jpeg](img-0.jpeg)

A is incorrect. Leptokurtic distribution has fatter tails (more peaked) than the normal distribution and is also referred to as fat-tailed distribution.
B is incorrect. Mesokurtic distribution refers to distribution like the normal distribution concerning relative weight in the tails.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (c) Interpret and evaluate measures of skewness and kurtosis to address an investment problem.

© 2014-2024 AnalystPrep.
Q.3989 Given two variables, X and Y, variable X has a mean of -0.87, with variable Y having a mean of 0.46, and a negative covariance exists between the two variables. The correlation between variables X and Y is most likely:

A. zero.
B. negative.
C. positive.

The correct answer is B.

Covariance is a measure of the relationship between two variables. A positive covariance indicates that the variables tend to move in the same direction, while a negative covariance indicates that the variables tend to move in opposite directions.

Correlation is a standardized measure of the relationship between two variables. It ranges from -1 to 1, with a value of 1 indicating a perfect positive correlation, a value of -1 indicating a perfect negative correlation, and a value of 0 indicating no correlation.

Since we know that the covariance between variables X and Y is negative and a negative covariance indicates a negative correlation, it is most likely that the correlation between variables X and Y is negative. Therefore, the correct answer is (B) negative.

A is incorrect. If two variables have zero correlation, it indicates that they're not related in any way.

C is incorrect. A positive correlation and covariance for two variables exist when both variables are above or below their means.

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

Q.3991 Consider the following returns of a portfolio.

| Month | Return (%) |
| --- | --- |
| Jan | 6 |
| Feb | 4 |
| Mar | -2 |
| Apr | -5 |

The target downside deviation when the target return is 4% is closest to:

A. 6.24%

© 2014-2024 AnalystPrep.
B. 7.51%
C. 8.66%

The correct answer is A.


S_{\text{Target}} = \frac{\sum_{F_{\text{or all}} X_i \leq B}^{n} \frac{(X_i - B)^2}{n - 1}}{n}


Where;

B = The target

n = Total number of sample observation

The calculation can be summarized in the table below;

| Month | Observation | Deviation from 4% target | Deviations below the target | Squared de |
| --- | --- | --- | --- | --- |
| Jan | 6 | 2 | 0 | |
| Feb | 4 | 0 | 0 | |
| Mar | -2 | -6 | -6 | |
| Apr | -5 | -9 | -9 | |

Target semi-deviation = $\sqrt{\frac{117}{4 - 1}} = 6.24\%$

B is incorrect. It assumes the total sum of the deviation from the 4% target in the calculation as follows;

Target semi-deviation = $\sqrt{\frac{-13^2}{4 - 1}} = 7.51\%$

C is incorrect. It assumes the total sum of the deviations below the target is squared as follows;

Target semi-deviation = $\sqrt{\frac{-15^2}{4 - 1}} = 8.66\%$

CFA Level 1, Quantitative Methods, Learning Module 3: Statistical Measures of Asset Returns, LOS (b) Calculate, interpret, and evaluate measures of dispersion to address an investment problem.

© 2014-2024 AnalystPrep.
112
© 2014-2024 AnalystPrep.

# Learning Module 4: Probability Trees and Conditional Expectations

Q.300 An investor owns shares of both Apple and Microsoft. He assumes that the probability of Apple's share price declining by more than 5% this year is 0.4, while the probability of Microsoft's share price declining by more than 5% is 0.3. The probability that either Apple or Microsoft's share prices will decline in price by more than 5% this year is closest to:

A. 0.12
B. 0.58
C. 0.70

The correct answer is B.

These are non-mutual exclusive events. The probability of Apple's share price declining is not in any way dependent on the probability of Microsoft's share declining. Both events can occur simultaneously.

For non-mutual exclusive events, the probability that either event will happen is given by the formula:


\mathrm{P(A\ or\ B)} = \mathrm{P(A)} + \mathrm{P(B)} - \mathrm{P(AB)}

\mathrm{P(AB)} = \mathrm{P(A)} \times \mathrm{P(B)}

\Rightarrow \mathrm{P(A\ or\ B)} = 0.4 + 0.3 - (0.4 \times 0.3) = 0.58


A is incorrect. This is illustrated in the below workings.


\mathrm{P(AB)} = \mathrm{P(A)} \times \mathrm{P(B)} = 0.4 \times 0.3 = 0.12


C is incorrect. This is illustrated in the below workings.


\mathrm{P(AB)} = \mathrm{P(A)} + \mathrm{P(B)} = 0.4 + 0.3 = 0.70


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.
Q.310 Suppose A and B are mutually exclusive events, and P(A)=0.2, P(B)=0.5. The probability P(A and B) is closest to:

A. 0
B. 0.01
C. 0.7

The correct answer is A.

If two events, A and B, are mutually exclusive, only one of the events can occur at any particular time. The two events cannot both occur at the same time.

The probability of occurring of 2 mutually exclusive events is 0.

B is incorrect. It assumes that both events occur at the same time (0.2*0.5)

C is incorrect. It assumes that P(A and B) = 0.2 + 0.5 = 0.7

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.313 You own shares of Corp. A and Corp.B. You think that the probability of Corp. A to go bankrupt this year is 0.15, and Corp.B to go bankrupt is 0.25. The companies going bankrupt are independent of each other. The probability that at least one of these two companies will go bankrupt this year is closest to

A. 0.0375
B. 0.3625
C. 0.4

The correct answer is B.

From the information given,


\begin{array}{l}
P(A \text{ or } B) = P(A) + P(B) - P(AB) \\
= P(A) + P(B) - P(A) \times P(B) \\
= 0.15 + 0.25 - 0.15 \times 0.25 \\
= 0.3625
\end{array}


A is incorrect. It denotes the probability calculation as $(0.15*025)$.

C is incorrect. It denotes the probability calculation as $(0.15+0.25)$.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.412 There is a 40% chance that the economy keeps sinking into recession next year and a 60% chance that it will rebound. If the economy rebounds, Company ABC will hire 2,000 employees. If the economy keeps sinking, there is an 80% probability that it will cut 1,000 jobs and a 20% chance to go bankrupt and cut 9,000 jobs. The firm's expected job hires/cut is closest to:

A. -2,600 employees
B. +160 employees
C. +2,000 employees

The correct answer is B.

From the information given in the question, denote the expected job hires/cut by X so that:


\begin{array}{l}
X = (0.6 \times 2,000) + 0.4 \times ((0.8 \times -1,000) + (0.2 \times -9,000)) \\
= 1,200 + 0.4 \times (-800 + -1,800) \\
= 1,200 + 0.4 \times 2,600 \\
= 1,200 - 1,040 \\
= 160 \\
\end{array}


A is incorrect. It results from $(80\% \times -1,000 + 20\% \times 9,000)$.

C is incorrect. It assumes the company will hire 2,000 employees.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (a) Calculate expected values, variances, and standard deviations and demonstrate their application to investment problems.

© 2014-2024 AnalystPrep.
Q.415 You have been given the following probabilities:

P(A) = 35%
P(B) = 65%
P(B | A) = 65%

The probability that Event A and Event B occur is closest to:

A. 22.75%
B. 35%
C. 65%

The correct answer is A.

Since P(B|A) = P(B), we know that A and B are independent events.

This means that P(A and B) = P(A) × P(B). Thus,


\mathrm{P(A\ and\ B)} = 0.65 \times 0.35 = 0.2275 = 22.75\%


B is incorrect. It indicates only the probability of A occurring.

C is incorrect. It indicates only the probability of B occurring.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.2714 Which of the following is the most appropriate term used for events that cover all the possible outcomes?

A. Exhaustive events.

B. Independent events.

C. Mutually exclusive events.

The correct answer is A.

Exhaustive events are events that cover all possible outcomes. In probability theory and logic, a set of events is jointly or collectively exhaustive if at least one of the events must occur. For example, when rolling a six-sided die, the outcomes 1, 2, 3, 4, 5, and 6 are collectively exhaustive, because they encompass the entire range of possible outcomes.

B is incorrect. Independent events are events that are not affected by the outcome of previous events; for instance, when tossing a coin, the probability of getting head or tail does not in any way depend on whether you got head or tail on the first toss.

C is incorrect. Mutually exclusive events are events that cannot both occur simultaneously; for example, when tossing a coin, you can get either head or tail, there is no possibility of getting both head and tail simultaneously.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.2715 If the probability that students use preparation materials for the CFA Level 1 exam is 80% and the probability that the students will pass the CFA Level 1 exam given that they use preparation materials is 54%, then the joint probability of using preparation materials and passing the CFA Level 1 exam is closest to:

A. 43.2%
B. 80.0%
C. 90.8%

The correct answer is A.

Let

p(A)=0.8 (the probability that the students use preparation materials for the CFA Level 1 exam is

And

p(P|A)=0.54 (the probability that the students will pass the CFA Level 1 exam given that they use

To get the joint probability p(PA), we need to use the multiplication rule.


\mathrm{p}(\mathrm{PA}) = \mathrm{p}(\mathrm{P}|\mathrm{A}) \times \mathrm{p}(\mathrm{A}) = 0.8 \times 0.54 = 0.432 = 43.2


B is incorrect. It assumes the multiplication rule of probability is used to determine the joint probability of two events as follows:


\mathrm{P}(\mathrm{AB}) = \mathrm{P}(\mathrm{A} \mid \mathrm{B}) \times \mathrm{P}(\mathrm{B}) = \left[ \frac{0.8}{0.54} \times 0.54 = \right] 0.80 = 80.0\%


C is incorrect. It assumes the addition rule of probability is used to determine the probability that at least one of two events will occur:


\mathrm{P}(\mathrm{A} \text{ or } \mathrm{B}) = \mathrm{P}(\mathrm{A}) + \mathrm{P}(\mathrm{B}) - \mathrm{P}(\mathrm{AB}) = (0.8 + 0.54) - (0.8 \times 0.54) = 0.908 = 90.8


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.2716 The probability that the Eurozone economy will grow this year is 48%, and the probability that the European Central Bank (ECB) will loosen its monetary policy is 50%. Assuming that the joint probability that the Eurozone economy will grow and the ECB will loosen its monetary policy is 40%, then the probability that either the Eurozone economy will grow or the ECB will loosen its the monetary policy is closest to:

A. 40%.
B. 48%.
C. 58%.

The correct answer is C.

The addition rule of probability is used to solve this question:

P(E) = 0.48 (the probability that the Eurozone economy will grow is 48%)

p(M) = 0.50 (the probability that the ECB will loosen the monetary policy is 50%)

p(E ∩ M) = 0.40 (the joint probability that Eurozone economy will grow and the ECB will loosen its monetary policy is 40%)

The probability that either the Eurozone economy will grow or the central bank will loosen its the monetary policy:


\begin{array}{l}
p(E \cup M) = p(E) + p(M) - p(E \cap M) \\
= 0.48 + 0.50 - 0.40 \\
= 0.58
\end{array}


A is incorrect. It indicates the joint probability that the Eurozone economy will grow and the ECB will loosen its monetary policy.

B is incorrect. It indicates the probability that the Eurozone economy will grow.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.2717 Which of the following statements regarding the probability rules is least likely accurate?

A. Joint probability: $p(X|Y) * p(Y)$
B. Addition rule: $p(T) + p(U) - p(TU)$
C. For independent events: $p(K|L) = p(L)$

The correct answer is C.

A and B are Independent independent events if the occurrence of event A does not in any way affect the occurrence of event B. An example of independent events would be the probability of picking a red ball from a bag after picking a blue ball on the first round. Events K and L are independent events only if $p(K|L) = p(K)$.

**A is incorrect.** A is a true statement. The joint conditional probability (the probability that an event occurs given that another event has already occurred) is $P(AB) = P(A) \times P(B/A)$.

**B is incorrect.** B is a true statement. For any two events, A and B, the probability of either A or B is the sum of the two events minus the shared probability between the two events. $P(A \text{ or } B) = P(A) + P(B) - P(AB)$.

**CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.**

Q.2718 A company which produces 5G communication equipment has two factories, A and B. 40% of the equipment are made in factory A, 60% in factory B. It has been established that 90% of the equipment produced by factory A meets specifications while only 75% of the equipment produced by factory B meets specifications. If a Telco buys the equipment, the probability that it meets specifications is closest to:

A. 0.40
B. 0.76
C. 0.81

The correct answer is C.

This question can be solved; (1) using a tree diagram

© 2014-2024 AnalystPrep.
图

Probability Concepts

![img-1.jpeg](img-1.jpeg)

We want to find the probability that a piece of equipment bought from the company meets specifications (as shown in bold on the tree diagram),

The equipment might have been bought either from factory A or from factory B. Therefore, the probability that the equipment meets specifications is $0.36 + 0.45 = 0.81$ .

(2) Using the total probability rule. Let us define the following events:

M - meets specifications

A - produced by A

B - produced by B

Thus,

$\mathrm{P(A)} = 0.4\mathrm{P(B)} = 0.6$ , and $\mathrm{P(M|A)} = 0.9\mathrm{P(M|B)} = 0.75$

We wish to find $\mathrm{P(M)}$ , and we can do that by applying the total probability rule:

$\mathrm{P(M) = P(M|A)P(A) + P(M|B)P(B)}\mathrm{P(M)} = 0.9\times 0.4 + 0.75\times 0.6 = 0.81$

A is incorrect. It assumes the multiplication rule of probability is used to determine the joint probability of two events as follows;


\mathrm {P} (\mathrm {A B}) = \mathrm {P} (\mathrm {A} \mid \mathrm {B}) \times \mathrm {P} (\mathrm {B}) = [ \frac {0 . 4}{0 . 6} \times 0. 6 ] = 0. 4 0


B is incorrect. It assumes the addition rule of probability is used to determine the probability

© 2014-2024 AnalystPrep.
that at least one of two events will occur:


\mathrm{P(A\ or\ B)} = \mathrm{P(A)} + \mathrm{P(B)} - \mathrm{P(AB)} = (0.4 + 0.6) - (0.4 \times 0.6) = 0.76


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.2720 An analyst at Hampton Investments Company is calculating the expected value dividend to be received on Healthcare Co. shares.

| Analysts | Dividend Forecast | Probability |
| --- | --- | --- |
| PICO | $1.80 | 0.27 |
| Stock Ninja | $8.60 | 0.10 |
| Hermes Smith | $5.00 | 0.09 |
| John Kenen | $2.22 | 0.35 |
| Hira Ahmed | $0.95 | 0.19 |

As an analyst, using the forecasts of different analysts and their probabilities given in the following table, the estimated value of Healthcare's dividend is closest to:

A. $0.55
B. $0.86
C. $2.75

The correct answer is C.

To solve this problem, we simply need to multiply the expected dividend by the probability. Then we take the sum from all of those, as shown in the following table:

| Analysts | Dividend Forecast | Probability | Expected Value |
| --- | --- | --- | --- |
| PICO | $1.80 | 0.27 | $0.49 |
| Stock Ninja | $8.60 | 0.10 | $0.86 |
| Hermes Smith | $5.00 | 0.09 | $0.45 |
| John Kenen | $2.22 | 0.35 | $0.78 |
| Hira Ahmed | $0.95 | 0.19 | $0.18 |
| Sum of Expected Values | | | $2.75 |

A is incorrect. It is an average of the expected value of the dividends, i.e., 2.75/5.

B is incorrect. It is the expected dividend value for Stock Ninja.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (a) Calculate expected values, variances, and standard deviations and demonstrate their application to investment problems.

© 2014-2024 AnalystPrep.
Q.2721 If event C and event D are mutually exclusive, then which of the following statements is the least likely appropriate?

A. Event D could not occur.
B. Only event C could occur.
C. Event C and D could occur together.

The correct answer is C.

If the two events are mutually exclusive, then they can never occur together.

B is incorrect. Mutual exclusive events cannot both occur at the same time. Event C could occur if event D does not occur.

A is incorrect. If event C occurs, then event D will not occur.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (b) formulate an investment problem as a probability tree and explain the use of conditional expectations in investment application.

Q.2722 Assume you are a financial analyst at an investment management firm where you're given the task to estimate the dispersion of a specific equity price around its forecasted value.

| Probability | Equity Value |
| --- | --- |
| 0.33 | $62.15 |
| 0.39 | $60.75 |
| 0.28 | $63.00 |

As a financial analyst, the variance of equity value using the data provided in the following table is closest to:

A. 0.495
B. 0.872
C. 0.934

The correct answer is B.

Variance measures the squared deviation of each outcome from its expected value and multiplies it by its weight (probability).

© 2014-2024 AnalystPrep.

\text {Variance} = \sum_ {\mathrm {i} = 1} ^ {\mathrm {n}} \mathrm {P} \left(\mathrm {X} _ {\mathrm {i}} = \mathrm {x}\right) (\mathrm {X} - \vec {\mathrm {X}}) ^ {2}


Now,


\vec {X} = \sum_ {i = 1} ^ {n} x _ {i} P (X _ {i} = x) = 0. 3 3 \times 6 2. 1 5 + 0. 3 9 \times 6 0. 7 5 + 0. 2 8 \times 6 3. 0 0 = 6 1. 8 4


Thus


\text {Variance} = 0. 3 3 (6 2. 1 5 - 6 1. 8 4) ^ {2} + 0. 3 9 (6 0. 7 5 - 6 1. 8 4) ^ {2} + 0. 2 8 (6 3 - 6 1. 8 4) ^ {2} = 0. 8 7 2


**A is incorrect.** It indicates the variance of the first two equity values:


0. 3 3 (6 2. 1 5 - 6 1. 8 4) + 0. 3 9 (6 0. 7 5 - 6 1. 8 4) = 0. 4 9 5


**C is incorrect.** It indicates the standard deviation:


\sqrt {0 . 8 7 2} = 0. 9 3 4


**CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (a) Calculate expected values, variances, and standard deviations and demonstrate their application to investment problems.**

© 2014-2024 AnalystPrep.
Q.2723 Assume you are an associate at an investment management firm where you're given the task to estimate the dispersion of a specific equity price around its forecasted value. The forecasted values and probabilities associated with them are given in the following table:

| Probability | Equity Value |
| --- | --- |
| 0.33 | $62.15 |
| 0.39 | $60.75 |
| 0.28 | $63.00 |

Using the given data, the standard deviation is closest to:

A. 0.50
B. 0.87
C. 0.93

The correct answer is C.

Variance measures the squared deviation of each outcome from its expected value and multiplies it by its weight (probability).


\text{Variance} = 0.33(62.15 - 61.84)^2 + 0.39(60.75 - 61.84)^2 + 0.28(63 - 61.84)^2 = 0.87

\Rightarrow \text{Standard deviation} = \text{Variance}^{0.5} = 0.93


A is incorrect. It indicates the variance of the first two equity values as follows;


0.33(62.15 - 61.84) + 0.39(60.75 - 61.84) = 0.495


B is incorrect. It indicates the variance.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (a) Calculate expected values, variances, and standard deviations and demonstrate their application to investment problems.

Q.2724 Suppose there is a 65% probability that the Gross Domestic Product (GDP) of Trivia Land will grow this year. If the GDP grows, there is a 75% probability that the GDP will be $5.5 trillion and a 25% probability that the GDP will be $5.1 trillion. On the other hand, there is a 35% probability that the GDP will fall, and if it falls, there is a 55% probability that the GDP will be $4.7 trillion and only a 45% probability that the GDP will be $4.0 trillion.

Using the given assumptions, the unconditional probability that the expected GDP will be $4.0 trillion is closest to:

© 2014-2024 AnalystPrep.
A. $15.75\%$
B. $35\%$
C. $45\%$

The correct answer is A.

We can use a tree diagram to visualize this problem:

![img-2.jpeg](img-2.jpeg)

There is only a $45\%$ probability that the expected GDP will be $\$4.0$ trillion, given that the GDP will fall. Therefore, the unconditional probability of GDP being $\$4.0$ trillion


= 35 \% \times 45 \% = 0.1575


B is incorrect. It only indicates the probability that the GDP will fall.

C is incorrect. It only indicates the probability that the expected GDP will be $4.0 trillion, given that the GDP will fall

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and

© 2014-2024 AnalystPrep.
Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

Q.2725 Suppose there is a 65% probability that the Gross Domestic Product (GDP) of Trivia Land will grow this year. If the GDP grows, there is a 75% probability that the GDP will be $5.5 trillion and a 25% probability that the GDP will be $5.1 trillion. On another hand, there is a 35% probability that the GDP will fall, and if it falls, there is a 55% probability that the GDP will be $4.7 trillion and only a 45% probability that the GDP will be $4.0 trillion. Using the given assumptions the expected GDP of Trivia Land given that the GDP will grow is closest:

A. $5.40 trillion
B. $5.10 trillion
C. $5.50 trillion

The correct answer is A.

We will use a tree diagram to visualize this question.

![img-3.jpeg](img-3.jpeg)

© 2014-2024 AnalystPrep.
As shown in bold in the above tree diagram, if GDP grows, it has a 75% chance of growing up-to 5.5 trillion and a 25% chance of growing up-to 5.1 trillion.

The expected GDP if the GDP grows = 0.75 × ($5.5 trillion) + 0.25 × ($5.1 trillion) = $5.4 trillion

B is incorrect. It indicates only the probability of a 25% chance of the GDP growth up to $5.1 trillion.

C is incorrect. It indicates a 75% chance of GDP growing up to $5.5 trillion.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

Q.2727 Suppose there is a 65% probability that the Gross Domestic Product (GDP) of Trivia Land will grow this year. If the GDP grows, there is a 75% probability that the GDP will be $5.5 trillion and a 25% probability that the GDP will be $5.1 trillion. On the other hand, there is a 35% probability that the GDP will fall, and if it falls, there is a 55% probability that the GDP will be $4.7 trillion and only a 45% probability that the GDP will be $4.0 trillion. Using the given assumptions, the conditional variance of GDP in the environment where the GDP is expected to grow is closest to:

A. 0.03
B. 0.04
C. 0.173

The correct answer is A.

Expected GDP in GDP growth environment = 0.75($5.5) + 0.25($5.1) = $5.4 trillion.

So that,

Variance = 0.75(5.5 - 5.4)² + 0.25(5.1 - 5.4)² = 0.03

B is incorrect. It indicates the variance assuming the GDP falls.

C is incorrect. It's the resulting standard deviation of the GDP in the GDP growth environment

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (a) Calculate expected values, variances, and standard deviations and demonstrate their application to investment problems.

© 2014-2024 AnalystPrep.
Q.3438 At the University of Alabama, a portfolio management test has ten questions, and each question has four option choices, out of which only one is correct. James Sigh selects a random option for each of the ten questions. The probability that all his answers are correct is closest to:

A. $\left(\frac{1}{4}\right)^{10}$
B. $\left(\frac{1}{10}\right)^{4}$
C. $\frac{1}{4}$

The correct answer is A.

The number of ways in which the test can be answered is $4^{10}$.

The number of ways in which all correct options can be selected is 1.

Therefore, the probability of all correct answers is $\left(\frac{1}{4}\right)^{10}$

B is incorrect. It's the inverse of the probability of all the correct answers.

C is incorrect. It does not include the power of 10.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (b) Formulate an investment problem as a probability tree and explain the use of conditional expectations in investment application.

© 2014-2024 AnalystPrep.
Q.3445 Box A contains 20 red balls, while Box B contains 10 white balls. A box is randomly selected, and a ball is drawn out. The probability that the ball is white is closest to:

A. 0.33.
B. 0.50.
C. 0.67.

The correct answer is B.

Probability of selecting box B = $\frac{1}{2}$

Once Box B is selected, the probability of picking up a white ball = 1 (1 since all balls within box B are white) p (selecting white ball)

p (selecting white ball) = $\frac{1}{2} \times 1 = 1/2$.

A is incorrect. It assumes one chance in thirty that a white ball will be drawn.

C is incorrect. It assumes two chances in thirty that a red ball will be drawn.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (b) Formulate an investment problem as a probability tree and explain the use of conditional expectations in investment application.

© 2014-2024 AnalystPrep.
Q.3451 Three events (A, B, and C) are independent of each other. The probability of occurrences of each event is 0.30, 0.25, and 0.20, respectively. The probability that all the events occur simultaneously is closest to:

A. 0.015
B. 0.735
C. 0.750

The correct answer is A.

As the events are independent of each other, the probability that all the events occur simultaneously is:


p \text{ (all occurs simultaneously)} = 0.30 \times 0.25 \times 0.20 = 0.015


B is incorrect. It indicates the probability of either one event occurring as follows;


P(A \text{ or } B \text{ or } C) = (0.30 + 0.25 + 0.20) - (0.30 \times 0.25 \times 0.20) = 0.735


C is incorrect. It indicates the total sum of all the probabilities, i.e., $= 0.30 + 0.25 + 0.20 = 0.750$.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

Q.3452 An equity analyst tracks a stock and has forecasted the price of stocks under various conditions, as given in the following exhibit.

Exhibit: Stock price given different events - March 2016

| Event | Probability |
| --- | --- |
| The stock index rises | 40% |
| The stock index falls | 60% |
| The price of the stock increases given that the stock index rises | 20% |
| The price of the stock increases | 40% |

Given that the stock index fell in March 2016, the probability that the price of the stock increased is closest to:

© 2014-2024 AnalystPrep.
A. 0.20
B. 0.53
C. 0.60

The correct answer is B.

The total probability rule states that:


\mathrm {P} (\mathrm {A}) = \mathrm {P} (\mathrm {A} | \mathrm {X} 1) * \mathrm {P} (\mathrm {X} 1) + \mathrm {P} (\mathrm {A} | \mathrm {X} 2) * \mathrm {P} (\mathrm {X} 2) + \dots . \mathrm {P} (\mathrm {A} | \mathrm {X n}) * \mathrm {P} (\mathrm {X n})


Where X1, X2... are mutually exclusive and exhaustive events.

Let us define the events:

A = the stock price increases

X1 = the stock index rises

X2 = the stock index falls

$\mathrm{P(A) = P(A|X1)*P(X1) + P(A|X2)*P(X2)}0.40 = 0.20 * 0.40 + \mathrm{P(A|X2)} * 0.600.40 = 0.08 + \mathrm{P(A|X2)}*0.60\mathrm{P(A|X2)} = 0.53 = 53\%$

A is incorrect. It indicates the probability that the price of the stock increases, given that the stock index rises.

C is incorrect. It indicates the probability that the stock index falls.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

Q.3456 The research team of an investment bank makes the following predictions:

Rate cut by the central bank
Probability (60%)

| Sub Event | Probability |
| --- | --- |
| Stock market rises | 70% |
| Stock market falls | 30% |

© 2014-2024 AnalystPrep.
134
© 2014-2024 AnalystPrep.

# No rate cut by the central bank Probability (40%)

| Sub Event | Probability |
| --- | --- |
| Stock market rises | 40% |
| Stock market falls | 60% |

The probability that the stock market will rise, irrespective of a rate cut or not, is closest to:

A. 42%.

B. 58%.

C. 82%.

The correct answer is B.

Using the total probability rule:

P(stock market increase) = P (stock market increase/rate cut) × P(rate cut) + P (stock market increase/no rate cut) × P(no rate cut)

P (stock market increase) = 0.70 × 0.60 + 0.40 × 0.40 = 0.58 = 58%

Using a tree diagram
![img-4.jpeg](img-4.jpeg)

# Probability Concepts

![img-5.jpeg](img-5.jpeg)

The stock market, as shown in bold in the above tree diagram. As shown in bold in the above tree diagram, the stock market can rise regardless of whether the rate is cut or not. If the rate is cut, the market will rise by a probability of 0.7 and by a probability of 0.4 if the rate is not cut. The probability that the stock market will rise is, therefore; $(0.6 \times 0.7) + (0.4 \times 0.4) = 0.58$

A is incorrect. It indicates the probability that the stock market will fall irrespective of a rate cut or not as follows;


\mathrm{P}(\text{stock market falls}) = (0.3 \times 0.6) + (0.6 \times 0.4) = 0.42 = 42\%


C is incorrect. It indicates the probability that the stock market will rise whether the rate is cut or not as follows;


\mathrm{P}(\text{stock market rise}) = (0.7 + 0.4) - (0.7 \times 0.4) = 0.82 = 82\%


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3459 A portfolio manager has the mandate of creating portfolios by including two pharmaceutical stocks and one engineering stock. If the portfolio manager has the option to select from ten pharmaceutical and four engineering stocks, respectively, then the maximum number of portfolios that can be created is closest to:

A. 180
B. 270
C. 360

The correct answer is A.

This is a combination counting problem. It involves the selection of given items where order does not matter.

The number of ways in which two pharmaceutical stocks can be selected out of ten i.e., $^{10}\mathrm{C}_2 = 45$. Number of ways in which one engineering stock can be selected out of four stocks i.e., $^{4}\mathrm{C}_1 = 4$. The number of ways in which a portfolio can be created $45 \times 4 = 180$.

Steps using BAII Plus Pro calculator is as follows;

Press 10, then press 2ND + (nCr in yellow), then press 2 to get 45

Press 4, then press 2ND + (nCr in yellow), then press 1 to get 4.

Then multiply 45 by 4 to get 180.

B is incorrect. It indicates the total number of ways a portfolio can be created $= 45 \times 6 = 270$, taking into account the number of ways in which two pharmaceutical stocks can be selected out of ten i.e., $^{10}\mathrm{C}_2 = 45$ and the number of ways in which two engineering stocks can be selected out of four stocks i.e., $^{4}\mathrm{C}_2 = 6$.

C is incorrect. It indicates the total number of ways a portfolio can be created $= 120 \times 3 = 360$, considering the number of ways in which three pharmaceutical stocks can be selected out of ten i.e., $^{10}\mathrm{C}_3 = 120$ and the number of ways three engineering stocks can be selected out of one i.e., $^{3}\mathrm{C}_1 = 3$.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3463 An equity research analyst forecasts the share price of Equidor Inc.'s stock and the probability of achieving the price target. The forecast made by the analyst is given in the following exhibit.

Exhibit 1: Share Price Forecast

| Probability | Share Price |
| --- | --- |
| 20% | $32.00 |
| 25% | $28.00 |
| 40% | $34.00 |
| 15% | $40.00 |

The variance of Equidor Inc.'s stock price is closest to:

A. 3.77
B. 14.20.
C. 33.00

The correct answer is B.

Recall that:


\operatorname {V a r} (X) = P x [ X - E (X) ] ^ {2}


| Probability | X | (X - E(x)) | P(x) * [X - E(x)]² |
| --- | --- | --- | --- |
| 20% | $32.00 | 32 - 33 = -1 | 20% * 1 = 0.20 |
| 25% | $28.00 | 28 - 33 = -5 | 25% * 25 = 6.20 |
| 40% | $34.00 | 34 - 33 = 1 | 40% * 1 = 0.40 |
| 15% | $40.00 | 40 - 33 = 7 | 15% * 49 = 7.35 |
| Variance | | | 14.20 |

A is incorrect. It indicates the standard deviation of Equido Inc.'s stock price.

C is incorrect. It indicates the expected returns of the share price.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3488 The probabilities that Bond A and Bond X will default in the next two years are 10% and 8%, respectively. The probability that both bonds will default simultaneously in the next two years is 5%. The probability that Bond A will default given that Bond X has already defaulted is closest to:

A. 10%
B. 17.2%
C. 62.5%

The correct answer is C.

P(X) = 8%
P(A) = 10%

P(X ∩ A) = 5%

As per the conditional probability:

P(A|X) = P(A ∩ X)/P(X) = 5%/8% = 62.5%

A is incorrect. It assumes the multiplication rule of probability is used to determine the joint probability of two events as follows;


\mathrm{P}(\mathrm{AX}) = \frac{0.1}{0.08} \times 0.08 = 0.1 = 10


B is incorrect. It assumes the addition rule of probability is used to determine the probability that at least one of two events will occur as follows;


\mathrm{P}(\mathrm{A} \text{ or } \mathrm{B}) = (0.1 + 0.08) - (0.1 \times 0.08) = 0.172 = 17.20\%


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3508 An analyst covers the international bonds market. The probability that Italy defaults and Japan defaults are 0.01 and 0.02, respectively. Both events are independent of each other. The probability that Italy defaults given that Japan has already defaulted is closest to:

A. 0.01.
B. 0.03
C. 0.118

The correct answer is A.

Let: P(A)=probability that Italy defaults and P(B)=probability that Japan defaults

As the events are independent of each other, the probability of occurrence of one event does not affect the probability of occurrence of the other event. This can also be proved using the conditional probability rule:


\mathrm{P(A|B)} = \mathrm{P(AB)} / \mathrm{P(B)}


As the events are independent


\mathrm{P(AB)} = \mathrm{P(A)} * \mathrm{P(B)}

\mathrm{P(A|B)} = \mathrm{P(A)} = 0.01


B is incorrect. It assumes the events are mutually exclusive as follows;


\mathrm{P(AB)} = 0.01 + 0.02 = 0.03


C is incorrect. It assumes the addition rule of probability is used to determine the probability that at least one of two events will occur as follows;


\mathrm{P(A \text{ or } B)} = (0.1 + 0.02) - (0.1 \times 0.02) = 0.118


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3509 An analyst covers two companies – Xela Ltd. and Yena Inc. Yena Inc. is a subsidiary of Xela. The probability that the return on equity (ROE) of Xela exceeds 20% this year is 0.10, while the probability that the ROE of Yena exceeds 30% is 0.05 for the same time period. If the probability that the ROE of Xela exceeds 20% and the ROE of Yena exceeds 30% is 0.02, then the probability that the ROE of Yena exceeds 30% given that the ROE of Xela has already exceeded 20% is closest to:

A. 0.05
B. 0.10.
C. 0.20

The correct answer is C.

Let us define two events:

Let us define two events:

Event A: ROE of Xela exceeds 20%

Event B: ROE of Yena exceeds 30%

Then:

P(A) = 0.10

P(B) = 0.05

P (A and B) = 0.02 (Events A and B happen together)

According to the conditional probability rule:

P (B|A) = P (A and B)/P(A)

P (B|A) = 0.02/0.10 = 0.20 (Event B happens given that A has already happened)

A is incorrect. It indicates the probability that the ROE of Yena exceeds 30%.

B is incorrect. It indicates the probability that the return on equity (ROE) of Xela exceeds 20%.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3715 An empirical study of ABC stock listed on the New York Exchange reveals that the stock has closed higher on one-third of all days in the past few months. Given that up and down days are independent, the probability of ABC stock closing higher for six consecutive days is closest to:

A. 0.00137.
B. 0.088.
C. 0.776.

The correct answer is A.

From the information above, we can establish that the probability of closing higher = 1/3

Using independence, the probability of 6 consecutive "highs" = (1/3)⁶ = 0.00137

(The calculation above follows from the fact that if A and B are independent events, then P(A ∧ B) = P(A) * P(B).)

B is incorrect. It assumes that the stock has not closed higher on one-third of all days in the past few months.

C is incorrect. It assumes the addition rule of probability is used to determine the probability that at least one of two events will occur as follows;


\mathrm{P(A\ or\ B)} = (0.33 + 0.67) - (0.33 \times 0.67) = 0.776


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

Q.3716 A fruit juice shop allows customers to choose apple juice, mango juice or passion juice. The probability of a customer ordering passion juice is 0.45, mango juice and apple juice 0.19, passion juice and mango juice 0.15, passion juice and apple juice 0.25, passion juice or mango juice 0.6, passion juice or apple juice 0.84, and 0.9 for at least one of them.

The probability that a customer orders all three juices is closest to:

A. 0.10
B. 0.30
C. 0.64

The correct answer is A.

© 2014-2024 AnalystPrep.
Let:

- A be the event that a customer chooses/orders apple juice
- M be the event that a customer chooses mango juice
- S be the event that a customer chooses passion fruit

We can easily establish that:

- P(S) = 0.45
- P(M ∩ A) = 0.19
- P(M ∩ S) = 0.15
- P(A ∩ S) = 0.25
- P(M ∪ S) = 0.6
- P(A ∪ S) = 0.84
- P(A ∪ M ∪ S) = 0.9

We need to determine P(A ∩ M ∩ S):

Borrowing from the addition rule with three sets,

P(A ∪ M ∪ S) = P(A) + P(M) + P(S) - P(M ∩ A) - P(M ∩ S) - P(A ∩ S) + P(A ∩ M ∩ S)

...equation (I)

P(M ∪ S) = P(M) + P(S) - P(M ∩ S),

P(M) = 0.6 + 0.15 - 0.45 = 0.3

Similarly, P(A ∪ S) = P(A) + P(S) - P(A ∩ S)

P(A) = 0.84 - 0.45 + 0.25 = 0.64

Therefore applying equation (I),

0.9 = 0.64 + 0.3 + 0.45 - 0.19 - 0.15 - 0.25 + P(A ∩ M ∩ S)

Which gives us P(A ∩ M ∩ S) = 0.1

B is incorrect. It is the result of:

P(M ∪ S) = P(M) + P(S) - P(M ∩ S) = 0.6 + 0.15 - 0.45 = 0.3

© 2014-2024 AnalystPrep.
C is incorrect. It is the result of;


\mathrm{P}(\mathrm{A} \cup \mathrm{S}) = \mathrm{P}(\mathrm{A}) + \mathrm{P}(\mathrm{S}) - \mathrm{P}(\mathrm{A} \cap \mathrm{S}) = 0.84 - 0.45 + 0.25 = 0.64


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3729 The punctuality of filing tax returns has been investigated by considering the number of citizens in different geographical regions. In the sample, 60% of respondents were from Africa, 20% Europe, and 20% South America. The probabilities of late filing of returns in Africa, Europe, and South America are 45%, 15%, and 20% respectively.

If a late submitter is picked at random from the area under study, the probability that they are from Africa is closest to

A. 0.45
B. 0.7941
C. 0.80

The correct answer is B.

Let 'A' be the event that an individual chosen at random comes from Africa. Let 'E' and 'S' have similar definitions for Europe and South America, respectively.

Define L' as the event that an individual chosen at random submits tax returns late.

Now, we wish to determine P(Africa | Late) = P(A | L)

Applying Bayes' Theorem,


\begin{array}{l}
P (A | L) = \frac {P (A) \times P (L | A)}{P (A) \times P (L | A) + P (E) \times P (L | E) + P (S) \times P (L | S)} \\
= \frac {0 . 6 \times 0 . 4 5}{(0 . 6 \times 0 . 4 5) + (0 . 2 \times 0 . 1 5) + (0 . 2 \times 0 . 2 0} \\
= \frac {0 . 2 7}{0 . 2 7 + 0 . 0 3 + 0 . 0 4} \\
= 0. 7 9 4 1 \\
\end{array}


A is incorrect. It indicates the probability of late filing of returns in Africa.

C is incorrect. It assumes that the events are mutually exclusive, and when picked randomly, the submitter will be a late filer as follows;


\mathrm {P} (\text {L a t e s u b m i t t e r}) = 0. 4 5 + 0. 1 5 + 0. 2 0 = 0. 8 0


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3732 An investment firm classifies capital projects into three different categories, depending on risk level: Standard, Preferred, and Ultra-preferred. Of the firm's projects, 60% are standard, 30% are preferred, and 10% are ultra-preferred. The probabilities of a project making a loss are 0.01, 0.005, and 0.001 for categories standard, preferred, and ultra-preferred respectively.

If a capital project makes a loss in the next year, the probability that the project was standard is closest to;

A. 79%
B. 72%
C. 78%

The correct answer is A.

Let:

L = Event a project makes a loss
S = Event of a standard project
P₁ = Event of a preferred project
U = Event of a ultra-preferred project

Using Baye's theorem, we wish to determine P(S | L)


\begin{array}{l}
P(S|L) = \frac{(P(S) \times P(L|S))}{P(P1) \times P(L|P1) + P(U) \times P(L|U)} \\
= \frac{(0.6 \times 0.01)}{(0.6 \times 0.01) + (0.3 \times 0.005) + (0.1 \times 0.001)} \\
= \frac{0.006}{0.006 + 0.0015 + 0.0001} \\
= 0.7895 = 79\%
\end{array}


B is incorrect. It assumes the indicated probability of a standard project making a loss given the event that an ultra-preferred project made a loss.

C is incorrect. It assumes the probability of a standard project making a loss given a preferred project made a loss.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

Q.3733 Upon arrival at a cancer treatment center, patients are categorized into one of four stages namely: stage 1, stage 2, stage 3, and stage 4. In the past year,

i. 10% of patients arriving were in stage 1
ii. 40% of patients arriving were in stage 2

© 2014-2024 AnalystPrep.
iii. 30% of patients arriving were in stage 3
iv. The rest of the patients were in stage 4
v. 10% of stage 1 patients died
vi. 20% of stage 2 patients died
vii. 30% of stage 3 patients died
viii. 50% of stage 4 patient died

Of the patients who survived, the probability that they arrived in stage 4 is closest to:

A. 13%
B. 14%
C. 12%

The correct answer is B.

Let:

D = Event of death of a cancer patient
C₁ = event of stage 1 cancer
C₂ = event of stage 2 cancer
C₃ = event of stage 3 cancer
C₄ = event of stage 4 cancer

Using Bayes' Theorem., we wish to determine P(C₄ | D') where D' denotes survival


\begin{array}{l}
P \left(C _ {4} | D ^ {\prime}\right) = \frac {P \left(C _ {4}\right) \times P \left(D ^ {\prime} \mid C _ {4}\right)}{\left(P \left(C _ {4}\right) \times P \left(D ^ {\prime} \mid C _ {4}\right) + \left(\left(P \left(C _ {1}\right) \times P \left(D ^ {\prime} \mid C _ {1}\right) + \left(P \left(C _ {2}\right) \times P \left(D ^ {\prime} \mid C _ {2}\right) + \left(P \left(C _ {3}\right) \times P \left(D ^ {\prime} \mid C _ {3}\right)\right) \right. \right. \right.} \\
= \frac {0 . 2 \times 0 . 5}{\left(0 . 2 \times 0 . 5\right) + \left(0 . 1 \times 0 . 9\right) + \left(0 . 4 \times 0 . 8\right) + \left(0 . 3 \times 0 . 7\right)} \\
= \frac {0 . 1}{\left(0 . 1 + 0 . 0 9 + 0 . 3 2 + 0 . 2 1\right)} \\
= 14 \%
\end{array}


A is incorrect. It assumes the 30% probability that the rest of the arriving patients in stage 4 survive.

C is incorrect. It assumes the indicated rate of 50% of stage 4 patients survive.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

Q.3734 You are an analyst at a large mutual fund. After examining historical data, you establish

© 2014-2024 AnalystPrep.
that all fund managers fall into 2 categories: superstars (S) and ordinaries (O).

Superstars are by far the best managers. The probability that a superstar will beat the market in any given year stands at 70%. Ordinaries, on the other hand, are just as likely to beat the market as they are to underperform it. Regardless of the category in which a manager falls, the probability of beating the market is independent of year to year. Superstars are rare diamonds because only a meager 16% of all recruits turn out to be superstars.

During the analysis, you stumble upon the profile of a manager recruited 3 years ago, who has since gone on to beat the market every year.

The probability that the manager is a superstar is closest to:

A. 46%
B. 34%
C. 84%

The correct answer is B.

We need to determine P(S|3B): The probability that the manager is a superstar, given that they have managed to beat the market in three consecutive years. As such, we need to apply Bayes' theorem.


\mathrm{P}(\mathrm{S} \mid 3\mathrm{B}) = \mathrm{P}(\mathrm{S}) \times \frac{\mathrm{P}(3\mathrm{B} \mid \mathrm{S})}{\mathrm{P}(3\mathrm{B})}


Now, we already have $\mathrm{P}(\mathrm{S}) = 16\% = \frac{4}{25}$
\begin{array}{l}
\mathrm{P}(3\mathrm{B} \mid \mathrm{S}) = \left(\frac{7}{10}\right)^3 \quad \text{(since performance is independent of one year to the next)} \\
= \frac{343}{1000}
\end{array}

\begin{array}{l}
\mathrm{P}(3\mathrm{B}) = \text{unconditional probability of beating the market in 3 consecutive years} \\
= \text{weighted average probability of 3 marketing-beating years over both superstars and ord} \\
= \mathrm{P}(3\mathrm{B} \mid \mathrm{S}) \times \mathrm{P}(\mathrm{S}) + \mathrm{P}(3\mathrm{B} \mid \mathrm{O}) \times \mathrm{P}(\mathrm{O}) \\
= \left(\frac{7}{10}\right)^3 \times \frac{4}{25} + \left(\frac{1}{2}\right)^3 \times \frac{21}{25} \\
= \left(\frac{343}{1000} \times \frac{4}{25}\right) + \frac{1}{8} \times \frac{21}{25} \\
= \frac{1372}{25000} + \frac{21}{200} \\
= 16\%
\end{array}


© 2014-2024 AnalystPrep.
Therefore,


\frac{16\% \times 34.3\%}{16\%} = 34.3\% = 0.343


A is incorrect. It assumes that the unconditional probability of beating the market in 3 consecutive years is equal to the weighted average probability of 3 marketing-beating years over superstars and ordinaries.

C is incorrect. It assumes the indicated probability that a superstar will beat the market in any given year.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3735 A human health organization tracked a group of individuals for 5 years. At the commencement of the study, 25% were categorized as heavy smokers, 40% as light smokers and the remaining as nonsmokers. Results revealed that light smokers were twice as likely as nonsmokers to die during the half-decade study, but only half as likely as heavy smokers. During the period, a randomly selected group member passed on.

The probability that the individual who died was a heavy smoker is closest to:

A. 0.19.
B. 0.53.
C. 0.47.

The correct answer is C.

Let:

D = Event of death
L = Event of light smoker
H = Event of heavy smoker
N = Event of nonsmoker
We need to calculate P(H | D)

Now, we already know that:

P(D | L) = 2P(D | N) and P(D | L) = 1/2P(D | H)

Applying Bayes' theorem,


\begin{array}{l}
P(H|D) = \frac{(P(H) \times P(D|H))}{(P(H) \times P(D|H) + P(L) \times P(D|L) + P(N) \times P(D|N)} \quad (2P(D|L) \times 0.25) \\
= \frac{(2P(D|L) \times 0.25) + P(D|L) \times 0.4 + 1/2P(D|L) \times 0.35}{0.5} \\
= \frac{0.5}{(0.5 + 0.175 + 0.4)} \\
= 0.4651 \\
\end{array}


A is incorrect. It's the indicative probability of nonsmokers.

B is incorrect. It's the indicative probability of light smokers.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3819 The amount of the annual dividend paid by ART Enterprises to its shareholders depends on the profits available for distribution. There is a 30% probability that the company will generate profits less than $50,000. If the company generates less than $50,000, there is a 15% chance of the company paying a $3 dividend. There is a 70% probability that profits will exceed $50,000 and the company will pay a dividend per share of $6 with a probability of 45%. The expected dividend payment, given ART Enterprises generates profits of less than $50,000, is closest to:

A. 0.189
B. 0.45
C. 3

The correct answer is B.

Expected dividend per share if less than $50,000 are generated = 0.15 × $3.00 = $0.45

A is incorrect. It assumes the probability of the expected dividend to be (0.7 × 0.6 × 0.45) = $0.189.

C is incorrect. It assumes the indicative dividend rate of $3 will be the expected dividend payment.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (a) Calculate expected values, variances, and standard deviations and demonstrate their application to investment problems.

© 2014-2024 AnalystPrep.
Q.3821 Lance Thackery is an equity analyst at Eve Scott Associates. Thackery is following the stock of a pharmaceutical company. She is attempting to analyze whether the upcoming launch of a Type-I diabetic drug will be successful and increase the market price of the pharmaceutical's share. The probability that the stock price will increase given a successful drug launch, P (A|S), is 0.35. Thackery has summarized important forecast probabilities in the exhibit below:

| | Probability |
| --- | --- |
| Probability stock price increases | 0.40 |
| Probability stock price is unchanged | 0.60 |
| Probability drug launch is successful | 0.45 |
| Probability drug launch is unsuccessful | 0.55 |

The probability that the stock price increases, given that the drug launch is unsuccessful, is closest to:

A. 0.44
B. 0.40
C. 0.55

The correct answer is A.

P (A) = Probability stock price increases

P (S) = Probability drug launch is successful

The probability, P (A | S^C), needs to be calculated.


\begin{array}{l}
P (A) = P (A \mid S) P (S) + P (A \mid S ^ {C}) P (S ^ {C}) \\
0.40 = 0.35(0.45) + P (A \mid S ^ {C}) (0.55) \\
= P (A \mid S ^ {C}) = 0.44 \\
\end{array}


A is incorrect. It is the probability that the stock price increases.

C is incorrect. It is probability that the drug launch is unsuccessful.

CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
Q.3826 A financial risk manager has three routes to get to the office. The probability that she gets to the office on time using routes X, Y, and Z are 60%, 65%, and 70%. She does not have a preferred route and is therefore equally likely to choose any of the three routes. Given that she arrives to work on time, the probability that she chose route Z is closest to:

A. 0.36
B. 0.56
C. 0.52

The correct answer is A.

Define X to be the event "chooses route X." Let Y and Z have similar definitions.

Define O to be the event that she arrives on time.

We wish to determine P(Z | O). Then:


\begin{array}{l}
P (Z \mid O) = \frac {(P (Z) \times P (O \mid Z))}{[ P (Z) \times P (O \mid Z) + P (Y) \times P (O \mid Y) + P (X) \times P (O \mid X) ]} \\
= \frac {\left(\frac {1}{3} \times 0 . 7\right)}{\left[ \left(\frac {1}{3} \times 0 . 7\right) + \left(\frac {1}{3} \times 0 . 6 5\right) + \left(\frac {1}{3} \times 0 . 6\right) \right]} \\
= \frac {0 . 2 3 3 3}{(0 . 2 3 3 3 + 0 . 2 1 6 7 + 0 . 2)} \\
= 0. 3 5 8 9 \\
\end{array}


B is incorrect. It excludes $(\mathrm{P}(\mathrm{Z}) \times \mathrm{P}(\mathrm{O} \mid \mathrm{Z}))$ in the denominator so that:


\mathrm {P} (\mathrm {Z} \mid \mathrm {O}) = \frac {0 . 2 3 3 3}{(0 . 2 1 6 7 + 0 . 2)} = 0. 5 6


C is incorrect. It excludes $\mathrm{P}(\mathrm{Y}) \times \mathrm{P}(\mathrm{O} \mid \mathrm{Y})$ in the denominator so that:


\mathrm {P} (\mathrm {Z} \mid \mathrm {O}) = \frac {0 . 2 3 3 3}{(0 . 2 3 3 3 + 0 . 2)} = 0. 5 2


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS (c) Calculate and interpret an updated probability in an investment setting using Bayes' formula.

© 2014-2024 AnalystPrep.
# Learning Module 5: Portfolio Mathematics

Q.301 Which of the following statements is most accurate?

A. Correlation cannot be zero.
B. Covariance is always positive.
C. Correlation cannot be greater than 1.

The correct answer is C.

Correlation must be between -1 and +1.

A is incorrect. Correlation can be zero. Zero correlation occurs when two items are not correlated.

B is incorrect. Covariance is not always positive. A positive covariance implies that asset returns move in the same direction, whereas a negative covariance implies that asset returns move in opposite directions.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (a) Calculate and interpret the expected value, variance, standard deviation, covariances, and correlations of portfolio returns.

© 2014-2024 AnalystPrep.
Q.308 Thirty percent of the stocks in your portfolio have a P/E ratio greater than 15, out of which 25% are in the technology industry. The probability that a randomly selected stock from the portfolio will have a P/E greater than 15 and be in the technology industry is closest to:

A. 0.075
B. 0.30
C. 0.475

The correct answer is A.

We know that:

- P(P/E &gt; 15) = 0.3
- P(tech stock | P/E &gt; 15) = 0.25

The joint probability formula is:


P(A \text{ and } B) = P(A) \times P(B | A)


Where:

- A is the event that a stock has a P/E ratio greater than 15.
- B is the event that a stock is in the technology industry, given it has a P/E ratio greater than 15.

Therefore, the joint probability is:


\begin{array}{l}
P(P/E &gt; 15 \text{ and tech stock}) = P(P/E &gt; 15) \times P(\text{tech stock} \mid P/E &gt; 15) \\
= 0.3 \times 0.25 \\
= 0.075 \\
\end{array}


CFA Level 1, Quantitative Methods, Learning Module 4: Probability Trees and Conditional Expectations, LOS 4c: calculate and interpret an updated probability in an investment setting using Bayes' formula

© 2014-2024 AnalystPrep.
Q.2719 If the probability that Donald Trump will lose the Presidential elections is 52% and the probability that the USD will devalue given that Trump wins the election is 91%, then the joint probability of Trump winning the Presidential elections and the devaluation of the USD is closest to:

A. 0.4368
B. 0.4730
C. 0.9530

The correct answer is A.

p(T)=0.48 (the probability that Trump will win the election)
p(D|T)=0.91 (the probability that USD will devalue given the Trump wins the election)
The joint probability of the event:


\mathrm{p}(\mathrm{DT}) = \mathrm{p}(\mathrm{D}|\mathrm{T}) \times \mathrm{p}(\mathrm{T}) = 0.91 \times 0.48 = 0.4368


B is incorrect. It considers the probability of Trump losing the election and that the USD will devalue as follows.


\mathrm{P}(\mathrm{LT}) = 0.52 \times 0.91 = 0.4730


C is incorrect. It assumes the probability of winning or the USD being devalued as follows;


\mathrm{P}(\mathrm{D} \text{ or } \mathrm{T}) = (0.48 + 0.91) - (0.48 \times 0.91) = 0.9530


CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

© 2014-2024 AnalystPrep.
Q.2728 Which of the following properties of covariance is least likely appropriate?

A. Covariance ranges from -1 to +1.
B. Covariance of (R,R) = Variance of R
C. Covariance measures how one random variable moves with another random variable.

The correct answer is A.

Covariance may range from negative infinity to positive infinity, whereas correlation ranges from -1 to +1. Options B) and C) are appropriate properties of covariance.

B is incorrect. It is true that covariance of (R, R) = Variance of R. for a random variable R

C is incorrect. The covariance measures how one random variable moves with another random variable.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

Q.2730 Assuming that the covariance of returns of Stock X and Stock Y is Cov(RX, RY) = 0.093, the variance of RX = 0.69, and the variance of RY = 0.36, the correlation of returns of Stock X and Stock Y is closest to:

A. 0.112
B. 0.155
C. 0.187

The correct answer is C.

Recall that for random variables X and Y,


\operatorname {Corr} \left(\mathrm {R} _ {\mathrm {X}}, \mathrm {R} _ {\mathrm {Y}}\right) = \frac {\operatorname {Cov} \left(\mathrm {R} _ {\mathrm {X}} , \mathrm {R} _ {\mathrm {Y}}\right)}{\sigma_ {\mathrm {X}} , \sigma_ {\mathrm {Y}}} = \frac {0.093}{\sqrt {0.69} \times \sqrt {0.36}} = 0.1865


A is incorrect. It's the outcome of dividing the $\operatorname{Cov}(\mathbb{R}_{\mathrm{X}},\mathbb{R}_{\mathrm{Y}})$ by the resulting $\sigma_{\mathrm{X}}$.

B is incorrect. It's the outcome of dividing the $\operatorname{Cov}(\mathbb{R}_{\mathrm{X}},\mathbb{R}_{\mathrm{Y}})$ by the resulting $\sigma_{\mathrm{Y}}$

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

© 2014-2024 AnalystPrep.
Q.2743 A young investor consults an investment manager to advise him regarding a certain type of the portfolios which give him at least 7% of return on his investment (threshold return). The investment manager presents three portfolios exhibited in the following table. Assuming that the investor invests in portfolio B, then the probability of the portfolio return falling below the threshold return of 7% according to the Safety-First ratio is closest to:

| | Portfolio A | Portfolio B | Portfolio C |
| --- | --- | --- | --- |
| Expected Return | 19% | 23% | 36% |
| Standard Deviation | 14% | 26% | 39% |

(See Z-table)

A. 27%.
B. 61.5%.
C. 73%.

The correct answer is A.


\text{The Safety-First Ratio} = \frac{(\text{Expected Return} - \text{Threshold return}(0.23 - 0.07))}{\text{Standard Deviation of returns}} = \frac{0.26}{0.26} = 0.6153


Since the question asks for the probability of Portfolio B's return falling below 7%:


p(R_B - 7\%) = N(-0.6153) = 1 - N(0.6153) = 1 - 0.73 = 0.27


Note: The value of N is estimated using the cumulative probabilities from the normal distribution table.

B is incorrect. It indicates the Safety-First Ratio.

C is incorrect. It's the resulting figure from N(0.6153) from the normal distribution tables.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (c) Define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy's safety-first criterion.

© 2014-2024 AnalystPrep.
Q.2744 An investor consults an investment manager to advise him regarding a certain type of the portfolios which would give him at least a 7% return on his investment (threshold return). The investment manager presents three portfolios exhibited in the following table:

| | Portfolio A | Portfolio B | Portfolio C |
| --- | --- | --- | --- |
| Expected Return | 19% | 23% | 36% |
| Standard Deviation | 14% | 26% | 39% |

Using the Safety-First ratio assumption, the portfolio that is the most appropriate for the investor is:

(See Z-table)

A. Portfolio A.
B. Portfolio B.
C. Portfolio C.

The correct answer is A.

As provided in the following table, the Safety-First ratio of Portfolio A is the highest so it has the lowest probability of the portfolio returns falling below the investor's threshold level of 7%. The probability of N(-0.8571) is calculated using the cumulative probabilities table.

| | Portfolio A | Portfolio B | Portfolio C |
| --- | --- | --- | --- |
| Expected Return | 19% | 23% | 36% |
| Standard Deviation | 14% | 26% | 39% |
| Safety First Ratio | \frac{(0.19 - 0.07)}{0.14} \approx 0.8571 | \frac{(0.23 - 0.07)}{0.26} \approx 0.6153 | \frac{(0.36 - 0.07)}{0.39} \approx 0.7435 |

B is incorrect. Portfolio B has the lowest Safety-First Ratio.

C is incorrect. Portfolio C has an average Safety-First Ratio compared to Portfolios A and B.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (c) Define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy's safety-first criterion.

© 2014-2024 AnalystPrep.
Q.3307 The exhibit below summarizes risk, return, and fee data for three market-neutral hedge funds:

Exhibit: Risk, Return and Fee Data

| | Fund A | Fund B | Fund C |
| --- | --- | --- | --- |
| Risk-free rate | 2% | 2% | 2% |
| Annualized return | 15% | 22% | 9% |
| Annualized standard deviation | 20% | 26% | 15% |
| Fees | 1.0 and 10 | 1.5 and 15 | 2.0 and 20 |

Which of the following funds is most suitable for investments?

A. Fund A
B. Fund B
C. Fund C

The correct answer is B.

To determine which fund is most appropriate for investment, the Sharpe ratio of the three funds is calculated as follows:


\text{Sharpe ratio} = \frac{\mathrm{R_p} - \mathrm{R_f}}{\sigma_p}

\text{Fund A} = \frac{(15\% - 2\%)}{20\%} = 0.65

\text{Fund B} = \frac{(22\% - 2\%)}{26\%} = 0.77

\text{Fund C} = \frac{(9\% - 2\%)}{15\%} = 0.47


Fund B has the highest Sharpe ratio which means that it will enhance risk-adjusted performance. This fund is the most suitable from an investment perspective.

Q.3455 Rohan Chatterjee is planning to invest in mutual funds. His sole instruction to his portfolio manager is to generate a minimum return of $5\%$. The mutual funds in which the portfolio manager can invest are given in the following exhibit.

Exhibit: Potential Mutual Funds

© 2014-2024 AnalystPrep.
| Mutual Fund | Mean Return | Std. Dev. of Return |
| --- | --- | --- |
| X | 10% | 3% |
| Y | 12% | 4% |
| Z | 9% | 2% |

The portfolio manager will most likely invest in:

A. X
B. Y
C. Z

The correct answer is C.

The threshold level of return = 5%

We must find the Safety-First ratio:

| Mutual Fund | Mean Return | Std. Dev. of Return | SF Ratio |
| --- | --- | --- | --- |
| X | 10% | 3% | (10% - 5%)/3% = 1.67 |
| Y | 12% | 4% | (12% - 5%) / 4% = 1.75 |
| Z | 9% | 2% | (9% -5%) / 2% = 2 |

Fund X has the highest Safety-First Ratio. Therefore, the portfolio manager must invest in Mutual Fund Z.

Additional Explanation:

Roy's Safety First Ratio represents the excess return earned over and above the threshold return per unit of risk. As a matter of fact, it is calculated as the difference between the expected return and the threshold return divided by the standard deviation of the portfolio.

Intuitively, the manager should go for the portfolio with the highest SF ratio. A higher ratio implies more excess return (earnings) per unit of risk.

A is incorrect. Fund X has the medium average Safety-First Ratio.

B is incorrect. Fund Y has the lowest Safety-First Ratio.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (c) Define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy's safety-first criterion.

© 2014-2024 AnalystPrep.
Q.3457 The covariance matrix of two stocks is given in the following exhibit.

Exhibit: Covariance Matrix

| Stock | X | Y |
| --- | --- | --- |
| X | 650 | 120 |
| Y | 120 | 450 |

The correlation of returns for stocks X and Y is closest to:

A. 0.22
B. 0.45
C. 0.83

The correct answer is A.


\begin{array}{l}
\sigma(\mathrm{X}) = (650)^{0.5} = 25.50 \\
\sigma(\mathrm{Y}) = (450)^{0.5} = 21.21 \\
\end{array}

\text{Covariance}(\mathrm{X}, \mathrm{Y}) = 120

\text{Correlation}(\mathrm{X}, \mathrm{Y}) = \frac{120}{25.50 \times 21.21} = 0.22


**B is incorrect.** It assumes that 450 is the covariance between X and Y.

**C is incorrect.** It assumes that 650 is the covariance between X and Y.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

© 2014-2024 AnalystPrep.
Q.3458 A portfolio consists of two funds A and B. The weights of the two funds in the portfolio and the covariance matrix of the two funds are given in the following two exhibits.

Exhibit 1: Weight of the Funds in the Portfolio

| Fund | A | B |
| --- | --- | --- |
| Weights | 60% | 40% |

Exhibit 2: Covariance Matrix

| Fund | A | B |
| --- | --- | --- |
| A | 700 | 200 |
| B | 200 | 500 |

The portfolio variance is closest to:

A. 200.00
B. 428.04
C. 500.00

The correct answer is B.

Based on the covariance matrix:

Covariance (A,B) = 200


\begin{array}{l}
\text{Variance}_{\text{Portfolio}} = \sigma_{\mathrm{p}}^{2} = \mathrm{w}_{\mathrm{A}}^{2} \sigma_{\mathrm{A}}^{2} + \mathrm{w}_{\mathrm{B}}^{2} \sigma_{\mathrm{B}}^{2} + 2 \mathrm{w}_{\mathrm{A}} \mathrm{w}_{\mathrm{B}} \operatorname{Cov}(\mathrm{A}, \mathrm{B}) \\
= 0.60^{2} \times 700 + 0.40^{2} \times 500 + 2 \times 0.60 \times 0.40 \times 200 \\
= 428.04
\end{array}


A is incorrect. It indicates the Covariance (A, B).

C is incorrect. It indicates the variance of Fund B.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

© 2014-2024 AnalystPrep.
Q.3714 The probability of an increase in the annual dividend paid out to shareholders of ABC Limited is 0.4. The probability of an increase in share price given an increase in dividends is 0.7. The joint probability of an increase in dividends and an increase in share price is closest to:

A. 0.28.
B. 0.70.
C. 0.82.

The correct answer is A.

Let:

A be the event that the dividend is increased and,
B be the event that the share price increases
Therefore, $P(A) = 0.4$ and $P(B \mid A) = 0.7$
The joint probability of an increase in dividends and an increase in share price is $P(B \land A)$
The multiplication rule of probability states that:
$P(B \mid A) = P(B \land A) / P(A)$
Hence $P(B \land A) = P(B \mid A) * P(A)= 0.7 * 0.4= 0.28$ or $28\%$ (Note that $P(A \land B) = P(B \land A)$)

B is incorrect. It represents probability of an increase in share price given an increase in dividends.

C is incorrect. It assumes the addition rule of probability is used to determine the probability that at least one of two events will occur as follows;


P (A \text{ or } B) = (0.4 + 0.7) - (0.4 \times 0.7) = 0.82


CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (c) Define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy's safety-first criterion.

Q.3718 A renowned economist has calculated that the Canadian economy will be in one of 3 possible states in the coming year: Boom, Normal, or Slow. The following table gives the returns of stocks A and B under each economic state.

| State | Probability (state) | Return for stock A | Return for stock B |
| --- | --- | --- | --- |
| Boom | 40% | 12% | 18% |
| Normal | 35% | 10% | 15% |
| Slow | 25% | 8% | 12% |

© 2014-2024 AnalystPrep.
The covariance of the returns for stocks A and B is closest to:

A. 0.0003765
B. 0.103
C. 0.1545

The correct answer is A.


\operatorname {C o v} (\mathrm {A}, \mathrm {B}) = \sum \mathrm {P} (\mathrm {s}) * \left[ \mathrm {R} _ {\mathrm {A}} - \mathrm {E} \left(\mathrm {R} _ {\mathrm {A}}\right) \right] * \left[ \mathrm {R} _ {\mathrm {B}} - \mathrm {E} \left(\mathrm {R} _ {\mathrm {B}}\right) \right]


First, you have to determine the expected return for every stock:


\mathrm {E} \left(\mathrm {R} _ {\mathrm {A}}\right) = 0. 4 * 0. 1 2 + 0. 3 5 * 0. 1 + 0. 2 5 * 0. 0 8 = 0. 1 0 3

\mathrm {E} \left(\mathrm {R} _ {\mathrm {B}}\right) = 0. 4 * 0. 1 8 + 0. 3 5 * 0. 1 5 + 0. 2 5 * 0. 1 2 = 0. 1 5 4 5


| State | P(S) | RA | RB | P(S) * [RA - E(RA)] * [RB - E(RB)] |
| --- | --- | --- | --- | --- |
| Boom | 0.4 | 0.12 | 0.18 | 0.4 * [0.12 - 0.103] * [0.18 - 0.1545] = 0.0001734 |
| Normal | 0.35 | 0.10 | 0.15 | 0.35 * [0.1 - 0.103] * [0.15 - 0.1545] = 0.000004725 |
| Slow | 0.25 | 0.08 | 0.12 | 0.25 * [0.08 - 0.103] * [0.12 - 0.1545] = 0.0001984 |


\operatorname {C o v} (\mathrm {A}, \mathrm {B}) = 0. 0 0 0 1 7 3 4 + 0. 0 0 0 0 0 4 7 2 5 + 0. 0 0 0 1 9 8 4 = 0. 0 0 0 3 7 6 5


B is incorrect. It indicates the expected return of stock $\mathrm{A} = \mathrm{E}(\mathrm{R}_{\mathrm{A}})$ .

C is incorrect. It indicates the expected return of stock $\mathrm{B} = \mathrm{E}(\mathrm{R}_{\mathrm{B}})$ .

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

© 2014-2024 AnalystPrep.
Q.3719 Which of the following statements is least likely true regarding the correlation coefficient?

A. The correlation coefficient has no units.

B. The correlation coefficient ranges from 0 to +1.

C. The correlation coefficient measures the strength of the linear relationship between two random variables.

The correct answer is B.

In finance, the correlation coefficient attempts to measure the degree to which two random variables, say, returns for different stocks, move in relation to each other. The correlation coefficient always lies between -1 and +1. A positive value indicates that the random variables move in the same direction, i.e., if an increase (decrease) is recorded in one variable, we expect an increase (decrease) in the other variable, which can either be proportionate or disproportionate depending on the value of the correlation. On the other hand, a negative value usually indicates that the random variables move in opposite directions, i.e., if there is an increase in one variable, then there will be a decrease in the other variable.

A is incorrect. B is a true statement. The correlation coefficient has no units. It is simply a number between -1.0 and 1.0

C is incorrect. A is a true statement. The correlation coefficient is used to measure the strength of the relationship between two random variables. The closer to 1 (for positive correlation) and to -1 (for negative correlation), the stronger the relationship.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

© 2014-2024 AnalystPrep.
Q.3724 Two stocks, X and Y, have a correlation of 0.50. Stock Y's return has a standard deviation of 0.26. Given that the covariance between X and Y is 0.005, the variance of returns for stock X is closest to:

A. 0.00148
B. 0.0385
C. 0.26

The correct answer is A.

Correlation between X and Y,


\operatorname {Corr}(X, Y) = \frac {\operatorname {Cov}(X, Y)}{(\sigma_ {X} \times \sigma_ {Y})} \approx 0.50 = \frac {0.005}{(\sigma_ {X} \times 0.26)}

\therefore \sigma_ {X} = 0.0385


Therefore,


\text {Variance (X)} = \sigma^ {2} = 0.03852^ {2} = 0.00148


B is incorrect. It is the result of $\sigma_{\mathrm{X}} = 0.0385$.

C is incorrect. It indicates the standard deviation of stock Y's return.

CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

© 2014-2024 AnalystPrep.
Q.4022 Consider the following two stocks from different portfolios;

| | Stock A | Stock B |
| --- | --- | --- |
| Expected Return | 6% | 10% |
| Standard Deviation | 7% | 14% |
| Current Portfolio weights | 0.3 | 0.7 |

Given the correlation between the two stocks returns is 0.40, the covariance between the returns of Stock A and B is closest to:

A. 0.0024
B. 0.0039
C. 0.0088

The correct answer is B.

Correlation between two stocks is determined as follows;


\rho_ {\left(R _ {A} R _ {B}\right)} = \frac {\operatorname {C o v} _ {\left(R _ {A} R _ {B}\right)}}{\sigma_ {R _ {A}} \sigma_ {R _ {B}}}


Hence, to calculate the covariance, the calculation becomes;


\operatorname {C o v} _ {\left(\mathrm {R} _ {\mathrm {A}} \mathrm {R} _ {\mathrm {B}}\right)} = \rho_ {\left(\mathrm {R} _ {\mathrm {A}} \mathrm {R} _ {\mathrm {B}}\right)} \times \sigma_ {\mathrm {R} _ {\mathrm {A}}} \sigma_ {\mathrm {R} _ {\mathrm {B}}} = 0. 0 7 \times 0. 1 4 \times 0. 4 = 0. 0 0 3 9


CFA Level 1, Quantitative Methods, Learning Module 5: Portfolio Mathematics, LOS (b) Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns.

© 2014-2024 AnalystPrep.
# Learning Module 6: Simulation Methods

Q.3512 Which of the following statements is most accurate? Lognormal Distributions are:

A. skewed to the right.
B. skewed to the left and often used to model asset prices.
C. skewed to the left and rarely used to model asset prices.

The correct answer is A.

Lognormal distributions are skewed to the right. They are often used to model stock prices since the distribution is bounded by zero.

B is incorrect. Lognormal distributions are skewed to the right (positively skewed)

C is incorrect. Lognormal distributions are bound by zero. This implies that they are skewed to the right (positively skewed). For the same reason, lognormal distributions are the preferred distribution when modeling asset prices because asset prices cannot be negative.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7a: explain the relationship between normal and lognormal distributions and why the lognormal distribution is used to model asset prices when using continuously compounded asset returns

© 2014-2024 AnalystPrep.
Q.4023 Which of the following is least likely a parameter of lognormal distribution;

A. Mean.
B. Median.
C. Standard deviation.

The correct answer is B.

While the median is a measure of central tendency, it is not typically considered a parameter of the distribution. Parameters usually refer to the characteristics that define the shape and scale of the distribution, such as the mean and standard deviation of the logarithmic values in the case of a lognormal distribution.

A and C are incorrect: The mean and standard deviation are parameters of a lognormal distribution.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7a: explain the relationship between normal and lognormal distributions and why the lognormal distribution is used to model asset prices when using continuously compounded asset returns

© 2014-2024 AnalystPrep.
Q.4592 The monthly closing prices of ApexTech Corporation shares are as follows:

| Date | Closing Price (USD) |
| --- | --- |
| 30 June | 105 |
| 31 July | 120 |
| 31 August | 130 |

The continuous compounded return of ApexTech Corporation shares for the period from June 30 to August 31 is closest to:

A. 10.58 percent.
B. 10.68 percent.
C. 21.36 percent.

The correct answer is C.

The continuously compounded return (CCR) can be calculated using the formula:


\mathrm{CCR} = \ln \left(\frac{\text{Ending Price}}{\text{Beginning Price}}\right)


Therefore;


\mathrm{CCR} = \ln \left(\frac{130}{105}\right) = \ln (1.2381) \approx 0.2136 \text{ or } 21.36\%


CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7a: explain the relationship between normal and lognormal distributions and why the lognormal distribution is used to model asset prices when using continuously compounded asset returns

© 2014-2024 AnalystPrep.
Q.4593 In financial modeling, the lognormal distribution is often preferred over the normal distribution for representing asset prices primarily because asset prices are:

A. Non-decreasing.

B. Without upper limits.

C. Positively constrained.

The correct answer is C.

The lognormal distribution is used to model asset prices because it ensures that prices cannot be negative, which is a fundamental characteristic of asset prices in the real world.

A is incorrect: Asset prices can decrease. They are not guaranteed to be non-decreasing.

B is incorrect: While it's true that asset prices are unbounded on the upper side, this is not the primary reason for choosing the lognormal distribution over the normal distribution. The key reason is the non-negativity constraint.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7a: explain the relationship between normal and lognormal distributions and why the lognormal distribution is used to model asset prices when using continuously compounded asset returns

© 2014-2024 AnalystPrep.
Q.4594 Consider a random variable Y that is distributed according to a lognormal distribution. Which of the following statements is most accurate regarding the relationship between Y and its natural logarithm, ln(Y)?

A. If Y is lognormally distributed, then ln(Y) follows a uniform distribution.

B. If ln(Y) is normally distributed, then Y cannot be lognormally distributed.

C. If ln(Y) is normally distributed, then Y is lognormally distributed.

The correct answer is C.

The definition of a lognormal distribution is that a variable Y is lognormally distributed if its natural logarithm, ln(Y), is normally distributed. Therefore, if ln(Y) is normally distributed, it follows that Y must be lognormally distributed.

A is incorrect: The natural logarithm of a lognormally distributed variable follows a normal distribution, not a uniform distribution.

B is incorrect: It contradicts the definition of a lognormal distribution.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7a: explain the relationship between normal and lognormal distributions and why the lognormal distribution is used to model asset prices when using continuously compounded asset returns

© 2014-2024 AnalystPrep.
Q.4596 Which of the following statements best explains why the lognormal distribution is commonly used to model asset prices in financial markets?

A. The lognormal distribution is symmetric and can model asset prices that can take on negative values.

B. The lognormal distribution has a lower bound at zero, making it suitable for modeling asset prices that cannot be negative.

C. When the continuously compounded returns on a stock are normally distributed, the stock prices are also normally distributed.

The correct answer is B.

The lognormal distribution is appropriate for modeling asset prices because it has a lower bound at zero, ensuring that asset prices cannot be negative. This characteristic aligns with the real-world behavior of asset prices. Additionally, when continuously compounded returns are normally distributed, the stock prices follow a lognormal distribution, further supporting the use of the lognormal distribution for modeling asset prices.

A is incorrect: Lognormal distribution is not symmetric and it is specifically used because it cannot take on negative values.

C is incorrect: It contradicts the relationship between returns and prices. If continuously compounded returns are normally distributed, the stock prices follow a lognormal distribution, not a normal distribution.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7a: explain the relationship between normal and lognormal distributions and why the lognormal distribution is used to model asset prices when using continuously compounded asset returns

© 2014-2024 AnalystPrep.
Q.4597 Which of the following is an appropriate application of Monte Carlo simulation in financial modeling?

A. Providing exact valuations for call options without any further analysis.
B. Evaluating the impact of varying assumptions on a model, such as the distribution of critical variables.
C. Generating a series of returns based on historical data patterns.

The correct answer is B.

By generating a large number of random samples from specified probability distributions, Monte Carlo simulation can be used to investigate the sensitivity of a model's output to changes in assumptions. This is particularly useful for understanding how different scenarios or changes in the distribution of key variables can impact the results of the model.

A is incorrect: While Monte Carlo simulation is used for valuing call options, it does not provide "exact" valuations. Instead, it provides estimates based on simulating numerous scenarios. The accuracy of these valuations depends on the assumptions and parameters used in the simulation.

C is incorrect: Although Monte Carlo simulation can be used to simulate future asset price paths; this option does not capture the essence of what makes Monte Carlo simulation a valuable tool in financial modeling. The focus on "historical data patterns" is too narrow, as Monte Carlo simulation often involves simulating returns based on various stochastic models and assumptions, not just historical patterns.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7b: describe Monte Carlo simulation and explain how it can be used in investment applications.

© 2014-2024 AnalystPrep.
Q.4598 XYZ Corporation is evaluating a new investment project using Monte Carlo simulation. The finance team has constructed a model to simulate the project's potential returns under various scenarios. However, they are concerned about the limitations of this approach. Which of the following is **most likely** a limitation of the Monte Carlo simulation used by XYZ Corporation?

A. Only provides statistical estimates of results, not exact figures.

B. Inability to conduct scenario analysis.

C. Dependence on historical return data.

The correct answer is A.

One limitation of Monte Carlo simulation is that it provides estimates based on a range of possible outcomes rather than exact figures. This is due to the inherent nature of the simulation, which relies on random sampling and probabilistic models.

**B is incorrect**: Monte Carlo simulation is actually well-suited for "what if" or scenario analysis. It allows users to change assumptions and observe the outcomes under different scenarios, making it a valuable tool for exploring a range of possibilities.

**C is incorrect**: While historical data can be used in Monte Carlo simulation, it is not a requirement. Simulations can be based on a variety of assumptions and probability distributions, not just historical records.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7b: describe Monte Carlo simulation and explain how it can be used in investment applications.

© 2014-2024 AnalystPrep.
Q.4599 Consider the following statements made by Tom, Anna, and Fiona regarding the concept of Monte Carlo simulation as used in financial modeling. Tom: A probabilistic approach that employs random sampling to generate a range of possible outcomes and assesses their likelihood in uncertain environments. Anna: A deterministic method that relies on fixed inputs to forecast future financial outcomes with certainty. Fiona: A statistical technique that uses random sampling and historical data to predict the behavior of financial markets. Based on the statements provided, who best describes the concept of Monte Carlo simulation as used in financial modeling?

A. Tom
B. Anna
C. Fiona

The correct answer is A.

Tom accurately describes Monte Carlo simulation. He highlights the probabilistic nature of the technique, its use of random sampling to create multiple scenarios, and its application in assessing risks and uncertainties in financial models.

B is incorrect: Anna inaccurately describes Monte Carlo simulation is not a deterministic method. However, it is a probabilistic approach that accounts for uncertainty by generating multiple scenarios.

C is incorrect: Fiona inaccurately describes Monte Carlo simulation. While Monte Carlo simulation is a statistical technique that involves random sampling, it does not exclusively rely on historical data nor is it limited to predicting market behavior. It can be used in various financial modeling contexts.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7b: describe Monte Carlo simulation and explain how it can be used in investment applications.

© 2014-2024 AnalystPrep.
Q.4600 Which of the following is **least likely** a use of Monte Carlo simulation in valuing a lookback contingent claim?

A. Generating a large number of possible paths for the underlying asset price over the life of the option.

B. Calculating the average of all the discounted payoffs from the simulated paths to estimate the fair value of the claim.

C. Using historical asset price data to determine the exact payoff of the lookback option at expiration.

The correct answer is C.

This is NOT a use of Monte Carlo simulation in valuing a lookback contingent claim. Monte Carlo simulation involves simulating future asset price paths and does not rely on historical data to determine the exact payoff at expiration. The payoff is determined based on the simulated maximum or minimum asset prices, not historical data.

**A is incorrect**: This is a correct use of Monte Carlo simulation in valuing a lookback contingent claim. It allows for the simulation of various scenarios that the asset price might follow over the option's life.

**B is incorrect**: This is a correct use of Monte Carlo simulation. The average of the discounted payoffs from the simulated paths provides an estimate of the fair value of the lookback option.

**CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7b: describe Monte Carlo simulation and explain how it can be used in investment applications.**

© 2014-2024 AnalystPrep.
Q.4602 Which of the following statements **best** describes the purpose of resampling in statistical analysis?

A. Resampling involves repeatedly using the same sample to test different hypotheses without making any statistical inferences about the population.

B. Resampling is a method used exclusively for estimating the mean of a population by drawing multiple samples from the observed data.

C. Resampling entails repeatedly drawing samples from the original observed sample to make statistical inferences about population parameters.

The correct answer is C.

Resampling methods, like Bootstrap, involve drawing multiple samples from the original observed sample to estimate population parameters and assess the variability of these estimates.

**A is incorrect**: Resampling is specifically used to make statistical inferences about population parameters, not just to test different hypotheses without making inferences.

**B is incorrect**: While resampling can be used to estimate the mean of a population, it is not exclusively used for this purpose. Resampling methods, such as Bootstrap and jackknife, can be used to make inferences about various population parameters, not just the mean.

CFA Level I, Volume 1, Topic 4 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7c: describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications.

© 2014-2024 AnalystPrep.
Q.4603 Which of the following statements is **most accurate**? Bootstrap resampling technique:

A. treats the initial sample as a stand-in for the entire population, allowing for the creation of a sampling distribution through repeated resampling.

B. requires conventional analytical formulas like z-statistics to create a sampling distribution for statistical inferences.

C. information about the population is essential to mimic the process of drawing samples from the population.

The correct answer is A.

This statement accurately describes the Bootstrap resampling technique. The method treats the initially obtained sample as a stand-in for the entire population and creates a sampling distribution by repeatedly resampling from the initial sample.

**B is incorrect**: Bootstrap resampling bypasses the need for conventional analytical formulas like z-statistics. It relies on computer simulations to create a sampling distribution for statistical inferences.

**C is incorrect**: In Bootstrap resampling, we do not have information about the population. Our only insight comes from a sample drawn from the "unknown population." The technique relies on the sample to mimic the process of drawing samples from the population.

CFA Level I, Volume 1, Topic 4 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7c: describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications.

© 2014-2024 AnalystPrep.
Q.4604 Which of the following statements **best** distinguishes between the Bootstrap and Monte Carlo simulation techniques?

A. Both techniques use repetitive sampling for statistical inferences but differ in their data generation and usage approaches.

B. Monte Carlo uses the dataset as a proxy for the population, whereas Bootstrap resampling requires pre-determined parameter distributions.

C. Monte Carlo simulation needs many observations for accurate population simulation, whereas Bootstrap can effectively handle smaller datasets.

The correct answer is A.

This statement accurately distinguishes between the two techniques. Bootstrap focuses on inferring population parameters from resampled datasets, while Monte Carlo simulation centers on generating random data with specified statistical distributions.

**B is incorrect**: It incorrectly reverses the characteristics of the two techniques. Bootstrap uses the resampled dataset as a proxy for the true population, while Monte Carlo simulation generates random data with pre-determined statistical distributions.

**C is incorrect**: This statement incorrectly attributes the characteristics of Bootstrap to Monte Carlo simulation and vice versa. Bootstrap infers population parameters from resampled datasets, while Monte Carlo simulation involves generating random data with pre-determined statistical distributions.

CFA Level I, Volume 1, Topic 4 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7c: describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications.

© 2014-2024 AnalystPrep.
Q.4605 In the process of bootstrapping, analysts:

A. are required to define probability distributions for crucial risk factors influencing the underlying random variables.

B. continuously draw samples of identical size, with replacement, from the initial population.

C. aim to derive statistical estimates of population parameters using a singular sample.

The correct answer is C.

Analysts use a single sample to generate multiple resampled datasets, from which they infer the statistical properties of the population.

B is incorrect: Analysts draw samples of the same size, with replacement, not from the original population but from the original sample. This is a key aspect of bootstrapping, as it uses the sample as a proxy for the population.

A is incorrect: One of the advantages of bootstrapping is that it does not require the specification of probability distributions for the underlying random variables or risk factors. Instead, it relies on the empirical distribution of the sample data.

CFA Level I, Volume 1, Topic 4 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7c: describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications.

© 2014-2024 AnalystPrep.
Q.4606 Which of the following accurately describes an advantage of the bootstrapping method? Bootstrapping:

A. yields precise outcomes for population parameters.

B. is intricate and demands comprehensive statistical expertise.

C. can emulate sampling from the population by utilizing the observed.

The correct answer is C.

Bootstrapping allows for the emulation of population sampling through the observed sample, effectively representing the statistical characteristics of the population.

A is incorrect: Bootstrapping generates statistical approximations, not precise outcomes. It's a resampling technique used to estimate population parameters.

B is incorrect: A notable advantage of bootstrapping is its simplicity. It's relatively easy to implement compared to other statistical methods.

CFA Level I, Volume 1, Topic 4 - Quantitative Methods, Learning Module 6, Simulation Methods, LOS 7c: describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications.
# Learning Module 7: Estimation and Inference

Q.422 Which statistic is most likely to be used for a limited normal sample size (less than 30) with an unknown variance?

A. t-test.
B. z-test.
C. The sample size is too small to make any kind of judgment.

The correct answer is A.

A t-test is used if you do not know the population's standard deviation and have a limited sample (less than 30). For a sample size larger than 30, you can use the z-test.

B is incorrect. The z-test is used when the population is normally distributed. The z test can also test when the population is substantial, thanks to the central limit theorem.

C is incorrect. For a sample less than 30 with unknown variance, a t-test is appropriate.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean

© 2014-2024 AnalystPrep.
Q.424 A distribution has a mean of 11% and a standard deviation of 20%. The interval of this distribution using a 95% confidence interval is closest to:

A. -9% to 31%.
B. -28.2% to 50.2%.
C. -21.9% to 43.9%.

The correct answer is B.

Based on the information given in the question the confidence interval is given by:


11\% \pm 20(1.96) = 11\% \pm 39.20 = -28.2\% \text{ to } 50.2\%


The value of 1.96 is based on the fact that 95% of the area of a normal distribution is within 1.96 standard deviations of the mean.

Interpretation of the result: 95% of all observations lie between -28.2% and 50.2%.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.993 The most likely outcome of an increase in sample size is:

A. the sample standard deviation increases.
B. the sample mean gets closer to the population mean.
C. the sample mean varies from the population mean to a large extent.

The correct answer is B.

The standard error of the sample mean is used by analysts to estimate the precision of the sample mean to the population mean. A lower value of the standard more precise estimate.


\sigma_{x} = \frac{\sigma}{\sqrt{n}}


To answer this question, we will use a constant $\sigma$ (3); we will then vary $n$ (10 to represent a smaller sample and 30 a larger sample) $\sigma_{x} = \frac{3}{\sqrt{10}} = 0.948\sigma_{x} = \frac{3}{\sqrt{30}} = 0.548$. As seen above, a larger $n$ (30) size gives a lower SE (0.548). A smaller $n$ (10) gives a higher SE (0.948).

The larger the sample, the more accurate the sample mean, as we consider a larger number of outcomes.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.996 As the degrees of freedom increases and the t-statistic approaches towards the z-statistic, the tails of the distribution most likely become:

A. thicker.
B. thinner.
C. unchanged.

The correct answer is B.

The degrees of freedom (number of observations-1) of a t distribution determine its peakedness. The tails of the t-distribution are usually thicker than the normal distribution, so when the number of observations increases and the degrees of freedom increase, the t-distribution becomes more spiked/peaked with thinner tails.

A is incorrect. The tails of the t-distribution is usually thicker than the normal distribution.

C is incorrect. There is an expected change on the tails of the t-distribution with an increase in the degrees of freedom.

Q.1877 The most accurate definition of a sample error is the:

A. estimation error created by using a non-random sample.
B. difference between a sample statistic and its corresponding population parameter.
C. difference between the point estimate of the mean and the mean of the sampling distribution.

The correct answer is B.

Sampling error is the difference between any sample statistic and its corresponding population parameter. An example of sampling error would be the difference between the sample mean $\bar{X}$ and the population mean, $\mu$.

A is incorrect. It is the definition of random sampling and not a sampling error.

C is incorrect. It is the definition of standard error, and not a sampling error.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7a: compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem.

© 2014-2024 AnalystPrep.
Q.1879 The Central Limit Theorem is most appropriately concerned with the sampling distribution of the:

A. sample mean.

B. population mean.

C. sample standard deviation.

The correct answer is B.

The central limit theorem states that the sample mean X of random samples of sizes n drawn from a population with mean μ and variance σ² will have an approximately normal distribution with mean μ and var σ²/n as the sample size n becomes large.

A is incorrect. The sampling distribution is majorly concerned with the sample mean and not the Central Limit Theorem.

C is incorrect. The sample standard deviation is concerned with the value of the sample variance.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.1884 The following information is available on a sample of advertising budgets taken from 81 U.S companies:

- The mean advertising budget is 10 million.
- The sample variance is 36 million.

The standard error of the sample mean is closest to:

A. 0.667.
B. 1,667.
C. 11,384

The correct answer is A.

The standard error of the sample mean $(\mathrm{S}\hat{\mathrm{x}})$ can be calculated using the formula:


\mathrm{S}_{\hat{\mathrm{x}}} = \frac{\mathrm{s}}{\sqrt{\mathrm{n}}}


Where:

s is the sample standard deviation.

n is the sample size.

The sample standard deviation is the square root of the variance $= \sqrt{36 \text{ million}} = 6$ million.

The standard error of the sample mean is estimated by dividing the standard deviation of the sample by the square root of the sample size $= \frac{6}{\sqrt{81}} = 0.667$.

B is incorrect. Results from the mean advertising budget divided by the sample standard deviation of the mean square root.

C is incorrect. The result of dividing the sample variance by the sample standard deviation is the square root of the variance.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.2752 Which of the following is the most appropriate example of a simple random sample?

A. An analyst randomly selects AAA-rated corporate bonds as a sample to estimate the default risk of the U.S. Bond market.

B. An analyst randomly selects large-cap index stocks from the Mumbai Stock Exchange to measure the holding period return of Indian stocks.

C. An analyst randomly selects the GDP growth rate of five random countries from the European Union to measure the GDP growth of European Union countries.

The correct answer is C.

The five European countries are selected randomly (without any specific criteria) to measure the GDP growth rate of European Union countries.

A is incorrect. It is also an example of stratified random sampling. It applies the criteria of selecting only AAA-rated corporate bonds.

B is incorrect. It is an example of stratified random sampling. This is because the analyst only takes Large-cap index stock (Criteria or Strata is applied).

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7a: compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem.

© 2014-2024 AnalystPrep.
Q.2753 A survey team in Srilanka conducted a health survey in a village by dividing the village population into three different age ranges. The first range consisted of the population aged between 0 to 20 years, the second range was of the population above 20 years and below 45 years, and the last range was comprised of all the villagers above 45 years of age. A sample was drawn from each range according to the proportion of that range. The results showed that the healthiest people were between the ages of 0 and 20 years. The most likely type of sampling technique used by the survey team is;

A. simple random sampling.
B. stratified random sampling.
C. systematic random sampling.

The correct answer is B.

In Stratified Random Sampling, the population is divided into subpopulations based on some criteria or strata (in our example, the criteria were different age ranges). The simple random sample is then drawn from the subpopulation or stratum as per the proportion of that stratum in the total population.

A is incorrect. Simple random sampling does not involve the division of a population into strata. In simple random sampling, all the population elements have an equal chance of being randomly selected.

C is incorrect. In systematic random sampling, the sample is collected by using a predetermined regular interval, obtained by dividing the population size, N, by the sample size, n.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7a: compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem.

© 2014-2024 AnalystPrep.
Q.2754 Bogotara is a hypothetical country whose bond market is composed of 2,000 corporate and government bonds. An analyst interested in investing in Bogotara's bond market calculated the mean return of 11.09% based on the sample of 200 bonds, while the population mean return of Bogotara's bond market is only 9.89%. Which of the following errors is most likely related to the analyst's estimation?

A. Mean error.
B. Sampling error.
C. Standard deviation.

The correct answer is B.

In statistics, sampling error is incurred when the statistical characteristics of a population are estimated from a subset, or sample, of that population. Since the sample does not include all members of the population, statistics on the sample, such as means and quantiles, generally differ from the characteristics of the entire population, which are known as parameters.

A is incorrect. The mean error refers to uncertainty in measurement or the difference between the measured and true/correct values.

C is incorrect. The following steps guide the calculation of the standard deviation error;

Step 1: Calculate the mean (Total of all samples divided by the number of samples).

Step 2: Calculate each measurement's deviation from the mean (Mean minus the individual measurement).

Step 3: Square each deviation from the mean. Squared negatives become positive.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7a: compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem.

© 2014-2024 AnalystPrep.
Q.2755 An analyst is given the financial statements of the top five firms in the logistics sector to conduct a cross-sectional analysis. Which of the following methods is most appropriate for cross-sectional data analysis?

A. The analyst should compare the profit margin of each of the five firms within the sector.

B. The analyst should compare the returns of each of the five firms with their historical returns.

C. The analyst should use the EPS of the last 5 years of any firm to estimate the growth in the sector.

The correct answer is A.

Option A uses the cross-sectional data or the data of peer firms to conduct the analysis, while options B) and C) provide a time series data analysis.

Cross-sectional data is a type of data collected by observing many subjects (such as individuals, firms, countries, or regions) at the same time or without regard to differences in time. On the other hand, time-series data refers to observations made over a period of time at regular intervals.

B and C are incorrect. It also provides for time-series analysis.

© 2014-2024 AnalystPrep.
Q.2757 Which of the following is least likely a property of the central limit theorem?

A. The variance of distributions of the sample mean is calculated as $\frac{\sigma^2}{\sqrt{n}}$.

B. The mean of the population and the mean of all of the distributions of the sample's means are equal.

C. If the sample size is equal to or larger than 30, we can assume that the sample mean is normally distributed.

The correct answer is A.

The variance of the central limit theorem is calculated as $\frac{\sigma^2}{n}$ and not $\frac{\sigma^2}{\sqrt{n}}$.

B is incorrect. The mean of the sample means is equal to the population mean.

C is incorrect. It is an appropriate property of the central limit theorem. If the sample size is equal to or larger than 30, we can assume that the sample mean is normally distributed.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.2758 Which of the following is the most appropriate definition of the standard error of the sample mean?

A. The variance of the distribution of the sample mean.

B. The standard deviation of the distribution of the sample means.

C. Difference between the population mean and the sample mean.

The correct answer is B.

The standard error of the sample mean is the standard deviation of the distribution of the sample means. It is a measure of how spread out the means of different samples are likely to be from the population mean.

It is calculated as the standard deviation of the population divided by the square root of the sample size.

This is why it's called the standard "error" - it tells us where the mean of our sample is likely to fall in relation to the true population mean

A is incorrect. The standard error of the sample mean is the standard deviation, not the variance, of the sample, mean distribution.

C is incorrect. The difference between the population mean and the sample mean is the sampling error, not the standard error.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.2759 The mean return on the stocks of automotive companies is $26.5, while the sample standard deviation of 36 automotive companies is $3.1. The standard error of the sample mean is closest to:

A. $0.52
B. $0.60
C. $0.74

The correct answer is A.

The standard error of the sample mean $(\sigma_{\bar{x}})$ can be calculated using the formula: $\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{6}}$
\text{Standard Error} = \frac{\text{Standard deviation of the sample mean}}{\sqrt{\text{Sample size}}} = \frac{\$3.1}{\sqrt{36}} = \frac{3.1}{6} = \$0.5166667 \approx \$0.52


CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

Q.2761 The mean of a population of 1,000 observations is 61. If the mean and the variance of a sample of 225 observations are 49 and 25 respectively, then the standard error of the sample mean is closest to:

A. 0.33.
B. 0.46
C. 0.71

The correct answer is A.

If the variance of the sample is 25 ($s^2 = 25$), then the standard deviation $s = 5$.

The standard error of the sample mean of 225 observations = $\frac{\text{Standard Deviation of the sample mean}}{\sqrt{\text{Sample size}}} = \frac{\$3.1}{\sqrt{36}} = \frac{3.1}{6} = \$0.5166667 \approx \$0.52$

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.2767 Which of the following is least likely an example of out-of-sample testing?

A. An analyst developed a model to measure the risk of small-cap equity stocks. The model is then applied to large-cap stocks to measure their significance level.

B. An analyst developed a return model based on the S&amp;P 500 daily index from January 1st, 2015 to March 30th, 2015. He then applies the model on data collected between April 1st, 2015, and May 15th, 2015 to test its significance.

C. An analyst developed a model to forecast bond yield variations based on weekly yield variations in 10-year U.S. bonds for the first quarter of 2009 to the fourth quarter of 2011. To test its significance, the model was then applied to yield variations from the third quarter of 2010 to the second quarter of 2011.

The correct answer is C.

Out-of-sample testing is defined as using the developed model based on in-the-sample data and tested on out-of-sample data to test its statistical significance. It tests the model on in-the-sample data. The sample data is data that is available at the time of building the model. The sample data is unknown when building the model, and the model should forecast that.

A is incorrect. It's out-of-sample testing since the analyst applies the model on large-cap stocks, yet it was developed to measure the risk of small-cap equity..

B is incorrect. It's also out-of-sample testing since the range of data collection to be used on the model data differs from that of the daily designed index..

© 2014-2024 AnalystPrep.
Q.3468 A researcher wants to conduct a study to determine the level of literacy in his country. He randomly selects a few universities and conducts a survey among the school students. With respect to his study, the sampling can be best described as:

A. systematic sampling.
B. simple random sampling.
C. stratified random sampling.

The correct answer is C.

The study aims to determine the level of literacy in the country. However, the survey is conducted among university students. Thus, the sampling can be best defined as stratified random sampling.

A is incorrect. In Systematic random sampling, a sample is selected using a pre-determined regular interval known as k. K is obtained by dividing the population size N by the sample size n.

B is incorrect. In simple random sampling, a sample is obtained by randomly picking out elements from a population without first forming groups of elements with similar characteristics from within the population. Each element in simple random sampling has an equal chance of being selected.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7a: Compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem.

© 2014-2024 AnalystPrep.
Q.3469 Which of the following is the most accurate statement regarding the central limit theorem? From a population with mean and a finite variance:

A. the sample mean approaches a normal distribution for systematic random samples of size $n$ for $n &lt; 30$.

B. the sample mean approaches a normal distribution for systematic random samples of size $n$ as $n$ becomes larger.

C. the sample mean approaches a normal distribution for simple random samples of size $n$ as $n$ becomes larger.

The correct answer is C.

The central limit theorem states that, for simple random samples of size $n$ from a population with mean $\mu$ and finite variance $\sigma^2$, the sample mean approximately has a normal distribution with mean $\mu$ and variance $\frac{\sigma^2}{n}$ as $n$ becomes large. The theorem holds for $n$ greater than or equal to 30. CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.3470 Large random samples of size $n$ are repeatedly taken from a large population. Thereafter, the mean of the random samples is taken to create a distribution. If the population mean is $\mu$, then the mean of the distribution created by computing the mean of the random sample will most likely be:

A. $n\mu$
B. $\frac{p^2}{n}$
C. $\mu$

The correct answer is C.

According to the central limit theorem, the population for a simple random sample of size $n$ from a population with mean and finite variances, the sample mean approaches a normal distribution as $n$ becomes larger. The mean of the random samples taken is equal to the mean of the population.

We can also tackle this question from the perspective of the qualities of a good point estimator. A good point estimator (in this case, the sample mean) must be unbiased. An estimator is unbiased if its expected value is equal to its true value (in this case, if the true value is $\mu$ then the expected value must also be $\mu$)

A good point estimator must also be consistent. If an estimator is consistent, as the sample size increases, the probability that the estimator "closes in" on the actual value of the parameter approaches 1. Since the sample is already large in this particular question, as per the consistent quality of a good estimator, the sample mean must be equal to the population mean (which has been given as x).

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.3475 An equity research analyst wants to create an index that contains an equal representation of each segment of the market. The most appropriate sampling method to create the index is:

A. stratified sampling.
B. systematic sampling.
C. simple random sampling.

The correct answer is A.

Stratified sampling divides stocks with similar properties in a group. Therefore, an index created through stratified sampling will have an equal representation of each segment.

B is incorrect. In Systematic random sampling, a sample is selected using a pre-determined regular interval known as k. K is obtained by dividing the population size N by the sample size n.

C is incorrect. In simple random sampling, a sample is obtained by randomly picking out elements from a population without first forming groups of elements with similar characteristics from within the population. Each element in simple random sampling has an equal chance of being selected.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7a: Compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem.

© 2014-2024 AnalystPrep.
Q.3737 The mean hourly wage for coal workers in the U.S. is $15.5 with a population standard deviation of $3.2. If the sample size is 30, the standard error of the sample mean is closest to:

A. 0.206
B. 0.584
C. 0.813

The correct answer is B.

Since the standard deviation for the population is known,


\text{Standard error of the mean} = \frac{\sigma}{\sqrt{n}} = \frac{3.2}{\sqrt{30}} = 0.5842


Interpretation: If we were to take a number of samples of size 30 from the US coal workers population and proceed to prepare a sampling distribution of the sample means, the means of the various samples would vary from each other by 0.5842. The standard error gives analysts an idea of how precisely the sample mean estimates the population mean. The smaller the sample mean, the more precise the estimate. The standard error in this question is small; this implies that this particular sample has almost accurately estimated the population mean. The mean hourly wage for the population of coal workers from which this sample was obtained is, therefore, likely to be around $15.5

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.3744 A population has a known mean of 100. Suppose 36 samples are randomly drawn from this population with replacement. The observed mean is 97.8 and the standard deviation is 10. The standard error of the sample mean is closest to:

A. 0.360
B. 1.011
C. 1.667

The correct answer is C.

The standard error of the sample mean is;


\text{Standard error of the sample mean} = \frac{\sigma}{\sqrt{n}} = \frac{10}{\sqrt{36}} = 1.667


Interpretation: The means of the 36 samples randomly drawn from the population vary from each other by 1.6667. The standard error gives analysts an idea of how precisely the sample mean estimates the population mean. The smaller the standard error, the better. In this case, the sample mean is not so small. As a result, the sample might not be a very good estimator of the population mean.

A is incorrect. It assumes the following calculation:


\text{Standard error of the sample mean} = \frac{36}{10} = 0.36


B is incorrect. It assumes the following calculation;


\text{Standard error of the sample mean} = \frac{\sigma}{\sqrt{\text{observed} - \text{mean}}} = \frac{10}{\sqrt{97.8}} = 1.011


CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7b: Explain the central limit theorem and its importance for the distribution and standard error of the sample mean.

© 2014-2024 AnalystPrep.
Q.4024 XYZ Associates, a qualified audit firm, wants to audit the books of accounts for ABC Ltd for the financial year 2021. During their fieldwork, XYZ discovered that ABC Ltd had a significant number of financial transactions in their books. Due to time constraints, XYZ couldn't audit all the transactions. To manage this, XYZ Audit Firm employed a sampling technique that allowed them to make a practical and informed selection of transactions to audit, acknowledging that the technique might introduce some bias but still provide valuable insights.

A. Cluster sampling.

B. Judgemental sampling.

C. Convenience sampling.

The correct answer is B.

Judgemental sampling refers to the process of handpicking a few elements from a population built on professional knowledge. Thus XYZ Associates will employ the judgmental sampling technique in sampling the financial transactions of ABC Limited because of time constraints. The downside of using this sampling technique is that XYZ Associates may be biased hence yielding skewed results.

A is incorrect. Cluster sampling involves classifying the population into subgroups known as clusters, and then certain clusters are selected as a whole through a simple random sampling technique. Thus, XYZ Associates cannot use this sampling technique in their audit process.

C is incorrect. A population element is selected during convenience sampling based on how easily a researcher can access the element. Note that samples are selected conveniently in this method, so they may not necessarily represent the whole population, thus compromising the sampling accuracy.

CFA Level I, Volume 1, Topic 2 - Quantitative Methods, Learning Module 7, Estimation and Inference, LOS 7a: Compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem.

© 2014-2024 AnalystPrep.
# Learning Module 8: Hypothesis Testing

Q.423 Which statistic should you use to most appropriately compare two population variances with a sample size smaller than 30?

A. z-test.
B. t-test.
C. F-test.

The correct answer is C.

An F-test is used to compare two populations' variances. The samples can be of any size. The test statistic used to obtain the ratio of 2 population variances is:


\frac {S _ {1} ^ {2}}{S _ {2} ^ {2}} \sim F _ {(n 1 - 1) (n 2 - 2)}


A is incorrect. The z test is used when the underlying variable follows a normal distribution or when the sample size is large (n&gt;30). When the sample size is large (n&gt;30), the distribution is assumed to be approximately normal according to the central limit theorem.

B is incorrect. A t-test is appropriate when testing for the means.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.425 Which of the following statements is least accurate?

A. A 1% significance level is the same as a 99% confidence.

B. The alternative hypothesis (Hₐ) always includes an equal sign.

C. The alternative hypothesis (Hₐ) is usually the hypothesis which we are trying to assess.

The correct answer is B.

The NULL hypothesis (H₀) always includes an equal sign. The null hypothesis represents the current known state of the population parameter being tested. The NULL hypothesis always includes an equal sign.

On the other hand, the alternative hypothesis is concluded if there is sufficient evidence to reject the null hypothesis. For a two-tailed test, the alternative hypothesis will contain an equal sign. For a one-tailed test, the alternative hypothesis will either have a “&gt;” or a “&lt;” sign.

A is incorrect. It is a true statement. To get the significance level or the alpha, we subtract the given confidence percentage from 100. 100%-99%(given percentage alpha)=1% (significance level).

C is incorrect. The alternative hypothesis is chosen if there is sufficient evidence to reject the null hypothesis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1110 Which of the following statements is most accurate?

A. The null hypothesis is the hypothesis that the researcher wants to reject.
B. The null hypothesis is the hypothesis that the researcher wants to accept.
C. The alternative hypothesis is the hypothesis that the researcher wants to reject.

The correct answer is A.

The null hypothesis, designated by H0, is the hypothesis that the researcher wants to reject. It represents the current known state about the parameter to be tested. In the presence of sufficient evidence, the null hypothesis is meant to be rejected.

B is incorrect. Researchers want to accept the alternative hypothesis by rejecting the null hypothesis. Besides, it is statistically incorrect to say "accept the null hypothesis because of the fact that you cannot prove a negative" Statisticians use the term "fail to reject" and not "accept" because insufficient evidence only means that you have failed to prove that something exists. It does not necessarily mean that something is non-existent.

C is incorrect. Researchers want to accept the alternative hypothesis by rejecting the null hypothesis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1112 Which of the following assumptions is least likely required for the difference in means test based on two samples?

A. The two samples are independent.
B. The two populations have equal variances.
C. The two populations are normally distributed.

The correct answer is B.

We can still calculate the difference in means even when the populations' variances are not equal. When variances are assumed to be unequal, we use both sample variations to calculate the t-statistic.

A and C are incorrect. For difference in means test based on two samples, the samples must be independent and normally distributed!

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
Q.1113 Which of the following statements is most accurate?

A. The alternative hypothesis is what is accepted if there is sufficient evidence to reject the null hypothesis.

B. The alternative hypothesis is what is accepted if there is sufficient evidence to accept the null hypothesis.

C. The null hypothesis is what is accepted if there is sufficient evidence to reject the alternative hypothesis.

The correct answer is A.

The alternative hypothesis, designated by Ha, is what is accepted if there is sufficient evidence to reject the null hypothesis.

B is incorrect. Statistical tests try to find evidence to reject or to fail to reject the null hypothesis. If the null hypothesis has been rejected, then we accept the alternative hypothesis. If we fail to reject the null hypothesis, then we reject the alternative hypothesis.

C is incorrect. The alternative hypothesis, designated by Ha, is what is accepted if there is sufficient evidence to reject the null hypothesis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1114 When hypothesis testing, the choice between using a critical value based on the z-distribution or the t-distribution most likely depends on:

A. The sample size.

B. The distribution of the population.

C. The sample size and the distribution of the population.

The correct answer is C.

When hypothesis testing, the choice between using a critical value based on the z-distribution or the t-distribution depends on sample size, the distribution of the population, and whether or not the variance of the population is known.

A is incorrect. It suggests that the choice depends solely on the sample size. While the sample size is indeed a critical factor—typically, a z-distribution is used when the sample size is large (n > 30) and the population variance is known, and a t-distribution is used for smaller samples (n ≤ 30) where the population variance is unknown—it does not account for the importance of the population distribution. The assumption of normality or near-normality of the population distribution is crucial when deciding between the z and t distributions, especially for smaller sample sizes.

B is incorrect. It suggests that the choice depends solely on the distribution of the population. While the population distribution is an important consideration, especially in cases where the sample size is small and the central limit theorem cannot be applied to assume a normal distribution of sample means, it is not the only factor. The sample size plays a significant role in determining whether the distribution of the sample means can be approximated to a normal distribution (using the z-distribution) or if a t-distribution should be used due to the increased uncertainty associated with smaller samples and unknown population variance.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.
Q.1115 Which of the following statements is most accurate?

A. The p-value is the probability of obtaining a test statistic that would lead to a rejection of the null hypothesis, assuming the null hypothesis is not true.

B. The p-value is the probability of obtaining a test statistic that would lead to a rejection of the null hypothesis, assuming the null hypothesis is true.

C. Neither A) nor B)

The correct answer is B.

The p-value is the probability of obtaining a test statistic that would lead to a rejection of the null hypothesis, assuming the null hypothesis is true. It is the smallest level of significance at which the null hypothesis can be rejected.

B is incorrect. This option suggests that researchers aim to accept the null hypothesis, which misrepresents the goal of hypothesis testing. The primary aim is not to accept the null hypothesis but to test it against the alternative hypothesis. If the evidence does not strongly support the alternative hypothesis, researchers may fail to reject the null hypothesis, but this does not equate to accepting it as true.

C is incorrect. In fact, the alternative hypothesis (H1 or Ha) represents the outcome that researchers are typically interested in demonstrating to be plausible. The alternative hypothesis posits the existence of an effect, difference, or relationship that the research aims to support by rejecting the null hypothesis. The process of hypothesis testing is structured to assess the strength of evidence against the null hypothesis, and if sufficient evidence is found, to reject H0 in favor of Ha.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1116 The most appropriate test statistic for a test of the equality of variances for two normally distributed random variables, based on two independent random samples, is the:

A. t-test.
B. F-test.
C. Chi-squared test.

The correct answer is B.

The F-test is the appropriate test for a test of the equality of variances for two normally distributed random variables, based on two independent random samples.

A is incorrect. The t-test is the appropriate test for a population whose mean and standard deviation are not given.

C is incorrect. The chi-squared test is the appropriate test for testing whether a hypothesized value of variance is equal to, less than, or greater than the true population variance.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1117 Which of the following statements about the F-distribution and the chi-square distribution is least accurate?

A. Both distributions are asymmetrical.
B. Both distributions are bound by zero on the left.
C. Both distributions have means that are less than their standard deviations.

The correct answer is C.

To answer this question, we will review the properties of each of the two distributions:

**Chi-Square Distribution**

1. Chi-square distribution is a ratio of two non-negative values. As a result, it is a non-negative distribution. This implies that it has a positive skew (skewed to the right).
2. Chi-square distribution is a non-symmetric distribution.
3. Each degree of freedom has its chi-square distribution.

**F Distribution**

1. The F distribution is positively skewed (skewed to the right).
2. Values of the F distribution are either zero or positive.
3. The shape of the F-distribution depends on its (a) parameters and (b) degrees of freedom.

There is no consistent relationship between the mean and the standard deviation of the chi-square distribution or the F-distribution.

**A is incorrect.** It represents a true statement. Both distributions are skewed to the right. Any distribution that is skewed is asymmetrical.

**B is incorrect.** It represents a true statement. Both distributions are positively skewed. This implies that they are both bound by zero on the left.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
Q.1118 The most appropriate test statistic to test the hypothesis that the variance of a normally distributed population is equal to 13 is the:

A. t-test.
B. F-test.
C. Chi-squared test.

The correct answer is C.

The chi-squared test is used to test whether a hypothesized value of variance is equal to, less than, or greater than the true value of the population variance.

A is incorrect. The t-test is an appropriate test for a population whose mean and standard deviation is not given.

B is incorrect. The F-test is an appropriate test statistic for testing the equality of variances for two normally distributed random variables based on two independent random samples.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1120 For two independent samples from two normally distributed populations, the difference in means can most likely be tested using the:

A. F-test.
B. t-statistic.
C. Chi-squared test.

The correct answer is B.

For two independent samples from two normally distributed populations, the difference in means can be tested using the t-statistic.

A is incorrect. The F-test is used to test for the equality in population variance, not mean differences.

C is incorrect. The chi-square test is used to test for dependence/ independence between categorical variables.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1121 Which of the following statements is most likely correct?

A. Parametric tests do not rely on assumptions regarding the distribution of the population but are specific to population parameters.

B. Parametric tests rely on assumptions regarding the distribution of the population but are not specific to population parameters.

C. Neither A) nor B)

The correct answer is C.

Parametric tests are statistical tests in which we make assumptions regarding the distribution of a population. They rely on assumptions regarding the distribution of the population and are specific to population parameters. Assuming that a variable follows a normal distribution is an example of a parametric test.

Non-parametric tests, on the other hand, do not make any assumptions regarding the distribution of the parameter under study. Non-parametric tests are used by researchers in cases where; the median is more desirable than the mean, the data under study is ordinal, and the sample size is very small.

A is incorrect. This option inaccurately states that parametric tests do not rely on assumptions regarding the distribution of the population. In reality, the defining characteristic of parametric tests is their reliance on such assumptions. These tests assume that the data follow a certain distribution (often normal), which is crucial for the validity of the test results. The assumption about the distribution allows for the derivation of exact sampling distributions of test statistics under the null hypothesis, facilitating precise probability calculations and decision-making regarding the hypothesis being tested.

B is incorrect. However, it inaccurately claims that these tests are not specific to population parameters. On the contrary, parametric tests are specifically designed to make inferences about population parameters, such as means, variances, and proportions. These tests utilize sample data to estimate the parameters of interest and test hypotheses about their values. The specificity to population parameters is a key feature of parametric tests, distinguishing them from non-parametric tests, which do not make such specific inferences about population parameters.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
Q.1887 Which of the following is the most accurate sequence of steps in hypothesis testing?

A. State the hypothesis, select the level of significance, compute the test statistic, formulate the decision rule, and make a decision.

B. State the hypothesis, select the significance level, formulate the decision rule, compute the test statistic, and make a decision.

C. State the hypothesis, formulate the decision rule, select the significance level, compute the test statistic, and make a decision.

The correct answer is B.

The correct sequence is:

1. State the hypothesis
2. Select the level of significance
3. Formulate the decision rule
4. Compute the test statistic
5. Make a decision

A is incorrect. It suggests computing the test statistic before formulating the decision rule. This sequence is not optimal as the decision rule, which is based on the significance level and the distribution of the test statistic under the null hypothesis, should be established before computing the test statistic. This ensures that the researcher knows in advance how to interpret the computed test statistic in the context of the hypothesis being tested.

C is incorrect. The significance level is a critical component in formulating the decision rule. The significance level, often denoted as $\alpha$, determines the threshold for rejecting the null hypothesis. Without selecting the significance level first, it would not be possible to formulate an appropriate decision rule that accurately reflects the researcher's criteria for making a decision about the hypothesis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1888 Which of the following statements about hypothesis testing is the least accurate?

A. A Type II error is failing to reject a false null hypothesis.

B. The null hypothesis is a statement about the value of a population parameter.

C. If the alternative hypothesis is $H_a$: M &gt; Mo, a two-tailed test is appropriate.

The correct answer is C.

The alternative is a one-sided test if the “&gt;” or “&lt;” sign is used and two-sided when the “=” sign is used.

A is incorrect. Type II error is failing to reject a false null hypothesis.

B is incorrect. The hypotheses are always stated in terms of a population parameter.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1890 For the calculation of the test statistic, the most appropriate formula is:

A. $\frac{\text{Sample Mean - Hypothesized mean}}{\text{Standard error of sample mean}}$.
B. $\frac{\text{Population Mean - Sample Mean}}{\text{Standard error of sample mean}}$.
C. $\frac{\text{Population Mean - Sample Mean}}{\text{Standard Deviation}}$.

The correct answer is A.

The test statistic is a quantity that is calculated based on a sample. The value of a test statistic is used to determine whether or not to reject the null hypothesis.

The appropriate formula for the calculation of the test statistic is


\text{Test statistic} = \frac{\text{Sample Mean - Hypothesized mean}}{\text{Standard error of the sample mean}}.


B is incorrect. In hypothesis testing, the focus is on how the sample mean compares to a hypothesized population mean, not the other way around. Additionally, the denominator should be the standard error of the sample mean, not the standard deviation of the sample. The standard error accounts for the sample size, making it a more appropriate measure of variability for hypothesis testing.

C is incorrect. This option suggests using the population mean minus the sample mean divided by the standard deviation. The use of the standard deviation instead of the standard error of the sample mean does not account for the size of the sample, which is crucial in determining the variability of the sample mean. Furthermore, the order of subtraction (population mean - sample mean) is not standard practice in hypothesis testing, where the focus is on the deviation of the sample mean from a hypothesized value.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1891 While performing a hypothesis test, Albert Khan is told that his analysis suffers from a Type I error. It therefore most likely indicates that:

A. Khan rejected the null hypothesis when it was actually false.
B. Khan rejected the null hypothesis when it was actually true.
C. Khan failed to reject the null hypothesis when it was actually false.

The correct answer is B.

A Type I error means that Khan rejected the null hypothesis when it was actually true.

A is incorrect. It does not represent any error. We reject the null hypothesis when it is false.

C is incorrect. It represents type II error. Type II error occurs when analysts fail to reject a false null hypothesis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1893 Is the following statement most likely correct?

"The decision rule for rejecting or failing to reject the null hypothesis is based on the distribution of the test statistic. If the test statistic follows a normal distribution, the decision rule is based on critical values determined from the z-distribution."

A. Yes.

B. No, because if the test statistic follows a normal distribution, the decision rule is based on critical values determined from the t-distribution.

C. No, because the decision rule for rejecting or failing to reject the null hypothesis is based on the value of the test statistic and the critical value.

The correct answer is A.

The statement is correct. The decision rule for rejecting or failing to reject the null hypothesis is based on the distribution of the test statistic. If the test statistic follows a normal distribution, the decision rule is based on critical values determined from the z-distribution.

B is incorrect. This option incorrectly suggests that the decision rule for rejecting or failing to reject the null hypothesis does not rely on the distribution of the test statistic and the critical values from the z-distribution when the test statistic follows a normal distribution. This misunderstanding could lead to the incorrect application of hypothesis testing principles. The z-distribution is specifically used for test statistics that follow a normal distribution, especially in cases where the population variance is known, or the sample size is sufficiently large for the Central Limit Theorem to apply, ensuring the sample mean's distribution approximates a normal distribution.

C is incorrect. This option misstates the conditions under which the t-distribution is used. The t-distribution is applied when the population variance is unknown, and the sample size is small ( $n \leq 30$ ). It is broader and flatter than the z-distribution, accounting for the increased uncertainty in estimating the population standard deviation from the sample. While it is true that the decision rule for hypothesis testing involves comparing the test statistic to critical values, the choice of distribution ( $z$ or $t$ ) depends on the known or unknown status of the population variance and the sample size. Therefore, stating that the decision rule should always be based on the t-distribution when the test statistic follows a normal distribution is incorrect.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1894 A two-tailed hypothesis test at the 95% significance level with a p-value of 2.14% most likely indicates that:

A. at a 2% significance level, we can reject the null hypothesis.
B. at a 3% significance level, we can reject the null hypothesis.
C. at a 3% significance level, we cannot reject the null hypothesis.

The correct answer is B.

The p-value is the smallest level of significance for which the null hypothesis can be rejected. At 2.14% and any level above 2.14%, the null hypothesis can be rejected.

A is incorrect. It suggests that at a 2% significance level, we can reject the null hypothesis. However, since the p-value of 2.14% is greater than 2%, it does not meet the criteria for rejection at this stricter significance level. The p-value must be less than or equal to the significance level to justify rejecting the null hypothesis.

C is incorrect. The p-value indicates the probability of obtaining a result at least as extreme as the one observed, assuming the null hypothesis is true. A p-value lower than the significance level suggests that such extreme results are unlikely under the null hypothesis, leading to its rejection. Therefore, this option misinterprets the relationship between the p-value and the significance level.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1895 Which of the following statement(s) is/are most accurate?
I. Decreasing the significance level will decrease the probability of failing to reject a false null
II. Decreasing the significance level will increase the power of the test.

A. Only II is correct.
B. I and II are correct.
C. I and II are incorrect.

The correct answer is C.

Decreasing the significance level will INCREASE the probability of failing to reject a false null and DECREASE the power of the test.

A is incorrect. As $\alpha$ decreases, the likelihood of rejecting the null hypothesis when it is false (i.e., detecting a true effect) decreases, thus reducing the power of the test.

B is incorrect. Statement I posits that decreasing the significance level will decrease the probability of failing to reject a false null hypothesis. In reality, decreasing the significance level increases the probability of failing to reject a false null hypothesis ($\beta$), which is the definition of a Type II error. When the significance level is lower, the criteria for rejecting the null hypothesis are more stringent, making it more difficult to detect a true effect when it exists. This leads to an increased likelihood of failing to reject the null hypothesis when it is indeed false, thereby increasing $\beta$ and decreasing the test's power.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1896 A survey is conducted to determine if the average starting salary of investment bankers is equal to or greater than $57,000 per year. Given a sample of 115 newly employed investment bankers with a mean starting salary of $65,000 and a standard deviation of $4,500, and assuming a normal distribution, the test statistic is closest to:

A. 19.06
B. 204.40.
C. 419.62

The correct answer is A.


\text{Standard error of the sample mean} = \frac{\text{Standard deviation}}{\sqrt{\text{Sample size}}} = \frac{\$4,500}{\sqrt{115}} = 419.6272


And


\text{Test statistic} = \frac{\text{Sample mean} - \text{Hypothesized value}}{65,000 - 57,000} = 19.06


B is incorrect. It indicates the test statistic without finding the square root of the sample size.

C is incorrect. It is the standard error of the mean.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1897 Hilda believes that the average return on equity in the consumer durables industry is greater than 8%. The null (H₀) and the alternative (Hₐ) hypotheses for this study are most likely:

A. H₀: M = 0.08 versus Hₐ: M ≠ 0.08
B. H₀: M ≥ 0.08 versus Hₐ: M &lt; 0.08
C. H₀: M ≤ 0.08 versus Hₐ: M &gt; 0.08

The correct answer is C.

This is a one-sided alternative (so we cannot use =) because of the "greater than" belief. The null hypothesis is formulated as follows: H₀: M ≤ 0.08 versus Hₐ: M &gt; 0.08. It tests whether there is evidence that the actual parameter (Average return) is significantly greater than the hypothesized value (8%). If there is enough evidence, we reject the null hypothesis. If there is not, we accept the null hypothesis.

A is incorrect. It is a one-sided alternative (so we cannot use =) because of the "greater than" belief.

B is incorrect. The choice indicates that Ha M &lt; 0.08, which negates the statement.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.1899 The most appropriate hypothesis test concerning the variance of a normally distributed population is referred to as the:

A. Z-test.
B. F-test.
C. Chi-squared test.

The correct answer is C.

A chi-squared $(X^2)$ statistic is used to investigate whether distributions of categorical variables differ from one another.

A is incorrect. The Z test is used when comparing the means of two distributions with known variances.

B is incorrect. The F test is used when checking for the equality of two population variances

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

Q.1900 Which of the following statement(s) is/are most accurate?

I. Nonparametric tests have more assumptions than parametric tests.
II. When data is based on ordinal measurements, we use nonparametric tests.

A. Both statements are correct.
B. Both statements are incorrect.
C. Only one statement is correct

The correct answer is C.

Statement I is incorrect. Nonparametric tests have fewer assumptions than parametric tests.

Statement II is correct. When data is based on ordinal measurements, we use nonparametric tests. Non-parametric tests are also used when: the median is more desirable than the mean and when the sample size is extremely small.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
Q.1901 A large positive value of the Spearman rank correlation such as 0.90 would most likely indicate that:

A. a high rank in one year is associated with a low rank in the second year.
B. a high rank in one year is associated with a high rank in the second year.
C. a high rank in one year will not have any impact on the rank in the second year.

The correct answer is B.

A large positive value of the Spearman rank correlation such as 0.90 would most likely indicate that a high rank in one year is associated with a high rank in the second year.

Note: In statistics, Spearman's rank correlation coefficient or Spearman's rho is a non-parametric measure of statistical dependence between two variables. It takes values from -1 to 1. The closer to 1 or to -1, the stronger the relationship. 1 indicates a perfect positive association/relationship, whereas -1 indicates a perfect negative association between variables.

A is incorrect. This option suggests that a high rank in one year is associated with a low rank in the second year, which would be indicative of a negative Spearman rank correlation. A negative correlation would have a coefficient closer to -1, not 0.90. A coefficient of 0.90, being positive and close to 1, clearly indicates a positive association between the ranks, where high ranks in one year are associated with high ranks in the subsequent year, not low ranks.

C is incorrect. This option suggests that the rank in one year does not impact the rank in the second year, implying no correlation between the ranks across years. However, a Spearman rank correlation of 0.90 significantly contradicts this notion, as it indicates a strong positive correlation. A coefficient near 0 would suggest no correlation, but a value of 0.90 demonstrates a strong, direct relationship between the ranks in two different years, where a high rank in one year is likely to be associated with a high rank in the next year.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2763 A sample of 100 students is currently renting rooms in the mean distance of 18 miles from a small U.S. College. Assuming that the population is normally distributed and the standard deviation of the sample is 14 miles, the 99% confidence interval for the population mean is closest to:

(See Z-table)

A. [15.26 miles; 20.74 miles]
B. [16.6 miles; 19.4 miles]
C. [14.4 miles; 21.6 miles]

The correct answer is C.


\text{Standard error of the sample} = \frac{\text{Standard deviation of sample mean} \times 100}{\sqrt{\text{Sample size}}} = \frac{14}{\sqrt{100}} = 1.4


Z-static (Reliability factor) at 99% confidence interval = 2.58


\text{Confidence interval} = \text{Point estimate} \pm \text{Reliability factor} \times \text{Standard error}


Lower limit of the confidence interval = 18 - (2.58 × 1.4) = 14.39 miles

Upper limit of the confidence interval = 18 + (2.58 × 1.4) = 21.6 miles.

The 99% confidence interval of the population lies within the range (14.39; 21.6). This means that 99% of the students rent rooms within a distance of (14.39; 21.6) miles.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2764 The mean return of a sample of 36 BB+ corporate bonds is 7.5%, and the sample's standard deviation is 14%. Assuming that the population is normally distributed and the population variance is unknown, based on t-distribution, the 95% confidence interval for the population mean is closest to?
(See t-table)

A. [2.77%; 12.23%]
B. [2.93%; 12.06%]
C. [3.56%; 11.43%]

The correct answer is A.

Since the population variance is unknown and the population is normally distributed, we will use a t-statistic. The t-statistic for a 95% confidence interval and 35 degrees of freedom (df=n-1=) is 2.030.
The standard error of the sample = Standard Deviation of sample mean/√Sample size = 14/√36 = 2.33

Confidence interval = Point estimate ± Reliability factor × Standard error

The confidence interval is 7.5 - (2.03 * 2.33) = 2.77 and 7.5 + (2.03 * 2.33) = 12.23

Approximately 95% of the mean returns of BB+ corporate bonds fall within the interval (2.77;12.23)

Using a reliability factor based on the t-distribution is essential for a small sample size. Using a t reliability factor is appropriate when the population variance is unknown, even when we have a large sample, and could use the central limit theorem to justify using a z reliability factor. In this large sample case, the t-distribution provides more-conservative (wider) confidence intervals.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2765 Which of the following is the most appropriate test statistic for calculating confidence intervals for a normally distributed population mean whose variance is unknown and the sample size is less than 30?

A. z-statistic.
B. t-statistic.
C. F-statistic.

The correct answer is B.

The t-statistic is most appropriate for constructing confidence intervals for normally distributed population means whose variance is unknown and the sample size is less than 30. At the same time, the z-statistic is appropriate for constructing confidence intervals for normally distributed population means whose variance is known (regardless of the sample size).

A is incorrect. The z-statistic is appropriate for constructing confidence intervals for normally distributed population means whose variance is known (regardless of the sample size).

C is incorrect. The F statistic is most appropriate when testing for the differences in population variances.

CFA Level I, Volume 1, Topic 3 - Quantitative Methods, Learning Module 8, Hypothesis Testing, LOS 8b: Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2773 If a researcher wants to test that the mean return of 50 small-cap stocks from the Singapore Exchange is greater than 14%, the alternative hypothesis for the test is most likely:

A. $H_a: \mu \neq 14\%$.
B. $H_a: \mu &gt; 14\%$.
C. $H_a: \mu &lt; 14\%$.

The correct answer is B.

Since the researcher wants to test that if the mean of 50 small-cap stocks is greater than 14%, the null hypothesis is $H_0: \mu \leq 14\%$ and the alternative hypothesis is $H_a: \mu &gt; 14\%$.

We always want to reject the null hypothesis and accept the alternative. Since the researcher wants to prove that the mean returns are greater than 14%, $H_a: \mu &gt; 14\%$; $H_0: \mu &lt; 14\%$.

**A is incorrect.** It denotes that the alternative hypothesis is not equal to 14%, which is not the case.

**C is incorrect.** It indicates that the alternative hypothesis for the mean return of 50 small-cap stocks from the Singapore Exchange is less than 14%.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2775 An analyst believes that the mean return over 24 months on Geko Corp. shares is different from 0%. Determine which of the following is the most likely decision rule?

A. Reject H₀ if the test statistic &gt; the upper critical value.

B. Reject H₀ if the test statistic &lt; the lower critical value.

C. Reject H₀ if the test statistic &gt; the upper critical value OR if the test statistic &lt; the lower critical value.

The correct answer is C.

Since the analyst wants to test if the mean is different from zero, it is a two-tail test and the appropriate hypotheses are H₀: μ = 0% and Hₐ: μ ≠ 0%.

The appropriate decision rule is to reject H₀ if the test statistic &gt; the upper critical value OR if the test statistic &lt; the lower critical value.

A and B are incorrect. They both are incomplete. For two-tailed tests, the decision rule should consider both cases (when the Test Statistic is greater than the upper critical value and when it is less than the lower critical value).

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2776 A quantitative analyst has calculated the mean holding period return (HPR) of 1% for 110 European corporate bonds with a standard deviation of 2%. If the analyst wants to test at a 5% level of significance that the mean HPR on European corporate bonds is different from zero, then the test statistic is closest to:

A. 0.19
B. 1.96
C. 5.24

The correct answer is C.


\text{Test statistic} = \frac{\text{Sample mean} - \text{Hypothesized value}}{\text{Standard Error}}


Where


\text{Standard Error} = \frac{\text{Standard deviation}}{\sqrt{\text{Sample Size}}} = \frac{2\%}{\sqrt{110}}


Therefore


\text{Test Statistic} = \frac{1\% - 0}{\frac{2\%}{\sqrt{110}}} = 5.24


A is incorrect. A test statistic of 0.19 would suggest a very small difference between the sample mean and the hypothesized value, which is not consistent with the calculated test statistic of 5.24. This discrepancy indicates that the calculation or interpretation that leads to a test statistic of 0.19 does not accurately reflect the significant difference between the sample mean HPR and the hypothesized value of zero.

B is incorrect. A test statistic of 1.96 is the critical value at a 5% level of significance for a two-tailed test under the assumption of a normal distribution. However, the calculated test statistic of 5.24 far exceeds this critical value, indicating a stronger evidence against the null hypothesis than what a test statistic of 1.96 would suggest. Therefore, option B does not accurately represent the strength of the evidence against the null hypothesis in this scenario.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2777 A quantitative analyst has calculated a mean HPR of 1% and a standard deviation of 2% for 110 European corporate bonds. If the analyst wants to test at a 5% level of significance that the mean HPR on European corporate bonds is different from zero, then which of the following is the most accurate result of the test?

A. Reject H₀: μ = 0%
B. Reject Hₐ: μ ≠ 0%
C. Accept H₀: μ = 0%

The correct answer is A.

Since the quantitative analyst wants to test if the returns are different from zero, the appropriate hypotheses are H₀: μ = 0% and Hₐ: μ ≠ 0%.

The decision rule is to reject H₀ if the test statistic &gt; the upper critical value OR if the test statistic &lt; the lower critical value.

At a 5% level of significance, the z-critical value is +/- 1.96.


\text{Test statistic} = \frac{\text{Sample mean} - \text{Hypothesized value}}{\text{Standard Error}}


Where


\text{Standard Error} = \frac{\text{Standard deviation}}{\sqrt{\text{Sample Size}}} = \frac{2\%}{\sqrt{110}}


Therefore


\text{Test Statistic} = \frac{1\% - 0}{\frac{2\%}{\sqrt{110}}} = 5.24


Since the test statistic &gt; the upper critical value (or 5.24 &gt; 1.96), the null hypothesis is rejected and the alternative hypothesis is accepted.

B is incorrect. Since the test statistic &gt; the upper critical value (or 5.24 &gt; 1.96), the null hypothesis is rejected, and the alternative hypothesis is concluded.

C is incorrect. The evidence suggests the rejection of the null hypothesis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2778 Gerry Smithson conducted a hypothesis test at a 1% level of significance to check if the mean return of a population of stocks is greater than zero. The mean of the sample of 121 stocks is 1% with a standard deviation of 5%. Suppose Smithson accepted the alternative hypothesis, which of the following statements is most accurate? (See Normal Table)

A. Smithson committed a Type I error by accepting the alternative hypothesis.

B. Smithson committed a Type II error by accepting the alternative hypothesis.

C. Smithson correctly accepted the alternative hypothesis; no error was made.

The correct answer is A.

Since Smithson wants to test if the mean return is greater than 0% the hypotheses are:
$\mathrm{H}_0$: $\mu \leq 0\%$ and $\mathrm{H}_a$: $\mu &gt; 0\%$.


\text{Test statistic} = \frac{\text{Sample mean} - \text{Hypothesized value}}{\text{Standard Error}}


Where


\text{Standard Error} = \frac{\text{Standard deviation}}{\sqrt{\text{Sample Size}}} = \frac{5\%}{\sqrt{121}}


Therefore


\text{Test Statistic} = \frac{1\% - 0}{\frac{5\%}{\sqrt{121}}} = 2.20


Since the z-critical value at a 1% level significance is 2.33, the test statistic $2.2 \leq 2.33$. Hence, the null hypothesis is true.

Since Smithson rejected the null hypothesis (accepted the alternative hypothesis) when the null hypothesis was in fact true, he committed a Type I error.

B is incorrect. A Type II error is the failure to reject the null hypothesis when it is false.

C is incorrect. Smithson rejected the null hypothesis (accepted the alternative hypothesis) when the null hypothesis was true, thus committed a Type I error.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2779 Which of the following is the most appropriate explanation of a Type II error?

A. A Type II error refers to rejecting the null hypothesis when it is actually true.

B. A Type II error refers to the failure to reject the null hypothesis when it is false.

C. A Type II error refers to a failure to reject the null hypothesis when it is actually true.

The correct answer is B.

A Type II error refers to a failure to reject the null hypothesis when it is false, while a Type I error refers to rejecting the null hypothesis when it is actually true.

A is incorrect. It refers to Type I error: rejecting the null hypothesis when it is true.

C is incorrect. It is not an error.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2780 If the level of significance is 5%, the type I error is 15%, and the Type II error is 20%, then the probability of correctly rejecting the null hypothesis when it, in fact, false is closest to:

A. 80%.
B. 85%.
C. 95%.

The correct answer is A.

Power of test (or the probability of correctly rejecting the null hypothesis when it's false) = 1 - p( = 1 - 0

So, the probability of correctly rejecting the null hypothesis when it is, in fact, false is closest to 80%. Therefore, the correct answer is A. 80%. Please note that the level of significance and the Type I error rate are not needed to answer this question. They are not directly related to the power of the test. The power of the test is only related to the Type II error rate.

Note: Type 1 error occurs when we reject a true null hypothesis, whereas type II error occurs when we fail to reject a false null hypothesis.

B is incorrect. It suggests an 85% probability of correctly rejecting the null hypothesis when it is false, which does not align with the given Type II error rate of 20%.

C is incorrect. It implies a 95% probability of correctly rejecting the null hypothesis when it is false, which significantly overestimates the power of the test given the provided Type II error rate. This option might confuse the level of significance (α) with the power of the test. The level of significance is the threshold for deciding whether to reject the null hypothesis and is related to the probability of making a Type I error, not the power of the test or the Type II error rate.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2781 A one-tailed (H₀: μ ≥ 0%) test statistic has a p-value of 0.0228. At a 1% significance level, which of the following statements is most accurate?

A. The null hypothesis is rejected as the p-value is greater than the significance level.

B. The null hypothesis is not rejected as the p-value is greater than the significance level.

C. The null hypothesis is not rejected as the p-value is not greater than the significance level.

The correct answer is B.

The decision rule for the p-value is we reject the null hypothesis if p-value is less than the significance level. Since the p-value 0.0228 &gt; 0.01 significance level, we fail to reject the null hypothesis.

A is incorrect. The null hypothesis is not rejected.

C is incorrect. The p-value is more significant than the significance level.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2783 An analyst is conducting a test to identify if the mean return of one sample of a population is greater than the other sample of the same population. If the $H_0: \mu 1 - \mu 2 \geq 0$ is rejected, which of the following option is most likely true?

A. $H_a: \mu 1 \neq \mu 2$
B. $H_a: \mu 1 &gt; \mu 2$
C. $H_a: \mu 1 &lt; \mu 2$

The correct answer is C.

Since the null hypothesis $H_0: \mu 1 - \mu 2 \geq 0$ is rejected, the alternative hypothesis $H_a: \mu 1 - \mu 2 &lt; 0$ is accepted which can also be interpreted as $H_a: \mu 1 &lt; \mu 2$.

Note: $H_0: \mu_1 - \mu_2 \leq 0$ can be written as $H_0: \mu_1 \leq \mu_2$.

A is incorrect. The test is to identify if the mean return of one sample of a population is greater than the other sample of the same population and not equal to as depicted in the answer.

B is incorrect. The alternative hypothesis cannot imply the same thing as the null hypothesis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2785 An analyst drew 27 paired observations to test if the mean return of two portfolios differs from each other at a 1% level of significance. Assume that the distribution of each portfolio is normal with an unknown population variance. Using the following table, construct the appropriate hypothesis.

| | Portfolio 1 | Portfolio 2 | Differences |
| --- | --- | --- | --- |
| Mean Return | 17 | 21.25 | 4.25 |
| Standard Deviation | 10.5 | 16.75 | 6.25 |

A. $H_0: \mu 1 \geq \mu 2$ and $H_a: \mu &lt; \mu 2$
B. $H_0: \mu 1 \leq \mu 2$ and $H_a: \mu 1 &gt; \mu 2$
C. $H_0: \mu d = 0$ and $H_a: \mu d \neq 0$

The correct answer is C.

This is a two-tailed test. The analyst is testing the difference between the mean of paired observations. It is unknown if the difference is positive or negative so the hypothesis is constructed as $H_0: \mu d = 0$ and $H_a: \mu d \neq 0$.

A is incorrect. It formulates a one-tailed test that hypothesizes Portfolio 1 has a mean return greater than or equal to Portfolio 2 ($H_0: \mu 1 \geq \mu 2$) and the alternative that Portfolio 1 has a mean return less than Portfolio 2 ($H_a: \mu 1 &lt; \mu 2$). This formulation is inappropriate for two reasons. Second, it does not utilize the concept of paired observations, which is crucial in this context as the analyst is comparing the means of two related samples.

B is incorrect. For similar reasons to option A. It proposes a one-tailed test with the null hypothesis suggesting Portfolio 1 has a mean return less than or equal to Portfolio 2 ($H_0: \mu 1 \leq \mu 2$) and the alternative hypothesis suggesting Portfolio 1 has a greater mean return ($H_a: \mu 1 &gt; \mu 2$). This choice also fails to address the analyst's objective of determining if any difference exists between the two portfolios without presupposing the direction of this difference. Additionally, it overlooks the paired nature of the observations, which is critical for the analysis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

Q.2786 An analyst drew 27 paired observations to test if the mean return of two portfolios differs from each other at a 1% level of significance. Assume that the distribution of each portfolio is normal with an unknown population variance. Using the following table, the test statistic is closest to:

© 2014-2024 AnalystPrep.
| | Portfolio 1 | Portfolio 2 | Differences |
| --- | --- | --- | --- |
| Mean Return | 17 | 21.25 | 4.25 |
| Standard Deviation | 10.5 | 16.75 | 6.25 |

A. 3.53
B. 7.51
C. 18.36

The correct answer is A.

The analyst is testing the difference between the mean of paired observations. It is not known if the difference is positive or negative so the hypothesis is constructed as $\mathrm{H}_0: \mu \mathrm{d} = 0$ and $\mathrm{H}_{\mathrm{a}}: \mu \mathrm{d} \neq 0$ .

Thus,


\text {test statistic} = \frac {\text {Mean difference}}{\text {Standard error of mean}} = \frac {4 . 2 5}{\left(\frac {6 . 2 5}{\sqrt {2 7}}\right)} = 3. 5 3.


## Further Explanation.

To test whether the observed difference between two means is statistically significant, we must first decide whether the samples are independent or dependent (paired/related). If the samples are independent, we conduct tests concerning differences between means. If the samples are dependent, we conduct tests of mean differences (paired comparisons tests).

Notice the examiner has mentioned 27 paired observations. This helps you to know that you need to conduct a paired comparison test. Additionally, the hypothesis test concerns the population mean of a normally distributed population with unknown variances, thus, the theoretically correct test statistic is the t-statistic.

Thus, test statistic = Mean difference/Standard error of mean differences.


t - \text {Statistic} = \frac {\left(\bar {X} - \mu_ {0}\right)}{\left(\frac {a}{\sqrt {b}}\right)} = \frac {4 . 2 5}{\frac {6 . 2 5}{\sqrt {2 7}}} = 3. 5 3


B is incorrect. Uses the variance instead of the standard deviation:


\text {Test Statistic} = \frac {4 . 2 5}{\left(\frac {6 . 2 5 ^ {2}}{\sqrt {2 7}}\right)} = 7. 5 1.


C is incorrect. Fails to find the square root of the sample size.

240
© 2014-2024 AnalystPrep.

\text{Test Statistic} = \frac{4.25}{\left(\frac{5.25^3}{27}\right)} = 18.36


CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

Q.2788 Which of the following probability distributions is least likely bounded by 0?

A. z-distribution.
B. F-distribution.
C. Chi-distribution.

The correct answer is A.

The z-distribution is least likely bounded by 0. It can take on both negative and positive values. The Chi-distribution and the f-distribution are both distributions that are skewed to the right, meaning that they do not take negative values and that they are bounded by 0.

B is incorrect. The F-distribution is used primarily in the analysis of variance (ANOVA) and is always right-skewed. This means that its values start from 0 and extend indefinitely to the right, without taking negative values. The F-distribution's shape and properties are determined by two sets of degrees of freedom, which influence its skewness and kurtosis but do not alter its boundedness by 0.

C is incorrect. The Chi-square distribution is a special case of the gamma distribution and is used extensively in hypothesis testing and confidence interval estimation for variance in the field of statistics. Like the F-distribution, the Chi-square distribution is right-skewed and does not take negative values. Its values start from 0 and extend to the right indefinitely, which is a characteristic of distributions that are bounded by 0.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2789 Which of the following is the most appropriate test statistic of an F-test?

A. $\frac{\bar{\mathrm{X}} - \mu_0}{\sigma / \sqrt{\mathrm{n}}}$
B. $\frac{s_2^2}{s_2^2}$
C. $\frac{(n-1)s_1^2}{s_2^2}$

The correct answer is B.

The f-test statistic = Variance of a sample of $n_1$ observations drawn from population 1 divided by variance of a sample of $n_2$ observations drawn from population $2 = s_1^2 / s_2^2$.

Chi-test statistic = (n-1)s² / s²

A is incorrect. A represents the z test statistic

C is incorrect. C represents the Chi-test statistic.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.2790 Which of the following tests is the least appropriate when testing the hypothesis of whether a variable is normally distributed?

A. Runs tests.
B. Parametric tests.
C. Non-parametric tests.

The correct answer is B.

A parametric test is least suitable to test whether a variable is normally distributed.

A is incorrect. A runs test is a type of non-parametric test.

C is incorrect. Non-parametric tests are used when the hypothesis does not involve the distribution parameters, of the distribution for instance testing if the variable is normally distributed.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
Q.2791 Which of the following tests is most appropriately used to assess the linear relationship between the ranks of two variables within their sample when the sample data is not normally distributed?

A. Parametric tests.
B. Correlation coefficients.
C. Spearman rank correlation tests.

The correct answer is C.

The Spearman rank correlation test is used to assess the linear relationship between the ranks of two variables within their sample when the sample data is not normally distributed.

A is incorrect. Parametric tests are statistical tests that require analysts to make assumptions regarding the distribution of the population.
B is incorrect. Correlations coefficients are simply a measure (between -1 and 1) of the strength of the relationship between two variables.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
Q.3446 Consider the following tests:

I. Testing a drug for its effect on humans.
II. Testing the manufacturing process of a screwdriver.

Which of the following statements is most accurate?

A. The p-value for test I will be equal to the p-value for test II.
B. The p-value for test I will be lower than the p-value for test II.
C. The p-value for test I will be higher than the p-value for test II.

The correct answer is B.

The p-value is the level of marginal significance within a statistical hypothesis test representing the probability of the occurrence of a given event. An alternative interpretation of the p-value is that it represents the statistical probability of the occurrence of an event happening by chance. Hence, a lower p-value will lead to "more confidence."

For a drug trial, a small error can have serious implications; however, in the manufacturing process of a screwdriver, the concerns are not as high. Therefore, the p-value of a drug trial must be lower than the p-value of the manufacturing process of a screwdriver.

A is incorrect. Suggesting that the p-value for testing a drug's effect on humans will be equal to the p-value for testing the manufacturing process of a screwdriver overlooks the fundamental differences in the nature of these tests and their implications. Drug tests are subject to stringent regulatory standards and require a high level of confidence in the results due to the potential impact on human health. This typically necessitates a lower p-value to assert the significance of the findings. In contrast, the manufacturing process of a screwdriver, while important for quality control, does not directly impact human health in the same way and may tolerate a higher p-value.

C is incorrect. Suggesting that the p-value for testing a drug's effect on humans will be higher than the p-value for testing the manufacturing process of a screwdriver misunderstands the importance of statistical significance in different contexts. The implications of errors in drug trials can be severe, including adverse health effects or ineffective treatment. Therefore, a lower p-value is sought to ensure that the results are not due to random chance but indicate a true effect of the drug.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3453 Rick Gervais has gathered data on the daily returns generated by the Dow Jones Index. He believes that the mean daily return generated by the index is greater than 0.10%, so Gervais constructs a hypothesis test. If he wants to minimize the probability of a Type I error, then he is most likely to:

A. Increase α.

B. Minimize Type II error.

C. Increase the sample size.

The correct answer is C.

Type I error occurs when analysts reject a true null hypothesis, whereas type II error occurs when analysts fail to reject a false null hypothesis. Increasing the sample size increases the chances of capturing the differences in the data, thereby reducing the chances of committing both type I and type II errors.

A is incorrect. α, also known as the significance level, is defined as the probability of making a type I error. Therefore, if α is increased, the probability of committing a type I error also increases.

B is incorrect. By minimizing Type II error, the probability of committing a type, I error increases.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3471 If the population variance is known, then the most appropriate hypothesis test is the:

A. t-test.
B. z-test.
C. F-test.

The correct answer is B.

If the population variance is known, then the appropriate hypothesis test is the z-test. Option A is incorrect. A t-test is used mostly when the population variance and the mean are unknown. Option C is incorrect. An F-test is used to test if the variances of two populations are equal.

A is incorrect. A t-test is used mostly when the population variance and the mean are unknown.

C is incorrect. An F-test is used to test if the variances of two populations are equal.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3474 A chi-square test is most appropriate for tests concerning:

A. a single variance.
B. differences between two population means with variances assumed to be equal.
C. differences between two population variances assumed to not be equal.

The correct answer is A.

A chi-square test is used for tests concerning the variance of a single normally distributed population. The test statistic used is $\lambda_{n-1}^2 = \frac{(n-1)S^2}{\sigma^2}$

B is incorrect. The most appropriate test statistic for B would be the t-test. The test statistic used is


t_{n_1 + n_2 - 2} = \frac{\bar{X_1} - \bar{X_2}}{S_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}


Where;

$\bar{X_1}$ and $\bar{X_2}$ are the sample means.

$n_1$ and $n_2$ are the sample sizes.

$S_p$ is the common or the pooled variance and is given by


S_p = \frac{(n_1 - 1) S_1^2 + (n_2 - 1) S_2^2}{n_1 + n_2 - 2}


C is incorrect. The most appropriate test statistic for A would be the F-test. The test statistic used is


F_{(n_1 - 1)(n_2 - 1)} = \frac{S_1^2}{S_2^2}


where $s_1$ and $s_2$ are the sample variances.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3477 While conducting a study, a researcher computes the probability of Type I and Type II errors that stood at 5% and 2%, respectively. The power of the test is closest to:

A. 93%.
B. 95%.
C. 98%.

The correct answer is C.

The power of the test is defined as the probability of correctly rejecting the null hypothesis when it is false.

The power of a test is obtained by subtracting the probability of failing to reject the null hypothesis when it is false (which is type II error) from 1 (since all probabilities must add up to 1)

Power of the test = 1 - probability of Type II error = 100% - 2% = 98%

A is incorrect. Suggesting a power of 93% does not align with the given probabilities of Type I and Type II errors. The power of a test is directly related to the probability of a Type II error, not a Type I error.

B is incorrect. While 95% might seem like a reasonable estimate given the common threshold for Type I errors (α) in hypothesis testing, it does not accurately reflect the calculation for the power of a test. The power is determined by subtracting the probability of a Type II error from 1. Given that the probability of a Type II error is 2%, the power of the test is 98%, not 95%. The confusion might arise from conflating the concept of the confidence level (commonly set at 95% to correspond with a 5% Type I error rate) with the power of the test, which are related but distinct statistical concepts.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3478 A portfolio manager observes that the weekly return generated by a portfolio of high-beta stocks stood at 5%. The standard deviation of the portfolio return stood at 1.50%. However, the manager observes that the standard deviation of the portfolio return for the recent 15 weeks stood at 2.00%. The portfolio manager wants to determine whether the standard deviation of the portfolio return has increased from 1.50% to 2.00%.

The test statistic to test for the above hypothesis is closest to:

A. 0.37

B. 1.78

C. 24.89.

The correct answer is C.

The chi-square test is used for hypothesis tests regarding population variance.


\text{Test statistic} = \frac{(n - 1) \times S^2}{\sigma^2}


Where n is the sample size, S² the sample variance and σ² the hypothesized population variance.


\text{Test statistic} = \frac{(15 - 1) \times 0.02^2}{1.5\%^2} = 24.89


A is incorrect. Uses the standard deviation instead of the variance:


\text{Test statistic} = \frac{(15 - 1) \times 0.02^2}{1.5\%} = 0.37


B is incorrect. It fails to include the sample size effect:


\text{Test statistic} = \frac{0.02^2}{(1.5\%)^2} = 1.78


CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3479 A portfolio manager believes that returns on pharmaceutical stocks are more volatile than the returns generated on e-commerce stocks. To check this hypothesis, the portfolio manager collects the data summarized in exhibit 1.

Exhibit 1: Volatility in Pharmaceutical vs. e-Commerce Stocks

| | Pharma Stock | e-Commerce Stocks |
| --- | --- | --- |
| Standard Deviation | 1.50% | 2.10% |
| Sample Size | 20 | 25 |

The value of the test statistic is closest to:

A. 1.51.
B. 1.70
C. 1.96

The correct answer is C.

As the test requires testing the equality of variances of two populations, the appropriate test is the F-test.


\text{Test statistic} = \frac{(\text{Standard deviation of Ecommerce stocks})^2}{(\text{Standard deviation of the pharmaceutical stocks})^2} = \frac{(2.10\%)^2}{(1.96)}


Note: A convention, or usual practice, uses the larger of the two standard deviations on top (in the numerator). When we follow this convention, the value of the test statistic is always greater than or equal to 1; tables of critical values of F then need to include only values greater than or equal to 1. Under this convention, the rejection point for any formulation of hypotheses is a single value on the right-hand side of the relevant F-distribution. However, even without following this convention, we would still arrive at the same conclusion (whether or not to reject the null).

A is incorrect. A test statistic value of 1.51 would suggest a different ratio of variances between the two sets of stocks. This value does not accurately reflect the calculated ratio based on the provided standard deviations. The calculation of the F-test statistic directly from the given standard deviations leads to a value of 1.96, not 1.51.

B is incorrect. A test statistic value of 1.7 does not accurately represent the ratio of variances derived from the given data. The value of 1.7 might suggest a misunderstanding or miscalculation of the variances of the two samples, which is not supported by the data provided in the question.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3480 A quantitative analyst made the following statements:

I. Parametric tests are recommended for observations that follow a Bernoulli distribution.
II. Non-parametric tests are recommended for normally distributed observations.
III. The Spearman rank correlation test is recommended for normally distributed observations.

Which of these statements is/are most accurate:?

A. I only
B. I &amp; III only
C. I, II &amp; III

The correct answer is A.

Statement I is accurate. A parametric test is a hypothesis testing procedure based on the assumption that observed data are distributed according to some distributions of well-known form (e.g., normal, Bernoulli, and so on).

Statement II is incorrect. Nonparametric statistics refer to a statistical method in which the data is NOT required to fit a normal distribution. Nonparametric statistics uses data that is often ordinal, meaning it does not rely on numbers, but rather on a ranking or order of sorts.

Statement III is inaccurate. When the variables are not normally distributed or the relationship between the variables is not linear, it may be more recommended to use the Spearman rank correlation method. A coefficient of correlation does not have any distributional assumptions.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
Q.3510 Consider the following hypotheses:

I. The quarterly returns generated by US Pharmaceutical companies is greater than 2.25%.
II. The average GMAT score of students studying Finance in the University of Alberta is more than 700.
III. The average height of Dublin College students is not equal to 180 centimeters.

Which of these hypotheses will most likely be tested using a two-tailed test?

A. III only
B. II &amp; III only
C. I &amp; II only

The correct answer is A.

Hypothesis III should be verified using a two-tailed test. A two-tailed test considers the possibility of a change in either direction. It looks for a statistical relationship in both the positive and the negative directions of the distribution. The hypothesis of a two-tailed test will have either "an equal to" or "a not equal to sign."

Hypotheses I &amp; II should be verified using one-tailed tests. A one-tailed test (one-sided test) is a statistical test that considers a change in only one direction. In such a test, the alternative hypothesis has either a &lt; (less than sign) or &gt; (greater than sign) i.e. we consider either an increase or reduction but not both.

B is incorrect. It is concerned only with returns exceeding 2.25%, not with returns being either significantly higher or lower. Therefore, suggesting that Hypothesis I should be tested with a two-tailed test overlooks the directional nature of the hypothesis.

C is incorrect. It specifies an interest in values exceeding 700, not in deviations in both directions from this threshold. Suggesting that Hypotheses II and III should both be tested using a two-tailed test fails to recognize the directional nature of Hypothesis II, which is explicitly looking for scores greater than 700.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3515 Given a z-test, the most appropriate decision rule is to:

A. Reject H₁.

B. Reject H₀ if the z-statistic falls within the critical region.

C. Accept H₀ if the z-statistic falls within the critical region.

The correct answer is B.

Once computed, the z-statistic is compared to the critical value that corresponds to the level of significance of the test. For example, if the significance level is 5%, the z-statistic is screened against the upper/lower 95% point of the normal distribution (±1.96). The decision rule is to reject H₀ if the z-statistic falls within the critical/rejection region.

A is incorrect. We do not just reject/accept the alternative hypothesis without reason. There has to be a reason as to why we are rejecting/accepting the alternative hypothesis.

C is incorrect. If the z statistic falls within the critical region, then we accept the alternative hypothesis and reject the null hypothesis.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3516 A portfolio manager wants to compare the returns generated by actively and passively managed funds. He believes that both methods generate the same exact return. The data collected by the manager is given in the following exhibit.

Exhibit: Data Compiled - Passive vs. Active Management

| | Passive Management | Active Management |
| --- | --- | --- |
| Mean Return | 1.25% | 2.00% |
| Standard Deviation | 0.50% | 0.75% |
| Sample Size | 30 | 32 |

Assuming that the samples are independent, the population means are normally distributed, and the population variances are equal, the degrees of freedom for the test are closest to:

A. 60.
B. 61.
C. 62.

The correct answer is A.

Because we have two different populations; Each of the two populations has n-1 degrees of freedom. Let the passive management population be $\mathfrak{n}_1$ , and the active be $\mathfrak{n}_2$ . Combine the two to get Degrees of freedom $= \mathrm{n}_1 + \mathrm{n}_2 - 2 = 30 + 32 - 2 = 60$ .

B is incorrect. It assumes n-1 df.

C is incorrect. It assumes zero df.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3738 50 CFA exam candidates were randomly sampled and were found to have an average IQ of 130. The standard deviation among candidates is known (approximately 20). Assuming that IQs follow a normal distribution, a 2-sided 95% confidence interval for the mean IQ of CFA candidates is closest to:

A. [125; 135]
B. [130; 135.5]
C. [124.5; 135.5]

The correct answer is C.

For any sample that comes from a normally distributed population, we know that:


\frac {\vec {X} - \mu}{\frac {\sigma}{\sqrt {n}}} \sim N (0, 1)


Recall also that


\text{Confidence Interval} = \text{Point estimate} \pm \text{Reliability factor} \times \text{standard error}


Thus, a 95% CI for the mean,


\begin{array}{l}
\mu = \hat{\mathrm{X}} \pm \mathrm{Z}_{\frac{0}{2}} \times \frac{\sigma}{\sqrt{\mathrm{n}}} \\
= 130 \pm 1.96 \times \frac{20}{\sqrt{50}} \\
= 130 \pm 5.5437 \\
= [124.5; 135.5].
\end{array}


CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3739 After 72 CFA candidates took a mock exam, the mean score was 75. Assuming that the population standard deviation is 10, construct a 99% confidence interval for the mean score on the mock exam, and the result will be closest to:

A. [75; 85]
B. [65; 75]
C. [71.96; 78.04]

The correct answer is C.

For any sample that comes from a normally distributed population, we know that:


\frac {\vec {X} - \mu}{\frac {\sigma}{\sqrt {n}}} \sim N (0, 1)


Recall also that


\text{Confidence Interval} = \text{Point estimate} \pm \text{Reliability factor} \times \text{standard error}


From the normal dist. table, $Z_{0.005} = 2.58$. Thus, a 99% CI for the mean,


\begin{array}{l}
\mu = \vec{X} \pm Z_{\frac{\sigma}{2}} \times \frac{\sigma}{\sqrt{n}} \\
= 75 \pm 2.58 \times \frac{10}{\sqrt{72}} \\
= 75 \pm 3.04 \\
= 71.96 \leq \mu \leq 78.04.
\end{array}


Interpretation: We are 99% certain that the students scored between 71.96 and 78.04.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3740 An investment firm intends to conduct a test to determine whether bonuses have any significant effect on job performance. The head of the human resource department develops the following sets of possible hypotheses.

I. H₀: Bonuses do not have any effect on job performance.
H₁: Bonuses improve job performance
II. H₀: Bonuses do not have any effect on job performance
H₁: Bonuses reduce job performance
III. H₀: Bonuses do not have any effect on job performance
H₁: Bonuses affect job performance

Which of the above hypotheses most accurately imply a two-sided test?

A. I
B. II
C. III

The correct answer is C.

The difference between a one-sided test and a two-sided test is that while the alternative hypothesis in the former explores the possibility of a change in only one direction (increase or decrease), the latter explores the possibility of a change in either direction.

While the alternative hypothesis in sets I and II explores an increase or decrease, respectively, the word "affect" in the H₁ of set III leaves open the possibility of either an increase or a decrease in job performance.

A and B are incorrect. A one-sided test will have either a greater than or less than sign, whereas a two-sided test will have either an equal to or a not equal to sign.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

Q.3741 A random sample of 50 CFA exam candidates was found to have an average IQ of 125. The standard deviation among candidates is known (approximately 20). Assuming that IQs follow a normal distribution, the statistical test (5% significance level) to determine whether the average IQ of CFA candidates is greater than 120 is closest to.

(Compute the test statistic and give a conclusion).

Note: 5% significant level = z score value of 1.6449.

© 2014-2024 AnalystPrep.
A. Test statistic: 1.768; Reject H₀
B. Test statistic: 1.768; Fail to reject H₀
C. Test statistic: 1.0606; Fail to reject H₀

The correct answer is A.

The first step: Formulate H₀ and H₁

H₀: μ ≤ 120

H₁: μ &gt; 120

Note that this is a one-sided test because H₁ explores a change in one direction only

Under H₀, (x̄ - 120)/(σ/√n) ∼ N(0,1)

Next, compute the test statistic:


\text{Test statistic} = \frac{\text{Sample statistic-Hypothesized value 25 - 120}}{\text{Standard error of the sample statistic} \frac{20}{\sqrt{50}}} = 1.768


The decision rule is to reject the null hypothesis if the test statistic falls within the critical region. Please confirm that P(Z &gt; 1.6449) = 0.05, which means our critical value is the upper 5% point of the normal distribution, i.e., 1.6449. Since 1.768 is greater than 1.6449, it lies in the rejection region. As such, we have sufficient evidence to reject H₀ and conclude that the average IQ of FRM candidates is indeed greater than 120.

Alternatively, we could go the 'p-value way'

P(Z &gt; 1.768) = 1 - P(Z &lt; 1.768) = 1 - 0.96147 = 0.03853 or 3.853%

This probability is less than 5% meaning that we have sufficient evidence against H₀. This approach leads to a similar conclusion.

B is incorrect. This option correctly identifies the test statistic as 1.768 and correctly concludes to reject H₀, which aligns with the correct analysis and conclusion based on the calculated test statistic and the comparison to the critical value.

C is incorrect. This option provides a different test statistic of 1.0606 and concludes to fail to reject H₀.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

© 2014-2024 AnalystPrep.
Q.3742 Decreasing the level of significance of a hypothesis test will most likely:

A. Increase the type I error
B. Decrease the likelihood of committing a type II error
C. Decrease the likelihood of rejecting the null hypothesis when it's in fact true

The correct answer is C.

Having seen that the significance level gives the probability of rejecting a true null hypothesis, it follows that a decrease in a (the level of significance) effectively decreases this probability. That means a decrease of, say, 5% to 1%, would mean less frequent rejection of a true null hypothesis (will decrease the probability of making a type I error)

A is incorrect. The likelihood of a type 1 error will decrease and not increase, reducing the significance level.

B is incorrect. A Type II error occurs when a false null hypothesis is incorrectly accepted, or in other words, when we fail to reject a null hypothesis that is actually untrue. Adjusting the level of significance influences the likelihood of making a Type II error. Specifically, lowering the level of significance makes the criteria for rejecting the null hypothesis more stringent.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.

Q.3743 Justin Heinz, CFA, suspects that the earnings of the insurance industry are more divergent than those of the banking industry. In a bid to confirm his suspicion, Heinz collects data from a total of 31 insurance companies and establishes that the standard deviation of earnings across that industry is $4.8. Similarly, he collects data from 41 banks and establishes that the standard deviation of earnings across that industry is $4.3. Conduct a hypothesis test at the 5% level of significance to determine if the earnings of the insurance industry have a greater standard deviation than those of the banking industry. Which of the following choices is most likely correct? Choice I. H0: s₁² ≤ s₂² and H1: s₁² &gt; s₂² Critical Value: 1.2461 Decision: Earnings are statistically not significant from one another Choice II. H0: s₁² ≤ s₂² and H1: s₁² &gt; s₂² Critical value: 1.74 Decision: Earnings are statistically not significant from one another Choice III. H0: s₁² = s₂² and H1: s₁² ≠ s₂² Critical value: 1.2461 Decision: Earnings are statistically significant from one another

A. I
B. II
C. III

The correct answer is A.

© 2014-2024 AnalystPrep.
As always, the first step involves formulating a relevant hypothesis. We are concerned that the earnings of the insurance company could be greater (more variant) than those of the banking industry. Therefore, the appropriate hypothesis is:


\mathrm{H}_0: \mathrm{s}_1^2 \leq \mathrm{s}_2^2 \text{ and } \mathrm{H}_1: \mathrm{s}_1^2 &gt; \mathrm{s}_2^2


Where $\mathrm{s}_1^2$ is the variance of earnings for the insurance industry, and $\mathrm{s}_2^2$ is the corresponding variance for the banking industry.

Next in line is the selection of the test statistic. When comparing the variances of two different populations, we use the F-statistic, computed as:


\mathrm{F} = \left(\mathrm{S}_1^2 / \mathrm{S}_2^2\right) \text{ where } \mathrm{S}_1^2 \text{ and } \mathrm{S}_2^2 \text{ are the sample variances}


The F-statistic has $(\mathrm{n}_1 - 1, \mathrm{n}_2 - 2)$ degrees of freedom. i.e. $\mathrm{F}_{30,40}$
\mathrm{F} = 4.8^2 / 4.3^2 = 1.2461


Note that this is a one-sided test. As such, our critical value should be the upper $5\%$ point of the F-distribution with (30, 40) degrees of freedom. This value = 1.74

Since 1.2461 is less than 1.74, it lies in the non-rejection, and therefore, we have insufficient evidence to reject $\mathrm{H}_0$ at the $5\%$ level of significance.

Decision: Heinz could argue that at the $5\%$ level, the earnings of the insurance sector and those of the banking sector are not significantly different from one another.

**B is incorrect.** It correctly identifies the critical value for the F-test as 1.74 but incorrectly concludes that the earnings are statistically not significant from one another without providing the calculated F-statistic for comparison. The decision should be based on whether the calculated F-statistic exceeds the critical value, indicating a significant difference in variances.

**C is incorrect.** It sets up a two-tailed test $(\mathrm{H}_0 : \mathrm{s}_1^2 = \mathrm{s}_2^2$ and $\mathrm{H}_1 : \mathrm{s}_1^2 \neq \mathrm{s}_2^2)$, which is not aligned with Heinz's suspicion that the variance in the insurance industry is greater than in the banking industry. This choice also misapplies the critical value and the decision regarding the significance of the earnings difference.

**CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (b): Construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and the power of the test given a significance level.**

© 2014-2024 AnalystPrep.
Q.3823 A nonparametric test is most likely preferred to a parametric test when:

A. Stronger measurement scales are required.
B. The randomness of a sample is being questioned.
C. The population from which the sample is drawn is assumed to be normally distributed.

The correct answer is B.

A nonparametric test is preferred to a parametric one when the data do not meet distributional assumptions, when the original data are given in ranks (and a stronger measurement scale is not required), or when the hypothesis being tested does not concern a parameter. For instance, one may need to test whether a sample is random or not rather than testing a parameter.

A is incorrect. A nonparametric test is considered when a stronger measurement scale is not required.

C is incorrect. Nonparametric tests either do not consider a particular population parameter or have few assumptions about the sampled population.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
Q.4026 Which of the following test is most appropriate when testing the difference between the variances of two normally distributed populations?

A. t-test.
B. F-test.
C. Chi-square test.

The correct answer is B.

An F-test is the most appropriate when conducting tests relating to the difference between the variances of two normally distributed populations with random independent samples.

A is incorrect. A t-statistic is the most appropriate for hypothesis tests of the population mean with unknown variance, a small sample size, and a normally distributed population.

C is incorrect. A chi-square test is appropriate for tests relating to the variance of a single normally distributed population.

CFA Level I, Quantitative Methods, Learning Module 8: Hypothesis Testing. LOS (c): Compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test.

© 2014-2024 AnalystPrep.
# Learning Module 9: Parametric and Non Parametric Tests of Independence

Q.4447 Assume a financial analyst, Alex Perez, is examining the significance of the correlation between the monthly returns of ETF 2 and the overall market index based on the table provided with 48 monthly observations. The sample correlation, $r_{\text{EFT2\_Market}}$ , is 0.9096. Perez wishes to use a t-test to check if the correlation is significant at a 0.01 level of significance. The sample t-table is given below:

| df | p = 0.10 | p = 0.05 | p = 0.025 | p = 0.01 | p = 0.005 |
| --- | --- | --- | --- | --- | --- |
| 31 | 1.309 | 1.696 | 2.040 | 2.453 | 2.744 |
| 42 | 1.302 | 1.682 | 2.018 | 2.418 | 2.698 |
| 43 | 1.302 | 1.681 | 2.017 | 2.416 | 2.695 |
| 44 | 1.301 | 1.680 | 2.015 | 2.414 | 2.692 |
| 45 | 1.301 | 1.679 | 2.014 | 2.412 | 2.690 |
| 46 | 1.300 | 1.679 | 2.013 | 2.410 | 2.687 |
| 47 | 1.300 | 1.678 | 2.012 | 2.408 | 2.685 |
| 48 | 1.299 | 1.677 | 2.011 | 2.407 | 2.682 |

The conclusion about the significance of the correlation between ETF 2 and the market index is:

A. Significant because the calculated t-statistic is greater than the critical value.
B. Not significant because the calculated t-statistic is less than the critical value.
C. Not significant because the calculated t-statistic is greater than the critical value.

The correct answer is A.

Hypothesis test: Two-sided; $\mathrm{H}_0: \rho = 0$ versus $\mathrm{H}_{\mathrm{a}}: \rho \neq 0$ . To test the significance of the correlation between ETF 2 and the market index, Alex Perez will calculate the t-statistic using the formula:


t = \frac {r \sqrt {n - 2}}{\sqrt {1 - r ^ {2}}}


Where: $r =$ Sample correlation coefficient $= 0.9096$ . $n =$ Number of observations $= 48$ . Substituting the given values into the t-test formula:


t = \frac {0 . 9 0 9 6 \sqrt {4 8 - 2}}{\sqrt {1 - 0 . 9 0 9 6 ^ {2}}} \approx \frac {0 . 9 0 9 6 \cdot 6 . 7 8 2 3}{0 . 4 1 5 4 9} \approx 1 4. 8 4 8


Since the critical t-value at the 0.01 level of significance is $\pm 2.687$ , and the calculated t-statistic (14.848) is greater than the critical value, Perez should conclude that the correlation between

© 2014-2024 AnalystPrep.
ETF 2 and the market index is significant. The test statistic is well outside the critical range, which leads to the rejection of the null hypothesis that there is no correlation.

B is incorrect. It suggests that the correlation is not significant due to the calculated t-statistic being less than the critical value. This is not the case here, as the calculated t-statistic (14.848) is indeed greater than the critical value at the 0.01 level of significance, indicating a significant correlation.

C is incorrect. The calculated t-statistic is greater than the critical value. In statistical hypothesis testing, a calculated t-statistic greater than the critical value at a given level of significance indicates that the correlation is significant, contrary to what option C suggests.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence. LOS (a): Explain parametric and non-parametric tests of the hypothesis that the population correlation coefficient equals zero and determine whether the hypothesis is rejected at a given level of significance.

Q.4451 The following contingency table shows the responses of two categories of investors (employed vs. self-employed) with regard to their risk tolerance levels (low, medium, or high). The total sample size is 200 investors.

| | Low | Medium | High | Total |
| --- | --- | --- | --- | --- |
| Employed | 45 | 55 | 20 | 120 |
| Self-Employed | 30 | 40 | 10 | 80 |
| Total | 75 | 95 | 30 | 200 |

If we wish to test whether there is any significant difference between employed and self-employed investors concerning risk tolerance levels, the test statistic is closest to:

A. 0.222.
B. 0.333.
C. 0.730.

The correct answer is C.

Let $\mathrm{H}_0$ be the hypothesis that there is no significant difference between employed and self-employed investors with regard to risk tolerance levels.

Let $\mathrm{H}_{\mathrm{a}}$ be the hypothesis that there is a significant difference between employed and self-employed investors with regard to risk tolerance levels.

© 2014-2024 AnalystPrep.
Step 1: Calculate the expected frequency of investors by their category and risk tolerance level using the formula:

| | Low | Medium | High | Total |
| --- | --- | --- | --- | --- |
| Employed | (120×75)/200 ≈ 45 | (120×95)/200 = 57 | (120×30)/200 = 18 | 120 |
| Self-Employed | (80×75)/200 = 30 | (80×95)/200 = 38 | (80×30)/200 = 12 | 80 |
| Total | 75 | 95 | 30 | 200 |

Step 2: Compute the scaled squared deviations for each category and risk tolerance level:

| | Low | Medium | High |
| --- | --- | --- | --- |
| Employed | (45-45)2/45 = 0 | (55-57)2/57 ≈ 0.070 | (20-18)2/18 ≈ 0.222 |
| Self-Employed | (30-30)2/30 = 0 | (40-38)2/38 ≈ 0.105 | (10-12)2/12 ≈ 0.333 |

Step 3: Calculate the total chi-square statistic:


\chi^ {2} = \sum \frac {\left(\mathrm {O} _ {\mathrm {i j}} - \mathrm {E} _ {\mathrm {i j}}\right) ^ {2}}{\mathrm {E} _ {\mathrm {i j}}} \approx 0. 0 7 0 + 0. 2 2 2 + 0. 1 0 5 + 0. 3 3 3 = 0. 7 3 0


A is incorrect. The option suggesting a test statistic of 0.222 does not accurately reflect the chi-square statistic calculated from the observed and expected frequencies. This value might represent a partial calculation for one of the categories but does not encompass the total variance observed across all categories and risk tolerance levels.

B is incorrect. The option indicating a test statistic of 0.333 similarly fails to capture the aggregate discrepancy between the observed and expected frequencies across all categories. While it might represent a calculation for a specific part of the table, it does not account for the total chi-square statistic which measures the overall difference.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence. LOS (b): Explain tests of independence based on contingency table data.

© 2014-2024 AnalystPrep.
Q.4676 What type of test would you use to assess the correlation between excess risk-adjusted return (alpha) and mutual fund expense ratios for US large-cap growth funds?

A. Parametric test
B. Nonparametric test
C. Chi-square test

The correct answer is B.

Given that mutual fund expense ratios and excess risk-adjusted returns may not be normally distributed and may not meet the assumptions of a parametric test, a nonparametric test, such as the Spearman rank correlation coefficient, would be appropriate to assess the correlation between these variables.

A is incorrect. Parametric tests are based on specific distributional assumptions, which may not be met by the data in this scenario.

C is incorrect. The chi-square test is used to test for independence of categorical variables, not for assessing the correlation between continuous variables like excess risk-adjusted return and mutual fund expense ratios.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
Q.4695 What are the null and alternative hypotheses for assessing the correlation between excess risk-adjusted return (alpha) and mutual fund expense ratios for US large-cap growth funds?

A. H0: ρ = 0 versus Ha: ρ ≠ 0
B. H0: ρ ≤ 0 versus Ha: ρ &gt; 0
C. H0: ρ ≥ 0 versus Ha: ρ &lt; 0

The correct answer is A.

This formulation of hypotheses tests whether there is no correlation (null hypothesis) versus the alternative hypothesis that there is a correlation between excess risk-adjusted return and mutual fund expense ratios.

B and C are incorrect. These formulations of hypotheses are for one-sided tests, which do not align with the scenario described where we are interested in determining whether there is any correlation between the variables, regardless of direction.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
Q.4696 What is the most appropriate test statistic for conducting a test of correlation between excess risk-adjusted return (alpha) and mutual fund expense ratios for US large-cap growth funds using a nonparametric approach?

A. Spearman rank correlation coefficient
B. Pearson correlation coefficient
C. Chi-square test statistic

The correct answer is A.

When dealing with variables that may not meet distributional assumptions, such as mutual fund expense ratios and excess risk-adjusted returns, a nonparametric approach like the Spearman rank correlation coefficient is suitable for assessing correlation.

B is incorrect. The Pearson correlation coefficient assumes normality and linearity, which may not hold true for the variables in this scenario.

C is incorrect. The chi-square test statistic is used for testing independence between categorical variables, not for assessing correlation between continuous variables like excess risk-adjusted return and mutual fund expense ratios.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
Q.4697 If the calculated test statistic for assessing the correlation between excess risk-adjusted return (alpha) and mutual fund expense ratios is -0.55177, and the critical values at a 0.05 level of significance are ±2.306, what decision is most likely to be made?

A. Reject the null hypothesis
B. Fail to reject the null hypothesis
C. Cannot be determined from the information given

The correct answer is B.

Since the calculated test statistic falls within the range of the critical values, it does not provide sufficient evidence to reject the null hypothesis that the Spearman rank correlation coefficient is zero.

A is incorrect. Reject the null hypothesis: This decision would be made if the calculated test statistic falls outside the range of the critical values, indicating sufficient evidence to reject the null hypothesis.

C is incorrect. Cannot be determined from the information given: The decision can be determined based on whether the calculated test statistic falls within or outside the range of the critical values, so it can be determined from the information provided. Hence, this choice is incorrect.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
Q.4698 What is the significance level used in the test of correlation between excess risk-adjusted return (alpha) and mutual fund expense ratios for US large-cap growth funds?

A. 0.05
B. 0.01
C. 0.10

The correct answer is A.

The significance level, often denoted by $\alpha$, is typically set at 0.05 in hypothesis testing unless otherwise specified.

B and C is incorrect. While these are common significance levels, the test of correlation between excess risk-adjusted return and mutual fund expense ratios in this scenario specifically mentions a 0.05 level of significance.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
Q.4699 What type of correlation coefficient is used when the assumptions for the parametric Pearson correlation is least likely to be met, such as when dealing with non-normally distributed variables?

A. Pearson correlation coefficient
B. Kendall's tau
C. Spearman rank correlation coefficient

The correct answer is C.

This coefficient is used in situations where the data may not meet the assumptions of the Pearson correlation coefficient, such as non-normally distributed variables or when dealing with ordinal data.

A is incorrect. This coefficient assumes normality and linearity in the data, which may not hold true in scenarios where non-normally distributed variables are involved.

B is incorrect. Kendall's tau: While Kendall's tau is another nonparametric measure of association, it specifically assesses the strength and direction of association between two variables based on the ranks of the data, rather than on the actual values of the variables. It is not mentioned in the context of the scenario provided.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
Q.4700 What are the null and alternative hypotheses to test whether the dividend and financial leverage groups are independent of one another?

A. H0: Dividend and financial leverage ratings are not related, Ha: Dividend and financial leverage ratings are related.

B. H0: Dividend and financial leverage ratings are related, Ha: Dividend and financial leverage ratings are not related.

C. H0: Dividend and financial leverage ratings are independent, Ha: Dividend and financial leverage ratings are dependent.

The correct answer is A.

This formulation of hypotheses correctly represents the null hypothesis that the two classifications are independent and the alternative hypothesis that they are related.

B is incorrect. This choice incorrectly states the null hypothesis as suggesting a relationship between dividend and financial leverage ratings, which is not the case.

C is incorrect. While this choice includes the concept of independence, it incorrectly formulates the alternative hypothesis as suggesting dependence rather than the two ratings being related.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (b) Explain tests of independence based on contingency table data.

© 2014-2024 AnalystPrep.
Q.4703 What conclusion can be drawn if the p-value associated with the chi-square test statistic is 0.03 at a 5% level of significance?

A. Reject the null hypothesis.
B. Fail to reject the null hypothesis.
C. Accept the null hypothesis.

The correct answer is A.

When the p-value is less than the chosen significance level (0.05 in this case), we reject the null hypothesis and conclude that there is a significant relationship between the variables.

B is incorrect. This choice would be incorrect when the p-value is less than the significance level, indicating sufficient evidence to reject the null hypothesis.

C is incorrect. While technically correct in terms of statistical terminology, accepting the null hypothesis is not typically stated in practice; instead, we simply fail to reject it when there is insufficient evidence to do so. Therefore, this choice is less appropriate than "Reject the null hypothesis."

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (b) Explain tests of independence based on contingency table data.

© 2014-2024 AnalystPrep.
Q.4704 What are the null and alternative hypotheses to test whether the dividend and financial leverage groups are independent of one another?

A. Null hypothesis: Dividend and financial leverage ratings are related; Alternative hypothesis: Dividend and financial leverage ratings are not related

B. Null hypothesis: Dividend and financial leverage ratings are not related; Alternative hypothesis: Dividend and financial leverage ratings are related

C. Null hypothesis: Dividend and financial leverage ratings are independent; Alternative hypothesis: Dividend and financial leverage ratings are dependent

The correct answer is B.

The null hypothesis assumes independence, while the alternative hypothesis suggests a relationship between dividend and financial leverage ratings.

A is Incorrect. This answer suggests that the null hypothesis assumes a relationship between dividend and financial leverage ratings, which is incorrect. The null hypothesis assumes independence, not a relationship.

C is incorrect. This answer incorrectly states that the null hypothesis assumes independence between the two classifications. However, the null hypothesis does not make an assumption; rather, it is a statement that is either rejected or failed to be rejected based on the evidence.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (b) Explain tests of independence based on contingency table data.

© 2014-2024 AnalystPrep.
Q.4707 What is the significance of the critical value in the chi-square test of independence at a 5% level of significance?

A. The critical value indicates the probability of committing a Type I error.

B. The critical value signifies the threshold beyond which we reject the null hypothesis.

C. The critical value determines the strength of the relationship between the variables.

The correct answer is B.

In the chi-square test of independence, if the calculated chi-square value exceeds the critical value, we reject the null hypothesis, indicating a significant relationship between the variables.

A is incorrect. The critical value does not directly indicate the probability of committing a Type I error; it serves as a threshold for determining the significance level.

C is incorrect. The critical value does not determine the strength of the relationship between variables; it is a statistical parameter used for hypothesis testing.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (b) Explain tests of independence based on contingency table data.

© 2014-2024 AnalystPrep.
Q.4708 Which statement accurately describes the degrees of freedom in a chi-square test of independence? The degrees of freedom is:

A. determined by the number of observations in the contingency table.

B. calculated as the difference between the total number of observations and the number of cells in the table.

C. equal to the product of one less than the number of rows and one less than the number of columns in the contingency table.

The correct answer is C.

This formula for degrees of freedom in a chi-square test of independence accounts for the constraints imposed by the row and column totals in the contingency table.

The expression $(r - 1)(c - 1)$ represents the degrees of freedom for a contingency table with r rows and c columns, calculated as the product of one less than the number of rows and one less than the number of columns.

A is incorrect. The degrees of freedom are not determined by the number of observations; they are calculated based on the structure of the contingency table.

B is incorrect. The degrees of freedom are not simply the difference between the total number of observations and the number of cells; they are determined by the number of rows and columns in the contingency table and are used to assess the variability in the data.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (b) Explain tests of independence based on contingency table data.

© 2014-2024 AnalystPrep.
Q.4727 Which statement is most likely true regarding the significance level in testing the correlation coefficient between two variables' returns?

A. A lower significance level increases the likelihood of rejecting the null hypothesis.
B. A higher significance level increases the likelihood of Type I error.
C. The choice of significance level does not affect the rejection of the null hypothesis.

The correct answer is B.

A higher significance level (e.g., 10% instead of 5%) increases the likelihood of Type I error, which occurs when the null hypothesis is incorrectly rejected.

A is incorrect. A lower significance level (e.g., 1% instead of 5%) decreases the likelihood of rejecting the null hypothesis, which may result in a Type II error (failing to reject the null hypothesis when it is false).

C is incorrect. The choice of significance level directly influences the probability of Type I error and, consequently, affects the rejection of the null hypothesis.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
Q.4728 In testing the correlation coefficient between two variables' returns, what factor most likely determines the critical t-value used for hypothesis testing?

A. The level of significance chosen by the analyst.
B. The magnitude of the sample correlation coefficient.
C. The degree of freedom associated with the sample size.

The correct answer is C.

The critical t-value used for hypothesis testing is primarily determined by the degree of freedom associated with the sample size, which affects the shape of the t-distribution.

A is incorrect. While the level of significance influences the decision rule (i.e., whether to reject the null hypothesis), it does not directly determine the critical t-value.

B is incorrect. The magnitude of the sample correlation coefficient may influence the calculated test statistic but not the critical t-value used for hypothesis testing.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
Q.4730 Which statement is most likely true regarding the t-test statistic used in testing the correlation coefficient between two variables' returns?

A. A higher t-test statistic indicates stronger evidence against the null hypothesis.
B. A lower t-test statistic suggests a higher probability of Type II error.
C. The t-test statistic is independent of the sample size.

The correct answer is A.

A higher t-test statistic indicates stronger evidence against the null hypothesis, suggesting that the sample correlation coefficient is significantly different from zero.

B is incorrect. A lower t-test statistic does not directly suggest a higher probability of Type II error; Type II error depends on factors such as the level of significance and the effect size.
C is incorrect. The t-test statistic depends on the sample size, with larger sample sizes typically resulting in larger t-values for the same correlation coefficient.

CFA Level I, Quantitative Methods, Learning Module 9: Parametric and Non-Parametric Tests of Independence, LOS (a) Explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance.

© 2014-2024 AnalystPrep.
# Learning Module 10: Simple Linear Regression

Q.225 A stock's returns for the past four years are as follows: 12%, 9.5%, 8%, 14.7%. The geometric mean return is closest to:

A. 11.02%
B. 11.05%
C. 51.90%

The correct answer is A.


\text{Geometric return} = (1.12 \times 1.095 \times 1.08 \times 1.147)^{\frac{1}{4}} - 1 = 0.11 \text{ or } 11\%


B is incorrect. It denotes the arithmetic mean and not the geometric mean:


\text{Arithmetic mean} = \left[ \frac{(0.12 + 0.095 + 0.08 + 0.147)}{4} \right] = 0.1105 = 11.05\%


C is incorrect. It denotes the geometric mean calculation but without the root sign calculation as follows:


\text{Geometric mean} = (1.12 \times 1.095 \times 1.08 \times 1.147) - 1 = 0.519 = 51.90\%


CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.407 Consider the following distribution, 3.5%; 3.8%; 5.9%; 9.6%; 12.4%; 2.3%. The second quintile is closest to:

A. 3.64%
B. 3.74%
C. 3.80%

The correct answer is B.

We are looking for the second quintile = 40%. We have n=6 (observations). Using the following formula, y=40% so that


L_y = (n + 1)\frac{y}{100} = (7)(\frac{40}{100}) = 2.8


Arranging the distribution in ascending order we have, 2.3%, 3.5%, 3.8%, 5.9%, 9.6%, and 12.4%. Therefore, the second quintile is between the 2nd number 3.5%, and the 3rd number 3.8%. To find the 2.8th number, we interpolate as:


0.035 + (2.8 - 2)(0.038 - 0.035) = 0.0374 = 3.74


Thus the second quintile is 3.74%.

A is incorrect. It is below the 2nd quantile.

C is incorrect. It is above the 2nd quantile.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3426 Which of the following is the most appropriate description of a parameter?

A. A numerical measure that describes a characteristic of a sample.
B. A numerical measure that describes a characteristic of a population.
C. A statistical inference that describes a characteristic of a population.

The correct answer is B.

A parameter is a numerical measure that describes a characteristic of a population, whereas a statistic is a numerical measure that describes a characteristic of a population sample.

A is incorrect. A numerical measure that describes a characteristic of a sample is called a statistic.

C is incorrect. Statistical inference is the process of using a sample to conclude a population from which the sample has been drawn.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3910 Tracy, senior analyst at CMSSP Capital reviewed Cronin (his junior's) regression analysis. He asked Cronin how the key inputs to the regression could affect the ultimate results. Cronin explained the effects of some of these inputs and assumptions, Cronin made the following comments: Comment 1: "The standard error of estimate is an important input for a hypothesis test. Small standard errors result in both tighter confidence intervals and tighter prediction intervals." Comment 2: "The estimated value for the variance of the independent variable can also affect hypothesis testing. The higher the assumed variance, the tighter the prediction intervals. However, changes in the assumed variance will have no effect on the confidence interval." Cronin is most accurate with respect to:

A. Comment 1 only.
B. Comment 2 only.
C. Both comments 1 and 2.

The correct answer is C.

Comment 1 is correct. Smaller standard errors would result in tighter confidence intervals and prediction intervals.

Comment 2 is correct. The higher the variance of the independent variable, the lower the variance of the forecast error, and the tighter the prediction interval. Confidence intervals do not depend on this input.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (d): Describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3911 "For our regression model to be valid, a linear relationship must exist between EPS growth and changes in return spread." This statement implies that:

A. EPS growth and changes in return spread must be discrete random variables.

B. The correlation coefficient between EPS growth and Changes in return spread must be greater than zero but less than one.

C. The slope coefficient and the intercept are raised to the first power only, and neither of them is divided or multiplied by another regression parameter.

The correct answer is C.

For any linear regression model to be valid and reliable, we must assume that there's a linear relationship between the dependent variable and the independent variable. This, in effect, means that the intercept and the slope coefficient can only be raised to the first power. In addition, none of the two should be multiplied or divided by another regression parameter.

A is incorrect. Linear regression assumes that the independent variable is not random because if the independent variable is random, the relation between the dependent and independent variables will not be random.

B is incorrect. Linear relationship can exist as long as the correlation coefficient lies between -1 and +1.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3912 Kim Richard has been looking at ways to increase efficiency in the construction process especially with regard to fuel consumption. She ran a regression explaining the variation in fuel consumption as a function of distance. The total variation of the dependent variable was 160.85, the explained variation was 80.15, and the unexplained variation was 100.70. She had 60 monthly observations. The standard error of the estimate in the regression is closest to:

A. 1.32.
B. 1.52.
C. 1.74.

The correct answer is A.


\begin{array}{l}
\text{Standard error of the estimate} = \left[ \sum_{i=1}^{n} \frac{(Y_i - \hat{p}_0 X_i)^2}{n - 2} \right]^{1/2} \\
= \left( \frac{\text{Unexplained variation}}{n - 2} \right)^{1/2} \\
= \left( \frac{100.7}{60 - 2} \right)^{0.5} = 1.3177
\end{array}


B is incorrect. It suggests a standard error of 1.52, which does not align with the calculation based on the provided data.

C is incorrect. It proposes a standard error of 1.74, which is also not supported by the calculation using the given data. The discrepancy indicates a fundamental error in the calculation process or a misinterpretation of the formula's components.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (d): Describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression.

Q.3915 An analyst is developing a regression model to forecast project cost based on the construction costs. He has gathered the following information.

- Multiple R: 0.8821
- R-squared: 0.7651
- Standard Error of Estimate: 0.6346
- Observations: 62

© 2014-2024 AnalystPrep.
- Variance of mean construction costs = 27.9
- Variance of mean forecasted project price = 18.35
- Mean construction costs = 98.54
- Correlation between mean construction costs and mean forecasted price = 0.75

The standard deviation of the prediction error given independent variable equals 425 is closest to:

A. 5.06.
B. 25.64.
C. 41.09.

The correct answer is A.


\begin{array}{l}
S_{i}^{2} = s^{2} \left[ 1 + \frac{1}{n} + \frac{(X - \bar{X})^{2}}{(n - 1) s_{x}^{2}} \right] \\
= 0.6346^{2} \left[ 1 + \frac{1}{62} + \frac{(425 - 98.54)^{2}}{(62 - 1)27.9} \right]^{2} \\
= 0.40272 (1 + 0.016129 + 62.62185) = 25.63 \\
\end{array}


Standard deviation of the prediction error = $\sqrt{25.63} = 5.06$

B is incorrect. 25.64 represents a misunderstanding of the question. It seems to be a misinterpretation of the variance of the prediction error, not the standard deviation.

C is incorrect. 41.09 does not correspond to any calculation related to the standard deviation of the prediction error based on the given data and formula.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (d): Describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3916 Which of the following statement is most likely correct?

A. If the sample size is increased, the standard error of the estimated measure will increase. This will reduce the reliability of regression results.

B. If the sample size is increased, the standard error of the estimated measure will decrease. This will increase the reliability of regression results.

C. If the sample size is increased, the standard error of the estimated measure will remain constant. This will not affect the reliability of regression results.

The correct answer is B.

An increase in the size of the sample will decrease the sum of squared errors (SSE) and simultaneously increase the denominator of the formula on the right side (see below).

Mean square error (MSE) is the sum of squares error divided by the degrees of freedom, which are $n - k - 1$.


\mathrm{MSE} = \sqrt{\frac{\mathrm{SSE}}{n - k - 1}}


A is incorrect. This option suggests that increasing the sample size would increase the standard error of the estimated measure, which is not accurate. In statistical terms, the standard error of an estimate is inversely related to the square root of the sample size (n). Mathematically, this relationship can be expressed as:


\text{Standard Error} = \frac{\sigma}{\sqrt{n}}


where $\sigma$ is the standard deviation of the population, and $n$ is the sample size. As $n$ increases, the denominator of this fraction becomes larger, resulting in a smaller standard error. Therefore, contrary to the statement, increasing the sample size actually enhances the reliability of regression results by reducing the standard error.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (d): Describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3917 Which of the following statements is most likely correct?

A. The standard error of estimate is the standard deviation of the actual values of the independent variable.

B. The standard error of estimate measures the standard deviation of the residual term; its numerator is calculated as the difference between the actual and predicted value of the dependent variable.

C. The standard error of estimate measures the standard deviation of the residual term; its numerator is calculated as the difference between the actual and predicted value of the independent variable.

The correct answer is B.

The standard error of estimate is the standard deviation of the residual term in the regression. Its numerator is calculated as the difference between the actual and predicted values of the dependent variable.

A is incorrect. The standard error of estimate is concerned with the residuals of the model, which are derived from the dependent variable's actual and predicted values.

C is incorrect. This option misstates the calculation of the standard error of estimate by suggesting that its numerator is calculated as the difference between the actual and predicted values of the independent variable. The standard error of estimate focuses on the dependent variable in a regression model, not the independent variable. The residuals, which are the basis for calculating the standard error of estimate, are determined by the differences be

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (d): Describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression.

Q.3918 An analyst is forecasting quarterly sales of Smart Inc., a smart TV manufacturer based in Thailand. The regression model is:


\text{Sales}_t = b_0 + b_1 \text{Sales}_{t-1} + \epsilon_t


The regression results for the smart TV sales model are presented below:

R-squared: 0.7436
Observations: 120

© 2014-2024 AnalystPrep.
| | Coefficient | Standard Error |
| --- | --- | --- |
| Intercept | 313.24 | 99.43 |
| Lag 1 | 0.67 | 0.16 |

If TV sales in the first quarter were 1,137, the number of sales forecasted for the second quarter is closest to:

A. 762.
B. 1,075.
C. 1,137.

The correct answer is B.

The model is correctly specified. Hence, quarterly sales for Smart Inc., can be forecasted using this model:

$\mathrm{b_0} =$ Intercept $= 313.24\mathrm{b}_{1} =$ Slope coefficient $= 0.67$

Thus,


\operatorname {S a l e s} _ {\mathrm {t}} = 3 1 3. 2 4 + (0. 6 7 \times 1, 1 3 7) = 1, 0 7 5. 0 3


A is incorrect. As calculated above.

C is incorrect. This option suggests that the number of sales would remain the same from the first quarter to the second quarter, which disregards the regression model provided. The model indicates that sales are influenced by the sales of the previous quarter through a specific mathematical relationship. Simply repeating the previous quarter's sales ignores the model's dynamics and the effect of the slope coefficient, which is designed to capture the relationship between consecutive quarters' sales.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (e): Calculate and interpret the predicted value for the dependent variable, and a prediction interval for it, given an estimated linear regression model and a value for the independent variable.

Q.3920 An analyst is assessing the contagion effect or spread of market disturbances in financial markets. He picks up four globally recognized indices and prepares a correlation matrix using monthly returns of various stock indices for the last 4 years as shown below:

© 2014-2024 AnalystPrep.
| | DJIA | S&P 500 | FTSE 100 | CAC 40 |
| --- | --- | --- | --- | --- |
| DJIA | 1.00 | | | |
| S&P 500 | 0.78 | 1.00 | | |
| FT SE 100 | 0.43 | 0.66 | 1.00 | |
| CAC 40 | 0.38 | 0.33 | 0.80 | 1.00 |

The correlation coefficient is not statistically significant at the 0.01 significance level for which pair of market indices? (See the t-table)

A. CAC 40 with DJIA.
B. FT SE 100 with DJIA.
C. CAC 40 with S&amp;P500.

The correct answer is C.

Because Zeng is looking at monthly returns for the last 4 years, $n = 48$. Then, the critical value of the t-test (at the 0.005 significance level, with $48 - 2 = 46$ degrees of freedom) is 2.687. We formulate the null hypothesis that the coefficient $= 0$ and reject the null when the computed test statistic is outside the range $\pm 2.687$.

CAC 40 and DJIA: Correlation $= 0.38$

The correlation coefficient between CAC 40 and DJIA is 0.38 and test statistic is calculated as follows:


t = \frac {r ^ {\sqrt {n - 2}}}{\sqrt {1 - r ^ {2}}} = \frac {0 . 3 8 \sqrt {4 8 - 2}}{\sqrt {1 - 0 . 3 8 ^ {2}}} = 2. 7 8


Hence, the correlation coefficient between FT SE 100 and DJIA is statistically significant.

CAC 40 and S&amp;P 500: Correlation $= 0.33$
t = \frac {0 . 3 3 \sqrt {4 8 - 2}}{\sqrt {1 - 0 . 3 3 ^ {2}}} = 2. 3 7


2.37 is less than the upper $99.9\%$ point of the t-distribution with 46 degrees of freedom, i.e., 2.687

Hence, the correlation coefficient between CAC 40 and S&amp;P 500 is not statistically significant.

A is incorrect. The correlation coefficient between CAC 40 and DJIA is 0.38. Using the formula, we find: This t-statistic (2.78) is greater than the critical value of 2.687, indicating that the correlation coefficient between CAC 40 and DJIA is statistically significant at the 0.01 significance level. This suggests that there is a statistically significant linear relationship

© 2014-2024 AnalystPrep.
between these two indices.

B is incorrect. The correlation coefficient between FTSE 100 and DJIA is not directly questioned for its significance in the provided options. However, if we were to calculate it, we would apply the same formula and compare the resulting t-statistic to the critical value to determine its significance.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

Q.3921 Richard Zeng is developing a regression model to predict stock market returns using the GDP growth rate. He considers quarterly returns of the S&amp;P 500 (S&amp;P) as a proxy for stock market returns and quarterly changes in GDP as GDP growth rate (GDP Growth). The linear regression model is as follows:


\mathrm {S} \&amp; \mathrm {P} = \beta_ {0} + \beta_ {1} (\text {G D P G r o w t h}) + \epsilon


Zeng develops the following partial ANOVA table and regression statistics based on the last 10 years of quarterly data pertaining to the S&amp;P 500 and GDP.

| | DF | SS |
| --- | --- | --- |
| Regression | 1 | 108 |
| Residual | 38 | To be calculated |
| Total | 39 | 155.5 |

The percentage of variation in the S&amp;P 500 return that can be attributed to the GDP growth rate is closest to:

A. $31\%$ .
B. $69\%$ .
C. $100\%$ .

The correct answer is B.

The percentage of variation in the S&amp;P 500 return that can be attributed to the GDP growth rate is also called coefficient of determination $(\mathbb{R}^2)$ .


\text {Coefficient of determination} = \frac {\mathrm {R S S}}{\mathrm {T S S}}


© 2014-2024 AnalystPrep.
Where, RSS is the regression sum of squares, or the amount of total variation that is explained in the regression equation, and is the total variation. These numbers are both given in the table. Hence,


\text{Coefficient of determination} = \frac{108}{155.5} = 0.6945 \approx 69\%


A is incorrect. Suggesting that only 31% of the variation in the S&amp;P 500 returns is explained by the GDP growth rate underestimates the explanatory power of the GDP growth rate in the regression model. This option likely results from misunderstanding the calculation of the coefficient of determination or misinterpreting the values provided in the ANOVA table.

C is incorrect. Claiming that 100% of the variation in the S&amp;P 500 returns is explained by the GDP growth rate is unrealistic in practical economic and financial modeling. It is highly unlikely for a single variable, such as GDP growth, to account for all the variations in a complex market index like the S&amp;P 500. This option disregards the presence of other factors and the inherent randomness in financial markets that can affect stock market returns.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (d): Describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3922 Richard Zeng is developing a regression model to predict stock market returns using the GDP growth rate. He considers quarterly returns of the S&amp;P 500 (S&amp;P) as a proxy for stock market returns and quarterly changes in GDP as GDP growth rate (GDP Growth). The linear regression model is as follows:


\mathrm{S\&amp;P} = \beta_{0} + \beta_{\mathrm{I}} (\text{GDP Growth}) + \epsilon


The significance of Zeng's model for predicting the S&amp;P 500 return using the GDP growth rate can be tested by:

A. t-test only.

B. F-test only.

C. either t-test on slope coefficient or F-test model because both will lead to the same conclusion.

The correct answer is C.

Either a t-test on the slope coefficient or an F-test on the simple linear regression model can be used. Both tests will lead to the same conclusion (as the F-statistic is simply the square of the t-statistic for the slope coefficient in this case). An F-test is used to determine the effectiveness of independent variables in explaining the variation of the dependent variable.

The F-test can be carried out with more than one independent variable.

However, had this question been about multiple regression analysis, only the F-test can be applied to evaluate the overall statistical significance of the model, and t-tests could be used to evaluate the statistical significance of individual slope coefficients.

A is incorrect. Suggesting that only a t-test can be used to assess the significance of Zeng's model is not entirely accurate. While a t-test is indeed used to determine the statistical significance of individual coefficients in a regression model, implying it is the sole method overlooks the applicability and relevance of the F-test in evaluating the overall model's significance, especially in simple linear regression scenarios.

B is incorrect. Stating that only an F-test can be used to evaluate the significance of Zeng's model is misleading. The F-test is crucial for assessing the joint significance of multiple coefficients in a regression model, particularly in multiple regression scenarios. However, in the context of a simple linear regression model like Zeng's, where there is only one independent variable, the F-test's conclusion about the model's overall significance will mirror the conclusion drawn from a t-test on the slope coefficient. Therefore, stating that only an F-test is applicable neglects the role and relevance of the t-test in this specific context.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3923 Zeng is developing a regression model to predict stock market returns using the GDP growth rate. He considers quarterly returns of the S&amp;P 500 (S&amp;P) as a proxy for stock market returns and quarterly changes in GDP as GDP growth rate (GDP Growth). The linear regression model is as follows:


\mathrm {S} \&amp; \mathrm {P} = \beta_ {0} + \beta_ {1} (\text {G D P G r o w t h}) + \epsilon


Zeng develops the following partial ANOVA table and regression statistics based on the last 10 years of quarterly data pertaining to the S&amp;P 500 and GDP.

| | DF | Sum of Squares |
| --- | --- | --- |
| Regression | 1 | 108 |
| Residual | 38 | To be calculated |
| Total | 39 | 155.5 |

The standard error of the estimate for Zeng's model to predict stock market returns using the GDP growth rate is closest to:

A. 0.0366.
B. 0.0534.
C. 1.1180.

The correct answer is C.


\text {Standard Error of Estimate (SSE)} = \sqrt {\frac {\text {sum of square of errors}}{\mathrm {n} - 2}}


Where:

Sum of square of Errors $= \mathrm{SST - SSR} = 155.8 - 108 = 47.5\mathrm{N} = 40$ (Based on 10 years of quarterly data)

Thus,


\mathrm {S S E} = \sqrt {\frac {4 7 . 5}{4 0 - 2}} = 1. 1 1 8 0


A is incorrect. The value 0.0366 does not correctly represent the standard error of the estimate based on the given data and the correct calculation method. This value significantly

© 2014-2024 AnalystPrep.
underestimates the variability of the residuals around the regression line, suggesting a much higher precision of the model's predictions than is actually the case.

B is incorrect. The value 0.0534 also does not align with the correct calculation of the standard error of the estimate. Similar to option A, this value underestimates the variability of the residuals, implying a level of precision in the model's predictions that is not supported by the data.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (d): Describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression.

Q.3924 The statistic which is used to measure how well a given linear regression model captures the relationship between the dependent and independent variables is most likely known as:

A. Standard error of the estimate.
B. Intercept of the regression model.
C. Slope of the independent Variable.

The correct answer is A.

An estimate's standard error measures how well a given linear regression model captures the relationship between the dependent and independent variables.

B is incorrect. The intercept is the estimate of the dependent variable when the independent variable is zero.

C is incorrect. The slope coefficient represents the expected change in the dependent variable for a one-unit change in the independent variable.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3925 Which of the following statistic is most likely used to identify the fraction of the total variation that is explained by the regression?

A. Coefficient of determination.
B. Intercept of the regression model.
C. Slope of the independent variable.

The correct answer is A.

The coefficient of determination is the fraction of the total variation in the dependent variable that is explained by the independent variable.

B is incorrect. The intercept is the estimate of the dependent variable when the independent variable is zero.

C is incorrect. The slope coefficient represents the expected change in the dependent variable for a one-unit change in the independent variable.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3926 Mike Far explains the linear regression model and its underlying assumptions using the following statement: "The estimated parameters in a linear regression model maximize the sum of the squared regression residuals." The above statement on estimated parameters in a linear regression model is most likely:

A. Correct.

B. Incorrect, because the model minimizes the sum of squared regression residuals.

C. Incorrect, because the model minimizes the sum of the regression residuals.

The correct answer is B.

A linear regression model computes a line that best fits the observations. It chooses values for the intercept and slope that minimize the sum of the squared vertical distance between the observations and the regression line. Hence, the estimated parameters in a linear regression model minimize the sum of the squared regression residuals.

A is incorrect. It suggests that the estimated parameters in a linear regression model maximize the sum of the squared regression residuals. This statement is the opposite of the actual process involved in linear regression analysis. The goal of linear regression is not to maximize but to minimize the discrepancies between the observed values and the values predicted by the model. By minimizing the sum of squared residuals, the model ensures that the predicted values are as close as possible to the actual observed values, thereby achieving the best fit.

C is incorrect. Residuals can be both positive and negative, and when summed up, positive and negative errors could cancel each other out, giving an impression of a better fit than it actually is. Squaring the residuals before summing them ensures that all errors are treated as positive values, emphasizing larger errors more significantly and leading to a more accurate estimation of the model parameters.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

Q.3927 An analyst has prepared a regression analysis comparing the price of gold to the average cost of purchases of finished gold jewelry of a retailer of fine jewelry and watches. The regression results are shown in Exhibit 1 below.

Exhibit 1: 1983-2013 Annual Data

(31 Observations)

© 2014-2024 AnalystPrep.
| Variable | Coefficient | SE of Coefficient |
| --- | --- | --- |
| Intercept | 11.06 | 7.29 |
| Cost of gold | 2.897 | 0.615 |
| *SEE=117.8 | | |

The per ounce price of gold that corresponds to the $1,500 cost of finished jewelry is closest to:

A. $513.96.
B. $517.77.
C. $521.59.

The correct answer is A.

The regression model is of the form:


y = \hat {b} _ {0} + \hat {b} _ {1} x


Where:

y = Cost of the finished jewelry.
$\hat{\mathbf{b}}_0 =$ Slope coefficient.
x = Cost of gold.

Then, we can solve for to find the cost of gold:


1500 = 11.06 + 2.897x


Hence,


\text{Cost of gold} = \frac{1500 - 11.06}{2.897} = 513.96


B is incorrect. The option suggesting a price of $517.77 does not align with the calculation based on the regression model provided. It appears to be a miscalculation or misinterpretation of the regression equation.

C is incorrect. The option suggesting a price of $521.59 also does not follow from the regression model provided in the question. Similar to option B, this appears to be a result of a miscalculation or misunderstanding of how to apply the regression equation.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (e): Calculate and interpret the predicted value for the dependent variable, and a prediction interval for it, given an estimated linear regression model and a value for the independent variable.

© 2014-2024 AnalystPrep.
Q.3928 Singh, an analyst at Delta Advisory Firm, has prepared a regression analysis comparing the price of gold to the average cost of purchases of finished gold jewelry of a retailer of fine jewelry and watches. The regression results are shown in Exhibit 1 below.

Exhibit 1: 1983-2013 Annual Data (31 Observations)

| Variable | Coefficient | SE of Coefficient |
| --- | --- | --- |
| Intercept | 11.06 | 7.29 |
| Cost of gold | 2.897 | 0.615 |
| *SEE=117.8 | | |

Singh commented "We may have a problem with parameter instability if the relationship between gold prices and jewelry costs has changed over the past 30 years." Baker computes the test statistic and concluded that "We fail to reject the null hypothesis that the slope coefficient is equal to 4.0 at the 5% significance level." Are Singh (Statement 1) and Baker (Statement 2) correct or incorrect regarding the usefulness of regression results described in Exhibit 1 and the value of the slope coefficient? Use the excerpt of the t-table below.

| df | p = 0.10 | p = 0.05 | p = 0.025 | p = 0.01 | p = 0.005 |
| --- | --- | --- | --- | --- | --- |
| 25 | 1.316 | 1.708 | 2.060 | 2.485 | 2.787 |
| 26 | 1.315 | 1.706 | 2.056 | 2.479 | 2.779 |
| 27 | 1.314 | 1.703 | 2.052 | 2.473 | 2.771 |
| 28 | 1.313 | 1.701 | 2.048 | 2.467 | 2.763 |
| 29 | 1.311 | 1.699 | 2.045 | 2.462 | 2.756 |
| 30 | 1.310 | 1.697 | 2.042 | 2.457 | 2.750 |

A. Both Singh and Baker: Correct.
B. Both Singh and Baker: Incorrect.
C. Singh: Incorrect; Baker: Correct.

The correct answer is A.

Both Singh and Baker's statements are correct. The data for regression analysis pertains to a period of more than 30 years, and during this period, the relationship between gold prices and jewelry costs could have changed. This would create parameter instability a regression limitation.

Test statistic is given by:

© 2014-2024 AnalystPrep.

\frac {\widehat {b} _ {1} - b _ {1}}{S _ {\widehat {b} _ {1}}} = \frac {2 . 9 8 7 - 4 . 0}{0 . 6 1 5} = - 1. 7 9 3


The critical value (t-value at 29 dfs and alpha = 0.025) is 2.045.

Our test statistic lies within the non-rejection region (±2.045). We therefore have insufficient evidence to reject the null hypothesis that the slope coefficient is equal to 4.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

Q.3929 Xander Feng, CFA, is a quantitative analyst with Red Star Securities Ltd. Feng is forecasting quarterly sales of Xiomi Inc., a smart phone manufacturer based in China. The regression model is:


\text {S a l e s} _ {\mathrm {t}} = \mathrm {b} _ {0} + \mathrm {b} _ {1} \text {S a l e s} _ {\mathrm {t - 1}} + \epsilon_ {\mathrm {t}}


The regression results for the smartphone sales model are presented in the exhibits below:

Exhibit 1: Regression statistics for smartphones sales model

| | Coefficient | Standard Error |
| --- | --- | --- |
| Intercept | 313.24 | 99.43 |
| Lag 1 | 0.67 | 0.16 |

R-squared: 0.7436

Observations: 120

If smartphone sales in first quarter were 1,137, the number of smartphone sales forecasted for the second quarter is closest to:

A. 762.
B. 1,075.
C. 1,137.

The correct answer is B.

The model is correctly specified. Hence, quarterly sales for Xiomi can be forecasted using this model:

© 2014-2024 AnalystPrep.

\text{Sales}_t = b_0 + b_1 \text{Sales}_{t-1} + \epsilon_t = 313.24 + (0.67 \times 1,137) = 1,075.03


A is incorrect. It suggests a forecasted sales figure of 762.0, which does not align with the calculation based on the regression model provided.

C is incorrect. It suggests that the number of smartphone sales forecasted for the second quarter is the same as the first quarter, 1,137. This ignores the effect of the regression model, which incorporates both a constant term and a coefficient for the previous quarter's sales to forecast future sales. The regression model indicates that sales are expected to change from quarter to quarter based on the model's parameters, and thus, maintaining the same sales figure does not reflect the model's forecast.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

Q.3931 In which of the following functional forms the dependent variable is linear but the independent variable is logarithmic?

A. The Lin-log model and will be represented as $Y_i = b_0 + b_1 \ln X_i$.
B. The Log-lin model will be represented as $\ln Y_i = b_0 + b_1 X_i$.
C. The Log-log model and will be represented as $\ln Y_i = b_0 + b_1 \ln X_i$.

The correct answer is A.

Lin-log model: The dependent variable is linear but the independent variable is logarithmic. It is represented as $Y_i = b_0 + b_1 \ln X_i$

B is incorrect. Log-lin model: The dependent variable is logarithmic but the independent variable is linear. It is represented as $\ln Y_i = b_0 + b_1 X_i$

C is incorrect. Log-log model: Both the dependent and independent variables are in logarithmic form. It is represented as $\ln Y_i = b_0 + b_1 \ln X_i$

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (f): Describe different functional forms of simple linear regressions.

© 2014-2024 AnalystPrep.
Q.3932 In the log-lin model, which of the following statement (s) is most likely correct about the slope coefficient?

A. The slope coefficient in the log-lin model provides the absolute change in the dependent variable for a relative change in the independent variable.

B. The slope coefficient in the log-lin model is the relative change in the dependent variable for an absolute change in the independent variable.

C. The slope coefficient in the log-lin model is the relative change in the dependent variable for a relative change in the independent variable.

The correct answer is B.

The slope coefficient in the log-lin model is the relative change in the dependent variable for an absolute change in the independent variable. However, because the model involves logarithms, the interpretation of the slope coefficient is based on relative changes rather than absolute changes.

A is incorrect. The slope coefficient in the lin-log model provides the absolute change in the dependent variable for a relative change in the independent variable. In a log-linear model, the slope coefficient provides the relative change in the dependent variable for a one-unit change in the independent variable, not the absolute change.

C is incorrect. The slope coefficient in the log-log model is the relative change in the dependent variable for a relative change in the independent variable. In a log-linear model, the slope coefficient represents the relative change in the dependent variable for a one-unit absolute change in the independent variable.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
Q.3933 An analyst is comparing two regression models to analyze the relationship between auto sales and bank financing rates of a Country. The model which would better represent the relationship would least likely have:

A. higher F-statistic.
B. lower coefficient of determination (R²).
C. lower standard error of estimate (Sₑ).

The correct answer is B.

A model with a high Coefficient of determination R², high F-statistic, and low standard error of estimate (SEE) is better.

A is incorrect. A higher F-statistic is indicative of a statistically significant relationship between the dependent and independent variables in the model. The F-statistic tests the null hypothesis that all regression coefficients are equal to zero, meaning no relationship exists between the dependent and independent variables. A higher F-statistic value leads to the rejection of this null hypothesis, suggesting that the model has at least one significant predictor variable. Therefore, a model with a higher F-statistic is generally considered to provide a better representation of the relationship between variables.

C is incorrect. The standard error of estimate (Sₑ) measures the average distance that the observed values fall from the regression line. A lower Sₑ indicates that the model has a tighter fit to the observed data, as the observed values are closer to the predicted values. This implies that the model with a lower Sₑ would more accurately represent the relationship between auto sales and bank financing rates, as it suggests less dispersion of the observed values around the fitted values. Therefore, a model with a lower Sₑ is preferable for accurately representing the relationship between variables.

CFA Level I, Quantitative Methods, Learning Module 10: Simple Linear Regression. LOS (c): Calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression.

© 2014-2024 AnalystPrep.
# Learning Module 11: Introduction to Big Data Techniques

Q.3692 Alternative data refers to:

A. Data used for investment analysis arising from external sources, including financial statements and management presentations of comparable entities
B. Data used by investors to evaluate a company or product that is not related to financial statements
C. Data used by investors for investment analysis that is not within their traditional sources

The correct answer is C.

Alternative data, also known as non-traditional data, refer to data types generated by the use of electronic devices, social media, satellite and sensor networks, and company exhaust. Alternative data helps investors get more granular and faster insights into company performance compared to traditional data sources.

**A is incorrect.** This option describes data arising from external sources, including financial statements and management presentations of comparable entities. However, this description aligns more closely with traditional data sources rather than alternative data. Traditional data sources, such as financial statements and management presentations, have been the cornerstone of investment analysis for decades. These sources provide a historical view of a company's financial health and performance but may not offer the timely or unique insights that alternative data can provide.

**B is incorrect.** While this option touches on the essence of alternative data by mentioning data not related to financial statements, it does not fully capture the scope and utility of alternative data in investment analysis. Alternative data is not merely about being unrelated to financial statements; it is about providing additional, non-traditional insights that complement traditional analysis. This option fails to emphasize the broad range of data types and sources that constitute alternative data and how they are used by investors to gain a deeper understanding of market dynamics, consumer behavior, and company performance beyond what traditional financial metrics can reveal.

CFA Level I, Quantitative Methods, Learning Module 11: Introduction to Big Data Techniques. LOS (c): Describe applications of Big Data and Data Science to investment management.

© 2014-2024 AnalystPrep.
Q.3700 The big data revolution witnessed in the last 50 years is down to:

A. Exponential increase in the amount of data available
B. Increase in computing power and data storage capacity, at affordable cost
C. All of the above

The correct answer is C.

The growth in big data and the machine learning revolution can be traced down to:

1. The availability of new datasets previously unavailable, such as sensor data from satellites, online activity of individuals, and the internet of things.
2. Advancement in computing power and data storage capacity (From kilobytes to petabytes)
3. Advancement in Machine Learning methods to analyze complex datasets, including programming languages such as Python, Java, SQL, etc.

A is incorrect. While the exponential increase in the amount of data available has indeed played a crucial role in the big data revolution, attributing the revolution solely to this factor overlooks the equally important contributions of advancements in computing power and data storage capacity. The availability of large datasets, such as sensor data from satellites, online activity logs, and the Internet of Things (IoT) devices, has certainly fueled the growth of big data. However, without the corresponding advancements in technology to process and store this data efficiently, the potential of these vast datasets could not have been fully realized.

B is incorrect. Similarly, attributing the big data revolution solely to the increase in computing power and data storage capacity, at affordable costs, does not provide a complete picture. While these technological advancements have been pivotal in enabling the processing and analysis of large datasets, the revolution also owes much to the exponential growth in the volume of data generated. This includes data from diverse sources such as social media, e-commerce, digital communications, and IoT devices. The synergy between the increased data availability and the technological capabilities to handle such data has been fundamental to the big data revolution.

CFA Level I, Quantitative Methods, Learning Module 11: Introduction to Big Data Techniques. LOS (c): Describe applications of Big Data and Data Science to investment management.

© 2014-2024 AnalystPrep.
Q.3707 Sensor data is most likely taken from:

A. individuals through their online activity such as product reviews, credit card purchases, and social media posts.
B. businesses and corporations, including sales information, credit card data, and corporate exhaust.
C. devices such as smartphones, cameras, and satellites.

The correct answer is C.

Sensor data is the output of a device that detects and responds to some type of input from the physical environment. Sensor data are collected from such devices as smartphones, cameras, RFID chips, and satellites. These devices are connected to computers via wireless networks.

A is incorrect. This option suggests that sensor data is taken from individuals through their online activities such as product reviews, credit card purchases, and social media posts. However, this type of data is more accurately described as user-generated content or digital footprint data, rather than sensor data. While this information can be valuable for various analyses, it does not originate from physical sensors or devices designed to detect changes in the environment. Instead, it is generated by individuals engaging with digital platforms and services, reflecting their preferences, opinions, and behaviors.

B is incorrect. This option indicates that sensor data comes from businesses and corporations, including sales information, credit card data, and corporate exhaust. Similar to option A, this type of data is not sensor data. Instead, it is transactional or operational data generated by business activities. While businesses may use sensor data as part of their operations (for example, in inventory management with RFID chips), the data described in this option pertains to business transactions and internal processes, not the output of devices sensing the physical environment.

CFA Level I, Quantitative Methods, Learning Module 11: Introduction to Big Data Techniques. LOS (a): Describe aspects of "fintech" that are directly relevant for the gathering and analyzing of financial data.

© 2014-2024 AnalystPrep.
Q.3709 Machine learning is:

A. The autonomous acquisition of knowledge through the use of computer programs
B. The ability of machines to execute coded instructions
C. The selective acquisition of knowledge through the use of computer programs

The correct answer is A.

Machine learning refers to the autonomous acquisition of knowledge through computer programs such that the computers learn to work out solutions to problems without human intervention. Machine learning is the idea that computers have the ability to "learn" and execute changes independently.

B is incorrect. This option incorrectly defines machine learning as merely the ability of machines to execute coded instructions. While executing coded instructions is a fundamental capability of computers and machines, it does not encompass the concept of learning or the ability to improve performance on tasks over time without being explicitly programmed to do so. Traditional computer programs operate based on predefined rules and instructions provided by humans, without the ability to learn or adapt. In contrast, machine learning involves the development of algorithms that allow machines to learn from data and make decisions or predictions, thereby going beyond mere execution of coded instructions.

C is incorrect. This option describes machine learning as the selective acquisition of knowledge through the use of computer programs. While this description touches on an aspect of machine learning, it fails to capture the essence of autonomy in the learning process. Machine learning is not just about selectively acquiring knowledge; it is about doing so autonomously, without direct human intervention. The term "selective" might imply a more passive or limited approach to knowledge acquisition, whereas machine learning involves active analysis, interpretation, and learning from vast amounts of data in a way that improves the program's performance on specific tasks over time.

CFA Level I, Quantitative Methods, Learning Module 11: Introduction to Big Data Techniques. LOS (a): Describe aspects of "fintech" that are directly relevant for the gathering and analyzing of financial data.

© 2014-2024 AnalystPrep.
Q.3710 Which of the following is most likely behind the increased adoption of automatic algorithmic trading?

A. Increased efficiency
B. Increased market destinations
C. Ability to execute large trades

The correct answer is B.

Over time, financial markets have disintegrated into smaller markets consisting of electronic exchanges, alternative trading systems, and dark pools. Digital algorithms have made it possible to execute multiple trades over several global financial markets automatically. This has been their biggest selling point.

A is incorrect. While increased efficiency is a notable benefit of automatic algorithmic trading, it is not the primary reason behind its increased adoption. Efficiency in this context refers to the speed and accuracy with which trades are executed, minimizing slippage and operational costs. Although these are important factors, the core driver for the adoption of algorithmic trading is its ability to navigate and exploit opportunities across multiple market destinations, rather than efficiency alone.

C is incorrect. The ability to execute large trades is indeed a feature of algorithmic trading, particularly through techniques such as order slicing, which breaks down large orders into smaller, less market-disruptive transactions. However, this capability, while valuable, is not the primary reason for the increased adoption of algorithmic trading. The fragmentation of financial markets and the subsequent need to efficiently access and trade across these diverse venues are more significant factors driving the adoption of algorithmic trading strategies. The capacity to handle large trades, although beneficial, supports the broader objective of optimizing trade execution across multiple market destinations.

CFA Level I, Quantitative Methods, Learning Module 11: Introduction to Big Data Techniques. LOS (c): Describe applications of Big Data and Data Science to investment management.

© 2014-2024 AnalystPrep.
Q.3712 A correct description of artificial intelligence is that:

A. It encompasses more advanced systems that are able to analyze information and make decisions based on machine-learning logic.
B. Its goals are very different from those of machine learning.
C. It terminates the need for human input in investment analysis.

The correct answer is A.

Fintech encompasses more advanced systems that are able to analyze information and make decisions based on machine-learning logic. Machines that "learn" how to perform tasks over time have been developed. The use of such systems has brought about high levels of inefficiency that surpass human capabilities.

B is incorrect. Fintech encompasses both Artificial intelligence (AI) and machine learning (ML). The two have largely similar goals: to create new and innovative products and services.

C is incorrect. It's widely accepted that AI and ML techniques are not self-sufficient. Human input is still an integral part of investment analysis.

CFA Level I, Quantitative Methods, Learning Module 11: Introduction to Big Data Techniques. LOS (c): Describe applications of Big Data and Data Science to investment management.

© 2014-2024 AnalystPrep.
