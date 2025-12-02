'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'

interface PortfolioItem {
  image: string
  alt: string
  title: string
  slug: string
  info: string
  description?: string
}

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  item: PortfolioItem | null
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, item }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-darkmode rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón cerrar */}
        <div className="sticky top-0 bg-white dark:bg-darkmode border-b border-border dark:border-dark_border px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-midnight_text dark:text-white">
            {item.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-white/50 dark:hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Imagen */}
          <div className="mb-6 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.alt}
              width={1200}
              height={800}
              className="w-full h-auto"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          {/* Texto explicativo */}
          <div className="space-y-4">
            <div className="text-midnight_text dark:text-white">
              <h3 className="text-xl font-semibold mb-2">Descripción</h3>
              <p className="text-base text-grey dark:text-white/70 leading-relaxed">
                {item.description || 'Descripción del proyecto próximamente...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioModal





