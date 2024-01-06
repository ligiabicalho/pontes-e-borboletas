import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    title: "What is a IPB?",
    description:
      ' As "outras economias" referem-se a modelos econômicos alternativos que buscam romper com a lógica tradicional do sistema capitalista, priorizando valores como solidariedade, colaboração e sustentabilidade. Entre essas abordagens, destacam-se as economias solidárias e colaborativas, que buscam promover relações mais equitativas entre os participantes.',
  },
  {
    title: "What is a IPB?",
    description:
      "A economia solidária se baseia na ideia de cooperação e autogestão, onde os membros de uma comunidade trabalham juntos para criar e manter empreendimentos que visam o bem comum. Nesse contexto, os lucros são compartilhados de maneira mais justa, promovendo a inclusão social e a redução das desigualdades.",
  },
  {
    title: "What is a IPB?",
    description:
      "A economia colaborativa concentra-se na troca de bens, serviços e recursos de forma mais direta entre os membros de uma comunidade. Plataformas digitais têm facilitado esse tipo de interação, permitindo o compartilhamento de habilidades, espaços e até mesmo a co-produção de bens, diminuindo o consumo excessivo e fomentando a sustentabilidade.",
  },
  {
    title: "What is a IPB?",
    description:
      "A agricultura familiar busca preservar as tradições e fortalecer as comunidades rurais, muitas vezes adotando práticas agroecológicas que promovem a produção sustentável e o respeito ao meio ambiente. A valorização do trabalho em conjunto e o compartilhamento de conhecimentos são aspectos essenciais nesse contexto, refletindo a essência das outras economias.",
  },
];

export function FAQ() {
  return (
    <section className="lg:flex flex-col py-8 items-center justify-center">
      <h2 className="font-primary text-4xl text-center my-8 pb-8">FAQ</h2>

      <div className="container">
        {FAQ_ITEMS.map((item) => (
          <Accordion type="single" collapsible key={item.title}>
            <AccordionItem value={item.title}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent className="text-xs lg:text-base">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
