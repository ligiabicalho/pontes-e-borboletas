import ShoppingList from "../ShoppingList/ShoppingList";
import heroTexts from "../../../db/heroTexts.json";
import fairs from "../../../db/fairs.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Hero() {
  const activeFair = fairs.find((fair) => fair.active);
  return (
    <section className="flex flex-col bg-gradient px-8 pt-20 min-h-screen lg:px-0">
      <div className="lg:container flex flex-col justify-around gap-y-3">
        <div className="flex flex-col items-center pb-2">
          <h1 className="font-bold text-xl">{heroTexts.title}</h1>
          <p className="text-sm italic text-center">{heroTexts.description}</p>
        </div>

        {activeFair && (
          <div>
            <p className="text-[16px]">Local: {activeFair.location} </p>
            <p className="text-[16px]">
              {activeFair.frequency} de {activeFair.openingHours}
            </p>
          </div>
        )}
        <Accordion type="single" collapsible>
          {heroTexts.accordions.map((item, i) => (
            <AccordionItem key={i} value={item.title} className="my-1">
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <p className="text-xs text-justify pb-2">{item.description}</p>
                {item.metadata.map((data, i) => (
                  <p key={i} className="text-xs">
                    {data}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <ShoppingList />
      </div>
    </section>
  );
}
