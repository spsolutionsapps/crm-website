'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'

interface PortfolioItem {
  image: string
  modalImage?: string  // Imagen específica para el modal
  alt: string
  title: string
  slug: string
  info: string
  description?: string  // Descripción larga
  website?: string     // URL del sitio web
}

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  item: PortfolioItem | null
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, item }) => {
  // Bloquear scroll del body cuando el modal está abierto
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

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !item) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={onClose} // Cerrar al hacer clic fuera
    >
      {/* Header con título y botón cerrar - fuera del modal */}
      <div className="absolute top-0 left-0 right-0 px-6 py-4 flex justify-between items-center z-20">
        <h2 className="text-2xl font-bold text-white">{item.title}</h2>
        <button 
          onClick={onClose} 
          aria-label="Cerrar modal"
          className="text-white hover:text-primary transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Modal blanco centrado */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()} // Evitar que se cierre al hacer clic dentro
      >
        <div
          className="bg-white rounded-lg max-w-7xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Contenido: Imagen + Descripción */}
          <div className="p-6">
            <div className="grid md:grid-cols-5 gap-6 items-center">
              {/* Columna izquierda - Imagen (3 de 5 = 60%) */}
              <div className="md:col-span-3">
                <Image
                  src={item.modalImage || item.image} // Usa modalImage si existe, sino image
                  alt={item.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Columna derecha - Descripción (2 de 5 = 40%) */}
              <div className="md:col-span-2 flex flex-col justify-center items-center text-center space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-midnight_text">Descripción</h3>
                  <p className="text-base leading-relaxed text-secondary">
                    {item.description || item.info || 'Descripción del proyecto próximamente...'}
                  </p>
                </div>
                
                {/* Botón "Visitar sitio web" - solo si existe website */}
                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span>Visitar sitio web</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioModal

