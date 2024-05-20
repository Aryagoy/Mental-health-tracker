import { Box, Slider } from "@mui/material";
import React from "react";
import "../../../css/main.css";

const marks = [
  {
    value: 0,
    label: "Mild Stress",
  },
  {
    value: 25,
    label: "Moderate Stress",
  },
  {
    value: 50,
    label: "Moderately Severe Stress",
  },
  {
    value: 75,
    label: "Sever Stress",
  },
  {
    value: 100,
    label: "Extreme Stress",
  },
];
export function StressLevel({ value, handleChange }) {
  return (
    <Box sx={{ width: 700 }} className="mx-auto">
      <Slider
        aria-label="Custom marks"
        defaultValue={50}
        step={10}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
