import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MonitorCheck,
  CoinsIcon,
  LucideIcon,
  HeartHandshake,
  Flower2,
  Salad,
  ArrowRightLeft,
} from "lucide-react";

enum HowItWorksTabs {
  INFOS = "INFOS",
  OTHER_INFOS = "OTHER_INFOS",
}

type ItemCardProps = {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
};

const ItemCard: React.FC<ItemCardProps> = ({
  Icon,
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="flex-1 flex flex-col items-start p-8 border rounded-lg space-y-4">
      <Icon size="50" className="self-center" />

      <p className="font-bold lg:text-xl">{title}</p>
      <p className="lg:text-xl">{subtitle}</p>
      <p className="text-xs lg:text-sm">{description}</p>
    </div>
  );
};

const INFOS: ItemCardProps[] = [
  {
    Icon: HeartHandshake,
    title: "1. Economia Solidária",
    subtitle: "Cooperação Sustentável",
    description:
      "Descubra como a economia solidária promove a cooperação e a distribuição justa de recursos, construindo comunidades mais equitativas e resilientes.",
  },
  {
    Icon: Flower2,
    title: "2. Economia Colaborativa",
    subtitle: "Compartilhando Prosperidade",
    description:
      "Explore como a economia colaborativa transforma a maneira como compartilhamos serviços e recursos, fortalecendo laços comunitários e reduzindo o impacto ambiental.",
  },
  {
    Icon: Salad,
    title: "3.  Agricultura Familiar e Agroecologia",
    subtitle: "Cultivando Sustentabilidade",
    description:
      "Conheça o ciclo virtuoso da agricultura familiar e agroecologia, onde práticas sustentáveis e comunidade se entrelaçam para criar sistemas alimentares mais saudáveis e justos.",
  },
];

const OTHER_INFOS: ItemCardProps[] = [
  {
    Icon: CoinsIcon,
    title: "1. Finanças Éticas",
    subtitle: "Equilíbrio Financeiro",
    description:
      " Explore como as finanças éticas promovem investimentos conscientes, conectando pessoas e negócios para construir uma economia mais justa e sustentável.",
  },
  {
    Icon: ArrowRightLeft,
    title: "2. Comércio Justo",
    subtitle: "Trocas Equitativas",
    description:
      "Explore como o comércio justo promove relações comerciais mais éticas, garantindo que produtores recebam compensações justas e contribuindo para o desenvolvimento sustentável das comunidades.",
  },
  {
    Icon: MonitorCheck,
    title: "3. Tecnologia para o Bem",
    subtitle: "Inovação Social",
    description:
      "Saiba como a tecnologia para o bem impulsiona soluções inovadoras, conectando comunidades e promovendo o desenvolvimento sustentável em escala global.",
  },
];

export default function HowItWorks() {
  return (
    <section className="lg:flex flex-col bg-background py-20 items-center justify-center">
      <h2 className="font-primary text-2xl lg:text-4xl text-center mb-6">
        How it works
      </h2>

      <Tabs defaultValue={HowItWorksTabs.INFOS}>
        <TabsList className="w-full">
          <TabsTrigger value={HowItWorksTabs.INFOS}>Uma informação</TabsTrigger>
          <TabsTrigger value={HowItWorksTabs.OTHER_INFOS}>
            Outra informação
          </TabsTrigger>
        </TabsList>
        <TabsContent value={HowItWorksTabs.INFOS} className="mt-6">
          <div className="container flex flex-col gap-6 lg:flex-row">
            {INFOS.map((item) => (
              <ItemCard
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value={HowItWorksTabs.OTHER_INFOS} className="mt-6">
          <div className="container flex flex-col gap-6 lg:flex-row">
            {OTHER_INFOS.map((item) => (
              <ItemCard
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
