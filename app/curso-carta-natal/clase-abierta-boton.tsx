"use client"

// Evento que escucha el formulario de preinscripción para marcar la casilla de la clase abierta.
// Desde fuera de la página (correo, Instagram…) se puede enlazar /curso-carta-natal?clase-abierta=1#preinscripcion
export const EVENTO_CLASE_ABIERTA = "curso:clase-abierta"

// Botón de bloque (flex): si el texto ocupa dos líneas, el borde envuelve las dos. En móvil, a todo el ancho de la tarjeta.
export default function ClaseAbiertaBoton() {
  return (
    <a
      href="#preinscripcion"
      onClick={() => window.dispatchEvent(new Event(EVENTO_CLASE_ABIERTA))}
      className="btn-secondary flex w-full items-center justify-center px-10 text-center md:w-auto dark:border-accent dark:text-accent dark:hover:bg-accent/10"
    >
      ¡Me apunto!
    </a>
  )
}
