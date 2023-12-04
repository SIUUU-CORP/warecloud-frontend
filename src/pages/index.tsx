import { Inter } from 'next/font/google'
import { Button, Image } from '@chakra-ui/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex gap-10 flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="pb-12">
        <Image src="/WARECLOUD (4).png" boxSize="400px"></Image>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full items-center">
        <div className="p-5 flex justify-center">
          <Image src="/check-boxes.jpg" boxSize="500px"></Image>
        </div>
        <div className=" p-5 text-justify">
          <p className="font-bold text-2xl text-teal-800 mb-3">
            Effortlessly Manage Your Warehouse Items with Warecloud
          </p>
          <p className="font-semibold text-m text-teal-600 mb-3">
            Experience effortless warehouse item management with
            Warecloud&apos;s cutting-edge cloud-based solutions, optimizing
            operations and maximizing efficiency
          </p>
          <Link href={'/register'}>
            <Button
              colorScheme="teal"
              size="md"
              style={{ boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)' }}
            >
              Register now
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full items-center">
        <div className=" p-5 text-justify">
          <p className="font-bold text-2xl text-teal-800 mb-3">
            Customers Connect and Purchase Through Warecloud
          </p>
          <p className="font-semibold text-m text-teal-600 mb-3">
            Experience a seamless and direct purchasing journey with Warecloud,
            where customers effortlessly connect and make purchases, ensuring
            swift transactions and unparalleled convenience
          </p>
          <Link href={'/register'}>
            <Button
              colorScheme="teal"
              size="md"
              style={{ boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)' }}
            >
              Register now
            </Button>
          </Link>
        </div>
        <div className="p-5 flex justify-center">
          <Image src="/order.jpg" boxSize="500px"></Image>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full items-center">
        <div className="p-5 flex justify-center">
          <Image src="supply.jpg" boxSize="500px"></Image>
        </div>
        <div className=" p-5 text-justify">
          <p className="font-bold text-2xl text-teal-800 mb-3">
            Streamline Branch-to-Branch Requests with Warecloud&apos;s
            Integrated Solutions.
          </p>
          <p className="font-semibold text-m text-teal-600 mb-3">
            Optimize operations by streamlining inter-branch requests using
            Warecloud&apos;s seamlessly integrated solutions, ensuring swift and
            efficient supply chain connectivity.
          </p>
          <Link href={'/register'}>
            <Button
              colorScheme="teal"
              size="md"
              style={{ boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)' }}
            >
              Register now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
