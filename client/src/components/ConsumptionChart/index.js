import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './ConsumptionChart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ConsumptionChart() {
  const [categoryData, setCategoryData] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState(null); // 'income' or 'expense'

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

  const handleShow = (type) => {
    setModalType(type);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className='consumption-chart-container'>
      <h2>Consumption Statistics</h2>
      {/* Modal for monthly statistic */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'income' ? 'Income Statistics by Month' : 'Expense Statistics by Month'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {monthlyData.map((data, idx) => (
              <li key={idx}>
                Month {data.month}:
                {modalType === 'income'
                  ? ` Income - ${formatNumber(data.income)}`
                  : ` Expense - ${formatNumber(data.expense)}`}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='chart-container-main'>
        {/* Income pie chart */}
        <div className='income-chart'>
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ gap: '8px' }}
          >
            <h3>Income by Category</h3>
            <FontAwesomeIcon
              icon={faCircleInfo}
              onClick={() => handleShow('income')}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {categoryData?.Income ? (
            <Pie data={{
              labels: Object.keys(categoryData.Income),
              datasets: [
                {
                  label: 'Income by Category',
                  data: Object.values(categoryData.Income),
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
            }} />
          ) : (
            <p>No data available for income.</p>
          )}
        </div>

        {/* Expense pie chart */}
        <div className='expense-chart'>
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ gap: '8px' }}
          >
            <h3>Expense by Category</h3>
            <FontAwesomeIcon
              icon={faCircleInfo}
              onClick={() => handleShow('expense')}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {categoryData?.Expense ? (
            <Pie data={{
              labels: Object.keys(categoryData.Expense),
              datasets: [
                {
                  label: 'Expense by Category',
                  data: Object.values(categoryData.Expense),
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
            }} />
          ) : (
            <p>No data available for expenses.</p>
          )}
        </div>
      </div>
    </div>
  );
}
