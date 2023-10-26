import { CommerceService } from '@composable/types'
import { getCart as getCartFromStorage } from '../../data/cartDataInMemory'

export const getCart: CommerceService['getCart'] = async ({ cartId }) => {
  if (!cartId) {
    return null
  }

  return getCartFromStorage(cartId) || null
}
