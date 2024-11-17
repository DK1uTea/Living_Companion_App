import { faCheckToSlot, faCircleInfo, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function Habit({
  habit,
  handleOpenEditModal,
  handleDeleteHabit,
  handleShowCalendar,
  handleMarkHabitAsCompleted
}) {

  // calculate completed count based on frequency
  const calculateCompletedCount = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; // Chuyển sang YYYY-MM-DD
    const completedDates = habit.completedDates.map(date => new Date(date).toISOString().split('T')[0]); // Định dạng completedDates

    let count = 0;

    if (habit.frequency === 'daily') {
      // Kiểm tra nếu ngày hôm nay nằm trong danh sách completedDates
      count = completedDates.includes(formattedToday) ? 1 : 0;
    } else if (habit.frequency === 'weekly') {
      // Lấy start và end của tuần hiện tại (Thứ Hai đến Chủ Nhật)
      const startOfWeek = new Date(today);
      const day = today.getDay(); // 0 (Chủ Nhật) -> 6 (Thứ Bảy)
      const diffToMonday = day === 0 ? -6 : 1 - day; // Nếu Chủ Nhật thì lùi về Thứ Hai tuần trước, nếu khác thì tính khoảng cách đến Thứ Hai

      startOfWeek.setDate(today.getDate() + diffToMonday); // Thiết lập đầu tuần là Thứ Hai
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Thêm 6 ngày để có Chủ Nhật cuối tuần

      const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];
      const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];
      console.log('Start of week:', formattedStartOfWeek);
      console.log('End of week:', formattedEndOfWeek);

      count = completedDates.filter(date => date >= formattedStartOfWeek && date <= formattedEndOfWeek).length;
    } else if (habit.frequency === 'monthly') {
      // Kiểm tra trong tháng hiện tại
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      count = completedDates.filter(date => {
        const d = new Date(date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      }).length;
    }

    return count;
  };

  const completedCount = calculateCompletedCount();

  return (
    <ListGroup.Item className='mb-2'>
      <div className='d-flex justify-content-between align-items-center'>
        {/* display some information field */}
        <div>
          <div
            className='habit-item-name d-flex justify-content-start align-items-center'
            style={{ gap: '5px' }}
          >
            <strong>{habit.name}</strong>
            {/* icon view details */}
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{ color: "#B197FC", }}
              onClick={() => handleShowCalendar(habit)}
            />
          </div>
          <div className='habit-item-frequency'>
            {habit.frequency === 'daily' ? 'Today' : (habit.frequency === 'weekly' ? 'This week' : 'This month')}: {completedCount} / {habit.targetCount}
          </div>
        </div>
        {/* div contains some icon to click for updating, deleting, marking */}
        <div
          className='habit-item-icon d-flex justify-content-center align-items-center'
          style={{ gap: '8px' }}
        >
          {/* icon edit */}
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "#00a7fa", width: '18px', height: '18px' }}
            onClick={() => handleOpenEditModal(habit)}
          />
          {/* icon delete */}
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#d10a0a", width: '18px', height: '18px' }}
            onClick={() => handleDeleteHabit(habit._id)}
          />
          {/* icon marking */}
          <FontAwesomeIcon
            icon={faCheckToSlot}
            style={{ color: "#63e6be", width: '18px', height: '18px' }}
            onClick={() => handleMarkHabitAsCompleted(habit)}
          />
        </div>
      </div>
    </ListGroup.Item>
  )
}
