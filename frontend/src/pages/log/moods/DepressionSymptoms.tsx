import { Autocomplete, Box, Slider, TextField } from "@mui/material";
import React from "react";
import "../../../css/main.css";

const marks = [
  {
    value: 0,
    label: "Light",
  },
  {
    value: 100,
    label: "Intense",
  },
];
export function DepressionSymptoms({ handleChange }) {
  const depression = [
    { label: "Anger Issues", value: "anger" },
    { label: "Anxiety", value: "anxiety" },
    { label: "Poor Focus", value: "focus" },
    { label: "Lack of energy", value: "energy" },
    { label: "Isolation", value: "isolation" },
  ];
  return (
    <Box sx={{ width: 700 }} className="mx-auto flex flex-row">
      <Autocomplete
        multiple
        disablePortal
        id="combo-box-demo"
        options={depression}
        onChange={(e,v)=>handleChange(e,(v.map(s=>s.value)))}
        sx={{ width: 700 }}
        renderInput={(params) => <TextField {...params} label="Symptoms" />}
      />
    </Box>
  );
}
