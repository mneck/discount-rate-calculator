import discountValues from "./present-value-table.js";

// selecting DOM elements
const dateOfDenial = document.getElementById("dateOfDenial");
const endOfBenefitsDate = document.getElementById("endDate");
const settlementClaimDate = document.getElementById("settlementClaim");
const monthlyBenefits = document.getElementById("monthlyBenefits");
const resultsDOM = document.getElementById("results");
const pastResultsText = document.getElementById("pastResultsText");
const pastResultsAmount = document.getElementById("pastResultsAmount");
const futureResultsText = document.getElementById("futureResultsText");
const futureResultsAmount = document.getElementById("futureResultsAmount");
const totalResultsText = document.getElementById("totalResultsText");
const totalResultsAmount = document.getElementById("totalResultsAmount");
const resetBtn = document.getElementById("resetBtn");
const form = document.querySelector(".form");

// helper function to clear the results HTML elements each time the user submits or resets the form
const resetResults = () => {
  pastResultsText.textContent = "";
  pastResultsAmount.textContent = "";
  futureResultsText.textContent = "";
  futureResultsAmount.textContent = "";
  totalResultsText.textContent = "";
  totalResultsAmount.textContent = "";
};

// form submission listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  resetResults();
  const dateOfDenialValue = dateOfDenial.value;
  const endOfBenefitsDateValue = endOfBenefitsDate.value;
  const settlementClaimDateValue = settlementClaimDate.value;
  const monthlyBenefitsValue = monthlyBenefits.value;
  //
  resultsDOM.classList.remove("is-hidden");

  // calculate past benefits
  const pastTotal = calculatePastBenefitsOwed(
    dateOfDenialValue,
    settlementClaimDateValue,
    monthlyBenefitsValue,
    endOfBenefitsDateValue
  );

  // append past benefits owing to DOM
  let pastText = document.createTextNode(`past amount owing`);
  pastResultsText.appendChild(pastText);
  let pastAmount = document.createTextNode(`$${pastTotal.toFixed(2)}`);
  pastResultsAmount.appendChild(pastAmount);

  // calculate future benefits owing and append result to DOM
  const futureTotal = calculateFutureBenefitsOwed(
    settlementClaimDateValue,
    endOfBenefitsDateValue,
    monthlyBenefitsValue
  );

  // append future benefits owing to DOM
  let futureText = document.createTextNode(
    `future amount owing (not including discount)`
  );
  futureResultsText.appendChild(futureText);
  let futureAmount = document.createTextNode(`$${futureTotal.toFixed(2)}`);
  futureResultsAmount.appendChild(futureAmount);

  // calculate total amount (past total + future total) and append result to DOM
  const totalValue = pastTotal + futureTotal;
  console.log(totalValue);
  let totalText = document.createTextNode(`total amount owing`);
  totalResultsText.appendChild(totalText);
  let totalAmount = document.createTextNode(`$${totalValue.toFixed(2)}`);
  totalResultsAmount.appendChild(totalAmount);
});

// form reset button listener
resetBtn.addEventListener("click", () => {
  resultsDOM.classList.add("is-hidden");
  resetResults();
});

// calculate PAST BENEFITS - total days owed: number of days between DATE OF DENIAL and PROPOSAL DATE

