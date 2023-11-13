import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  Box,
  Divider,
  Stack,
  Text,
} from '@chakra-ui/react'
import { CartData, useCart, useCheckout } from 'hooks'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { APP_CONFIG } from '../../utils/constants'
import { OrderTotals } from './order-totals'
import { ProductsList } from './products-list'
import { CartPromotions } from '../cart/cart-promotions'
import { CouponForm } from '../forms/coupon-form'

export interface CheckoutSidebarProps {
  itemsBoxProps?: AccordionProps
  showTitle?: boolean
  cartData?: CartData
}

export const OrderSummary = ({
  itemsBoxProps,
  showTitle = true,
  cartData,
}: CheckoutSidebarProps) => {
  const intl = useIntl()
  const { cart } = useCart()
  const { cartSnapshot } = useCheckout()
  const _cart = cart.isEmpty ? cartSnapshot : cart

  const currencyFormatConfig: FormatNumberOptions = {
    currency: APP_CONFIG.CURRENCY_CODE,
    style: 'currency',
  }

  const _cartData = cartData ?? cart

  const promotions =
    _cartData.redeemables?.filter(
      (redeemable) => redeemable.object === 'promotion_tier'
    ) || []

  const numItems = _cart.items?.reduce((acc, cur) => acc + cur.quantity, 0)

  return (
    <Box>
      <Stack spacing={{ base: 0, md: 8 }}>
        {showTitle && (
          <Text textStyle={'Desktop/M'} mb={2}>
            {intl.formatMessage({ id: 'cart.summary.title' })}
          </Text>
        )}

        <Accordion
          allowToggle
          defaultIndex={[0]}
          mt="0 !important"
          {...itemsBoxProps}
        >
          <AccordionItem borderTop={0}>
            <AccordionButton px={0} borderBottomWidth={1}>
              <Text
                flex="1"
                textAlign="left"
                textStyle={'Desktop/Body-Default'}
              >
                {intl.formatMessage(
                  {
                    id:
                      (numItems ?? 0) > 1
                        ? 'checkout.orderSummary.items'
                        : 'checkout.orderSummary.item',
                  },
                  { quantity: _cart.quantity }
                )}{' '}
                <AccordionIcon />
              </Text>
              <Text fontWeight={700}>
                {intl.formatNumber(
                  parseFloat(_cart.summary?.subtotalPrice || '0'),
                  {
                    currency: APP_CONFIG.CURRENCY_CODE,
                    style: 'currency',
                  }
                )}
              </Text>
            </AccordionButton>
            <AccordionPanel px={0}>
              <Stack spacing="2" divider={<Divider />}>
                <ProductsList products={_cart.items} />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <CartPromotions promotions={promotions} />
        <CouponForm />
        <OrderTotals
          subtotal={intl.formatNumber(
            parseFloat(_cartData?.summary?.subtotalPrice ?? '0'),
            currencyFormatConfig
          )}
          deliveryTitle={intl.formatMessage({
            id: 'cart.summary.shipping.complimentaryDelivery',
          })}
          delivery={intl.formatMessage({ id: 'cart.summary.shipping.free' })}
          tax={intl.formatNumber(
            parseFloat(_cartData?.summary?.taxes ?? '0'),
            currencyFormatConfig
          )}
          totalTitle={intl.formatMessage({
            id: 'checkout.orderSummary.orderTotal',
          })}
          total={intl.formatNumber(
            parseFloat(
              _cartData?.summary?.grandPrice ||
                _cartData?.summary?.totalPrice ||
                '0'
            ),
            currencyFormatConfig
          )}
          totalDiscountAmountTitle={intl.formatMessage({
            id: 'cart.summary.totalDiscountAmount',
          })}
          totalDiscountAmount={intl.formatNumber(
            parseFloat(_cartData?.summary?.totalDiscountAmount || '0'),
            currencyFormatConfig
          )}
        />
      </Stack>
    </Box>
  )
}
