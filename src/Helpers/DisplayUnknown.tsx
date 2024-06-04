import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { capitalize } from "./Capitalise";
import { formatTimestamp } from "./FormatTimestamp";
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
  displayIfEmpty: boolean = false,
  placeholder: string = "Unknown"
): JSX.Element {
  const valueString = value ? value.toString() : "";
  return (
    <>
      {displayUnknownProperty(valueString, placeholder) !== placeholder ||
      displayIfEmpty ? (
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
    <>
      {displayUnknownProperty(beginDate.toString(), placeholder) !==
        placeholder &&
      displayUnknownProperty(endDate.toString(), placeholder) !==
        placeholder ? (
        <span className="Pair">
          <p>Dates:</p>
          <p>
            {displayUnknownProperty(beginDate.toString(), placeholder)}-
            {displayUnknownProperty(endDate.toString(), placeholder)}
          </p>
        </span>
      ) : null}
    </>
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

export function displayUnknownTimestamp(
  label: string,
  timestamp: string,
  placeholder: string = "Unknown"
): JSX.Element {
  return (
    <span className="Pair">
      <p>{capitalize(label)}:</p>
      <p>{timestamp ? formatTimestamp(timestamp) : placeholder}</p>
    </span>
  );
}
