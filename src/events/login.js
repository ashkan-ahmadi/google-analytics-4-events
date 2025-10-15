import { content_types, methods } from '../constants.js'
import { generateRandomUUID, getRandomItemFromArray } from '../functions.js'

export default function create_datalayer___login(dataLayerObject, eventName) {
  dataLayerObject = {
    event: eventName,
    method: getRandomItemFromArray(methods), // string|optional
  }

  return dataLayerObject
}
