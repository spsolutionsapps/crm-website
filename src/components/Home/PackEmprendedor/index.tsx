'use client'

import React, { useState } from 'react'
import ShinyText from '@/components/TextAnimations/ShinyText'
import { Icon } from '@iconify/react'
import ContactModal from '@/components/Home/ContactModal'

const planFeatures = [
  'Diseño responsive de landing page',
  'Galería de imágenes / productos',
  'Formulario de contacto',
  'Redes sociales integradas',
  'Link a WhatsApp',
  'Dominio .com.ar y hosting incluidos',
  'Certificado SSL + Cuentas de correo',
]

const PACK_TITLE = 'Quiero el Pack Emprendedor'

export default function PackEmprendedor() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section
      id="pack-emprendedor"
      className="pack-no-aos-mobile scroll-mt-24 bg-section dark:bg-darklight md:pb-24 pb-16 pt-16 emprendedor-section"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center pt-7 md:pt-12 pb-12 md:pb-0">
          {/* Columna 1: Título y subtítulo (arriba en mobile, izquierda en desktop) */}
          <div className="order-1">
            <h2
              className="no-aos-mobile sm:text-4xl text-[28px] leading-tight font-bold text-midnight_text md:text-left text-center dark:text-white"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <ShinyText
                text="El punto de partida digital que tu negocio necesita."
                gradientColors={['#963010', '#e85d04', '#ff8c00', '#963010']}
                duration={3}
              />
            </h2>
            <p
              className="no-aos-mobile text-midnight_text dark:text-white/70 text-lg mt-4 md:text-left text-center"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              La solución integral para emprendedores que buscan comenzar con una presencia <strong>web profesional</strong>, completa y lista desde el día uno.
            </p>
          </div>

          {/* Columna 2: Card del plan (abajo en mobile, derecha en desktop) */}
          <div
            className="order-2 max-w-md md:max-w-full mx-auto md:mx-0 relative"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
          >
          <div
            className="rounded-xl overflow-hidden border-1 flex flex-col h-full transition-shadow hover:shadow-xl bg-fire">
            {/* Badge "hot" */}

            <div className="ribbon absolute -top-2 -right-2 h-40 w-40 overflow-hidden before:absolute before:top-0 before:left-0 before:border-4 before:border-light dark:before:border-dark after:absolute after:right-0 after:bottom-0 after:border-4 after:border-light dark:after:border-dark rounded-md">
              <div className="absolute bgRibbon -right-14 top-[43px] w-60 rotate-45 bg-light dark:bg-dark py-2.5 text-center text-white shadow-md">
                Destacado
              </div>
            </div>


            {/* <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-white/90 bg-[#963010]/80">
              <Icon icon="mdi:fire" className="w-3.5 h-3.5" />
              Destacado
            </div> */}

            <div className="p-8 md:p-10 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Pack Emprendedor</h3>
              <p className="text-white/80 text-sm mb-6">Ideal para dar tus primeros pasos en la web</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white block">$300.000 ARS</span>
                <span className="text-white/70 ml-1 text-sm block">Pago único – Sin mensualidades escondidas</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {planFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/90">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#963010]/50"
                      aria-hidden
                    >
                      <Icon icon="mdi:check" className="w-3.5 h-3.5 text-white" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="block w-full text-center py-3.5 px-6 rounded-lg font-semibold text-white transition-colors border fire"
              >
                Quiero el Pack Emprendedor!
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={PACK_TITLE}
        defaultAsunto={PACK_TITLE}
        variant="pack"
      />
    </section>
  )
}
