'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? 'bg-cream/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="container">
        <div className="flex items-center justify-between py-5 md:py-6">
          {/* Logo - größer */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-heading text-2xl md:text-3xl font-bold text-text-primary hover:text-accent-gold transition-colors"
          >
            sangtildeg.no
          </button>

          {/* Desktop Menu - größer und prominenter */}
          <div className="hidden md:flex items-center gap-10">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-xl text-text-secondary hover:text-text-primary transition-colors font-semibold"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-xl text-text-secondary hover:text-text-primary transition-colors font-semibold"
            >
              {t('howItWorks')}
            </button>
            <Link 
              href={`/${locale === 'en' ? 'en/' : ''}create`}
              className="btn-secondary text-lg"
            >
              {t('createSong')}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-primary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

          {/* Mobile Menu - größer */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in-down">
            <div className="py-6 px-4 border-t border-warm/50">
              <div className="flex flex-col gap-6">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-xl text-text-secondary hover:text-text-primary transition-colors font-semibold"
              >
                {t('about')}
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-xl text-text-secondary hover:text-text-primary transition-colors font-semibold"
              >
                {t('howItWorks')}
              </button>
              <Link 
                href={`/${locale === 'en' ? 'en/' : ''}create`}
                className="btn-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('createSong')}
              </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

