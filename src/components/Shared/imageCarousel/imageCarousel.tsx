import { Carousel, Image } from "react-bootstrap";
import { MdImageNotSupported } from "react-icons/md";
import { ArtworkType } from "../../Artwork/Artwork";
import "./ImageCarousel.css";

function ImageCarousel({ artwork }: { artwork: ArtworkType }) {
  return (
    <div className="image-carousel">
      {artwork.primaryImageSmall || artwork.primaryImage ? (
        <Image
          className="primary-image"
          src={artwork.primaryImageSmall || artwork.primaryImage}
          alt={artwork.title}
          loading="lazy"
        />
      ) : (
        <MdImageNotSupported />
      )}
      {artwork.additionalImages.length <= 1 ? null : (
        <div className="additional-images">
          {artwork.additionalImages.map((additionalImage) => (
            <Image
              key={additionalImage}
              className="additional-image"
              src={additionalImage}
              alt="Artwork additional"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
