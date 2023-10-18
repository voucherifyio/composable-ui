import {
  Cart,
  CartItemWithDiscounts,
  CartWithDiscounts,
  Redeemable,
} from '@composable/types'
import { ValidationValidateStackableResponse } from '@voucherify/sdk'
import { centToString, toCent } from './to-cent'

export const cartWithDiscount = (
  cart: Cart,
  validationResponse: ValidationValidateStackableResponse | false
): CartWithDiscounts => {
  const redeemables: Redeemable[] = validationResponse
    ? validationResponse.redeemables || []
    : [] // todo filter onlyr equired attributes
  const items: CartItemWithDiscounts[] = cart.items.map((item) => ({
    ...item,
    cartItemType: 'CartItemWithDiscounts',
    discounts: {
      subtotalAmount: '', // todo item level discounts
    },
  }))

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

  return {
    ...cart,
    cartType: 'CartWithDiscounts',
    summary: {
      ...cart.summary,
      discountAmount,
      totalDiscountAmount,
      grandPrice,
    },
    redeemables,
    items,
  }
}
