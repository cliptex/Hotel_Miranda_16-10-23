import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Search, Package } from 'lucide-react'
import toast from 'react-hot-toast'
import { productsApi } from '../../services/api.js'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import LoadingSpinner from '../../components/ui/LoadingSpinner.jsx'

export default function AdminProducts() {
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products-list'],
    queryFn: () => productsApi.getAll({ page: 1 }).then(r => r.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => productsApi.delete(id),
    onSuccess: () => {
      toast.success('Ürün silindi')
      qc.invalidateQueries({ queryKey: ['admin-products-list'] })
      setDeleteId(null)
    },
    onError: () => toast.error('Silme işlemi başarısız'),
  })

  const products = (data?.items || []).filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '28px', color: '#F8FAFC', marginBottom: '4px' }}>Ürünler</h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>{data?.total || 0} ürün</p>
        </div>
        <Link to="/admin/urunler/ekle">
          <Button>
            <Plus size={16} /> Yeni Ürün
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '400px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Ürün veya marka ara..."
          style={{
            width: '100%', padding: '10px 12px 10px 36px',
            background: '#1E293B', border: '1px solid #334155', borderRadius: '8px',
            color: '#F8FAFC', fontSize: '14px', outline: 'none',
          }}
        />
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
          {products.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
              <Package size={48} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
              <p>Ürün bulunamadı</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155' }}>
                  {['Ürün', 'Marka', 'Kategori', 'Fiyat', 'Durum', 'İşlemler'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: '#64748B', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>
                      {h.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #334155', background: i % 2 === 0 ? 'transparent' : 'rgba(15,23,42,0.3)' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '8px', background: '#0F172A',
                          flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {p.primary_image ? (
                            <img src={p.primary_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : <Package size={16} style={{ color: '#334155' }} />}
                        </div>
                        <span style={{ color: '#F8FAFC', fontSize: '14px', fontWeight: 500 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <Badge color="blue">{p.brand_name}</Badge>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ color: '#94A3B8', fontSize: '13px' }}>{p.category_name}</span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      {p.show_price && p.price ? (
                        <span style={{ color: '#3B82F6', fontFamily: 'JetBrains Mono', fontSize: '13px', fontWeight: 600 }}>
                          {parseFloat(p.price).toLocaleString('tr-TR')} ₺
                        </span>
                      ) : <span style={{ color: '#475569', fontSize: '13px' }}>Gizli</span>}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <Badge color={p.is_active ? 'green' : 'gray'}>{p.is_active ? 'Aktif' : 'Pasif'}</Badge>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link to={`/admin/urunler/${p.id}/duzenle`}>
                          <button style={{
                            padding: '7px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                            borderRadius: '8px', color: '#3B82F6', cursor: 'pointer',
                          }}>
                            <Edit2 size={14} />
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          style={{
                            padding: '7px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)',
                            borderRadius: '8px', color: '#DC2626', cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Delete modal */}
      {deleteId && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px',
        }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '32px',
              maxWidth: '420px', width: '100%', textAlign: 'center',
            }}
          >
            <Trash2 size={40} style={{ color: '#DC2626', margin: '0 auto 16px' }} />
            <h3 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '20px', marginBottom: '10px' }}>Ürünü Sil</h3>
            <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '28px' }}>
              Bu ürün kalıcı olarak silinecek. Bu işlem geri alınamaz.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Button variant="ghost" onClick={() => setDeleteId(null)}>İptal</Button>
              <Button variant="danger" onClick={() => deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending}>
                {deleteMutation.isPending ? 'Siliniyor...' : 'Evet, Sil'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
