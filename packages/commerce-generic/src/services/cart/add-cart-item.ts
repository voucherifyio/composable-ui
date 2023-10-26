import { CommerceService } from '@composable/types'
import {
  generateCartItem,
  getCart,
  calculateCartSummary,
} from '../../data/cartDataInMemory'
import cart from '../../data/cart.json'

export const addCartItem: CommerceService['addCartItem'] = async ({
  cartId,
  productId,
  quantity,
  variantId,
}) => {
  const cart = getCart(cartId)

  if (!cart) {
    throw new Error(
      `[addCartItem] Could not found cart with requested cart id: ${cartId}`
    )
  }

  const isProductInCartAlready = cart.items.some(
    (item) => item.id === productId
  )

  if (isProductInCartAlready) {
    cart.items.find((item) => item.id === productId)!.quantity++
  } else {
    const newItem = generateCartItem(productId, quantity)
    cart.items.push(newItem)
  }
  cart.summary = calculateCartSummary(cart.items)

  return {
    ...cart,
  }
}
