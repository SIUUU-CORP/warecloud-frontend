import { LinkProps } from 'next/link'

export interface CustomLinkProps extends LinkProps {
  title: string
  className?: string
  href: string
}
