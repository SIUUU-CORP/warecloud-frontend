import {
  DetailItemInterface,
  GetOrderDetailsProps,
  GetDetailItemListProps,
} from './interface'

export const SHIPPING_RATE = 10000

export const getDetailItemList = ({
  description,
  price,
  weight,
}: GetDetailItemListProps) => {
  return [
    {
      key: 'description',
      label: 'Description:',
      value: description,
    },
    {
      key: 'price',
      label: 'Price:',
      value: price,
    },
    {
      key: 'weight',
      label: 'Weight:',
      value: weight,
    },
  ] as DetailItemInterface[]
}

export const getOrderDetailsList = ({
  itemName,
  vendorName,
  amount,
  subtotal,
  shippingCost,
  totalPurchase,
}: GetOrderDetailsProps) => {
  return [
    {
      key: 'itemName',
      label: 'Item name:',
      value: itemName,
    },
    {
      key: 'vendorName',
      label: 'Vendor name:',
      value: vendorName,
    },
    {
      key: 'subtotal',
      label: `Total price (${amount} ${amount === '1' ? 'item' : 'items'}):`,
      value: subtotal,
    },
    {
      key: 'shippingCost',
      label: 'Shipping cost:',
      value: shippingCost,
    },
    {
      key: 'totalPurchase',
      label: 'Total',
      value: totalPurchase,
    },
  ] as DetailItemInterface[]
}
