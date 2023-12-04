import { Skeleton } from '@elements'

export const Loader = () => (
  <div className="flex flex-wrap gap-8 justify-center mx-auto">
    <Skeleton width={255} height={200} />
    <Skeleton width={255} height={200} />
    <Skeleton width={255} height={200} />
    <Skeleton width={255} height={200} />
  </div>
)
