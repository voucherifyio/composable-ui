import { Cart, CheckoutInput, CommerceService, Order } from '@composable/types'
import { VoucherifyServerSide } from '@voucherify/sdk'
import { orderWithDiscount } from '../../data/order-with-discount'
import { validateCouponsAndPromotions } from '../validate-discounts'
import { getCartDiscounts } from '../../data/persit'
import { randomUUID } from 'crypto'
import shippingMethods from '../../../commerce-generic/src/data/shipping-methods.json'
import { saveOrder } from '../../../commerce-generic/src/data/persit'

export const createOrderFunction =
  (
    commerceService: CommerceService,
    voucherify: ReturnType<typeof VoucherifyServerSide>
  ) =>
  async (...props: Parameters<CommerceService['createOrder']>) => {
    const cartId = props[0].checkout.cartId
    const cart = await commerceService.getCart({
      cartId: cartId,
    })

    const codes = await getCartDiscounts(cartId)

    if (!cart) {
      return null
    }

    const { validationResult, promotionsResult } =
      await validateCouponsAndPromotions({
        voucherify,
        cart,
        codes,
      })

    const generateOrderFromCart = (
      cart: Cart,
      checkoutInput: CheckoutInput
    ): Order => {
      return {
        id: randomUUID(),
        status: 'complete',
        payment: 'unpaid',
        shipping: 'unfulfilled',
        customer: {
          email: checkoutInput.customer.email,
        },
        shipping_address: {
          phone_number: '',
          city: '',
          ...checkoutInput.shipping_address,
        },
        billing_address: {
          phone_number: '',
          city: '',
          ...checkoutInput.billing_address,
        },
        shipping_method: shippingMethods[0],
        created_at: Date.now(),
        items: cart.items,
        summary: cart.summary,
      }
    }

    const orderWithDiscounts = orderWithDiscount(
      generateOrderFromCart(cart, props[0].checkout),
      cart,
      validationResult
    )
    return saveOrder(orderWithDiscounts)
  }
