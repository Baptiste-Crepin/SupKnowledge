import { useParams } from "react-router-dom";
import "./DetailedArtwork.css";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config.json";
import LoaderComponent from "../Shared/Loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArtworkType } from "../Artwork/Artwork";
import { Button } from "react-bootstrap";
import TagsList from "../Shared/TagList/TagList";
import MeasurementList from "../Shared/MeasurementList/MesurementList";
import ConstituentList from "../Shared/ConstituentList/ConstituentList";
import ArtistInformationComponent from "../Shared/ArtistInformations/ArtistInformations";
import {
  displayUnknown,
  displayUnknownBoolean,
  displayUnknownDates,
} from "../../Helpers/DisplayUnknown";
import RecomendedArtworks from "../Shared/RecomendedArtworks/RecomendedArtworks";
import ImageCarousel from "../Shared/imageCarousel/imageCarousel";

function DetailedArtwork() {
  const navigate = useNavigate();
  const artworkId = useParams().id;
  const [artwork, setArtwork] = useState<ArtworkType | null>(null);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/public/collection/v1/objects/${artworkId}`)
      .then((response) => {
        setArtwork(response.data as ArtworkType);
        console.log(response.data);
      })
      .catch(() => {
        toast.error("Error while fetching artwork", {
          toastId: "ErrorFetchingArtwork",
        });
        navigate("/");
      });
  }, [artworkId, navigate]);

  return (
    <div className="DetailedArtwork">
      {artwork === null ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="Details">
            <h2>{artwork.title}</h2>
            <TagsList tags={artwork.tags} />

            <ImageCarousel artwork={artwork} />

            <h3>Artwork Informations:</h3>
            {displayUnknown("Object Name", artwork.objectName, false)}

            {artwork.objectBeginDate !== artwork.objectEndDate
              ? displayUnknownDates(
                  artwork.objectBeginDate,
                  artwork.objectEndDate
                )
              : displayUnknown("Object date", artwork.objectDate, false)}
            {displayUnknown("Medium", artwork.medium, false)}
            {displayUnknown("Culture", artwork.culture, false)}
            {displayUnknown("Period", artwork.period, false)}
            {displayUnknown("Repository", artwork.repository, false)}
            {displayUnknown("Classification", artwork.classification, false)}
            {displayUnknown("Gallery number", artwork.GalleryNumber, false)}
            {displayUnknownBoolean("Public domain", artwork.isPublicDomain)}
            {displayUnknownBoolean("Highlight", artwork.isHighlight)}
            {displayUnknownBoolean("Timeline work", artwork.isTimelineWork)}

            <ArtistInformationComponent artwork={artwork} />
            <ConstituentList constituents={artwork.constituents} />
            <MeasurementList
              dimensions={artwork.dimensions}
              measurements={artwork.measurements}
            />
            <div className="Pair">
              <p>Links:</p>
              <Button variant="primary" href={artwork.objectWikidata_URL}>
                Wikidata
              </Button>
              <Button variant="primary " href={artwork.objectURL}>
                metmuseum
              </Button>
            </div>
            {artwork && artwork.tags && artwork.tags.length > 0 && (
              <RecomendedArtworks tags={artwork.tags} />
            )}
          </div>
          {/* <ImageCarousel artwork={artwork} /> */}
        </>
      )}
    </div>
  );
}

export default DetailedArtwork;
