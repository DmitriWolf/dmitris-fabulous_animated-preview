import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './app-preview-container.scss'
import PreviewNav from '../navigation/navigation'
import DocumentOrganizerPreview from '../document-organizer-preview/document-organizer-preview'

function getPreviewComponent(appId) {
  switch (appId) {
    case 'doc-org': return DocumentOrganizerPreview
    default: return null
  }
}

export default function AppPreviewContainer({ app, onClose }) {
  const PreviewComponent = getPreviewComponent(app.appId)
  const { contextSafe } = useGSAP()

  const animatePreviewIn = contextSafe(() => {
    gsap.to('.preview-screen', {
      x: 0,
      y: 0,
      right: 0,
      height: '100vh',
      rotation: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.5,
      ease: "power2.out",
      pointerEvents: "auto"
    })
  })

  const animatePreviewOut = contextSafe(() => {
    gsap.to('.preview-screen', {
      x: -5,
      y: -10,
      right: '100vw',
      height: 0,
      rotation: -15,
      opacity: 0,
      delay: 0.25,
      duration: 0.5,
      ease: "power2.out",
      pointerEvents: "auto",
      onComplete: onClose
    })
  })

  useGSAP(() => {
    animatePreviewIn()
  })

  return (
    <div className='preview-screen'>
      <PreviewNav onClose={animatePreviewOut} />
      {PreviewComponent && <PreviewComponent />}
    </div>
  )
}
