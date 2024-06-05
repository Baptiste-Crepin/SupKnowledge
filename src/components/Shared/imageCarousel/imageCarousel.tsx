import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import {
  MdChevronLeft,
  MdChevronRight,
  MdImageNotSupported,
} from "react-icons/md";
import { ArtworkType } from "../../Artwork/Artwork";
import "./ImageCarousel.css";

function ImageCarousel({ artwork }: { artwork: ArtworkType }) {
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-carousel">
      {imageList.length < 1 ||
      (!artwork.primaryImage && !artwork.primaryImageSmall) ? (
        <MdImageNotSupported />
      ) : (
        <Container>
          <Row>
            {imageList.length > 1 && (
              <Col xs={12} md={1} lg={2} className="button-container left">
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  className="carousel-control left">
                  <MdChevronLeft />
                </Button>
              </Col>
            )}
            <Col xs={12} md={10} lg={8} className="primary-image-container">
              <Image
                className="primary-image"
                src={imageList[selectedImageIndex]}
                alt={artwork.title}
                loading="lazy"
                onClick={handleNext}
              />
            </Col>
            {imageList.length > 1 && (
              <Col xs={12} md={1} lg={2} className="button-container right">
                <Button
                  variant="secondary"
                  onClick={handleNext}
                  className="carousel-control right">
                  <MdChevronRight />
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ImageCarousel;
