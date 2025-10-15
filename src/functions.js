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

export function pushToDataLayer(obj) {
  const dataLayer = window?.dataLayer || []

  dataLayer.push(obj)
}

// Toastify API: https://github.com/apvarun/toastify-js/blob/master/README.md#api
export function showToast(text, opts = {}) {
  const defaultOptions = {
    text: text || 'Toast', // Message to be displayed in the toast
    duration: 5000, // Duration for which the toast should be displayed. -1 for permanent toast
    destination: '', // URL to which the browser should be navigated on click of the toast
    newWindow: true, // Decides whether the `destination` should be opened in a new window or not
    close: false, // To show the close icon or not
    gravity: 'bottom', // To show the toast from top or bottom: top|bottom
    position: 'center', // To show the toast on left or right: left|center|right
    stopOnFocus: false, // Prevents dismissing of toast on hover
    className: '', // Ability to provide custom class name for further customization
    style: {
      // Use the HTML DOM Style properties to add any style directly to toast
      background: 'var(--bs-success-bg-subtle)',
      border: 'var(--bs-border-width) solid var(--bs-success-border-subtle)',
      color: 'var(--bs-gray-dark)',
      boxShadow: 'none',
      borderRadius: 'var(--bs-border-radius)',
    },
    onClick: false, // Invoked when the toast is clicked
    callback: false, // Invoked when the toast is dismissed
    oldestFirst: true, // Set the order in which toasts are stacked in page
    ariaLive: 'polite', // Announce the toast to screen readers
    escapeMarkup: true, // Toggle the default behavior of escaping HTML markup
    offset: {}, // 	Ability to add some offset to axis
  }

  const options = { ...defaultOptions, ...opts }

  Toastify(options).showToast()
}

export function generateRandomUUID() {
  return window?.crypto?.randomUUID()
}

// This is a common function used to push google information
// This is often used as an object with 3 parameters:
// 1. what you want to target, for example: event|config
// 2. the value of the target, e.g. purchase|select_content
// 3. an object with other info depending on the value. usually an event has extra parameters
// What is gtag.js?
// gtag.js is a JavaScript tagging framework that allows you to send data from your site to Google measurement products. To set up gtag.js, you add 1 snippet of code to each page of your website. To use the gtag.js effectively, you need to be comfortable changing the code on your site using JavaScript.
export function gtag() {
  dataLayer.push(arguments)
}
