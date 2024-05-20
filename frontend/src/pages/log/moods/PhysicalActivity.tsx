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
export function PhysicalActivity({  handleChange, handleChangeExercise }) {
  const exercises = [
    { label: "No exercise", value: "noExercise" },
    { label: "Yoga", value: "yoga" },
    { label: "Cycling", value: "cycling" },
    { label: "Aerobic", value: "aerobic" },
    { label: "Strength Training", value: "strength" },
    { label: "Running", value: "running" },
  ];
  return (
    <Box sx={{ width: 700 }} className="mx-auto flex flex-row">
      {/* tbd */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={exercises}
        onChange={(e,v)=>handleChangeExercise(e,v?.value)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Exercises" />}
      />
      <Slider
        sx={{ marginLeft: "40px" }}
        aria-label="Custom marks"
        defaultValue={50}
        step={10}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
