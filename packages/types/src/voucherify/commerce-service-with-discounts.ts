import {
  CommerceService,
  Cart,
  CartItem,
  CheckoutInput,
  Order,
} from '../commerce'
import { CartWithDiscounts } from './cart-with-discounts'
import { OrderWithDiscounts } from './order-with-discounts'

export interface CommerceServiceWithDiscounts extends CommerceService {
  // Extend existing commerce service methods to return cart with applied discount details

  addCartItem(
    ...params: Parameters<CommerceService['addCartItem']>
  ): Promise<CartWithDiscounts>
  createCart(): Promise<CartWithDiscounts>
  deleteCartItem(
    ...params: Parameters<CommerceService['deleteCartItem']>
  ): Promise<CartWithDiscounts>
  getCart(
    ...params: Parameters<CommerceService['getCart']>
  ): Promise<CartWithDiscounts | null>
  updateCartItem(
    ...params: Parameters<CommerceService['updateCartItem']>
  ): Promise<CartWithDiscounts>
  createOrder(params: {
    checkout: CheckoutInput
  }): Promise<OrderWithDiscounts | null>

  // Additional commerce endpoints to manage applied coupons

  addCoupon(props: {
    coupon: string
    cartId: string
  }): Promise<{ cart: CartWithDiscounts; result: boolean; errorMsg?: string }>
  deleteCoupon(props: {
    coupon: string
    cartId: string
  }): Promise<CartWithDiscounts>
  redeemCoupons(props: {
    cartId: string
    coupons: {
      id: string
      type: string
    }[]
  }): Promise<{ result: boolean }>
}
