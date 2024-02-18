// https://forms.gle/cAezoxWNFJvuGWbXA
import * as React from "react";

export default function Support() {
  return (
    <section className="flex flex-col pt-20 px-6">
      <h2 className="font-primary text-2xl lg:text-4xl text-center mb-6">
        Suporte
      </h2>
      <p>
        Colabore com as melhorias do App, deixe seu feedback ou reporte algum
        erro encontrado ao utilizá-lo.
      </p>
      <div className="flex justify-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSehD5vJa2aKmpnuMuChRiq0z5bAllsn7TjREUCokfHZ-_cSQg/viewform?embedded=true"
          width="640"
          height="1365"
        >
          Carregando…
        </iframe>
      </div>
    </section>
  );
}
