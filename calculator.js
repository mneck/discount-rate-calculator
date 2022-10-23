// selecting DOM elements
// const dateOfBirth = document.getElementById("dateOfBirth");
const dateOfDenial = document.getElementById("dateOfDenial");
const endOfBenefitsDate = document.getElementById("endDate");
const settlementClaimDate = document.getElementById("settlementClaim");
const monthlyBenefits = document.getElementById("monthlyBenefits");
const resultsDOM = document.getElementById("results");
const resultsText = document.getElementById("resultsText");
const resultsAmount = document.getElementById("resultsAmount");
const resetBtn = document.getElementById("resetBtn");
const form = document.querySelector(".form");

// form submission listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // const dateOfBirthValue = dateOfBirth.value;
  const dateOfDenialValue = dateOfDenial.value;
  const endOfBenefitsDateValue = endOfBenefitsDate.value;
  const settlementClaimDateValue = settlementClaimDate.value;
  const monthlyBenefitsValue = monthlyBenefits.value;
  //
  resultsDOM.classList.remove("is-hidden");
  //
  calculatePastBenefitsDays(
    dateOfDenialValue,
    settlementClaimDateValue,
    monthlyBenefitsValue,
    endOfBenefitsDateValue
  );
  // calculateFutureBenefitsDays(settlementClaimDate, endOfBenefitsDate);
  // convertToDailyBenefits(monthlyBenefits);
});

// form reset listener
resetBtn.addEventListener("click", () => {
  resultsDOM.classList.add("is-hidden");
});

// convert monthly benefits to yearly & daily benefits
const convertToDailyBenefits = (monthly) => {
  const yearlyBenefits = monthly * 12;
  const dailyBenefits = yearlyBenefits / 365;
  // console.log(`daily benefits are $${dailyBenefits}`);
  return dailyBenefits;
};

// calculate PAST BENEFITS - total days owed: number of days between DATE OF DENIAL and PROPOSAL DATE
// benefits end date is before denial date: NO PAST benefits due, NO FUTURE benefits due
// benefits end date is equal to settlement
// benefits end date is after denial date, settlement claim is before end date
// benefits end date is after denial date, settlement claim is before end date

const calculatePastBenefitsDays = (
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
    const amountOwed = daysBetweenDenialandProposal * dailyBenefits;
    console.log("benefits end date is equal to or after date of proposal");
    console.log(
      `past amount owing - from date of denial to date of settlment claim date $${amountOwed}`
    );
    resultsText.textContent = `past amount owing - from date of denial to date of settlment claim date:`;
    resultsAmount.textContent = `$${amountOwed.toFixed(2)}`;

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
    const amountOwed = daysBetweenDenialandEnd * dailyBenefits;
    console.log(
      `past amount owing - from date of denial to end date prescribed in client's claim $${amountOwed}`
    );
    resultsText.textContent = `past amount owing - from date of denial to end date prescribed in claim:`;
    resultsAmount.textContent = `$${amountOwed.toFixed(2)}`;
  }
};

// calculate FUTURE BENEFITS days:  number of days between PROPOSAL DATE and END OF BENEFIT PERIOD

const calculateFutureBenefitsDays = (proposal, end) => {
  const proposalDate = new Date(proposal);
  const endDate = new Date(end);
  const differenceInTime = endDate.getTime() - proposalDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  // console.log(`future benefits are owed for ${differenceInDays} days`);
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
