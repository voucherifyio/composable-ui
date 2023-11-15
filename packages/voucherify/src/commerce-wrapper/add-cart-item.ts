import { CartWithDiscounts, CommerceService } from '@composable/types'
import { cartWithDiscount } from '../../data/cart-with-discount'
import { VoucherifyServerSide } from '@voucherify/sdk'
import { getCartDiscounts } from '../../data/persit'
import { validateCouponsAndPromotions } from '../validate-discounts'

export const addCartItemFunction =
  (
    commerceService: CommerceService,
    voucherify: ReturnType<typeof VoucherifyServerSide>
  ) =>
  async (
    ...props: Parameters<CommerceService['addCartItem']>
  ): Promise<CartWithDiscounts> => {
    const cart = await commerceService.addCartItem(...props)

    const codes = await getCartDiscounts(props[0].cartId)

    const { validationResult, promotionsResult } =
      await validateCouponsAndPromotions({
        voucherify,
        cart,
        codes,
      })

    const voucherifyCart = cartWithDiscount(
      cart,
      validationResult,
      promotionsResult
    )

    const unitDiscountRedeemables = voucherifyCart.redeemables.filter(
      (redeemable) => {
        const itemIdWithUnitDiscount = redeemable.unitProductId
        return (
          itemIdWithUnitDiscount !== undefined &&
          !voucherifyCart.items.some(
            (item) => item.id === itemIdWithUnitDiscount
          )
        )
      }
    )

    if (unitDiscountRedeemables.length > 0) {
      const promises = unitDiscountRedeemables.map(async (redeemable) => {
        if (redeemable.unitProductId) {
          return await commerceService.addCartItem({
            cartId: cart.id,
            productId: redeemable.unitProductId,
            quantity: 1,
          })
        }
      })

      const updatedCarts = await Promise.all(promises)

      const lastCart = updatedCarts[updatedCarts.length - 1]
      if (!lastCart) {
        throw new Error('[voucherify][addCartItemFunction] No cart found.')
      }
      return cartWithDiscount(lastCart, validationResult, promotionsResult)
    }

    return cartWithDiscount(voucherifyCart, validationResult, promotionsResult)
  }
