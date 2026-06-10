import { useQuery } from '@tanstack/react-query'
import { productsApi, brandsApi, categoriesApi } from '../services/api.js'

export function useProducts(params) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getAll(params).then(r => r.data),
  })
}

export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsApi.getBySlug(slug).then(r => r.data),
    enabled: !!slug,
  })
}

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: () => brandsApi.getAll().then(r => r.data),
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll().then(r => r.data),
  })
}
