// Datos que cambian de una edición del curso a otra. Para una edición nueva, se cambia solo este archivo:
// todos los textos de la landing y del formulario que los mencionan los leen de aquí.

export const EDICION = {
  anio: "2027",

  // Clase abierta y gratuita
  claseAbierta: {
    nombre: "Tres maneras de ser tú: Sol, Luna y Ascendente",
    dia: "sábado",
    fecha: "12 de diciembre",
    hora: "11:00 a 12:00",
  },

  // Curso
  inicio: "16 de enero",
  fin: "10 de abril de 2027",
  horario: "Sábados de 11:00 a 13:00, hora de Barcelona",
  horarioClase: "Sábados de 11:00 a 13:00",
  ciudadHorario: "Barcelona",
  sinClase: "27 de marzo",
  semanas: 12,
  encuentros: 12,
  maxPersonas: 12,

  // Grabaciones
  grabacionesMeses: 3,
  grabacionesHasta: "10 de julio de 2027",

  // Mínimo de personas (pregunta frecuente)
  minPersonas: 5,
  cierreInscripcion: "12 de enero",
  confirmacionMinimo: "13 de enero",
  inicioAlternativo: "30 de enero",
}
