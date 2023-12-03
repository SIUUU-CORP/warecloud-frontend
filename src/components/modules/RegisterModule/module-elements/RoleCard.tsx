import React from 'react'
import { RoleCardInterface } from './interface'
import { SiShopify } from 'react-icons/si'
import { FaShop } from 'react-icons/fa6'

export const RoleCard: React.FC<
  RoleCardInterface & React.ComponentPropsWithoutRef<'div'>
> = ({ selectedRole, isCustomer = false, onClick }) => {
  const selectedProps = 'bg-teal-100 border-teal-300 text-teal-600'
  const unselectedProps = 'border-gray-300 text-gray-600'
  return (
    <div
      onClick={onClick}
      className={`w-[150px] h-[150px] flex flex-col gap-3 justify-center items-center rounded-md border-[3px] hover:bg-teal-100 hover:border-teal-300 hover:text-teal-600 ${
        (isCustomer && selectedRole === 0) ||
        (!isCustomer && selectedRole === 1)
          ? selectedProps
          : unselectedProps
      } `}
    >
      {isCustomer ? (
        <SiShopify fontSize={'70px'} />
      ) : (
        <FaShop fontSize={'70px'} />
      )}
      <span className={`font-semibold text-lg`}>
        {isCustomer ? 'Customer' : 'Vendor'}
      </span>
    </div>
  )
}
