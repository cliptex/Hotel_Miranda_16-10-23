import { Link } from 'react-router-dom'
import { Flame, Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#0B1220',
      borderTop: '1px solid #1E293B',
      color: '#94A3B8',
      paddingTop: '64px',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid #1E293B',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #1E3A8A, #DC2626)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Flame size={22} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '18px', color: '#F8FAFC', lineHeight: 1 }}>ALTEK</div>
                <div style={{ fontSize: '10px', letterSpacing: '2px' }}>DOĞALGAZ</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              Türkiye'nin güvenilir doğalgaz çözümleri. Satış, montaj ve servis hizmetleriyle yanınızdayız.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Linkedin, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#94A3B8', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E3A8A'; e.currentTarget.style.color = '#F8FAFC' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.color = '#94A3B8' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Hızlı Linkler</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { to: '/', label: 'Anasayfa' },
                { to: '/urunler', label: 'Ürünler' },
                { to: '/hakkimizda', label: 'Hakkımızda' },
                { to: '/iletisim', label: 'İletişim' },
                { to: '/admin/giris', label: 'Admin Paneli' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} style={{ fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Hizmetlerimiz</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Kombi Satışı', 'Montaj Hizmeti', 'Teknik Servis', 'Bakım & Onarım', 'Danışmanlık'].map(s => (
                <li key={s} style={{ fontSize: '14px' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>İletişim</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { Icon: Phone, text: '+90 500 123 45 67', href: 'tel:+905001234567' },
                { Icon: Mail, text: 'info@altekdogalgaz.com', href: 'mailto:info@altekdogalgaz.com' },
                { Icon: MapPin, text: 'İstanbul, Türkiye' },
                { Icon: Clock, text: 'Pzt-Cmt: 08:00 - 18:00' },
              ].map(({ Icon, text, href }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <Icon size={16} style={{ color: '#3B82F6', flexShrink: 0 }} />
                  {href ? (
                    <a href={href} style={{ transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                      onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                    >{text}</a>
                  ) : <span>{text}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          padding: '24px 0',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
          gap: '12px', fontSize: '13px',
        }}>
          <span>© {year} Altek Doğalgaz. Tüm hakları saklıdır.</span>
          <span>Kaliteli Isınma, Güvenli Yaşam</span>
        </div>
      </div>
    </footer>
  )
}
