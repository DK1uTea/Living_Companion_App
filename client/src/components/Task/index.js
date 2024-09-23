import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'

export default function Task({ task }) {
    const formattedDate = new Date(task.dueDate).toLocaleDateString();
    
    return (
        <Card style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="https://images.pexels.com/photos/28125553/pexels-photo-28125553/free-photo-of-den-va-tr-ng-m-u-k-t-c-u-tr-u-t-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /> */}
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>
                    {task.description}
                </Card.Text>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Due Date: {formattedDate}</ListGroup.Item>
                    <ListGroup.Item>Priority: {task.priority}</ListGroup.Item>
                    <ListGroup.Item>Status: {task.status}</ListGroup.Item>
                </ListGroup>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black', paddingTop: '5px' }}>
                    <Button variant='primary'>Edit</Button>
                    <Button variant='danger'>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    )
}
