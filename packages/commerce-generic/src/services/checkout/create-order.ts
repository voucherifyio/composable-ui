import { CommerceService } from '@composable/types'
import { getCart } from '../../data/cart-data-in-memory'
import { generateOrder } from '../../data/oder-data-in-memory'
import shippingMethods from '../../data/shipping-methods.json'

export const createOrder: CommerceService['createOrder'] = async ({
  checkout,
}) => {
  const cart = getCart(checkout.cartId)

  if (!cart) {
    throw new Error(
      `[createOrder] Could not find cart by id: ${checkout.cartId}`
    )
  }

  return generateOrder(cart, checkout)
}
