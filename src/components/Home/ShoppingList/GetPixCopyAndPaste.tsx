import CopyToClipboardButton from "./CopyToClipboardButton";
import { getPixBrCode } from "../../../http/pix-brcode";
import { Button } from "../../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Copy } from "lucide-react";

const GetPixCopyAndPaste = ({ value }: { value: number }) => {
  const { toast } = useToast();
  const targetId = "pix-brcode-copy-and-paste";

  const {
    data,
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
    if (!value || value === 0) {
      toast({
        variant: "destructive",
        title: "Nenhum produto selecionado.",
        description: "Não é possível gerar o código Pix sem valor",
      });
    } else {
      getPixBrCodeMutate(value);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 pt-4">
      <p className="lg:mr-2 text-sm text-justify">
        Pague sua compra via{" "}
        <span className="text-sm font-semibold">Pix Copia e Cola</span>:
        <br /> 1. gere o código
        <br /> 2. o copie <Copy size={14} className="inline mx-1" />
        <br /> 3. cole no App do seu banco.
      </p>
      <Button
        aria-label="Gerar QrCode copia e cola"
        className="bg-purple-700 text-yellow-300 p-4 rounded-sm shadow-md shadow-purple-400 hover:bg-purple-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        onClick={handleClickGetPixQrCode}
        disabled={isLoading || !value}
      >
        Gerar QrCode copia e cola
      </Button>
      {isSuccess && (
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row bg-background p-2 rounded-md text-xs">
            <p className="flex overflow-x-scroll lg:overflow-hidden">
              <span
                id={targetId}
                aria-label="Pix QrCode copia e cola"
                className="w-[220px] lg:w-[300px] max-h-[18px] select-all touch-pan-x"
              >
                {data?.brCode}
              </span>
            </p>
            <p>...</p>
          </div>
          <CopyToClipboardButton
            text={data?.brCode as string}
            targetId={`#${targetId}`}
          />
        </div>
      )}
      <p className="text-sm italic text-justify">
        Não é necessário nos enviar comprovante. Construímos com as bases da
        confiança mútua!
      </p>
    </div>
  );
};

export default GetPixCopyAndPaste;
