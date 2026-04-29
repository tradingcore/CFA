export type CFALevel = "I" | "II" | "III";

export interface LearningModule {
  id: string;
  name: string;
  los: string[];
}

export interface CFATopic {
  id: string;
  name: string;
  shortName: string;
  weightRange: string;
  color: string;
  modules: LearningModule[];
}

// ---------------------------------------------------------------------------
// CFA Level I – 10 topics, 93 learning modules (2026 curriculum, valid 2027)
// ---------------------------------------------------------------------------

const levelI: CFATopic[] = [
  {
    id: "quant",
    name: "Quantitative Methods",
    shortName: "Quant",
    weightRange: "6-9%",
    color: "#3b82f6",
    modules: [
      {
        id: "l1-qm-01",
        name: "Rates and Returns",
        los: [
          "interpret interest rates as required rates of return, discount rates, or opportunity costs and explain an interest rate as the sum of a real risk-free rate and premiums that compensate investors for bearing distinct types of risk",
          "calculate and interpret different approaches to return measurement over time and describe their appropriate uses",
          "compare the money-weighted and time-weighted rates of return and evaluate the performance of portfolios based on these measures",
          "calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses",
          "calculate and interpret major return measures and describe their appropriate uses",
        ],
      },
      {
        id: "l1-qm-02",
        name: "Time Value of Money in Finance",
        los: [
          "calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows",
          "calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows",
          "explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values",
        ],
      },
      {
        id: "l1-qm-03",
        name: "Statistical Measures of Asset Returns",
        los: [
          "calculate, interpret, and evaluate measures of central tendency and location to address an investment problem",
          "calculate, interpret, and evaluate measures of dispersion to address an investment problem",
          "interpret and evaluate measures of skewness and kurtosis to address an investment problem",
          "interpret correlation between two variables to address an investment problem",
        ],
      },
      {
        id: "l1-qm-04",
        name: "Probability Trees and Conditional Expectations",
        los: [
          "calculate expected values, variances, and standard deviations and demonstrate their application to investment problems",
          "formulate an investment problem as a probability tree and explain the use of conditional expectations in investment application",
          "calculate and interpret an updated probability in an investment setting using Bayes' formula",
        ],
      },
      {
        id: "l1-qm-05",
        name: "Portfolio Mathematics",
        los: [
          "calculate and interpret the expected value, variance, standard deviation, covariances, and correlations of portfolio returns",
          "calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns",
          "define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy's safety-first criterion",
        ],
      },
      {
        id: "l1-qm-06",
        name: "Simulation Methods",
        los: [
          "explain the relationship between normal and lognormal distributions and why the lognormal distribution is used to model asset prices when using continuously compounded asset returns",
          "describe Monte Carlo simulation and explain how it can be used in investment applications",
          "describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications",
        ],
      },
      {
        id: "l1-qm-07",
        name: "Estimation and Inference",
        los: [
          "compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem",
          "explain the central limit theorem and its importance for the distribution and standard error of the sample mean",
          "describe the use of resampling (bootstrap, jackknife) to estimate the sampling distribution of a statistic",
        ],
      },
      {
        id: "l1-qm-08",
        name: "Hypothesis Testing",
        los: [
          "explain hypothesis testing and its components, including statistical significance, Type I and Type II errors, and the power of a test",
          "construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and power of the test given a significance level",
          "compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test",
        ],
      },
      {
        id: "l1-qm-09",
        name: "Parametric and Non-Parametric Tests of Independence",
        los: [
          "explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance",
          "explain tests of independence based on contingency table data",
        ],
      },
      {
        id: "l1-qm-10",
        name: "Simple Linear Regression",
        los: [
          "describe a simple linear regression model, how the least squares criterion is used to estimate regression coefficients, and the interpretation of these coefficients",
          "explain the assumptions underlying the simple linear regression model, and describe how residuals and residual plots indicate if these assumptions may have been violated",
          "calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression",
          "describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression",
          "calculate and interpret the predicted value for the dependent variable, and a prediction interval for it, given an estimated linear regression model and a value for the independent variable",
          "describe different functional forms of simple linear regressions",
        ],
      },
      {
        id: "l1-qm-11",
        name: "Introduction to Big Data Techniques",
        los: [
          "describe aspects of \"fintech\" that are directly relevant for the gathering and analyzing of financial data",
          "describe Big Data, artificial intelligence, and machine learning",
          "describe applications of Big Data and Data Science to investment management",
        ],
      },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    shortName: "Econ",
    weightRange: "6-9%",
    color: "#f59e0b",
    modules: [
      {
        id: "l1-ec-01",
        name: "The Firm and Market Structures",
        los: [
          "determine and interpret breakeven and shutdown points of production, as well as how economies and diseconomies of scale affect costs under perfect and imperfect competition",
          "describe characteristics of perfect competition, monopolistic competition, oligopoly, and pure monopoly",
          "explain supply and demand relationships under monopolistic competition, including the optimal price and output for firms as well as pricing strategy",
          "explain supply and demand relationships under oligopoly, including the optimal price and output for firms as well as pricing strategy",
          "identify the type of market structure within which a firm operates and describe the use and limitations of concentration measures",
        ],
      },
      {
        id: "l1-ec-02",
        name: "Understanding Business Cycles",
        los: [
          "describe the business cycle and its phases",
          "describe credit cycles",
          "describe how resource use, consumer and business activity, housing sector activity, and external trade sector activity vary over the business cycle and describe their measurement using economic indicators",
        ],
      },
      {
        id: "l1-ec-03",
        name: "Fiscal Policy",
        los: [
          "compare monetary and fiscal policy",
          "describe roles and objectives of fiscal policy as well as arguments as to whether the size of a national debt relative to GDP matters",
          "describe tools of fiscal policy, including their advantages and disadvantages",
          "explain the implementation of fiscal policy and difficulties of implementation as well as whether a fiscal policy is expansionary or contractionary",
        ],
      },
      {
        id: "l1-ec-04",
        name: "Monetary Policy",
        los: [
          "describe the roles and objectives of central banks",
          "describe tools used to implement monetary policy tools and the monetary transmission mechanism, and explain the relationships between monetary policy and economic growth, inflation, interest, and exchange rates",
          "describe qualities of effective central banks; contrast their use of inflation, interest rate, and exchange rate targeting in expansionary or contractionary monetary policy; and describe the limitations of monetary policy",
          "explain the interaction of monetary and fiscal policy",
        ],
      },
      {
        id: "l1-ec-05",
        name: "Introduction to Geopolitics",
        los: [
          "describe geopolitics from a cooperation versus competition perspective",
          "describe geopolitics and its relationship with globalization",
          "describe functions and objectives of the international organizations that facilitate trade",
          "describe geopolitical risk",
          "describe tools of geopolitics and their impact on regions and economies",
          "describe the impact of geopolitical risk on investments",
        ],
      },
      {
        id: "l1-ec-06",
        name: "International Trade",
        los: [
          "describe the benefits and costs of international trade",
          "compare types of trade restrictions, such as tariffs, quotas, and export subsidies, and their economic implications",
          "explain motivations for and advantages of trading blocs, common markets, and economic unions",
        ],
      },
      {
        id: "l1-ec-07",
        name: "Capital Flows and the FX Market",
        los: [
          "describe the foreign exchange market, including its functions and participants, distinguish between nominal and real exchange rates, and calculate and interpret the percentage change in a currency relative to another currency",
          "describe exchange rate regimes and explain the effects of exchange rates on countries' international trade and capital flows",
          "describe common objectives of capital restrictions imposed by governments",
        ],
      },
      {
        id: "l1-ec-08",
        name: "Exchange Rate Calculations",
        los: [
          "calculate and interpret currency cross-rates",
          "explain the arbitrage relationship between spot and forward exchange rates and interest rates, calculate a forward rate using points or in percentage terms, and interpret a forward discount or premium",
        ],
      },
    ],
  },
  {
    id: "corporate",
    name: "Corporate Issuers",
    shortName: "Corp",
    weightRange: "6-9%",
    color: "#8b5cf6",
    modules: [
      {
        id: "l1-ci-01",
        name: "Organizational Forms, Corporate Issuer Features, and Ownership",
        los: [
          "compare the organizational forms of businesses",
          "describe key features of corporate issuers",
          "compare publicly and privately owned corporate issuers",
        ],
      },
      {
        id: "l1-ci-02",
        name: "Investors and Other Stakeholders",
        los: [
          "compare the financial claims and motivations of lenders and shareholders",
          "describe a company's stakeholder groups and compare their interests",
          "describe environmental, social, and governance factors of corporate issuers considered by investors",
        ],
      },
      {
        id: "l1-ci-03",
        name: "Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits",
        los: [
          "describe the principal-agent relationship and conflicts that may arise between stakeholder groups",
          "describe corporate governance and mechanisms to manage stakeholder relationships and mitigate associated risks",
          "describe potential risks of poor corporate governance and stakeholder management and benefits of effective corporate governance and stakeholder management",
        ],
      },
      {
        id: "l1-ci-04",
        name: "Working Capital and Liquidity",
        los: [
          "explain the cash conversion cycle and compare issuers' cash conversion cycles",
          "explain liquidity and compare issuers' liquidity levels",
          "describe issuers' objectives and compare methods for managing working capital and liquidity",
        ],
      },
      {
        id: "l1-ci-05",
        name: "Capital Investments and Capital Allocation",
        los: [
          "describe types of capital investments",
          "describe the capital allocation process, calculate net present value (NPV), internal rate of return (IRR), and return on invested capital (ROIC), and contrast their use in capital allocation",
          "describe principles of capital allocation and common capital allocation pitfalls",
          "describe types of real options relevant to capital investments",
        ],
      },
      {
        id: "l1-ci-06",
        name: "Capital Structure",
        los: [
          "calculate and interpret the weighted-average cost of capital for a company",
          "explain factors affecting capital structure and the weighted-average cost of capital",
          "explain the Modigliani–Miller propositions regarding capital structure",
          "describe optimal and target capital structures",
        ],
      },
      {
        id: "l1-ci-07",
        name: "Business Models",
        los: [
          "describe key features of business models",
          "describe various types of business models",
        ],
      },
    ],
  },
  {
    id: "fra",
    name: "Financial Statement Analysis",
    shortName: "FSA",
    weightRange: "11-14%",
    color: "#ef4444",
    modules: [
      {
        id: "l1-fs-01",
        name: "Introduction to Financial Statement Analysis",
        los: [
          "describe the steps in the financial statement analysis framework",
          "describe the roles of financial statement analysis",
          "describe the importance of regulatory filings, financial statement notes and supplementary information, management's commentary, and audit reports",
          "describe implications for financial analysis of alternative financial reporting systems and the importance of monitoring developments in financial reporting standards",
          "describe information sources that analysts use in financial statement analysis besides annual and interim financial reports",
        ],
      },
      {
        id: "l1-fs-02",
        name: "Analyzing Income Statements",
        los: [
          "describe general principles of revenue recognition, specific revenue recognition applications, and implications of revenue recognition choices for financial analysis",
          "describe general principles of expense recognition, specific expense recognition applications, implications of expense recognition choices for financial analysis and contrast costs that are capitalized versus those that are expensed in the period in which they are incurred",
          "describe the financial reporting treatment and analysis of non-recurring items (including discontinued operations, unusual or infrequent items) and changes in accounting policies",
          "describe how earnings per share is calculated and calculate and interpret a company's basic and diluted earnings per share",
          "evaluate a company's financial performance using common-size income statements and financial ratios based on the income statement",
        ],
      },
      {
        id: "l1-fs-03",
        name: "Analyzing Balance Sheets",
        los: [
          "explain the financial reporting and disclosures related to intangible assets",
          "explain the financial reporting and disclosures related to goodwill",
          "explain the financial reporting and disclosures related to financial instruments",
          "explain the financial reporting and disclosures related to non-current liabilities",
          "calculate and interpret common-size balance sheets and related financial ratios",
        ],
      },
      {
        id: "l1-fs-04",
        name: "Analyzing Statements of Cash Flows I",
        los: [
          "describe how the cash flow statement is linked to the income statement and the balance sheet",
          "describe the steps in the preparation of direct and indirect cash flow statements, including how cash flows can be computed using income statement and balance sheet data",
          "demonstrate the conversion of cash flows from the indirect to direct method",
          "contrast cash flow statements prepared under IFRS and US GAAP",
        ],
      },
      {
        id: "l1-fs-05",
        name: "Analyzing Statements of Cash Flows II",
        los: [
          "analyze and interpret both reported and common-size cash flow statements",
          "calculate and interpret free cash flow to the firm, free cash flow to equity, and performance and coverage cash flow ratios",
        ],
      },
      {
        id: "l1-fs-06",
        name: "Analysis of Inventories",
        los: [
          "describe the measurement of inventory at the lower of cost and net realisable value and its implications for financial statements and ratios",
          "calculate and explain how inflation and deflation of inventory costs affect the financial statements and ratios of companies that use different inventory valuation methods",
          "describe the presentation and disclosures relating to inventories",
        ],
      },
      {
        id: "l1-fs-07",
        name: "Analysis of Long-Term Assets",
        los: [
          "compare the financial reporting of the following types of intangible assets: purchased, internally developed, and acquired in a business combination",
          "explain and evaluate how impairment and derecognition of property, plant, and equipment and intangible assets affect the financial statements and ratios",
          "analyze and interpret financial statement disclosures regarding property, plant, and equipment and intangible assets",
        ],
      },
      {
        id: "l1-fs-08",
        name: "Topics in Long-Term Liabilities and Equity",
        los: [
          "explain the financial reporting of leases from the perspectives of lessors and lessees",
          "explain the financial reporting of defined contribution, defined benefit, and stock-based compensation plans",
          "describe the financial statement presentation of and disclosures relating to long-term liabilities and share-based compensation",
        ],
      },
      {
        id: "l1-fs-09",
        name: "Analysis of Income Taxes",
        los: [
          "contrast accounting profit, taxable income, taxes payable, and income tax expense and temporary versus permanent differences between accounting profit and taxable income",
          "explain how deferred tax liabilities and assets are created and the factors that determine how a company's deferred tax liabilities and assets should be treated for the purposes of financial analysis",
          "calculate, interpret, and contrast an issuer's effective tax rate, statutory tax rate, and cash tax rate",
          "analyze disclosures relating to deferred tax items and the effective tax rate reconciliation",
        ],
      },
      {
        id: "l1-fs-10",
        name: "Financial Reporting Quality",
        los: [
          "compare financial reporting quality with the quality of reported results",
          "describe a spectrum for assessing financial reporting quality",
          "explain the difference between conservative and aggressive accounting",
          "describe motivations that might cause management to issue financial reports that are not high quality",
          "describe mechanisms that discipline financial reporting quality and the potential limitations of those mechanisms",
          "describe presentation choices, including non-GAAP measures, that could be used to influence an analyst's opinion",
          "describe accounting methods that could be used to manage earnings, cash flow, and balance sheet items",
          "describe accounting warning signs and methods for detecting manipulation of information in financial reports",
        ],
      },
      {
        id: "l1-fs-11",
        name: "Financial Analysis Techniques",
        los: [
          "describe tools and techniques used in financial analysis, including their uses and limitations",
          "calculate and interpret activity, liquidity, solvency, and profitability ratios",
          "describe relationships among ratios and evaluate a company using ratio analysis",
          "demonstrate the application of DuPont analysis of return on equity and calculate and interpret effects of changes in its components",
          "describe the uses of industry-specific ratios used in financial analysis",
          "describe how ratio analysis and other techniques can be used to model and forecast earnings",
        ],
      },
      {
        id: "l1-fs-12",
        name: "Introduction to Financial Statement Modeling",
        los: [
          "demonstrate the development of a sales-based pro forma company model",
          "explain how behavioral factors affect analyst forecasts and recommend remedial actions for analyst biases",
          "explain how the competitive position of a company based on a Porter's five forces analysis affects prices and costs",
          "explain how to forecast industry and company sales and costs when they are subject to price inflation or deflation",
          "explain considerations in the choice of an explicit forecast horizon",
        ],
      },
    ],
  },
  {
    id: "equity",
    name: "Equity Investments",
    shortName: "Equity",
    weightRange: "11-14%",
    color: "#06b6d4",
    modules: [
      {
        id: "l1-eq-01",
        name: "Market Organization and Structure",
        los: [
          "explain the main functions of the financial system",
          "describe classifications of assets and markets",
          "describe the major types of securities, currencies, contracts, commodities, and real assets that trade in organized markets",
          "describe types of financial intermediaries and services that they provide",
          "compare positions an investor can take in an asset",
          "calculate and interpret the leverage ratio, the rate of return on a margin transaction, and the security price at which the investor would receive a margin call",
          "compare execution, validity, and clearing instructions",
          "compare market orders with limit orders",
          "define primary and secondary markets and explain how secondary markets support primary markets",
          "describe how securities, contracts, and currencies are traded in quote-driven, order-driven, and brokered markets",
          "describe characteristics of a well-functioning financial system",
          "describe objectives of market regulation",
        ],
      },
      {
        id: "l1-eq-02",
        name: "Security Market Indexes",
        los: [
          "describe a security market index",
          "calculate and interpret the value, price return, and total return of an index",
          "describe the choices and issues in index construction and management",
          "compare the different weighting methods used in index construction",
          "calculate and analyze the value and return of an index given its weighting method",
          "describe rebalancing and reconstitution of an index",
          "describe uses of security market indexes",
          "describe types of equity indexes",
          "compare types of security market indexes",
          "describe types of fixed-income indexes",
          "describe indexes representing alternative investments",
        ],
      },
      {
        id: "l1-eq-03",
        name: "Market Efficiency",
        los: [
          "describe market efficiency and related concepts",
          "contrast market value and intrinsic value",
          "explain factors that affect a market's efficiency",
          "contrast weak-form, semi-strong-form, and strong-form market efficiency",
          "explain the implications of each form of market efficiency for fundamental analysis, technical analysis, and the choice between active and passive portfolio management",
          "describe market anomalies",
          "describe behavioral finance and its potential relevance to understanding market anomalies",
        ],
      },
      {
        id: "l1-eq-04",
        name: "Overview of Equity Securities",
        los: [
          "describe characteristics of types of equity securities",
          "describe differences in voting rights and other ownership characteristics among different equity classes",
          "compare and contrast public and private equity securities",
          "describe methods for investing in non-domestic equity securities",
          "compare the risk and return characteristics of different types of equity securities",
          "explain the role of equity securities in the financing of a company's assets",
          "contrast the market value and book value of equity securities",
          "compare a company's cost of equity, its (accounting) return on equity, and investors' required rates of return",
        ],
      },
      {
        id: "l1-eq-05",
        name: "Company Analysis: Past and Present",
        los: [
          "describe the elements that should be covered in a thorough company research report",
          "determine a company's business model",
          "evaluate a company's revenue and revenue drivers, including pricing power",
          "evaluate a company's operating profitability and working capital using key measures",
          "evaluate a company's capital investments and capital structure",
        ],
      },
      {
        id: "l1-eq-06",
        name: "Industry and Competitive Analysis",
        los: [
          "describe the purposes of, and steps involved in, industry and competitive analysis",
          "describe industry classification methods and compare methods by which companies can be grouped",
          "determine an industry's size, growth characteristics, profitability, and market share trends",
          "analyze an industry's structure and external influences using Porter's Five Forces and PESTLE frameworks",
          "evaluate the competitive strategy and position of a company",
        ],
      },
      {
        id: "l1-eq-07",
        name: "Company Analysis: Forecasting",
        los: [
          "explain principles and approaches to forecasting a company's financial results and position",
          "explain approaches to forecasting a company's revenues",
          "explain approaches to forecasting a company's operating expenses and working capital",
          "explain approaches to forecasting a company's capital investments and capital structure",
          "describe the use of scenario analysis in forecasting",
        ],
      },
      {
        id: "l1-eq-08",
        name: "Equity Valuation: Concepts and Basic Tools",
        los: [
          "evaluate whether a security is overvalued, fairly valued, or undervalued by the market",
          "describe major categories of equity valuation models",
          "describe regular cash dividends, extra dividends, stock dividends, stock splits, reverse stock splits, and share repurchases",
          "describe dividend payment chronology",
          "explain the rationale for using present value models to value equity and describe the dividend discount and free-cash-flow-to-equity models",
          "explain advantages and disadvantages of each category of valuation model",
          "calculate the intrinsic value of a non-callable, non-convertible preferred stock",
          "calculate and interpret the intrinsic value of an equity security based on the Gordon growth DDM or a two-stage DDM",
          "identify characteristics of companies for which the constant growth or a multistage DDM is appropriate",
          "explain the rationale for using price multiples to value equity",
          "calculate and interpret price to earnings, price to operating cash flow, price to sales, and price to book value",
          "describe enterprise value multiples and their use in estimating equity value",
          "describe asset-based valuation models and their use in estimating equity value",
        ],
      },
    ],
  },
  {
    id: "fi",
    name: "Fixed Income",
    shortName: "FI",
    weightRange: "11-14%",
    color: "#ec4899",
    modules: [
      {
        id: "l1-fi-01",
        name: "Fixed-Income Instrument Features",
        los: [
          "describe the features of a fixed-income security",
          "describe the contents of a bond indenture and contrast affirmative and negative covenants",
        ],
      },
      {
        id: "l1-fi-02",
        name: "Fixed-Income Cash Flows and Types",
        los: [
          "describe common cash flow structures of fixed-income instruments and contrast cash flow contingency provisions that benefit issuers and investors",
          "describe how legal, regulatory, and tax considerations affect the issuance and trading of fixed-income securities",
        ],
      },
      {
        id: "l1-fi-03",
        name: "Fixed-Income Issuance and Trading",
        los: [
          "describe fixed-income market segments and their issuer and investor participants",
          "describe types of fixed-income indexes",
          "compare primary and secondary fixed-income markets to equity markets",
        ],
      },
      {
        id: "l1-fi-04",
        name: "Fixed-Income Markets for Corporate Issuers",
        los: [
          "compare short-term funding alternatives available to corporations and financial institutions",
          "describe repurchase agreements (repos), their uses, and their benefits and risks",
          "contrast the long-term funding of investment-grade versus high-yield corporate issuers",
        ],
      },
      {
        id: "l1-fi-05",
        name: "Fixed-Income Markets for Government Issuers",
        los: [
          "describe funding choices by sovereign and non-sovereign governments, quasi-government entities, and supranational agencies",
          "contrast the issuance and trading of government and corporate fixed-income instruments",
        ],
      },
      {
        id: "l1-fi-06",
        name: "Fixed-Income Bond Valuation: Prices and Yields",
        los: [
          "calculate a bond's price given a yield-to-maturity on or between coupon dates",
          "identify the relationships among a bond's price, coupon rate, maturity, and yield-to-maturity",
          "describe matrix pricing",
        ],
      },
      {
        id: "l1-fi-07",
        name: "Yield and Yield Spread Measures for Fixed-Rate Bonds",
        los: [
          "calculate annual yield on a bond for varying compounding periods in a year",
          "compare, calculate, and interpret yield and yield spread measures for fixed-rate bonds",
        ],
      },
      {
        id: "l1-fi-08",
        name: "Yield and Yield Spread Measures for Floating-Rate Instruments",
        los: [
          "calculate and interpret yield spread measures for floating-rate instruments",
          "calculate and interpret yield measures for money market instruments",
        ],
      },
      {
        id: "l1-fi-09",
        name: "The Term Structure of Interest Rates",
        los: [
          "define spot rates and the spot curve, and calculate the price of a bond using spot rates",
          "define par and forward rates, and calculate par rates, forward rates from spot rates, spot rates from forward rates, and the price of a bond using forward rates",
          "compare the spot curve, par curve, and forward curve",
        ],
      },
      {
        id: "l1-fi-10",
        name: "Interest Rate Risk and Return",
        los: [
          "calculate and interpret the sources of return from investing in a fixed-rate bond",
          "describe the relationships among a bond's holding period return, its Macaulay duration, and the investment horizon",
          "define, calculate, and interpret Macaulay duration",
        ],
      },
      {
        id: "l1-fi-11",
        name: "Yield-Based Bond Duration Measures and Properties",
        los: [
          "define, calculate, and interpret modified duration, money duration, and the price value of a basis point (PVBP)",
          "explain how a bond's maturity, coupon, and yield level affect its interest rate risk",
        ],
      },
      {
        id: "l1-fi-12",
        name: "Yield-Based Bond Convexity and Portfolio Properties",
        los: [
          "calculate and interpret convexity and describe the convexity adjustment",
          "calculate the percentage price change of a bond for a specified change in yield, given the bond's duration and convexity",
          "calculate portfolio duration and convexity and explain the limitations of these measures",
        ],
      },
      {
        id: "l1-fi-13",
        name: "Curve-Based and Empirical Fixed-Income Risk Measures",
        los: [
          "explain why effective duration and effective convexity are the most appropriate measures of interest rate risk for bonds with embedded options",
          "calculate the percentage price change of a bond for a specified change in benchmark yield",
          "define key rate duration and describe its use to measure price sensitivity",
          "describe the difference between empirical duration and analytical duration",
        ],
      },
      {
        id: "l1-fi-14",
        name: "Credit Risk",
        los: [
          "describe credit risk and its components, probability of default and loss given default",
          "describe the uses of ratings from credit rating agencies and their limitations",
          "describe macroeconomic, market, and issuer-specific factors that influence the level and volatility of yield spreads",
        ],
      },
      {
        id: "l1-fi-15",
        name: "Credit Analysis for Government Issuers",
        los: [
          "explain special considerations when evaluating the credit of sovereign and non-sovereign government debt issuers and issues",
        ],
      },
      {
        id: "l1-fi-16",
        name: "Credit Analysis for Corporate Issuers",
        los: [
          "describe the qualitative and quantitative factors used to evaluate a corporate borrower's creditworthiness",
          "calculate and interpret financial ratios used in credit analysis",
          "describe the seniority rankings of debt, secured versus unsecured debt and the priority of claims in bankruptcy, and their impact on credit ratings",
        ],
      },
      {
        id: "l1-fi-17",
        name: "Fixed-Income Securitization",
        los: [
          "explain benefits of securitization for issuers, investors, economies, and financial markets",
          "describe securitization, including the parties and the roles they play",
        ],
      },
      {
        id: "l1-fi-18",
        name: "Asset-Backed Security (ABS) Instrument and Market Features",
        los: [
          "describe characteristics and risks of covered bonds and how they differ from other asset-backed securities",
          "describe typical credit enhancement structures used in securitizations",
          "describe types and characteristics of non-mortgage asset-backed securities",
          "describe collateralized debt obligations, including their cash flows and risks",
        ],
      },
      {
        id: "l1-fi-19",
        name: "Mortgage-Backed Security (MBS) Instrument and Market Features",
        los: [
          "define prepayment risk and describe time tranching structures in securitizations and their purpose",
          "describe fundamental features of residential mortgage loans that are securitized",
          "describe types and characteristics of residential mortgage-backed securities",
          "describe characteristics and risks of commercial mortgage-backed securities",
        ],
      },
    ],
  },
  {
    id: "derivatives",
    name: "Derivatives",
    shortName: "Deriv",
    weightRange: "5-8%",
    color: "#f97316",
    modules: [
      {
        id: "l1-dr-01",
        name: "Derivative Instrument and Derivative Market Features",
        los: [
          "define a derivative and describe basic features of a derivative instrument",
          "describe the basic features of derivative markets, and contrast over-the-counter and exchange-traded derivative markets",
        ],
      },
      {
        id: "l1-dr-02",
        name: "Forward Commitment and Contingent Claim Features and Instruments",
        los: [
          "define forward contracts, futures contracts, swaps, options (calls and puts), and credit derivatives and compare their basic characteristics",
          "determine the value at expiration and profit from a long or a short position in a call or put option",
          "contrast forward commitments with contingent claims",
        ],
      },
      {
        id: "l1-dr-03",
        name: "Derivative Benefits, Risks, and Issuer and Investor Uses",
        los: [
          "describe benefits and risks of derivative instruments",
          "compare the use of derivatives among issuers and investors",
        ],
      },
      {
        id: "l1-dr-04",
        name: "Arbitrage, Replication, and the Cost of Carry in Pricing Derivatives",
        los: [
          "explain how the concepts of arbitrage and replication are used in pricing derivatives",
          "explain the difference between the spot and expected future price of an underlying and the cost of carry associated with holding the underlying asset",
        ],
      },
      {
        id: "l1-dr-05",
        name: "Pricing and Valuation of Forward Contracts",
        los: [
          "explain how the value and price of a forward contract are determined at initiation, during the life of the contract, and at expiration",
          "explain how forward rates are determined for interest rate forward contracts and describe the uses of these forward rates",
        ],
      },
      {
        id: "l1-dr-06",
        name: "Pricing and Valuation of Futures Contracts",
        los: [
          "compare the value and price of forward and futures contracts",
          "explain why forward and futures prices differ",
        ],
      },
      {
        id: "l1-dr-07",
        name: "Pricing and Valuation of Interest Rates and Other Swaps",
        los: [
          "describe how swap contracts are similar to but different from a series of forward contracts",
          "contrast the value and price of swaps",
        ],
      },
      {
        id: "l1-dr-08",
        name: "Pricing and Valuation of Options",
        los: [
          "explain the exercise value, moneyness, and time value of an option",
          "contrast the use of arbitrage and replication concepts in pricing forward commitments and contingent claims",
          "identify the factors that determine the value of an option and describe how each factor affects the value of an option",
        ],
      },
      {
        id: "l1-dr-09",
        name: "Option Replication Using Put-Call Parity",
        los: [
          "explain put–call parity for European options",
          "explain put–call forward parity for European options",
        ],
      },
      {
        id: "l1-dr-10",
        name: "Valuing a Derivative Using a One-Period Binomial Model",
        los: [
          "explain how to value a derivative using a one-period binomial model",
          "describe the concept of risk neutrality in derivatives pricing",
        ],
      },
    ],
  },
  {
    id: "alts",
    name: "Alternative Investments",
    shortName: "Alts",
    weightRange: "5-8%",
    color: "#14b8a6",
    modules: [
      {
        id: "l1-ai-01",
        name: "Alternative Investment Features, Methods, and Structures",
        los: [
          "describe features and categories of alternative investments",
          "compare direct investment, co-investment, and fund investment methods for alternative investments",
          "describe investment ownership and compensation structures commonly used in alternative investments",
        ],
      },
      {
        id: "l1-ai-02",
        name: "Alternative Investment Performance and Returns",
        los: [
          "describe the performance appraisal of alternative investments",
          "calculate and interpret alternative investment returns both before and after fees",
        ],
      },
      {
        id: "l1-ai-03",
        name: "Investments in Private Capital: Equity and Debt",
        los: [
          "explain features of private equity and its investment characteristics",
          "explain features of private debt and its investment characteristics",
          "describe the diversification benefits that private capital can provide",
        ],
      },
      {
        id: "l1-ai-04",
        name: "Real Estate and Infrastructure",
        los: [
          "explain features and characteristics of real estate",
          "explain the investment characteristics of real estate investments",
          "explain features and characteristics of infrastructure",
          "explain the investment characteristics of infrastructure investments",
        ],
      },
      {
        id: "l1-ai-05",
        name: "Natural Resources",
        los: [
          "explain features of raw land, timberland, and farmland and their investment characteristics",
          "describe features of commodities and their investment characteristics",
          "analyze sources of risk, return, and diversification among natural resource investments",
        ],
      },
      {
        id: "l1-ai-06",
        name: "Hedge Funds",
        los: [
          "explain investment features of hedge funds and contrast them with other asset classes",
          "describe investment forms and vehicles used in hedge fund investments",
          "analyze sources of risk, return, and diversification among hedge fund investments",
        ],
      },
      {
        id: "l1-ai-07",
        name: "Introduction to Digital Assets",
        los: [
          "describe financial applications of distributed ledger technology",
          "explain investment features of digital assets and contrast them with other asset classes",
          "describe investment forms and vehicles used in digital asset investments",
          "analyze sources of risk, return, and diversification among digital asset investments",
        ],
      },
    ],
  },
  {
    id: "pm",
    name: "Portfolio Management",
    shortName: "PM",
    weightRange: "5-8%",
    color: "#6366f1",
    modules: [
      {
        id: "l1-pm-01",
        name: "Portfolio Risk and Return: Part I",
        los: [
          "describe characteristics of the major asset classes that investors consider in forming portfolios",
          "explain risk aversion and its implications for portfolio selection",
          "explain the selection of an optimal portfolio, given an investor's utility (or risk aversion) and the capital allocation line",
          "calculate and interpret the mean, variance, and covariance (or correlation) of asset returns based on historical data",
          "calculate and interpret portfolio standard deviation",
          "describe the effect on a portfolio's risk of investing in assets that are less than perfectly correlated",
          "describe and interpret the minimum-variance and efficient frontiers of risky assets and the global minimum-variance portfolio",
        ],
      },
      {
        id: "l1-pm-02",
        name: "Portfolio Risk and Return: Part II",
        los: [
          "describe the implications of combining a risk-free asset with a portfolio of risky assets",
          "explain the capital allocation line (CAL) and the capital market line (CML)",
          "explain systematic and nonsystematic risk, including why an investor should not expect to receive additional return for bearing nonsystematic risk",
          "explain return generating models (including the market model) and their uses",
          "calculate and interpret beta",
          "explain the capital asset pricing model (CAPM), including its assumptions, and the security market line (SML)",
          "calculate and interpret the expected return of an asset using the CAPM",
          "describe and demonstrate applications of the CAPM and the SML",
          "calculate and interpret the Sharpe ratio, Treynor ratio, M2, and Jensen's alpha",
        ],
      },
      {
        id: "l1-pm-03",
        name: "Portfolio Management: An Overview",
        los: [
          "describe the portfolio approach to investing",
          "describe the steps in the portfolio management process",
          "describe types of investors and distinctive characteristics and needs of each",
          "describe defined contribution and defined benefit pension plans",
          "describe aspects of the asset management industry",
          "describe mutual funds and compare them with other pooled investment products",
        ],
      },
      {
        id: "l1-pm-04",
        name: "Basics of Portfolio Planning and Construction",
        los: [
          "describe the reasons for a written investment policy statement (IPS)",
          "describe the major components of an IPS",
          "describe risk and return objectives and how they may be developed for a client",
          "explain the difference between the willingness and the ability (capacity) to take risk in analyzing an investor's financial risk tolerance",
          "describe the investment constraints of liquidity, time horizon, tax concerns, legal and regulatory factors, and unique circumstances",
          "explain the specification of asset classes in relation to asset allocation",
          "describe the principles of portfolio construction and the role of asset allocation in relation to the IPS",
          "describe how ESG considerations may be integrated into portfolio planning and construction",
        ],
      },
      {
        id: "l1-pm-05",
        name: "The Behavioral Biases of Individuals",
        los: [
          "compare and contrast cognitive errors and emotional biases",
          "discuss commonly recognized behavioral biases and their implications for financial decision making",
          "describe how behavioral biases of investors can lead to market characteristics that may not be explained by traditional finance",
        ],
      },
      {
        id: "l1-pm-06",
        name: "Introduction to Risk Management",
        los: [
          "define risk management",
          "describe features of a risk management framework",
          "define risk governance and describe elements of effective risk governance",
          "explain how risk tolerance affects risk management",
          "describe risk budgeting and its role in risk governance",
          "identify financial and non-financial sources of risk and describe how they may interact",
          "describe methods for measuring and modifying risk exposures and factors to consider in choosing among the methods",
        ],
      },
    ],
  },
  {
    id: "ethics",
    name: "Ethical and Professional Standards",
    shortName: "Ethics",
    weightRange: "15-20%",
    color: "#10b981",
    modules: [
      {
        id: "l1-et-01",
        name: "Ethics and Trust in the Investment Profession",
        los: [
          "explain ethics",
          "describe the role of a code of ethics in defining a profession",
          "describe professions and how they establish trust",
          "describe the need for high ethical standards in investment management",
          "explain professionalism in investment management",
          "identify challenges to ethical behavior",
          "compare and contrast ethical standards with legal standards",
          "describe a framework for ethical decision making",
        ],
      },
      {
        id: "l1-et-02",
        name: "Code of Ethics and Standards of Professional Conduct",
        los: [
          "describe the structure of the CFA Institute Professional Conduct Program and the process for the enforcement of the Code and Standards",
          "identify the six components of the Code of Ethics and the seven Standards of Professional Conduct",
          "explain the ethical responsibilities required by the Code and Standards, including the sub-sections of each Standard",
        ],
      },
      {
        id: "l1-et-03",
        name: "Guidance for Standards I-VII",
        los: [
          "demonstrate the application of the Code of Ethics and Standards of Professional Conduct to situations involving issues of professional integrity",
          "recommend practices and procedures designed to prevent violations of the Code of Ethics and Standards of Professional Conduct",
          "identify conduct that conforms to the Code and Standards and conduct that violates the Code and Standards",
        ],
      },
      {
        id: "l1-et-04",
        name: "Introduction to the Global Investment Performance Standards (GIPS)",
        los: [
          "explain why the GIPS standards were created, who can claim compliance, and who benefits from compliance",
          "describe the key concepts of the GIPS Standards for Firms",
          "explain the purpose of composites in performance reporting",
          "describe the fundamentals of compliance",
          "describe the concept of independent verification",
        ],
      },
      {
        id: "l1-et-05",
        name: "Ethics Application",
        los: [
          "evaluate practices, policies, and conduct relative to the CFA Institute Code of Ethics and Standards of Professional Conduct",
          "explain how the practices, policies, and conduct do or do not violate the CFA Institute Code of Ethics and Standards of Professional Conduct",
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// CFA Level II – 10 topics, 45 learning modules (2026 curriculum)
// ---------------------------------------------------------------------------

const levelII: CFATopic[] = [
  {
    id: "quant",
    name: "Quantitative Methods",
    shortName: "Quant",
    weightRange: "5-10%",
    color: "#3b82f6",
    modules: [
      {
        id: "l2-qm-01",
        name: "Multiple Regression – Basics",
        los: [
          "describe the multiple linear regression model and interpret regression coefficients and their p-values",
          "formulate a multiple regression model and evaluate goodness of fit using R-squared and adjusted R-squared",
          "conduct joint hypothesis tests using F-statistics and interpret the results",
        ],
      },
      {
        id: "l2-qm-02",
        name: "Multiple Regression – Advanced",
        los: [
          "evaluate the impact of adding or removing independent variables from a regression model",
          "describe and interpret dummy variables, interaction terms, and their uses in regression models",
        ],
      },
      {
        id: "l2-qm-03",
        name: "Violations of Regression Assumptions",
        los: [
          "describe and test for heteroskedasticity, serial correlation, and multicollinearity in regression models",
          "explain the consequences of regression assumption violations and apply corrective measures",
        ],
      },
      {
        id: "l2-qm-04",
        name: "Extensions of Multiple Regression",
        los: [
          "describe logistic regression and distinguish between linear and logistic regression models",
          "interpret the results of a logistic regression and evaluate its classification accuracy",
        ],
      },
      {
        id: "l2-qm-05",
        name: "Time-Series Analysis",
        los: [
          "describe autoregressive (AR) models, their assumptions, and criteria for model selection",
          "explain unit roots, random walks, and cointegration and their implications for regression analysis",
          "evaluate and interpret time-series models for forecasting financial variables",
        ],
      },
      {
        id: "l2-qm-06",
        name: "Machine Learning",
        los: [
          "describe supervised, unsupervised, and deep learning algorithms and their applications in finance",
          "explain overfitting, regularization, and cross-validation in machine learning models",
          "evaluate the performance of machine learning models using appropriate metrics",
        ],
      },
      {
        id: "l2-qm-07",
        name: "Big Data Projects",
        los: [
          "describe the steps in a Big Data project and the challenges of working with structured and unstructured data",
          "explain text analytics, natural language processing, and their applications in investment management",
        ],
      },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    shortName: "Econ",
    weightRange: "5-10%",
    color: "#f59e0b",
    modules: [
      {
        id: "l2-ec-01",
        name: "Currency Exchange Rates",
        los: [
          "explain the international parity conditions (covered and uncovered interest rate parity, purchasing power parity) and their implications for exchange rates",
          "describe the carry trade and its risks, and evaluate the impact of balance-of-payments flows on exchange rates",
          "forecast exchange rates using parity conditions, the balance-of-payments approach, and the asset market approach",
        ],
      },
      {
        id: "l2-ec-02",
        name: "Economic Growth",
        los: [
          "describe the determinants of economic growth, including the Solow and endogenous growth models",
          "explain the convergence hypothesis and analyze the effects of trade, financial openness, and institutional quality on growth",
        ],
      },
    ],
  },
  {
    id: "fra",
    name: "Financial Statement Analysis",
    shortName: "FSA",
    weightRange: "10-15%",
    color: "#ef4444",
    modules: [
      {
        id: "l2-fs-01",
        name: "Intercorporate Investments",
        los: [
          "describe the classification and accounting treatment of investments in financial assets, associates, joint ventures, and subsidiaries",
          "analyze the effects of different methods (equity, acquisition, proportionate consolidation) on financial statements and ratios",
          "evaluate the impact of goodwill, fair value adjustments, and impairment on consolidated financial statements",
        ],
      },
      {
        id: "l2-fs-02",
        name: "Employee Compensations",
        los: [
          "compare the financial reporting of defined benefit and defined contribution pension plans under IFRS and US GAAP",
          "analyze the effects of changes in pension plan assumptions on financial statements and ratios",
        ],
      },
      {
        id: "l2-fs-03",
        name: "Multinational Operations",
        los: [
          "distinguish between the current rate and temporal methods of foreign currency translation and analyze their effects on financial statements",
          "describe the impact of changes in exchange rates on translated financial statements and key ratios",
        ],
      },
      {
        id: "l2-fs-04",
        name: "Financial Institutions Analysis",
        los: [
          "describe the key features and risks of banking, insurance, and other financial institutions and analyze their financial statements",
          "calculate and interpret capital adequacy, liquidity, and profitability ratios for financial institutions",
        ],
      },
      {
        id: "l2-fs-05",
        name: "Quality of Financial Reports",
        los: [
          "evaluate the quality of financial reports and identify potential accounting manipulations across revenue, expenses, and balance sheet items",
          "describe quantitative indicators and red flags that signal low-quality financial reporting",
        ],
      },
      {
        id: "l2-fs-06",
        name: "Financial Statement Analysis Techniques",
        los: [
          "describe advanced analytical tools including pro forma financial statements and scenario analysis for forecasting",
          "evaluate the effects of accounting policy choices and estimates on cross-company financial comparability",
        ],
      },
    ],
  },
  {
    id: "corporate",
    name: "Corporate Issuers",
    shortName: "Corp",
    weightRange: "5-10%",
    color: "#8b5cf6",
    modules: [
      {
        id: "l2-ci-01",
        name: "Dividends and Share Repurchases",
        los: [
          "compare theories of dividend policy and explain factors that affect dividend policy in practice",
          "describe the expected effect of share repurchases, stock dividends, and stock splits on shareholder wealth and financial ratios",
          "calculate and interpret the effective tax rate on a given currency unit of corporate earnings distributed as dividends or via share repurchase",
        ],
      },
      {
        id: "l2-ci-02",
        name: "ESG in Investment Analysis",
        los: [
          "describe how ESG factors may be integrated into investment analysis and portfolio construction",
          "evaluate the impact of ESG considerations on company valuation and risk assessment",
        ],
      },
      {
        id: "l2-ci-03",
        name: "Cost of Capital",
        los: [
          "estimate the cost of equity using the CAPM, bond yield plus risk premium, and multi-factor models",
          "calculate and interpret the weighted-average cost of capital for a company, adjusting for flotation costs and country risk",
        ],
      },
      {
        id: "l2-ci-04",
        name: "Corporate Restructuring",
        los: [
          "describe types of corporate restructurings (mergers, acquisitions, divestitures, spin-offs) and their motivations",
          "evaluate the effects of mergers and acquisitions on target and acquirer shareholder value",
        ],
      },
    ],
  },
  {
    id: "equity",
    name: "Equity Investments",
    shortName: "Equity",
    weightRange: "10-15%",
    color: "#06b6d4",
    modules: [
      {
        id: "l2-eq-01",
        name: "Equity Valuation – Basics",
        los: [
          "describe the implications of the efficient market hypothesis for equity valuation and contrast intrinsic value with market price",
          "explain the role of absolute and relative valuation models and identify situations where each approach is appropriate",
        ],
      },
      {
        id: "l2-eq-02",
        name: "Dividend Discount Models",
        los: [
          "calculate and interpret the value of common shares using the Gordon growth model, multi-stage DDM, and the H-model",
          "estimate a company's sustainable growth rate and evaluate the sensitivity of DDM valuations to changes in inputs",
        ],
      },
      {
        id: "l2-eq-03",
        name: "Free Cash Flow Models",
        los: [
          "calculate and interpret FCFF and FCFE and explain their use in equity valuation",
          "estimate a company's intrinsic value using single-stage and multi-stage FCFF and FCFE models",
          "describe approaches for estimating the terminal value in a DCF model",
        ],
      },
      {
        id: "l2-eq-04",
        name: "Multiplier Models",
        los: [
          "calculate and interpret price multiples (P/E, P/B, P/S, P/CF, EV/EBITDA) and their justified values based on fundamentals",
          "evaluate the advantages, disadvantages, and appropriate use of each price multiple in equity valuation",
        ],
      },
      {
        id: "l2-eq-05",
        name: "Residual Income Models",
        los: [
          "calculate and interpret residual income and intrinsic value using the residual income model",
          "explain the relationship between residual income valuation and other valuation approaches",
        ],
      },
      {
        id: "l2-eq-06",
        name: "Valuation of Private Companies",
        los: [
          "describe the income, market, and asset-based approaches to valuing private companies",
          "explain adjustments required for lack of marketability, control premiums, and key-person discounts in private company valuation",
        ],
      },
    ],
  },
  {
    id: "fi",
    name: "Fixed Income",
    shortName: "FI",
    weightRange: "10-15%",
    color: "#ec4899",
    modules: [
      {
        id: "l2-fi-01",
        name: "Term Structure of Interest Rates",
        los: [
          "describe theories of the term structure of interest rates (expectations, liquidity preference, segmented markets, preferred habitat)",
          "explain how the shape of the yield curve affects bond valuation and the interpretation of forward rates",
        ],
      },
      {
        id: "l2-fi-02",
        name: "Arbitrage-Free Valuation",
        los: [
          "describe the arbitrage-free valuation framework and calculate bond values using binomial interest rate trees",
          "explain the process of calibrating a binomial tree to match the term structure and value option-free bonds",
        ],
      },
      {
        id: "l2-fi-03",
        name: "Valuation of Bonds with Embedded Options",
        los: [
          "describe how embedded options (calls, puts, floors, caps) affect bond values and risk measures",
          "calculate and interpret option-adjusted spread (OAS) and compare it with nominal and zero-volatility spreads",
          "calculate effective duration and convexity for bonds with embedded options using a binomial model",
        ],
      },
      {
        id: "l2-fi-04",
        name: "Credit Analysis Models",
        los: [
          "describe structural and reduced-form credit models and interpret credit spreads using these frameworks",
          "calculate and interpret the present value of expected credit losses and the fair value of a risky bond",
        ],
      },
      {
        id: "l2-fi-05",
        name: "Credit Default Swaps",
        los: [
          "describe the features and mechanics of credit default swaps and their role in credit risk transfer",
          "explain the use of CDS to manage credit exposure and the relationship between CDS spreads and bond yield spreads",
        ],
      },
    ],
  },
  {
    id: "derivatives",
    name: "Derivatives",
    shortName: "Deriv",
    weightRange: "5-10%",
    color: "#f97316",
    modules: [
      {
        id: "l2-dr-01",
        name: "Forward Commitments",
        los: [
          "describe and calculate the no-arbitrage value of equity, interest rate, and currency forward and futures contracts",
          "describe and calculate the value of interest rate swaps, currency swaps, and equity swaps at initiation and during their lives",
        ],
      },
      {
        id: "l2-dr-02",
        name: "Contingent Claims",
        los: [
          "describe the Black-Scholes-Merton model, the binomial option pricing model, and their key assumptions",
          "calculate option prices and option Greeks (delta, gamma, vega, theta, rho) and explain their use in risk management",
          "describe how volatility affects option pricing and explain the concept of implied volatility",
        ],
      },
    ],
  },
  {
    id: "alts",
    name: "Alternative Investments",
    shortName: "Alts",
    weightRange: "5-10%",
    color: "#14b8a6",
    modules: [
      {
        id: "l2-ai-01",
        name: "Commodities",
        los: [
          "describe commodity sectors and explain the components of commodity returns (spot, roll, collateral yield)",
          "explain theories of commodity futures pricing (contango, backwardation, insurance, hedging pressure)",
        ],
      },
      {
        id: "l2-ai-02",
        name: "Real Estate Investment Types",
        los: [
          "compare the characteristics and risks of private and public real estate investments",
          "describe the income, cost, and sales comparison approaches to real estate valuation",
        ],
      },
      {
        id: "l2-ai-03",
        name: "Public Real Estate Investments",
        los: [
          "describe the types, structure, and valuation of publicly traded real estate securities (REITs, REOCs)",
          "calculate and interpret net asset value per share (NAVPS) and funds from operations (FFO) for REITs",
        ],
      },
      {
        id: "l2-ai-04",
        name: "Hedge Fund Strategies",
        los: [
          "describe major hedge fund strategies (equity, event-driven, relative value, opportunistic) and their risk/return profiles",
          "evaluate hedge fund performance using measures such as Sharpe ratio, Sortino ratio, and drawdown analysis",
        ],
      },
    ],
  },
  {
    id: "pm",
    name: "Portfolio Management",
    shortName: "PM",
    weightRange: "10-15%",
    color: "#6366f1",
    modules: [
      {
        id: "l2-pm-01",
        name: "Exchange-Traded Funds",
        los: [
          "describe the creation/redemption mechanism of ETFs, sources of tracking error, and costs of ETF ownership",
          "compare ETFs with mutual funds and other pooled investment vehicles",
        ],
      },
      {
        id: "l2-pm-02",
        name: "Multifactor Models",
        los: [
          "describe multifactor models (macroeconomic, fundamental, statistical) and interpret factor exposures and sensitivities",
          "explain the use of multifactor models in return attribution, risk analysis, and portfolio construction",
        ],
      },
      {
        id: "l2-pm-03",
        name: "Measuring and Managing Market Risk",
        los: [
          "describe value at risk (VaR), its methods of estimation (parametric, historical, Monte Carlo), and its limitations",
          "explain sensitivity and scenario risk measures (stress testing) and their role in market risk management",
        ],
      },
      {
        id: "l2-pm-04",
        name: "Backtesting and Simulation",
        los: [
          "describe the objectives and steps involved in backtesting an investment strategy",
          "explain the pitfalls of backtesting (look-ahead bias, survivorship bias, data snooping) and approaches to mitigate them",
        ],
      },
      {
        id: "l2-pm-05",
        name: "Economics and Investment Markets",
        los: [
          "describe how macroeconomic factors (growth, inflation, monetary policy) influence asset class returns and correlations",
          "explain the use of economic analysis in setting capital market expectations for asset allocation",
        ],
      },
      {
        id: "l2-pm-06",
        name: "Active Portfolio Management",
        los: [
          "describe the fundamental law of active management and interpret the information ratio and information coefficient",
          "evaluate active portfolio management strategies and their expected value added relative to benchmark",
        ],
      },
    ],
  },
  {
    id: "ethics",
    name: "Ethical and Professional Standards",
    shortName: "Ethics",
    weightRange: "10-15%",
    color: "#10b981",
    modules: [
      {
        id: "l2-et-01",
        name: "Code of Ethics and Standards of Professional Conduct",
        los: [
          "describe the CFA Institute Professional Conduct Program and the enforcement process for the Code and Standards",
          "identify the six components of the Code of Ethics and the seven Standards of Professional Conduct",
        ],
      },
      {
        id: "l2-et-02",
        name: "Guidance for Standards I-VII",
        los: [
          "demonstrate the application of the Code of Ethics and Standards to situations involving professional integrity and conflicts of interest",
          "recommend practices and procedures designed to prevent violations of the Code and Standards",
        ],
      },
      {
        id: "l2-et-03",
        name: "Ethics Application",
        los: [
          "evaluate practices, policies, and conduct relative to the CFA Institute Code of Ethics and Standards of Professional Conduct",
          "explain how specific practices, policies, or conduct do or do not violate the Code and Standards",
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// CFA Level III – 5 core topics + 3 specialized pathways (2026 curriculum)
// ---------------------------------------------------------------------------

const levelIII: CFATopic[] = [
  {
    id: "asset-allocation",
    name: "Asset Allocation",
    shortName: "AA",
    weightRange: "15-20%",
    color: "#06b6d4",
    modules: [
      {
        id: "l3-aa-01",
        name: "Capital Market Expectations",
        los: [
          "describe the framework and tools for setting capital market expectations, including historical analysis, economic analysis, and survey-based approaches",
          "explain how to formulate expected returns, risks, and correlations for major asset classes",
          "describe challenges in developing capital market expectations, including data limitations and behavioral biases",
        ],
      },
      {
        id: "l3-aa-02",
        name: "Economic Forecasting",
        los: [
          "describe approaches to economic forecasting including econometric models, leading indicators, and checklist approaches",
          "evaluate how business-cycle analysis and regime changes affect capital market expectations",
        ],
      },
      {
        id: "l3-aa-03",
        name: "Strategic Asset Allocation",
        los: [
          "describe the role of strategic asset allocation in the portfolio management process and contrast it with tactical allocation",
          "explain asset-only, liability-relative, and goals-based approaches to asset allocation",
          "evaluate how constraints (liquidity, time horizon, regulatory) influence strategic asset allocation decisions",
        ],
      },
      {
        id: "l3-aa-04",
        name: "Tactical Asset Allocation",
        los: [
          "describe tactical asset allocation and evaluate its potential to add value relative to strategic allocation",
          "explain discretionary and systematic approaches to tactical asset allocation",
        ],
      },
      {
        id: "l3-aa-05",
        name: "Portfolio Optimization (MVO, Monte Carlo, Risk Budgeting)",
        los: [
          "describe mean-variance optimization (MVO), its inputs, and the efficient frontier, and explain its limitations",
          "describe resampled MVO, Black-Litterman, Monte Carlo simulation, and risk budgeting as extensions of portfolio optimization",
        ],
      },
      {
        id: "l3-aa-06",
        name: "Liability-Driven and Goals-Based Asset Allocation",
        los: [
          "describe liability-driven investing (LDI) strategies including cash flow matching, duration matching, and contingent immunization",
          "explain goals-based asset allocation and how it differs from traditional mean-variance and liability-relative approaches",
        ],
      },
    ],
  },
  {
    id: "portfolio-construction",
    name: "Portfolio Construction",
    shortName: "Const",
    weightRange: "15-20%",
    color: "#6366f1",
    modules: [
      {
        id: "l3-pc-01",
        name: "Overview of Portfolio Construction",
        los: [
          "describe the portfolio construction process and the role of the investment policy statement",
          "explain how risk and return objectives, constraints, and capital market expectations interact in portfolio construction",
        ],
      },
      {
        id: "l3-pc-02",
        name: "Equity Portfolio Construction",
        los: [
          "describe active, passive, and factor-based approaches to equity portfolio construction",
          "explain how tracking error, active share, and risk budgets are used to manage an equity portfolio",
        ],
      },
      {
        id: "l3-pc-03",
        name: "Fixed-Income Portfolio Construction",
        los: [
          "describe approaches to fixed-income portfolio construction including indexing, enhanced indexing, and active management",
          "explain how duration, key rate duration, and sector allocation are used to manage fixed-income portfolio risk",
        ],
      },
      {
        id: "l3-pc-04",
        name: "Multi-Asset Portfolio Construction",
        los: [
          "describe the construction of multi-asset portfolios and the role of diversification across asset classes",
          "explain how overlays, portable alpha, and completion portfolios are used in multi-asset portfolio management",
        ],
      },
      {
        id: "l3-pc-05",
        name: "Trading, Rebalancing, and Monitoring",
        los: [
          "describe the trading process including execution strategies, transaction costs, and their impact on portfolio performance",
          "explain rebalancing strategies (calendar, percentage-of-portfolio, tactical) and the trade-offs involved",
        ],
      },
    ],
  },
  {
    id: "performance",
    name: "Performance Measurement",
    shortName: "Perf",
    weightRange: "5-10%",
    color: "#f59e0b",
    modules: [
      {
        id: "l3-pm-01",
        name: "Portfolio Performance Evaluation",
        los: [
          "describe the components of portfolio performance evaluation: measurement, attribution, and appraisal",
          "calculate and interpret return attribution using macro and micro attribution models",
          "evaluate portfolio performance using risk-adjusted measures (Sharpe, Treynor, information ratio, Jensen's alpha)",
        ],
      },
      {
        id: "l3-pm-02",
        name: "Investment Manager Selection",
        los: [
          "describe the investment manager selection process, including qualitative and quantitative due diligence",
          "explain the role of fees, fund terms, and track record analysis in manager evaluation and selection",
        ],
      },
    ],
  },
  {
    id: "derivatives-risk",
    name: "Derivatives and Risk Management",
    shortName: "Deriv/Risk",
    weightRange: "10-15%",
    color: "#f97316",
    modules: [
      {
        id: "l3-dr-01",
        name: "Options Strategies",
        los: [
          "describe common option strategies (covered call, protective put, collar, spread, straddle, strangle) and their risk/return profiles",
          "evaluate the use of option strategies to achieve specific investment objectives including income generation and downside protection",
        ],
      },
      {
        id: "l3-dr-02",
        name: "Swaps, Forwards, and Futures Strategies",
        los: [
          "describe the use of interest rate, equity, and currency swaps, forwards, and futures to modify portfolio risk and return",
          "calculate the notional principal required to achieve a target duration, beta, or currency exposure",
        ],
      },
      {
        id: "l3-dr-03",
        name: "Currency Management",
        los: [
          "describe strategic and tactical approaches to currency management including hedging, cross-hedging, and currency overlay",
          "evaluate the costs and benefits of currency hedging and the tools used (forwards, options, swaps)",
        ],
      },
      {
        id: "l3-dr-04",
        name: "Risk Management for Institutions",
        los: [
          "describe the risk management process for institutional investors, including risk governance, risk budgeting, and risk monitoring",
          "explain the use of VaR, stress testing, and scenario analysis in institutional risk management",
        ],
      },
      {
        id: "l3-dr-05",
        name: "Case Studies in Risk Management",
        los: [
          "analyze case studies illustrating the consequences of inadequate risk management",
          "describe lessons learned from historical risk management failures and their implications for current practice",
        ],
      },
    ],
  },
  {
    id: "ethics",
    name: "Ethical and Professional Standards",
    shortName: "Ethics",
    weightRange: "10-15%",
    color: "#10b981",
    modules: [
      {
        id: "l3-et-01",
        name: "Code of Ethics and Standards (Application)",
        los: [
          "evaluate complex ethical scenarios using the CFA Institute Code of Ethics and Standards of Professional Conduct",
          "recommend actions to resolve ethical dilemmas consistent with the Code and Standards",
        ],
      },
      {
        id: "l3-et-02",
        name: "Asset Manager Code of Professional Conduct",
        los: [
          "describe the Asset Manager Code of Professional Conduct and its requirements for firms",
          "evaluate firm practices relative to the Asset Manager Code and identify areas of non-compliance",
        ],
      },
      {
        id: "l3-et-03",
        name: "Ethics Case Studies",
        los: [
          "analyze case studies involving ethical issues in investment management and apply the Code and Standards",
          "evaluate the adequacy of compliance procedures and recommend improvements based on case study findings",
        ],
      },
    ],
  },
  {
    id: "pw-pathway",
    name: "Pathway: Private Wealth",
    shortName: "Wealth",
    weightRange: "30-35%",
    color: "#ef4444",
    modules: [
      {
        id: "l3-pw-01",
        name: "Overview of Private Wealth Management",
        los: [
          "describe the private wealth management process and the key elements of a wealth management engagement",
          "explain how human capital, financial capital, and life-cycle considerations influence wealth management decisions",
        ],
      },
      {
        id: "l3-pw-02",
        name: "Investment Policy Statement for Individuals",
        los: [
          "describe the components of an individual investment policy statement including objectives, constraints, and asset allocation",
          "evaluate an individual investor's risk and return objectives given their financial situation and life circumstances",
          "recommend an appropriate asset allocation based on an individual's IPS",
        ],
      },
      {
        id: "l3-pw-03",
        name: "Taxes and Private Wealth Management",
        los: [
          "describe the impact of taxes on investment returns and the after-tax accumulation of wealth",
          "explain strategies for tax-efficient investing including asset location, tax-loss harvesting, and tax-deferred accounts",
        ],
      },
      {
        id: "l3-pw-04",
        name: "Estate Planning and Cross-Border Considerations",
        los: [
          "describe the objectives and tools of estate planning, including trusts, wills, and gifting strategies",
          "explain cross-border estate planning considerations including double taxation treaties and jurisdictional issues",
        ],
      },
      {
        id: "l3-pw-05",
        name: "Concentrated Positions",
        los: [
          "describe the risks associated with concentrated positions in a single asset or asset class",
          "evaluate strategies for managing concentrated positions including exchange funds, hedging, and staged diversification",
        ],
      },
      {
        id: "l3-pw-06",
        name: "Insurance and Annuities",
        los: [
          "describe the role of insurance and annuities in private wealth management and risk mitigation",
          "evaluate the suitability of different insurance and annuity products for individual clients",
        ],
      },
      {
        id: "l3-pw-07",
        name: "Behavioral Finance and Private Clients",
        los: [
          "describe common behavioral biases affecting private wealth clients and their impact on portfolio decisions",
          "explain how wealth managers can identify and mitigate behavioral biases in client interactions and portfolio construction",
        ],
      },
    ],
  },
  {
    id: "pmkt-pathway",
    name: "Pathway: Private Markets",
    shortName: "Priv Mkts",
    weightRange: "30-35%",
    color: "#8b5cf6",
    modules: [
      {
        id: "l3-pmkt-01",
        name: "Private Equity Investments",
        los: [
          "describe the stages of private equity investing (venture capital, growth equity, buyout) and their risk/return characteristics",
          "explain valuation methods for private equity investments including multiples, DCF, and comparable transactions",
        ],
      },
      {
        id: "l3-pmkt-02",
        name: "Private Debt Investments",
        los: [
          "describe the types and characteristics of private debt instruments (direct lending, mezzanine, distressed debt)",
          "evaluate the risk and return profile of private debt relative to public fixed income and other private market investments",
        ],
      },
      {
        id: "l3-pmkt-03",
        name: "Real Estate – Private",
        los: [
          "describe private real estate investment structures and strategies (core, value-add, opportunistic)",
          "explain the valuation of private real estate using income capitalization, discounted cash flow, and comparable sales approaches",
        ],
      },
      {
        id: "l3-pmkt-04",
        name: "Infrastructure Investments",
        los: [
          "describe the characteristics of infrastructure investments, including brownfield and greenfield projects",
          "evaluate the risk, return, and diversification benefits of infrastructure investments in a portfolio context",
        ],
      },
      {
        id: "l3-pmkt-05",
        name: "Natural Resources – Private",
        los: [
          "describe the investment characteristics of timberland, farmland, and natural resource assets",
          "evaluate the role of natural resource investments in portfolio diversification and inflation protection",
        ],
      },
      {
        id: "l3-pmkt-06",
        name: "Fund Management and GP/LP Structures",
        los: [
          "describe the structure and terms of private market funds including GP/LP relationships, carried interest, and management fees",
          "evaluate the alignment of interests between GPs and LPs and the impact of fund terms on investor returns",
        ],
      },
      {
        id: "l3-pmkt-07",
        name: "Due Diligence and Valuation of Private Assets",
        los: [
          "describe the due diligence process for private market investments including operational, financial, and legal due diligence",
          "explain the challenges of valuing illiquid private assets and the adjustments required for fair value estimation",
        ],
      },
    ],
  },
  {
    id: "ppm-pathway",
    name: "Pathway: Portfolio Management",
    shortName: "PM Path",
    weightRange: "30-35%",
    color: "#14b8a6",
    modules: [
      {
        id: "l3-ppm-01",
        name: "Institutional Investors – Pension Funds",
        los: [
          "describe the investment characteristics and objectives of defined benefit and defined contribution pension plans",
          "evaluate the impact of plan features (funded status, liability duration, participant demographics) on investment policy",
        ],
      },
      {
        id: "l3-ppm-02",
        name: "Institutional Investors – Endowments, Foundations, Sovereign Wealth",
        los: [
          "describe the investment objectives, constraints, and governance of endowments, foundations, and sovereign wealth funds",
          "evaluate how spending rules, intergenerational equity, and investment horizons affect asset allocation for institutional investors",
        ],
      },
      {
        id: "l3-ppm-03",
        name: "Liability-Driven Investing",
        los: [
          "describe liability-driven investing strategies including immunization, cash flow matching, and horizon matching",
          "evaluate the use of derivatives and fixed-income instruments to manage liability risk",
        ],
      },
      {
        id: "l3-ppm-04",
        name: "Equity Active Management",
        los: [
          "describe approaches to active equity management including fundamental, quantitative, and factor-based strategies",
          "evaluate the construction and risk management of active equity portfolios using tracking error and active share",
        ],
      },
      {
        id: "l3-ppm-05",
        name: "Fixed-Income Active Management",
        los: [
          "describe active fixed-income management strategies including duration management, yield curve positioning, and sector rotation",
          "evaluate the sources of return in active fixed-income management and the role of credit analysis in portfolio construction",
        ],
      },
      {
        id: "l3-ppm-06",
        name: "Multi-Asset Strategies",
        los: [
          "describe the construction and management of multi-asset portfolios and the role of asset allocation in driving returns",
          "evaluate the use of risk parity, portable alpha, and factor-based approaches in multi-asset portfolio management",
        ],
      },
      {
        id: "l3-ppm-07",
        name: "Hedge Fund and Alternative Strategies in PM",
        los: [
          "describe the role of hedge funds and alternative investments in institutional portfolio management",
          "evaluate the impact of adding hedge fund and alternative strategies on portfolio risk, return, and diversification",
        ],
      },
    ],
  },
];

export const cfaTopicsByLevel: Record<CFALevel, CFATopic[]> = {
  I: levelI,
  II: levelII,
  III: levelIII,
};

/**
 * Returns the list of CFA topics for a given level.
 * @param level - CFA level ("I", "II", or "III")
 * @returns Array of CFATopic objects for that level
 */
export function getTopicsForLevel(level: CFALevel): CFATopic[] {
  return cfaTopicsByLevel[level];
}
