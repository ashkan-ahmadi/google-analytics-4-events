import { getRandomItemFromArray, pushToDataLayer } from '../functions.js'

export default function login() {
  const form = document.querySelector('#login-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    try {
      e.preventDefault()

      const methods = ['Email', 'Google', 'Facebook', 'Twitter/X', 'LinkedIn', 'Apple']

      pushToDataLayer({
        // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?sjid=16304408777889371420-EU&client_type=gtm#login
        event: 'login', // required
        method: getRandomItemFromArray(methods), // string|optional
      })

      form.reset()

      vanillaToast.success('Success')
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

      vanillaToast.error(error?.message || 'There was an error. Check Console.')
      pushToDataLayer(errorInfo)
    }
  })
}
