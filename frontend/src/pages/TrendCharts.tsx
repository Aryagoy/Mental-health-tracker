import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
export function TrendCharts() {
    const [data, setData] = useState<LogEntry[]>([]);

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
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
                borderColor: '#8884d8',
                fill: false,
            },
            {
                label: 'Anxiety',
                data: data.map(item => item.average_anxiety),
                borderColor: '#82ca9d',
                fill: false,
            },
            {
                label: 'Sleep',
                data: data.map(item => item.average_sleep),
                borderColor: '#ffc658',
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
        <>
            <NavigationBar auth={true} />
            <div className="container">

                <div className="d-flex justify-content-center my-4">
                    <Button variant="primary" onClick={handleShow}>
                        Guide Me Through Daily Log
                    </Button>
                </div>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Daily Log Guide</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Welcome to the daily log guide. Here you can track your mood, anxiety, sleep, and more.</p>
                        <p>Hover over the chart points to see detailed information about each log entry.</p>
                        <p>Use the form below the chart to add new entries.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="chart-container" style={{ height: '500px', width: '100%' }}>
                    <Line data={chartData} options={chartOptions} />
                </div>
                <div className="chart-container" style={{ height: '500px', width: '100%' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div></>
    );
};