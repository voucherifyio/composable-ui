import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { Alert, AlertIcon, Box, Flex, TagLeftIcon } from '@chakra-ui/react'
import { useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { InputField } from '../form'
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'
import { Price } from '../price'
import { CartSummaryItem } from '../cart-summary-item'
import { MdDiscount } from 'react-icons/md'
import { Redeemable } from '@composable/types'

export const CouponForm = (cart) => {
  const intl = useIntl()

  const [vouchers, setVouchers] = useState(
    cart.redeemables?.filter(
      (redeemable: Redeemable) => redeemable.object === 'voucher'
    ) || []
  )
  const [errorMessage, setErrorMessage] = useState<false | string>(false)
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<{ coupon: string }>({
    mode: 'all',
  })

  const handleAddCoupon = (coupon: string) => {
    if (!coupon.trim()) {
      setError('coupon', {
        message: intl.formatMessage({ id: 'error.couponEmpty' }),
      })
      return
    }
    if (vouchers.some((redeemable: Redeemable) => redeemable.id === coupon)) {
      setError('coupon', {
        message: intl.formatMessage({ id: 'error.couponExists' }),
      })
      return
    }

    setVouchers([
      ...vouchers,
      {
        id: coupon,
        label: coupon,
        object: 'voucher',
        status: 'APPLICABLE',
        discount: '10',
      },
    ])
    setValue('coupon', '')
  }

  const handleRemoveCoupon = (coupon: string) => {
    setVouchers(
      vouchers.filter((redeemable: Redeemable) => redeemable.id !== coupon)
    )
  }

  const content = {
    input: {
      coupon: {
        label: intl.formatMessage({ id: 'cart.summary.label.coupon' }),
        placeholder: intl.formatMessage({ id: 'cart.summary.label.coupon' }),
      },
    },
    button: {
      login: intl.formatMessage({ id: 'action.addCoupon' }),
    },
  }

  return (
    <>
      <CartSummaryItem
        label={intl.formatMessage({
          id: 'cart.summary.couponCodes',
        })}
      ></CartSummaryItem>
      <form
        role={'form'}
        onSubmit={handleSubmit(async (data) => {
          handleAddCoupon(data.coupon)
        })}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'flex-start'}
          justifyContent={'center'}
          height={'60px'}
          gap={3}
        >
          <InputField
            inputProps={{
              size: 'sm',
              fontSize: 'sm',
              placeholder: content.input.coupon.placeholder,
              ...register('coupon'),
            }}
            error={errors.coupon}
            label={''}
          />
          <IconButton
            mt={2}
            aria-label="Search database"
            icon={<ArrowForwardIcon />}
            type="submit"
            size="sm"
            variant={'outline'}
          />
        </Box>
        {errorMessage && (
          <Alert mt={2} status="warning" borderRadius={'6px'}>
            <AlertIcon alignSelf={'flex-start'} />
            {errorMessage}
          </Alert>
        )}
      </form>
      {vouchers.map((redeemable: Redeemable) => (
        <Flex
          key={redeemable.id}
          justify="space-between"
          textStyle={{ base: 'Mobile/S', md: 'Desktop/S' }}
        >
          <Tag
            size="md"
            paddingRight={2}
            paddingLeft={2}
            borderRadius="sm"
            variant="outline"
            colorScheme="whiteAlpha"
          >
            <TagLeftIcon boxSize="12px" as={MdDiscount} />
            <TagLabel>{redeemable.label}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveCoupon(redeemable.id)} />
          </Tag>
          <Box>
            <Price
              rootProps={{ textStyle: 'Body-S', color: 'green' }}
              price={`-234`}
            />
          </Box>
        </Flex>
      ))}
    </>
  )
}
