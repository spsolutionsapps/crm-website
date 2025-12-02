'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'
import toast, { Toaster } from 'react-hot-toast'
import ShinyText from '@/components/TextAnimations/ShinyText'

const Contactform = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar campos obligatorios
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.mensaje) {
      toast.error('Por favor completa todos los campos obligatorios')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Consulta enviada correctamente')
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          mensaje: ''
        })
      } else {
        toast.error(data.error || 'Error al enviar la consulta')
      }
    } catch (error) {
      toast.error('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='contact' className='overflow-x-hidden bg-darkmode dark:bg-darklight'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div className='grid md:grid-cols-12 grid-cols-1 md:gap-7 gap-0'>
          <div
            className='row-start-1 col-start-1 row-end-2 md:col-end-7 col-end-12'
            data-aos='fade-left'
            data-aos-delay='200'
            data-aos-duration='1000'>
            <div className='flex gap-2 items-center justify-start'>
              <span className='w-3 h-3 rounded-full bg-success'></span>
              <span className='font-medium text-sm text-white'>
                Construimos todo tipo de soluciones web
              </span>
            </div>
            <h2 className='sm:text-4xl text-[28px] leading-tight font-bold text-white py-12'>
              <ShinyText 
                text="Hablemos sobre tu proyecto y llevémoslo al siguiente nivel."
                gradientColors={['#2F73F2', '#C0D5FB', '#2F73F2']}
                duration={3}
              />
            </h2>
            <div className='grid grid-cols-6 pb-12 border-b border-dark_border '>
              <div className='col-span-3'>
                <span className='text-white/50 text-lg'>Teléfono</span>
                <p className='bg-transparent border-0 text-white text-lg'>
                  112-565-7495
                </p>
              </div>
              <div className='col-span-6 pt-8'>
                <span className='text-white/50 text-lg'>Ubicación</span>
                <p className='bg-transparent border-0 text-white text-lg'>
                  Buenos Aires, Argentina
                </p>
              </div>
            </div>
            <div className='pt-12'>
              <p className='text-white/50 pb-4 text-base'>Confianza de</p>
              <div className='flex items-center flex-wrap md:gap-14 gap-7 logos'>
                <Image
                  src={getImgPath('/images/elebe.svg')}
                  alt='Google-pay'
                  width={100}
                  height={20}
                  style={{ width: 'auto', height: 'auto' }}
                  quality={100}
                  className='w_f max-w-28 w-full h-5'
                />
                <Image
                  src={getImgPath('/images/tanamin.svg')}
                  alt='play-juction'
                  width={100}
                  height={20}
                  style={{ width: 'auto', height: 'auto' }}
                  quality={100}
                  className='w_f max-w-24 w-full h-6'
                />
                <Image
                  src={getImgPath('/images/rank.svg')}
                  alt='stripe'
                  width={150}
                  height={50}
                  style={{ width: '200px', height: 'auto' }}
                  quality={100}
                  className='w_f max-w-14 w-full h-6'
                />
                <Image
                  src={getImgPath('/images/littleblue.svg')}
                  alt='wise'
                  width={100}
                  height={20}
                  style={{ width: 'auto', height: 'auto' }}
                  quality={100}
                  className='w_f max-w-16 w-full h-4'
                />
              </div>
            </div>
          </div>
          <div
            data-aos='fade-right'
            data-aos-delay='200'
            data-aos-duration='1000'
            className="relative before:content-[''] before:absolute before:bg-[url('/images/contact/form-line.png')] before:bg-no-repeat before:w-[13rem] before:h-24 before:top-5% before:bg-contain before:left-[35%] before:z-1 before:translate-x-full lg:before:inline-block before:hidden after:content-[''] after:absolute after:bg-[url('/images/contact/from-round-line.png')] after:bg-no-repeat after:w-[6.3125rem] after:h-[6.3125rem] after:bg-contain after:top-1/2 after:-left-[25%] after:z-1 after:translate-x-1/2 after:translate-y-1/2 md:after:inline-block after:hidden md:row-start-1 row-start-2 md:col-start-8 col-start-1 row-end-2 col-end-13">
            <div className='lg:mt-0 mt-8  bg-white dark:bg-darkmode max-w-[50rem] m-auto pt-[2.1875rem] pb-8 px-[2.375rem] rounded-md relative z-10'>
              <h2 className='sm:text-3xl text-lg font-bold text-midnight_text mb-3 dark:text-white'>
                Envíanos tu consulta
              </h2>
              <Toaster position="top-right" />
              <form onSubmit={handleSubmit} className='flex w-full m-auto justify-between flex-wrap gap-4'>
                <div className='flex gap-4'>
                  <div className='w-full'>
                    <label className='text-midnight_text dark:text-white text-sm mb-1 block'>
                      Nombre <span className='text-red-500'>*</span>
                    </label>
                    <input
                      className='text-midnight_text w-full text-base transition-[0.5s] bg-transparent dark:border-dark_border dark:text-white px-[0.9375rem] py-[0.830rem] border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0'
                      type='text'
                      placeholder='Nombre'
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                  </div>
                  <div className='w-full'>
                    <label className='text-midnight_text dark:text-white text-sm mb-1 block'>
                      Apellido <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      className='text-midnight_text w-full text-base transition-[0.5s] bg-transparent dark:border-dark_border dark:text-white px-[0.9375rem] py-[0.830rem] border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0'
                      placeholder='Apellido'
                      value={formData.apellido}
                      onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='w-full'>
                    <label className='text-midnight_text dark:text-white text-sm mb-1 block'>
                      Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='email'
                      className='text-midnight_text w-full text-base transition-[0.5s] bg-transparent dark:border-dark_border dark:text-white px-[0.9375rem] py-[0.830rem] border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0'
                      placeholder='tuemail@ejemplo.com'
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className='w-full'>
                    <label className='text-midnight_text dark:text-white text-sm mb-1 block'>
                      Teléfono
                    </label>
                    <input
                      className='text-midnight_text w-full text-base transition-[0.5s] bg-transparent dark:border-dark_border dark:text-white px-[0.9375rem] py-[0.830rem] border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0'
                      type='tel'
                      placeholder='Teléfono'
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                </div>
                <div className='w-full'>
                  <label className='text-midnight_text dark:text-white text-sm mb-1 block'>
                    Mensaje <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    className='text-midnight_text h-[9.375rem] w-full text-base transition-[0.5s] bg-transparent dark:border-dark_border dark:text-white px-[0.9375rem] py-[0.830rem] border! border-border border-solid! focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0'
                    placeholder='Cuéntanos sobre tu proyecto'
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    required
                  ></textarea>
                </div>
                <div className='w-full'>
                  <button
                    className='w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50'
                    type='submit'
                    disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar Consulta'}
                  </button>
                </div>
                <div className='w-full'>
                  <p className='text-grey dark:text-white/50 text-sm text-center'>
                    Los campos marcados con <span className='text-red-500'>*</span> son obligatorios
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contactform
