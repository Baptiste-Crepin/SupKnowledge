import { capitalize } from "./Capitalise";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
// import "./DisplayUnknown.css";

export function displayUnknownProperty(
  value: string,
  placeholder: string = "Unknown"
): string {
  return value != "" ? value : placeholder;
}

export function displayUnknown(
  label: string,
  value: string | number | undefined | null,
  displayIfEmpty: boolean = true,
  placeholder: string = "Unknown"
): JSX.Element {
  const valueString = value ? value.toString() : "";
  return (
    <>
      {displayIfEmpty ? (
        <span className="Pair">
          <p>{capitalize(label)}:</p>
          <p>{displayUnknownProperty(valueString, placeholder)}</p>
        </span>
      ) : null}
    </>
  );
}

export function displayUnknownArray(
  label: string,
  values: string[],
  placeholder: string = "Unknown"
): JSX.Element {
  return (
    <span className="Pair">
      <p>{capitalize(label)}:</p>
      <p>
        {values.length > 0
          ? values.map((value, index) => (
              <span key={index}>
                {displayUnknownProperty(value, placeholder)}
                {index < values.length - 1 ? ", " : ""}
              </span>
            ))
          : placeholder}
      </p>
    </span>
  );
}

export function displayUnknownDates(
  beginDate: number,
  endDate: number,
  placeholder: string = "Unknown"
): JSX.Element {
  return (
    <span className="Pair">
      <p>Dates:</p>
      {displayUnknownProperty(beginDate.toString(), placeholder)}
      <p> - </p>
      {displayUnknownProperty(endDate.toString(), placeholder)}
    </span>
  );
}

export function displayUnknownBoolean(
  label: string,
  value: boolean,
  placeholderTrue: string = "Yes",
  placeholderFalse: string = "No"
): JSX.Element {
  return (
    <span className="Pair">
      <p>{capitalize(label)}:</p>
      {value ? (
        <>
          <p>{placeholderTrue}</p>
          <FaCheck fill="green" />
        </>
      ) : (
        <>
          <p>{placeholderFalse}</p>
          <ImCross fill="red" />
        </>
      )}
    </span>
  );
}
