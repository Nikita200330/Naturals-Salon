import { galleryImages } from '../data/gallery';

export async function getGalleryImages() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return galleryImages;
}
