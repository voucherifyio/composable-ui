import { Order } from '../commerce'

export type OrderWithDiscounts = Order & {
  orderType: 'OrderWithDiscounts'
  summary: {
    /**
     * Sum of all order-level discounts applied to the order.
     */
    discountAmount: string
    /**
     * Sum of all order-level AND all product-specific discounts applied to the order.
     */
    totalDiscountAmount: string
    /**
     * Order amount after applying all the discounts.
     */
    grandPrice: string
  }
}
