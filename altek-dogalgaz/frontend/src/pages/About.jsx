import { motion } from 'framer-motion'
import { ShieldCheck, Award, Users, Zap, Heart, Star } from 'lucide-react'
import { useBrands } from '../hooks/useProducts.js'

const values = [
  { icon: ShieldCheck, title: 'Güvenilirlik', desc: 'Müşterilerimize verdiğimiz sözü her zaman tutarız. Kaliteli ürün ve güvenilir hizmet önceliğimizdir.', color: '#3B82F6' },
  { icon: Award, title: 'Kalite', desc: 'Sadece orijinal ve standartlara uygun ürünler satarız. Montaj ve servislerimiz sertifikalı teknisyenler tarafından yapılır.', color: '#DC2626' },
  { icon: Users, title: 'Müşteri Odaklılık', desc: 'Her müşterimizi özel olarak değerlendiririz. İhtiyacınıza en uygun çözümü sunmak için çalışırız.', color: '#22C55E' },
  { icon: Heart, title: 'Tutkulu Hizmet', desc: '15 yılı aşkın deneyimimizle işimizi sevgi ve tutkuyla yapıyoruz. Müşteri memnuniyeti bizim başarımızdır.', color: '#F97316' },
  { icon: Zap, title: 'Hızlı Çözüm', desc: 'Acil durumlarda hızlı müdahale ekibimizle yanınızdayız. Sorunlarınızı en kısa sürede çözüme kavuştururuz.', color: '#A855F7' },
  { icon: Star, title: 'Uzman Ekip', desc: 'Alanında uzman, sürekli eğitim alan teknisyen ve satış ekibimizle en iyi hizmeti sunuyoruz.', color: '#EAB308' },
]

export default function About() {
  const { data: brands = [] } = useBrands()

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A, #1E3A8A)',
        padding: '80px 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.3,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)', color: '#F8FAFC', marginBottom: '20px' }}>
              Hakkımızda
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '18px', lineHeight: 1.7, maxWidth: '640px' }}>
              2009 yılından bu yana Türkiye'nin güvenilir doğalgaz çözüm ortağı olarak hizmet veriyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '96px 0', background: '#0F172A' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span style={{
                display: 'inline-block', padding: '4px 14px', borderRadius: '20px',
                background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#3B82F6', fontSize: '13px', fontWeight: 600, marginBottom: '16px',
              }}>
                Hikayemiz
              </span>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 36px)', color: '#F8FAFC', marginBottom: '20px' }}>
                15 Yıllık Deneyim ve Güven
              </h2>
              <p style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '16px', fontSize: '15px' }}>
                Altek Doğalgaz, 2009 yılında İstanbul'da küçük bir servis atölyesi olarak kuruldu. Yıllar içinde büyüyerek Türkiye'nin önde gelen doğalgaz ürünleri satıcısı ve servis firmasına dönüştü.
              </p>
              <p style={{ color: '#94A3B8', lineHeight: 1.8, fontSize: '15px' }}>
                Bugün 8'den fazla dünya markasının yetkili satıcısı ve servisi olarak 5.000'i aşkın mutlu müşteriye hizmet veriyoruz. Kaliteye olan bağlılığımız ve müşteri memnuniyeti odaklı yaklaşımımız bizi sektörde öne çıkaran temel değerlerimizdir.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { value: '2009', label: 'Kuruluş Yılı' },
                  { value: '5000+', label: 'Mutlu Müşteri' },
                  { value: '8+', label: 'Yetkili Marka' },
                  { value: '15+', label: 'Yıl Deneyim' },
                ].map(({ value, label }) => (
                  <div key={label} style={{
                    background: '#1E293B', border: '1px solid #334155', borderRadius: '16px',
                    padding: '24px', textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '36px', color: '#3B82F6', lineHeight: 1 }}>{value}</div>
                    <div style={{ color: '#94A3B8', fontSize: '13px', marginTop: '8px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 0', background: '#0B1220' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: '#F8FAFC', marginBottom: '12px' }}>
              Değerlerimiz
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '16px' }}>İşimizi yürütürken bizi yönlendiren temel ilkeler</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {values.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#1E293B', border: '1px solid #334155',
                  borderRadius: '16px', padding: '28px', transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px',
                  background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                }}>
                  <Icon size={24} style={{ color }} />
                </div>
                <h3 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{title}</h3>
                <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      {brands.length > 0 && (
        <section style={{ padding: '80px 0', background: '#0F172A' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', color: '#F8FAFC', textAlign: 'center', marginBottom: '48px' }}>
              Yetkili Olduğumuz Markalar
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              {brands.map(b => (
                <div key={b.id} style={{
                  padding: '16px 32px', background: '#1E293B', border: '1px solid #334155',
                  borderRadius: '12px', color: '#F8FAFC', fontWeight: 700, fontSize: '16px',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#3B82F6' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#F8FAFC' }}
                >
                  {b.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
