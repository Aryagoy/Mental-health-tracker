import React, { useEffect, useState } from "react";
import "../../css/main.css";
import Paper from "@mui/material/Paper";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Pagination } from "@mui/material";
import { MoodRating } from "./moods/Mood.tsx";
import { AnxietyRating } from "./moods/AnxietyLevel.tsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../css/TextChangeAnimation.css";
import { SleepPattern } from "./moods/SleepPattern.tsx";
import { PhysicalActivity } from "./moods/PhysicalActivity.tsx";
import { SocialInteractions } from "./moods/SocialInteractions.tsx";
import { StressLevel } from "./moods/StressLevel.tsx";
import { DepressionSymptoms } from "./moods/DepressionSymptoms.tsx";

export function LogNew() {
  const [logData, setLogData] = useState({
    mood: 50,
    anxiety: 50,
    sleep: 5,
    physicalActivity: 50,
    physicalActivityExcercise: '',
    socialInteractions: 50,
    stressLevel: 50,
    depressionSymptoms: []
  });
  const navigate = useNavigate();

  const handleChange = (name) => (event, value) => {
    setLogData({
      ...logData,
      [name]: value
    });
  };
  useEffect(() => {
    console.log(logData);
  }, [logData])

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/log', logData, { withCredentials: true });
      console.log('Response:', response.data);
      navigate('/trends');
    } catch (error) {
      console.error('Error posting logData:', error);
    }
  };
  const moodComponents = [
    <MoodRating value={logData.mood} handleChange={handleChange('mood')} />,
    <AnxietyRating value={logData.anxiety} handleChange={handleChange('anxiety')} />,
    <SleepPattern value={logData.sleep} handleChange={handleChange('sleep')} />,
    <PhysicalActivity handleChange={handleChange('physicalActivity')} handleChangeExercise={handleChange('physicalActivityExcercise')} />,
    <SocialInteractions value={logData.socialInteractions} handleChange={handleChange('socialInteractions')} />,
    <StressLevel value={logData.stressLevel} handleChange={handleChange('stressLevel')} />,
    <DepressionSymptoms handleChange={handleChange('depressionSymptoms')} />,
  ];
  const moodStatus = [
    "Mood",
    "Anxiety Levels",
    "Sleep",
    "Physical Activity",
    "Social Interactions",
    "Stress Levels",
    "Depression Symptoms",
  ];
  const [page, setPage] = useState(0);
  const [inProp, setInProp] = useState(true);

  const handleChangeText = (e, v) => {
    setPage(v - 1);
    setInProp(false);
    setTimeout(() => {
      setInProp(true);
    }, 500); // Duration matches the CSS transition duration
  };
  return (
    <div
      className="size-full h-screen flex items-center justify-center"
    >
      <div className="flex flex-col justify-start w-3/4">
        <Paper elevation={3} className="my-auto h-fit">
          <div className="h-20">
            <TransitionGroup>
              <CSSTransition
                key={moodStatus[page]}
                timeout={500}
                classNames="fade"
                in={inProp}
              >
                <h1 className="text-4xl mx-auto text-center mt-16 font-semibold	">
                  How Is Your {moodStatus[page]} Today?
                </h1>
              </CSSTransition>
            </TransitionGroup>
          </div>

          {/* Mood count */}
          <div className="mb-16 mt-32">{moodComponents[page]}</div>
          <div className="flex w-full flex-row justify-center content-center mb-5">
            <Pagination
              color="primary"
              count={7}
              onChange={handleChangeText}
            />
            {page == 6 && <Button variant="contained"  color="primary" onClick={handleSubmit}>
              Submit
            </Button>}
          </div>

        </Paper>

      </div>
    </div>
  );
}
