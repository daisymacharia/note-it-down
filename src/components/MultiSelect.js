import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { SampleParticipants } from "../fixtures";

export default function ({ onSelect, onRemove, selectedValues }) {
  return (
    <Multiselect
      placeholder="Select meeting attendees"
      options={SampleParticipants} // Options to display in the dropdown
      selectedValues={selectedValues} // Preselected value to persist in dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
    />
  );
}
