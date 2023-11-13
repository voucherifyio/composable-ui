import { CommerceService } from '@composable/types'
import {
  StackableRedeemableObject,
  VoucherifyServerSide,
} from '@voucherify/sdk'
import { redeemCoupons } from '../redeem-coupons'
import { isRedemptionSucceeded } from './is-redemption-succeeded'

export const redeemCouponsFunction =
  (
    commerceService: CommerceService,
    voucherify: ReturnType<typeof VoucherifyServerSide>
  ) =>
  async ({
    cartId,
    coupons,
  }: {
    cartId: string
    coupons: {
      id: string
      type: StackableRedeemableObject
    }[]
  }) => {
    const cart = await commerceService.getCart({ cartId })

    if (!cart) {
      throw new Error(
        `[voucherify][redeemCoupon] cart not found by id: ${cartId}`
      )
    }

    const redemptionResult = await redeemCoupons({
      cart,
      coupons,
      voucherify,
    })

    const redemptionsResult = isRedemptionSucceeded(redemptionResult)
    return {
      result: redemptionsResult,
    }
  }
