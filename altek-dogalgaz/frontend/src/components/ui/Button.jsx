import { motion } from 'framer-motion'

const variants = {
  primary: {
    background: 'linear-gradient(135deg, #1E3A8A, #2563EB)',
    color: '#F8FAFC',
    border: 'none',
    hoverBg: 'linear-gradient(135deg, #1e40af, #3B82F6)',
  },
  danger: {
    background: 'linear-gradient(135deg, #DC2626, #EF4444)',
    color: '#F8FAFC',
    border: 'none',
    hoverBg: 'linear-gradient(135deg, #b91c1c, #DC2626)',
  },
  outline: {
    background: 'transparent',
    color: '#3B82F6',
    border: '1px solid #3B82F6',
    hoverBg: 'rgba(59, 130, 246, 0.1)',
  },
  ghost: {
    background: 'transparent',
    color: '#94A3B8',
    border: '1px solid #334155',
    hoverBg: 'rgba(148, 163, 184, 0.1)',
  },
}

const sizes = {
  sm: { padding: '6px 14px', fontSize: '13px', borderRadius: '6px' },
  md: { padding: '10px 20px', fontSize: '14px', borderRadius: '8px' },
  lg: { padding: '14px 28px', fontSize: '16px', borderRadius: '10px' },
}

export default function Button({ children, variant = 'primary', size = 'md', disabled, fullWidth, onClick, type = 'button', style, ...props }) {
  const v = variants[variant]
  const s = sizes[size]
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      style={{
        ...s,
        background: v.background,
        color: v.color,
        border: v.border,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center',
        transition: 'all 0.2s',
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'Inter, sans-serif',
        ...style,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = v.hoverBg }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = v.background }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
