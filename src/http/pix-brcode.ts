import QRCodePixGeneratorService from "@/service/qRCodePixGenerator";

export const getPixBrCode = async (value: number) => {
  try {
    const qRCodePixGenerator = new QRCodePixGeneratorService("01");
    const payload = {
      name: "Lina Raquel de Oliveira",
      key: "+5521997555322",
      city: "Belo Horizonte",
      // transactionId?: string;
      message: "Pagamento Feira Outra via App Pontes e Borboletas",
    };
    const { data, error } = await qRCodePixGenerator.generate({
      ...payload,
      value,
    });
    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    console.error("Erro ao gerar Pix QrCode.", error.message);
    throw new Error("Erro ao gerar Pix QrCode.", error.message);
  }
};
