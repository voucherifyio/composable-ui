import { Cart, CommerceService, Redeemable } from '@composable/types'

export const addUnitDiscount = async (
  unitDiscountRedeemables: Redeemable[],
  commerceService: CommerceService,
  cart: Cart
): Promise<Cart | undefined> => {
  if (unitDiscountRedeemables.length > 0) {
    const promises = unitDiscountRedeemables.map(async (redeemable) => {
      if (redeemable.unitProductId && redeemable.unitProductQuantity) {
        return await commerceService.addCartItem({
          cartId: cart.id,
          productId: redeemable.unitProductId,
          quantity: redeemable.unitProductQuantity,
        })
      }
    })

    const updatedCartsWithUnitDiscounts = await Promise.all(promises)
    const currentCartWithUnitDiscounts =
      updatedCartsWithUnitDiscounts[updatedCartsWithUnitDiscounts.length - 1]

    if (!currentCartWithUnitDiscounts) {
      throw new Error('[voucherify][addCartItemFunction] No cart found.')
    }

    return currentCartWithUnitDiscounts
  }
}
