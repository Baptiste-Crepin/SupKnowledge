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
  displayUnknownTimestamp,
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
      })
      .catch(() => {
        toast.error("Error while fetching artwork", {
          toastId: "ErrorFetchingArtwork",
        });
        navigate("/");
      });
  }, [artworkId, navigate]);

  return (
    <div className="detailed-artwork">
      {artwork === null ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="details-container">
            <h2 className="title">{artwork.title}</h2>
            <TagsList tags={artwork.tags} />
            <ImageCarousel artwork={artwork} />
            <div className="main-informations">
              <div className="informations-list">
                <h3>Artwork Informations:</h3>
                {displayUnknown("Object Name", artwork.objectName)}
                {artwork.objectBeginDate !== artwork.objectEndDate
                  ? displayUnknownDates(
                      artwork.objectBeginDate,
                      artwork.objectEndDate
                    )
                  : displayUnknown("Object date", artwork.objectDate)}
                {displayUnknown("Medium", artwork.medium)}
                {displayUnknown("Portfolio", artwork.portfolio)}
                {displayUnknown("Reign", artwork.reign)}
                {displayUnknown("Dynasty", artwork.dynasty)}
                {displayUnknown("State", artwork.state)}
                {displayUnknown("Country", artwork.country)}
                {displayUnknown("Region", artwork.region)}
                {displayUnknown("SubRegion", artwork.subregion)}
                {displayUnknown("City", artwork.city)}
                {displayUnknown("Local", artwork.locale)}
                {displayUnknown("Locus", artwork.locus)}
                {displayUnknown("Excavation", artwork.excavation)}
                {displayUnknown("Period", artwork.period)}
                {displayUnknown("Department", artwork.department)}
                {displayUnknown("Repository", artwork.repository)}
                {displayUnknown(
                  "Classification",
                  artwork.classification,
                  false
                )}
                {displayUnknown("Credit", artwork.creditLine)}
                {displayUnknown("Gallery number", artwork.GalleryNumber)}
                {displayUnknownBoolean("Public domain", artwork.isPublicDomain)}
                {displayUnknownBoolean("Highlight", artwork.isHighlight)}
                {displayUnknownBoolean("Timeline work", artwork.isTimelineWork)}
                {displayUnknown("Aquired in", artwork.accessionYear)}
                {displayUnknown("accessionNumber", artwork.accessionNumber)}
                {displayUnknownTimestamp("Uploaded", artwork.metadataDate)}

                <div className="Pair">
                  <p>Links:</p>
                  <Button variant="primary" href={artwork.objectWikidata_URL}>
                    Wikidata
                  </Button>
                  <Button variant="primary " href={artwork.objectURL}>
                    metmuseum
                  </Button>
                </div>
              </div>

              <ArtistInformationComponent artwork={artwork} />
            </div>
            <ConstituentList constituents={artwork.constituents} />
            <MeasurementList measurements={artwork.measurements} />
            {artwork && artwork.tags && artwork.tags.length > 0 && (
              <RecomendedArtworks
                currentId={artwork.objectID}
                tags={artwork.tags}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DetailedArtwork;
