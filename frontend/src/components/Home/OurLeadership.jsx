import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img from "../../assets/Home/leadership.jpg"
import BackgroundImage from '../BackgroundImage'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import HeadingText from '../HeadingText'

const OurLeadership = () => {
  return (
    <MainPadding className={"hover:px-0 transition-all duration-700"}>
      <BackgroundImage img={img} imgClass={`object-top`} className="md:h-fit h-[300px]">
        <div className='w-[33%] text-primary-foreground/90  p-10 md:flex flex-col gap-5 relative z-10 hidden '>
          <h1 className='font-bold'>Our Leadership</h1>
          <HeadingText className='font-cinzel text-7xl'>PASTOR OGUNSIJI</HeadingText>
          <p className='font-medium'>Pastor Ogunsiji leads our church with dedication, wisdom, and a heart for service. With a vision to uplift and inspire, he guides our community to grow in faith and love, encouraging us to walk closely with God every day.</p>
          <Button className="bg-orange hover:bg-orange/90 w-fit">Learn More <ArrowRight /> </Button>
        </div>
      </BackgroundImage>
      <div className=' text-foreground/90 flex flex-col gap-5 relative z-10 md:hidden mt-5'>
        <h1 className='font-bold text-primary'>Our Leadership</h1>
        <h1 className='font-cinzel text-5xl'>PASTOR OGUNSIJI</h1>
        <p className='font-medium'>Pastor Ogunsiji leads our church with dedication, wisdom, and a heart for service. With a vision to uplift and inspire, he guides our community to grow in faith and love, encouraging us to walk closely with God every day.</p>
        <Button className="bg-orange hover:bg-orange/90 w-fit">Learn More <ArrowRight /> </Button>
      </div>
    </MainPadding>
  )
}

export default OurLeadership
