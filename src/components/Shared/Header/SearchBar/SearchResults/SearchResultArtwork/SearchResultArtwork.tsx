import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { MdImageNotSupported } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../../../../../config.json";
import { ArtworkType } from "../../../../../Artwork/Artwork";
import LoaderComponent from "../../../../Loader/Loader";
import TagsList from "../../../../TagList/TagList";
import "./SearchResultArtwork.css";

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
          handleImagelessArtwork(response.data as ArtworkType);
        }
      })
      .catch(() => {
        if (firstIteration) {
          toast.error("Error fetching artworks", {
            toastId: "ErrorFetchingArtwork",
          });
          setTimeout(() => {
            fetchArtwork(id, false);
          }, 2000);
        } else {
          setErrorMessage("Could not load the artwork.");
        }
      });
  };

  useEffect(() => {
    fetchArtwork(id);
  }, [id]);

  return (
    <Card
      className="search-result-artwork"
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
              className="artwork-image"
              variant="top"
              loading="lazy"
              src={artwork.primaryImageSmall || artwork.primaryImage}
            />
          ) : (
            <Card.Img
              className="artwork-image"
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
            <TagsList tags={artwork.tags} card />
          </Card.Body>
        </>
      )}
    </Card>
  );
}

export default SearchResultArtwork;
