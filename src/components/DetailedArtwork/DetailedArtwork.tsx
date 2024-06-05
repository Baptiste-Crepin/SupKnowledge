import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config.json";
import {
  displayUnknown,
  displayUnknownDates,
} from "../../Helpers/DisplayUnknown";
import { ArtworkType } from "../Artwork/Artwork";
import ArtistInformationComponent from "../Shared/ArtistInformations/ArtistInformations";
import ConstituentList from "../Shared/ConstituentList/ConstituentList";
import LoaderComponent from "../Shared/Loader/Loader";
import MeasurementList from "../Shared/MeasurementList/MesurementList";
import RecomendedArtworks from "../Shared/RecomendedArtworks/RecomendedArtworks";
import TagsList from "../Shared/TagList/TagList";
import ImageCarousel from "../Shared/imageCarousel/imageCarousel";
import "./DetailedArtwork.css";

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
        toast.error("Error fetching artwork", {
          toastId: "ErrorFetchingArtwork",
        });
        navigate("/");
      });
  }, [artworkId, navigate]);

  return (
    <Container fluid className="detailed-artwork">
      {artwork === null ? (
        <Row>
          <Col>
            <LoaderComponent />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col>
              <h2 className="title">{artwork.title}</h2>
            </Col>
          </Row>
          <Row>
            <TagsList tags={artwork.tags} />
          </Row>
          <Row>
            <Col className="details-container">
              {artwork.primaryImage && artwork.primaryImageSmall && (
                <ImageCarousel artwork={artwork} />
              )}
            </Col>
          </Row>
          <Row className="main-informations">
            <Col
              xs={12}
              md={4}
              className="informations-list d-flex justify-content-center">
              <div className="w-100">
                <h3>Artwork Informations:</h3>
                {displayUnknown("Object Name", artwork.objectName)}
                {artwork.objectBeginDate !== artwork.objectEndDate
                  ? displayUnknownDates(
                      artwork.objectBeginDate,
                      artwork.objectEndDate
                    )
                  : displayUnknown("Object date", artwork.objectDate)}
              </div>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-center">
              <div className="w-100">
                <ArtistInformationComponent artwork={artwork} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="Pair">
                <p>Links:</p>
                <Button variant="primary" href={artwork.objectWikidata_URL}>
                  Wikidata
                </Button>
                <Button variant="primary" href={artwork.objectURL}>
                  Metmuseum
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <MeasurementList measurements={artwork.measurements} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ConstituentList constituents={artwork.constituents} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {artwork && artwork.tags && artwork.tags.length > 0 && (
                <RecomendedArtworks
                  currentId={artwork.objectID}
                  tags={artwork.tags}
                />
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );

  // return (
  //   <div className="detailed-artwork">
  //     {artwork === null ? (
  //       <LoaderComponent />
  //     ) : (
  //       <>
  //         <div className="details-container">
  //           <h2 className="title">{artwork.title}</h2>
  //           <TagsList tags={artwork.tags} />
  //           <ImageCarousel artwork={artwork} />
  //           <div className="main-informations">
  //             <div className="informations-list">
  //               <h3>Artwork Informations:</h3>
  //               {displayUnknown("Object Name", artwork.objectName)}
  //               {artwork.objectBeginDate !== artwork.objectEndDate
  //                 ? displayUnknownDates(
  //                     artwork.objectBeginDate,
  //                     artwork.objectEndDate
  //                   )
  //                 : displayUnknown("Object date", artwork.objectDate)}
  //               {displayUnknown("Medium", artwork.medium)}
  //               {displayUnknown("Portfolio", artwork.portfolio)}
  //               {displayUnknown("Reign", artwork.reign)}
  //               {displayUnknown("Dynasty", artwork.dynasty)}
  //               {displayUnknown("State", artwork.state)}
  //               {displayUnknown("Country", artwork.country)}
  //               {displayUnknown("Region", artwork.region)}
  //               {displayUnknown("SubRegion", artwork.subregion)}
  //               {displayUnknown("City", artwork.city)}
  //               {displayUnknown("Local", artwork.locale)}
  //               {displayUnknown("Locus", artwork.locus)}
  //               {displayUnknown("Excavation", artwork.excavation)}
  //               {displayUnknown("Period", artwork.period)}
  //               {displayUnknown("Department", artwork.department)}
  //               {displayUnknown("Repository", artwork.repository)}
  //               {displayUnknown(
  //                 "Classification",
  //                 artwork.classification,
  //                 false
  //               )}
  //               {displayUnknown("Credit", artwork.creditLine)}
  //               {displayUnknown("Gallery number", artwork.GalleryNumber)}
  //               {displayUnknownBoolean("Public domain", artwork.isPublicDomain)}
  //               {displayUnknownBoolean("Highlight", artwork.isHighlight)}
  //               {displayUnknownBoolean("Timeline work", artwork.isTimelineWork)}
  //               {displayUnknown("Aquired in", artwork.accessionYear)}
  //               {displayUnknown("accessionNumber", artwork.accessionNumber)}
  //               {displayUnknownTimestamp("Uploaded", artwork.metadataDate)}

  //               <div className="Pair">
  //                 <p>Links:</p>
  //                 <Button variant="primary" href={artwork.objectWikidata_URL}>
  //                   Wikidata
  //                 </Button>
  //                 <Button variant="primary " href={artwork.objectURL}>
  //                   metmuseum
  //                 </Button>
  //               </div>
  //             </div>

  //             <ArtistInformationComponent artwork={artwork} />
  //           </div>
  //           <ConstituentList constituents={artwork.constituents} />
  //           <MeasurementList measurements={artwork.measurements} />
  //           {artwork && artwork.tags && artwork.tags.length > 0 && (
  //             <RecomendedArtworks
  //               currentId={artwork.objectID}
  //               tags={artwork.tags}
  //             />
  //           )}
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
}

export default DetailedArtwork;
