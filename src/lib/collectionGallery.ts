import fs from 'fs';
import path from 'path';

export type GalleryImage = {
  src: string;
  label: string;
};

const labelFromFile = (file: string) =>
  file.replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim();

/** Public image URL with mtime query so edits bust browser / next/image cache. */
export function versionedImageUrl(...parts: string[]): string {
  const relative = parts.join('/');
  const diskPath = path.join(process.cwd(), 'public', 'assets', 'images', ...parts);
  let version = 0;
  try {
    version = Math.floor(fs.statSync(diskPath).mtimeMs);
  } catch {
    version = 0;
  }
  return `${encodeURI(`/assets/images/${relative}`)}?v=${version}`;
}

export function toGalleryImages(folderPath: string, files: string[]): GalleryImage[] {
  return files.map((file) => ({
    src: versionedImageUrl(...folderPath.split('/'), file),
    label: labelFromFile(file),
  }));
}
