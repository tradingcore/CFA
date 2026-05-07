---
title: "Reading 6 Simulation Methods - Answers"
source_pdf: "Reading 6 Simulation Methods - Answers.pdf"
converter: "mistral-ocr-latest"
date_converted: "2026-05-07T00:26:09Z"
pages: 6
category: "level-1/qbank"
sanitized: true
reviewed: false
---
# Question #1 of 12

Question ID: 1572830

Which of the following statements is most accurate regarding the dataset and samples used in bootstrap resampling?

A) A partial dataset is used, and the samples are different sizes.
B) The full dataset is used, and the samples are all the same size.
C) A partial dataset is used, and the samples are all the same size.

# Explanation

With bootstrap resampling, the samples pulled from the full dataset are all the same size. Partial datasets are not used.

(Module 6.1, LOS 6.c)

# Question #2 of 12

Question ID: 1572825

Bill Phillips is developing a Monte Carlo simulation to value a complex and thinly traded security. Phillips wants to model one input variable to have negative skewness and a second input variable to have positive excess kurtosis. In a Monte Carlo simulation, Phillips can appropriately use:

A) neither of these variables.
B) both of these variables.
C) only one of these variables.

# Explanation

One of the advantages of Monte Carlo simulation is that an analyst can specify any distribution for inputs.

(Module 6.1, LOS 6.b)

# Question #3 of 12

Question ID: 1572827

In bootstrap resampling, a single observation from a full dataset:
A) may appear in multiple samples. ☐
B) may appear either in exactly one sample or in no samples. ☐
C) must appear in one and only one sample. ☐

## Explanation

Bootstrap resampling involves drawing repeated samples of a given size from a full dataset, replacing the sampled observations each time so that they might be redrawn in another sample.

(Module 6.1, LOS 6.c)

---

## Question #4 of 12

Question ID: 1572823

Which of the following statements describes a limitation of Monte Carlo simulation?

A) Outcomes of a simulation can only be as accurate as the inputs to the model. ☑
B) Simulations do not consider possible input values that lie outside historical experience. ☐
C) Variables are assumed to be normally distributed but may actually have non-normal distributions. ☐

## Explanation

Monte Carlo simulations can be set up with inputs that have any distribution and any desired range of possible values. However, a limitation of the technique is that its output can only be as accurate as the assumptions an analyst makes about the range and distribution of the inputs.

(Module 6.1, LOS 6.b)

---

## Question #5 of 12

Question ID: 1572821

Which of the following statements regarding the distribution of returns used for asset pricing models is most accurate?

A) Lognormal distribution returns are used because this will allow for negative returns on the assets. ☐
B) Normal distribution returns are used for asset pricing models because they will only allow the asset price to fall to zero.
C) Lognormal distribution returns are used for asset pricing models because they will not result in an asset return of less than -100%.

## Explanation

Lognormal distribution returns are used for asset pricing models because this will not result in asset returns of less than 100% because the lowest the asset price can decrease to is zero which is the lowest value on the lognormal distribution. The normal distribution allows for asset prices less than zero which could result in a return of less than -100% which is impossible.

(Module 6.1, LOS 6.a)

## Question #6 of 12

Question ID: 1572819

If random variable $Y$ follows a lognormal distribution then the natural log of $Y$ must be:

A) denoted as $e^X$.
B) normally distributed.
C) lognormally distributed.

## Explanation

For any random variable that is lognormally distributed its natural logarithm (ln) will be normally distributed.

(Module 6.1, LOS 6.a)

## Question #7 of 12

Question ID: 1572826

One of the major limitations of Monte Carlo simulation is that it:

A) cannot provide the insight that analytic methods can.
B) does not lend itself to performing "what if" scenarios.
C) requires that variables be modeled using the normal distribution.

## Explanation
The major limitations of Monte Carlo simulation are that it is fairly complex and will provide answers that are no better than the assumptions used and that it cannot provide the insights that analytic methods can. Monte Carlo simulation is useful for performing "what if" scenarios. One of the first steps in Monte Carlo simulation is to specify the probably distribution along with the distribution parameters. The distribution specified does not have to be normal. (Module 6.1, LOS 6.b)

## Question #8 of 12

Question ID: 1572822

A lognormal distribution is least likely to be:

A) bounded below by zero. ☐
B) used to model stock prices. ☐
C) negatively skewed. ☐

## Explanation

A lognormal distribution is positively skewed and is bounded below by zero.

If stock returns are continuously compounded, then prices follow a lognormal distribution under certain conditions.

(Module 6.1, LOS 6.a)

## Question #9 of 12

Question ID: 1572828

When resampling is done, the subsamples that are repeatedly drawn from the original observed samples will:

A) progressively get larger. ☐
B) progressively get smaller. ☐
C) remain the same size. ☐

## Explanation

With resampling, the starting point is the original sample, and subsamples are repeatedly drawn from it. Each subsample will have the same number of observations.

(Module 6.1, LOS 6.c)
Question #10 of 12

Question ID: 1572829

The goal of resampling and the use of subsamples is to estimate parameters for the:

A) various subsamples.
B) overall population.
C) original sample.

## Explanation

Samples are often used in a simulation to estimate parameters for a population. Resampling is just taking the original observed sample and repeatedly drawing subsamples to estimate population parameters, such as mean and variance.

(Module 6.1, LOS 6.c)

Question #11 of 12

Question ID: 1572820

If a random variable $x$ is lognormally distributed then $\ln x$ is:

A) abnormally distributed.
B) defined as $e^x$.
C) normally distributed.

## Explanation

For any random variable that is lognormally distributed, its natural logarithm (ln) will be normally distributed.

(Module 6.1, LOS 6.a)

Question #12 of 12

Question ID: 1572824

Monte Carlo simulation is necessary to:

A) reduce sampling error.
B) compute continuously compounded returns.
C) approximate solutions to complex problems.

## Explanation
This is the purpose of this type of simulation. The point is to construct distributions using complex combinations of hypothesized parameters.

(Module 6.1, LOS 6.b)
