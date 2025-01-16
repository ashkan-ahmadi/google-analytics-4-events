import { getRandomItemFromArray, pushToDataLayer, showToast, generateRandomInteger, generateRandomUUID } from '../functions.js'

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

        // prettier-ignore
        const acceptableEventNames = [
          'login',
          // 'purchase',
          'search',
          'select_content',
          'share',
          'sign_up'
        ]

        if (!acceptableEventNames.includes(eventName)) {
          throw Error('Unrecognized event name')
        }

        const methods = ['Email', 'Google', 'Facebook', 'Twitter/X', 'LinkedIn', 'Apple']
        const content_types = ['blog', 'discount', 'coupon', 'product', 'page']
        const id = generateRandomInteger()
        const uuid = generateRandomUUID()

        let dataLayerObject = null

        switch (eventName) {
          case 'login':
            dataLayerObject = {
              event: eventName,
              method: getRandomItemFromArray(methods), // string|optional
            }
            break

          case 'search':
            const searchValue = form?.elements?.search?.value || ''
            const regionValue = form?.elements?.region?.value || ''

            dataLayerObject = {
              event: eventName,
              search_term: searchValue,
              region: regionValue, // custom parameter/dimension
            }
            break

          case 'select_content':
            dataLayerObject = {
              event: eventName,
              content_type: getRandomItemFromArray(content_types),
              content_id: uuid,
            }
            break

          case 'share':
            dataLayerObject = {
              event: eventName,
              method: getRandomItemFromArray(methods),
              content_type: getRandomItemFromArray(content_types),
              item_id: id,
            }
            break

          case 'sign_up':
            dataLayerObject = {
              event: eventName,
              method: getRandomItemFromArray(methods),
            }
            break

          // case '':
          //   dataLayerObject =
          //   break

          // case '':
          //   dataLayerObject =
          //   break

          // case '':
          //   dataLayerObject =
          //   break
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
