export default function PoliticaPrivacidadPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-4">
            Política de Privacidad
          </h1>
          <p className="text-sm text-secondary mb-10">Última actualización: 2025</p>

          <div className="prose prose-lg max-w-none">
            <p>
              En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección
              de Datos Personales (LOPDGDD), te informamos sobre el tratamiento de tus datos personales.
            </p>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              1. Responsable del tratamiento
            </h2>
            <ul>
              <li><strong>Titular:</strong> Sylvia Llorente Suárez (Kaleidoastro)</li>
              <li><strong>NIF:</strong> 45960967K</li>
              <li><strong>Domicilio:</strong> CalleSegre, 76-84. 08030 Barcelona</li>
              <li><strong>Email:</strong> hola@astrokaleido.com</li>
              <li><strong>Web:</strong> kaleidoastro.com</li>
            </ul>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              2. Finalidad del tratamiento
            </h2>
            <p>Tratamos tus datos para las siguientes finalidades:</p>
            <ul>
              <li>
                <strong>Newsletter:</strong> envío de contenido sobre astrología psicológica,
                herramientas de autodescubrimiento y novedades del servicio.
              </li>
              <li>
                <strong>Contacto:</strong> gestión y respuesta a las consultas recibidas a través
                del formulario de contacto.
              </li>
              <li>
                <strong>Servicios:</strong> prestación de los servicios de astrología contratados.
              </li>
            </ul>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              3. Base legal
            </h2>
            <ul>
              <li>
                <strong>Newsletter:</strong> tu consentimiento expreso al marcar la casilla de
                aceptación en el formulario de suscripción (art. 6.1.a RGPD).
              </li>
              <li>
                <strong>Contacto:</strong> consentimiento del interesado o interés legítimo
                (art. 6.1.a y 6.1.f RGPD).
              </li>
              <li>
                <strong>Servicios contratados:</strong> ejecución de un contrato (art. 6.1.b RGPD).
              </li>
            </ul>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              4. Conservación de los datos
            </h2>
            <p>
              Tus datos se conservarán mientras dure la relación o hasta que solicites su supresión.
              En el caso del newsletter, hasta que retires tu consentimiento. Transcurrido el plazo
              necesario, los datos serán eliminados o anonimizados.
            </p>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              5. Destinatarios
            </h2>
            <p>
              Tus datos no serán cedidos a terceros salvo obligación legal. Para la gestión del
              newsletter utilizamos Resend, servicio de envío de email que opera bajo las garantías
              adecuadas conforme al RGPD.
            </p>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              6. Tus derechos
            </h2>
            <p>
              Tienes derecho a acceder, rectificar, suprimir, limitar, oponerte al tratamiento y a la
              portabilidad de tus datos. Puedes ejercerlos enviando un email a{" "}
              <a href="mailto:kaleidoscopebcn@gmail.com">kaleidoscopebcn@gmail.com</a> adjuntando
              copia de tu DNI.
            </p>
            <p>
              Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una
              reclamación ante la{" "}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
                Agencia Española de Protección de Datos
              </a>
              .
            </p>

            <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">
              7. Comunicaciones comerciales
            </h2>
            <p>
              Si te suscribes al newsletter, recibirás periódicamente contenido sobre astrología
              psicológica, herramientas de autodescubrimiento y novedades de Kaleidoastro. El envío
              se realiza únicamente con tu consentimiento expreso y puedes darte de baja en cualquier
              momento haciendo clic en el enlace de baja de cualquier email o escribiendo a{" "}
              <a href="mailto:kaleidoscopebcn@gmail.com">kaleidoscopebcn@gmail.com</a> con el asunto
              «Baja newsletter».
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
