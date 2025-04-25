import { content_types, methods } from '../constants.js'
import { generateRandomUUID, getRandomItemFromArray } from '../functions.js'

export default function create_datalayer___search(dataLayerObject, eventName, searchValue, regionValue) {
  dataLayerObject = {
    event: eventName,
    search_term: searchValue,
    region: regionValue, // custom parameter/dimension
  }

  return dataLayerObject
}
