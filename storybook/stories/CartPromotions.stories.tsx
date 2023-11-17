import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CartPromotions } from '@composable/ui'
import type { Meta } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/CartPromotions',
  component: CartPromotions,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CartPromotions>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CartPromotions> = (args) => (
  <CartPromotions {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  promotions: [],
}
