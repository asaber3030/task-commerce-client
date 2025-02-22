"use"

import Link from "next/link"

import { CodeBlock } from "@/components/app/code-block"

export default function Custom404() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4'>
      <div className='text-center mb-8'>
        <h1 className='text-6xl font-bold text-gray-800 mb-2'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>Page Not Found</h2>
        <p className='text-gray-500 max-w-md mx-auto'>
          Oops! It seems like we've encountered an unexpected error in our code. Our team has been
          notified and is working on a fix.
        </p>
      </div>

      <CodeBlock className='mb-8' />

      <div className='flex gap-4 mt-4'>
        <Link href='/'>Return Home</Link>
        <Link href='/contact'>Report Issue</Link>
      </div>
    </div>
  )
}
