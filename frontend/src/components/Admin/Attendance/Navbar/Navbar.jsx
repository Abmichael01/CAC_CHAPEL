import React from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import SearchAndFilter from './SearchAndFilter'


const tabs = [
    {
        name: "Overview",
        slug: "overview",
    }
]

const Navbar = () => {
    const [searchParams] = useSearchParams()
    const currentTab = searchParams.get("tab")
    return (
        <div className='bg-white h-fit px-5 flex items-start flex-col-reverse md:flex-row justify-between md:items-end border-b border-foreground/20 sticky top-[73px]  z-10'>
            <nav className='flex items-center space-x-6 h-full'>

                {tabs.map((tab, index) => (
                    <Link key={index} to={`/admin/members?tab=${tab.slug}`} className={`relative text-xs flex items-center h-full pb-3 
                        ${currentTab === tab.slug ? "text-primary" : "text-foreground/60"}
                    `}>
                        <span className='mt-5 font-medium'>{tab.name}</span>
                        <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-primary  ${currentTab === tab.slug ? "bg-primary" : "bg-transparent"
                            }`}></span>
                    </Link>
                ))}

            </nav>
            <SearchAndFilter />
        </div>
    )
}

export default Navbar
