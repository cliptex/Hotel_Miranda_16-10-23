import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { MessageSquare, CheckCircle, Mail, Phone, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { messagesApi } from '../../services/api.js'
import Badge from '../../components/ui/Badge.jsx'
import LoadingSpinner from '../../components/ui/LoadingSpinner.jsx'
import Button from '../../components/ui/Button.jsx'

export default function AdminMessages() {
  const qc = useQueryClient()
  const { data = [], isLoading } = useQuery({
    queryKey: ['admin-messages-list'],
    queryFn: () => messagesApi.getAll().then(r => Array.isArray(r.data) ? r.data : r.data.data || []),
  })

  const markReadMutation = useMutation({
    mutationFn: (id) => messagesApi.markRead(id),
    onSuccess: () => {
      toast.success('Okundu olarak işaretlendi')
      qc.invalidateQueries({ queryKey: ['admin-messages-list'] })
    },
  })

  const unread = data.filter(m => !m.is_read).length

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '28px', color: '#F8FAFC', marginBottom: '4px' }}>Mesajlar</h1>
        <p style={{ color: '#64748B', fontSize: '14px' }}>
          {data.length} mesaj
          {unread > 0 && <span style={{ color: '#3B82F6', marginLeft: '8px' }}>• {unread} okunmamış</span>}
        </p>
      </div>

      {isLoading ? <LoadingSpinner /> : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#64748B' }}>
          <MessageSquare size={48} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
          <p>Henüz mesaj yok</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                background: '#1E293B',
                border: `1px solid ${msg.is_read ? '#334155' : '#3B82F6'}`,
                borderRadius: '14px', padding: '20px',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '16px' }}>{msg.name}</span>
                    {!msg.is_read && <Badge color="blue">Yeni</Badge>}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <a href={`mailto:${msg.email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                      onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                    >
                      <Mail size={14} /> {msg.email}
                    </a>
                    {msg.phone && (
                      <a href={`tel:${msg.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#22C55E'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                      >
                        <Phone size={14} /> {msg.phone}
                      </a>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '13px' }}>
                      <Clock size={14} /> {new Date(msg.created_at).toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
                {!msg.is_read && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markReadMutation.mutate(msg.id)}
                    disabled={markReadMutation.isPending}
                  >
                    <CheckCircle size={14} /> Okundu İşaretle
                  </Button>
                )}
              </div>
              <div style={{
                background: '#0F172A', borderRadius: '8px', padding: '14px 16px',
                color: '#94A3B8', fontSize: '14px', lineHeight: 1.7,
              }}>
                {msg.message}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
