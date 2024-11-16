import React from 'react';
import './CalendarHabit.css';
import { Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarHabit({ showCalendar, handleCloseCalendar, selectedHabit }) {
  return (
    <div className='calendar-habit-container'>
      <Modal show={showCalendar} onHide={handleCloseCalendar}>
        <Modal.Header 
          closeButton 
          className='d-flex justify-content-center align-items-center'
          style={{backgroundColor: '#B5CFFF'}}
        >
          <Modal.Title>Completed Dates for {selectedHabit?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center align-items-center'>
          <Calendar
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                // Lấy ngày local (YYYY-MM-DD)
                const formattedDate = date.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
                const completedDates = selectedHabit?.completedDates.map(d =>
                  new Date(d).toLocaleDateString('en-CA')
                );

                if (completedDates?.includes(formattedDate)) {
                  console.log('Debug formattedDate in calendar', formattedDate);
                  return 'completed-date'; // Thêm class tùy chỉnh cho ngày hoàn thành
                }
              }
              return null;
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}
