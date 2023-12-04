import { DetailItemInterface, GetDetailItemListProps } from "./interface"

export const getDetailItemList = ({ description, price, weight, stock }: GetDetailItemListProps) => {
    return [
        {
          label: "Deskripsi:",
          value: description
        },
        {
          label: "Harga:",
          value: price
        },
        {
          label: "Berat:",
          value: weight
        },
        {
          label: 'Stock:',
          value: stock
        }
    ] as DetailItemInterface[]
} 
