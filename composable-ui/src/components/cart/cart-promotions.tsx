import { useIntl } from 'react-intl'
import { Redeemable } from '@composable/types'
import { Box, Flex, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import { MdShoppingCart } from 'react-icons/md'
import { Price } from 'components/price'
import { CartSummaryItem } from '.'

interface CartPromotionsProps {
  promotions: Redeemable[]
}

export const CartPromotions = ({ promotions }: CartPromotionsProps) => {
  const intl = useIntl()
  // const isMobile = useBreakpointValue({ base: true, md: false })
  if (!promotions.length) {
    return null
  }

  return (
    <>
      <CartSummaryItem
        label={intl.formatMessage({
          id: 'cart.summary.promotions',
        })}
      ></CartSummaryItem>
      {promotions.map((redeemable) => (
        <Flex key={redeemable.id} justify="space-between">
          <Tag
            size="md"
            paddingRight={2}
            paddingLeft={2}
            borderRadius="sm"
            variant="outline"
            colorScheme="whiteAlpha"
          >
            <TagLeftIcon boxSize="12px" as={MdShoppingCart} />
            <TagLabel>{redeemable.label}</TagLabel>
          </Tag>
          <Box>
            <Price
              rootProps={{ textStyle: 'Body-S', color: 'green' }}
              price={`-${redeemable.discount}`}
            />
          </Box>
        </Flex>
      ))}
    </>
  )
}
