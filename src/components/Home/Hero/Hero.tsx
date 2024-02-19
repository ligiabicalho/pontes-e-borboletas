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
    <section className="flex flex-col bg-gradient p-8 pt-20 min-h-screen lg:px-0">
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
        {heroTexts.howItWorks.title && (
          <Accordion type="single" collapsible className="shadow rounded-md">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xs p-2 px-1">
                {heroTexts.howItWorks.title}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xs text-justify pb-2">
                  {heroTexts.howItWorks.description}
                </p>
                <p className="text-xs">{heroTexts.howItWorks.step1}</p>
                <p className="text-xs">{heroTexts.howItWorks.step2}</p>
                <p className="text-xs ml-2">{heroTexts.howItWorks.step2_1}</p>
                <p className="text-xs ml-2">{heroTexts.howItWorks.step2_2}</p>
                <p className="text-xs">{heroTexts.howItWorks.step3}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {heroTexts.weighing.title && (
          <Accordion type="single" collapsible className="shadow rounded-md">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xs p-2 px-1">
                {heroTexts.weighing.title}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xs">{heroTexts.weighing.description}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <ShoppingList />
      </div>
    </section>
  );
}
