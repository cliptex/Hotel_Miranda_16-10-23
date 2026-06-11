import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Package } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts.js'
import LoadingSpinner from '../ui/LoadingSpinner.jsx'
import Badge from '../ui/Badge.jsx'

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts({ featured: 1, page: 1 })
  const products = data?.items?.slice(0, 4) || []

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
            background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#3B82F6', fontSize: '13px', fontWeight: 600, marginBottom: '16px',
          }}>
            Öne Çıkanlar
          </span>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: '#F8FAFC', marginBottom: '12px' }}>
            Popüler Ürünlerimiz
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            En çok tercih edilen kombi ve doğalgaz ürünleri
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94A3B8', padding: '48px' }}>
            <Package size={48} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.5 }} />
            <p>Henüz öne çıkan ürün yok</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/urunler/${product.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{
                    background: '#1E293B', border: '1px solid #334155',
                    borderRadius: '16px', overflow: 'hidden',
                    transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(59,130,246,0.15)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{ height: '200px', background: '#0F172A', overflow: 'hidden' }}>
                      {product.primary_image ? (
                        <img src={product.primary_image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Package size={48} style={{ color: '#334155' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <Badge color="blue">{product.brand_name}</Badge>
                        <Badge color="gray">{product.category_name}</Badge>
                      </div>
                      <h3 style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '16px', marginBottom: '8px', lineHeight: 1.4 }}>
                        {product.name}
                      </h3>
                      {product.show_price && product.price && (
                        <p style={{ color: '#3B82F6', fontWeight: 700, fontSize: '18px', fontFamily: 'JetBrains Mono, monospace' }}>
                          {parseFloat(product.price).toLocaleString('tr-TR')} ₺
                        </p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3B82F6', fontSize: '13px', fontWeight: 600, marginTop: '12px' }}>
                        Detayları Gör <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/urunler" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '12px 28px', borderRadius: '10px',
            border: '1px solid #334155', color: '#94A3B8', fontWeight: 600,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#3B82F6' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94A3B8' }}
          >
            Tüm Ürünleri Gör <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
