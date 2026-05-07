import { ArrowRight, ArrowDown } from 'lucide-react'
import InteractivePhoneShowcase from './InteractivePhoneShowcase'

// Import images for texture loading
import heroMockupImg from '../assets/images/Mockup-Hero section.png'

// Animated Dot Wave Background component ("Animasi titik gelombang")
function DotWaveBackground() {
  const rows = 6
  const cols = 14
  
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none select-none z-0 overflow-visible">
      <div 
        className="grid gap-x-6 gap-y-5" 
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => {
          const r = Math.floor(index / cols)
          const c = index % cols
          // Diagonal sinusoidal stagger delay
          const delay = (r * 0.25 + c * 0.18).toFixed(2)
          
          return (
            <div
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-brand-lime/45 animate-dot-wave shadow-[0_0_6px_rgba(212,232,102,0.35)]"
              style={{
                animationDelay: `${delay}s`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-20">
        
        {/* Left Column Container for 3D Dual-Phone Showcase */}
        <div className="w-full flex items-center justify-center min-h-[380px] md:min-h-[580px] relative">
          {/* Animated Tech Dot Wave Background */}
          <DotWaveBackground />

          <div className="w-full h-[380px] sm:h-[450px] md:h-[580px] overflow-visible flex items-center justify-center z-10">
            <InteractivePhoneShowcase
              variant="hero-composite"
              texturePath={heroMockupImg}
              themeColor="#D4E866"
            />
          </div>
        </div>

        {/* Right Side Content Block */}
        <div className="w-full flex flex-col justify-center text-center md:text-left select-text">
          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-brand-slate mb-6 leading-none">
            BudJet smarter,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-slate via-brand-slate/85 to-brand-lime-dark">
              live better.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-brand-text-muted mb-10 max-w-xl font-light leading-relaxed mx-auto md:mx-0">
            Unlock your financial potential with ease and elegance. BudJet helps you manage your money stress-free with a touch of modern technology and seamless daily automated tracking.
          </p>

          {/* Download CTAs & Learn more */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            {/* Play store CTA */}
            <a
              href="#download-play"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-slate text-brand-lime hover:bg-brand-dark rounded-full font-bold text-base tracking-tight shadow-lg shadow-brand-slate/20 hover:shadow-xl hover:shadow-brand-slate/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto group"
            >
              <svg className="w-6 h-6 mr-2.5 text-brand-lime fill-current" viewBox="0 0 24 24">
                <path d="M5.25 3.012c-.22.015-.41.09-.54.218l11.458 11.458 2.662-2.662L5.432 3.1c-.06-.03-.12-.06-.182-.088zm-.785.45c-.06.12-.1.27-.1.444v16.188c0 .174.04.324.1.444l8.59-8.588zm.245 16.942l14.13-8.152-2.664-2.664L4.72 17.584c.12.13.31.205.53.22.06.002.12-.004.182-.032zM20.25 12c0-.12-.032-.234-.09-.33l-2.906-1.68L14.79 12.55l2.553 2.553 2.817-1.627c.058-.096.09-.21.09-.33z"/>
              </svg>
              Google Play
            </a>

            {/* App Store CTA */}
            <a
              href="#download-ios"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-brand-slate hover:bg-brand-border border border-brand-border/80 rounded-full font-bold text-base tracking-tight shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto group"
            >
              <svg className="w-5 h-5 mr-2.5 text-brand-slate fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.2.12.3.12.87 0 1.94-.55 2.51-1.45" />
              </svg>
              App Store
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
