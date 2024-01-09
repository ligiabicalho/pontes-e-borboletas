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
        <ShoppingList />
        <div className="lg:flex">
          <p className="lg:mr-2">Chave PIX - CNPJ:</p>
          <div className="flex items-center gap-2">
            <span id="pix-key" aria-label="Chave pix">
              000000000000
            </span>
            <CopyToClipboardButton />
          </div>
        </div>
      </div>
    </section>
  );
}
