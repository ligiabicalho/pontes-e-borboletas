import ClipboardJS from "clipboard";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CopyToClipboardButton = () => {
  const { toast } = useToast();

  const handleCopyClick = () => {
    const clipboard = new ClipboardJS(".btn");

    clipboard.on("success", (e: any) => {
      console.log("Texto copiado para a área de transferência", e.text);
      toast({
        variant: "success",
        title: "Sucesso!",
        description: "Chave PIX copiada para a área de transferência",
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
      data-clipboard-target="#pix-key"
      aria-label="Copy to clipboard"
      onClick={handleCopyClick}
      className="btn flex items-center space-x-2 bg-purple-600 text-yellow-200 p-1 rounded"
    >
      <Copy size={14} />
    </button>
  );
};

export default CopyToClipboardButton;
