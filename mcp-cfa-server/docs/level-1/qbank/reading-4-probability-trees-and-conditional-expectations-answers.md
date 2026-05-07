---
title: "Reading 4 Probability Trees and Conditional Expectations - Answers"
source_pdf: "Reading 4 Probability Trees and Conditional Expectations - Answers.pdf"
converter: "mistral-ocr-latest"
date_converted: "2026-05-07T00:25:55Z"
pages: 11
category: "level-1/qbank"
sanitized: true
reviewed: false
---
Question #1 of 15

Question ID: 1572776

There is a 60% chance that the economy will be good next year and a 40% chance that it will be bad. If the economy is good, there is a 70% chance that XYZ Incorporated will have EPS of $5.00 and a 30% chance that their earnings will be $3.50. If the economy is bad, there is an 80% chance that XYZ Incorporated will have EPS of $1.50 and a 20% chance that their earnings will be $1.00. What is the firm's expected EPS?

A) $3.29.
B) $5.95.
C) $2.75.

☑
☐
☐

Explanation

| State of the Economy (Unconditional Probability) | Conditional Probability | Joint Probability | EPS | Joint Probability × EPS |
| --- | --- | --- | --- | --- |
| GOOD 60% | 70% | 60% × 70% = 42% | $5.00 | 42% × $5.00 = $2.10 |
| | 30% | 60% × 30% = 18% | $3.50 | 18% × $3.50 = $0.63 |
| BAD 40% | 80% | 40% × 80% = 32% | $1.50 | 32% × $1.50 = $0.48 |
| | 20% | 40% × 20% = 8% | $1.00 | 8% × $1.00 = $0.08 |
| Expected EPS = ∑ Joint Probability × EPS | | | | $3.29 |

(Module 4.1, LOS 4.a)

Question #2 of 15

Question ID: 1572780

An analyst announces that an increase in the discount rate next quarter will double her earnings forecast for a firm. This is an example of a:

A) use of Bayes' formula.
B) joint probability.
C) conditional expectation.

☑
☐
# Explanation

This is a conditional expectation. The analyst indicates how an expected value will change given another event.

(Module 4.1, LOS 4.b)

---

# Question #3 of 15

Question ID: 1572782

An economist estimates a 60% probability that the economy will expand next year. The technology sector has a 70% probability of outperforming the market if the economy expands and a 10% probability of outperforming the market if the economy does not expand. Given the new information that the technology sector will not outperform the market, the probability that the economy will not expand is closest to:

A) 54%.
B) 33%.
C) 67%.

☐

☐

☐

# Explanation
![img-0.jpeg](img-0.jpeg)

Using the new information we can use Bayes' formula to update the probability.

P(economy does not expand | tech does not outperform) = P(economy does not expand and tech does not outperform) / P(tech does not outperform).

P(economy does not expand and tech does not outperform) = P(tech does not outperform | economy does not expand) × P(economy does not expand) = 0.90 × 0.40 = 0.36.

P(economy does expand and tech does not outperform) = P(tech does not outperform | economy does expand) × P(economy does expand) = 0.30 × 0.60 = 0.18.

P(economy does not expand) = 1.00 - P(economy does expand) = 1.00 - 0.60 = 0.40.
P(tech does not outperform | economy does not expand) = 1.00 - P(tech does outperform | economy does not expand) = 1.00 - 0.10 = 0.90.

P(tech does not outperform) = P(tech does not outperform and economy does not expand) + P(tech does not outperform and economy does expand) = 0.36 + 0.18 = 0.54.

P(economy does not expand | tech does not outperform) = P(economy does not expand and tech does not outperform) / P(tech does not outperform) = 0.36 / 0.54 = 0.67.

(Module 4.1, LOS 4.c)

## Question #4 of 15

Question ID: 1572783

The probability of A is 0.4. The probability of $A^C$ is 0.6. The probability of (B | A) is 0.5, and the probability of (B | $A^C$) is 0.2. Using Bayes' formula, what is the probability of (A | B)?

A) 0.375.
B) 0.625.
C) 0.125.

## Explanation

Using the total probability rule, we can compute the


P(B): P(B) = [P(B \mid A) \times P(A)] + [P(B \mid A^C) \times P(A^C)]

P(B) = [0.5 \times 0.4] + [0.2 \times 0.6] = 0.32


Using Bayes' formula, we can solve for


P(A \mid B): P(A \mid B) = [P(B \mid A) \div P(B)] \times P(A) = [0.5 \div 0.32] \times 0.4 = 0.625


(Module 4.1, LOS 4.c)

## Question #5 of 15

Question ID: 1572774

An investor is considering purchasing ACQ. There is a $30\%$ probability that ACQ will be acquired in the next two months. If ACQ is acquired, there is a $40\%$ probability of earning a $30\%$ return on the investment and a $60\%$ probability of earning $25\%$. If ACQ is not acquired, the expected return is $12\%$. What is the expected return on this investment?

