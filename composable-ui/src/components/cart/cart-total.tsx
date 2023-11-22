import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useCart } from 'hooks'
import { Price } from 'components/price'
import { Flex, Text, FlexProps } from '@chakra-ui/react'

interface CartTotalProps {
  rootProps?: FlexProps
}

export const CartTotal = ({ rootProps }: CartTotalProps) => {
  const router = useRouter()
  const { cart } = useCart()
  const intl = useIntl()

  return (
    <>
      <Flex
        justify="space-between"
        textStyle={{ base: 'Desktop/S', md: 'Mobile/S' }}
        mb={'1rem'}
        {...rootProps}
      >
        <Text>{intl.formatMessage({ id: 'cart.summary.orderTotal' })}</Text>
        <Price price={cart.summary?.totalPrice ?? ''} />
      </Flex>
    </>
  )
}
