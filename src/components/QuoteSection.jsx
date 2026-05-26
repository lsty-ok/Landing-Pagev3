import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function QuoteSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const authorRef = useRef(null)
  const quoteMarkLeftRef = useRef(null)
  const quoteMarkRightRef = useRef(null)

  const quoteText = "Anggaran adalah memberi tahu uang Anda ke mana harus pergi, daripada bertanya-tanya ke mana perginya."
  const words = quoteText.split(" ")

  useEffect(() => {
    if (!sectionRef.current) return

    // 1. Word-by-word reveal timeline
    const wordsElements = textRef.current.querySelectorAll('.quote-word')
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse',
      }
    })

    // Animate Quote Marks first or simultaneously
    tl.fromTo(
      [quoteMarkLeftRef.current, quoteMarkRightRef.current],
      { opacity: 0, scale: 0.3, y: -20 },
      { opacity: 0.15, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
    )

    // Stagger word-by-word reveal
    tl.fromTo(
      wordsElements,
      {
        opacity: 0,
        y: 24,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.out',
      },
      '-=0.5' // Overlap slightly with quote marks
    )

    // Reveal Author
    tl.fromTo(
      authorRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.7, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 sm:py-40 bg-[#0B0F19] overflow-hidden flex flex-col items-center justify-center select-text"
    >
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Decorative large quotes */}
      <div
        ref={quoteMarkLeftRef}
        className="absolute top-12 left-8 sm:left-24 text-brand-lime font-serif text-[12rem] sm:text-[18rem] leading-none select-none opacity-0 pointer-events-none"
      >
        “
      </div>
      <div
        ref={quoteMarkRightRef}
        className="absolute bottom-4 right-8 sm:right-24 text-brand-lime font-serif text-[12rem] sm:text-[18rem] leading-none select-none opacity-0 pointer-events-none"
      >
        ”
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center relative z-10 flex flex-col items-center">
        {/* Quote Headline Container */}
        <h2
          ref={textRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-normal sm:leading-relaxed md:leading-relaxed mb-8 max-w-3xl tracking-tight"
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className="quote-word inline-block mr-[0.25em] origin-bottom select-text"
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Divider */}
        <div className="w-12 h-[2px] bg-brand-lime/40 mb-6 rounded-full"></div>

        {/* Author info */}
        <div
          ref={authorRef}
          className="flex flex-col items-center gap-1 opacity-0"
        >
          <span className="text-sm font-bold text-slate-200 tracking-wider uppercase">
            John C. Maxwell
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Pakar Kepemimpinan &amp; Penulis
          </span>
        </div>
      </div>
    </section>
  )
}
