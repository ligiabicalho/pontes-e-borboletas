type PixBrCodeResponse = {
  data: { brcode: string };
  error: string;
};

export const getPixBrCode = async (value: string) => {
  try {
    const apiUrl = `/api/pix-brcode?value=${value}`;
    const response = await fetch(apiUrl);

    const { data, error }: PixBrCodeResponse = await response.json();

    if (error) throw new Error(error);

    return data?.brcode;
  } catch (error: any) {
    console.error("Erro ao gerar Pix BrCode.", error.message);
    throw new Error("Erro ao gerar Pix BrCode.", error.message);
  }
};
