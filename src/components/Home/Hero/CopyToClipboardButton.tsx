import ClipboardJS from "clipboard";
import { Copy, CopyCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const CopyToClipboardButton = ({
  text,
  targetId,
}: {
  text: string;
  targetId: string;
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
      className={`btn-copy flex items-center bg-purple-700 text-yellow-200 p-2 rounded-sm shadow-md hover:bg-purple-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
        ${copied ? "bg-yellow-400 hover:bg-yellow-500 text-purple-800" : ""}`}
    >
      {copied ? <CopyCheck size={16} /> : <Copy size={16} />}
    </button>
  );
};

export default CopyToClipboardButton;
