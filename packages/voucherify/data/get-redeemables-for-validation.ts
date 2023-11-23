import {
  PromotionsValidateResponse,
  StackableRedeemableObject,
} from '@voucherify/sdk'

export const getRedeemablesForValidation = (couponCodes: string[]) =>
  couponCodes.map((couponCode) => ({
    id: couponCode,
    object: 'voucher' as const,
  }))

export const getRedeemablesForRedemption = (
  coupons: { id: string; type: StackableRedeemableObject }[]
) =>
  coupons.map((coupon) => ({
    id: coupon.id,
    object: coupon.type,
  }))

export const getRedeemablesForValidationFromPromotions = (
  promotionResult: PromotionsValidateResponse
) =>
  promotionResult.promotions?.map((promotion) => ({
    id: promotion.id,
    object: 'promotion_tier' as const,
  })) || []
