import { CommerceService } from '@composable/types'
import { VoucherifyServerSide } from '@voucherify/sdk'
import { redeemCoupons } from '../redeem-coupons'
import { isRedemptionSucceeded } from './is-redemption-succeeded'

export const redeemCouponsFunction =
  (
    commerceService: CommerceService,
    voucherify: ReturnType<typeof VoucherifyServerSide>
  ) =>
  async ({ cartId, coupons }: { cartId: string; coupons: string[] }) => {
    const cart = await commerceService.getCart({ cartId })

    if (!cart) {
      throw new Error(
        `[voucherify][redeemCoupon] cart not found by id: ${cartId}`
      )
    }

    const redemptionResult = await redeemCoupons({
      cart,
      voucherify,
      codes: coupons,
    })

    const redemptionsResult = isRedemptionSucceeded(redemptionResult, coupons)
    return {
      result: redemptionsResult,
    }
  }
