import { OrderWithDiscounts } from '@composable/types/src/voucherify/order-with-discounts'
import { centToString, toCent } from '../src/to-cent'
import { Cart, Order } from '@composable/types'
import { ValidationValidateStackableResponse } from '@voucherify/sdk'

export const orderWithDiscount = (
  order: Order | null,
  cart: Cart,
  validationResponse: ValidationValidateStackableResponse | false
): OrderWithDiscounts | null => {
  const discountAmount = centToString(
    validationResponse ? validationResponse.order?.discount_amount : 0
  )
  const grandPrice = centToString(
    validationResponse
      ? validationResponse.order?.total_amount
      : toCent(cart.summary.totalPrice)
  )
  const totalDiscountAmount = centToString(
    validationResponse
      ? validationResponse.order?.total_applied_discount_amount
      : 0
  )
  if (!order) {
    return null
  }
  return {
    ...order,
    orderType: 'OrderWithDiscounts',
    summary: {
      ...cart.summary,
      discountAmount,
      totalDiscountAmount,
      grandPrice,
    },
  }
}
