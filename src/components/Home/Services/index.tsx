'use client'
import React, { useState } from 'react'
import { ServiceCategories } from '@/app/api/data'
import Image from 'next/image'
import ShinyText from '@/components/TextAnimations/ShinyText'

const Services = () => {
  // Estado para controlar qué categorías están expandidas
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(ServiceCategories.filter(cat => cat.defaultExpanded).map(cat => cat.id))
  )

  // Función para expandir/colapsar categorías
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId) // Si está expandida, la colapsa
      } else {
        newSet.add(categoryId) // Si está colapsada, la expande
      }
      return newSet
    })
  }

  return (
    <section className='bg-section dark:bg-darklight scroll-mt-24' id='services'>
      <div className='container mx-auto max-w-6xl px-4'>
        {/* Encabezado de la sección */}
        <div
          className='flex gap-2 items-center justify-center'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          <span className='w-3 h-3 rounded-full bg-success'></span>
          <span className='font-medium text-midnight_text text-sm dark:text-white/50'>
            Nuestros servicios
          </span>
        </div>
        
        {/* Título principal */}
        <h2
          className='sm:text-4xl text-[28px] leading-tight font-bold text-midnight_text md:text-center text-start pt-7 pb-12 md:w-4/6 w-full m-auto dark:text-white'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          <ShinyText 
            text="Servicios diseñados específicamente para satisfacer las necesidades de tu negocio"
            gradientColors={['#2F73F2', '#C0D5FB', '#2F73F2']}
            duration={3}
          />
        </h2>
        
        {/* Lista de categorías */}
        <div className='max-w-2xl mx-auto space-y-4'>
          {ServiceCategories.map((category, index) => {
            const isExpanded = expandedCategories.has(category.id)
            
            return (
              <div
                key={category.id}

                className='bg-services-card rounded-lg overflow-hidden'
              >
                {/* Botón/Header de la categoría */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className='w-full flex items-center justify-between p-6 transition-colors cursor-pointer hover:bg-opacity-90'
                  style={{ cursor: 'pointer' }}
                >
                  <div className='flex items-center gap-6'>
                    {/* Icono de la categoría */}
                    <div className='w-12 h-12 flex items-center justify-center flex-shrink-0'>
                      <Image
                        src={category.icon}
                        alt={category.title}
                        width={48}
                        height={48}
                        className='w-12 h-12'
                      />
                    </div>
                    {/* Título de la categoría */}
                    <h3 className='text-xl font-semibold text-white'>
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* Icono de expandir/colapsar */}
                  <div className='w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 transition-all flex-shrink-0'>
                    {isExpanded ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <line x1='5' y1='12' x2='19' y2='12' />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <line x1='12' y1='5' x2='12' y2='19' />
                        <line x1='5' y1='12' x2='19' y2='12' />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Contenido expandible con los servicios */}
                {isExpanded && (
                  <div className='px-6 pb-6 pt-2'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {category.services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className='service-tag flex items-center gap-4 p-5 rounded-lg'
                        >
                          <span className='text-2xl leading-none flex-shrink-0'>{service.icon}</span>
                          <span className='text-white text-base font-medium'>
                            {service.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
