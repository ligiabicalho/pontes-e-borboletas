import { QrCodePixParams } from "qrcode-pix";

export interface IResponse {
  payload: () => string; //payload for QrCode
  base64: (options?) => Promise<string>; //QrCode image base64
}

type ParamsOmit = 'version' | 'cep' | 'currency' | 'countryCode';
export type IQRCodePixGeneratorParams = Omit<QrCodePixParams, ParamsOmit>
//transactionId: max 25 characters without whitespace

export interface IQRCodePixGeneratorResponse {
  data?: {
    qrCodeImage: string;
    brCode: string;
  }
  error?: Error;
}

export interface IQRCodePixGeneratorService {
  generate(params: IQRCodePixGeneratorParams): Promise<IQRCodePixGeneratorResponse>;
}