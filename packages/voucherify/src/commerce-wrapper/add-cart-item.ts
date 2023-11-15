import { CartWithDiscounts, CommerceService } from '@composable/types'
import { cartWithDiscount } from '../../data/cart-with-discount'
import { VoucherifyServerSide } from '@voucherify/sdk'
import { getCartDiscounts } from '../../data/persit'
import { validateCouponsAndPromotions } from '../validate-discounts'
import { addUnitDiscount } from './add-unit-discount'

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

    // When a promotion includes free product (unit type discount)
    if (unitDiscountRedeemables) {
      const cartWithUnitDiscounts = await addUnitDiscount(
        unitDiscountRedeemables,
        commerceService,
        cart
      )
      if (cartWithUnitDiscounts)
        return cartWithDiscount(
          cartWithUnitDiscounts,
          validationResult,
          promotionsResult
        )
    }

    return cartWithDiscount(voucherifyCart, validationResult, promotionsResult)
  }
