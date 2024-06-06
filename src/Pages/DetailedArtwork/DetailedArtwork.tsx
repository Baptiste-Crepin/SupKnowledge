import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config.json";
import {
  displayUnknown,
  displayUnknownBoolean,
  displayUnknownDates,
} from "../../Helpers/DisplayUnknown";
import ArtistInformationComponent from "../../Shared/ArtistInformations/ArtistInformations";
import { ArtworkType } from "../../Shared/Artwork/Artwork";
import ConstituentList from "../../Shared/ConstituentList/ConstituentList";
import ImageCarousel from "../../Shared/ImageCarousel/imageCarousel";
import LoaderComponent from "../../Shared/Loader/Loader";
import MeasurementList from "../../Shared/MeasurementList/MesurementList";
import RecomendedArtworks from "../../Shared/RecomendedArtworks/RecomendedArtworks";
import TagsList from "../../Shared/TagList/TagList";
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
                {displayUnknown("Medium", artwork.medium)}
                {displayUnknown("Culture", artwork.culture)}
                {displayUnknown("Period", artwork.period)}
                {displayUnknown("Classification", artwork.classification)}
                {displayUnknown("Department", artwork.department)}
                {displayUnknown("Accession Number", artwork.accessionNumber)}
                {displayUnknown("Credit Line", artwork.creditLine)}
                {displayUnknown("Country", artwork.country)}
                {displayUnknown("City", artwork.city)}
                {displayUnknown("Repository", artwork.repository)}
                {displayUnknown("Object ID", artwork.objectID)}
                {displayUnknown("Object URL", artwork.accessionNumber)}
                {displayUnknown(
                  "Rights and Reproduction",
                  artwork.rightsAndReproduction
                )}
                {displayUnknownBoolean(
                  "Is Public Domain",
                  artwork.isPublicDomain
                )}
                {displayUnknownBoolean("Is Highlight", artwork.isHighlight)}
                {displayUnknownBoolean(
                  "Is Timeline Work",
                  artwork.isTimelineWork
                )}
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
}

export default DetailedArtwork;
