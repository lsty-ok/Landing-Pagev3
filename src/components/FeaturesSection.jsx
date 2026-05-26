"use client";

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Sparkles, Zap, PieChart } from 'lucide-react'

// Mockup image imports & 3D Interactive Phone Showcase
import InteractivePhoneShowcase from './InteractivePhoneShowcase'
import dailySmartImg from '../assets/images/mockup-daily-smart.png'
import asistenPintarImg from '../assets/images/mockup-asisten-catatan-pintar.png'
import laporanBulananImg from '../assets/images/mockup-laporan-bulanan.png'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple, high-performance fade-up animations
      gsap.utils.toArray('.feature-row').forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      id: 1,
      tag: "PENGELOLAAN ANGGARAN TEPAT",
      icon: <Sparkles className="w-5 h-5" />,
      title: "Atur Anggaran Harianmu",
      description: (
        <span>
          Tentukan <strong className="text-white font-bold">batas pengeluaran harian dan bulanan</strong> Anda untuk tiap kategori. Sistem kami akan <strong className="text-white font-bold">memperingatkan Anda</strong> ketika pengeluaran mulai mendekati batas agar dompet tetap aman.
        </span>
      ),
      bullets: [
        <span>Kustomisasi <strong className="text-white font-semibold">kategori pengeluaran tanpa batas</strong>.</span>,
        <span>Peringatan instan saat mendekati <strong className="text-white font-semibold">batas anggaran harian</strong>.</span>,
        <span>Perhitungan otomatis <strong className="text-white font-semibold">sisa saldo harian</strong>.</span>
      ],
      image: dailySmartImg,
      color: "#D4E866",
      colorClass: "text-brand-lime",
      bgClass: "bg-brand-lime/10",
      borderClass: "border-brand-lime/20",
      reverse: false,
      imageSizeClass: "max-w-[500px]",
    },
    {
      id: 2,
      tag: "CATAT CEPAT SUARA",
      icon: <Zap className="w-5 h-5" />,
      title: "Catat Cepat via Suara",
      description: (
        <span>
          Tidak perlu mengetik panjang! Cukup <strong className="text-white font-bold">tekan mikrofon</strong> dan sebutkan transaksi Anda. Kami akan secara otomatis memisahkan <strong className="text-white font-bold">nominal angka, waktu, dan kategori</strong> dari ucapan Anda.
        </span>
      ),
      bullets: [
        <span>Pengenalan suara (<strong className="text-white font-semibold">Speech-to-Text</strong>) yang cepat dan responsif.</span>,
        <span>Deteksi otomatis <strong className="text-white font-semibold">nominal uang</strong> dari ucapan.</span>,
        <span>Identifikasi <strong className="text-white font-semibold">waktu</strong> (misal: "kemarin") tanpa ribet.</span>
      ],
      image: asistenPintarImg,
      color: "#60A5FA",
      colorClass: "text-brand-blue",
      bgClass: "bg-brand-blue/10",
      borderClass: "border-brand-blue/20",
      reverse: true,
      imageSizeClass: "max-w-[400px]",
    },
    {
      id: 3,
      tag: "LAPORAN VISUAL",
      icon: <PieChart className="w-5 h-5" />,
      title: "Laporan Visual & Ekspor CSV",
      description: (
        <span>
          Dapatkan <strong className="text-white font-bold">visibilitas yang jelas</strong> ke mana perginya uang Anda setiap bulan. Tersedia <strong className="text-white font-bold">laporan grafik yang indah</strong> dan fitur <strong className="text-white font-bold">ekspor CSV</strong> untuk keperluan analisis lebih lanjut.
        </span>
      ),
      bullets: [
        <span>Grafik <strong className="text-white font-semibold">visual interaktif</strong> untuk kemudahan analisa.</span>,
        <span>Ekspor seluruh riwayat transaksi ke <strong className="text-white font-semibold">format CSV</strong>.</span>,
        <span>Pantau <strong className="text-white font-semibold">histori arus kas</strong> secara terstruktur.</span>
      ],
      image: laporanBulananImg,
      color: "#D4E866",
      colorClass: "text-brand-lime",
      bgClass: "bg-brand-lime/10",
      borderClass: "border-brand-lime/20",
      reverse: false,
      imageSizeClass: "max-w-[450px]",
    }
  ]

  // Beautiful Tilt Image Sub-component for interactive parallax effect
  const TiltImage = ({ src, alt, imageSizeClass }) => {
    const imgRef = useRef(null)

    const handleMouseMove = (e) => {
      const el = imgRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const xc = rect.width / 2
      const yc = rect.height / 2
      const rotateY = ((x - xc) / xc) * 15 // Max 15 degrees
      const rotateX = -((y - yc) / yc) * 15 // Max 15 degrees

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    }

    const handleMouseLeave = () => {
      const el = imgRef.current
      if (!el) return
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    return (
      <div 
        className={`relative w-full ${imageSizeClass} flex items-center justify-center z-10 group cursor-pointer`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-brand-lime/10 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full pointer-events-none"></div>
        <img 
          ref={imgRef}
          src={src} 
          alt={alt} 
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <section 
      id="fitur" 
      ref={containerRef}
      className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Lightweight background gradients instead of heavy blurs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-lime/5 to-transparent pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
            Fitur Utama
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 font-jakarta">
            Kelola Uang Anda Tanpa Stres
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed">
            Dirancang khusus untuk gaya hidup yang dinamis. Nikmati pencatatan cepat, wawasan pengelolaan yang rapi, dan kemudahan rekam transaksi via suara.
          </p>
        </div>

        {/* Features Zig-Zag Layout */}
        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`feature-row flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}
            >
              
              {/* Text Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className={`inline-flex items-center space-x-2 mb-6 ${feature.colorClass}`}>
                  <div className={`w-10 h-10 ${feature.bgClass} rounded-xl flex items-center justify-center border ${feature.borderClass} shadow-sm`}>
                    {feature.icon}
                  </div>
                  <span className="text-xs font-extrabold tracking-widest uppercase">
                    {feature.tag}
                  </span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight font-jakarta">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-light mb-8">
                  {feature.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`w-6 h-6 rounded-full ${feature.bgClass} ${feature.colorClass} flex items-center justify-center shrink-0 mr-4 mt-0.5 border ${feature.borderClass}`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 text-sm sm:text-base font-medium">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Showcase Image */}
              <div className="w-full md:w-1/2 flex justify-center relative">
                <TiltImage 
                  src={feature.image} 
                  alt={feature.title} 
                  imageSizeClass={feature.imageSizeClass} 
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