A) $18.3\%$.
B) $16.5\%$.
C) 12.3%.

Explanation


E(r) = (0.70 \times 0.12) + (0.30 \times 0.40 \times 0.30) + (0.30 \times 0.60 \times 0.25) = 0.165.


(Module 4.1, LOS 4.a)

# Question #6 of 15

Question ID: 1572777

A two-sided but very thick coin is expected to land on its edge twice out of every 100 flips. And the probability of face up (heads) and the probability of face down (tails) are equal. When the coin is flipped, the prize is $1 for heads, $2 for tails, and $50 when the coin lands on its edge. What is the expected value of the prize on a single coin toss?

A) $2.47.
B) $1.50.
C) $17.67.

# Explanation

We need to calculate of probability weighted average payoff.

Since the probability of the coin landing on its edge is 0.02, the probability of each of the other two events is 0.49. The expected payoff is: $(0.02 \times \$50) + (0.49 \times \$1) + (0.49 \times \$2) = \$2.47$.

| Outcome | Probability | Payoff | Probability × Payoff |
| --- | --- | --- | --- |
| Edge | 2 / 100 = 2% | $50 | 2% × $50 |
| Heads | 49% | $1 | 49% × $1 |
| Tails | 49% | $2 | 49% × $2 |
| Expected Payoff = ∑ Probability × Payoff | | | $2.47 |

(Module 4.1, LOS 4.a)

Question #7 of 15

Question ID: 1572787
A parking lot has 100 red and blue cars in it.

- 40% of the cars are red.
- 70% of the red cars have radios.
- 80% of the blue cars have radios.

What is the probability that the car is red given that it has a radio?

A) 37%.
B) 28%.
C) 47%.

## Explanation

Given a set of prior probabilities for an event of interest, Bayes' formula is used to update the probability of the event, in this case that the car we already know has a radio is red. Bayes' formula says to divide the Probability of New Information given Event by the Unconditional Probability of New Information and multiply that result by the Prior Probability of the Event. In this case, $P(\text{red car has a radio}) = 0.70$ is divided by 0.76 (which is the Unconditional Probability of a car having a radio (40% are red of which 70% have radios) plus (60% are blue of which 80% have radios) or $((0.40) \times (0.70)) + ((0.60) \times (0.80)) = 0.76$.) This result is then multiplied by the Prior Probability of a car being red, 0.40. The result is $(0.70 / 0.76) \times (0.40) = 0.37$ or 37%.

(Module 4.1, LOS 4.c)

## Question #8 of 15

Question ID: 1572786

An analyst expects that 20% of all publicly traded companies will experience a decline in earnings next year. The analyst has developed a ratio to help forecast this decline. If the company has a decline in earnings, there is a 90% probability that this ratio will be negative. If the company does not have a decline in earnings, there is only a 10% probability that the ratio will be negative. The analyst randomly selects a company with a negative ratio. Based on Bayes' theorem, the updated probability that the company will experience a decline is:

A) 18%.
B) 26%.
C) 69%.

## Explanation
Given a set of prior probabilities for an event of interest, Bayes' formula is used to update the probability of the event, in this case that the company we have already selected will experience a decline in earnings next year. Bayes' formula says to divide the Probability of New Information given Event by the Unconditional Probability of New Information and multiply that result by the Prior Probability of the Event. In this case, P(company having a decline in earnings next year) = 0.20 is divided by 0.26 (which is the Unconditional Probability that a company having an earnings decline will have a negative ratio (90% have negative ratios of the 20% which have earnings declines) plus (10% have negative ratios of the 80% which do not have earnings declines) or $((0.90) \times (0.20)) + ((0.10) \times (0.80)) = 0.26$. This result is then multiplied by the Prior Probability of the ratio being negative, 0.90. The result is $(0.20 / 0.26) \times (0.90) = 0.69$ or $69\%$.

(Module 4.1, LOS 4.c)

## Question #9 of 15

Question ID: 1572784

Bonds rated B have a $25\%$ chance of default in five years. Bonds rated CCC have a $40\%$ chance of default in five years. A portfolio consists of $30\%$ B and $70\%$ CCC-rated bonds. If a randomly selected bond defaults in a five-year period, what is the probability that it was a B-rated bond?

A) 0.211.
B) 0.250.
C) 0.625.

## Explanation

According to Bayes' formula: $P(B \mid \text{default}) = P(\text{default and B}) / P(\text{default})P(\text{default and B}) = P(\text{default} \mid B) \times P(B) = 0.250 \times 0.300 = 0.075P(\text{default and CCC}) = P(\text{default} \mid \text{CCC}) \times P(\text{CCC}) = 0.400 \times 0.700 = 0.280P(\text{default}) = P(\text{default and B}) + P(\text{default and CCC}) = 0.355P(B \mid \text{default}) = P(\text{default and B}) / P(\text{default}) = 0.075 / 0.355 = 0.211$

(Module 4.1, LOS 4.c)

