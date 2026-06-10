import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, #7F1D1D, #DC2626, #991B1B)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 44px)', color: '#FFF', marginBottom: '16px' }}
        >
          Hemen Teklif Alın
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '36px' }}
        >
          Uzman ekibimizle iletişime geçin, size en uygun çözümü sunalım.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}
        >
          <a href="tel:+905001234567" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '14px 28px', borderRadius: '10px',
            background: 'white', color: '#DC2626', fontWeight: 700, fontSize: '16px',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Phone size={18} /> Hemen Ara
          </a>
          <Link to="/iletisim" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '14px 28px', borderRadius: '10px',
            background: 'transparent', border: '2px solid rgba(255,255,255,0.7)',
            color: '#FFF', fontWeight: 700, fontSize: '16px',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'}
          >
            İletişim Formu <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
