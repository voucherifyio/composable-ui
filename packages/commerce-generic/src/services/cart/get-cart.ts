import { CommerceService } from '@composable/types'
import { getCart as getCartFromStorage } from '../../data/cart-data-in-memory'

export const getCart: CommerceService['getCart'] = async ({ cartId }) => {
  if (!cartId) {
    return null
  }

  return (await getCartFromStorage(cartId)) || null
}
