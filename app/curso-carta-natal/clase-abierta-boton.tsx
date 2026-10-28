"use client"

// Evento que escucha el formulario de preinscripción para marcar la casilla de la clase abierta.
// Desde fuera de la página (correo, Instagram…) se puede enlazar /curso-carta-natal?clase-abierta=1#preinscripcion
export const EVENTO_CLASE_ABIERTA = "curso:clase-abierta"

export default function ClaseAbiertaBoton() {
  return (
    <a
      href="#preinscripcion"
      onClick={() => window.dispatchEvent(new Event(EVENTO_CLASE_ABIERTA))}
      className="btn-secondary px-10"
    >
      Quiero ir a la clase abierta
    </a>
  )
}
