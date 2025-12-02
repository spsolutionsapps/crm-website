'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getImgPath } from '@/utils/image'
import ShinyText from '@/components/TextAnimations/ShinyText'

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </div>
  );
}

const Progresswork = ({ isColorMode }: { isColorMode: Boolean }) => {
  const [activeTab, setActiveTab] = useState<'kora' | 'sitio'>('kora')
  
  // Imágenes para Kora CRM
  const koraImages = [
    getImgPath('/images/kora/kora1.png'),
    getImgPath('/images/kora/kora2.png'),
    getImgPath('/images/kora/kora3.png'),
    getImgPath('/images/kora/kora4.png'),
    getImgPath('/images/kora/kora5.png'),
  ]
  
  // Imágenes para Sitio web autoadministrable
  const sitioImages = [
    getImgPath('/images/elebe.png'),
  ]

  const sliderSettings = {
    dots: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  }

  return (
    <section
      className={`scroll-mt-25 ${
        isColorMode
          ? 'dark:bg-darklight bg-section'
          : 'dark:bg-darkmode bg-white'
      }`}
      id='productos'>
      <div className='container mx-auto max-w-6xl px-[18px]'>
        {/* Botones de selección - Arriba de todo */}
        <div className='flex gap-4 justify-center pb-8'>
          <button
            onClick={() => setActiveTab('kora')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
              activeTab === 'kora'
                ? 'border-primary text-primary bg-transparent'
                : 'border-gray-300 text-midnight_text dark:border-dark_border dark:text-white/70 hover:border-gray-400 dark:hover:border-dark_border bg-transparent'
            }`}
          >
            Kora CRM
          </button>
          <button
            onClick={() => setActiveTab('sitio')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
              activeTab === 'sitio'
                ? 'border-primary text-primary bg-transparent'
                : 'border-gray-300 text-midnight_text dark:border-dark_border dark:text-white/70 hover:border-gray-400 dark:hover:border-dark_border bg-transparent'
            }`}
          >
            Sitio web autoadministrable con CRM
          </button>
        </div>

        {/* Contenido según el botón seleccionado */}
        {activeTab === 'kora' && (
          <div className='space-y-8'>
            {/* Título y subtítulo centrados */}
            <div className='text-center'>
              <h2 className='text-midnight_text font-bold dark:text-white text-4xl mb-4'>
                <ShinyText 
                  text="Kora, el corazón digital de tu empresa."
                  gradientColors={['#2F73F2', '#C0D5FB', '#2F73F2']}
                  duration={3}
                />
              </h2>
              <p className='text-gray dark:text-white/70 text-[18px] font-semibold max-w-3xl mx-auto'>
                Gestiona clientes, ventas, stock, leads, tareas, recordatorios, comisiones de vendedores y muchas más funcionalidades con el CRM más fácil de usar.
              </p>
              <div className='mt-6'>
                <Link
                  href='/kora'
                  className='inline-block px-6 py-3 rounded-lg bg-primary text-white hover:bg-blue-700 transition-colors font-semibold'
                >
                  Quiero saber más
                </Link>
              </div>
            </div>

            {/* Slider con imágenes */}
            <div className='max-w-4xl mx-auto pt-8 relative productos-slider'>
              <Slider {...sliderSettings}>
                {koraImages.map((image, index) => (
                  <div key={index} className='px-2'>
                    <div className='rounded-lg overflow-hidden max-h-[400px]'>
                      <Image
                        src={image}
                        alt={`Kora CRM ${index + 1}`}
                        width={1200}
                        height={400}
                        quality={100}
                        className='w-full h-auto object-contain'
                        style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}

        {activeTab === 'sitio' && (
          <div className='space-y-8'>
            {/* Título y subtítulo centrados */}
            <div className='text-center'>
              <h2 className='text-midnight_text font-bold dark:text-white text-4xl mb-4'>
                <ShinyText 
                  text="Sitio web autoadministrable con CRM"
                  gradientColors={['#2F73F2', '#C0D5FB', '#2F73F2']}
                  duration={3}
                />
              </h2>
              <p className='text-gray dark:text-white/70 text-[18px] font-semibold max-w-3xl mx-auto'>
                Administra todo el contenido de tu sitio web y gestiona, consultas, clientes, leads, tareas, recordatorios y mucho mas desde esta solucion que ofrecemos para que puedas centrarte en lo que realmente importa, tu negocio.
              </p>
            </div>

            {/* Imagen sin slider */}
            <div className='max-w-4xl mx-auto pt-8'>
              <div className='rounded-lg overflow-hidden max-h-[500px]'>
                <Image
                  src={sitioImages[0]}
                  alt='Sitio web autoadministrable'
                  width={1400}
                  height={500}
                  quality={100}
                  className='w-full h-auto object-contain'
                  style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Progresswork
