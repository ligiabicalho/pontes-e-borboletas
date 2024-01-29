import { QrCodePix, QrCodePixParams } from "qrcode-pix";
import {
  IQRCodePixGeneratorParams,
  IQRCodePixGeneratorResponse,
  IQRCodePixGeneratorService,
} from "./IQRCodePixGeneratorService";

export default class QRCodePixGeneratorService
  implements IQRCodePixGeneratorService
{
  constructor(private version: string) {}

  async generate(
    params: IQRCodePixGeneratorParams,
  ): Promise<IQRCodePixGeneratorResponse> {
    const version = this.version;
    const parameter: QrCodePixParams = { ...params, version };
    try {
      const qrCodePix = QrCodePix(parameter);
      const qrCodeImage = await qrCodePix.base64();
      const brCode = qrCodePix.payload();

      return { data: { brCode, qrCodeImage } };
    } catch (error) {
      return { error: new Error(`${error}`) };
    }
  }
}
