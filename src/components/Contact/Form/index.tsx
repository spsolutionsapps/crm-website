import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'

const ContactForm = () => {
  return (
    <>
      <section className='dark:bg-darkmode md:pb-24 pb-16'>
        <div className='container mx-auto max-w-6xl px-4'>
          <div className='grid md:grid-cols-12 grid-cols-1 gap-8'>
            <div className='col-span-6'>
              <h2 className='max-w-72 text-[40px] leading-tight font-bold mb-9 text-midnight_text dark:text-white'>
                Solicita una Consulta Online
              </h2>
              <form className='flex flex-wrap w-full m-auto justify-between'>
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1'>
                    <label
                      htmlFor='first-name'
                      className='pb-3 inline-block text-base'>
                      Nombre*
                    </label>
                    <input
                      className='w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white  dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0'
                      type='text'
                    />
                  </div>
                  <div className='mx-0 my-2.5 flex-1'>
                    <label
                      htmlFor='last-name'
                      className='pb-3 inline-block text-base'>
                      Apellido*
                    </label>
                    <input
                      className='w-full text-base px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white  dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0'
                      type='text'
                    />
                  </div>
                </div>
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1'>
                    <label
                      htmlFor='email'
                      className='pb-3 inline-block text-base'>
                      Dirección de correo*
                    </label>
                    <input
                      type='email'
                      className='w-full text-base px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white  dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0'
                    />
                  </div>
                  <div className='mx-0 my-2.5 flex-1'>
                    <label
                      htmlFor='Specialist'
                      className='pb-3 inline-block text-base'>
                      Servicio de interés*
                    </label>
                    <select className='w-full text-base px-4 py-2.5 rounded-lg border-border dark:text-white border-solid dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0'>
                      <option value=''>Elige un servicio</option>
                      <option value='Diseño UX'>
                        Diseño UX y de Productos
                      </option>
                      <option value='Optimización'>Optimización de Rendimiento</option>
                      <option value='Desarrollo Web'>Desarrollo Web y Móvil</option>
                      <option value='Consultoría'>
                        Consultoría Tecnológica
                      </option>
                    </select>
                  </div>
                </div>
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1'>
                    <label
                      htmlFor='date'
                      className='pb-3 inline-block text-base'>
                      Fecha*
                    </label>
                    <input
                      className='w-full text-base px-4 rounded-lg  py-2.5 outline-hidden dark:text-white dark:bg-darkmode border-border border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0'
                      type='date'
                    />
                  </div>
                  <div className='mx-0 my-2.5 flex-1'>
                    <label
                      htmlFor='time'
                      className='pb-3 inline-block text-base'>
                      Hora*
                    </label>
                    <input
                      className='w-full text-base px-4 rounded-lg py-2.5 border-border outline-hidden dark:text-white dark:bg-darkmode border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0'
                      type='time'
                    />
                  </div>
                </div>
                <div className='mx-0 my-2.5 w-full'>
                  <Link
                    href='#'
                    className='bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700'
                    type='submit'>
                    Agendar una cita
                  </Link>
                </div>
              </form>
            </div>
            <div className='col-span-6'>
              <Image
                src={getImgPath('/images/contact-page/contact.jpg')}
                alt='Contact'
                width={1300}
                height={0}
                loading="lazy"
                quality={75}
                style={{ width: '100%', height: 'auto' }}
                className='bg-no-repeat bg-contain'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactForm
