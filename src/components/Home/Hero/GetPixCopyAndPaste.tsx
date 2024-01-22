import CopyToClipboardButton from "./CopyToClipboardButton";
import { getPixBrCode } from "../../../http/pix-brcode";
import { Button } from "../../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

const GetPixCopyAndPaste = ({ value }: { value: string }) => {
  const { toast } = useToast();
  const targetId = "pix-brcode-copy-and-paste";

  const {
    data: pixBrCode,
    isLoading,
    isSuccess,
    mutate: getPixBrCodeMutate,
  } = useMutation({
    mutationFn: getPixBrCode,
    onSuccess: (data) => {
      console.log("code", data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao gerar QrCode Pix copia e cola.",
        description: "Tente novamente ou entre em contato com o suporte.",
      });
      console.error("Erro ao gerar QrCode Pix copia e cola.", error);
    },
  });

  const handleClickGetPixQrCode = () => {
    if (value === "0") {
      toast({
        variant: "destructive",
        title: "Nenhum produto selecionado.",
        description:
          "Não é possível gerar Pix QRCode sem valor: selecione seus produtos e a contribuição desejada.",
      });
    } else {
      getPixBrCodeMutate(value);
    }
  };

  return (
    <div className="lg:flex flex flex-col justify-center items-center">
      <p className="flex lg:mr-2">
        Pague sua compra via Pix: gere o código, em seguida o copie e cole no
        app do seu banco.
      </p>
      <Button
        aria-label="Gerar QrCode copia e cola"
        className="m-2"
        onClick={handleClickGetPixQrCode}
        disabled={isLoading}
      >
        Gerar QrCode copia e cola
      </Button>
      {isSuccess && pixBrCode && (
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row bg-background p-2 rounded-md text-xs">
            <p className="flex overflow-hidden">
              <span
                id={targetId}
                aria-label="Pix QrCode copia e cola"
                className="w-[260px] lg:w-[360px] max-h-[18px]"
              >
                {pixBrCode}
              </span>
            </p>
            <p>...</p>
          </div>
          <CopyToClipboardButton text={pixBrCode} targetId={`#${targetId}`} />
        </div>
      )}
    </div>
  );
};

export default GetPixCopyAndPaste;
