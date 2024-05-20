import { Box, Slider } from "@mui/material";
import React from "react";
import "../../../css/main.css";

const marks = [
  {
    value: 0,
    label: "Very Sad",
  },
  {
    value: 100,
    label: "Very Happy",
  },
];
export function MoodRating({ value, handleChange }) {
  return (
    <Box sx={{ width: 700 }} className="mx-auto">
      <Slider
        aria-label="Custom marks"
        defaultValue={50}
        step={10}
        valueLabelDisplay="auto"
        value={value}
        onChange={handleChange}
        marks={marks}
      />
    </Box>
  );
}
