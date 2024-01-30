import * as React from "react";
import {
  creator,
  whatsapp,
  instagram,
  linktree,
  phone,
  email,
  storage,
  pix,
} from "../db/contacts.json";
import Link from "next/link";
import {
  Instagram,
  Mail,
  MessageCircle,
  MousePointerClick,
  Phone,
} from "lucide-react";

export default function Contact() {
  interface Storage {
    name: string;
    address: string;
    frequency: string;
    openingHours: string;
    obs: string;
    [key: string]: string; // This is the index signature
  }

  const storageFair: Storage = { ...storage };

  return (
    <section className="h-fit flex flex-col pt-20 px-6">
      <h2 className="font-primary text-2xl lg:text-4xl text-center mb-6">
        Fale conosco!
      </h2>
      <h3 className="font-primary mb-4">{creator}</h3>
      <div className="flex flex-col gap-3 mb-4">
        <Link
          href={`${whatsapp.url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="inline mx-1" />
          <span className="underline">{whatsapp.number}</span>
        </Link>
        <div>
          <Phone className="inline mx-1" />
          <span className="select-all">{phone}</span>
        </div>
        <Link
          href={`${instagram.url}${instagram.user}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="inline mx-1" />
          <span className="underline">{instagram.user}</span>
        </Link>
        <Link href={linktree} target="_blank" rel="noopener noreferrer">
          <MousePointerClick className="inline mx-1" />
          <span className="underline">Linktree: links úteis</span>
        </Link>
        <Link
          href={`mailto:${email.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail className="inline mx-1" />
          <span className="underline" aria-label={email.address}>
            {email.address.substring(0, email.address.indexOf("@"))}
          </span>
        </Link>
      </div>
      <div className="flex flex-col mb-4 ">
        {Object.keys(storageFair).map((key) => (
          <p
            key={key}
            className={`${key === "name" && "font-bold"} ${
              key === "obs" && "text-xs"
            } select-all`}
          >
            {storageFair[key]}
          </p>
        ))}
      </div>
      <p>
        Chave pix: <span className="select-all">{pix.key}</span>
      </p>
    </section>
  );
}
//<AtSign />
//
//
//<MapPin />
//<Store />
//<CalendarDays /> <CalendarClock />
//<Clock />
//<Phone />
