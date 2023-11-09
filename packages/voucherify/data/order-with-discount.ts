import { OrderWithDiscounts } from '@composable/types/src/voucherify/order-with-discounts'
import { centToString, toCent } from '../src/to-cent'
import { Cart, Order } from '@composable/types'
import {
  RedemptionsRedeemStackableResponse,
  ValidationValidateStackableResponse,
} from '@voucherify/sdk'

export const orderWithDiscount = (
  order: Order | null,
  cart: Cart,
  redemptionResponse: RedemptionsRedeemStackableResponse | false
): OrderWithDiscounts | null => {
  const discountAmount = centToString(
    redemptionResponse ? redemptionResponse.order?.discount_amount : 0
  )
  const grandPrice = centToString(
    redemptionResponse
      ? redemptionResponse.order?.total_amount
      : toCent(cart.summary.totalPrice)
  )
  const totalDiscountAmount = centToString(
    redemptionResponse
      ? redemptionResponse.order?.total_applied_discount_amount
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
