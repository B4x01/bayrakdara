'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'Projeler', href: '/projeler' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'İletişim', href: '/iletisim' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Menü açıkken scroll'u kilitle
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            {/* Açık mod logosu */}
            <img
              src="https://bayrakdardijital.com/wp-content/uploads/2025/04/logo-dark.png"
              alt="Bayrakdar Dijital"
              className="h-20 w-20 block dark:hidden"
            />
            {/* Koyu mod logosu */}
            <img
              src="https://bayrakdardijital.com/wp-content/uploads/2025/04/logo-light.png"
              alt="Bayrakdar Dijital"
              className="h-20 w-20 hidden dark:block"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-xl">Bayrakdar</span>
              <span className="text-primary font-medium -mt-1">Dijital</span>
            </div>
          </Link>
        </div>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="rounded-full">
            <Link href="/demo-istegi">Demo İsteği</Link>
          </Button>
          <ThemeToggle />
        </nav>

        {/* Mobil Menü Butonu */}
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobil Menü */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden flex items-center justify-center px-4 py-8">
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col justify-center items-center p-6 bg-muted rounded-2xl shadow-lg text-center hover:bg-muted-foreground/10 hover:scale-105 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-foreground font-semibold text-lg">
                  {item.name}
                </span>
              </Link>
            ))}
            <Link
              href="/demo-istegi"
              className="col-span-2 flex justify-center items-center p-6 bg-primary text-background rounded-2xl shadow-lg font-semibold text-lg text-center hover:bg-primary/90 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Demo İsteği
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
