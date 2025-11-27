import React from 'react'
import Link from 'next/link'

const Location = () => {
  const breadcrumbLinks = [
    { href: '/', text: 'Inicio' },
    { href: '/contact', text: 'Contacto' },
  ]
  return (
    <>
      <section className='bg-primary md:py-24 py-16'>
        <div className='container mx-auto max-w-6xl px-4'>
          <div className=''>
            <div className='grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-white border-opacity-50 pb-11'>
              <div className='col-span-3'>
                <h2 className='text-white max-w-56 text-[40px] leading-tight font-bold'>
                  Oficina Principal
                </h2>
              </div>
              <div className='col-span-3'>
                <p className='sm:text-2xl text-xl text-IceBlue font-normal max-w-64 leading-7 text-white/50'>
                  Buenos Aires, Argentina
                </p>
              </div>
              <div className='col-span-3'>
                <Link
                  href='mailto:headoffice@spsolutions.com'
                  className='sm:text-2xl text-xl text-white font-medium underline'>
                  headoffice@spsolutions.com
                </Link>
                <Link
                  href='tel:+541125657495'
                  className='sm:text-2xl text-xl text-white/80 flex items-center gap-2 hover:text-opacity-100 w-fit'>
                  <span className='text-white/40!'>Llamar</span>
                  112-565-7495
                </Link>
              </div>
            </div>
            <div className='grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 pt-12'>
              <div className='col-span-3'>
                <h2 className='text-white max-w-52 text-[40px] leading-tight font-bold'>
                  Oficina Regional
                </h2>
              </div>
              <div className='col-span-3'>
                <p className='sm:text-2xl text-xl text-white/50 font-normal max-w-64 leading-7'>
                  Guadalajara, Jalisco, México
                </p>
              </div>
              <div className='col-span-3'>
                <Link
                  href='mailto:office@spsolutions.com'
                  className='sm:text-2xl text-xl text-white font-medium underline'>
                  office@spsolutions.com
                </Link>
                <Link
                  href='tel:+1-555-987-6543'
                  className='sm:text-2xl text-white/80 text-xl text-IceBlue flex items-center gap-2 hover:text-opacity-100 w-fit'>
                  <span className='text-white/40!'>Llamar</span>
                  +1 (555) 987-6543
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Location
