import Logo from '@/components/Navbar/Logo'
import React from 'react'
import heroImg from "@/assets/herobg.jpg"
import { ScrollArea } from '@/components/ui/scroll-area'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex w-full h-[100vh] bg-gradient-to-br bg-white'>
      <div className='relative w-1/2 h-full flex-grow md:flex hidden border-primary shadow-3xl overflow-hidden '>
        <div className='absolute inset-0 bg-black/50 z-10' />
        <img
          src={heroImg}
          alt="Church Background"
          className='h-full w-full object-cover absolute inset-0'
        />
        <div className=''>

        </div>
      </div>
      <div className='bg-white/80 backdrop-blur-sm w-full md:w-1/2 max-h-[100vh] h-[100vh] overflow-y-scroll flex justify-center px-4 sm:px-6 py-10'>
          <div className='w-full h-fit max-w-md flex flex-col items-center'>
            <Logo />
            <div className='bg-white max-[300px]:px-4 p-8  rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full'>
              {children}
            </div>
          </div>
      </div>
    </div>
  )
}

export default AuthLayout