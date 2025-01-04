/**
 * Returns a random number between min and max (both included)
 *
 * @author W3Schools.com
 * @param min integer default 1 (inclusive)
 * @param max integer default 100 (inclusive)
 *
 * @source https://www.w3schools.com/js/js_random.asp
 *
 * @return integer a randomly generated integer between the minimum and maximum numbers
 */
export function generateRandomInteger(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Get a random item from an array
 *
 * @author Ashkan Ahmadi
 * @param array array an array of items to get a random item from
 *
 * @return string|null|undefined|array|object|integer
 */
export function getRandomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}
