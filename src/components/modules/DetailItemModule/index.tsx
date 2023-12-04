import { useRouter } from 'next/router'
import React from 'react'

export const DetailItemModule: React.FC = () => {
  const {
    query: { itemId },
  } = useRouter()

  return (
    <>
      <section className="max-w-[750px] flex flex-col mx-auto py-2 min-h-screen">
        <div className="">
          <p>{itemId}</p>
        </div>

        <div className=""></div>
      </section>
    </>
  )
}
