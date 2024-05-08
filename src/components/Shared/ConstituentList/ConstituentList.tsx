import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export type ConstituentType = {
  constituentID: number;
  role: string;
  name: string;
  constituentULAN_URL: string;
  constituentWikidata_URL: string;
  gender: string;
};
type ConstituentListProps = {
  constituents: ConstituentType[];
};

function ConstituentList({ constituents }: ConstituentListProps) {
  return (
    <>
      {constituents && constituents.length > 0 && (
        <div className="Constituents">
          <h4>Constituents</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Gender</th>
                <th>Links</th>
              </tr>
            </thead>
            <tbody>
              {constituents.map((constituent, index) => (
                <tr key={index}>
                  <td>{constituent.name}</td>
                  <td>{constituent.role}</td>
                  <td>{constituent.gender || "Unknown"}</td>
                  <td>
                    <Link to={constituent.constituentULAN_URL}> Ulan</Link> |
                    <Link to={constituent.constituentWikidata_URL}>
                      {" "}
                      Wikidia
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default ConstituentList;
