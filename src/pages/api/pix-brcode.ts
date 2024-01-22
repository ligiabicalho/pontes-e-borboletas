// pages/api/pix-qrcode.ts
import { NextApiRequest, NextApiResponse } from "next";

type PixQrCodeQueries = {
  name: string;
  city: string;
  output: string;
  pixKey: string;
  txid?: string;
  mcc?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { value } = req.query;

  const { name, city, output, pixKey, txid, mcc }: PixQrCodeQueries = {
    name: "Lina Raquel de Oliveira M",
    city: "Belo Horizonte",
    output: "br", // gera br code
    pixKey: "+5521997555322",
    txid: "FeiraOutra", // não pode ter espaços
    // mcc: "7372",
  };

  try {
    const apiUrl = `https://gerarqrcodepix.com.br/api/v1?nome=${name}&cidade=${city}&chave=${pixKey}&valor=${value}&saida=${output}&txid=${txid}&mcc=${mcc}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Erro ao gerar Pix BrCode" });
    }

    const data = await response.json();
    return res.status(200).json({ data });
  } catch (error: any) {
    console.error("Erro ao gerar Pix BrCode:", error);
    return res.status(500).json({ error: "Erro ao gerar Pix BrCode" });
  }
}
