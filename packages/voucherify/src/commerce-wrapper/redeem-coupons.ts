import { CommerceService } from '@composable/types'
import {
  StackableRedeemableObject,
  VoucherifyServerSide,
} from '@voucherify/sdk'
import { redeemCoupons } from '../redeem-coupons'
import { isRedemptionSuccessful } from './is-redemption-successful'

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
        `[voucherify][redeemCoupons] cart not found by id: ${cartId}`
      )
    }

    const redemptionsResponse = await redeemCoupons({
      cart,
      coupons,
      voucherify,
    })

    const redemptionsResult = isRedemptionSuccessful(redemptionsResponse)
    return {
      result: redemptionsResult,
    }
  }
