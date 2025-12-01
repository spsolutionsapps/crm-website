'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ReactNode } from 'react'

interface ReCaptchaProviderProps {
  children: ReactNode
}

export default function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

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

