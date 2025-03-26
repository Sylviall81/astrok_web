// "use client"

// import { useEffect } from "react"
// import Script from "next/script"

// export default function BookingPage() {
//   useEffect(() => {
//     // Inicializar Calendly cuando el componente se monta
//     const initCalendly = () => {
//       if ((window as any).Calendly) {
//         ;(window as any).Calendly.initInlineWidget({
//           url: "https://calendly.com/d/abc-123/consulta-astrologica",
//           parentElement: document.getElementById("calendly-embed"),
//           prefill: {},
//           utm: {},
//         })
//       }
//     }

//     // Si Calendly ya está cargado, inicializar
//     if ((window as any).Calendly) {
//       initCalendly()
//     }

//     return () => {
//       // Limpiar Calendly cuando el componente se desmonta
//       if ((window as any).Calendly) {
//         const calendlyElements = document.getElementsByClassName("calendly-inline-widget")
//         while (calendlyElements.length > 0) {
//           calendlyElements[0].remove()
//         }
//       }
//     }
//   }, [])

//   return (
//     <section className="py-16 md:py-24">
//       <div className="container-custom">
//         <div className="max-w-4xl mx-auto text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Agenda tu sesión</h1>
//           <p className="text-xl text-secondary">
//             Selecciona el tipo de consulta y elige la fecha y hora que mejor te convenga.
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div id="calendly-embed" style={{ minHeight: "700px" }}></div>
//         </div>

//         <div className="mt-12 bg-neutral-light p-8 rounded-lg">
//           <h2 className="text-2xl font-lato font-semibold text-primary mb-4">Información importante</h2>
//           <ul className="space-y-3">
//             <li className="flex items-start">
//               <svg
//                 className="h-6 w-6 text-primary mr-2 flex-shrink-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>
//                 Para la carta natal y otros análisis astrológicos precisos, necesitarás proporcionar tu fecha, hora y
//                 lugar exactos de nacimiento.
//               </span>
//             </li>
//             <li className="flex items-start">
//               <svg
//                 className="h-6 w-6 text-primary mr-2 flex-shrink-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>
//                 Recibirás un correo de confirmación con los detalles de tu reserva y las instrucciones para la sesión.
//               </span>
//             </li>
//             <li className="flex items-start">
//               <svg
//                 className="h-6 w-6 text-primary mr-2 flex-shrink-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>
//                 Las sesiones se realizan por videollamada (Zoom) o presencialmente en Barcelona, según tu preferencia.
//               </span>
//             </li>
//             <li className="flex items-start">
//               <svg
//                 className="h-6 w-6 text-primary mr-2 flex-shrink-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>
//                 Si necesitas cancelar o reprogramar tu cita, por favor hazlo con al menos 24 horas de antelación.
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <Script
//         src="https://assets.calendly.com/assets/external/widget.js"
//         strategy="lazyOnload"
//         onLoad={() => {
//           if ((window as any).Calendly) {
//             ;(window as any).Calendly.initInlineWidget({
//               url: "https://calendly.com/d/abc-123/consulta-astrologica",
//               parentElement: document.getElementById("calendly-embed"),
//               prefill: {},
//               utm: {},
//             })
//           }
//         }}
//       />
//     </section>
//   )
// }

