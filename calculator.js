const dateOfBirthInput = document.getElementById("dateOfBirth");
const dateOfDenialInput = document.getElementById("dateOfDenial");
const endDateInput = document.getElementById("endDate");
const monthlyBenefitsInput = document.getElementById("monthlyBenefits");
const resultsDOM = document.getElementById("results");
console.log(resultsDOM);
// need to access the response (boolean) from the "apply discount" question in the form
const form = document.querySelector(".form");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("submit button was clicked");
  const dateOfBirth = dateOfBirthInput.value;
  const dateOfDenial = dateOfDenialInput.value;
  const endDate = endDateInput.value;
  const monthlyBenefits = monthlyBenefitsInput.value;
  // need to access the response (boolean) from the "apply discount" question in the form
  console.log(`date of birth is: ${dateOfBirth}`);
  console.log(`date of denial is: ${dateOfDenial}`);
  console.log(`End Date Prescribed in Client's Claim is: ${endDate}`);
  console.log(`monthly benefits are: ${monthlyBenefits}`);
  resultsDOM.classList.remove("is-hidden");
});

resetBtn.addEventListener("click", () => {
  console.log("reset button was clicked");
});

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
