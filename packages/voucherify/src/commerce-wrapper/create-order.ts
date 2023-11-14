import { CommerceService } from '@composable/types'
import { VoucherifyServerSide } from '@voucherify/sdk'
import { orderWithDiscount } from '../../data/order-with-discount'
import { validateCouponsAndPromotions } from '../validate-discounts'
import { getCartDiscounts } from '../../data/persit'
import { saveOrder } from '../../../commerce-generic/src/data/persit'
import { generateOrderFromCart } from '../../../commerce-generic/src/services'

export const createOrderFunction =
  (
    commerceService: CommerceService,
    voucherify: ReturnType<typeof VoucherifyServerSide>
  ) =>
  async (...props: Parameters<CommerceService['createOrder']>) => {
    const cartId = props[0].checkout.cartId
    const cart = await commerceService.getCart({
      cartId: cartId,
    })

    const codes = await getCartDiscounts(cartId)

    if (!cart) {
      throw new Error('[voucherify][createOrderFunction] No cart found.')
    }

    const { validationResult, promotionsResult } =
      await validateCouponsAndPromotions({
        voucherify,
        cart,
        codes,
      })

    const orderWithDiscounts = orderWithDiscount(
      generateOrderFromCart(cart, props[0].checkout),
      cart,
      validationResult
    )

    if (!orderWithDiscounts) {
      throw new Error(
        '[voucherify][createOrderFunction] No order with discounts found.'
      )
    }

    return saveOrder(orderWithDiscounts)
  }
