import * as React from "react";
import fairs from "../db/fairs.json";
import DefaultLayout from "@/layouts/DefaultLayout";

export default function Fairs() {
  const sortedFairs = fairs.sort((a: any, b: any) => {
    const aMinWeekday = Math.min(...a.weekdaysNum);
    const bMinWeekday = Math.min(...b.weekdaysNum);
    return aMinWeekday - bMinWeekday;
  });

  return (
    <DefaultLayout>
      <section className="h-fit flex flex-col pt-20 px-6">
        <h2 className="font-primary text-xl lg:text-4xl text-center mb-4">
          Conheça nossas feiras!
        </h2>
        <p className="italic mb-2">Feira Outra encontra...</p>

        <ul className="flex flex-col gap-2">
          {sortedFairs.map((fair: any) => (
            <li key={fair.id}>
              <p className="font-bold">{fair.name}</p>
              <div className="ml-2">
                <p className="text-sm">
                  {fair.weekdays}, {fair.openingHours}
                </p>
                <p className="italic text-sm">{fair.location}</p>
                <p className="text-sm">{fair.address}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </DefaultLayout>
  );
}
