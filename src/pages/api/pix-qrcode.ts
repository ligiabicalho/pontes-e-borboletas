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
    name: "Lina Raquel de Oliveira Marinho",
    city: "Belo Horizonte",
    output: "br",
    pixKey: "21997555322",
    txid: "Feira Outra",
    mcc: "5811", // DISTRIBUIÇÃO E PRODUÇÃO DE ALIMENTOS
  };

  try {
    const apiUrl = `https://gerarqrcodepix.com.br/api/v1?nome=${name}&cidade=${city}&valor=${value}&saida=${output}&chave=${pixKey}&txid=${txid}&mcc=${mcc}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Erro ao gerar Pix QrCode" });
    }

    const data = await response.json();
    return res.status(200).json({ data });
  } catch (error: any) {
    console.error("Erro ao gerar Pix QrCode:", error);
    return res.status(500).json({ error: "Erro ao gerar Pix QrCode" });
  }
}
