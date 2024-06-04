import * as React from "react";
import contacts from "../db/contacts.json";
import Link from "next/link";
import {
  CalendarClock,
  CalendarDays,
  CircleDollarSign,
  Info,
  Instagram,
  LucideIcon,
  Mail,
  MapPin,
  MessageCircle,
  MousePointerClick,
  Phone,
  Store,
} from "lucide-react";

export default function Contact() {
  const { creator, whatsapp, instagram, linktree, phone, email, storage, pix } =
    contacts;
  const icons: LucideIcon[] = [
    Store,
    MapPin,
    CalendarDays,
    CalendarClock,
    Info,
  ];
  let Icon: LucideIcon;
  return (
    <section className="min-h-[100%] flex flex-col pt-20 px-6">
      <h2 className="font-primary text-2xl lg:text-4xl text-center mb-6">
        Entre em contato com a gente!
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-evenly">
        <div id="contatos" className="flex flex-col gap-3 mb-4">
          <div>
            <h3 className="font-primary">Instituto Pontes e Borboletas</h3>
            <h4 className="font-primary">{creator}</h4>
          </div>
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
            <span className="underline">Linktree: links importantes</span>
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
          {pix.display && (
            <p>
              <CircleDollarSign className="inline mx-1" /> Chave pix:{" "}
              <span className="select-all">{pix.key}</span>
            </p>
          )}
        </div>

        <div id="armazem" className="flex flex-col mb-4">
          {storage.map(
            ({ type, data }, index) => (
              (Icon = icons[index]),
              (
                <div
                  key={type}
                  className={`flex space-y-2 items-center gap-y-4  ${
                    type !== "name" && "pl-4"
                  }`}
                >
                  <Icon className="inline mx-1" />
                  <span
                    className={`${type === "name" && "font-bold"} ${
                      type === "obs" && "text-xs"
                    }
                  select-all`}
                  >
                    {data}
                  </span>
                </div>
              )
            ),
          )}
        </div>
      </div>
    </section>
  );
}
