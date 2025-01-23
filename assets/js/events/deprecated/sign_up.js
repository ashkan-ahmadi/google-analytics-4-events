import { getRandomItemFromArray, pushToDataLayer, showToast } from '../../functions.js'

export default function sign_up() {
  const form = document.querySelector('#sign_up-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    try {
      e.preventDefault()

      const methods = ['Email', 'Google', 'Facebook', 'Twitter/X', 'LinkedIn', 'Apple']

      pushToDataLayer({
        // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?sjid=16304408777889371420-EU&client_type=gtm#sign_up
        event: 'sign_up', // required
        method: getRandomItemFromArray(methods), // get random item from array
      })

      form.reset()

      showToast('Success')
    } catch (error) {
      // Adding to dataLayer so that GTM can pick it up
      const errorInfo = {
        event: 'log_error',
        error_message: error?.message || '',
        error_stack: error?.stack || '',
        form_id: form?.id || '',
        form_name: form?.name || '',
        page_title: form?.elements['title']?.value || '',
        page_permalink: form?.elements['permalink']?.value || '',
      }

      console.log(errorInfo)
      console.log(error)

      showToast(error?.message || 'There was an error. Check Console.')

      pushToDataLayer(errorInfo)
    }
  })
}
