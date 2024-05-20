import { Box, Slider, Typography } from "@mui/material";
import React from "react";
import "../../../css/main.css";

const marks = [
  {
    value: 0,
    label: "No Sleep",
  },
  {
    value: 5,
    label: "Moderate Sleep",
  },
  {
    value: 10,
    label: "Deep Sleep",
  },
];
export function SleepPattern({ value, handleChange }) {
  return (
    <Box sx={{ width: 700 }} className="mx-auto flex flex-col justify-start">
      <Typography>Hours of Sleep:</Typography>
      <Box sx={{ width: 600 }} className="px-4">
        <Slider
          aria-label="Custom marks"
          defaultValue={5}
          step={1}
          value={value}
          onChange={handleChange}
          className="w-3/4"
          max={10}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
    </Box>
  );
}
