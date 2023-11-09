import { cartToVoucherifyOrder } from './cart-to-voucherify-order'
import {
  getRedeemablesForRedemption,
  getRedeemablesForValidation,
} from '../data/get-redeemables-for-validation'
import { Cart } from '@composable/types'
import {
  RedemptionsRedeemStackableResponse,
  StackableRedeemableResponse,
  VoucherifyServerSide,
} from '@voucherify/sdk'

type RedeemCouponsParam = {
  cart: Cart
  codes: string[]
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
  const { cart, codes, voucherify } = params

  const order = cartToVoucherifyOrder(cart)

  return await voucherify.redemptions.redeemStackable({
    redeemables: [...getRedeemablesForRedemption(codes)],
    order,
    options: { expand: ['order'] },
  })
}
