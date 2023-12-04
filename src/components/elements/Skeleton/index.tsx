import React from 'react'
import { SkeletonProps } from './interface'

export const Skeleton: React.FC<SkeletonProps> = ({
  height = '100%',
  width = '100%',
}) => (
  <div
    className="rounded-xl bg-teal-600 animate-pulse"
    style={{
      width,
      height,
    }}
  ></div>
)
