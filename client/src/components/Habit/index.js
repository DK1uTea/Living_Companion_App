import { faCheckToSlot, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function Habit({ habit, handleOpenEditModal, handleDeleteHabit }) {
  return (
    <ListGroup.Item className='mb-2'>
      <div className='d-flex justify-content-between align-items-center'>
        {/* display some information field */}
        <div>
          <div className='habit-item-name'><strong>{habit.name}</strong></div>
          <div className='habit-item-frequency'>
            {habit.frequency === 'daily' ? 'Today' : (habit.frequency === 'weekly' ? 'This week' : 'This month')}: 1 / {habit.targetCount}
          </div>
        </div>
        {/* div contains some icon to click for updating, deleting, marking */}
        <div 
          className='habit-item-icon d-flex justify-content-center align-items-center'
          style={{gap: '8px'}}
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
          />
        </div>
      </div>
    </ListGroup.Item>
  )
}
