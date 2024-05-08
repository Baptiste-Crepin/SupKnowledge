import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchResultArtwork.css";
import { toast } from "react-toastify";
import { MdImageNotSupported } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import LoaderComponent from "../../../../Loader/Loader";
import config from "../../../../../../../config.json";
import { ArtworkType } from "../../../../../Artwork/Artwork";

type ArtworkProps = {
  id: number;
  handleImagelessArtwork?: (artwork: ArtworkType) => void;
};

function SearchResultArtwork({ id, handleImagelessArtwork }: ArtworkProps) {
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<ArtworkType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchArtwork = (id: number, firstIteration: boolean = true) => {
    axios
      .get(`${config.API_URL}/public/collection/v1/objects/${id}`)
      .then((response) => {
        setArtwork(response.data as ArtworkType);
        if (
          handleImagelessArtwork !== undefined &&
          response.data.primaryImage === ""
        ) {
          console.log(response.data);
          handleImagelessArtwork(response.data as ArtworkType);
        }
      })
      .catch(() => {
        if (firstIteration) {
          toast.error("Error while fetching highlighted artworks", {
            toastId: "ErrorFetchingArtwork",
          });
          setTimeout(() => {
            fetchArtwork(id, false);
          }, 10000);
        } else {
          setErrorMessage("Could not load the artwork.");
        }
      });
  };

  useEffect(() => {
    fetchArtwork(id);
  }, [id]);

  return (
    <>
      <Card
        className="SearchResultArtwork"
        onClick={() => {
          navigate(`/artwork/${id}`);
        }}>
        {artwork === null ? (
          <Card.Body>
            {errorMessage ? (
              <h5 className="error">{errorMessage}</h5>
            ) : (
              <LoaderComponent />
            )}
          </Card.Body>
        ) : (
          <>
            {artwork.primaryImageSmall || artwork.primaryImage ? (
              <Card.Img
                className="Artwork-image"
                variant="top"
                loading="lazy"
                src={artwork.primaryImageSmall || artwork.primaryImage}
              />
            ) : (
              <Card.Img
                className="Artwork-image"
                variant="top"
                as={MdImageNotSupported}
              />
            )}
            <Card.Body>
              <Card.Title>
                {artwork.title ||
                  `${artwork.objectName} - ${artwork.artistDisplayName}`}
              </Card.Title>
              <Card.Text>{artwork.artistDisplayName}</Card.Text>
              <Card.Text>
                {artwork.medium} - {artwork.objectDate}
              </Card.Text>
              {artwork.tags && artwork.tags.length > 0 && (
                <Card.Text className="Artwork-tags">
                  {artwork.tags.map((tag) => (
                    <Badge key={tag.term} bg="primary" className="Artwork-tag">
                      {tag.term}
                    </Badge>
                  ))}
                </Card.Text>
              )}
            </Card.Body>
          </>
        )}
      </Card>
    </>
  );
}

export default SearchResultArtwork;
