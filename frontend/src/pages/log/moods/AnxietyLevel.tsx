import { Box, Slider } from "@mui/material";
import React from "react";
import "../../../css/main.css";

const marks = [
  {
    value: 0,
    label: "Mild Anxiety",
  },
  {
    value: 25,
    label: "Moderate Anxiety",
  },
  {
    value: 50,
    label: "Moderately Severe Anxiety",
  },
  {
    value: 75,
    label: "Sever Anxiety",
  },
  {
    value: 100,
    label: "Extreme Anxiety",
  },
];
export function AnxietyRating({ value, handleChange }) {
  return (
    <Box sx={{ width: 700 }} className="mx-auto">
      <Slider
        aria-label="Custom marks"
        defaultValue={50}
        value={value}
        step={10}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
