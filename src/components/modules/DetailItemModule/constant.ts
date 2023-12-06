import { DetailItemInterface, GetDetailItemListProps } from './interface'

export const getDetailItemList = ({
  description,
  price,
  weight,
  stock,
}: GetDetailItemListProps) => {
  return [
    {
      label: 'Description:',
      value: description,
    },
    {
      label: 'Price:',
      value: price,
    },
    {
      label: 'Weight:',
      value: weight,
    },
    {
      label: 'Stock:',
      value: stock,
    },
  ] as DetailItemInterface[]
}
