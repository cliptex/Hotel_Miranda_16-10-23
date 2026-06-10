import { motion } from 'framer-motion'
import { useBrands } from '../../hooks/useProducts.js'

export default function Brands() {
  const { data: brands = [] } = useBrands()
  const names = brands.length > 0 ? brands.map(b => b.name) : ['ECA', 'Baymak', 'Demirdöküm', 'Bosch', 'Vaillant', 'Ariston', 'Ferroli', 'Buderus']
  const doubled = [...names, ...names]

  return (
    <section style={{ padding: '80px 0', background: '#0B1220', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', color: '#F8FAFC', marginBottom: '12px' }}>
          Çalıştığımız Markalar
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '15px' }}>
          Türkiye'nin önde gelen doğalgaz markalarının yetkili satıcısı ve servisi
        </p>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '32px', width: 'max-content' }}
        >
          {doubled.map((name, i) => (
            <div key={i} style={{
              flexShrink: 0,
              padding: '20px 40px',
              background: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '12px',
              color: '#F8FAFC',
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '1px',
              whiteSpace: 'nowrap',
            }}>
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
