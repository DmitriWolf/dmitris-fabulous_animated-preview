import { useRef, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.scss'
import AppPreviewContainer from './components/app-preview-container/app-preview-container';

const apps = [
  {
    name: 'Document Organizer',
    appId: 'doc-org',
    description:
      'Upload and organize all of your documents from receipts to recipes. Our AI can find what you need and answer all of your questions.',
    url: 'https://documents.dmitrisfabulous.com',
    hasPreview: true,
  },
]

function App() {
  const [expandedApp, setExpandedApp] = useState(null)
  const aboutButtonRef = useRef();

  useGSAP(() => {
    gsap.to('.btn-about-active', { rotation: "+=720" })
  });

  const handleOpenPreview = (app) => {
    setExpandedApp(app);
  }

  const handleClosePreview = () => {
    setExpandedApp(null);
  }

  return (
    <>
      {expandedApp && (
        <AppPreviewContainer app={expandedApp} onClose={handleClosePreview} />
      )}

      <div className="page">
        <header className="hero">
          <h1>Dmitri's Fabulous</h1>
          <p className="tagline">A suite of tools to simplify your life.</p>
        </header>

        <main className="apps">
          <h2>Apps</h2>
          <div className="card-grid">
            {apps.map((app) => (
              <div key={app.url}  className={`card ${app.appClass}`}>
                <h3>{app.name}</h3>
                <p>{app.description}</p>
                <div className="card-actions">
                  <a href={app.url} className="btn btn-launch">Launch</a>
                  {app.hasPreview && (
                    <button
                      className={`btn btn-about-active`}
                      onClick={() => handleOpenPreview(app)}
                      ref={aboutButtonRef}
                    >
                      About
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Dmitri's Fabulous</p>
        </footer>
      </div>
    </>
  )
}

export default App
