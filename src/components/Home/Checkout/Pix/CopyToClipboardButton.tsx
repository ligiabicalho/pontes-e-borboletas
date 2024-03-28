import ClipboardJS from "clipboard";
import { Copy, CopyCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

type CopyToClipboardButtonProps = {
  text: string;
  targetId: string;
};

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  text,
  targetId,
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyClick = () => {
    const clipboard = new ClipboardJS(".btn-copy", {
      text: (trigger) => trigger.getAttribute("data-clipboard-text") as string,
    });

    clipboard.on("success", (e: any) => {
      setCopied(true);
      toast({
        variant: "warning",
        title: "Código QrCode copiado.",
        description:
          "Cole o código no app do seu banco para efetuar o pagamento via PIX.",
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      e.clearSelection();
      clipboard.destroy();
    });

    clipboard.on("error", () => {
      console.error("Erro ao copiar o texto para a área de transferência");
      toast({
        variant: "destructive",
        title: "Erro ao copiar.",
        description:
          "O texto não foi copiado para a área de transferência, tente novamente.",
      });
      clipboard.destroy();
    });
  };

  return (
    <button
      data-clipboard-target={targetId}
      data-clipboard-text={text}
      aria-label="Copy to clipboard"
      onClick={handleCopyClick}
      className={`btn-copy flex items-center p-2 rounded-sm shadow-md focus:ring-2 focus:ring-offset-2
        ${
          copied
            ? "text-purple-600 focus:ring-purple-600 bg-yellow-400 hover:bg-yellow-500"
            : "text-yellow-300 focus:ring-yellow-400 bg-purple-700 hover:bg-purple-600"
        }`}
    >
      {copied ? <CopyCheck size={18} /> : <Copy size={18} />}
    </button>
  );
};

export default CopyToClipboardButton;
