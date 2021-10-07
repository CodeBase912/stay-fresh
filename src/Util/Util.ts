/**
 * This functions takes in an integer to format into the following:
 * number: 1234567 -> result: 1 234 567
 *
 * @param {number} number  a number to format
 * @returns {string}  a string of the formatted number
 */
export function formatNumber(number: number): string {
  // Define an empty string array
  let string: string[] = [];
  // Loop through every 3 characters in the number variable from the
  // last character to the first (reverse-order) and append them to
  // the front of string array
  for (let i = number.toString().length; i >= 0; i -= 3) {
    if (i < 3) {
      string.unshift(number.toString().slice(0, i));
    } else {
      string.unshift(number.toString().slice(i - 3, i));
    }
  }
  // Remove any white space at the beginning of the string array
  if (string[0] == '') {
    string = string.slice(1, string.length);
  }
  // Join the string array into a string (with white space after every
  // three characters)
  const result: string = string.join(' ');
  // resturn the result
  return result;
}
