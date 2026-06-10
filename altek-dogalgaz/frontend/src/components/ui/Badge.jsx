const colors = {
  blue: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', border: 'rgba(59, 130, 246, 0.3)' },
  red: { bg: 'rgba(220, 38, 38, 0.15)', color: '#DC2626', border: 'rgba(220, 38, 38, 0.3)' },
  green: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', border: 'rgba(34, 197, 94, 0.3)' },
  gray: { bg: 'rgba(100, 116, 139, 0.15)', color: '#64748B', border: 'rgba(100, 116, 139, 0.3)' },
  orange: { bg: 'rgba(249, 115, 22, 0.15)', color: '#F97316', border: 'rgba(249, 115, 22, 0.3)' },
}

export default function Badge({ children, color = 'blue', style }) {
  const c = colors[color] || colors.blue
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '20px',
      fontSize: '12px', fontWeight: 600,
      background: c.bg, color: c.color,
      border: `1px solid ${c.border}`,
      ...style,
    }}>
      {children}
    </span>
  )
}
