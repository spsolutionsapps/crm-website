'use client'

import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Icon } from '@iconify/react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  defaultAsunto?: string
  variant?: 'default' | 'pack'
}

export default function ContactModal({ isOpen, onClose, title, defaultAsunto = '', variant = 'default' }: ContactModalProps) {
  const { executeRecaptcha } = useGoogleReCaptcha() || {}
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: '',
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.mensaje) {
      toast.error('Por favor completa todos los campos obligatorios')
      return
    }

    setLoading(true)
    try {
      let recaptchaToken: string | undefined
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha('submit_contact_form')
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            toast.error('Error de verificación de seguridad. Por favor intenta nuevamente.')
            setLoading(false)
            return
          }
        }
      }

      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
          asunto: defaultAsunto || undefined,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Consulta enviada correctamente')
        setIsSuccess(true)
        setFormData({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' })
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
        }, 1500)
      } else {
        toast.error(data.error || 'Error al enviar la consulta')
      }
    } catch {
      toast.error('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-[99999] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100000] w-full max-w-[50rem] max-h-[90vh] overflow-y-auto mx-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className={`rounded-xl shadow-xl p-6 md:p-8 relative ${variant === 'pack' ? 'bg-fire border-fire border-1 contact-modal--pack' : 'bg-white dark:bg-darkmode'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 id="contact-modal-title" className="text-xl md:text-2xl font-bold text-midnight_text dark:text-white flex items-center gap-2">
              {variant === 'pack' && <Icon icon="mdi:fire" className="w-7 h-7 shrink-0 text-white" />}
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-midnight_text dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isSuccess ? (
            <div className="py-8 flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-midnight_text dark:text-white">
                Mensaje enviado correctamente
              </h3>
              <p className="text-grey dark:text-white/60 text-sm">
                Gracias por tu consulta. Te contactaremos a la brevedad.
              </p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-midnight_text dark:text-white text-sm mb-1.5 block">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="text-midnight_text w-full text-base bg-transparent dark:border-dark_border dark:text-white px-4 py-2.5 border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0"
                  required
                />
              </div>
              <div>
                <label className="text-midnight_text dark:text-white text-sm mb-1.5 block">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  className="text-midnight_text w-full text-base bg-transparent dark:border-dark_border dark:text-white px-4 py-2.5 border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-midnight_text dark:text-white text-sm mb-1.5 block">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder=""
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-midnight_text w-full text-base bg-transparent dark:border-dark_border dark:text-white px-4 py-2.5 border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0"
                  required
                />
              </div>
              <div>
                <label className="text-midnight_text dark:text-white text-sm mb-1.5 block">Teléfono</label>
                <input
                  type="tel"
                  placeholder=""
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="text-midnight_text w-full text-base bg-transparent dark:border-dark_border dark:text-white px-4 py-2.5 border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0"
                />
              </div>
            </div>
            <div>
              <label className="text-midnight_text dark:text-white text-sm mb-1.5 block">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder=""
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="text-midnight_text w-full text-base min-h-[120px] bg-transparent dark:border-dark_border dark:text-white px-4 py-2.5 border border-border border-solid focus:border-primary dark:focus:border-primary placeholder:text-grey rounded-lg focus-visible:outline-0"
                required
              />
            </div>
            <p className="text-grey dark:text-white/50 text-sm -mt-1">
              Los campos marcados con <span className="text-red-500">*</span> son obligatorios
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || isSuccess}
                className="flex-1 py-3 rounded-lg fire text-white font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Enviando...' : isSuccess ? 'Enviado' : 'Enviar'}
              </button>
              {/* <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-lg border border-border dark:border-dark_border text-midnight_text dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button> */}
            </div>
          </form>
          )}
        </div>
      </div>
    </>
  )
}
