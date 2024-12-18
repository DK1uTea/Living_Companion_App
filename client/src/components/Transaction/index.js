import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function Transaction({ transaction, formatNumber, handleDeleteTransaction, handleOpenEditModal }) {
  // style color for list group item red when expense, green when income
  const getTypeStyle = () => {
    switch (transaction.type) {
      case "Income":
        return { backgroundColor: 'rgba(99, 230, 190, 0.2)' };
      default:
        return { backgroundColor: 'rgba(241, 9, 44, 0.2)' };
    }
  }

  return (
    <ListGroup.Item className='mb-2' style={{ ...getTypeStyle() }}>
      <div className='d-flex justify-content-between align-items-center'>
        {/* display some infor */}
        <div style={{ flex: 1 }}>
          <div><strong>Category: </strong>{transaction.category}</div>
          <div><strong>Description: </strong>{transaction.description}</div>
        </div>
        {/* display amount */}
        <div style={{ flex: 1, textAlign: 'center' }}><strong>Amount: </strong>{formatNumber(transaction.amount)}</div>
        {/* div contains some icon to click for updating, deleting */}
        <div className='trans-item-icon d-flex justify-content-end align-items-center' style={{ flex: 1, gap: '8px'}}>
          {/* icon edit */}
          <FontAwesomeIcon 
            icon={faPenToSquare} 
            style={{ color: "#00a7fa", width: '18px', height: '18px'}} 
            onClick={() => handleOpenEditModal(transaction)}
          />
          {/* icon delete */}
          <FontAwesomeIcon 
            icon={faTrash} style={{color: "#d10a0a",  width: '18px', height: '18px'}} 
            onClick={() => handleDeleteTransaction(transaction._id)}
          />
        </div>
      </div>
    </ListGroup.Item>
  )
}
