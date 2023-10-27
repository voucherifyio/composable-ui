import { CommerceService } from '@composable/types'
import {
  getCart,
  calculateCartSummary,
  saveCart,
} from '../../data/cart-data-in-memory'

export const deleteCartItem: CommerceService['deleteCartItem'] = async ({
  cartId,
  productId,
}) => {
  const cart = getCart(cartId)

  if (!cart) {
    throw new Error(
      `[deleteCartItem] Could not found cart with requested cart id: ${cartId}`
    )
  }

  cart.items = cart.items.filter((item) => item.id !== productId)
  cart.summary = calculateCartSummary(cart.items)

  return saveCart(cart)
}
