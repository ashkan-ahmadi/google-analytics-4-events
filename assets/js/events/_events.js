import { pushToDataLayer, showToast } from '../functions.js'

// EVENTS
import create_datalayer___add_to_cart from './add_to_cart.js'
import create_datalayer___login from './login.js'
import create_datalayer___remove_from_cart from './remove_from_cart.js'
import create_datalayer___search from './search.js'
import create_datalayer___select_content from './select_content.js'
import create_datalayer___share from './share.js'
import create_datalayer___sign_up from './sign_up.js'
import create_datalayer___tutorial_begin from './tutorial_begin.js'
import create_datalayer___tutorial_complete from './tutorial_complete.js'

export default function handleEvents() {
  const forms = document.querySelectorAll('form')

  if (!forms.length) {
    return
  }

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      try {
        e.preventDefault()

        const eventName = form?.dataset?.eventName || null

        if (!eventName) {
          throw Error(`Event name not found on form.`)
        }

        // these are standard built-in events. if you want to accept any other event, disable this
        // prettier-ignore
        const acceptableEventNames = [
          'add_to_cart',
          'login',
          // 'purchase',
          'remove_from_cart',
          'search',
          'select_content',
          'share',
          'sign_up',
          'tutorial_begin',
          'tutorial_complete',
        ]

        if (!acceptableEventNames.includes(eventName)) {
          throw Error('Unrecognized event name')
        }

        let dataLayerObject = null

        switch (eventName) {
          case 'add_to_cart':
            dataLayerObject = create_datalayer___add_to_cart(dataLayerObject, eventName)
            break

          case 'login':
            dataLayerObject = create_datalayer___login(dataLayerObject, eventName)
            break

          case 'remove_from_cart':
            dataLayerObject = create_datalayer___remove_from_cart(dataLayerObject, eventName)
            break

          case 'search':
            const searchValue = form?.elements?.search?.value || ''
            const regionValue = form?.elements?.region?.value || ''
            dataLayerObject = create_datalayer___search(dataLayerObject, eventName, searchValue, regionValue)
            break

          case 'select_content':
            dataLayerObject = create_datalayer___select_content(dataLayerObject, eventName)
            break

          case 'share':
            dataLayerObject = create_datalayer___share(dataLayerObject, eventName)
            break

          case 'sign_up':
            dataLayerObject = create_datalayer___sign_up(dataLayerObject, eventName)
            break

          case 'tutorial_begin':
            dataLayerObject = create_datalayer___tutorial_begin(dataLayerObject, eventName)
            break

          case 'tutorial_complete':
            dataLayerObject = create_datalayer___tutorial_complete(dataLayerObject, eventName)
            break
        }

        if (Object.keys(dataLayerObject).length === 0) {
          throw Error('dataLayerObject is empty')
        }

        pushToDataLayer(dataLayerObject)

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
  })
}
