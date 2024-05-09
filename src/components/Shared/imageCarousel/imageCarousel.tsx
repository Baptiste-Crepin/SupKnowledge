import { Image } from "react-bootstrap";
import { MdImageNotSupported } from "react-icons/md";
import { ArtworkType } from "../../Artwork/Artwork";
import "./ImageCarousel.css";
import { useEffect, useState } from "react";

function ImageCarousel({ artwork }: { artwork: ArtworkType }) {
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const timeBeforeSwap = 5000;

  useEffect(() => {
    if (
      artwork.primaryImage.length > 0 ||
      artwork.primaryImageSmall.length > 0
    ) {
      setImageList([
        artwork.primaryImage || artwork.primaryImageSmall,
        ...artwork.additionalImages,
      ]);
    }
  }, [artwork]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImageIndex(
        selectedImageIndex === imageList.length - 1 ? 0 : selectedImageIndex + 1
      );
    }, timeBeforeSwap);
    return () => clearInterval(interval);
  }, [selectedImageIndex, imageList]);

  useEffect(() => {
    // add border to the selected image
    const additionalImages = document.querySelectorAll(".additional-image");
    additionalImages.forEach((image, index) => {
      if (index === selectedImageIndex) {
        image.classList.add("selected");
      } else {
        image.classList.remove("selected");
      }
    });
  }, [selectedImageIndex]);

  return (
    <>
      {imageList.length === 0 ? null : (
        <div className="image-carousel">
          {imageList.length >= 1 ? (
            <Image
              className="primary-image"
              src={imageList[selectedImageIndex]}
              alt={artwork.title}
              loading="lazy"
            />
          ) : (
            <MdImageNotSupported />
          )}
          {imageList.length <= 1 ? null : (
            <div className="additional-images">
              {imageList.map((additionalImage, index) => (
                <Image
                  key={additionalImage}
                  className="additional-image"
                  src={additionalImage}
                  alt="Artwork additional"
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ImageCarousel;
