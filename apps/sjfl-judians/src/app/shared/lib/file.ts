import { Buffer } from 'buffer';

export async function webPathToFile(
  webPath: string,
  filename?: string
): Promise<File> {
  const blob = await fetch(webPath).then((r) => r.blob());
  return new File([blob], filename || 'image.jpg');
}

export function base64toFile(
  base64String: string,
  fileName: string,
  mime?: string
) {
  const buffer = Buffer.from(base64String, 'base64');
  const file = new File([buffer], fileName, {
    type: mime ?? 'application/octet-stream',
  });
  return file;
}
