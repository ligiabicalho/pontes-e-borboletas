import React from "react";

export function Footer() {
  return (
    <div className="flex items-end justify-center w-full h-fit py-4 absolute bottom-0">
      <p className="text-[10px]">
        Desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/ligiabicalho/"
          target="_blank"
          className="text-[10px] underline hover:no-underline"
        >
          Lígia Bicalho
        </a>
        {/* , Jaider Nunes e Breno G */}
      </p>
    </div>
  );
}
