import React from 'react'
import logoImage from "@/assets/logo.jfif"

const Logo = ({footer}) => {
    return (
        <div className='flex gap-2 items-center text-nowrap'>
            <div className='w-10 h-10 border-gray-600 border-2 rounded-full bg-'>
            <img src={logoImage} alt="logo" className='w-full h-full object-cover rounded-full' />
            </div>
            <div className='flex flex-col tracking-tighter'>
                <h2 className={`font-semibold text-lg ${footer ? "text-primary-foreground" : "text-foreground/70"}`}>CAC Chapel Lautech</h2>
                <p className='text-foreground/50 text-xs font-semibold'>Fountain Of Divine Favour</p>
            </div>
        </div>
    )
}

export default Logo
