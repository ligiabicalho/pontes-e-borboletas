type PixBrCodeResponse = {
  data: { brcode: string };
  error: string;
};

const transformBrcode = (brcode: string) => {
  let transformedCode = brcode.replace("br.gov.bcb.pix", "BR.GOV.BCB.PIX");
  // para chave pix TELEFONE, substituir o '0114 ' por '0114+'
  transformedCode = transformedCode.replace(/0114\s+/g, "0114+");
  //FIXME
  transformedCode = transformedCode.replace("63045EE9", "6304F69C");
  return transformedCode;
};

export const getPixBrCode = async (value: string) => {
  try {
    const apiUrl = `/api/pix-brcode?value=${value}`;
    const response = await fetch(apiUrl);

    const { data, error }: PixBrCodeResponse = await response.json();

    if (error) throw new Error(error);
    const brcode = transformBrcode(data?.brcode);
    return brcode;
  } catch (error: any) {
    console.error("Erro ao gerar Pix BrCode.", error.message);
    throw new Error("Erro ao gerar Pix BrCode.", error.message);
  }
};
