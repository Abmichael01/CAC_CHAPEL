import React, { useRef } from 'react'
import MainPadding from '../../layouts/MainPadding'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import img from "../../assets/Home/Welcome/img2.jfif"

const sermons = [
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    }
]

const LatestSermons = () => {
    const sermonsRef = useRef()

    const scrollToRight = () => {
        sermonsRef.current.scrollTo({
            left: sermonsRef.current.scrollLeft + 400,  // Increment scroll left by 200
            behavior: "smooth",
        });
    }
    
    const scrollToLeft = () => {
        sermonsRef.current.scrollTo({
            left: sermonsRef.current.scrollLeft - 400,  // Decrement scroll left by 200
            behavior: "smooth",
        });
    }

    return (
        <MainPadding className={`pr-0`}>
            <div className='flex gap-10 flex-col md:flex-row'>
                <div className='flex flex-col gap-5 md:w-[200px] w-full text-wrap'>
                    <h1 className='text-foreground md:text-4xl text-3xl font-cinzel'>LATEST SERMONS FROM CAC CHAPEL FOUNTAIN OF DIVINE FAVOUR</h1>
                    <Button variant="outline" className="text-foreground border-foreground bg-background hover:bg-background w-fit px-6 hidden md:block"> See more <ArrowRight /> </Button>
                </div>
                <div className='flex flex-grow flex-col gap-6 overflow-hidden'>
                    <div ref={sermonsRef} className='flex overflow-hidden overflow-x-scroll gap-10 hide-scrollbar pr-3'>
                        {sermons.map((sermon, index) => (
                            <div key={index} className='flex flex-col min-w-[400px] gap-2 font-bold' >
                                <img src={sermon.img} alt={sermon.title} className='w-full ' />
                                <div>
                                    <p className='text-foreground/60 text-[12px] '>{sermon.date} - {sermon.speaker}</p>
                                    <h3 className='text-foreground text-[16px] '>{sermon.title}</h3>
                                    <p className='text-foreground/60 text-[12px]'>{sermon.speaker}</p>
                                </div>
                            </div>                          
                        ))}
                    </div>
                    <div className='flex self-center md:self-end md:pr-24'>
                        <Button variant={`icon`} className="text-foreground" onClick={scrollToLeft}> <ArrowLeft /> </Button>
                        <Button variant={`icon`} className="text-foreground" onClick={scrollToRight}> <ArrowRight /> </Button>
                    </div>
                    <Button variant="outline" className="text-foreground border-foreground bg-background hover:bg-background w-fit px-6 self-center md:hidden"> See more <ArrowRight /> </Button>
                </div>
            </div>
        </MainPadding>
    )
}

export default LatestSermons
