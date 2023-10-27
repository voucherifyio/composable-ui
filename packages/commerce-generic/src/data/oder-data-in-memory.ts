import products from './products.json'
import { CheckoutInput, Order, Cart } from '@composable/types'
import { randomUUID } from 'crypto'
import shippingMethods from './shipping-methods.json'

// In memory storage for orders data
const ordersData: Map<string, Order> = new Map()

export const getOrder = (orderId: string): Order | undefined => {
  console.log(`getOrder`, { orderId, ordersData })
  return ordersData.get(orderId)
}

export const saveOrder = (order: Order) => {
  console.log(`saveOrder`, { order, ordersData })
  ordersData.set(order.id, order)
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
