"use client"
import Link from 'next/link';

const Logo: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Link href="#inicio" onClick={handleClick}>
      <img
        src="/sp-logo.svg"
        alt="SP Solutions Logo"
        width="200"
        height="auto"
        style={{ width: '200px', height: 'auto' }}
      />
    </Link>
  );
};

export default Logo;
