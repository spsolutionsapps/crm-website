'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { headerData } from '../Header/Navigation/menuData'
import Logo from './Logo'
import HeaderLink from '../Header/Navigation/HeaderLink'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'
const Header: React.FC = () => {
  const pathUrl = usePathname()

  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const navbarRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  const path = usePathname()

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])


  return (
    <header
      className={`fixed h-24 top-0 py-1 z-50 w-full transition-all backdrop-blur-md ${
        sticky
          ? 'bg-white/80 dark:bg-darklight/86'
          : 'bg-transparent dark:bg-transparent'
      }`}>
      <div className='container mx-auto max-w-6xl flex items-center justify-between p-6'>
        <Logo />
        <nav className='hidden lg:flex grow items-center justify-center gap-6'>
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
        <div className='flex items-center gap-4'>
          <Link
            href='#contact'
            className='hidden lg:block bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700'
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                const headerOffset = 96;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}>
            Contáctanos
          </Link>
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='block lg:hidden p-2 rounded-lg'
            aria-label='Toggle mobile menu'>
            <span className='block w-6 h-0.5 bg-black dark:bg-white'></span>
            <span className='block w-6 h-0.5 bg-black dark:bg-white mt-1.5'></span>
            <span className='block w-6 h-0.5 bg-black dark:bg-white mt-1.5'></span>
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
      )}

      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}>
        <div className='flex items-center justify-between p-4'>
          <h2 className='text-lg font-bold text-midnight_text dark:text-white'>
            Menú
          </h2>
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label='Close mobile menu'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='dark:text-white'>
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='flex flex-col items-start p-4'>
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <Link
              href='#contact'
              className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center'
              onClick={(e) => {
                e.preventDefault();
                setNavbarOpen(false);
                const element = document.getElementById('contact');
                if (element) {
                  const headerOffset = 96;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}>
              Contáctanos
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
