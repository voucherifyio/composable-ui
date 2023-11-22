import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useCart } from 'hooks'
import { Price } from 'components/price'
import { CouponForm } from 'components/forms/coupon-form'
import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'
import { CartSummaryItem } from '.'
import { CartPromotions } from './cart-promotions'

export interface CartSummaryProps {
  rootProps?: StackProps
  renderCheckoutButton?: boolean
}

export const CartSummary = ({
  rootProps,
  renderCheckoutButton = true,
}: CartSummaryProps) => {
  const router = useRouter()
  const { cart } = useCart()
  const intl = useIntl()

  const vouchers =
    cart.redeemables?.filter((redeemable) => redeemable.object === 'voucher') ||
    []
  const promotions =
    cart.redeemables?.filter(
      (redeemable) => redeemable.object === 'promotion_tier'
    ) || []

  return (
    <Stack spacing={{ base: '4', md: '6' }} width="full" {...rootProps}>
      <Stack bg="shading.100" p={'2rem 1.5rem'}>
        <Text
          as={'h2'}
          textStyle={{ base: 'Mobile/M', md: 'Desktop/M' }}
          fontWeight={900}
          mb="sm"
        >
          {intl.formatMessage({ id: 'cart.summary.title' })}
        </Text>

        <Stack spacing="4">
          {cart.summary?.subtotalPrice && (
            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
            >
              <Price
                rootProps={{ textStyle: 'Body-S' }}
                price={cart.summary.subtotalPrice}
              />
            </CartSummaryItem>
          )}
          {cart.summary?.shipping && (
            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.shipping' })}
            >
              <Price
                rootProps={{ textStyle: 'Body-S' }}
                price={cart.summary.shipping}
              />
            </CartSummaryItem>
          )}

          {cart.summary?.taxes && (
            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.taxes' })}
            >
              <Price
                rootProps={{ textStyle: 'Body-S' }}
                price={cart.summary.taxes}
              />
            </CartSummaryItem>
          )}

          {cart.summary?.totalPrice && (
            <>
              <Divider />
              <Flex
                justify="space-between"
                textStyle={{ base: 'Mobile/S', md: 'Desktop/S' }}
              >
                <Text>
                  {intl.formatMessage({ id: 'cart.summary.orderTotal' })}
                </Text>
                <Box>
                  <Price price={cart.summary.totalPrice} />
                </Box>
              </Flex>
            </>
          )}
          <Divider />
          <CartPromotions promotions={promotions} />
          <Divider />
          <CouponForm />
          <Divider />
          {cart.summary?.totalDiscountAmount && (
            <CartSummaryItem
              label={intl.formatMessage({
                id: 'cart.summary.totalDiscountAmount',
              })}
            >
              <Price
                rootProps={{ textStyle: 'Body-S', color: 'green' }}
                price={`-${cart.summary.totalDiscountAmount}`}
              />
            </CartSummaryItem>
          )}

          {cart.summary?.grandPrice && (
            <>
              <Divider />
              <Flex
                justify="space-between"
                textStyle={{ base: 'Mobile/S', md: 'Desktop/S' }}
              >
                <Text>
                  {intl.formatMessage({ id: 'cart.summary.grandPrice' })}
                </Text>
                <Box>
                  <Price price={cart.summary.grandPrice} />
                </Box>
              </Flex>
            </>
          )}
        </Stack>
      </Stack>

      {renderCheckoutButton && (
        <Button
          onClick={() => {
            router.push('/checkout')
          }}
          w={{ base: 'full' }}
          maxW={{ base: 'full' }}
          variant={'solid'}
          size={'lg'}
        >
          {intl.formatMessage({ id: 'action.proceedToCheckout' })}
        </Button>
      )}
    </Stack>
  )
}
