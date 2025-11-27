import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Home/Hero';
import Counter from '@/components/Home/Counter'
import Progresswork from '@/components/Home/WorkProgress';
import Services from '@/components/Home/Services';
import Portfolio from '@/components/SharedComponent/portfollio'
import Contactform from '@/components/Home/Contact';
export const metadata: Metadata = {
  title: "SP Solutions",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Progresswork isColorMode={false} />
      <Services />
      <Portfolio />
      <Contactform />
    </main>
  )
}
