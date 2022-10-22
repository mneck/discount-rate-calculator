// selecting DOM elements & form response data
const dateOfBirthInput = document.getElementById("dateOfBirth");
const dateOfDenialInput = document.getElementById("dateOfDenial");
const endDateInput = document.getElementById("endDate");
const dateofSettlementClaimInput = document.getElementById("settlementClaim");
const monthlyBenefitsInput = document.getElementById("monthlyBenefits");
const resultsDOM = document.getElementById("results");
// need to somehow access the response (boolean) from the "apply discount" question in the form
const form = document.querySelector(".form");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

// get form submissions from user
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("submit button was clicked");
  const dateOfBirth = dateOfBirthInput.value;
  const dateOfDenial = dateOfDenialInput.value;
  const endOfBenefits = endDateInput.value;
  const settlementClaim = dateofSettlementClaimInput.value;
  const monthlyBenefits = monthlyBenefitsInput.value;

  // still need to access the response (boolean) from the "apply discount" question in the form

  resultsDOM.classList.remove("is-hidden");
  calculateBenefitPeriod(dateOfBirth, endOfBenefits);
  calculatePastBenefitsOwing(dateOfDenial, settlementClaim);
  calculateFutureBenefitsOwing(settlementClaim, endOfBenefits);
});

// reset form
resetBtn.addEventListener("click", () => {
  console.log("reset button was clicked");
  resultsDOM.classList.add("is-hidden");
});

// calculate client's benefit period - days between DATE OF DENIAL and END OF BENEFIT PERIOD

const calculateBenefitPeriod = (birth, end) => {
  const birthDate = new Date(birth);
  const endDate = new Date(end);
  const differenceInTime = endDate.getTime() - birthDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  console.log(`benefit period is ${differenceInDays} days`);
};

// calculate PAST BENEFITS OWING: number of days between DATE OF DENIAL and PROPOSAL DATE

const calculatePastBenefitsOwing = (denial, proposal) => {
  const denialDate = new Date(denial);
  const proposalDate = new Date(proposal);
  const differenceInTime = proposalDate.getTime() - denialDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  console.log(`past benefits are owed for ${differenceInDays} days`);
};

// calculate FUTURE BENEFITS OWING:  number of days between PROPOSAL DATE and END OF BENEFIT PERIOD

const calculateFutureBenefitsOwing = (proposal, end) => {
  const proposalDate = new Date(proposal);
  const endDate = new Date(end);
  const differenceInTime = endDate.getTime() - proposalDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  console.log(`future benefits are owed for ${differenceInDays} days`);
};

// convert monthly benefits into daily?

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