const calculatePastBenefitsOwed = (
  dateOfDenial,
  dateOfProposal,
  monthlyValue,
  endOfBenefits
) => {
  const denialDate = new Date(dateOfDenial);
  const proposalDate = new Date(dateOfProposal);
  const endOfBenefitsDate = new Date(endOfBenefits);

  // if {end date of benefits} is equal to or before {denial date}, no past benefits are due
  if (denialDate.getTime() >= endOfBenefitsDate.getTime()) {
    console.log(
      "no benefits are due - date of denial was on or before end date of client's claim"
    );
    const amountPastOwed = 0;
    return amountPastOwed;
    resultsText.textContent =
      "no benefits are due - date of denial was on or before end date of client's claim";

    // if benefits end date is equal to or after date of settlement claim, calculate 'past owing' based on # of days between {date of denial} and {date of settlement claim}
  } else if (endOfBenefitsDate.getTime() >= proposalDate.getTime()) {
    const timeBetweenDenialandProposal =
      proposalDate.getTime() - denialDate.getTime();
    const daysBetweenDenialandProposal =
      timeBetweenDenialandProposal / (1000 * 60 * 60 * 24);
    console.log(`past days owed: ${daysBetweenDenialandProposal}`);
    const yearlyBenefits = monthlyValue * 12;
    const dailyBenefits = yearlyBenefits / 365;
    const amountPastOwed = daysBetweenDenialandProposal * dailyBenefits;
    console.log("benefits end date is equal to or after date of proposal");
    console.log(
      `past amount owing - from date of denial to date of settlment claim date $${amountPastOwed}`
    );
    return amountPastOwed;

    // if benefits ended prior to date of settlement claim, calculate 'past owing' baed on # of days between {date of denial} and {end date of benefits}
  } else if (endOfBenefitsDate.getTime() < proposalDate.getTime()) {
    console.log("benefits ended prior to date of settlement claim");
    const timeBetweenDenialandEnd =
      endOfBenefitsDate.getTime() - denialDate.getTime();
    const daysBetweenDenialandEnd =
      timeBetweenDenialandEnd / (1000 * 60 * 60 * 24);
    console.log(`past days owed: ${daysBetweenDenialandEnd}`);
    const yearlyBenefits = monthlyValue * 12;
    const dailyBenefits = yearlyBenefits / 365;
    const amountPastOwed = daysBetweenDenialandEnd * dailyBenefits;
    console.log(
      `past amount owing - from date of denial to end date prescribed in client's claim $${amountPastOwed}`
    );
    return amountPastOwed;
  }
};

// calculate FUTURE BENEFITS:  number of days between PROPOSAL DATE and END OF BENEFIT PERIOD

const calculateFutureBenefitsOwed = (proposal, end, monthlyBenefits) => {
  const proposalDate = new Date(proposal);
  const endDate = new Date(end);

  // if 'end date' is before 'settlement claim date' , no future benefits are owed
  if (endDate.getTime() <= proposalDate.getTime()) {
    const amountFutureOwed = 0;
    return amountFutureOwed;

    // if 'end date' is after 'settlement claim date
  } else if (endDate.getTime() > proposalDate.getTime()) {
    const differenceInTime = endDate.getTime() - proposalDate.getTime();
    const futureDaysOwing = differenceInTime / (1000 * 60 * 60 * 24);
    console.log(`future days owing = ${futureDaysOwing}`);
    const yearlyBenefits = monthlyBenefits * 12;
    const dailyBenefits = yearlyBenefits / 365;
    const amountFutureOwed = futureDaysOwing * dailyBenefits;
    console.log(
      `future amount owing (without discount applied) = $${amountFutureOwed.toFixed(
        2
      )}`
    );
    return amountFutureOwed;
  }
};

/*
- Lisa was born on Jan 1, 1982. She was denied benefits on Jan 1, 2022. Her net monthly benefit is $1000 less CPPD. Her benefits would be paid until she turns 65.
    - Lisa turns 65 on Jan 1, 2047.
    - We can calculate Lisa’s benefit period as 2022-2047, a period of 25 years.
- Lisa hires a lawyer that sends a settlement proposal on Jan 1, 2023. The settlement proposal calculates the amount owing as follows:
    - Past benefits owing (from date of denial [Jan 1, 2022] to Jan 1, 2023):
    $1000 x 12 x 1 = $12,000
    - Future benefits owing (from date after proposal [Jan 2, 2023] to Jan 1, 2047):
    $1000 x 12 x 20.0304 = $240,364.80
        - Lisa has 24 years from the date of her letter until retirement at age 65.
        - 20.0304 is taken from the Present Value Table at Year 24, 1.5%.
    - Total demanded: $252,364.80 + (punitive damages and aggravated damages) + costs & disbursements
        - $12,000 + $240,364.80
*/
