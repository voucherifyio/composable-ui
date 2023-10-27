import { CommerceService } from '@composable/types'
import { generateEmptyCart, saveCart } from '../../data/cart-data-in-memory'

export const createCart: CommerceService['createCart'] = async () => {
  return saveCart(generateEmptyCart())
}
