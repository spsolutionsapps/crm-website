'use client'
import React, { useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { portfolioinfo } from '@/app/api/data'
import PortfolioModal from './PortfolioModal'

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </div>
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </div>
  );
}

const PortfolioCard = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (item: any, index: number) => {
    setSelectedItem(item)
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const handleNext = () => {
    if (currentIndex < portfolioinfo.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setSelectedItem(portfolioinfo[nextIndex])
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setSelectedItem(portfolioinfo[prevIndex])
    }
  }

  const settings = {
    autoplay: true,
    dots: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <>
      <div id='portfolio' className='dark:bg-darkmode'>
        <div className='lg:px-9 m-auto px-0 max-w-[1600px] slider-container relative'>
          <Slider {...settings}>
            {portfolioinfo.map((item, index) => (
              <div
                key={index}
                className={`px-3 group ${index % 2 !== 0 ? 'lg:mt-24 ' : ''}`}
                onClick={() => handleItemClick(item, index)}
              >
                <div className='relative overflow-hidden rounded-lg cursor-pointer'>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    style={{ width: '100%', height: 'auto' }}
                    className='group-hover:scale-110 group-hover:cursor-pointer transition-all duration-500'
                  />
                </div>
                <h4 className='pb-1 pt-9 group-hover:text-primary group-hover:cursor-pointer text-2xl text-midnight_text font-bold dark:text-white'>
                  {item.title}
                </h4>
                <p className='text-secondary font-normal text-lg group-hover:text-primary group-hover:cursor-pointer dark:text-white/50'>
                  {item.info}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
        items={portfolioinfo}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  )
}

export default PortfolioCard
