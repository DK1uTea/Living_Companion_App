import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function Transaction({ number }) {
  return (
    <ListGroup.Item className='mb-1'>This is Transaction {number}</ListGroup.Item>
  )
}
