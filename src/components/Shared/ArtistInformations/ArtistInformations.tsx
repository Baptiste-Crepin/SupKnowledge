import { ArtworkType } from "../../Artwork/Artwork";
import { Button } from "react-bootstrap";
import {
  displayUnknown,
  displayUnknownDates,
} from "../../../Helpers/DisplayUnknown";

function ArtistInformationComponent({ artwork }: { artwork: ArtworkType }) {
  artwork.artistPrefix = "In the name of the artist";

  return (
    <div className="Artist-informations">
      <h3>Artist Informations</h3>
      {displayUnknown("DisplayName", artwork.artistDisplayName)}
      {displayUnknown("Role", artwork.artistRole)}
      {displayUnknownDates(artwork.artistBeginDate, artwork.artistEndDate)}
      {displayUnknown("Biography", artwork.artistDisplayBio)}
      {displayUnknown("Nationality", artwork.artistNationality)}
      {displayUnknown("Gender", artwork.artistGender)}

      <div className="Pair">
        <p>Links:</p>
        <Button variant="primary" href={artwork.artistWikidata_URL}>
          Wikidata
        </Button>
        <Button variant="primary " href={artwork.artistULAN_URL}>
          Ulan
        </Button>
      </div>
    </div>
  );
}

export default ArtistInformationComponent;
