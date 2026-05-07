"use client";

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Sparkles, Mic, FileSpreadsheet } from 'lucide-react'

// Mockup image imports
import dailySmartImg from '../assets/images/Mockup-fitur Daily Smart.png'
import asistenPintarImg from '../assets/images/Mockup-fitur Asisten Catatan Pintar.png'
import laporanBulananImg from '../assets/images/Mockup-fitur laporan Bulanan.png'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const containerRef = useRef(null)
  
  // Card Refs
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

  // Active Path Refs
  const path1Ref = useRef(null)
  const path2Ref = useRef(null)
  const path3Ref = useRef(null)
  const path4Ref = useRef(null)

  // Node (Circle) Refs
  const node1Ref = useRef(null)
  const node2Ref = useRef(null)
  const node3Ref = useRef(null)

  // Node Glow Ring Refs
  const node1GlowRef = useRef(null)
  const node2GlowRef = useRef(null)
  const node3GlowRef = useRef(null)

  // Mobile trail ref
  const mobileTrailRef = useRef(null)

  // SVG Paths state (calculated dynamically)
  const [paths, setPaths] = useState(null)

  // Function to calculate exact motherboard-style coordinates based on card offsets
  const updatePath = () => {
    if (!containerRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current) return

    const gridRect = containerRef.current.getBoundingClientRect()
    const card1Rect = card1Ref.current.getBoundingClientRect()
    const card2Rect = card2Ref.current.getBoundingClientRect()
    const card3Rect = card3Ref.current.getBoundingClientRect()

    // Calculate vertical centers of cards relative to the features grid container
    const y1 = card1Rect.top - gridRect.top + card1Rect.height / 2
    const y2 = card2Rect.top - gridRect.top + card2Rect.height / 2
    const y3 = card3Rect.top - gridRect.top + card3Rect.height / 2

    const width = gridRect.width
    const x_mid = width / 2
    const bottom = gridRect.height

    // Calculate Motherboard-style paths (incorporating 90° and 45° angled bends)
    // Gap / column width is 160px. Column 2 has left edge: x_mid - 80px, right edge: x_mid + 80px.
    // Node 1 is at x_mid - 80px, Node 2 is at x_mid + 80px, Node 3 is at x_mid - 80px.

    // 1. Path 1: Top of section to Node 1 (Left Column)
    const d1 = `M ${x_mid} 0 
                L ${x_mid} ${y1 - 80} 
                L ${x_mid - 40} ${y1 - 40} 
                L ${x_mid - 40} ${y1 - 20} 
                L ${x_mid - 60} ${y1} 
                L ${x_mid - 80} ${y1}`

    // 2. Path 2: Node 1 to Node 2 (Right Column)
    const d2 = `M ${x_mid - 80} ${y1} 
                L ${x_mid - 60} ${y1} 
                L ${x_mid - 40} ${y1 + 20} 
                L ${x_mid - 40} ${y1 + 60} 
                L ${x_mid} ${y1 + 100} 
                L ${x_mid} ${y2 - 80} 
                L ${x_mid + 40} ${y2 - 40} 
                L ${x_mid + 40} ${y2 - 20} 
                L ${x_mid + 60} ${y2} 
                L ${x_mid + 80} ${y2}`

    // 3. Path 3: Node 2 to Node 3 (Left Column)
    const d3 = `M ${x_mid + 80} ${y2} 
                L ${x_mid + 60} ${y2} 
                L ${x_mid + 40} ${y2 + 20} 
                L ${x_mid + 40} ${y2 + 60} 
                L ${x_mid} ${y2 + 100} 
                L ${x_mid} ${y3 - 80} 
                L ${x_mid - 40} ${y3 - 40} 
                L ${x_mid - 40} ${y3 - 20} 
                L ${x_mid - 60} ${y3} 
                L ${x_mid - 80} ${y3}`

    // 4. Path 4: Node 3 to bottom of section
    const d4 = `M ${x_mid - 80} ${y3} 
                L ${x_mid - 60} ${y3} 
                L ${x_mid - 40} ${y3 + 20} 
                L ${x_mid - 40} ${y3 + 60} 
                L ${x_mid} ${y3 + 100} 
                L ${x_mid} ${bottom}`

    setPaths({ d1, d2, d3, d4, x_mid, y1, y2, y3, bottom })
  }

  // Set up resize observer to dynamically recalculate paths on container scale changes
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      updatePath()
    })
    observer.observe(container)

    // Fallback trigger after a short duration to ensure fully-rendered images are accounted for
    const loadTimeout = setTimeout(() => {
      updatePath()
    }, 600)

    window.addEventListener('load', updatePath)

    return () => {
      observer.disconnect()
      clearTimeout(loadTimeout)
      window.removeEventListener('load', updatePath)
    }
  }, [])

  // GSAP ScrollTrigger Animations matching desktop/mobile configurations
  useEffect(() => {
    if (!paths) return

    const mm = gsap.matchMedia()

    // DESKTOP ANIMATIONS (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const activePath1 = path1Ref.current
      const activePath2 = path2Ref.current
      const activePath3 = path3Ref.current
      const activePath4 = path4Ref.current

      const setupPath = (pathEl) => {
        if (!pathEl) return 0
        const length = pathEl.getTotalLength()
        gsap.set(pathEl, {
          strokeDasharray: length,
          strokeDashoffset: length
        })
        return length
      }

      setupPath(activePath1)
      setupPath(activePath2)
      setupPath(activePath3)
      setupPath(activePath4)

      // Initialize all nodes and glow rings to dimmed/scale state
      gsap.set([node1Ref.current, node2Ref.current, node3Ref.current], {
        scale: 0.3,
        opacity: 0.1,
      })
      gsap.set([node1GlowRef.current, node2GlowRef.current, node3GlowRef.current], {
        scale: 0,
        opacity: 0,
      })

      // Initialize all cards to transparent/dark state
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        opacity: 0.15,
        filter: 'brightness(0.3) blur(2px)',
        scale: 0.97,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
      })

      // Initialize card internal elements for sliding reveal
      gsap.set([
        card1Ref.current.querySelectorAll('.card-animate-el'),
        card2Ref.current.querySelectorAll('.card-animate-el'),
        card3Ref.current.querySelectorAll('.card-animate-el')
      ], {
        y: 20,
        opacity: 0,
      })

      // Master GSAP scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 35%',
          end: 'bottom 85%',
          scrub: 1.2, // Ultra-smooth data energy flow speed
          markers: false,
        }
      })

      // ---- FEATURE 1: Anggaran Pintar ----
      // 1. Draw Path 1 to Node 1
      tl.to(activePath1, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 'segment1')
      .to(node1Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, 'segment1+=0.5')

      // 2. Node 1 Explosion + Card 1 Activation (Lime Green)
      tl.to(node1Ref.current, {
        scale: 1.6,
        backgroundColor: '#D4E866',
        duration: 0.2,
      }, 'node1Hit')
      .to(node1GlowRef.current, {
        scale: 2.8,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 'node1Hit')
      .to(node1GlowRef.current, {
        scale: 1,
        opacity: 0.3,
        duration: 0.3,
      }, 'node1Hit+=0.3')
      .to(card1Ref.current, {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(212, 232, 102, 0.35)',
        boxShadow: '0 0 40px rgba(212, 232, 102, 0.22)',
        duration: 0.5,
      }, 'node1Hit')
      .to(card1Ref.current.querySelectorAll('.card-animate-el'), {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
      }, 'node1Hit+=0.1')

      // ---- FEATURE 2: Asisten Suara ----
      // 3. Draw Path 2 to Node 2
      .to(activePath2, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 'segment2')
      .to(node2Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, 'segment2+=0.5')

      // 4. Node 2 Explosion + Card 2 Activation (Tech Blue)
      .to(node2Ref.current, {
        scale: 1.6,
        backgroundColor: '#60A5FA',
        duration: 0.2,
      }, 'node2Hit')
      .to(node2GlowRef.current, {
        scale: 2.8,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 'node2Hit')
      .to(node2GlowRef.current, {
        scale: 1,
        opacity: 0.3,
        duration: 0.3,
      }, 'node2Hit+=0.3')
      .to(card2Ref.current, {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(96, 165, 250, 0.35)',
        boxShadow: '0 0 40px rgba(96, 165, 250, 0.22)',
        duration: 0.5,
      }, 'node2Hit')
      .to(card2Ref.current.querySelectorAll('.card-animate-el'), {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
      }, 'node2Hit+=0.1')

      // ---- FEATURE 3: Laporan Bulanan ----
      // 5. Draw Path 3 to Node 3
      .to(activePath3, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 'segment3')
      .to(node3Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, 'segment3+=0.5')

      // 6. Node 3 Explosion + Card 3 Activation (Lime Green)
      .to(node3Ref.current, {
        scale: 1.6,
        backgroundColor: '#D4E866',
        duration: 0.2,
      }, 'node3Hit')
      .to(node3GlowRef.current, {
        scale: 2.8,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 'node3Hit')
      .to(node3GlowRef.current, {
        scale: 1,
        opacity: 0.3,
        duration: 0.3,
      }, 'node3Hit+=0.3')
      .to(card3Ref.current, {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(212, 232, 102, 0.35)',
        boxShadow: '0 0 40px rgba(212, 232, 102, 0.22)',
        duration: 0.5,
      }, 'node3Hit')
      .to(card3Ref.current.querySelectorAll('.card-animate-el'), {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
      }, 'node3Hit+=0.1')

      // ---- PATH TERMINATION ----
      // 7. Draw Path 4 to the bottom of the section
      .to(activePath4, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 'segment4')
    })

    // MOBILE ANIMATIONS (< 768px)
    mm.add("(max-width: 767px)", () => {
      // Ensure all cards are fully bright, readable, and default scaling on mobile
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        boxShadow: 'none',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      })

      gsap.set([
        card1Ref.current.querySelectorAll('.card-animate-el'),
        card2Ref.current.querySelectorAll('.card-animate-el'),
        card3Ref.current.querySelectorAll('.card-animate-el')
      ], {
        y: 0,
        opacity: 1,
      })

      // Mobile left-aligned circuit line height animation
      gsap.fromTo(mobileTrailRef.current, 
        { height: '0%' },
        {
          height: '100%',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            end: 'bottom 85%',
            scrub: 1.0,
          }
        }
      )

      // Staggered cards entry fade-up as they enter viewport
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current]
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      })
    })

    return () => {
      mm.revert()
    }
  }, [paths])

  return (
    <section 
      id="fitur" 
      className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Dynamic ambient dark glowing layers */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-xs font-bold uppercase tracking-wider mb-6">
            ✨ Fitur Unggulan
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 font-jakarta">
            Atur Keuanganmu Tanpa Ribet
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed">
            Dirancang khusus untuk mendukung mobilitas mahasiswa. Nikmati kemudahan pencatatan, analisis mendalam, dan asisten suara cerdas.
          </p>
        </div>

        {/* 
          Features Grid Container
          This grid dynamically aligns the columns of cards and houses the circuit SVG overlay.
        */}
        <div 
          ref={containerRef} 
          className="relative grid grid-cols-1 md:grid-cols-[1fr_160px_1fr] gap-x-8 gap-y-16 md:gap-y-28 items-stretch"
        >
          {/* Mobile vertical circuit glowing line (rendered on the left margin for mobile view) */}
          <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-slate-900 md:hidden pointer-events-none rounded-full">
            <div 
              ref={mobileTrailRef} 
              className="w-full bg-brand-lime absolute top-0 rounded-full" 
              style={{ boxShadow: '0 0 12px #D4E866, 0 0 4px #D4E866' }}
            ></div>
          </div>

          {/* DYNAMIC SVG LAYER (Desktop/Tablet motherboard traces) */}
          {paths && (
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              style={{ zIndex: 0 }}
            >
              <defs>
                {/* Neon Glow filters for energetic look */}
                <filter id="glow-lime" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* BACKGROUND REDUP/SAMAR TRACES */}
              <path d={paths.d1} stroke="#101726" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={paths.d1} stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              
              <path d={paths.d2} stroke="#101726" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={paths.d2} stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              
              <path d={paths.d3} stroke="#101726" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={paths.d3} stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              
              <path d={paths.d4} stroke="#101726" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={paths.d4} stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />

              {/* ENERGETIC GLOWING TRACES (Animated with GSAP) */}
              <path 
                ref={path1Ref} 
                d={paths.d1} 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow-lime)" 
              />
              <path 
                ref={path2Ref} 
                d={paths.d2} 
                stroke="#60A5FA" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow-blue)" 
              />
              <path 
                ref={path3Ref} 
                d={paths.d3} 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow-lime)" 
              />
              <path 
                ref={path4Ref} 
                d={paths.d4} 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow-lime)" 
              />

              {/* BACKGROUND CIRCLE SLEEVES FOR NODES */}
              <circle cx={paths.x_mid - 80} cy={paths.y1} r="9" fill="#0B0F19" stroke="#1E293B" strokeWidth="1.5" />
              <circle cx={paths.x_mid + 80} cy={paths.y2} r="9" fill="#0B0F19" stroke="#1E293B" strokeWidth="1.5" />
              <circle cx={paths.x_mid - 80} cy={paths.y3} r="9" fill="#0B0F19" stroke="#1E293B" strokeWidth="1.5" />

              {/* ENERGETIC TRIGGER NODES (TITIK PIJAR) */}
              {/* Node 1 */}
              <circle 
                ref={node1Ref} 
                cx={paths.x_mid - 80} 
                cy={paths.y1} 
                r="5" 
                fill="#1E293B" 
              />
              <circle 
                ref={node1GlowRef} 
                cx={paths.x_mid - 80} 
                cy={paths.y1} 
                r="10" 
                fill="none" 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                opacity="0"
                filter="url(#glow-lime)"
              />

              {/* Node 2 */}
              <circle 
                ref={node2Ref} 
                cx={paths.x_mid + 80} 
                cy={paths.y2} 
                r="5" 
                fill="#1E293B" 
              />
              <circle 
                ref={node2GlowRef} 
                cx={paths.x_mid + 80} 
                cy={paths.y2} 
                r="10" 
                fill="none" 
                stroke="#60A5FA" 
                strokeWidth="2.5" 
                opacity="0"
                filter="url(#glow-blue)"
              />

              {/* Node 3 */}
              <circle 
                ref={node3Ref} 
                cx={paths.x_mid - 80} 
                cy={paths.y3} 
                r="5" 
                fill="#1E293B" 
              />
              <circle 
                ref={node3GlowRef} 
                cx={paths.x_mid - 80} 
                cy={paths.y3} 
                r="10" 
                fill="none" 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                opacity="0"
                filter="url(#glow-lime)"
              />
            </svg>
          )}

          {/* ========================================================= */}
          {/* BARIS 1: FEATURE 1 (Anggaran Pintar - Left Column) */}
          {/* ========================================================= */}
          <div className="md:col-start-1 pl-8 md:pl-0">
            <div 
              ref={card1Ref} 
              className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between h-full hover:border-white/20 group"
            >
              {/* Dynamic decorative backdrop orb */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-brand-lime/5 blur-[50px] group-hover:bg-brand-lime/10 transition-colors duration-500 pointer-events-none"></div>

              {/* Card visual showcase */}
              <div className="card-animate-el w-full aspect-[4/3] bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/10 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <img 
                    src={dailySmartImg} 
                    alt="Anggaran Pintar Harian" 
                    className="max-h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Card text content */}
              <div>
                <div className="card-animate-el flex items-center space-x-3 mb-4">
                  <div className="w-9 h-9 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime font-bold border border-brand-lime/20 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-lime tracking-widest uppercase">OTOMATISASI REAL-TIME</span>
                </div>
                
                <h3 className="card-animate-el text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight font-jakarta">
                  Anggaran Pintar Harian
                </h3>
                
                <p className="card-animate-el text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Lupakan pencatatan manual yang membosankan. BudJet secara otomatis menganalisis, mencatat, dan mengelompokkan pengeluaran harian Anda agar keuangan tetap terjaga.
                </p>

                <ul className="card-animate-el space-y-3.5">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-lime/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">Kategorisasi otomatis berbasis AI (Makanan, Kos, Buku, Kopi).</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-lime/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">Notifikasi instan jika Anda melewati batas limit harian.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Spacer Column */}
          <div className="hidden md:block md:col-start-2"></div>
          {/* Spacer Right Column */}
          <div className="hidden md:block md:col-start-3"></div>

          {/* ========================================================= */}
          {/* BARIS 2: FEATURE 2 (Asisten Suara - Right Column) */}
          {/* ========================================================= */}
          {/* Spacer Left Column */}
          <div className="hidden md:block md:col-start-1"></div>
          {/* Spacer Column */}
          <div className="hidden md:block md:col-start-2"></div>
          
          <div className="md:col-start-3 pl-8 md:pl-0">
            <div 
              ref={card2Ref} 
              className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between h-full hover:border-white/20 group"
            >
              {/* Dynamic decorative backdrop orb */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-brand-blue/5 blur-[50px] group-hover:bg-brand-blue/10 transition-colors duration-500 pointer-events-none"></div>

              {/* Card visual showcase */}
              <div className="card-animate-el w-full aspect-[4/3] bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <img 
                    src={asistenPintarImg} 
                    alt="Asisten Suara Instan" 
                    className="max-h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Card text content */}
              <div>
                <div className="card-animate-el flex items-center space-x-3 mb-4">
                  <div className="w-9 h-9 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue font-bold border border-brand-blue/20 shadow-sm">
                    <Mic className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-blue tracking-widest uppercase">ASISTEN AUDIO CERDAS</span>
                </div>
                
                <h3 className="card-animate-el text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight font-jakarta">
                  Asisten Suara Instan
                </h3>
                
                <p className="card-animate-el text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Capek mengetik pengeluaran setiap waktu? Cukup ucapkan pengeluaran Anda. Teknologi pengenalan suara kami yang cerdas memahami nominal, nama barang, dan langsung memasukkannya ke dalam tabel budget.
                </p>

                <ul className="card-animate-el space-y-3.5">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-blue/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">Akurasi tinggi mengenal dialek dan ungkapan kasual sehari-hari.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-blue/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">Konversi text-to-finance dalam waktu kurang dari 1 detik.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BARIS 3: FEATURE 3 (Laporan Bulanan - Left Column) */}
          {/* ========================================================= */}
          <div className="md:col-start-1 pl-8 md:pl-0">
            <div 
              ref={card3Ref} 
              className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between h-full hover:border-white/20 group"
            >
              {/* Dynamic decorative backdrop orb */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-brand-lime/5 blur-[50px] group-hover:bg-brand-lime/10 transition-colors duration-500 pointer-events-none"></div>

              {/* Card visual showcase */}
              <div className="card-animate-el w-full aspect-[4/3] bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/10 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <img 
                    src={laporanBulananImg} 
                    alt="Laporan Bulanan PDF & Excel" 
                    className="max-h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Card text content */}
              <div>
                <div className="card-animate-el flex items-center space-x-3 mb-4">
                  <div className="w-9 h-9 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime font-bold border border-brand-lime/20 shadow-sm">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-lime tracking-widest uppercase">EKSPOR EKSEKUTIF</span>
                </div>
                
                <h3 className="card-animate-el text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight font-jakarta">
                  Laporan Bulanan PDF &amp; Excel
                </h3>
                
                <p className="card-animate-el text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Butuh menyusun laporan bulanan untuk orang tua atau keperluan beasiswa? Hanya dengan satu klik, ekspor seluruh rekap pengeluaran dan pemasukan Anda dalam bentuk grafik elegan, file Excel, atau dokumen PDF rapi.
                </p>

                <ul className="card-animate-el space-y-3.5">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-lime/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">Desain grafik interaktif yang mudah dipahami orang tua.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-lime/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">Ekspor langsung terintegrasi ke email, WhatsApp, atau Drive.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Spacer Column */}
          <div className="hidden md:block md:col-start-2"></div>
          {/* Spacer Right Column */}
          <div className="hidden md:block md:col-start-3"></div>

        </div>

      </div>
    </section>
  )
}
