import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { Section } from '@composable/ui'
import { CartEmptyState, CartLoadingState } from '../cart'
import { useCart } from '../../hooks'
import { APP_CONFIG } from '../../utils/constants'
import { OrderTotals } from './order-totals'
import { ProductsList } from './products-list'

interface BagSummaryMobileProps {
  accordionProps?: AccordionProps
}

export const BagSummaryMobile = ({ accordionProps }: BagSummaryMobileProps) => {
  const intl = useIntl()
  const { cart } = useCart()

  const currencyFormatConfig: FormatNumberOptions = {
    currency: APP_CONFIG.CURRENCY_CODE,
    style: 'currency',
  }

  return (
    <Accordion allowToggle bg={'white'} mb={4} {...accordionProps}>
      <AccordionItem>
        <AccordionButton bg={'white'} _hover={{ bg: 'white' }}>
          <Text flex="1" textAlign="left" textStyle="Desktop/Body-S">
            {intl.formatMessage(
              {
                id: cart?.quantity
                  ? 'cart.drawer.titleCount'
                  : 'cart.drawer.title',
              },
              { count: cart?.quantity }
            )}{' '}
            <AccordionIcon />
          </Text>
          <Text textStyle={'Desktop/S'}>
            {intl.formatNumber(
              parseFloat(cart?.summary?.grandPrice || '0'),
              currencyFormatConfig
            )}
          </Text>
        </AccordionButton>
        <AccordionPanel p={'0'}>
          {cart?.isLoading ? (
            <CartLoadingState />
          ) : cart?.isEmpty ? (
            <CartEmptyState />
          ) : (
            <Section
              boxProps={{
                padding: { base: '0.6rem 1.5rem' },
              }}
            >
              <Stack spacing="2" borderBottomWidth={1}>
                <ProductsList products={cart?.items} />
              </Stack>

              <OrderTotals
                subtotal={intl.formatNumber(
                  parseFloat(cart?.summary?.subtotalPrice ?? '0'),
                  currencyFormatConfig
                )}
                deliveryTitle={intl.formatMessage({
                  id: 'cart.summary.shipping.complimentaryDelivery',
                })}
                delivery={intl.formatMessage({
                  id: 'cart.summary.shipping.free',
                })}
                tax={intl.formatNumber(
                  parseFloat(cart?.summary?.taxes ?? '0'),
                  currencyFormatConfig
                )}
                totalTitle={intl.formatMessage({
                  id: 'checkout.orderSummary.orderTotal',
                })}
                total={intl.formatNumber(
                  parseFloat(cart?.summary?.totalPrice ?? '0'),
                  currencyFormatConfig
                )}
                totalDiscountAmountTitle={intl.formatMessage({
                  id: 'cart.summary.totalDiscountAmount',
                })}
                totalDiscountAmount={intl.formatNumber(
                  parseFloat(cart?.summary?.discountAmount ?? '0'),
                  currencyFormatConfig
                )}
                grandPriceTitle={intl.formatMessage({
                  id: 'cart.summary.grandPrice',
                })}
                grandPrice={intl.formatNumber(
                  parseFloat(cart?.summary?.grandPrice ?? '0'),
                  currencyFormatConfig
                )}
              />
            </Section>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
