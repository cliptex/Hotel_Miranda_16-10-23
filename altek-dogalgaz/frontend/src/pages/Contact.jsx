import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import { contactApi } from '../services/api.js'
import Button from '../components/ui/Button.jsx'

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const mutation = useMutation({
    mutationFn: (data) => contactApi.send(data).then(r => r.data),
    onSuccess: () => {
      toast.success('Mesajınız alındı! En kısa sürede dönüş yapacağız.')
      reset()
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Bir hata oluştu'),
  })

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '12px 16px',
    background: '#0F172A',
    border: `1px solid ${hasError ? '#DC2626' : '#334155'}`,
    borderRadius: '10px',
    color: '#F8FAFC',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  })

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* Header */}
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
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)', color: '#F8FAFC', marginBottom: '20px' }}>
            İletişim
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ color: '#94A3B8', fontSize: '18px', lineHeight: 1.7, maxWidth: '520px' }}>
            Sorularınız için bize ulaşın. En kısa sürede size dönüş yapacağız.
          </motion.p>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          {/* Contact form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#F8FAFC', marginBottom: '28px' }}>
              Mesaj Gönderin
            </h2>
            <form onSubmit={handleSubmit(d => mutation.mutate(d))} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>
                  AD SOYAD *
                </label>
                <input
                  {...register('name', { required: 'Ad soyad zorunludur' })}
                  placeholder="Adınız Soyadınız"
                  style={inputStyle(errors.name)}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = errors.name ? '#DC2626' : '#334155'}
                />
                {errors.name && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>{errors.name.message}</p>}
              </div>

              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>
                  E-POSTA *
                </label>
                <input
                  {...register('email', { required: 'E-posta zorunludur', pattern: { value: /\S+@\S+\.\S+/, message: 'Geçerli bir e-posta girin' } })}
                  placeholder="ornek@email.com"
                  style={inputStyle(errors.email)}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = errors.email ? '#DC2626' : '#334155'}
                />
                {errors.email && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>}
              </div>

              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>
                  TELEFON
                </label>
                <input
                  {...register('phone')}
                  placeholder="+90 5xx xxx xx xx"
                  style={inputStyle(false)}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = '#334155'}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>
                  MESAJ *
                </label>
                <textarea
                  {...register('message', { required: 'Mesaj zorunludur' })}
                  placeholder="Nasıl yardımcı olabiliriz?"
                  rows={5}
                  style={{ ...inputStyle(errors.message), resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = errors.message ? '#DC2626' : '#334155'}
                />
                {errors.message && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" disabled={mutation.isPending} fullWidth>
                <Send size={18} />
                {mutation.isPending ? 'Gönderiliyor...' : 'Mesajı Gönder'}
              </Button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#F8FAFC', marginBottom: '28px' }}>
              İletişim Bilgileri
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {[
                { icon: Phone, label: 'Telefon', value: '+90 500 123 45 67', href: 'tel:+905001234567', color: '#3B82F6' },
                { icon: Mail, label: 'E-posta', value: 'info@altekdogalgaz.com', href: 'mailto:info@altekdogalgaz.com', color: '#22C55E' },
                { icon: MapPin, label: 'Adres', value: 'Bağcılar, İstanbul, Türkiye', color: '#F97316' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  background: '#1E293B', border: '1px solid #334155',
                  borderRadius: '12px', padding: '16px 20px',
                }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                    background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.5px' }}>{label.toUpperCase()}</div>
                    {href ? (
                      <a href={href} style={{ color: '#F8FAFC', fontWeight: 500, fontSize: '15px', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = color}
                        onMouseLeave={e => e.currentTarget.style.color = '#F8FAFC'}
                      >{value}</a>
                    ) : (
                      <span style={{ color: '#F8FAFC', fontWeight: 500, fontSize: '15px' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Working hours */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Clock size={18} style={{ color: '#3B82F6' }} />
                <span style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '15px' }}>Çalışma Saatleri</span>
              </div>
              {[
                { days: 'Pazartesi - Cuma', hours: '08:00 - 18:00' },
                { days: 'Cumartesi', hours: '09:00 - 16:00' },
                { days: 'Pazar', hours: 'Kapalı' },
              ].map(({ days, hours }) => (
                <div key={days} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ color: '#94A3B8', fontSize: '14px' }}>{days}</span>
                  <span style={{ color: hours === 'Kapalı' ? '#DC2626' : '#22C55E', fontWeight: 600, fontSize: '14px' }}>{hours}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/905001234567" target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 20px', borderRadius: '12px',
              background: 'rgba(37, 211, 102, 0.1)', border: '1px solid rgba(37, 211, 102, 0.3)',
              color: '#25D366', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.1)'}
            >
              <MessageCircle size={24} />
              WhatsApp ile İletişime Geç
            </a>

            {/* Google Maps */}
            <div style={{ marginTop: '24px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155', height: '200px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.273!2d28.856!3d41.064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAzJzUwLjQiTiAyOMKwNTEnMjMuNiJF!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                title="Konum"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
