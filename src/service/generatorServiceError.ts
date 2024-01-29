export default class GeneratorServiceError extends Error {
  public statusCode: number;

  constructor(message?: any) {
    super(`${message}`);
    this.name = `QRCode Pix Generator Service Error`;
    this.statusCode = 400;
  }
}