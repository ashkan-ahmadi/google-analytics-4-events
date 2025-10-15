import { content_types, methods } from '../constants.js'
import { generateRandomUUID, getRandomItemFromArray } from '../functions.js'

export default function create_datalayer___select_content(dataLayerObject, eventName) {
  dataLayerObject = {
    event: eventName,
    content_type: getRandomItemFromArray(content_types),
    content_id: generateRandomUUID(),
  }

  return dataLayerObject
}
