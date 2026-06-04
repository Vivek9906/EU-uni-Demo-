'use client';

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const BG_IMAGES = [
  '/images/hero/hero-1.png',
  '/images/hero/hero-2.png',
  '/images/hero/hero-3.png',
  '/images/hero/hero-4.png',
  '/images/hero/hero-5.png',
  '/images/hero/hero-6.png',
]

// Unsplash fallbacks — used automatically if a local image fails to load
const FALLBACKS = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1627556704302-624286467c65?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1920&q=85&auto=format&fit=crop',
]

export default function HeroSection() {
  const [current, setCurrent]       = useState(0)
  const [imgSrcs, setImgSrcs]       = useState<string[]>(BG_IMAGES)
  const [allLoaded, setAllLoaded]   = useState(false)
  const loadedCount                 = useRef(0)
  const intervalRef                 = useRef<NodeJS.Timeout>()

  // Preload ALL images before starting carousel
  useEffect(() => {
    const resolved = [...BG_IMAGES]
    BG_IMAGES.forEach((src, i) => {
      const img = new window.Image()
      img.onload = () => {
        loadedCount.current++
        if (loadedCount.current === BG_IMAGES.length) setAllLoaded(true)
      }
      img.onerror = () => {
        resolved[i] = FALLBACKS[i]
        setImgSrcs([...resolved])
        loadedCount.current++
        if (loadedCount.current === BG_IMAGES.length) setAllLoaded(true)
      }
      img.src = src
    })
    const safety = setTimeout(() => setAllLoaded(true), 5000)
    return () => clearTimeout(safety)
  }, [])

  // Start the 2.5s auto-advance only after all images are confirmed loaded
  useEffect(() => {
    if (!allLoaded) return
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % BG_IMAGES.length)
    }, 2500)
    return () => clearInterval(intervalRef.current)
  }, [allLoaded])

  const goTo = (i: number) => {
    clearInterval(intervalRef.current)
    setCurrent(i)
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % BG_IMAGES.length), 2500)
  }

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: 580,
      maxHeight: 920,
      overflow: 'hidden',
      background: '#0F172A',
    }}>

      {/* ── BACKGROUND IMAGES — only these transition ── */}
      {imgSrcs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority={i === 0 ? 'high' : 'auto'}
          onError={e => {
            const t = e.currentTarget
            if (t.src !== FALLBACKS[i]) t.src = FALLBACKS[i]
          }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(8,18,40,0.74) 0%, rgba(8,18,40,0.5) 60%, rgba(8,18,40,0.28) 100%)',
      }} />

      {/* ── STATIC CENTERED CONTENT — never transitions ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: 860,
        margin: '0 auto',
        padding: '0 32px',
      }}>
        {/* Label */}
       

        {/* Headline */}
        <h1 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 'clamp(2rem,5vw,3.8rem)', lineHeight: 1.1, margin: '0 0 10px', textAlign: 'center' }}>
          Shaping Global Leaders.
        </h1>
        <h2 style={{ color: '#E09900', fontWeight: 600, fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', lineHeight: 1.1, margin: '0 0 24px', textAlign: 'center', fontStyle: 'italic' }}>
          Transforming the World.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.72, marginBottom: 36, textAlign: 'center' }}>
          EU American University — where purpose meets possibility. Join a global community of leaders across 100+ countries.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/admissions/apply" style={{ padding: '14px 30px', background: '#E09900', color: '#fff', borderRadius: 7, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#B87C00'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#E09900'}>
            Apply Now
          </Link>
          <Link href="/academics" style={{ padding: '14px 30px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.65)', borderRadius: 7, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.65)' }}>
            Explore Programs
          </Link>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
        {BG_IMAGES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Background ${i + 1}`}
            style={{ width: i === current ? 28 : 9, height: 9, borderRadius: 5, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease', background: i === current ? '#E09900' : 'rgba(255,255,255,0.38)' }}
          />
        ))}
      </div>
    </section>
  )
}
