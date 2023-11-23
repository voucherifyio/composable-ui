import { CommerceService } from '@composable/types'
import { getOrder as getOrderFromStorage } from '../../data/persit'
import shippingMethods from '../../data/shipping-methods.json'

export const getOrder: CommerceService['getOrder'] = async ({ orderId }) => {
  const order = await getOrderFromStorage(orderId)

  if (!order) {
    throw new Error(`[getOrder] Could not found order: ${orderId}`)
  }

  return {
    ...order,
    shipping_method: shippingMethods[0],
    created_at: Date.now(),
  }
}
