import { Divider, Flex, Stack, Text, TextProps } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { Price } from '../price'

interface OrderTotalsProps {
  subtotal: string
  deliveryTitle?: string
  delivery: string
  tax: string
  discount?: string
  totalTitle?: string
  total: string
  totalDiscountAmountTitle?: string
  totalDiscountAmount?: string
}

export const OrderTotals = ({
  subtotal,
  deliveryTitle,
  delivery,
  tax,
  totalTitle,
  total,
  totalDiscountAmountTitle,
  totalDiscountAmount,
}: OrderTotalsProps) => {
  const intl = useIntl()

  return (
    <Stack
      spacing="xs"
      mt="lg"
      divider={<Divider />}
      px={{ base: 4, md: 'none' }}
    >
      <Stack spacing="xxxs">
        <CartSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
          value={subtotal}
        />
        <CartSummaryItem
          label={
            deliveryTitle ||
            intl.formatMessage({
              id: 'cart.summary.shipping',
            })
          }
          value={delivery}
        />
        <CartSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.tax' })}
          value={tax}
        />
        {totalDiscountAmount && (
          <CartSummaryItem
            label={totalDiscountAmountTitle ?? ''}
            value={totalDiscountAmount}
            textProps={{ color: 'green' }}
            isDiscount
          />
        )}
      </Stack>
      <CartSummaryItem
        label={totalTitle ?? ''}
        value={total}
        textProps={{
          fontSize: 'base',
          fontWeight: 'extrabold',
        }}
      />
    </Stack>
  )
}

interface CartSummaryItemProps {
  label: string
  value: string
  isDiscount?: boolean
  textProps?: TextProps
}

const CartSummaryItem = (props: CartSummaryItemProps) => {
  const { label, value, isDiscount, textProps } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text {...textProps}>{label}</Text>
      <Text
        {...textProps}
        color={isDiscount ? textProps?.color ?? 'red' : undefined}
      >
        {isDiscount && '-'}
        {value}
      </Text>
    </Flex>
  )
}
