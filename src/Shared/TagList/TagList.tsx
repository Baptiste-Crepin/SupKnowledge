import { Badge, Card } from "react-bootstrap";
import "./TagList.css";

export type TagType = {
  term: string;
  AAT_URL: string;
  Wikidata_URL: string;
};

type TagsListProps = { tags: TagType[]; card?: boolean };

function TagList({ tags, card }: TagsListProps) {
  const getBadgeElement = (tag: TagType) => {
    return (
      <Badge key={tag.term} bg="primary" className="Artwork-tag">
        {tag.term}
      </Badge>
    );
  };

  return (
    <>
      {tags && tags.length > 0 ? (
        <div className="tags">
          {tags.map((tag) =>
            card ? (
              <Card.Text key={tag.term}>{getBadgeElement(tag)}</Card.Text>
            ) : (
              getBadgeElement(tag)
            )
          )}
        </div>
      ) : null}
    </>
  );
}

export default TagList;
