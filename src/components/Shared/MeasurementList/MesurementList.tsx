import Table from "react-bootstrap/Table";

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
  measurements: MeasurementType[];
};

function MeasurementList({ measurements }: MeasurementListProps) {
  return (
    <div className="measurement-list">
      {measurements && measurements.length > 0 && (
        <div className="Measurements">
          <h4>Measurements</h4>
          <div className="table-responsive">
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
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="measurement-list">
  //     {measurements && measurements.length > 0 && (
  //       <div className="Measurements">
  //         <h4>Measurements</h4>
  //         <Table striped bordered hover>
  //           <thead>
  //             <tr>
  //               <th>Element Name</th>
  //               <th>Description</th>
  //               <th>Depth (cm)</th>
  //               <th>Height (cm)</th>
  //               <th>Width (cm)</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {measurements.map((measurement, index) => (
  //               <tr key={index}>
  //                 <td>{measurement.elementName}</td>
  //                 <td>{measurement.elementDescription}</td>
  //                 <td>{measurement.elementMeasurements.Depth}</td>
  //                 <td>{measurement.elementMeasurements.Height}</td>
  //                 <td>{measurement.elementMeasurements.Width}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </Table>
  //       </div>
  //     )}
  //   </div>
  // );
}

export default MeasurementList;
