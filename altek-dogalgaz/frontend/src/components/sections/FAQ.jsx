import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Hangi markaların yetkili servisi ve satıcısısınız?', a: 'ECA, Baymak, Demirdöküm, Bosch, Vaillant, Ariston, Ferroli ve Buderus markalarının yetkili satıcı ve servisiyiz.' },
  { q: 'Montaj süreciniz nasıl işliyor?', a: 'Ürün satın aldıktan sonra sertifikalı teknisyenlerimiz uygun tarihte gelir, standartlara uygun kurulumu gerçekleştirir. İşlem genellikle 2-4 saat sürer.' },
  { q: 'Garanti kapsamı nedir?', a: 'Ürünler kendi marka garantisi kapsamındadır. Montaj işçiliği için 1 yıl ek garantimiz bulunmaktadır.' },
  { q: 'Acil servis hizmetiniz var mı?', a: 'Evet, 7/24 acil servis hattımız mevcuttur. Kritik arızalarda aynı gün müdahale sağlıyoruz.' },
  { q: 'Fiyat teklifi nasıl alabilirim?', a: 'İletişim formumuzdan, telefon veya WhatsApp üzerinden ücretsiz fiyat teklifi alabilirsiniz.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section style={{ padding: '96px 0', background: '#0F172A' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: '#F8FAFC', marginBottom: '12px' }}>
            Sık Sorulan Sorular
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '16px' }}>Merak ettiğiniz soruların cevapları</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: '#1E293B', border: `1px solid ${open === i ? '#3B82F6' : '#334155'}`,
                borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 24px', background: 'none', border: 'none',
                  color: '#F8FAFC', fontWeight: 600, fontSize: '15px', cursor: 'pointer', textAlign: 'left',
                }}
              >
                {faq.q}
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={20} style={{ color: '#94A3B8', flexShrink: 0 }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ padding: '0 24px 20px', color: '#94A3B8', fontSize: '14px', lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
