import React, { useState } from 'react';
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { Button } from 'react-bootstrap';
import './CalendarComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function CalendarComponent({ onDateChange }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }), // Bắt đầu từ thứ 2
        end: endOfWeek(new Date(), { weekStartsOn: 1 })
    });

    const handlePreviousWeek = () => {
        setCurrentWeek({
            start: subDays(currentWeek.start, 7),
            end: subDays(currentWeek.end, 7)
        });
    };

    const handleNextWeek = () => {
        setCurrentWeek({
            start: addDays(currentWeek.start, 7),
            end: addDays(currentWeek.end, 7)
        });
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
        // Pass new selected day for props to consumption page
        onDateChange(day);
    }

    const renderDaysOfWeek = () => {
        const days = [];
        let currentDay = currentWeek.start;

        while (currentDay <= currentWeek.end) {
            const day = new Date(currentDay);  // Tạo bản sao của currentDay
            const formattedDay = format(day, "yyyy-MM-dd");
        
            days.push(
                <div key={formattedDay} className="calendar-day">
                    <Button
                        className={`calendar-day-button ${formattedDay === format(selectedDate, "yyyy-MM-dd") ? "selected" : ""}`}
                        onClick={() => handleDayClick(day)} // Sử dụng biến day đã được sao chép
                    >
                        {format(day, "E")}
                        <br />
                        {format(day, "dd")}
                    </Button>
                </div>
            );
        
            currentDay = addDays(currentDay, 1);
        }        
        return days;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-card p-2">
                <div className="calendar-navigation text-center d-flex flex-row justify-content-between align-items-center">
                    <FontAwesomeIcon icon={faCaretLeft} onClick={handlePreviousWeek}/>
                    <span>{format(currentWeek.start, "MMM yyyy")}</span>
                    <FontAwesomeIcon icon={faCaretRight} onClick={handleNextWeek}/>
                </div>
                <div className="calendar-week-days d-flex flex-row justify-content-between align-items-center">
                    {renderDaysOfWeek()}
                </div>
                <p className="calendar-selected-date text-center">
                    Selected Date: <strong>{format(selectedDate, "yyyy-MM-dd").toString()}</strong>
                </p>           
            </div>
        </div>
    );
}

