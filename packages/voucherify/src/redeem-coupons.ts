import { cartToVoucherifyOrder } from './cart-to-voucherify-order'
import {
  getRedeemablesForRedemption,
  getRedeemablesForValidation,
} from '../data/get-redeemables-for-validation'
import { Cart } from '@composable/types'
import {
  RedemptionsRedeemStackableResponse,
  StackableRedeemableObject,
  StackableRedeemableResponse,
  VoucherifyServerSide,
} from '@voucherify/sdk'

export type RedeemCouponsParam = {
  cart: Cart
  coupons: {
    id: string
    type: StackableRedeemableObject
  }[]
  voucherify: ReturnType<typeof VoucherifyServerSide>
}

export type RedeemCouponsResponse =
  | false
  | (RedemptionsRedeemStackableResponse & {
      inapplicable_redeemables?: StackableRedeemableResponse[]
    })

export const redeemCoupons = async (
  params: RedeemCouponsParam
): Promise<RedeemCouponsResponse> => {
  const { cart, coupons, voucherify } = params

  const order = cartToVoucherifyOrder(cart)

  return await voucherify.redemptions.redeemStackable({
    redeemables: [...getRedeemablesForRedemption(coupons)],
    order,
    options: { expand: ['order'] },
  })
}
