import { getRandomItemFromArray, pushToDataLayer, showToast } from '../functions.js'

export default function purchase() {
  const form = document.querySelector('#purchase-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    try {
      e.preventDefault()

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

      vanillaToast.error(error?.message || 'There was an error. Check Console.')

      pushToDataLayer(errorInfo)
    }
  })
}
