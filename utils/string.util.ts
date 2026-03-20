export function encodeBase64(password: string): string {
    return Buffer.from(encodeURIComponent(password).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    ), 'binary').toString('base64');
  }
