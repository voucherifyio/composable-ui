import { protectedProcedure } from '../../../../trpc'
import { z } from 'zod'
import { commerce } from '../../../../../data-source'

export const redeemCoupon = protectedProcedure
  .input(
    z.object({
      cartId: z.string(),
      coupon: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    return await commerce.redeemCoupon({ ...input })
  })
