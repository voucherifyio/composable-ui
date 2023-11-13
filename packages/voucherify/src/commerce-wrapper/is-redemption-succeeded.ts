import { RedeemCouponsResponse } from '../redeem-coupons'

export const isRedemptionSucceeded = (
  redemptionResult: RedeemCouponsResponse,
  coupons: string[]
): boolean => {
  const isRedemptionOfAllCouponsSuccessful =
    redemptionResult &&
    redemptionResult.redemptions.every(
      (redemption) => redemption.result === 'SUCCESS'
    )

  if (!isRedemptionOfAllCouponsSuccessful) {
    throw new Error('Redemption failed.')
  }

  return isRedemptionOfAllCouponsSuccessful
}
