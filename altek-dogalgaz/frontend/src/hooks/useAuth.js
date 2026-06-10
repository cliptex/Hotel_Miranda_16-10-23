import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authApi } from '../services/api.js'
import useAuthStore from '../store/authStore.js'

export function useLogin() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials).then(r => r.data),
    onSuccess: (data) => {
      login(data.token, data.user)
      navigate('/admin')
      toast.success('Giriş başarılı!')
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Giriş başarısız'
      toast.error(msg)
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  return () => {
    logout()
    navigate('/admin/giris')
    toast.success('Çıkış yapıldı')
  }
}
