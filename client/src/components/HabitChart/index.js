import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './HabitChart.css';

// Register các thành phần cần thiết
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HabitChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchHabitStats = async () => {
            const userID = JSON.parse(localStorage.getItem('user'))._id; // Lấy userID từ localStorage

            try {
                const res = await axios.get(`http://localhost:3001/api/habitStats/${userID}`);
                const stats = res.data;

                if (!stats || stats.length === 0) {
                    setChartData({});
                    return;
                }

                // Chuẩn bị datasets và labels cho Bar Chart
                const labels = stats.map(habit => habit.habitName);
                const data = stats.map(habit => habit.completionRate);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Completion Rate (%)',
                            data,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }
                    ]
                });

                setChartOptions({
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Habit Completion Rate' },
                    },
                    scales: {
                        x: { title: { display: true, text: 'Habits' } },
                        y: { title: { display: true, text: 'Completion Rate (%)' }, beginAtZero: true, max: 100 },
                    },
                });
            } catch (error) {
                console.error('Error fetching habit stats:', error);
                setChartData({});
            }
        };

        fetchHabitStats();
    }, []);

    return (
        <div className='habit-chart-container'>
            <h2>Habit Completion Rate</h2>
            {chartData.labels ? (
                <Bar data={chartData} options={chartOptions} />
            ) : (
                <p>No data available for the chart.</p>
            )}
        </div>
    );
}
