"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { HeaderItem } from '../../../../types/menu';
import { usePathname } from 'next/navigation';

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleClick = (e: React.MouseEvent) => {
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
      // Cerrar el menú móvil después del scroll
      setTimeout(() => {
        const mobileMenu = document.querySelector('[class*="translate-x-0"]');
        if (mobileMenu) {
          // El menú se cerrará automáticamente por el estado del componente padre
        }
      }, 300);
    }
  };

  const path = usePathname();

  return (
    <div className="relative block w-full">
      <button
        onClick={item.submenu ? handleToggle : handleClick}
        className={`flex items-center justify-between w-full px-3 text-lg rounded-md text-white focus:outline-hidden ${item.hot ? 'emprendedor' : 'py-2'} ${path === item.href ? 'bg-primary text-white' : ''}`}
      >
        <span className="flex items-center gap-1.5">
          {item.hot && (
            <Icon icon="mdi:fire" className="w-4 h-4 text-orange-500 shrink-0" aria-hidden />
          )}
          {item.label}
        </span>
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </button>
      {submenuOpen && item.submenu && (
        <div className="bg-white/10 p-2 w-full rounded-md mt-2">
          {item.submenu.map((subItem, index) => (
            <Link key={index} href={subItem.href} className="block py-2 text-white/90 hover:text-white text-lg">
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
