import { motion } from 'framer-motion'
import { ShoppingCart, Wrench, Settings, MessageCircle } from 'lucide-react'

const services = [
  {
    icon: ShoppingCart, title: 'Ürün Satışı',
    desc: 'Türkiye\'nin önde gelen markalarının tüm ürün yelpazesi. Kombi, fırın, termostat ve daha fazlası.',
    color: '#3B82F6',
  },
  {
    icon: Wrench, title: 'Montaj Hizmeti',
    desc: 'Sertifikalı teknisyenlerimizle güvenli ve hızlı montaj. Standartlara uygun kurulum garantisi.',
    color: '#DC2626',
  },
  {
    icon: Settings, title: 'Teknik Servis',
    desc: 'Tüm marka ve modellerde arıza tespiti ve onarım. Orijinal yedek parça kullanımı.',
    color: '#22C55E',
  },
  {
    icon: MessageCircle, title: 'Danışmanlık',
    desc: 'İhtiyacınıza uygun ürün seçimi için uzman danışmanlık. Ücretsiz teknik değerlendirme.',
    color: '#F97316',
  },
]

export default function Services() {
  return (
    <section style={{ padding: '96px 0', background: '#0F172A' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: '20px',
            background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)',
            color: '#DC2626', fontSize: '13px', fontWeight: 600, marginBottom: '16px',
          }}>
            Hizmetlerimiz
          </span>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: '#F8FAFC', marginBottom: '12px' }}>
            Size Nasıl Yardımcı Olabiliriz?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Doğalgaz sistemlerinde ihtiyaç duyduğunuz her konuda yanınızdayız
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {services.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#1E293B', border: '1px solid #334155',
                borderRadius: '16px', padding: '28px',
                transition: 'all 0.3s',
              }}
              whileHover={{ y: -4 }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: `${color}20`, border: `1px solid ${color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <Icon size={26} style={{ color }} />
              </div>
              <h3 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '18px', marginBottom: '10px' }}>{title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
