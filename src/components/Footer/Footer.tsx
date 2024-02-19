import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <div className="flex lg:flex-row flex-col bottom-0 w-full p-4 items-center justify-between">
      <div className="flex gap-4">
        <Image
          src="/logo-large.png"
          width={200}
          height={30}
          alt="Logo IPB - Instituto Pontes e Borboletas"
        />
        <div className="flex gap-4">
          <Link href="https://instagram.com/ponteseborboletas" target="_blank">
            <Image
              src="/instagram_black_logo_icon.svg"
              width={30}
              height={30}
              alt="Logo IPB - Instituto Pontes e Borboletas"
            />
          </Link>
          <Link
            href="https://api.whatsapp.com/send?phone=5521997555322"
            target="_blank"
          >
            <Image
              src="/whatsapp_black_logo_icon.svg"
              width={30}
              height={30}
              alt="Logo IPB - Instituto Pontes e Borboletas"
            />
          </Link>
        </div>
      </div>
      <div className="flex w-[50%] justify-between pt-4">
        <p className="text-[10px]">
          Desenvolvido por{" "}
          <Link
            href="https://www.linkedin.com/in/ligiabicalho/"
            target="_blank"
            className="text-[10px] underline hover:no-underline"
          >
            Lígia Bicalho
          </Link>
          {/* , Jaider Nunes e Breno G */}
        </p>
      </div>
    </div>
  );
}
