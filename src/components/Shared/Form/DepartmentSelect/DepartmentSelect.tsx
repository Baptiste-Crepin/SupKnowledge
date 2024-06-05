import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import config from "../../../../../config.json";

export type Department = {
  departmentId: number;
  displayName: string;
};

type DepartmentSelectProps = {
  onSelect: (departmentId?: number) => void;
};

function DepartmentSelect({ onSelect }: DepartmentSelectProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      axios
        .get(config.API_URL + "/public/collection/v1/departments")
        .then((response) => {
          setDepartments(response.data.departments);
          setFetched(true);
        })
        .catch(() => {
          console.error("Error fetching departments");
        });
    }
  }, [fetched]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartmentId = parseInt(event.target.value, 10) || undefined;
    onSelect(selectedDepartmentId);
  };

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={handleSelectChange}
      defaultValue={undefined}>
      <option value={undefined}>Select a department</option>
      {departments.map((department) => (
        <option key={department.departmentId} value={department.departmentId}>
          {department.displayName}
        </option>
      ))}
    </Form.Select>
  );
}

export default DepartmentSelect;
