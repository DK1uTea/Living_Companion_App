import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // Import and register necessary components
import axios from 'axios';

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TaskChart() {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchTaskStats = async () => {
            const userID = JSON.parse(localStorage.getItem('user'))._id; // Get userID from local storage

            try {
                const res = await axios.get(`http://localhost:3001/api/taskStats/${userID}`);
                const stats = res.data;

                if (!stats || Object.keys(stats).length === 0) {
                    setChartData({});
                    return;
                }

                // Extract days and counts for each status
                const days = Object.keys(stats);
                const pending = days.map(day => stats[day]?.pending || 0);
                const completed = days.map(day => stats[day]?.completed || 0);
                const overdue = days.map(day => stats[day]?.overdue || 0);

                setChartData({
                    labels: days,
                    datasets: [
                        {
                            label: 'Pending',
                            data: pending,
                            borderColor: 'rgba(255, 206, 86, 1)',
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'Completed',
                            data: completed,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'Overdue',
                            data: overdue,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            fill: true,
                        }
                    ]
                });
            } catch (error) {
                console.error(error);
                setChartData({}); // Handle error by resetting the chart
            }
        };

        fetchTaskStats();

        // Ensure chart cleanup on component unmount
        return () => {
            setChartData({}); // This ensures the chart data is reset
        };
    }, []);

    return (
        <div className='todo-chart-container p-4'>
            <h2>Task Completion Ratio by Day</h2>
            {chartData.labels ? (
                <Line
                    style={{height: '100%',maxHeight: '800px', width: '100%'}}
                    data={chartData}
                    options={{
                        scales: {
                            x: { title: { display: true, text: 'Date' } },
                            y: { title: { display: true, text: 'Count' }, beginAtZero: true }
                        }
                    }}
                />
            ) : (
                <p>No data available for the chart.</p>
            )}
        </div>
    );
}
