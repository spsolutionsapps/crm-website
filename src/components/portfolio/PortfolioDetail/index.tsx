import React from 'react'

const PortfolioDetail = () => {
  return (
    <>
      <section className='md:py-24 py-16 dark:bg-darkmode'>
        <div className='container mx-auto max-w-6xl'>
          <div className='flex md:flex-row flex-col items-start w-full justify-between flex-wrap sm:flex-nowrap lg:gap-0 gap-8'>
            <div className='lg:w-[60%] w-full'>
              <div className='pb-[3.625rem]'>
                <p className='md:text-[1.6875rem] text-[1.0625rem] md:leading-[2.25rem] leading-[2rem] font-normal text-midnight_tex dark:text-white'>
                  Somos un equipo dedicado de gerentes de producto apasionados, desarrolladores, diseñadores UX/UI y expertos en QA que ayudan a empresas desde nuevas startups hasta corporaciones establecidas.
                </p>
              </div>
              <div className='flex items-start justify-between sm:flex-row flex-col lg:gap-0 gap-4'>
                <p className='sm:text-lg text-base font-normal text-secondary max-w-[19.4375rem] dark:text-white/50'>
                  Nuestro enfoque se centra en entender profundamente las necesidades de nuestros clientes y crear soluciones personalizadas que generen valor real y resultados medibles.
                </p>
                <p className='sm:text-lg text-base font-normal text-secondary max-w-[19.4375rem] dark:text-white/50'>
                  Utilizamos metodologías ágiles y las últimas tecnologías para garantizar que cada proyecto se entregue a tiempo, dentro del presupuesto y superando las expectativas.
                </p>
              </div>
            </div>
            <div
              className='flex flex-col items-start bg-white shadow-[0px_20px_80px_0px_#68758D26] pt-10 lg:pl-14 pl-9 pb-8 lg:pr-40 pr-10 lg:w-[30%] w-full dark:bg-darklight'
              data-aos='fade-left'
              data-aos-delay='200'
              data-aos-duration='1000'>
              <span className='pb-6 text-2xl text-primary'>Nuestros servicios</span>
              <span className='pb-6 text-lg'>Estrategia de Marca</span>
              <span className='pb-6 text-lg'>Comunicaciones</span>
              <span className='pb-6 text-lg'>Identidad Visual</span>
              <span className='pb-6 text-lg'>Soporte de Marca</span>
              <span className='pb-6 text-lg'>Diseño Web</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioDetail
