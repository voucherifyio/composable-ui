import { CommerceService } from '@composable/types'
import { getCart, saveCart } from '../../data/cartDataInMemory'

export const updateCartItem: CommerceService['updateCartItem'] = async ({
  cartId,
  productId,
  quantity,
}) => {
  const cart = getCart(cartId)

  if (!cart) {
    throw new Error(
      `[updateCartItem] Could not found cart with requested cart id: ${cartId}`
    )
  }

  const cartItem = cart.items.find((item) => item.id === productId)

  if (!cartItem) {
    throw new Error(
      `[updateCartItem] Could not found cart item with requested product id: ${productId}`
    )
  }

  cartItem.quantity = quantity

  return saveCart(cart)
}
