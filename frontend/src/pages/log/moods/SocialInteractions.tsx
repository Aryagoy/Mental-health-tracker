import { Autocomplete, Box, Slider, TextField } from "@mui/material";
import React from "react";
import "../../../css/main.css";

const marks = [
  {
    value: 0,
    label: "Introverted",
  },
  {
    value: 100,
    label: "Extroverted",
  },
];
export function SocialInteractions({ value, handleChange }) {
  return (
    <Box sx={{ width: 700 }} className="mx-auto flex flex-row">
      <Slider
        aria-label="Custom marks"
        defaultValue={50}
        step={20}
        onChange={handleChange}
        value={value}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
