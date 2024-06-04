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
      {page > 1 && (
        <>
          <Pagination.First
            onClick={() => setPage(1)}
            className="d-sm-inline"
          />
          <Pagination.Prev onClick={() => setPage(page - 1)} />
        </>
      )}

      {page > 1 && (
        <>
          <Pagination.Item onClick={() => setPage(1)} className="d-none">
            1
          </Pagination.Item>
          {page > 2 && <Pagination.Ellipsis className="d-none d-sm-inline" />}
        </>
      )}

      {page - 1 > 0 && (
        <Pagination.Item
          onClick={() => setPage(page - 1)}
          className="d-none d-lg-inline">
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {totalElements >= (page + 1) * elementsPerPage && (
        <Pagination.Item
          onClick={() => setPage(page + 1)}
          className="d-none d-lg-inline">
          {page + 1}
        </Pagination.Item>
      )}

      {totalElements >= (page + 2) * elementsPerPage && (
        <>
          <Pagination.Ellipsis className="d-none d-sm-inline" />
          <Pagination.Item
            onClick={() => setPage(page + 2)}
            className="d-none d-sm-inline">
            {page + 10}
          </Pagination.Item>
        </>
      )}

      {totalElements >= page * elementsPerPage ? (
        <>
          <Pagination.Next onClick={() => setPage(page + 1)} />
          <Pagination.Last
            onClick={() => setPage(Math.ceil(totalElements / elementsPerPage))}
            className="d-sm-inline"
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
