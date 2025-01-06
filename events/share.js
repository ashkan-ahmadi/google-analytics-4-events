import { generateRandomInteger, getRandomItemFromArray, pushToDataLayer } from '../functions.js'

export default function share() {
  const form = document.querySelector('#share-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    try {
      e.preventDefault()

      const methods = ['Email', 'Google', 'Facebook', 'Twitter/X', 'LinkedIn', 'Apple']
      const types = ['blog', 'discount', 'coupon']

      dataLayer.push({
        // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?sjid=16304408777889371420-EU&client_type=gtm#share
        event: 'share', // required
        method: getRandomItemFromArray(methods), // get random item from array
        content_type: getRandomItemFromArray(types), // The type of shared content.
        item_id: generateRandomInteger(),
      })

      form.reset()
    } catch (error) {
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

      pushToDataLayer(errorInfo)
    }
  })
}
