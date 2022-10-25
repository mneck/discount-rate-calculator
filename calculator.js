import { discountRateValues } from "present-value-table.js";

const pastAmountOwed = function () {
  // for (let i = 0; i < cards[suitsArr].length, i++) {
  //     for (let f = 0; f < cards[cardNumArr].length, f++) {
  //         this.newDeck[i*13 + f] = {
  //             cardNum: cardNumArr[r],
  //             cardNum
  //         }
};

const futureAmountOwed = function () {};

const totalAmountOwed = function () {};

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
