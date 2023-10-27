import { CommerceService } from '@composable/types'
import { getOrder as getOrerFromStorage } from '../../data/oder-data-in-memory'
import order from '../../data/order.json'
import shippingMethods from '../../data/shipping-methods.json'

export const getOrder: CommerceService['getOrder'] = async ({ orderId }) => {
  const order = getOrerFromStorage(orderId)

  if (!order) {
    throw new Error(`[getOrder] Could not found order: ${orderId}`)
  }

  return {
    ...order,
    shipping_method: shippingMethods[0],
    created_at: Date.now(),
  }
}
