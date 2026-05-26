import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function InteractivePhoneShowcase({
  variant = 'single',
  texturePath,
  secondaryTexturePath,
  themeColor = '#D4E866',
}) {
  const containerRef = useRef(null)
  const phone1Ref = useRef(null)
  const phone2Ref = useRef(null)
  const glowRef = useRef(null)
  const coinsRef = useRef(null)

  // Floating decoration arrays
  const coin1Ref = useRef(null)
  const coin2Ref = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Continuous Floating Idle Animation ("Diam masih beranimasi")
    const floatTl1 = gsap.to(phone1Ref.current, {
      y: -12,
      duration: 3.0,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    let floatTl2 = null
    if (variant === 'hero-double' && phone2Ref.current) {
      floatTl2 = gsap.to(phone2Ref.current, {
        y: 10,
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.3, // Out of phase for natural breathing
      })
    }

    // Floating Coins Animation
    let floatCoin1 = null
    let floatCoin2 = null
    if (coin1Ref.current) {
      floatCoin1 = gsap.to(coin1Ref.current, {
        y: -15,
        rotation: 360,
        duration: 4.5,
        ease: 'none',
        repeat: -1,
      })
    }
    if (coin2Ref.current) {
      floatCoin2 = gsap.to(coin2Ref.current, {
        y: 12,
        rotation: -360,
        duration: 5.0,
        ease: 'none',
        repeat: -1,
      })
    }

    // 2. Scroll-triggered Entry Animations ("Scroll atas bawah beranimasi")
    if (variant === 'single') {
      // Feature single phone scroll entry flip-in
      gsap.fromTo(
        phone1Ref.current,
        {
          transformPerspective: 1000,
          rotateX: 18,
          rotateY: 45,
          scale: 0.7,
          opacity: 0,
        },
        {
          rotateX: 10,
          rotateY: -10,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    } else if (variant === 'hero-composite') {
      // Hero composite single pre-rendered layout entry animation
      gsap.fromTo(
        phone1Ref.current,
        {
          transformPerspective: 1200,
          rotateX: 15,
          rotateY: 25,
          scale: 0.75,
          opacity: 0,
          y: 40,
        },
        {
          rotateX: 8,
          rotateY: -8,
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'power3.out',
        }
      )
    } else {
      // Hero double phone mount entry animations
      gsap.fromTo(
        phone1Ref.current,
        {
          transformPerspective: 1000,
          rotateX: 12,
          rotateY: 35,
          scale: 0.6,
          opacity: 0,
          x: -60,
        },
        {
          rotateX: 10,
          rotateY: -12,
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.1,
        }
      )

      if (phone2Ref.current) {
        gsap.fromTo(
          phone2Ref.current,
          {
            transformPerspective: 1000,
            rotateX: -10,
            rotateY: -35,
            scale: 0.55,
            opacity: 0,
            x: 60,
          },
          {
            rotateX: -8,
            rotateY: 15,
            scale: 0.88,
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.25,
          }
        )
      }
    }

    // 3. Interactive Mouse-Move 3D Parallax Tilt & Glare
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left // Mouse position relative to container
      const y = e.clientY - rect.top

      // Calculate normalized offset from center [-0.5, 0.5]
      const px = (x / rect.width) - 0.5
      const py = (y / rect.height) - 0.5

      // Move glow backlights subtly to track mouse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: px * 45,
          y: py * 45,
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      // Parallax Tilt Phone 1 (Foreground)
      if (phone1Ref.current) {
        const baseRotX = variant === 'single' ? 10 : (variant === 'hero-composite' ? 8 : 10)
        const baseRotY = variant === 'single' ? -10 : (variant === 'hero-composite' ? -8 : -12)

        gsap.to(phone1Ref.current, {
          rotateY: baseRotY + px * (variant === 'hero-composite' ? 22 : 28),
          rotateX: baseRotX - py * (variant === 'hero-composite' ? 22 : 28),
          x: px * (variant === 'hero-composite' ? 20 : 15),
          y: py * (variant === 'hero-composite' ? 20 : 15),
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      // Parallax Tilt Phone 2 (Background - tilts less for depth feeling)
      if (variant === 'hero-double' && phone2Ref.current) {
        gsap.to(phone2Ref.current, {
          rotateY: 15 + px * 16,
          rotateX: -8 - py * 16,
          x: px * 8,
          y: py * 8,
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      // Move background coins subtly in opposite direction
      if (coinsRef.current) {
        gsap.to(coinsRef.current, {
          x: -px * 25,
          y: -py * 25,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      // Smooth reset back to idle coordinates
      if (glowRef.current) {
        gsap.to(glowRef.current, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' })
      }

      if (phone1Ref.current) {
        gsap.to(phone1Ref.current, {
          rotateX: variant === 'single' ? 10 : (variant === 'hero-composite' ? 8 : 10),
          rotateY: variant === 'single' ? -10 : (variant === 'hero-composite' ? -8 : -12),
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      }

      if (variant === 'hero-double' && phone2Ref.current) {
        gsap.to(phone2Ref.current, {
          rotateX: -8,
          rotateY: 15,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      }

      if (coinsRef.current) {
        gsap.to(coinsRef.current, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' })
      }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      floatTl1.kill()
      if (floatTl2) floatTl2.kill()
      if (floatCoin1) floatCoin1.kill()
      if (floatCoin2) floatCoin2.kill()
    }
  }, [variant])

  // Soft glow color mapping
  const glowColorClass = themeColor === '#60A5FA' 
    ? 'bg-brand-blue/15 shadow-brand-blue/10' 
    : 'bg-brand-lime/15 shadow-brand-lime/10'

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative overflow-visible select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: '1200px' }}
    >
      {/* 1. Glassmorphic Radial Aura Glow Behind Phone (Hidden on mobile to avoid heavy paint!) */}
      <div
        ref={glowRef}
        className={`hidden md:block absolute w-80 h-80 rounded-full blur-3xl opacity-60 mix-blend-screen transition-all duration-300 pointer-events-none ${glowColorClass}`}
        style={{ transform: 'translate3d(0,0,-100px)' }}
      ></div>

      {/* 2. Floating Futuristic Particle Nodes (Sparkles Alternative) */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
        <div className="absolute top-10 left-12 w-2 h-2 rounded-full bg-brand-lime/40 animate-pulse"></div>
        <div className="absolute bottom-20 right-8 w-3 h-3 rounded-full bg-brand-blue/30 animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-12 w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></div>
      </div>

      {/* ================= HERO COMPOSITE DUAL PHONE SHOWCASE ================= */}
      {variant === 'hero-composite' ? (
        <div
          ref={phone1Ref}
          className="relative z-10 w-full max-w-[420px] sm:max-w-[500px] md:max-w-[560px] aspect-[1.1] drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)] origin-center flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-8deg) rotateX(8deg)',
          }}
        >
          <img
            src={texturePath}
            alt="BudJet Hero Composite Showcase"
            className="w-full h-full object-contain pointer-events-none select-none"
            loading="eager"
          />

          {/* Floating Gold/Lime Coins (Hero Only) */}
          <div ref={coinsRef} className="absolute inset-0 pointer-events-none overflow-visible z-30">
            {/* Coin 1 - Top Left */}
            <div
              ref={coin1Ref}
              className="absolute top-[15%] left-0 sm:left-4 w-11 h-11 bg-gradient-to-tr from-brand-lime to-yellow-300 rounded-full flex items-center justify-center font-extrabold text-brand-slate text-sm shadow-[0_4px_12px_rgba(212,232,102,0.45)] ring-2 ring-white/30 border border-brand-slate/10 select-none animate-bounce"
              style={{ animationDuration: '6s' }}
            >
              Rp
            </div>

            {/* Coin 2 - Bottom Right */}
            <div
              ref={coin2Ref}
              className="absolute bottom-[15%] right-0 sm:right-4 w-10 h-10 bg-gradient-to-tr from-brand-blue to-cyan-300 rounded-full flex items-center justify-center font-extrabold text-white text-sm shadow-[0_4px_12px_rgba(96,165,250,0.4)] ring-2 ring-white/30 border border-brand-slate/10 select-none animate-bounce"
              style={{ animationDuration: '7s', animationDelay: '0.5s' }}
            >
              $
            </div>
          </div>
        </div>
      ) : variant === 'hero-double' ? (
        /* ================= HERO DOUBLE PHONE STACKED COMBO ================= */
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          {/* Background Phone (Phone B / Login mockup) */}
          <div
            ref={phone2Ref}
            className="absolute z-10 w-[240px] sm:w-[280px] md:w-[310px] aspect-[9/18.5] drop-shadow-2xl opacity-90 origin-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translate3d(45px, 20px, -150px) rotateY(15deg) rotateX(-8deg)',
            }}
          >
            <img
              src={secondaryTexturePath}
              alt="BudJet Login Interface"
              className="w-full h-full object-contain pointer-events-none select-none rounded-[42px] ring-1 ring-white/10"
              loading="eager"
            />
          </div>

          {/* Foreground Phone (Phone A / Home mockup) */}
          <div
            ref={phone1Ref}
            className="absolute z-20 w-[245px] sm:w-[285px] md:w-[315px] aspect-[9/18.5] drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)] origin-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translate3d(-45px, -10px, 0px) rotateY(-12deg) rotateX(10deg)',
            }}
          >
            <img
              src={texturePath}
              alt="BudJet Home Dashboard"
              className="w-full h-full object-contain pointer-events-none select-none rounded-[42px] ring-1 ring-white/15"
              loading="eager"
            />
          </div>

          {/* Floating Gold/Lime Coins (Hero Only) */}
          <div ref={coinsRef} className="absolute inset-0 pointer-events-none overflow-visible z-30">
            {/* Coin 1 - Top Left */}
            <div
              ref={coin1Ref}
              className="absolute top-16 left-12 sm:left-20 w-11 h-11 bg-gradient-to-tr from-brand-lime to-yellow-300 rounded-full flex items-center justify-center font-extrabold text-brand-slate text-sm shadow-[0_4px_12px_rgba(212,232,102,0.45)] ring-2 ring-white/30 border border-brand-slate/10 select-none animate-bounce"
              style={{ animationDuration: '6s' }}
            >
              Rp
            </div>

            {/* Coin 2 - Bottom Right */}
            <div
              ref={coin2Ref}
              className="absolute bottom-12 right-12 sm:right-20 w-10 h-10 bg-gradient-to-tr from-brand-blue to-cyan-300 rounded-full flex items-center justify-center font-extrabold text-white text-sm shadow-[0_4px_12px_rgba(96,165,250,0.4)] ring-2 ring-white/30 border border-brand-slate/10 select-none animate-bounce"
              style={{ animationDuration: '7s', animationDelay: '0.5s' }}
            >
              $
            </div>
          </div>
        </div>
      ) : (
        /* ================= SINGLE FEATURE PHONE SHOWCASE ================= */
        <div
          ref={phone1Ref}
          className="relative z-10 w-[240px] sm:w-[280px] md:w-[310px] aspect-[9/18.5] drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)] origin-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-10deg) rotateX(10deg)',
          }}
        >
          <img
            src={texturePath}
            alt="BudJet Feature Showcase"
            className="w-full h-full object-contain pointer-events-none select-none"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}
