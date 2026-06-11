import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Flame, LogIn, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useLogin } from '../../hooks/useAuth.js'
import useAuthStore from '../../store/authStore.js'
import Button from '../../components/ui/Button.jsx'

export default function AdminLogin() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const loginMutation = useLogin()
  const [showPass, setShowPass] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (isAuthenticated) navigate('/admin')
  }, [isAuthenticated, navigate])

  const inputStyle = (hasError) => ({
    width: '100%', padding: '12px 16px',
    background: '#0B1220', border: `1px solid ${hasError ? '#DC2626' : '#334155'}`,
    borderRadius: '10px', color: '#F8FAFC', fontSize: '15px', outline: 'none',
    fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  })

  return (
    <div style={{
      minHeight: '100vh', background: '#0F172A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.08) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
        top: '-100px', right: '-100px',
        background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%', maxWidth: '420px',
          background: '#1E293B', border: '1px solid #334155',
          borderRadius: '20px', padding: '40px',
          position: 'relative',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #1E3A8A, #DC2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Flame size={28} color="white" />
          </div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '24px', color: '#F8FAFC', marginBottom: '6px' }}>
            Admin Girişi
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>Altek Doğalgaz Yönetim Paneli</p>
        </div>

        <form onSubmit={handleSubmit(d => loginMutation.mutate(d))} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>
              KULLANICI ADI
            </label>
            <input
              {...register('username', { required: 'Kullanıcı adı zorunludur' })}
              placeholder="admin"
              style={inputStyle(errors.username)}
              onFocus={e => e.target.style.borderColor = '#3B82F6'}
              onBlur={e => e.target.style.borderColor = errors.username ? '#DC2626' : '#334155'}
            />
            {errors.username && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>{errors.username.message}</p>}
          </div>

          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>
              ŞİFRE
            </label>
            <div style={{ position: 'relative' }}>
              <input
                {...register('password', { required: 'Şifre zorunludur' })}
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                style={{ ...inputStyle(errors.password), paddingRight: '44px' }}
                onFocus={e => e.target.style.borderColor = '#3B82F6'}
                onBlur={e => e.target.style.borderColor = errors.password ? '#DC2626' : '#334155'}
              />
              <button type="button" onClick={() => setShowPass(s => !s)} style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#64748B', cursor: 'pointer',
              }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>{errors.password.message}</p>}
          </div>

          <Button type="submit" size="lg" fullWidth disabled={loginMutation.isPending}>
            <LogIn size={18} />
            {loginMutation.isPending ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '24px' }}>
          Varsayılan: admin / Altek2024!
        </p>
      </motion.div>
    </div>
  )
}
