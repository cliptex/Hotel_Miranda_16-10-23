import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const placeholderUrl = 'https://via.placeholder.com/600x400/1E293B/94A3B8?text=Fotoğraf+Yok'
  const hasImages = images.length > 0

  const slides = hasImages
    ? images.map(img => ({ src: img.image_url }))
    : [{ src: placeholderUrl }]

  return (
    <div>
      {/* Main image */}
      <div style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        background: '#1E293B', aspectRatio: '4/3',
        border: '1px solid #334155',
      }}>
        <img
          src={hasImages ? images[active]?.image_url : placeholderUrl}
          alt="Ürün görseli"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <button
          onClick={() => setLightboxOpen(true)}
          style={{
            position: 'absolute', top: '12px', right: '12px',
            background: 'rgba(15, 23, 42, 0.8)', border: 'none',
            color: '#F8FAFC', borderRadius: '8px', padding: '8px',
            cursor: 'pointer', backdropFilter: 'blur(8px)',
          }}
        >
          <ZoomIn size={18} />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive(a => (a - 1 + images.length) % images.length)}
              style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(15, 23, 42, 0.8)', border: 'none',
                color: '#F8FAFC', borderRadius: '8px', padding: '8px',
                cursor: 'pointer', backdropFilter: 'blur(8px)',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setActive(a => (a + 1) % images.length)}
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(15, 23, 42, 0.8)', border: 'none',
                color: '#F8FAFC', borderRadius: '8px', padding: '8px',
                cursor: 'pointer', backdropFilter: 'blur(8px)',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto' }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0, width: '72px', height: '72px',
                borderRadius: '8px', overflow: 'hidden',
                border: `2px solid ${i === active ? '#3B82F6' : '#334155'}`,
                cursor: 'pointer', background: 'none', padding: 0,
                transition: 'border-color 0.2s',
              }}
            >
              <img src={img.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={active}
      />
    </div>
  )
}
