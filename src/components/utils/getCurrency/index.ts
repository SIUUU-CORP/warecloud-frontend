import { GetCurrecyProps } from './interface'

export const getCurrency = ({
  locale = 'id-ID',
  currency = 'IDR',
  price,
}: GetCurrecyProps) => {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(price)
}
