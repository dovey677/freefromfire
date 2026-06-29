'use client'

export default function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, zIndex: 0 }}
    >
      <source src="https://res.cloudinary.com/dzn1wi3so/video/upload/q_auto,f_auto/v1782722340/Home_page_video_Video_cx5dgz.mp4" type="video/mp4" />
    </video>
  )
}