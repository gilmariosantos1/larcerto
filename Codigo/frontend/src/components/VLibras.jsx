import { useEffect } from 'react'

export default function VLibras() {
  useEffect(() => {
    // Evita carregar múltiplas vezes
    if (window.VLibras) {
      new window.VLibras.Widget('https://vlibras.gov.br/app')
      return
    }
    const script = document.createElement('script')
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.onload = () => {
      new window.VLibras.Widget('https://vlibras.gov.br/app')
    }
    document.body.appendChild(script)
  }, [])

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active"></div>
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  )
}
