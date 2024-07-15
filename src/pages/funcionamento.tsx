import * as React from "react";
import howItWorks from "../db/howItWorks.json";

export default function Funcionamento() {
  return (
    <section className="h-fit flex flex-col pt-20 px-6">
      <h2 className="font-primary text-xl lg:text-4xl text-center mb-4">
        {howItWorks.title}
      </h2>
      <div className="h-fit flex flex-col gap-4">
        <p className="text-sm">{howItWorks.description}</p>

        <div className="bg-yellow-100 p-4 rounded-md drop-shadow">
          {howItWorks.metadata.map((data, i) => (
            <p key={i} className="text-sm">
              <span className={data.class}>{data.label}</span>
              {data.value}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
