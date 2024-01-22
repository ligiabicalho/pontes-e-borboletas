import ClipboardJS from "clipboard";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CopyToClipboardButton = ({
  text,
  targetId,
}: {
  text: string;
  targetId: string;
}) => {
  const { toast } = useToast();

  const handleCopyClick = () => {
    const clipboard = new ClipboardJS(".btn-copy", {
      text: (trigger) => trigger.getAttribute("data-clipboard-text") as string,
    });

    clipboard.on("success", (e: any) => {
      toast({
        variant: "alert",
        title: "Código QrCode copiado.",
        description:
          "Cole o código no app do seu banco para efetuar o pagamento via PIX.",
      });
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
      className="btn-copy flex items-center bg-purple-700 text-yellow-200 p-2 rounded-sm shadow-md hover:bg-purple-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
    >
      <Copy size={16} />
    </button>
  );
};

export default CopyToClipboardButton;
