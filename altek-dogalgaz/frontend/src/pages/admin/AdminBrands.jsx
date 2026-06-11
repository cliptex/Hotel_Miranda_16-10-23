import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Plus, Edit2, Trash2, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { brandsApi } from '../../services/api.js'
import Button from '../../components/ui/Button.jsx'
import Badge from '../../components/ui/Badge.jsx'
import LoadingSpinner from '../../components/ui/LoadingSpinner.jsx'

export default function AdminBrands() {
  const [modal, setModal] = useState(null) // null | { mode: 'add' | 'edit', brand?: obj }
  const [deleteId, setDeleteId] = useState(null)
  const qc = useQueryClient()

  const { data = [], isLoading } = useQuery({
    queryKey: ['admin-brands-list'],
    queryFn: () => brandsApi.adminGetAll().then(r => Array.isArray(r.data) ? r.data : r.data.data || []),
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const upsertMutation = useMutation({
    mutationFn: (d) => modal?.brand ? brandsApi.update(modal.brand.id, d) : brandsApi.create(d),
    onSuccess: () => {
      toast.success(modal?.brand ? 'Marka güncellendi' : 'Marka eklendi')
      qc.invalidateQueries({ queryKey: ['admin-brands-list'] })
      setModal(null); reset()
    },
    onError: () => toast.error('Bir hata oluştu'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => brandsApi.delete(id),
    onSuccess: () => {
      toast.success('Marka silindi')
      qc.invalidateQueries({ queryKey: ['admin-brands-list'] })
      setDeleteId(null)
    },
    onError: () => toast.error('Silme başarısız'),
  })

  const openEdit = (brand) => {
    setModal({ mode: 'edit', brand })
    reset({ name: brand.name, is_active: brand.is_active })
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#0B1220', border: '1px solid #334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '14px', outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '28px', color: '#F8FAFC', marginBottom: '4px' }}>Markalar</h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>{data.length} marka</p>
        </div>
        <Button onClick={() => { setModal({ mode: 'add' }); reset({ name: '', is_active: true }) }}>
          <Plus size={16} /> Yeni Marka
        </Button>
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {data.map((brand, i) => (
            <motion.div key={brand.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px', background: '#0F172A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Tag size={20} style={{ color: '#3B82F6' }} />
                  </div>
                  <Badge color={brand.is_active ? 'green' : 'gray'}>{brand.is_active ? 'Aktif' : 'Pasif'}</Badge>
                </div>
                <h3 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>{brand.name}</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => openEdit(brand)} style={{ flex: 1, padding: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', color: '#3B82F6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                    <Edit2 size={14} /> Düzenle
                  </button>
                  <button onClick={() => setDeleteId(brand.id)} style={{ padding: '8px 12px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '8px', color: '#DC2626', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '420px', width: '100%' }}>
            <h2 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
              {modal.mode === 'edit' ? 'Markayı Düzenle' : 'Yeni Marka Ekle'}
            </h2>
            <form onSubmit={handleSubmit(d => upsertMutation.mutate(d))} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>MARKA ADI *</label>
                <input {...register('name', { required: true })} style={inputStyle} placeholder="ECA, Baymak..." />
                {errors.name && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>Zorunludur</p>}
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#94A3B8', fontSize: '14px' }}>
                <input {...register('is_active')} type="checkbox" style={{ accentColor: '#3B82F6' }} />
                Aktif
              </label>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button variant="ghost" type="button" onClick={() => setModal(null)}>İptal</Button>
                <Button type="submit" fullWidth disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            <Trash2 size={36} style={{ color: '#DC2626', margin: '0 auto 16px' }} />
            <h3 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>Markayı Sil?</h3>
            <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '24px' }}>Bu işlem geri alınamaz.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Button variant="ghost" onClick={() => setDeleteId(null)}>İptal</Button>
              <Button variant="danger" onClick={() => deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending}>
                {deleteMutation.isPending ? 'Siliniyor...' : 'Sil'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
