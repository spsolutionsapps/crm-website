'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'

interface PortfolioItem {
  image: string
  modalImage?: string
  alt: string
  title: string
  slug: string
  info: string
  description?: string
  website?: string
}

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  item: PortfolioItem | null
  items?: PortfolioItem[]
  currentIndex?: number | null
  onNavigate?: (direction: 'prev' | 'next') => void
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ 
  isOpen, 
  onClose, 
  item, 
  items = [],
  currentIndex = null,
  onNavigate 
}) => {
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && onNavigate) {
        onNavigate('prev')
      } else if (e.key === 'ArrowRight' && onNavigate) {
        onNavigate('next')
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, onNavigate])

  if (!isOpen || !item) return null

  const canGoPrevious = currentIndex !== null && currentIndex > 0
  const canGoNext = currentIndex !== null && currentIndex < items.length - 1

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header con título y botón cerrar - fuera del modal */}
      <div className="absolute top-0 left-0 right-0 px-6 py-4 flex justify-between items-center z-20">
        <h2 className="text-2xl font-bold text-white">{item.title}</h2>
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="text-white hover:text-primary transition-colors p-2"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Flechas de navegación */}
      {items.length > 1 && (
        <>
          {/* Flecha izquierda */}
          {canGoPrevious && onNavigate && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Proyecto anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          )}
          {/* Flecha derecha */}
          {canGoNext && onNavigate && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Siguiente proyecto"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          )}
        </>
      )}

      {/* Modal blanco centrado */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
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
                  src={item.modalImage || item.image}
                  alt={item.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                  quality={80}
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





