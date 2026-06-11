import axios from 'axios'
import useAuthStore from '../store/authStore.js'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/admin/giris'
    }
    return Promise.reject(error)
  }
)

export const productsApi = {
  getAll: (params) => api.get('/products', { params }),
  getBySlug: (slug) => api.get(`/products/${slug}`),
  create: (data) => api.post('/admin/products', data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  delete: (id) => api.delete(`/admin/products/${id}`),
}

export const brandsApi = {
  getAll: () => api.get('/brands'),
  adminGetAll: () => api.get('/admin/brands'),
  create: (data) => api.post('/admin/brands', data),
  update: (id, data) => api.put(`/admin/brands/${id}`, data),
  delete: (id) => api.delete(`/admin/brands/${id}`),
}

export const categoriesApi = {
  getAll: () => api.get('/categories'),
  adminGetAll: () => api.get('/admin/categories'),
  create: (data) => api.post('/admin/categories', data),
  update: (id, data) => api.put(`/admin/categories/${id}`, data),
  delete: (id) => api.delete(`/admin/categories/${id}`),
}

export const imagesApi = {
  upload: (formData) => api.post('/admin/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/admin/images/${id}`),
}

export const contactApi = {
  send: (data) => api.post('/contact/send', data),
}

export const messagesApi = {
  getAll: () => api.get('/admin/messages'),
  markRead: (id) => api.patch(`/admin/messages/${id}/read`),
}

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
}

export default api
