import costTransparency from "../../../db/costTransparency.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CostTransparency: React.FC = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{costTransparency.title}</AccordionTrigger>
        <AccordionContent>
          {/* <p className="text-xs italic pb-2">{costTransparency.description}</p> */}
          <ul>
            {costTransparency.types.map((type, i) => (
              <li key={i} className="pb-1">
                <p className="text-xs italic py-1">{type.title}</p>
                <ul>
                  {type.items
                    .filter((item) => item.active)
                    .map((item) => (
                      <li key={item.id} className="text-xs pl-2">
                        {`${item.name} (${item.cost})`}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CostTransparency;