Question #10 of 15

Question ID: 1572775
There is a 40% probability that an investment will earn 10%, a 40% probability that the investment will earn 12.5%, and a 20% probability that the investment will earn 30%. What are the mean expected return and the standard deviation of expected returns, respectively?

A) 17.5%; 5.75%
B) 15.0%; 5.75%
C) 15.0%; 7.58%

## Explanation

Mean = (0.4)(10) + (0.4)(12.5) + (0.2)(30) = 15%

Var = (0.4)(10 - 15)² + (0.4)(12.5 - 15)² + (0.2)(30 - 15)² = 57.5

Standard deviation = √57.5 = 7.58

(Module 4.1, LOS 4.a)

## Question #11 of 15

Question ID: 1572773

Tully Advisers, Inc., has determined four possible economic scenarios and has projected the portfolio returns for two portfolios for their client under each scenario. Tully's economist has estimated the probability of each scenario as shown in the table below. Given this information, what is the expected return on Portfolio A?

| Scenario | Probability | Return on Portfolio A | Return on Portfolio B |
| --- | --- | --- | --- |
| A | 15% | 17% | 19% |
| B | 20% | 14% | 18% |
| C | 25% | 12% | 10% |
| D | 40% | 8% | 9% |

A) 12.55%
B) 12.75%
C) 11.55%

## Explanation
The expected return on Portfolio A is a probability-weighted average of 17%, 14%, 12%, and 8%.

Expected return = (0.15)(0.17) + (0.20)(0.14) + (0.25)(0.12) + (0.40)(0.08) = 0.1155 or 11.55%.

| Scenario | Probability | Return on Portfolio A | Portfolio × Weight |
| --- | --- | --- | --- |
| A | 15% | 17% | 15 × 17% |
| B | 20% | 14% | 20% × 14% |
| C | 25% | 12% | 25% × 12% |
| D | 40% | 8% | 40% × 8% |
| Probability Weighted Average Return
∑ Probability × Weight | | | 11.55% |

(Module 4.1, LOS 4.a)

## Question #12 of 15

Question ID: 1572781

Tina O'Fahey, CFA, believes a stock's price in the next quarter depends on two factors: the direction of the overall market and whether the company's next earnings report is good or poor. The possible outcomes and some probabilities are illustrated in the tree diagram shown below:

![img-1.jpeg](img-1.jpeg)

Based on this tree diagram, the expected value of the stock if the market decreases is closest to:

A) $26.00.
B) $62.50.
C) $57.00.

## Explanation

The expected value if the overall market decreases is 0.4($60) + (1 - 0.4)($55) = $57.

(Module 4.1, LOS 4.b)
Question #13 of 15

Question ID: 1572785

John purchased 60% of the stocks in a portfolio, while Andrew purchased the other 40%. Half of John's stock-picks are considered good, while a fourth of Andrew's are considered to be good. If a randomly chosen stock is a good one, what is the probability John selected it?

A) 0.40. ☐
B) 0.30. ☐
C) 0.75. ☐

## Explanation

Using the information of the stock being good, the probability is updated to a conditional probability:

 P(\text{John} \mid \text{good}) = P(\text{good and John}) / P(\text{good}) P(\text{good and John}) = P(\text{good} \mid \text{John}) \times P(\text{John}) = 0.5 \times 0.6 = 0.3 P(\text{good and Andrew}) = 0.25 \times 0.40 = 0.10 P(\text{good}) = P(\text{good and John}) + P(\text{good and Andrew}) = 0.40 P(\text{John} \mid \text{good}) = P(\text{good and John}) / P(\text{good}) = 0.3 / 0.4 = 0.75 

(Module 4.1, LOS 4.c)

Question #14 of 15

Question ID: 1572779

A conditional expectation involves:

A) determining the expected joint probability. ☐
B) calculating the conditional variance. ☐
C) refining a forecast because of the occurrence of some other event. ☐

## Explanation

Conditional expected values are contingent upon the occurrence of some other event. The expectation changes as new information is revealed.

(Module 4.1, LOS 4.b)
Question #15 of 15

Question ID: 1572778

Use the following data to calculate the standard deviation of the return:

- 50% chance of a 12% return
- 30% chance of a 10% return
- 20% chance of a 15% return

A) 1.7%.
B) 2.5%.
C) 3.0%.

☑

☐

☐

# Explanation

The standard deviation is the positive square root of the variance. The variance is the expected value of the squared deviations around the expected value, weighted by the probability of each observation. The expected value is: $(0.5) \times (0.12) + (0.3) \times (0.1) + (0.2) \times (0.15) = 0.12$. The variance is: $(0.5) \times (0.12 - 0.12)^2 + (0.3) \times (0.1 - 0.12)^2 + (0.2) \times (0.15 - 0.12)^2 = 0.0003$. The standard deviation is the square root of $0.0003 = 0.017$ or $1.7\%$.

(Module 4.1, LOS 4.a)
