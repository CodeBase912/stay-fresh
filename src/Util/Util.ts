/**
 * This functions takes in an integer to format into the following:
 * number: 1234567 -> result: 1 234 567
 *
 * @param {number} number  a number to format
 * @returns {string}  a string of the formatted number
 */
export function formatNumber(number: number): string {
  let string: string[] = [];
  for (let i = number.toString().length; i >= 0; i -= 3) {
    if (i < 3) {
      string.unshift(number.toString().slice(0, i));
    } else {
      string.unshift(number.toString().slice(i - 3, i));
    }
  }
  if (string[0] == '') {
    string = string.slice(1, string.length);
  }
  const result: string = string.join(' ');
  return result;
}
