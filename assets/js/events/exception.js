import { content_types, methods } from '../constants.js'
import { generateRandomUUID, getRandomItemFromArray } from '../functions.js'

// https://developers.google.com/analytics/devguides/collection/ga4/exceptions
export default function create_datalayer___exception(dataLayerObject, eventName, error, form) {
  dataLayerObject = {
    event: eventName,
    fatal: getRandomItemFromArray([true, false]), // set to true if the error is fatal
    error_message: error?.message || '',
    error_stack: error?.stack || '',
    form_id: form?.id || '',
    form_name: form?.name || '',
    page_title: form?.elements['title']?.value || '',
    page_permalink: form?.elements['permalink']?.value || '',
  }

  return dataLayerObject
}
