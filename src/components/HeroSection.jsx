import { ArrowRight, ArrowDown } from 'lucide-react'
import InteractivePhoneShowcase from './InteractivePhoneShowcase'

// Import images for texture loading
import heroMockupImg from '../assets/images/mockup-hero-section.png'

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
            Kelola Lebih Cerdas,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-slate via-brand-slate/85 to-brand-lime-dark">
              Hidup Lebih Tenang.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-brand-text-muted mb-10 max-w-xl font-light leading-relaxed mx-auto md:mx-0">
            Kelola keuangan Anda tanpa stres dengan sentuhan desain modern dan pencatatan harian yang cepat, mudah, dan aman.
          </p>

          {/* Download CTAs & Learn more */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            {/* Play store CTA */}
            <a
              href="https://play.google.com/store/apps/details?id=com.budjet.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-slate text-brand-lime hover:bg-brand-dark rounded-full font-bold text-base tracking-tight shadow-lg shadow-brand-slate/20 hover:shadow-xl hover:shadow-brand-slate/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto group cursor-pointer"
            >
              <svg className="w-6 h-6 mr-2.5 text-brand-lime fill-current" viewBox="0 0 24 24">
                <path d="M5.25 3.012c-.22.015-.41.09-.54.218l11.458 11.458 2.662-2.662L5.432 3.1c-.06-.03-.12-.06-.182-.088zm-.785.45c-.06.12-.1.27-.1.444v16.188c0 .174.04.324.1.444l8.59-8.588zm.245 16.942l14.13-8.152-2.664-2.664L4.72 17.584c.12.13.31.205.53.22.06.002.12-.004.182-.032zM20.25 12c0-.12-.032-.234-.09-.33l-2.906-1.68L14.79 12.55l2.553 2.553 2.817-1.627c.058-.096.09-.21.09-.33z"/>
              </svg>
              Unduh di Play Store
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
