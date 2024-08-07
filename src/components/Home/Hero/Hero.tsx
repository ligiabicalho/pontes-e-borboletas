import ShoppingList from "../ShoppingList/ShoppingList";
import heroTexts from "../../../db/heroTexts.json";

export default function Hero() {
  return (
    <section className="flex flex-col bg-gradient px-8 pt-20 min-h-screen lg:px-0">
      <div className="lg:container flex flex-col justify-around gap-y-3">
        <div className="flex flex-col items-center pb-2">
          <h1 className="font-bold text-xl">{heroTexts.title}</h1>
          <p className="text-xs lg:text-sm italic text-center">
            {heroTexts.description}
          </p>
        </div>

        {/* <Accordion type="single" collapsible>
          {heroTexts.accordions.map((item, i) => (
            <AccordionItem key={i} value={item.title} className="my-1">
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <p className="text-xs text-justify pb-2">{item.description}</p>
                <ul>
                  {item.metadata.map((data, i) => (
                    <li
                      key={i}
                      className="text-xs"
                      dangerouslySetInnerHTML={{ __html: data }}
                    ></li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion> */}

        <ShoppingList />
      </div>
    </section>
  );
}
