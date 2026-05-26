import { useState } from 'react'
import { Sparkles, Calculator, AlertTriangle, CheckCircle2, Plus, Trash2, Wallet, Layers, ArrowRight, RefreshCw, CalendarDays, Clock, Calendar } from 'lucide-react'

export default function SimulatorSection() {
  const [simMonthlyBudget, setSimMonthlyBudget] = useState(3000000)
  const simDays = 30 // Fixed default 30 days
  
  const [simTransactions, setSimTransactions] = useState([
    { id: 1, amount: 800000, category: 'Tagihan', description: 'Bayar Kos', frequency: 'monthly' },
    { id: 2, amount: 15000, category: 'Transportasi', description: 'Bensin', frequency: 'daily' },
  ])

  const [newSimTxnAmount, setNewSimTxnAmount] = useState('')
  const [newSimTxnCategory, setNewSimTxnCategory] = useState('Makanan & Minuman')
  const [newSimTxnDesc, setNewSimTxnDesc] = useState('')
  const [newSimTxnFreq, setNewSimTxnFreq] = useState('monthly')
  const [errorMsg, setErrorMsg] = useState('')

  // Currency Format (IDR)
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number)
  }

  // Add Simulation Transaction
  const handleAddSimTxn = (e) => {
    e.preventDefault()
    if (!newSimTxnAmount || isNaN(newSimTxnAmount) || Number(newSimTxnAmount) <= 0) {
      setErrorMsg("Masukkan jumlah anggaran yang valid!")
      return
    }
    const newTxn = {
      id: Date.now(),
      amount: Number(newSimTxnAmount),
      category: newSimTxnCategory,
      description: newSimTxnDesc || 'Pengeluaran rutin',
      frequency: newSimTxnFreq
    }
    setSimTransactions([newTxn, ...simTransactions])
    setNewSimTxnAmount('')
    setNewSimTxnDesc('')
    setNewSimTxnFreq('monthly')
    setErrorMsg('')
  }

  // Remove Single Transaction
  const handleRemoveSimTxn = (id) => {
    setSimTransactions(simTransactions.filter(t => t.id !== id))
  }

  // Reset Simulation
  const handleResetSim = () => {
    setSimTransactions([])
  }

  // SIMULATOR LOGIC
  const getMonthlyDeduction = (amount, freq) => {
    if (freq === 'daily') return amount * simDays;
    if (freq === 'weekly') return amount * 4;
    return amount; // monthly
  }

  const simTotalMonthlyExpenses = simTransactions.reduce((acc, t) => acc + getMonthlyDeduction(t.amount, t.frequency), 0)
  const simRemainingMonthly = simMonthlyBudget - simTotalMonthlyExpenses
  const simDailyBudget = simRemainingMonthly / simDays
  const simIsOverbudget = simRemainingMonthly < 0

  const getFreqIcon = (freq) => {
    if (freq === 'daily') return <Clock className="w-3 h-3 inline mr-1" />
    if (freq === 'weekly') return <CalendarDays className="w-3 h-3 inline mr-1" />
    return <Calendar className="w-3 h-3 inline mr-1" />
  }

  const getFreqLabel = (freq) => {
    if (freq === 'daily') return 'Harian'
    if (freq === 'weekly') return 'Mingguan'
    return 'Bulanan'
  }

  const simInsights = (() => {
    if (simTransactions.length === 0) {
      return {
        title: "Kesehatan Finansial Sempurna",
        text: `Belum ada pengeluaran rutin. Anda memiliki jatah harian penuh sebesar ${formatRupiah(simMonthlyBudget / simDays)} untuk digunakan!`,
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
        colorBg: "bg-emerald-50 border-emerald-200 text-emerald-900"
      }
    }
    if (simRemainingMonthly < 0) {
      return {
        title: "Peringatan Over-Budget!",
        text: `Pengeluaran rutin Anda melebihi anggaran bulanan sebesar ${formatRupiah(Math.abs(simRemainingMonthly))}. Kurangi beberapa pengeluaran agar keuangan tetap sehat.`,
        icon: <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />,
        colorBg: "bg-red-50 border-red-200 text-red-900"
      }
    }
    if (simRemainingMonthly < (simMonthlyBudget * 0.2)) {
      return {
        title: "Sisa Anggaran Kritis!",
        text: `Sisa anggaran bulanan Anda menipis. Batas aman harian Anda turun menjadi ${formatRupiah(simDailyBudget)}. Belanjalah dengan bijak!`,
        icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
        colorBg: "bg-amber-50 border-amber-200 text-amber-900"
      }
    }
    return {
      title: "Keuangan Mahasiswa Sehat",
      text: `Luar biasa! Setelah dikurangi pengeluaran rutin, Anda masih memiliki uang saku harian aman sebesar ${formatRupiah(simDailyBudget)}.`,
      icon: <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      colorBg: "bg-emerald-50 border-emerald-200 text-emerald-900"
    }
  })()

  return (
    <section id="simulator" className="py-24 bg-brand-bg relative overflow-hidden select-text">
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-lime/10 blur-[120px] rounded-full pointer-events-none -z-10 glow-ambient"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none -z-10 glow-ambient-delayed"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/20 border border-brand-lime-dark/40 text-brand-slate text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Calculator className="w-4 h-4 text-brand-slate" />
            <span>Simulasi Fitur Interaktif</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-slate tracking-tight leading-tight font-jakarta">
            Simulator <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-brand-lime">Pengelolaan Anggaran</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
            Alat visualisasi interaktif untuk mencoba logika sistem aplikasi BudJet. Atur skenario uang saku Anda dan catat pengeluaran rutin!
          </p>
        </div>

        {/* Simulator Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white border border-brand-border shadow-xl rounded-3xl p-6 sm:p-8 space-y-8 transition-all hover:shadow-2xl">
            
            {/* Step 1: User Profile Scenario */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-brand-border pb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-lime text-brand-slate font-extrabold text-xs">1</span>
                <h3 className="text-lg font-bold text-brand-slate tracking-tight">Skenario Profil Pengguna</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">Uang Saku Mahasiswa Bulanan</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-sm font-extrabold text-brand-slate">Rp</span>
                    <input 
                      type="number" 
                      className="w-full pl-12 pr-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-slate font-bold text-base focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                      value={simMonthlyBudget} 
                      onChange={(e) => setSimMonthlyBudget(Number(e.target.value))} 
                      placeholder="3000000"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 flex justify-between items-center bg-brand-bg p-3 rounded-xl border border-brand-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">Periode Waktu</span>
                  <span className="font-extrabold text-brand-slate text-sm">30 Hari</span>
                </div>
              </div>
            </div>

            {/* Step 2: Add Simulated Expense */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 border-b border-brand-border pb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-slate text-white font-extrabold text-xs">2</span>
                <h3 className="text-lg font-bold text-brand-slate tracking-tight">Tambah Rencana Pengeluaran</h3>
              </div>

              <form onSubmit={handleAddSimTxn} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">Jumlah (Rp)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-sm font-extrabold text-brand-slate">Rp</span>
                    <input 
                      type="number" 
                      className="w-full pl-10 pr-3 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-slate font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                      value={newSimTxnAmount} 
                      onChange={(e) => {
                        setNewSimTxnAmount(e.target.value)
                        if (errorMsg) setErrorMsg('')
                      }} 
                      placeholder="Cth. 50000"
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-xs font-bold text-red-500 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errorMsg}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">Frekuensi</label>
                    <select 
                      className="w-full px-3 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-slate font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all h-[42px]"
                      value={newSimTxnFreq} 
                      onChange={(e) => setNewSimTxnFreq(e.target.value)}
                    >
                      <option value="daily">Setiap Hari</option>
                      <option value="weekly">Setiap Minggu</option>
                      <option value="monthly">Setiap Bulan</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">Kategori</label>
                    <select 
                      className="w-full px-3 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-slate font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all h-[42px]"
                      value={newSimTxnCategory} 
                      onChange={(e) => setNewSimTxnCategory(e.target.value)}
                    >
                      <option value="Makanan & Minuman">🍔 Makanan & Minuman</option>
                      <option value="Transportasi">🚗 Transportasi</option>
                      <option value="Hiburan">🍿 Hiburan</option>
                      <option value="Kesehatan">💊 Kesehatan</option>
                      <option value="Belanja">🛍️ Belanja</option>
                      <option value="Tagihan">⚡ Tagihan</option>
                      <option value="Lainnya">📦 Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">Catatan Transaksi (Opsional)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-slate text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                    value={newSimTxnDesc} 
                    onChange={(e) => setNewSimTxnDesc(e.target.value)} 
                    placeholder="Cth. Bakso pedas di Go-Food"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full group bg-brand-lime text-brand-slate hover:bg-brand-lime-dark font-extrabold py-3.5 px-6 rounded-xl shadow-md hover:shadow-brand-lime/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Tambah Rencana</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Calculation & Output (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white border border-brand-border shadow-xl rounded-3xl p-6 sm:p-8 space-y-6 transition-all hover:shadow-2xl">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-brand-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-lime text-brand-slate font-extrabold text-xs">3</span>
                  <h3 className="text-lg font-bold text-brand-slate tracking-tight">Hasil Kalkulasi Algoritma</h3>
                </div>
                {simTransactions.length > 0 && (
                  <button 
                    onClick={handleResetSim} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer self-end sm:self-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Semua</span>
                  </button>
                )}
              </div>

              {/* 4 Cards Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 bg-brand-bg rounded-2xl border-l-4 border-brand-lime border border-brand-border shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">Anggaran Awal</span>
                  <span className="text-xl font-extrabold text-slate-800 mt-1">{formatRupiah(simMonthlyBudget)}</span>
                </div>
                
                <div className="p-4 bg-brand-bg rounded-2xl border-l-4 border-blue-500 border border-brand-border shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">Estimasi Pengeluaran 30 Hari</span>
                  <span className="text-xl font-extrabold text-slate-800 mt-1">{formatRupiah(simTotalMonthlyExpenses)}</span>
                </div>

                <div className={`p-4 bg-brand-bg rounded-2xl border-l-4 border border-brand-border shadow-sm flex flex-col justify-between ${simIsOverbudget ? 'border-red-500 bg-red-50/50' : 'border-emerald-500'}`}>
                  <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">Sisa Uang Bebas</span>
                  <span className={`text-xl font-extrabold mt-1 ${simIsOverbudget ? 'text-red-600' : 'text-emerald-600'}`}>
                    {formatRupiah(simRemainingMonthly)}
                  </span>
                </div>

                <div className={`p-4 rounded-2xl border-l-4 shadow-sm flex flex-col justify-between ${simIsOverbudget ? 'border-red-500 bg-red-100/50' : 'border-brand-lime bg-brand-lime/10'}`}>
                  <span className="text-xs font-bold text-brand-slate uppercase tracking-wider">Batas Uang Saku Harian</span>
                  <span className={`text-2xl font-extrabold mt-1 ${simIsOverbudget ? 'text-red-600' : 'text-brand-slate'}`}>
                    {simIsOverbudget ? 'Rp 0' : formatRupiah(simDailyBudget)}
                  </span>
                </div>

              </div>

              {/* Smart Engine AI Insight Box */}
              <div className={`p-5 rounded-2xl border space-y-2 transition-all ${simInsights.colorBg}`}>
                <div className="flex items-center gap-2 font-extrabold text-sm tracking-tight">
                  {simInsights.icon}
                  <span>ANALISIS CERDAS BUDJET</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed font-medium opacity-90">
                  {simInsights.text}
                </p>
              </div>

              {/* High-Converting Download CTA Card */}
              <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-800/80 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-xl transition-all duration-300">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5 justify-center sm:justify-start">
                    <Sparkles className="w-4 h-4 text-brand-lime animate-pulse" />
                    Suka Simulasinya?
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Pantau pengeluaran aslimu secara otomatis dengan aplikasi BudJet sekarang!
                  </p>
                </div>
                <a 
                  href="#cta" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.lenis) {
                      window.lenis.scrollTo('#cta');
                    } else {
                      document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-lime text-brand-slate hover:bg-brand-lime-dark font-extrabold text-xs py-3 px-5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Coba Aplikasi Asli</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Simulated Transactions List */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text-muted block">Rencana Pengeluaran Tersimpan:</span>
                
                {simTransactions.length === 0 ? (
                  <div className="text-center py-8 bg-brand-bg border border-brand-border rounded-2xl text-gray-400 font-light text-sm italic">
                    Belum ada rencana pengeluaran yang dicatat.
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto border border-brand-border rounded-2xl divide-y divide-brand-border bg-brand-bg/50 pr-1">
                    {simTransactions.map(t => (
                      <div key={t.id} className="flex items-center justify-between p-3 sm:p-4 hover:bg-white transition-colors">
                        <div className="space-y-1.5 min-w-0 pr-4">
                          <p className="text-sm font-bold text-brand-slate truncate">{t.description}</p>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-200/60 text-brand-text-muted font-semibold text-[10px]">
                              {t.category}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue font-bold text-[10px] uppercase">
                              {getFreqIcon(t.frequency)} {getFreqLabel(t.frequency)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right">
                            <span className="font-extrabold text-sm text-red-600 block">
                              -{formatRupiah(t.amount)}
                            </span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                              / {t.frequency}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleRemoveSimTxn(t.id)} 
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove Transaction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
