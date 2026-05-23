import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, X, ArrowRight } from 'lucide-react'

export default function FloatingNav() {
  const navRef = useRef(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    // Hide navbar on scroll down, show on scroll up with increased blur & shadow
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (!navRef.current) return

      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 400) {
          // Scrolling down - hide elegantly
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.inOut',
          })
        } else {
          // Scrolling up - show with tighter dimensions and increased blur
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            paddingTop: '0.65rem',
            paddingBottom: '0.65rem',
            boxShadow: '0 12px 40px -15px rgba(15, 23, 42, 0.05)',
            backgroundColor: 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(20px)',
            webkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(15, 23, 42, 0.04)',
            duration: 0.4,
            ease: 'power3.out',
          })
        }
      } else {
        // At the very top - default spacious design
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
          boxShadow: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.0)',
          backdropFilter: 'blur(0px)',
          webkitBackdropFilter: 'blur(0px)',
          borderBottom: '1px solid rgba(15, 23, 42, 0.0)',
          duration: 0.35,
          ease: 'power3.out',
        })
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#fitur' },
    { label: 'Simulator', href: '#simulator' },
    { label: 'Reviews', href: '#ulasan' },
    { label: 'FAQ', href: '#faq' },
  ]

  // Smooth scroll handler via Lenis
  const scrollToSection = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -60, duration: 1.4, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      } else {
        const offsetPosition = target.getBoundingClientRect().top + window.scrollY - 60
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 w-full"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center space-x-2.5 group select-none"
          >
            <img 
              src="/logo.svg" 
              alt="BudJet Logo" 
              className="h-9 w-9 rounded-xl object-cover border border-slate-900/5 shadow-md group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(212,232,102,0.15)] transition-all duration-300 scale-x-[-1]" 
            />
            <span className="font-extrabold text-xl tracking-tight text-brand-slate">
              Bud<span className="text-brand-lime">J</span>et.
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8 bg-slate-900/5 px-6 py-2 rounded-full border border-slate-900/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)] backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-xs font-semibold text-brand-text-muted hover:text-brand-slate transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1.5px] after:w-0 after:bg-brand-lime hover:after:w-3/4 after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <a
              href="#cta"
              onClick={(e) => scrollToSection(e, '#cta')}
              className="inline-flex items-center justify-center px-5 py-2 bg-brand-lime text-brand-slate hover:bg-brand-lime-dark rounded-full font-bold text-xs tracking-tight shadow-sm hover:shadow-[0_4px_15px_rgba(212,232,102,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 group select-none cursor-pointer"
            >
              Download
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-slate hover:text-brand-text-muted focus:outline-none transition-colors duration-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-brand-border/60 py-6 px-6 flex flex-col space-y-4 shadow-xl transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                setMobileMenuOpen(false)
                scrollToSection(e, item.href)
              }}
              className="text-sm font-semibold text-brand-slate hover:text-brand-lime-dark transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <div className="h-px bg-slate-900/5 my-1"></div>
          <div className="flex flex-col space-y-3 pt-1">
            <a
              href="#cta"
              onClick={(e) => {
                setMobileMenuOpen(false)
                scrollToSection(e, '#cta')
              }}
              className="inline-flex items-center justify-center py-2.5 bg-brand-lime text-brand-slate hover:bg-brand-lime-dark rounded-full font-bold text-sm tracking-tight shadow-sm cursor-pointer"
            >
              Download Now
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
