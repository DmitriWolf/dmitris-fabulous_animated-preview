import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './navigation.scss'

export default function PreviewNav({ onClose }) {
  const closeButtonRef = useRef()

  useGSAP(() => {
    gsap.to(closeButtonRef.current, { opacity: 1, duration: 0.5, delay: 2.0 })
  })

  return (
    <nav>
      <button
        className="btn btn-close"
        onClick={onClose}
        ref={closeButtonRef}
      >
        Close
      </button>
    </nav>
  )
}
