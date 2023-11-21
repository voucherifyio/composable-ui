import { Divider, Box, Flex, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useCart } from 'hooks'
import { CartDrawerSummaryItem } from './cart-drawer-summary-item'
import { Price } from '../../price'
import { CartSummaryItem } from '../cart-summary-item'
import { CartSummaryProps } from '../cart-summary'

export const CartDrawerSummary = ({ cartData }: CartSummaryProps) => {
  const { cart } = useCart()
  const intl = useIntl()
  const _cartData = cartData ?? cart

  return (
    <Box>
      <Divider m={'10px 0'} />

      {_cartData.summary?.subtotalPrice && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
        >
          <Price
            rootProps={{ textStyle: 'Mobile/Body-S' }}
            price={_cartData.summary.subtotalPrice}
          />
        </CartDrawerSummaryItem>
      )}

      {_cartData.summary?.taxes && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.taxes' })}
        >
          <Price
            rootProps={{ textStyle: 'Mobile/Body-S' }}
            price={_cartData.summary.taxes}
          />
        </CartDrawerSummaryItem>
      )}

      {_cartData.summary?.shipping && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.shipping' })}
        >
          <Price
            rootProps={{ textStyle: 'Mobile/Body-S' }}
            price={_cartData.summary.shipping}
          />
        </CartDrawerSummaryItem>
      )}
      <Divider m={'10px 0'} />

      {_cartData.summary?.totalPrice && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.orderTotal' })}
        >
          <Box>
            <Price
              rootProps={{ textStyle: 'Desktop/XS' }}
              price={_cartData.summary.totalPrice}
            />
          </Box>
        </CartDrawerSummaryItem>
      )}

      {_cartData.summary?.totalDiscountAmount && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.totalDiscountAmount' })}
        >
          <Box>
            <Price
              rootProps={{
                textStyle: 'Body-XS',
                color: 'green',
              }}
              price={`-${_cartData.summary.totalDiscountAmount}`}
            />
          </Box>
        </CartDrawerSummaryItem>
      )}
      <Divider m={'10px 0'} />
      {_cartData.summary?.grandPrice && (
        <>
          <Flex
            justify="space-between"
            textStyle={{ base: 'Mobile/S', md: 'Desktop/S' }}
          >
            <Text>{intl.formatMessage({ id: 'cart.summary.grandPrice' })}</Text>
            <Box>
              <Price price={_cartData.summary.grandPrice} />
            </Box>
          </Flex>
        </>
      )}
    </Box>
  )
}
