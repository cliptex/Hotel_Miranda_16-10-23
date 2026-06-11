import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, MessageCircle, Package, Tag, Layers } from 'lucide-react'
import { useProduct } from '../hooks/useProducts.js'
import ImageGallery from '../components/ui/ImageGallery.jsx'
import Badge from '../components/ui/Badge.jsx'
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const { data: product, isLoading, isError } = useProduct(slug)

  if (isLoading) return <div style={{ paddingTop: '72px' }}><LoadingSpinner /></div>
  if (isError || !product) return (
    <div style={{ paddingTop: '72px', textAlign: 'center', padding: '120px 24px', color: '#94A3B8' }}>
      <Package size={64} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
      <h2 style={{ color: '#F8FAFC', marginBottom: '8px' }}>Ürün bulunamadı</h2>
      <Link to="/urunler" style={{ color: '#3B82F6' }}>Ürünlere dön</Link>
    </div>
  )

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <Link to="/urunler" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: '#94A3B8', fontSize: '14px', marginBottom: '32px',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
          onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
        >
          <ArrowLeft size={16} /> Ürünlere Geri Dön
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <ImageGallery images={product.images || []} />
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Badge color="blue">
                <Tag size={12} /> {product.brand_name}
              </Badge>
              <Badge color="gray">
                <Layers size={12} /> {product.category_name}
              </Badge>
            </div>

            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', color: '#F8FAFC', marginBottom: '16px', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {product.show_price && product.price && (
              <div style={{
                padding: '16px 20px', background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '24px',
              }}>
                <div style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '4px' }}>Fiyat</div>
                <div style={{ color: '#3B82F6', fontWeight: 800, fontSize: '32px', fontFamily: 'JetBrains Mono, monospace' }}>
                  {parseFloat(product.price).toLocaleString('tr-TR')} ₺
                </div>
              </div>
            )}

            {product.description && (
              <p style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '32px', fontSize: '15px' }}>
                {product.description}
              </p>
            )}

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <a href="tel:+905001234567" style={{
                flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '14px 20px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #1E3A8A, #2563EB)',
                color: '#F8FAFC', fontWeight: 700, fontSize: '15px',
              }}>
                <Phone size={18} /> Teklif Al
              </a>
              <a href="https://wa.me/905001234567" target="_blank" rel="noreferrer" style={{
                flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '14px 20px', borderRadius: '10px',
                background: 'rgba(37, 211, 102, 0.1)', border: '1px solid rgba(37, 211, 102, 0.3)',
                color: '#25D366', fontWeight: 700, fontSize: '15px',
              }}>
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Specs */}
        {product.specs?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '64px' }}
          >
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: '#F8FAFC', marginBottom: '24px' }}>
              Teknik Özellikler
            </h2>
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
              {product.specs.map((spec, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 24px',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(15, 23, 42, 0.4)',
                  borderBottom: i < product.specs.length - 1 ? '1px solid #334155' : 'none',
                }}>
                  <span style={{ color: '#94A3B8', fontSize: '14px' }}>{spec.spec_key}</span>
                  <span style={{ color: '#F8FAFC', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}>{spec.spec_value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related products */}
        {product.related?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: '#F8FAFC', marginBottom: '24px' }}>
              Benzer Ürünler
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {product.related.map(rel => (
                <Link key={rel.id} to={`/urunler/${rel.slug}`}>
                  <div style={{
                    background: '#1E293B', border: '1px solid #334155',
                    borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#3B82F6'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}
                  >
                    <div style={{ height: '140px', background: '#0F172A' }}>
                      {rel.primary_image ? (
                        <img src={rel.primary_image} alt={rel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Package size={32} style={{ color: '#334155' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '12px' }}>
                      <div style={{ color: '#3B82F6', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>{rel.brand_name}</div>
                      <div style={{ color: '#F8FAFC', fontSize: '13px', fontWeight: 600, lineHeight: 1.4 }}>{rel.name}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
