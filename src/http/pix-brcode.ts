import contacts from "../db/contacts.json";
import qrCodePixGenerator from "@/services/qrCodePixGenerator/pixGeneratorSingleton";

export const getPixBrCode = async (value: number) => {
  const { creator, pix } = contacts;
  try {
    const payload = {
      name: creator,
      key: pix.key,
      city: pix.city,
      message: pix.message,
      // transactionId?: string;
    };
    const { data, error } = await qrCodePixGenerator.generate({
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
