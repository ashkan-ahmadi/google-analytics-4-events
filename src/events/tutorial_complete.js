import { content_types, methods } from '../constants.js'
import { generateRandomUUID, getRandomItemFromArray } from '../functions.js'

export default function create_datalayer___tutorial_complete(dataLayerObject, eventName) {
  // There are no parameters for this event.
  dataLayerObject = {
    event: eventName,
  }

  return dataLayerObject
}
