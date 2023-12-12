import { Inter } from 'next/font/google'
import { Button, Image } from '@chakra-ui/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex gap-5 flex-col items-center justify-between px-24 py-5 ${inter.className}`}
    >
      <h1 className="pb-10">
        <Image src="/WARECLOUD (4).png" boxSize="400px"></Image>
      </h1>
      <section className="grid grid-cols-2 gap-2 w-full items-center">
        <div className="p-5 flex justify-center">
          <Image src="/check-boxes.jpg" boxSize="500px"></Image>
        </div>
        <div className=" p-5 text-justify">
          <h2 className="font-bold text-3xl text-teal-800 mb-3">
            Effortlessly Manage Your Warehouse Items with Warecloud
          </h2>
          <p className="font-semibold text-lg text-teal-600 mb-3">
            Experience effortless warehouse item management with
            Warecloud&apos;s cutting-edge cloud-based solutions, optimizing
            operations and maximizing efficiency
          </p>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-2 w-full items-center">
        <div className=" p-5 text-justify">
          <h2 className="font-bold text-3xl text-teal-800 mb-3">
            Customers Connect and Purchase Through Warecloud
          </h2>
          <p className="font-semibold text-lg text-teal-600 mb-3">
            Experience a seamless and direct purchasing journey with Warecloud,
            where customers effortlessly connect and make purchases, ensuring
            swift transactions and unparalleled convenience
          </p>
        </div>
        <div className="p-5 flex justify-center">
          <Image src="/order.jpg" boxSize="500px"></Image>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-2 w-full items-center">
        <div className="p-5 flex justify-center">
          <Image src="supply.jpg" boxSize="500px"></Image>
        </div>
        <div className=" p-5 text-justify">
          <h2 className="font-bold text-3xl text-teal-800 mb-3">
            Streamline Branch-to-Branch Requests with Warecloud&apos;s
            Integrated Solutions.
          </h2>
          <p className="font-semibold text-lg text-teal-600 mb-3">
            Optimize operations by streamlining inter-branch requests using
            Warecloud&apos;s seamlessly integrated solutions, ensuring swift and
            efficient supply chain connectivity.
          </p>
        </div>
      </section>
      <section className="py-12 flex flex-col gap-5">
        <h3 className="text-5xl font-bold text-teal-800">
          What are you waiting for?
        </h3>
        <Link href={'/login'} className="w-full">
          <Button
            backgroundColor={'teal'}
            textColor={'white'}
            className="w-full"
          >
            Come Join Us!
          </Button>
        </Link>
      </section>
    </main>
  )
}
