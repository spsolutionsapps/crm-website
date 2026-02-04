'use client'
import { getImgPath } from '@/utils/image'
import Image from 'next/image'
import Link from 'next/link'
import ShinyText from '@/components/TextAnimations/ShinyText'

const Hero = () => {
  return (
    <section id='inicio' className='relative md:pt-44 pt-28 bg-inicio-gradient bg-cover text-white'>
      <div className='container mx-auto max-w-6xl px-4 grid grid-cols-12 gap-4 relative z-10'>
        <div
          className='md:col-span-6 col-span-12 p-4 md:px-4 px-0 space-y-4 flex flex-col items-start justify-center'
          data-aos='fade-right'
          data-aos-delay='200'
          data-aos-duration='1000'>
          <div className='flex gap-2 items-center'>
            <span className='w-3 h-3 rounded-full bg-success'></span>
            <span className='font-medium text-midnight_text text-sm dark:text-white/50'>
              Construimos todo tipo de Soluciones Web
            </span>
          </div>
          <h1 className='text-midnight_text font-bold dark:text-white text-4xl  md:text-5xl md:leading-[1.15]'>
            <ShinyText 
              text="Soluciones Tecnológicas Innovadoras para tu Negocio"
              gradientColors={['#2F73F2', '#C0D5FB', '#2F73F2']}
              duration={3}
            />
          </h1>
          <p className='text-grey dark:text-white/70 text-xl font-semibold'>
            Transformamos ideas en realidad digital. Especialistas en desarrollo web, aplicaciones móviles y soluciones empresariales.
          </p>
    
        
        </div>

        <div className="md:col-span-6 col-span-12 relative">
          {/* Desktop only: heroFly y herobg */}
          <div className='heroFly hidden md:block'>
            <Image
              src={getImgPath('/images/heroFly.webp')}
              alt='hero-image'
              width={350}
              height={150}
              quality={100}
              priority
              style={{ width: '100%', height: 'auto' }}
            />  
          </div>

          <Image
            src={getImgPath('/images/herobg.webp')}
            alt='hero-image'
            width={350}
            height={150}
            quality={100}
            priority
            style={{ width: '100%', height: 'auto' }}
            className="hidden md:block"
          />

          {/* Mobile only: hero.png */}
          <Image
            src={getImgPath('/images/hero.webp')}
            alt='hero-image'
            width={350}
            height={150}
            quality={100}
            priority
            style={{ width: '100%', height: 'auto' }}
            className="block md:hidden"
          />


        </div>
      </div>

   
    </section>
  )
}

export default Hero
