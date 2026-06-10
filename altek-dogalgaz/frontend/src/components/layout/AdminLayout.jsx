import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, Tag, Layers, MessageSquare, LogOut, Flame } from 'lucide-react'
import useAuthStore from '../../store/authStore.js'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/urunler', icon: Package, label: 'Ürünler' },
  { to: '/admin/markalar', icon: Tag, label: 'Markalar' },
  { to: '/admin/kategoriler', icon: Layers, label: 'Kategoriler' },
  { to: '/admin/mesajlar', icon: MessageSquare, label: 'Mesajlar' },
]

export default function AdminLayout() {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/giris')
    toast.success('Çıkış yapıldı')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F172A' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: '#0B1220',
        borderRight: '1px solid #1E293B',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        overflowY: 'auto',
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1E293B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #1E3A8A, #DC2626)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Flame size={18} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '14px', color: '#F8FAFC' }}>ALTEK</div>
              <div style={{ fontSize: '9px', color: '#94A3B8', letterSpacing: '2px' }}>ADMIN</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: '8px',
                fontSize: '14px', fontWeight: 500,
                color: isActive ? '#3B82F6' : '#94A3B8',
                background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
              })}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid #1E293B' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '8px',
              background: 'none', border: 'none',
              color: '#DC2626', fontSize: '14px', fontWeight: 500,
              cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
