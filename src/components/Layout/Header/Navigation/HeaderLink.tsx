"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { HeaderItem } from '../../../../types/menu';
import { usePathname } from 'next/navigation';

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname()
  
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si es un hash link, hacer scroll suave
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const targetId = item.href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 96; // Altura del header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href={item.href} 
        onClick={handleClick}
        className={`text-base flex items-center gap-1.5 font-normal text-black dark:text-white relative ${item.hot ? 'emprendedor' : 'py-2 hover:text-primary dark:hover:text-primary'} ${(item.href === '#productos' || item.href === '#services' || item.href === '#portfolio') ? 'header-link-underline' : ''} ${path === item.href ? 'text-primary dark:text-primary!' : ''}`}>
        {item.hot && (
          <Icon icon="mdi:fire" className="w-4 h-4 text-orange-500 shrink-0" aria-hidden />
        )}
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </Link>
      {submenuOpen && (
        <div
          className={`absolute py-2 left-0 mt-0.5 top-8 w-60 bg-white dark:bg-darklight shadow-lg dark:shadow-dark-md rounded-lg `}
          data-aos="fade-up"
          data-aos-duration="400"
        >
          {item.submenu?.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block px-4 py-2 text-[15px]  ${
                path === subItem.href
                  ? "bg-primary text-white"
                  : "text-black hover:bg-gray-200 dark:hover:bg-midnight_text dark:text-white hover:text-dark dark:hover:text-white"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
