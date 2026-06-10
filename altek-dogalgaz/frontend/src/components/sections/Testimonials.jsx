import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  { name: 'Ahmet Yılmaz', location: 'İstanbul', rating: 5, text: 'Kombimi Altek\'ten aldım. Montaj ekibi çok profesyoneldi, hızlı ve temiz iş çıkardılar. Kesinlikle tavsiye ederim.' },
  { name: 'Fatma Kaya', location: 'Ankara', rating: 5, text: 'Teknik servis hizmeti mükemmeldi. Arızam hızla tespit edilip çözüldü. Fiyat-performans açısından çok memnunum.' },
  { name: 'Mehmet Demir', location: 'İzmir', rating: 5, text: 'Danışmanlık hizmetleri sayesinde ihtiyacıma en uygun kombiyi seçtim. Çok bilgili ve yardımsever bir ekip.' },
  { name: 'Ayşe Şahin', location: 'Bursa', rating: 5, text: 'Yıllık bakım sözleşmesi yaptırdım, hiç pişman olmadım. Düzenli kontroller sayesinde sorunsuz kış geçirdim.' },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(i => (i + 1) % testimonials.length)

  return (
    <section style={{ padding: '96px 0', background: '#0B1220' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: '20px',
            background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#3B82F6', fontSize: '13px', fontWeight: 600, marginBottom: '16px',
          }}>
            Müşteri Yorumları
          </span>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: '#F8FAFC' }}>
            Müşterilerimiz Ne Diyor?
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              style={{
                background: '#1E293B', border: '1px solid #334155',
                borderRadius: '20px', padding: '40px',
                textAlign: 'center',
              }}
            >
              <Quote size={40} style={{ color: '#1E3A8A', margin: '0 auto 20px' }} />
              <p style={{ color: '#F8FAFC', fontSize: '18px', lineHeight: 1.7, marginBottom: '28px', fontStyle: 'italic' }}>
                "{testimonials[idx].text}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                {[...Array(testimonials[idx].rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                ))}
              </div>
              <div style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '16px' }}>{testimonials[idx].name}</div>
              <div style={{ color: '#94A3B8', fontSize: '14px' }}>{testimonials[idx].location}</div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
            <button onClick={prev} style={{
              background: '#1E293B', border: '1px solid #334155', color: '#94A3B8',
              borderRadius: '8px', padding: '10px', cursor: 'pointer',
            }}><ChevronLeft size={20} /></button>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} style={{
                  width: i === idx ? '24px' : '8px', height: '8px',
                  borderRadius: '4px', background: i === idx ? '#3B82F6' : '#334155',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                }} />
              ))}
            </div>
            <button onClick={next} style={{
              background: '#1E293B', border: '1px solid #334155', color: '#94A3B8',
              borderRadius: '8px', padding: '10px', cursor: 'pointer',
            }}><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
