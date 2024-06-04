import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import config from "../../../../config.json";
import Artwork from "../../Artwork/Artwork";
import { TagType } from "../TagList/TagList";

export function RecommendedArtworks({
  currentId,
  tags,
}: {
  currentId: number;
  tags: TagType[];
}) {
  const [recommendedArtworkIds, setRecommendedArtworkIds] = useState<number[]>(
    []
  );
  const [displayedArtworkIds, setDisplayedArtworkIds] = useState<number[]>([]);
  const [recommendedAmount, setRecommendedAmount] = useState<number>(3);

  useEffect(() => {
    axios
      .get(
        `${config.API_URL}/public/collection/v1/search?q=""&tags=${tags[0].term}`
      )
      .then((response) => {
        setRecommendedArtworkIds(
          response.data.objectIDs.filter((id: number) => id !== currentId)
        );
      })
      .catch(() => {
        toast.error("Error while fetching recommended artworks", {
          toastId: "ErrorFetchingRecommendedArtworks",
        });
      });
  }, [tags]);

  useEffect(() => {
    if (recommendedArtworkIds && recommendedArtworkIds.length > 0) {
      setDisplayedArtworkIds(recommendedArtworkIds.slice(0, recommendedAmount));
    }
  }, [recommendedArtworkIds, recommendedAmount]);

  return (
    <>
      {!displayedArtworkIds || displayedArtworkIds.length === 0 ? null : (
        <Container className="recommended-artworks">
          <Row>
            <Col xs={12}>
              <h3>Related artworks</h3>
            </Col>
          </Row>
          <Row>
            {displayedArtworkIds.map((id: number) => {
              return (
                <Col xs={12} sm={6} md={6} lg={4} key={id}>
                  <Artwork id={id} />
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col>
              {displayedArtworkIds.length ===
              recommendedArtworkIds.length ? null : (
                <Button
                  onClick={() => setRecommendedAmount(recommendedAmount + 3)}>
                  Load more
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default RecommendedArtworks;
