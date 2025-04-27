import { content_types, methods } from '../constants.js'
import { generateRandomInteger, generateRandomUUID, getRandomItemFromArray } from '../functions.js'

export default function create_datalayer___purchase(dataLayerObject, eventName) {
  const items = [
    {
      item_id: generateRandomUUID(),
      item_name: 'Trip to Paris',
      item_category: 'trip',
      price: 450,
      discount: 50,
      quantity: 1,
    },
    {
      item_id: generateRandomUUID(),
      item_name: 'Trip to Vienna',
      item_category: 'trip',
      price: generateRandomInteger(100, 1000),
      quantity: generateRandomInteger(1, 5),
    },
  ]

  const value = items.reduce((total, item) => {
    return total + item.quantity * item.price
  }, 0)

  dataLayerObject = {
    event: eventName,
    currency: 'EUR',
    value: value,
    items: items,
  }

  return dataLayerObject
}
