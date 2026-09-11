// Utilidades para cargar Google Analytics 4 (gtag.js) respetando Consent Mode v2.
// El script de gtag.js SOLO se inyecta en el DOM cuando el usuario acepta ("Aceptar todas").
// Mientras no haya consentimiento, no se realiza ninguna petición de red a Google.

export const GA_MEASUREMENT_ID = "G-3SPDT837GK"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

// Actualiza el estado de consentimiento ya declarado por defecto (denied) en el layout.
export function updateConsent(granted: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  })
}

// Inyecta gtag.js y dispara la config de GA4. Idempotente: si ya está cargado, no hace nada.
export function loadGA() {
  if (typeof document === "undefined") return
  if (document.getElementById("ga4-script")) return

  const script = document.createElement("script")
  script.id = "ga4-script"
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.onload = () => {
    window.gtag("js", new Date())
    window.gtag("config", GA_MEASUREMENT_ID)
  }
  document.head.appendChild(script)
}
