'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ReactNode } from 'react'

interface ReCaptchaProviderProps {
  children: ReactNode
}

export default function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  // Leer la variable - en producción puede estar en diferentes lugares
  const recaptchaSiteKey = 
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    (typeof window !== 'undefined' && (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) ||
    '6LcNOx4sAAAAAHVT4YC9NEwPHdNVb0lJerhf7LpP' // Fallback temporal para producción

  if (!recaptchaSiteKey) {
    console.warn('NEXT_PUBLIC_RECAPTCHA_SITE_KEY no está configurado. reCAPTCHA no funcionará.')
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaSiteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}



