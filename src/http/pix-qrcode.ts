type PixQrCodeResponse = {
  data: { brcode: string };
  error: string;
};

export const getPixQrCode = async (value: string) => {
  try {
    const apiUrl = `/api/pix-qrcode?value=${value}`;
    const response = await fetch(apiUrl);

    const { data, error }: PixQrCodeResponse = await response.json();

    if (error) throw new Error(error);

    return data?.brcode;
  } catch (error: any) {
    console.error("Erro ao gerar Pix QrCode.", error.message);
    throw new Error("Erro ao gerar Pix QrCode.", error.message);
  }
};
