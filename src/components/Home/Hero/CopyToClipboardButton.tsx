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
    const clipboard = new ClipboardJS(".btn", {
      text: (trigger) => trigger.getAttribute("data-clipboard-text") as string,
    });

    clipboard.on("success", (e: any) => {
      toast({
        variant: "success",
        title: "Sucesso!",
        description:
          "QrCode copiado para a área de transferência. Cole o código no app do seu banco para efetuar o pagamento via PIX.",
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
      className="btn flex items-center bg-purple-600 text-yellow-200 p-1 rounded shadow hover:bg-purple-700 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
    >
      <Copy size={14} />
    </button>
  );
};

export default CopyToClipboardButton;
