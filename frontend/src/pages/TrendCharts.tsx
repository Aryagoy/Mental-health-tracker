import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import NavigationBar from './NavigationBar.tsx';
import NavigationIcon from '@mui/icons-material/Navigation';

import { Box, Card, Fab, Modal, Typography } from '@mui/material';
import "../css/main.css";
import { Favorite, QuestionMark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LogEntry {
    date: any;
    average_mood: number;
    average_anxiety: number;
    average_sleep: number;
}
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
export function TrendCharts() {
    const [data, setData] = useState<LogEntry[]>([]);

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/logs/weekly', { withCredentials: true });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [])
    useEffect(() => {
        console.log(data)
    }, [data]);


    const chartData = {
        labels: data.map(record => new Date(record.date).toISOString()),
        datasets: [
            {
                label: 'Mood',
                data: data.map(item => item.average_mood),
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                fill: false,
            },
            {
                label: 'Anxiety',
                data: data.map(item => item.average_anxiety),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                fill: false,
            },
            {
                label: 'Sleep',
                data: data.map(item => item.average_sleep),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                fill: false,
            },
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Daily Logs',
            },
            tooltip: {
                enabled: true,
            },
        },
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        hover: {
            mode: 'nearest' as const,
            intersect: true,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
    };
    return (
        <div>
            <NavigationBar auth={true} />
            <div className='fixed bottom-0 right-0 mb-4 mr-4'>
                <Fab variant="extended" onClick={handleShow} sx={{ marginRight: "10px" }}>
                    <QuestionMark sx={{ mr: 1 }} />
                    Help
                </Fab>
                <Fab variant="extended" onClick={handleNavigate} sx={{
                    background: "red", color: "white", "&:hover": {
                        color: "black"
                    }
                }}>
                    <Favorite sx={{ mr: 1 }} />
                    Log Your Mood
                </Fab>
            </div>
            <div className='h-screen'>


                <div className='flex flex-col mx-16 justify-center'>
                    <h1 className='text-5xl mx-auto my-5'>Your Weekly Activity</h1>
                    <Card elevation={3} className='flex flex-row w-full mt-5'>
                        <div style={{ height: "50%", width: "50%" }} className='ml-5' >
                            <Line data={chartData} options={chartOptions} />
                        </div>
                        <div style={{ height: "50%", width: "50%" }} className='mr-5' >
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </Card>
                </div>



                <Modal
                    open={showModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Daily Log Guide
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <p>Welcome to the daily log guide. Here you can track your mood, anxiety, sleep, and more.</p>
                            <p>Hover over the chart points to see detailed information about each log entry.</p>
                            <p>Use the form below the chart to add new entries.</p>
                        </Typography>
                    </Box>
                </Modal>

            </div>

        </div>
    );
};