import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, ListGroup, Tab, Tabs } from 'react-bootstrap'
import Habit from '../../components/Habit'

export default function HabitPage() {
  return (
    <div className='habitpage-container p-2'>
      <div className='habitpage-container-header d-flex justify-content-center align-items-center'>
        <Button className='d-flex flex-row align-items-center justify-content-center mb-2' style={{gap: '8px'}}>
          <FontAwesomeIcon icon={faPlus} />
          <div>Add Habit</div>
        </Button>
      </div>
      <Tabs
        defaultActiveKey="weekly"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="daily" title="Daily">
          <div className='daily-habit-list'>
            <ListGroup>
              <Habit />
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey="weekly" title="Weekly">
          <div className='weekly-habit-list'>
            <ListGroup>
              <Habit />
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey="monthly" title="Monthly">
          <div className='monthly-habit-list'>
            <ListGroup>
              <Habit />
            </ListGroup>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
