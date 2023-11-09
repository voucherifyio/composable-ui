import { RedeemCouponsResponse } from '../redeem-coupons'

export const isRedemptionSucceeded = (
  redemptionResult: RedeemCouponsResponse,
  coupon: string
): { isRedemptionSuccessful: boolean } => {
  const isRedemptionSuccessful =
    redemptionResult &&
    redemptionResult.redemptions.some(
      (redemption) =>
        redemption.voucher.id === coupon && redemption.result === 'SUCCESS'
    )

  if (!isRedemptionSuccessful) {
    throw new Error(`Redemption of code: ${coupon} failed.`)
  }

  return { isRedemptionSuccessful }
}
