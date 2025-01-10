import { generateRandomInteger, getRandomItemFromArray, pushToDataLayer, showToast } from '../functions.js'

export default function select_content() {
  const form = document.querySelector('#select_content-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    try {
      e.preventDefault()

      const types = ['blog', 'discount', 'coupon', 'product', 'page']
      const id = generateRandomInteger()

      pushToDataLayer({
        // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?sjid=16304408777889371420-EU&client_type=gtm#select_content
        event: 'select_content', // required
        content_type: getRandomItemFromArray(types), // string|optional
        content_id: id,
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
