import { CommerceService } from '@composable/types'
import {
  generateCartItem,
  getCart,
  saveCart,
  calculateCartSummary,
  generateEmptyCart,
} from '../../data/cart-data-in-memory'

export const addCartItem: CommerceService['addCartItem'] = async ({
  cartId,
  productId,
  quantity,
  variantId,
}) => {
  const cart = getCart(cartId) || generateEmptyCart(cartId)

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

  return saveCart(cart)
}
