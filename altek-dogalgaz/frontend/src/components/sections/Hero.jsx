import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, ShieldCheck, Award, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0F172A 100%)',
      position: 'relative',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
        opacity: 0.5,
      }} />

      {/* Gradient blobs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        borderRadius: '50%', top: '-200px', right: '-200px',
        background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        borderRadius: '50%', bottom: '-200px', left: '-100px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 60px', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: '760px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '20px',
              background: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: '#DC2626', fontSize: '13px', fontWeight: 600,
              marginBottom: '24px',
              letterSpacing: '0.5px',
            }}>
              <Zap size={14} />
              Türkiye'nin Güvenilir Doğalgaz Uzmanı
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 900,
              color: '#F8FAFC',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            Doğalgaz Sistemleri{' '}
            <span style={{
              background: 'linear-gradient(90deg, #3B82F6, #DC2626)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Güvenle
            </span>{' '}
            Kurulur
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '18px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '40px', maxWidth: '580px' }}
          >
            ECA, Baymak, Demirdöküm ve daha fazlası. Kombi satışından montaja, bakımdan teknik servise tüm ihtiyaçlarınız için buradayız.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '60px' }}
          >
            <Link to="/urunler" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 28px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #1E3A8A, #2563EB)',
              color: '#F8FAFC', fontWeight: 700, fontSize: '16px',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Ürünleri Keşfet <ArrowRight size={18} />
            </Link>
            <a href="tel:+905001234567" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 28px', borderRadius: '10px',
              background: 'transparent',
              border: '1px solid #334155',
              color: '#F8FAFC', fontWeight: 600, fontSize: '16px',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#DC2626'; e.currentTarget.style.color = '#DC2626' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#F8FAFC' }}
            >
              <Phone size={18} /> Hemen Ara
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}
          >
            {[
              { icon: ShieldCheck, text: '15+ Yıl Deneyim' },
              { icon: Award, text: 'Yetkili Servis' },
              { icon: Zap, text: '7/24 Destek' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '14px' }}>
                <Icon size={18} style={{ color: '#3B82F6' }} />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
