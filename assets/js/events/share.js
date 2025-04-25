import { content_types, methods } from '../constants.js'
import { generateRandomUUID, getRandomItemFromArray } from '../functions.js'

export default function create_datalayer___share(dataLayerObject, eventName) {
  dataLayerObject = {
    event: eventName,
    method: getRandomItemFromArray(methods),
    content_type: getRandomItemFromArray(content_types),
    item_id: generateRandomUUID(),
  }

  return dataLayerObject
}
