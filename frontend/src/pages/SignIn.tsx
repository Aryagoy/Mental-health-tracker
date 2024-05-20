import React, { useEffect, useState } from "react";
import gradient from "random-gradient";
import "../css/main.css";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import GoogleButton from "react-google-button";
import axios from "axios";
import { LogNew } from "./log/LogNew.tsx";
import NavigationBar from "./NavigationBar.tsx";


export function SignInPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const UNSPLASH_ACCESS_KEY = 'Wp3zX6HUpF1McwG7wEHjuGX9IlHs7cw4hDpgTLsWGbg'; 
  useEffect(() => {
    fetchBackgroundImage();
  }, []);

  const fetchBackgroundImage = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=mental-health&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      setBackgroundImage(response.data.urls.full);
    } catch (error) {
      console.error('Error fetching background image:', error);
    }
  };
  useEffect(() => {
    axios.get('http://localhost:5001/check-auth', { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  }, []);
  return (
    <>
    <NavigationBar auth={isAuthenticated}/>
    <div
      className="size-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      {isAuthenticated ? <LogNew /> :
        <Paper elevation={3} className="size-96 my-auto h-fit">
          <h1 className="text-2xl mx-auto text-center mt-16 font-semibold	">
            Hi! Please Sign In.
          </h1>
          <div className="mx-auto text-center mt-5 w-fit mb-16">
            <GoogleButton
              onClick={() => {
                window.location.href = 'http://localhost:5001/auth/google';
              }}
            />
          </div>
        </Paper>}
    </div></>
  );
}
