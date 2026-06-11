import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Plus, Edit2, Trash2, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { categoriesApi } from '../../services/api.js'
import Button from '../../components/ui/Button.jsx'
import Badge from '../../components/ui/Badge.jsx'
import LoadingSpinner from '../../components/ui/LoadingSpinner.jsx'

export default function AdminCategories() {
  const [modal, setModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const qc = useQueryClient()

  const { data = [], isLoading } = useQuery({
    queryKey: ['admin-categories-list'],
    queryFn: () => categoriesApi.adminGetAll().then(r => Array.isArray(r.data) ? r.data : r.data.data || []),
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const upsertMutation = useMutation({
    mutationFn: (d) => modal?.category ? categoriesApi.update(modal.category.id, d) : categoriesApi.create(d),
    onSuccess: () => {
      toast.success(modal?.category ? 'Kategori güncellendi' : 'Kategori eklendi')
      qc.invalidateQueries({ queryKey: ['admin-categories-list'] })
      setModal(null); reset()
    },
    onError: () => toast.error('Bir hata oluştu'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => categoriesApi.delete(id),
    onSuccess: () => {
      toast.success('Kategori silindi')
      qc.invalidateQueries({ queryKey: ['admin-categories-list'] })
      setDeleteId(null)
    },
    onError: () => toast.error('Silme başarısız'),
  })

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#0B1220', border: '1px solid #334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '14px', outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '28px', color: '#F8FAFC', marginBottom: '4px' }}>Kategoriler</h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>{data.length} kategori</p>
        </div>
        <Button onClick={() => { setModal({ mode: 'add' }); reset({ name: '', icon: 'Flame', is_active: true }) }}>
          <Plus size={16} /> Yeni Kategori
        </Button>
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                {['Kategori', 'İkon', 'Durum', 'İşlemler'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: '#64748B', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>
                    {h.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((cat, i) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #334155', background: i % 2 === 0 ? 'transparent' : 'rgba(15,23,42,0.3)' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layers size={16} style={{ color: '#3B82F6' }} />
                      </div>
                      <span style={{ color: '#F8FAFC', fontSize: '14px', fontWeight: 500 }}>{cat.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <code style={{ color: '#94A3B8', fontSize: '13px', background: '#0F172A', padding: '3px 8px', borderRadius: '4px' }}>{cat.icon}</code>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <Badge color={cat.is_active ? 'green' : 'gray'}>{cat.is_active ? 'Aktif' : 'Pasif'}</Badge>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => { setModal({ mode: 'edit', category: cat }); reset({ name: cat.name, icon: cat.icon, is_active: cat.is_active }) }} style={{ padding: '7px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', color: '#3B82F6', cursor: 'pointer' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteId(cat.id)} style={{ padding: '7px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '8px', color: '#DC2626', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '420px', width: '100%' }}>
            <h2 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
              {modal.mode === 'edit' ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}
            </h2>
            <form onSubmit={handleSubmit(d => upsertMutation.mutate(d))} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>KATEGORİ ADI *</label>
                <input {...register('name', { required: true })} style={inputStyle} placeholder="Kombi, Fırın..." />
                {errors.name && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>Zorunludur</p>}
              </div>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>İKON (Lucide adı)</label>
                <input {...register('icon')} style={inputStyle} placeholder="Flame, Thermometer, Droplets..." />
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

      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            <Trash2 size={36} style={{ color: '#DC2626', margin: '0 auto 16px' }} />
            <h3 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>Kategoriyi Sil?</h3>
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
