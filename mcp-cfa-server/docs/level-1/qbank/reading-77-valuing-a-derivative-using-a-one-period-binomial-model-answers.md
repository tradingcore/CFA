---
title: "Reading 77 Valuing a Derivative Using a One-Period Binomial Model - Answers"
source_pdf: "Reading 77 Valuing a Derivative Using a One-Period Binomial Model - Answers.pdf"
converter: "mistral-ocr-latest"
date_converted: "2026-05-07T00:13:29Z"
pages: 5
category: "level-1/qbank"
sanitized: true
reviewed: false
---
Question #1 of 9

Question ID: 1574514

In order to value an option with a one-period binomial model, three things an analyst would need to know are:

A) the risk-adjusted discount rate, the volatility of the price of the underlying asset, and option exercise price.
B) the risk-free rate, the volatility of the price of the underlying, and the current asset price.
C) the probability of an up-move, the option exercise price, and the current asset price.

## Explanation

The risk-free rate, the volatility of the price of the underlying, and the current asset price are three of the required variables needed to value an option with a one-period binomial model. The risk-adjusted rate of return and (actual) probability of an up-move are not required.

(Module 77.1, LOS 77.a)

Question #2 of 9

Question ID: 1577434

If a European put option is trading at a higher price than that implied from the binomial model, investors can earn a return in excess of the risk-free rate by:

A) buying the underlying, selling the call, and investing at the risk-free rate.
B) selling the underlying, buying the call, and investing at the risk-free rate.
C) buying the underlying, buying the call, and borrowing at the risk-free rate.

## Explanation
Using put-call parity and then rearranging to isolate the put:


S _ {0} + p _ {0} = c _ {0} + X (1 + r) ^ {- T}

p _ {0} = c _ {0} - S _ {0} + X (1 + r) ^ {- T}


The put is overpriced, therefore it should be sold (left side of rearranged equation). Therefore, the components of the right side of the equation should be transacted: buy a call, sell the underlying, and invest at the risk-free rate.

(Module 77.1, LOS 77.b)

---

## Question #3 of 9

Question ID: 1574515

We can use the risk-free rate to value an option with a one-period binomial model because:

A) combining options with the underlying asset in a specific ratio will produce a risk-free future payment. ☑

B) combining put and call options in specific ratio can produce a risk-free future payment. ☐

C) options investors are risk-neutral, on average. ☐

### Explanation

A portfolio of an option position and a position in the underlying asset can be constructed so that the portfolio value at option expiration is certain, the same for an up-move and for a down-move.

(Module 77.1, LOS 77.a)

---

## Question #4 of 9

Question ID: 1574517

Consider a stock that will have a value of either 22 or 14 one year from now. If the risk-free rate is 5%, what is the ratio of shares to short call options with an exercise price of 18 for a portfolio that will have the same value at expiration regardless of the stock price at the end of the year?

A) 0.48. ☐

B) 0.53. ☐

C) 0.50. ☑

### Explanation
With a stock price of 22 at expiration, the short call payoff is -4.

With a stock price of 14 at expiration, the call payoff is zero.

The appropriate hedge ratio is (4 - 0) / (22 - 14) = 0.5.

Portfolio value: 0.5(22) - 4 = 0.5(14) = 7

A portfolio of 0.5 shares of stock to 1 short call option will produce the same portfolio value whether the stock price at expiration is 22 or 14.

(Module 77.1, LOS 77.a)

## Question #5 of 9

Question ID: 1574516

One method of valuing a call option with a one-period binomial model involves:

- using the probabilities of an up-move and a down-move to get the expected value of the payment at expiration. ☐
- discounting the average call value at expiration by the risk-free rate. ☐
- finding a combination of the call option and the underlying that will have the same value regardless of the price of the underlying at expiration. ☑

## Explanation

A portfolio combining the call option with the underlying asset can be constructed that will have the same value at option expiration whether there is an up-move or a down move in the asset price. The present value of this portfolio is the discounted present value of the certain future payment, which can then be used to value the option. An option valuation model based on risk neutrality uses risk-neutral pseudo-probabilities of an up-move and a down-move, not actual probabilities. The average call value is not a certain future payment.

(Module 77.1, LOS 77.a)

## Question #6 of 9

Question ID: 1577435

An option's value is affected by:

- A) expected probabilities of underlying price increases or decreases only. ☑
- B) actual probabilities of underlying price increases or decreases only. ☐
- both actual and expected probabilities of underlying price increases or decreases. ☐
# Explanation

An option's value is not affected by the actual (real-world) probabilities of underlying price increases or decreases, but is only affected by the expected probabilities.

(Module 77.1, LOS 77.b)

---

# Question #7 of 9

Question ID: 1577431

Which of the following statements best describes the effect on the no-arbitrage price of a call option on Drinsky Inc. (Drinsky) shares? A decrease in the risk-free rate will:

A) increase Drinsky's call option price.
B) have no effect on Drinsky's call option price.
C) decrease Drinsky's call option price.

# Explanation

Falling interest rates will decrease the value of a call option. Decreasing the risk-free rate will increase the risk neutral probability $(\pi)$ of a price decrease and decrease the present value of the expected option payoff. Since the value of a call option is positively related to the price of the underlying asset, an increased probability of a downward price move will reduce the expected payoff from the call. As a result, both of those effects will reduce the call option value as the return on risk-free investments decreases.

(Module 77.1, LOS 77.b)

---

# Question #8 of 9

Question ID: 1577433

A stock's price is currently $30 and at the end of three months when its options expire, the stock price is expected to either go up or down by 10%. What is the value of a call option with a strike price of $31?

A) $0.70.
B) $1.30.
C) $1.00.

# Explanation
The risk neutral probability () of an upward price move = (1 + r - Rd) / (Ru - Rd) = (1 + 0.03 - 0.90) / (1.10 - 0.90) = 0.65.

Therefore the $\pi$ of a downward price move = 1 - 0.65 = 0.35.


[0.65 \times \text{Max}(0, \$33 - \$31)] + [0.35 \times \text{Max}(0, \$27 - \$31)] = \$1.30


(Module 77.1, LOS 77.b)

---

**Question #9 of 9**

Question ID: 1577432

Which of the following statements regarding risk-neutrality is most accurate?

A) Risk-neutral pricing requires using expected return to price an option. ☑

B) Risk-neutral probabilities are determined by investor views on risk and the risk-free rate. ☑

C) Risk-neutral pricing can be applied to any model that uses future underlying asset price movements. ☑

**Explanation**

Risk-neutral pricing requires expected volatility (and not expected return) to price an option.

Risk-neutral probabilities are determined using the risk-free rate and assumed "up gross returns" and "down gross returns" (not investor views on risk).

(Module 77.1, LOS 77.b)
