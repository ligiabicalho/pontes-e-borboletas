import { getFormattedDate } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

type IPixQrCodeParams = {
  name: string;
  city: string;
  key: string;
  value?: string;
  transactionId?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { value } = req.body;

  const bodyParams = {
    name: "Lina R. Oliveira Marinho",
    city: "Belo Horizonte",
    key: "+5521997555322",
    value,
    transactionId: getFormattedDate(), 
    message: "Via App Feira Outra",
  };

  try {
    const apiUrl = `https://qrcode-pix-generator-api-0053c6fb6132.herokuapp.com/generate`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParams)
    });
    if (response.statusText !== ("OK")) {
      return res.status(500).json({ error: `Erro ao gerar Pix BrCode, server error` });
    }
    const data = await response.json();
    console.log('response',data)
    return res.status(200).json({ data });
  } catch (error: any) {
    console.error("Erro ao gerar Pix QrCode:", error);
    return res.status(500).json({ error: "Erro ao gerar Pix QrCode" });
  }
}