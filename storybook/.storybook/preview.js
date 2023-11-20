import { theme } from '@composable/ui'
import { addDecorator } from '@storybook/react'
import { IntlProvider } from 'react-intl'
import { intlConfig } from '../../composable-ui/src/server/intl/index'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
}
const intlDecorator = (Story, context) => {
  const locale = context.globals?.locale || 'en-US'
  const storyConfig = intlConfig.find((config) => config.locale === locale)
  if (!storyConfig) {
    console.error(`Missing intl config for locale: ${locale}`)
  }
  return (
    <IntlProvider locale={locale} messages={storyConfig.keys}>
      <Story />
    </IntlProvider>
  )
}

addDecorator(intlDecorator)
