import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Package, Tag, Layers, MessageSquare, TrendingUp } from 'lucide-react'
import { productsApi, brandsApi, categoriesApi, messagesApi } from '../../services/api.js'
import LoadingSpinner from '../../components/ui/LoadingSpinner.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { data: products } = useQuery({ queryKey: ['admin-products'], queryFn: () => productsApi.getAll({ page: 1, per_page: 5 }).then(r => r.data) })
  const { data: brands } = useQuery({ queryKey: ['admin-brands'], queryFn: () => brandsApi.adminGetAll().then(r => r.data) })
  const { data: categories } = useQuery({ queryKey: ['admin-categories'], queryFn: () => categoriesApi.adminGetAll().then(r => r.data) })
  const { data: messages } = useQuery({ queryKey: ['admin-messages'], queryFn: () => messagesApi.getAll().then(r => r.data) })

  const stats = [
    { icon: Package, label: 'Toplam Ürün', value: products?.total || 0, color: '#3B82F6', to: '/admin/urunler' },
    { icon: Tag, label: 'Markalar', value: brands?.data?.length || 0, color: '#DC2626', to: '/admin/markalar' },
    { icon: Layers, label: 'Kategoriler', value: categories?.data?.length || 0, color: '#22C55E', to: '/admin/kategoriler' },
    { icon: MessageSquare, label: 'Okunmamış Mesaj', value: messages?.data?.filter(m => !m.is_read).length || 0, color: '#F97316', to: '/admin/mesajlar' },
  ]

  const recentProducts = products?.items?.slice(0, 5) || []
  const recentMessages = messages?.data?.slice(0, 5) || []

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '28px', color: '#F8FAFC', marginBottom: '6px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#64748B', fontSize: '14px' }}>Altek Doğalgaz Yönetim Paneline Hoşgeldiniz</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map(({ icon: Icon, label, value, color, to }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={to} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{
                background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '24px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 0 20px ${color}20` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <TrendingUp size={16} style={{ color: '#334155' }} />
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '36px', color: '#F8FAFC', lineHeight: 1 }}>{value}</div>
                <div style={{ color: '#64748B', fontSize: '13px', marginTop: '6px' }}>{label}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Recent products */}
        <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '16px' }}>Son Ürünler</h2>
            <Link to="/admin/urunler" style={{ color: '#3B82F6', fontSize: '13px', fontWeight: 600 }}>Tümü</Link>
          </div>
          {recentProducts.length === 0 ? (
            <p style={{ color: '#64748B', fontSize: '14px' }}>Henüz ürün yok</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentProducts.map(p => (
                <div key={p.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '8px', background: '#0F172A',
                    flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {p.primary_image ? (
                      <img src={p.primary_image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Package size={16} style={{ color: '#334155' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#F8FAFC', fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>{p.brand_name}</div>
                  </div>
                  <Badge color={p.is_active ? 'green' : 'gray'} style={{ fontSize: '11px' }}>
                    {p.is_active ? 'Aktif' : 'Pasif'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent messages */}
        <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '16px' }}>Son Mesajlar</h2>
            <Link to="/admin/mesajlar" style={{ color: '#3B82F6', fontSize: '13px', fontWeight: 600 }}>Tümü</Link>
          </div>
          {recentMessages.length === 0 ? (
            <p style={{ color: '#64748B', fontSize: '14px' }}>Henüz mesaj yok</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentMessages.map(m => (
                <div key={m.id} style={{
                  padding: '12px', background: '#0F172A', borderRadius: '10px',
                  borderLeft: `3px solid ${m.is_read ? '#334155' : '#3B82F6'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#F8FAFC', fontSize: '13px', fontWeight: 600 }}>{m.name}</span>
                    {!m.is_read && <Badge color="blue" style={{ fontSize: '10px' }}>Yeni</Badge>}
                  </div>
                  <p style={{ color: '#64748B', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
