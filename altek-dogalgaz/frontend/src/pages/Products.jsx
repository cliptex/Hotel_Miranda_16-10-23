import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Grid3X3, List, Package, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useProducts, useBrands, useCategories } from '../hooks/useProducts.js'
import Badge from '../components/ui/Badge.jsx'
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx'

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '')
  const [view, setView] = useState('grid')

  const brand = searchParams.get('marka') || ''
  const category = searchParams.get('kategori') || ''
  const page = parseInt(searchParams.get('sayfa') || '1')
  const debouncedSearch = useDebounce(searchInput, 300)

  const updateParams = useCallback((updates) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      Object.entries(updates).forEach(([k, v]) => {
        if (v) next.set(k, v); else next.delete(k)
      })
      if ('marka' in updates || 'kategori' in updates) next.delete('sayfa')
      return next
    })
  }, [setSearchParams])

  useEffect(() => {
    updateParams({ q: debouncedSearch })
  }, [debouncedSearch, updateParams])

  const { data, isLoading } = useProducts({
    brand, category,
    q: searchParams.get('q') || '',
    page,
  })
  const { data: brands = [] } = useBrands()
  const { data: categories = [] } = useCategories()

  const products = data?.items || []
  const totalPages = data?.total_pages || 1

  const hasFilters = brand || category || searchParams.get('q')

  return (
    <div style={{ minHeight: '100vh', paddingTop: '72px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0B1220, #0F172A)',
        borderBottom: '1px solid #1E293B',
        padding: '48px 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F8FAFC', marginBottom: '8px' }}>
            Ürünlerimiz
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '16px' }}>
            {data?.total ? `${data.total} ürün bulundu` : 'Tüm doğalgaz ürünlerimizi keşfedin'}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Filters */}
        <div style={{
          background: '#1E293B', border: '1px solid #334155', borderRadius: '16px',
          padding: '20px 24px', marginBottom: '24px',
          display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Ürün ara..."
              style={{
                width: '100%', padding: '10px 12px 10px 36px',
                background: '#0F172A', border: '1px solid #334155', borderRadius: '8px',
                color: '#F8FAFC', fontSize: '14px', outline: 'none',
              }}
            />
          </div>

          {/* Brand filter */}
          <select
            value={brand}
            onChange={e => updateParams({ marka: e.target.value })}
            style={{
              padding: '10px 16px', background: '#0F172A', border: '1px solid #334155',
              borderRadius: '8px', color: brand ? '#F8FAFC' : '#64748B', fontSize: '14px',
            }}
          >
            <option value="">Tüm Markalar</option>
            {brands.map(b => <option key={b.id} value={b.slug}>{b.name}</option>)}
          </select>

          {/* Category filter */}
          <select
            value={category}
            onChange={e => updateParams({ kategori: e.target.value })}
            style={{
              padding: '10px 16px', background: '#0F172A', border: '1px solid #334155',
              borderRadius: '8px', color: category ? '#F8FAFC' : '#64748B', fontSize: '14px',
            }}
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={() => { setSearchInput(''); setSearchParams({}) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 14px', background: 'rgba(220,38,38,0.1)',
                border: '1px solid rgba(220,38,38,0.3)', borderRadius: '8px',
                color: '#DC2626', fontSize: '13px', fontWeight: 600,
              }}
            >
              <X size={14} /> Temizle
            </button>
          )}

          {/* View toggle */}
          <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
            {[{ v: 'grid', Icon: Grid3X3 }, { v: 'list', Icon: List }].map(({ v, Icon }) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '10px', background: view === v ? 'rgba(59,130,246,0.1)' : 'transparent',
                border: `1px solid ${view === v ? '#3B82F6' : '#334155'}`, borderRadius: '8px',
                color: view === v ? '#3B82F6' : '#64748B',
              }}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Products grid/list */}
        {isLoading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#94A3B8' }}>
            <Package size={64} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
            <h3 style={{ color: '#F8FAFC', marginBottom: '8px' }}>Ürün bulunamadı</h3>
            <p>Filtrelerinizi değiştirerek tekrar deneyin</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
            gap: '20px',
          }}>
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/urunler/${product.slug}`}>
                  <div style={{
                    background: '#1E293B', border: '1px solid #334155',
                    borderRadius: '14px', overflow: 'hidden',
                    display: view === 'list' ? 'flex' : 'block',
                    transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{
                      background: '#0F172A',
                      height: view === 'list' ? '120px' : '200px',
                      width: view === 'list' ? '160px' : '100%',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}>
                      {product.primary_image ? (
                        <img src={product.primary_image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Package size={40} style={{ color: '#334155' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '16px', flex: 1 }}>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <Badge color="blue">{product.brand_name}</Badge>
                        <Badge color="gray">{product.category_name}</Badge>
                      </div>
                      <h3 style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '15px', marginBottom: '8px', lineHeight: 1.4 }}>
                        {product.name}
                      </h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {product.show_price && product.price ? (
                          <span style={{ color: '#3B82F6', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                            {parseFloat(product.price).toLocaleString('tr-TR')} ₺
                          </span>
                        ) : (
                          <span style={{ color: '#64748B', fontSize: '13px' }}>Fiyat için arayın</span>
                        )}
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3B82F6', fontSize: '13px', fontWeight: 600 }}>
                          Detay <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
            <button
              onClick={() => updateParams({ sayfa: String(page - 1) })}
              disabled={page === 1}
              style={{
                padding: '8px 14px', background: '#1E293B', border: '1px solid #334155',
                borderRadius: '8px', color: '#94A3B8', cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.5 : 1,
              }}
            >
              <ChevronLeft size={16} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => updateParams({ sayfa: String(i + 1) })} style={{
                padding: '8px 14px', background: page === i + 1 ? '#1E3A8A' : '#1E293B',
                border: `1px solid ${page === i + 1 ? '#3B82F6' : '#334155'}`,
                borderRadius: '8px', color: page === i + 1 ? '#F8FAFC' : '#94A3B8',
                cursor: 'pointer', fontWeight: page === i + 1 ? 700 : 400,
              }}>
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => updateParams({ sayfa: String(page + 1) })}
              disabled={page === totalPages}
              style={{
                padding: '8px 14px', background: '#1E293B', border: '1px solid #334155',
                borderRadius: '8px', color: '#94A3B8', cursor: page === totalPages ? 'not-allowed' : 'pointer',
                opacity: page === totalPages ? 0.5 : 1,
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
