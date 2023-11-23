import { CommerceService } from '@composable/types'
import { VoucherifyServerSide } from '@voucherify/sdk'
import { OrderWithDiscounts } from '@composable/types/src/voucherify/order-with-discounts'

export const getOrderFunction =
  (
    commerceService: CommerceService,
    voucherify: ReturnType<typeof VoucherifyServerSide>
  ) =>
  async (
    ...props: Parameters<CommerceService['getOrder']>
  ): Promise<OrderWithDiscounts | null> => {
    return await commerceService.getOrder(...props)
  }
