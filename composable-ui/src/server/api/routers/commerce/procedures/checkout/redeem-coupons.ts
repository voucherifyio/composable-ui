import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const redeemCoupons = protectedProcedure
  .input(
    z.object({
      cartId: z.string(),
      coupons: z.array(
        z.object({
          id: z.string(),
          type: z.string(),
        })
      ),
    })
  )
  .mutation(async ({ input }) => {
    return await commerce.redeemCoupons({ ...input })
  })
