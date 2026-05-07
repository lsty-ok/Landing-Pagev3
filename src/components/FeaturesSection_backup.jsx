import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Mic, FileSpreadsheet, Sparkles } from 'lucide-react'

// Import modular responsive 3D phone showcases and mockup assets
import InteractivePhoneShowcase from './InteractivePhoneShowcase'
import dailySmartImg from '../assets/images/Mockup-fitur Daily Smart.png'
import asistenPintarImg from '../assets/images/Mockup-fitur Asisten Catatan Pintar.png'
import laporanBulananImg from '../assets/images/Mockup-fitur laporan Bulanan.png'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ScrollTrigger to track the active feature slide range
    const blocks = container.querySelectorAll('.feature-text-block')
    const triggers = []

    blocks.forEach((block) => {
      const index = parseInt(block.getAttribute('data-feature-index'), 10)

      const st = ScrollTrigger.create({
        trigger: block,
        // Trigger active state when block crosses the 45% mark from the top of the viewport
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(index)
          }
        },
      })
      triggers.push(st)
    })

    // Additional smooth entry fade-in reveals for features header
    gsap.fromTo(
      container.querySelector('.features-header'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.querySelector('.features-header'),
          start: 'top 85%',
        },
      }
    )

    return () => {
      // Clean up triggers on unmount
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={containerRef} id="fitur" className="py-24 bg-white relative overflow-visible">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="features-header text-center max-w-3xl mx-auto mb-20 lg:mb-32 select-text">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime-dark/30 text-brand-slate text-xs font-bold uppercase tracking-wider mb-6">
            ✨ Fitur Unggulan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-slate tracking-tight mb-6">
            Atur Keuanganmu Tanpa Ribet
          </h2>
          <p className="text-brand-text-muted text-base sm:text-lg lg:text-xl font-light">
            Dirancang khusus untuk mendukung mobilitas mahasiswa. Nikmati kemudahan pencatatan, analisis mendalam, dan asisten suara cerdas.
          </p>
        </div>

        {/* Sticky Split Columns Container */}
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Scrolling Feature Cards */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-16 lg:space-y-0 pb-16 lg:pb-24">
            
            {/* FEATURE 1: Daily Smart Budgeting */}
            <div 
              className={`feature-text-block relative pl-6 lg:pl-10 border-l-2 transition-all duration-700 ease-out flex flex-col justify-center min-h-[auto] lg:min-h-[75vh] py-8 lg:py-12 ${
                activeIndex === 0 
                  ? 'border-brand-lime opacity-100 scale-100' 
                  : 'border-slate-100 opacity-90 lg:opacity-25 lg:scale-95 lg:blur-[0.2px]'
              }`}
              data-feature-index="0"
            >
              <div className="select-text">
                <div className="w-12 h-12 bg-brand-slate rounded-2xl flex items-center justify-center text-brand-lime font-bold mb-6 shadow-md shadow-brand-slate/10">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-brand-lime-dark tracking-widest uppercase mb-3">OTOMATISASI REAL-TIME</div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-slate mb-6 leading-tight">
                  Anggaran Pintar Harian
                </h3>
                <p className="text-brand-text-muted text-base sm:text-lg leading-relaxed mb-8 font-light">
                  Lupakan pencatatan manual yang membosankan. BudJet secara otomatis menganalisis, mencatat, dan mengelompokkan pengeluaran harian Anda agar keuangan tetap terjaga.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-brand-slate" strokeWidth={3} />
                    </div>
                    <span className="text-brand-slate text-sm sm:text-base font-medium">Kategorisasi otomatis berbasis AI (Makanan, Kos, Buku, Kopi).</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-brand-slate" strokeWidth={3} />
                    </div>
                    <span className="text-brand-slate text-sm sm:text-base font-medium">Notifikasi instan jika Anda melewati batas limit harian.</span>
                  </li>
                </ul>
              </div>

              {/* Mobile Mockup Visual Block (Inline below text on < lg screens) */}
              <div className="lg:hidden mt-10 w-full flex justify-center min-h-[360px]">
                <div className="w-full max-w-[360px] h-[360px] relative overflow-visible rounded-3xl bg-brand-slate/5 border border-brand-border/40 glass-card p-4 flex items-center justify-center">
                  <InteractivePhoneShowcase
                    variant="single"
                    texturePath={dailySmartImg}
                    themeColor="#D4E866"
                  />
                </div>
              </div>
            </div>

            {/* FEATURE 2: Voice Input */}
            <div 
              className={`feature-text-block relative pl-6 lg:pl-10 border-l-2 transition-all duration-700 ease-out flex flex-col justify-center min-h-[auto] lg:min-h-[75vh] py-8 lg:py-12 ${
                activeIndex === 1 
                  ? 'border-brand-blue opacity-100 scale-100' 
                  : 'border-slate-100 opacity-90 lg:opacity-25 lg:scale-95 lg:blur-[0.2px]'
              }`}
              data-feature-index="1"
            >
              <div className="select-text">
                <div className="w-12 h-12 bg-brand-slate rounded-2xl flex items-center justify-center text-brand-blue font-bold mb-6 shadow-md shadow-brand-slate/10">
                  <Mic className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-3">ASISTEN AUDIO INTELEKTUAL</div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-slate mb-6 leading-tight">
                  Asisten Suara Catatan Instan
                </h3>
                <p className="text-brand-text-muted text-base sm:text-lg leading-relaxed mb-8 font-light">
                  Capek mengetik pengeluaran setiap waktu? Cukup ucapkan pengeluaran Anda. Teknologi pengenalan suara kami yang cerdas memahami nominal, nama barang, dan langsung memasukkannya ke dalam tabel budget.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-brand-blue" strokeWidth={3} />
                    </div>
                    <span className="text-brand-slate text-sm sm:text-base font-medium">Akurasi tinggi mengenal dialek dan ungkapan kasual sehari-hari.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-brand-blue" strokeWidth={3} />
                    </div>
                    <span className="text-brand-slate text-sm sm:text-base font-medium">Konversi text-to-finance dalam waktu kurang dari 1 detik.</span>
                  </li>
                </ul>
              </div>

              {/* Mobile Mockup Visual Block (Inline below text on < lg screens) */}
              <div className="lg:hidden mt-10 w-full flex justify-center min-h-[360px]">
                <div className="w-full max-w-[360px] h-[360px] relative overflow-visible rounded-3xl bg-brand-slate/5 border border-brand-border/40 glass-card p-4 flex items-center justify-center">
                  <InteractivePhoneShowcase
                    variant="single"
                    texturePath={asistenPintarImg}
                    themeColor="#60A5FA"
                  />
                </div>
              </div>
            </div>

            {/* FEATURE 3: Monthly Reports */}
            <div 
              className={`feature-text-block relative pl-6 lg:pl-10 border-l-2 transition-all duration-700 ease-out flex flex-col justify-center min-h-[auto] lg:min-h-[75vh] py-8 lg:py-12 ${
                activeIndex === 2 
                  ? 'border-brand-lime opacity-100 scale-100' 
                  : 'border-slate-100 opacity-90 lg:opacity-25 lg:scale-95 lg:blur-[0.2px]'
              }`}
              data-feature-index="2"
            >
              <div className="select-text">
                <div className="w-12 h-12 bg-brand-slate rounded-2xl flex items-center justify-center text-brand-lime font-bold mb-6 shadow-md shadow-brand-slate/10">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-brand-lime-dark tracking-widest uppercase mb-3">EKSPOR EKSEKUTIF</div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-slate mb-6 leading-tight">
                  Laporan Bulanan PDF &amp; Excel
                </h3>
                <p className="text-brand-text-muted text-base sm:text-lg leading-relaxed mb-8 font-light">
                  Butuh menyusun laporan bulanan untuk orang tua atau keperluan beasiswa? Hanya dengan satu klik, ekspor seluruh rekap pengeluaran dan pemasukan Anda dalam bentuk grafik elegan, file Excel, atau dokumen PDF rapi.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-brand-slate" strokeWidth={3} />
                    </div>
                    <span className="text-brand-slate text-sm sm:text-base font-medium">Desain grafik interaktif yang mudah dipahami orang tua.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-brand-slate" strokeWidth={3} />
                    </div>
                    <span className="text-brand-slate text-sm sm:text-base font-medium">Ekspor langsung terintegrasi ke email, WhatsApp, atau Drive.</span>
                  </li>
                </ul>
              </div>

              {/* Mobile Mockup Visual Block (Inline below text on < lg screens) */}
              <div className="lg:hidden mt-10 w-full flex justify-center min-h-[360px]">
                <div className="w-full max-w-[360px] h-[360px] relative overflow-visible rounded-3xl bg-brand-slate/5 border border-brand-border/40 glass-card p-4 flex items-center justify-center">
                  <InteractivePhoneShowcase
                    variant="single"
                    texturePath={laporanBulananImg}
                    themeColor="#D4E866"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Mockup Display (Desktop only, hidden on mobile) */}
          <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-28 h-[calc(100vh-160px)] w-full flex items-center justify-center select-none">
            <div className="relative w-full max-w-[380px] h-[480px] rounded-3xl bg-brand-slate/5 border border-brand-border/40 glass-card p-4 flex items-center justify-center overflow-visible">
              
              {/* Overlapping Absolute Showcase Layers */}
              {/* Slide 0: Daily Smart */}
              <div className={`absolute inset-4 transition-all duration-700 ease-out transform ${
                activeIndex === 0 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-95 -rotate-2 pointer-events-none'
              }`}>
                <InteractivePhoneShowcase
                  variant="single"
                  texturePath={dailySmartImg}
                  themeColor="#D4E866"
                />
              </div>

              {/* Slide 1: Voice Assistant */}
              <div className={`absolute inset-4 transition-all duration-700 ease-out transform ${
                activeIndex === 1 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-95 rotate-2 pointer-events-none'
              }`}>
                <InteractivePhoneShowcase
                  variant="single"
                  texturePath={asistenPintarImg}
                  themeColor="#60A5FA"
                />
              </div>

              {/* Slide 2: Monthly Reports */}
              <div className={`absolute inset-4 transition-all duration-700 ease-out transform ${
                activeIndex === 2 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-95 -rotate-2 pointer-events-none'
              }`}>
                <InteractivePhoneShowcase
                  variant="single"
                  texturePath={laporanBulananImg}
                  themeColor="#D4E866"
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
