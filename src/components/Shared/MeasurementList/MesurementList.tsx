import Table from "react-bootstrap/Table";
import { displayUnknown } from "../../../Helpers/DisplayUnknown";

export type MeasurementType = {
  elementName: string;
  elementDescription: string;
  elementMeasurements: {
    Depth?: number;
    Height: number;
    Width: number;
  };
};

type MeasurementListProps = {
  dimensions: string;
  measurements: MeasurementType[];
};

function MeasurementList({ dimensions, measurements }: MeasurementListProps) {
  return (
    <>
      {measurements && measurements.length > 0 && (
        <div className="Measurements">
          <h4>Measurements</h4>
          <p>{displayUnknown("Dimensions", dimensions)}</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Element Name</th>
                <th>Description</th>
                <th>Depth (cm)</th>
                <th>Height (cm)</th>
                <th>Width (cm)</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((measurement, index) => (
                <tr key={index}>
                  <td>{measurement.elementName}</td>
                  <td>{measurement.elementDescription}</td>
                  <td>{measurement.elementMeasurements.Depth}</td>
                  <td>{measurement.elementMeasurements.Height}</td>
                  <td>{measurement.elementMeasurements.Width}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default MeasurementList;
