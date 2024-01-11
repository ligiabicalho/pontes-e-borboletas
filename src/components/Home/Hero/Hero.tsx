import CopyToClipboardButton from "@/components/Home/Hero/CopyToClipboardButton";
import ShoppingList from "./ShoppingList";
export default function Hero() {
  return (
    <section className="flex flex-col bg-gradient p-8 pt-20 min-h-screen lg:px-0">
      <div className="lg:container flex flex-col items-center justify-around gap-y-4">
        <h2 className="font-bold text-xl">Feira Outra IPB</h2>
        {/* <div className="self-start">
          <p>Local: CroccoVeg </p>
          <p>Dia: 11/01/2024</p>
        </div> */}
        <p className="text-xs lg:w-[80%]">
          Os pesos dos vegetais e frutas podem terminar variando entre uns 350 e
          410 gramas. Aceitamos esta margem de variação praticando o mesmo valor
          final. Ao pesar seus itens aprenda esta OUTRA ECONOMIA!
        </p>
        <ShoppingList />
        <div className="lg:flex flex flex-col justify-center items-center">
          <p className="flex lg:mr-2">Chave PIX - Celular</p>
          <div className="flex items-center">
            <span id="pix-key" aria-label="Chave pix" className="pr-2">
              21997555322
            </span>
            <CopyToClipboardButton />
          </div>
        </div>
      </div>
    </section>
  );
}
