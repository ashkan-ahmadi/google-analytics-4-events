import { pushToDataLayer, showToast } from './functions.js'

// EVENTS
import create_datalayer___add_to_cart from './events/add_to_cart.js'
import create_datalayer___login from './events/login.js'
import create_datalayer___remove_from_cart from './events/remove_from_cart.js'
import create_datalayer___search from './events/search.js'
import create_datalayer___select_content from './events/select_content.js'
import create_datalayer___share from './events/share.js'
import create_datalayer___sign_up from './events/sign_up.js'
import create_datalayer___tutorial_begin from './events/tutorial_begin.js'
import create_datalayer___tutorial_complete from './events/tutorial_complete.js'
import create_datalayer___exception from './events/exception.js'

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

        let dataLayerObject = {}

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
        let dataLayerObject = {}
        const eventName = 'exception'

        console.error(error)

        dataLayerObject = create_datalayer___exception(dataLayerObject, eventName, error, form)

        pushToDataLayer(dataLayerObject)
        showToast(error?.message || 'There was an error. Check Console.')
      }
    })
  })
}
