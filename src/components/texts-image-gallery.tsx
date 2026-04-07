/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — react-image-gallery (scoped to this chunk, not global CSS)
 *   MARKUP — full-page gallery
 *   SCRIPT — props forwarded to react-image-gallery
 */
import "react-image-gallery/styles/image-gallery.css";
import ImageGallery, { type GalleryItem } from "react-image-gallery";

export type { GalleryItem };

type Props = {
  items: GalleryItem[];
  startIndex: number;
  onSlide: (currentIndex: number) => void;
  onClick: () => void;
};

export function TextsImageGallery({ items, startIndex, onSlide, onClick }: Props) {
  return (
    <ImageGallery
      additionalClass="fullpage"
      items={items}
      lazyLoad={true}
      useTranslate3D={false}
      showBullets={false}
      startIndex={startIndex}
      onSlide={onSlide}
      onClick={onClick}
    />
  );
}
