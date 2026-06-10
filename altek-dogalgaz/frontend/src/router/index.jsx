import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import Home from '../pages/Home.jsx'
import Products from '../pages/Products.jsx'
import ProductDetail from '../pages/ProductDetail.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import AdminLogin from '../pages/admin/AdminLogin.jsx'
import AdminDashboard from '../pages/admin/AdminDashboard.jsx'
import AdminProducts from '../pages/admin/AdminProducts.jsx'
import AdminProductForm from '../pages/admin/AdminProductForm.jsx'
import AdminBrands from '../pages/admin/AdminBrands.jsx'
import AdminCategories from '../pages/admin/AdminCategories.jsx'
import AdminMessages from '../pages/admin/AdminMessages.jsx'
import AdminLayout from '../components/layout/AdminLayout.jsx'
import ProtectedRoute from '../components/layout/ProtectedRoute.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="urunler" element={<Products />} />
          <Route path="urunler/:slug" element={<ProductDetail />} />
          <Route path="hakkimizda" element={<About />} />
          <Route path="iletisim" element={<Contact />} />
        </Route>
        <Route path="/admin/giris" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="urunler" element={<AdminProducts />} />
          <Route path="urunler/ekle" element={<AdminProductForm />} />
          <Route path="urunler/:id/duzenle" element={<AdminProductForm />} />
          <Route path="markalar" element={<AdminBrands />} />
          <Route path="kategoriler" element={<AdminCategories />} />
          <Route path="mesajlar" element={<AdminMessages />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
