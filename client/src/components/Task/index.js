import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Task({ task, handleDeleteTask, handleOpenEditModal, handleMarkTaskAsCompleted }) {
    const formattedDate = new Date(task.dueDate).toLocaleDateString();
    const isDisable = task.status === 'completed' || task.status === 'overdue';
    
    // Define the background color based on the task status
    const getStatusStyle = () => {
        switch (task.status) {
            case 'completed':
                return { backgroundColor: 'rgba(99, 230, 190, 0.2)' }; // Transparent green for completed
            case 'overdue':
                return { backgroundColor: 'rgba(241, 9, 44, 0.2)' }; // Transparent red for overdue
            case 'pending':
            default:
                return { backgroundColor: 'rgba(116, 192, 252, 0.2)' }; // Transparent blue for pending
        }
    };

    // Apply the background color to ListGroup.Item as well
    const listItemStyle = getStatusStyle();

    return (
        <Card style={{ width: '18rem', ...getStatusStyle() }}>            
            <Card.Body>
                <Card.Title>
                    {task.title.length > 18 ? `${task.title.slice(0, 18)}...` : task.title}
                    {task.status === 'completed' ? 
                        (<FontAwesomeIcon icon={faCheck} beat style={{color: "#63E6BE", marginLeft: '10px'}} />) : 
                        (task.status === 'overdue' ? 
                            (<FontAwesomeIcon icon={faX} bounce style={{color: "#f1092c", marginLeft: '10px'}} />) : 
                            (<FontAwesomeIcon icon={faSpinner} spin style={{color: "#74C0FC", marginLeft: '10px'}} />))
                    }
                </Card.Title>
                <Card.Text>
                    {task.description.length > 30 ? `${task.description.slice(0, 30)}...` : task.description}
                </Card.Text>
                <ListGroup className="list-group-flush" >
                    <ListGroup.Item style={listItemStyle} ><strong>Due Date: </strong>{formattedDate}</ListGroup.Item>
                    <ListGroup.Item style={listItemStyle} ><strong>Priority: </strong>{task.priority}</ListGroup.Item>
                    <ListGroup.Item style={listItemStyle} ><strong>Status: </strong>{task.status}</ListGroup.Item>
                </ListGroup>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black', paddingTop: '5px' }}>
                    <Button 
                        variant='primary'
                        onClick={() => handleOpenEditModal(task)}
                        disabled={isDisable}
                    >
                        Edit
                    </Button>
                    <Button 
                        variant='danger' 
                        onClick={() => handleDeleteTask(task._id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant='success'
                        onClick={() => handleMarkTaskAsCompleted(task._id)}
                        disabled={isDisable}
                    >
                        Complete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
