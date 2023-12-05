import React from 'react'
import { CustomLinkProps } from './interface'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  title,
  className = '',
}) => {
  const router = useRouter()
  return (
    <Link href={href}>
      <div className={`${className} relative group cursor-pointer`}>
        <span>
          {title}
          <span
            className={`h-[3px] inline-block bg-teal-600
            absolute left-0 -bottom-0.5
            group-hover:w-full transition-[width] ease duration-300 
            ${router.asPath === href ? 'w-full' : 'w-0'}`}
          >
            &nbsp;
          </span>
        </span>
      </div>
    </Link>
  )
}
