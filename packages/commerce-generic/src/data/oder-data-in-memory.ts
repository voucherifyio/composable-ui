import products from './products.json'
import { CheckoutInput, Order, Cart } from '@composable/types'
import { randomUUID } from 'crypto'
import shippingMethods from './shipping-methods.json'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

// In memory storage for orders data
// const ordersData: Map<string, Order> = new Map()

const storageFilePath = path.join(
  os.tmpdir(),
  'composable-ui-temp-order-storage.json'
)

console.log({ storageFilePath })

const fileExist = async (filePath: string) => {
  try {
    await fs.access(filePath)
    return true
  } catch (e) {
    console.log(`[ordertDataInMemory] File ${storageFilePath} does not exists`)
    return false
  }
}

const getMapFromFile = async () => {
  if (!(await fileExist(storageFilePath))) {
    return new Map<string, Order>()
  }
  const buffer = await fs.readFile(storageFilePath)
  const map = new Map<string, Order>(JSON.parse(buffer.toString()))
  console.log({ orderMap: map })
  return map
}
const saveMapToFile = async (map: Map<string, Order>) => {
  await fs.writeFile(storageFilePath, JSON.stringify(Array.from(map.entries())))
  return map
}

export const getOrder = async (orderId: string): Promise<Order | undefined> => {
  const ordersData = await getMapFromFile()
  return ordersData.get(orderId)
}

export const saveOrder = async (order: Order) => {
  const ordersData = await getMapFromFile()
  ordersData.set(order.id, order)
  await saveMapToFile(ordersData)
  return order
}

export const generateOrder = (
  cart: Cart,
  checkoutInput: CheckoutInput
): Order => {
  return {
    id: randomUUID(),
    status: 'complete',
    payment: 'unpaid',
    shipping: 'unfulfilled',
    customer: {
      email: checkoutInput.customer.email,
    },
    shipping_address: {
      phone_number: '',
      city: '',
      ...checkoutInput.shipping_address,
    },
    billing_address: {
      phone_number: '',
      city: '',
      ...checkoutInput.billing_address,
    },
    shipping_method: shippingMethods[0],
    created_at: Date.now(),
    items: cart.items,
    summary: cart.summary,
  }
}
