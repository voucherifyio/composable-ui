import { PromotionsValidateResponse } from '@voucherify/sdk'

export const getRedeemablesForValidation = (couponCodes: string[]) =>
  couponCodes.map((couponCode) => ({
    id: couponCode,
    object: 'voucher' as const,
  }))

export const getRedeemablesForRedemption = (couponCodes: string[]) =>
  couponCodes.map((couponCode) => ({
    id: couponCode,
    object: 'voucher' as const,
  }))

export const getRedeemablesForValidationFromPromotions = (
  promotionResult: PromotionsValidateResponse
) =>
  promotionResult.promotions?.map((promotion) => ({
    id: promotion.id,
    object: 'promotion_tier' as const,
  })) || []
