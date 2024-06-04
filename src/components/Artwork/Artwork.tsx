import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { MdImageNotSupported } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config.json";
import { ConstituentType } from "../Shared/ConstituentList/ConstituentList";
import LoaderComponent from "../Shared/Loader/Loader";
import { MeasurementType } from "../Shared/MeasurementList/MesurementList";
import TagsList, { TagType } from "../Shared/TagList/TagList";
import "./Artwork.css";

export type ArtworkType = {
  objectID: number;
  isHighlight: boolean;
  accessionNumber: number;
  accessionYear: number;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  constituents: ConstituentType[];
  department: string;
  objectName: string;
  title: string;
  culture: string;
  period: string;
  dynasty: string;
  reign: string;
  portfolio: string;
  artistRole: string;
  artistPrefix: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  artistSuffix: string;
  artistAlphaSort: string;
  artistNationality: string;
  artistBeginDate: number;
  artistEndDate: number;
  artistGender: string;
  artistWikidata_URL: string;
  artistULAN_URL: string;
  objectDate: number;
  objectBeginDate: number;
  objectEndDate: number;
  medium: string;
  dimensions: string;
  measurements: MeasurementType[];
  creditLine: string;
  geographyType: string;
  city: string;
  state: string;
  county: string;
  country: string;
  region: string;
  subregion: string;
  locale: string;
  locus: string;
  excavation: string;
  river: string;
  classification: string;
  rightsAndReproduction: string;
  linkResource: string;
  metadataDate: string;
  repository: string;
  objectURL: string;
  tags: TagType[];
  objectWikidata_URL: string;
  isTimelineWork: boolean;
  GalleryNumber: string;
};

type ArtworkProps = {
  id: number;
  size?: "xs" | "sm" | "md" | "lg";
  handleImagelessArtwork?: (artwork: ArtworkType) => void;
};

function Artwork({ id, size, handleImagelessArtwork }: ArtworkProps) {
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
          toast.error("Error while fetching highlighted artworks", {
            toastId: "ErrorFetchingArtwork",
          });
          setTimeout(() => {
            fetchArtwork(id, false);
          }, 5000);
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
        className={`Artwork`}
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
            <Card.Body>
              <Card.Title>
                {artwork.title ||
                  `${artwork.objectName} - ${artwork.artistDisplayName}`}
              </Card.Title>
              <Card.Text>
                {artwork.artistDisplayName} {artwork.artistBeginDate} - //{" "}
                {artwork.artistEndDate}
              </Card.Text>
              <Card.Text>
                {artwork.medium}- {artwork.objectDate}
              </Card.Text>
              <TagsList tags={artwork.tags} />
            </Card.Body>
            {artwork.primaryImageSmall || artwork.primaryImage ? (
              <Card.Img
                className="Artwork-image"
                variant="bottom"
                loading="lazy"
                src={artwork.primaryImageSmall || artwork.primaryImage}
              />
            ) : (
              <Card.Img
                className="Artwork-image"
                variant="bottom"
                as={MdImageNotSupported}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
}

export default Artwork;
