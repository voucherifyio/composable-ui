import { CommerceService } from '@composable/types'
import { VoucherifyServerSide } from '@voucherify/sdk'
import { OrderWithDiscounts } from '@composable/types/src/voucherify/order-with-discounts'
import { orderWithDiscount } from '../../data/order-with-discount'
import { validateCouponsAndPromotions } from '../validate-discounts'
import { getCartDiscounts } from '../../data/persit'

export const createOrderFunction =
  (
    commerceService: CommerceService,
    voucherify: ReturnType<typeof VoucherifyServerSide>
  ) =>
  async (
    getCartProps: Parameters<CommerceService['getCart']>,
    getOrderProps: Parameters<CommerceService['getOrder']>
  ): Promise<OrderWithDiscounts | null> => {
    const cart = await commerceService.getCart(...getCartProps)
    const order = await commerceService.getOrder(...getOrderProps)

    const codes = await getCartDiscounts(getCartProps[0]?.cartId)

    if (!cart) {
      return null
    }

    const { validationResult, promotionsResult } =
      await validateCouponsAndPromotions({
        voucherify,
        cart,
        codes,
      })

    return orderWithDiscount(order, cart, validationResult)
  }
