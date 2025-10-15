import { content_types, methods } from '../constants.js'
import { generateRandomUUID, getRandomItemFromArray } from '../functions.js'

export default function create_datalayer___sign_up(dataLayerObject, eventName) {
  dataLayerObject = {
    event: eventName,
    method: getRandomItemFromArray(methods),
  }

  return dataLayerObject
}
