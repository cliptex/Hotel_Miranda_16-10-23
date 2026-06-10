import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Plus, Trash2, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { productsApi, brandsApi, categoriesApi, imagesApi } from '../../services/api.js'
import Button from '../../components/ui/Button.jsx'
import LoadingSpinner from '../../components/ui/LoadingSpinner.jsx'

export default function AdminProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const isEdit = !!id

  const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm({
    defaultValues: { specs: [{ key: '', value: '' }] },
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'specs' })

  const { data: brands = [] } = useQuery({ queryKey: ['brands-select'], queryFn: () => brandsApi.adminGetAll().then(r => r.data.data || r.data) })
  const { data: categories = [] } = useQuery({ queryKey: ['cats-select'], queryFn: () => categoriesApi.adminGetAll().then(r => r.data.data || r.data) })

  const { data: product, isLoading } = useQuery({
    queryKey: ['product-edit', id],
    queryFn: () => productsApi.getBySlug(id).then(r => r.data.data),
    enabled: isEdit,
  })

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        specs: product.specs?.length > 0 ? product.specs.map(s => ({ key: s.spec_key, value: s.spec_value })) : [{ key: '', value: '' }],
      })
    }
  }, [product, reset])

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? productsApi.update(id, data) : productsApi.create(data),
    onSuccess: () => {
      toast.success(isEdit ? 'Ürün güncellendi' : 'Ürün eklendi')
      qc.invalidateQueries({ queryKey: ['admin-products-list'] })
      navigate('/admin/urunler')
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Bir hata oluştu'),
  })

  const onSubmit = (data) => {
    const cleaned = { ...data, specs: data.specs.filter(s => s.key && s.value) }
    mutation.mutate(cleaned)
  }

  const inputStyle = (err) => ({
    width: '100%', padding: '10px 14px',
    background: '#0B1220', border: `1px solid ${err ? '#DC2626' : '#334155'}`,
    borderRadius: '8px', color: '#F8FAFC', fontSize: '14px', outline: 'none',
    fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
  })
  const labelStyle = { display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }

  if (isEdit && isLoading) return <LoadingSpinner />

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <Link to="/admin/urunler" style={{ color: '#64748B', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '24px', color: '#F8FAFC' }}>
          {isEdit ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Temel Bilgiler</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>ÜRÜN ADI *</label>
                  <input {...register('name', { required: 'Ürün adı zorunludur' })} style={inputStyle(errors.name)} placeholder="Ürün adını girin" />
                  {errors.name && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>{errors.name.message}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>MARKA *</label>
                    <select {...register('brand_id', { required: true })} style={inputStyle(errors.brand_id)}>
                      <option value="">Seçin</option>
                      {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>KATEGORİ *</label>
                    <select {...register('category_id', { required: true })} style={inputStyle(errors.category_id)}>
                      <option value="">Seçin</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>AÇIKLAMA</label>
                  <textarea {...register('description')} rows={4} style={{ ...inputStyle(false), resize: 'vertical' }} placeholder="Ürün açıklaması..." />
                </div>
              </div>
            </div>

            {/* Price */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Fiyat</h2>
              <div>
                <label style={labelStyle}>FİYAT (₺)</label>
                <input {...register('price')} type="number" step="0.01" min="0" style={inputStyle(false)} placeholder="0.00" />
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#94A3B8', fontSize: '14px' }}>
                  <input {...register('show_price')} type="checkbox" style={{ accentColor: '#3B82F6', width: '16px', height: '16px' }} />
                  Fiyatı göster
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#94A3B8', fontSize: '14px' }}>
                  <input {...register('is_featured')} type="checkbox" style={{ accentColor: '#3B82F6', width: '16px', height: '16px' }} />
                  Öne çıkar
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#94A3B8', fontSize: '14px' }}>
                  <input {...register('is_active')} type="checkbox" defaultChecked style={{ accentColor: '#3B82F6', width: '16px', height: '16px' }} />
                  Aktif
                </label>
              </div>
            </div>
          </div>

          {/* Right column - Specs */}
          <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '16px' }}>Teknik Özellikler</h2>
              <button type="button" onClick={() => append({ key: '', value: '' })} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px',
                color: '#3B82F6', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}>
                <Plus size={14} /> Ekle
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {fields.map((field, i) => (
                <div key={field.id} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input {...register(`specs.${i}.key`)} placeholder="Özellik (ör: Güç)" style={{ ...inputStyle(false), flex: 1 }} />
                  <input {...register(`specs.${i}.value`)} placeholder="Değer (ör: 24kW)" style={{ ...inputStyle(false), flex: 1 }} />
                  <button type="button" onClick={() => remove(i)} style={{
                    padding: '8px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)',
                    borderRadius: '8px', color: '#DC2626', cursor: 'pointer', flexShrink: 0,
                  }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <Link to="/admin/urunler">
            <Button variant="ghost">İptal</Button>
          </Link>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Kaydediliyor...' : (isEdit ? 'Güncelle' : 'Ürün Ekle')}
          </Button>
        </div>
      </form>
    </div>
  )
}
