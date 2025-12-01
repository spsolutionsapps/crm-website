import React from 'react'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'

const Testimonial = () => {
  return (
    <section
      className='scroll-mt-24 bg-section dark:bg-darklight border-none'
      id='testimonials'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div>
          <Image
            src={getImgPath('/images/testimonial/vector-smart.png')}
            alt='logo'
            width={150}
            height={0}
            loading="lazy"
            quality={75}
            className='w_f w-94! h-52! m-auto'
          />
          <div className='pt-16 pb-28'>
            <p className='font-medium md:text-xl text-base text-midnight_text dark:text-white text-center max-w-3xl mx-auto'>
              SP Solutions superó todas nuestras expectativas. Su equipo profesional entregó un proyecto de alta calidad que transformó completamente nuestra presencia digital. La atención al detalle y el compromiso con la excelencia son realmente impresionantes.
            </p>
          </div>
          <div className='text-center'>
            <strong className='text-lg font-bold text-midnight_text dark:text-primary'>
              Carlos Martínez
            </strong>
            <p className='text-base text-gray dark:text-white/50 '>
              Cliente Satisfecho, Empresa Tecnológica
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
