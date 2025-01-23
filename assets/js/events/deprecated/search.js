import { pushToDataLayer, showToast } from '../../functions.js'

export default function search() {
  const form = document.querySelector('#search-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    try {
      e.preventDefault()

      const searchValue = form?.elements?.search?.value || ''
      const regionValue = form?.elements?.region?.value || ''

      pushToDataLayer({
        event: 'search', // required
        search_term: searchValue, // string|required
        region: regionValue, // string|optional - read index.html for info on Custom Dimensions
      })

      form.reset()

      showToast('Success')
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
      console.log(error)

      showToast(error?.message || 'There was an error. Check Console.')

      pushToDataLayer(errorInfo)
    }
  })
}
