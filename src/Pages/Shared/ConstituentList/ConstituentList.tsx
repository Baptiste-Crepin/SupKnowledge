import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./ConstituentList.css";

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
    <div className="constituent-list">
      {constituents && constituents.length > 0 && (
        <div className="Constituents">
          <h4>Constituents</h4>
          <div className="table-responsive">
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
                    <td className="link-list">
                      <Button
                        variant="primary"
                        href={constituent.constituentULAN_URL}>
                        Ulan
                      </Button>
                      <Button
                        variant="primary"
                        href={constituent.constituentWikidata_URL}>
                        Wikidata
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConstituentList;
