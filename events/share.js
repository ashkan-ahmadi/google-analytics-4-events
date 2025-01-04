import { generateRandomInteger, getRandomItemFromArray } from '../functions.js'

export default function share() {
  const form = document.querySelector('#share-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    try {
      e.preventDefault()

      // GTM loads dataLayer but we are adding it here just in case
      const dataLayer = window?.dataLayer || []

      const methods = ['Email', 'Google', 'Facebook', 'Twitter/X', 'LinkedIn', 'Apple']
      const types = ['blog', 'discount', 'coupon']

      // GTM will be on the lookout for this
      // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?sjid=16304408777889371420-EU&client_type=gtm#share
      dataLayer.push({
        event: 'share', // required
        method: getRandomItemFromArray(methods), // get random item from array
        content_type: getRandomItemFromArray(types), // The type of shared content.
        item_id: generateRandomInteger(),
      })

      form.reset()
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

      dataLayer.push(errorInfo)
    }
  })
}
