'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { portfolioinfo } from '@/app/api/data'
import PortfolioModal from '../PortfolioModal'

const PortfolioList = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <>
      <section id='portfolio' className='md:pb-24 pb-16 pt-8 dark:bg-darkmode'>
        <div className='flex flex-wrap gap-[2.125rem] lg:px-[2.125rem] px-0 max-w-[120rem] w-full justify-center m-auto'>
          {portfolioinfo.map((item, index) => (
            <div 
              key={index} 
              className={`w-[18rem] group ${item.Class} cursor-pointer`}
              onClick={() => handleItemClick(item)}
            >
              <div className='relative overflow-hidden rounded-lg group-hover:scale-[1.1] group-hover:cursor-pointer transition-all duration-500'>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={800}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <h4 className='pb-[0.3125rem] pt-[2.1875rem] group-hover:text-primary group-hover:cursor-pointer text-2xl text-midnight_text font-bold dark:text-white'>
                {item.title}
              </h4>
              <p className='text-secondary font-normal text-lg group-hover:text-primary group-hover:cursor-pointer dark:text-white/50'>
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </>
  )
}

export default PortfolioList
