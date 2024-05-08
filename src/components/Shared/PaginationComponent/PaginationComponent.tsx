import { Pagination } from "react-bootstrap";
import "./PaginationComponent.css";

type PaginationComponentProps = {
  page: number;
  setPage:
    | React.Dispatch<React.SetStateAction<number>>
    | ((page: number) => void);
  elementsPerPage: number;
  totalElements: number;
};

function PaginationComponent({
  page,
  setPage,
  elementsPerPage,
  totalElements,
}: PaginationComponentProps) {
  return (
    <Pagination>
      {page > 1 ? (
        <>
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev onClick={() => setPage(page - 1)} />
        </>
      ) : (
        <>
          <Pagination.First disabled />
          <Pagination.Prev disabled />
        </>
      )}

      {page - 10 > 0 && (
        <>
          <Pagination.Item onClick={() => setPage(page - 10)}>
            {page - 10}
          </Pagination.Item>
          <Pagination.Ellipsis />
        </>
      )}
      {page - 2 > 0 && (
        <Pagination.Item onClick={() => setPage(page - 2)}>
          {page - 2}
        </Pagination.Item>
      )}
      {page - 1 > 0 && (
        <Pagination.Item onClick={() => setPage(page - 1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active> {page} </Pagination.Item>
      {totalElements >= (page + 1) * elementsPerPage - elementsPerPage && (
        <Pagination.Item onClick={() => setPage(page + 1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {totalElements >= (page + 2) * elementsPerPage && (
        <Pagination.Item onClick={() => setPage(page + 2)}>
          {page + 2}
        </Pagination.Item>
      )}
      {totalElements >= (page + 10) * elementsPerPage && (
        <>
          <Pagination.Ellipsis />
          <Pagination.Item onClick={() => setPage(page + 10)}>
            {page + 10}
          </Pagination.Item>
        </>
      )}
      {totalElements >= page * elementsPerPage ? (
        <>
          <Pagination.Next onClick={() => setPage(page + 1)} />
          <Pagination.Last
            onClick={() =>
              setPage(Math.floor(totalElements / elementsPerPage) + 1)
            }
          />
        </>
      ) : (
        <>
          <Pagination.Next disabled />
          <Pagination.Last disabled />
        </>
      )}
    </Pagination>
  );
}

export default PaginationComponent;
