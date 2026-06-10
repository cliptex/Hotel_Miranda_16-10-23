import { motion } from 'framer-motion'

export default function Card({ children, hover = false, glass = false, style, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      style={{
        background: glass
          ? 'rgba(30, 41, 59, 0.7)'
          : '#1E293B',
        backdropFilter: glass ? 'blur(20px)' : 'none',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '24px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        ...style,
      }}
      onMouseEnter={e => {
        if (hover) {
          e.currentTarget.style.borderColor = '#3B82F6'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.15)'
        }
      }}
      onMouseLeave={e => {
        if (hover) {
          e.currentTarget.style.borderColor = '#334155'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      {children}
    </motion.div>
  )
}
