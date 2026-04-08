export default function PoliticaCookiesPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-4">
            Política de Cookies
          </h1>
          <p className="text-sm text-secondary mb-10">Última actualización: 2025</p>

          <div className="prose prose-lg max-w-none">
            <p>
              En cumplimiento de la Ley 34/2002 (LSSICE) y el RGPD, te informamos sobre el uso de
              cookies en kaleidoastro.com.
            </p>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              ¿Qué son las cookies?
            </h2>
            <p>
              Las cookies son pequeños ficheros de texto que se descargan en tu dispositivo al acceder
              a determinadas páginas web. Permiten recordar tus preferencias y mejorar tu experiencia
              de navegación.
            </p>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              Tipos de cookies que utilizamos
            </h2>
            <ul>
              <li>
                <strong>Cookies técnicas (necesarias):</strong> imprescindibles para el funcionamiento
                del sitio. No requieren consentimiento.
              </li>
              <li>
                <strong>Cookies analíticas (opcionales):</strong> nos permiten conocer cómo se usa
                el sitio para mejorarlo. Solo se instalan con tu aceptación.
              </li>
              <li>
                <strong>Cookies de terceros:</strong> pueden instalarse cookies de servicios externos
                (como Google Analytics) siempre con tu consentimiento previo.
              </li>
            </ul>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              ¿Cómo gestionar las cookies?
            </h2>
            <p>
              Puedes aceptar, rechazar o revocar el uso de cookies no técnicas en cualquier momento
              a través del panel de preferencias de cookies del sitio web.
            </p>
            <p>También puedes configurar tu navegador:</p>
            <ul>
              <li>
                <strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies
              </li>
              <li>
                <strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferencias → Privacidad
              </li>
              <li>
                <strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios
              </li>
            </ul>
            <p>
              Ten en cuenta que bloquear ciertas cookies puede afectar al funcionamiento del sitio web.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
