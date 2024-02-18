import * as React from "react";
import fairs from "../db/fairs.json";

export default function Fairs() {
  return (
    <section className="h-fit flex flex-col pt-20 px-6">
      <h2 className="font-primary text-2xl lg:text-4xl text-center mb-6">
        Conheça nossas feiras!
      </h2>

      <ul className="flex flex-col gap-2">
        {fairs.map(
          (fair: any) =>
            fair.name && (
              <li key={fair.id}>
                <p className="font-bold">{fair.name}</p>
                <div className="ml-2">
                  <p>
                    {fair.frequency} de {fair.openingHours}
                  </p>
                  <p className="italic">{fair.location}</p>
                  <p>{fair.address}</p>
                </div>
              </li>
            ),
        )}
      </ul>
    </section>
  );
}
