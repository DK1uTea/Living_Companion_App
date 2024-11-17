import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './ConsumptionChart.css';

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ConsumptionChart() {
  const [categoryData, setCategoryData] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      const userID = JSON.parse(localStorage.getItem('user'))._id;

      try {
        const res = await axios.get(`http://localhost:3001/api/consumptionStats/${userID}`);
        const { categoryData, monthlyData } = res.data;

        setCategoryData(categoryData);
        setMonthlyData(monthlyData);
      } catch (error) {
        console.error('Error fetching consumption statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  // Prepare data for Pie Chart Expense
  const expensePieData = categoryData
    ? {
      labels: Object.keys(categoryData.Expense || {}),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(categoryData.Expense || {}),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    : null;

  // Prepare data for Pie Chart Income
  const incomePieData = categoryData
    ? {
      labels: Object.keys(categoryData.Income || {}),
      datasets: [
        {
          label: 'Income by Category',
          data: Object.values(categoryData.Income || {}),
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    : null;

  // Format display for total amount
  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B'; // Billions
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M'; // Millions
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K'; // Thousands
    } else {
      return num.toString(); // Normal format
    }
  };

  return (
    <div className='consumption-chart-container'>
        <h2>Consumption Statistics</h2>
        <div className='chart-container-main'>
          <div className='income-chart'>
            <h3>Income by Category</h3>
            {incomePieData ? (
              <Pie data={incomePieData} />
            ) : (
              <p>No data available for income.</p>
            )}
          </div>
          <div className='expense-chart'>
            <h3>Expense by Category</h3>
            {expensePieData ? (
              <Pie data={expensePieData} />
            ) : (
              <p>No data available for expenses.</p>
            )}
          </div>
        </div>
      {/* <div className='monthly-statistics'>
        <h3>Monthly Statistics</h3>
        <ul>
          {monthlyData.map((data, idx) => (
            <li key={idx}>
              Month {data.month}: Income - {formatNumber(data.income)}, Expense - {formatNumber(data.expense)}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
