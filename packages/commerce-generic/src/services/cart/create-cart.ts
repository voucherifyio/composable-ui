import { CommerceService } from '@composable/types'
import { generateEmptyCart, saveCart } from '../../data/cartDataInMemory'

export const createCart: CommerceService['createCart'] = async () => {
  return saveCart(generateEmptyCart())
}
