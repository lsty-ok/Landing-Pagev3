import { Users } from 'lucide-react'

const teamMembers = [
  { id: '3124500001', name: 'Satrio Faiz Alfarizi', role: 'D3 IT A', icon: '🦊' },
  { id: '3124500002', name: 'Muhammad Riansetyo Rudiyanto', role: 'D3 IT A', icon: '🦁' },
  { id: '3124500013', name: 'Made Bagus Aditya Putra', role: 'D3 IT A', icon: '🐯' },
  { id: '3124500019', name: 'Shidqi Nafis Amar Nuwiancety', role: 'D3 IT A', icon: '🐼' },
  { id: '3124500021', name: 'Resty Setya Indrayani', role: 'D3 IT A', icon: '🐱' },
  { id: '3124500026', name: 'Lalu Moh Hisyam Farki', role: 'D3 IT A', icon: '🐺' },
  { id: '3124500029', name: 'Abdul Ghoni Al Muridi', role: 'D3 IT A', icon: '🐻' },
]

export default function TeamSection() {
  return (
    <section id="team" className="py-32 bg-brand-slate relative overflow-hidden select-text text-white">
      {/* Premium ambient light backgrounds */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-brand-blue/5 via-transparent to-brand-lime/5 pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-lime/5 blur-[150px] rounded-full pointer-events-none -z-10 glow-ambient"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-brand-lime text-xs font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
            <Users className="w-4 h-4" />
            <span>People Behind the App</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-jakarta">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">Development Team</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Behind BudJet's advanced features is a dedicated team of students building the best financial assistant for you.
          </p>
        </div>

        {/* Team Flex Layout: Naturally centers 4 items on row 1, and 3 items on row 2 */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] min-w-[260px] max-w-[320px] relative group"
            >
              {/* Animated background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-lime/20 to-brand-blue/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
              
              {/* Card Glassmorphism */}
              <div className="relative bg-slate-800/40 backdrop-blur-md border border-white/10 hover:border-brand-lime/30 rounded-3xl p-8 text-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(204,255,0,0.15)] overflow-hidden h-full flex flex-col items-center">
                
                {/* Top glare effect */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Avatar with glowing ring */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-brand-lime/20 rounded-full animate-pulse blur-md group-hover:bg-brand-lime/50 transition-colors duration-500"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 rounded-full flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 group-hover:border-brand-lime/50 transition-all duration-500">
                    {member.icon}
                  </div>
                </div>
                
                {/* Text Content */}
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight leading-snug group-hover:text-brand-lime transition-colors duration-300">
                  {member.name}
                </h3>
                
                <div className="mt-auto pt-4 flex flex-col items-center gap-3">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{member.role}</p>
                  
                  {/* Styled ID Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/5 group-hover:bg-black/60 group-hover:border-white/10 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse"></span>
                    <p className="text-gray-300 text-xs font-mono font-medium tracking-wider">{member.id}</p>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
