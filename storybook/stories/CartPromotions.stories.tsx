import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CartPromotions } from '@composable/ui'

export default {
  title: 'Components/CartPromotions',
  component: CartPromotions,
  argTypes: {},
} as ComponentMeta<typeof CartPromotions>

const Template: ComponentStory<typeof CartPromotions> = (args) => (
  <CartPromotions {...args} />
)

export const Default = Template.bind({})
Default.args = {
  promotions: [
    {
      id: 'id',
      status: 'APPLICABLE',
      object: 'promotion_tier',
      label: '5$ OFF',
      discount: '5',
    },
    {
      id: 'id',
      status: 'APPLICABLE',
      object: 'promotion_tier',
      label: '10$ OFF',
      discount: '15',
    },
  ],
}
