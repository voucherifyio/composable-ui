import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CouponForm } from '@composable/ui'

export default {
  title: 'Components/CouponForm',
  component: CouponForm,
  argTypes: {},
} as ComponentMeta<typeof CouponForm>

const Template: ComponentStory<typeof CouponForm> = (args) => (
  <CouponForm {...args} />
)

export const DefaultCouponForm = Template.bind({})
DefaultCouponForm.args = {
  cart: {
    id: 'cart_id',
    cartType: 'CartWithDiscounts',
    redeemables: [],
    items: [],
    summary: {
      subtotalPrice: '200',
      taxes: '10',
      totalPrice: '210',
      shipping: '0',
      discountAmount: '15',
      totalDiscountAmount: '',
      grandPrice: '',
    },
  },
}

export const CouponFormWithVouchers = Template.bind({})
CouponFormWithVouchers.args = {
  cart: {
    id: 'cart_id',
    cartType: 'CartWithDiscounts',
    redeemables: [
      {
        id: 'red1',
        status: 'APPLICABLE',
        object: 'voucher',
        label: 'BLACK_FRIDAY',
        discount: '10',
      },
      {
        id: 'red2',
        status: 'APPLICABLE',
        object: 'voucher',
        label: '5$ OFF',
        discount: '5',
      },
    ],
    items: [],
    summary: {
      subtotalPrice: '200',
      taxes: '10',
      totalPrice: '210',
      shipping: '0',
      discountAmount: '15',
      totalDiscountAmount: '',
      grandPrice: '',
    },
  },
}
