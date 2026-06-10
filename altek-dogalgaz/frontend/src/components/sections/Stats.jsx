import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Package, Award, Clock } from 'lucide-react'

const stats = [
  { icon: Clock, value: 15, suffix: '+', label: 'Yıl Deneyim', color: '#3B82F6' },
  { icon: Users, value: 5000, suffix: '+', label: 'Mutlu Müşteri', color: '#DC2626' },
  { icon: Award, value: 8, suffix: '+', label: 'Yetkili Marka', color: '#22C55E' },
  { icon: Package, value: 500, suffix: '+', label: 'Ürün Çeşidi', color: '#F97316' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const step = value / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, value)
      setCount(Math.floor(current))
      if (current >= value) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span ref={ref}>{count.toLocaleString('tr-TR')}{suffix}</span>
}

export default function Stats() {
  return (
    <section style={{ background: '#0B1220', padding: '80px 0', borderTop: '1px solid #1E293B', borderBottom: '1px solid #1E293B' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          {stats.map(({ icon: Icon, value, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: `${color}20`,
                border: `1px solid ${color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Icon size={28} style={{ color }} />
              </div>
              <div style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 900,
                fontSize: '48px', color: '#F8FAFC', lineHeight: 1,
                marginBottom: '8px',
              }}>
                <Counter value={value} suffix={suffix} />
              </div>
              <div style={{ color: '#94A3B8', fontSize: '15px', fontWeight: 500 }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
