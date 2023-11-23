import storage from 'node-persist'
import path from 'path'
import os from 'os'

const storageFolderPath = path.join(
  os.tmpdir(),
  'composable-ui-storage-voucherify'
)

const localStorage = storage.create()

localStorage.init({
  dir: storageFolderPath,
})

console.log(
  `[voucherify][persist] Local storage in folder ${storageFolderPath}`
)

export const getCartDiscounts = async (cartId: string): Promise<string[]> => {
  return (await localStorage.getItem(`cart-discounts-${cartId}`)) || []
}

export const saveCartDiscounts = async (
  cartId: string,
  discounts: string[]
) => {
  await localStorage.setItem(`cart-discounts-${cartId}`, discounts)
  return discounts
}

export const deleteCartDiscounts = async (cartId: string) => {
  const result = await localStorage.del(`cart-discounts-${cartId}`)
  return result.removed
}
