// Datos que cambian de una edición del curso a otra. Para una edición nueva, se cambia solo este archivo:
// todos los textos de la landing y del formulario que los mencionan los leen de aquí.

export const EDICION = {
  anio: "2027",

  // Clase abierta y gratuita (la hora sigue pendiente en la landing)
  claseAbierta: {
    dia: "sábado",
    fecha: "12 de diciembre",
  },

  // Curso
  inicio: "16 de enero",
  fin: "10 de abril de 2027",
  horario: "Sábados de 10:30 a 12:30, hora de Barcelona",
  sinClase: "27 de marzo",
  semanas: 12,
  encuentros: 12,
  maxPersonas: 10,

  // Grabaciones
  grabacionesMeses: 3,
  grabacionesHasta: "10 de julio de 2027",

  // Mínimo de personas (pregunta frecuente)
  minPersonas: 4,
  fechaMinimo: "8 de enero",
  inicioAlternativo: "30 de enero",
}
