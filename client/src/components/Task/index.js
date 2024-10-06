import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX, faSpinner } from '@fortawesome/free-solid-svg-icons'

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Pad day with leading zero
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero (months are 0-based)
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
};

export default function Task({ task, handleDeleteTask, handleOpenEditModal, handleMarkTaskAsCompleted }) {
    const formattedDate = formatDate(task.dueDate);
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
        <Card style={{ ...getStatusStyle(), borderRadius: '16px'}}>
            <Card.Body>
                <Card.Title>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                        <div style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,  // Limit to 1 line for title
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'normal'
                        }}>
                            {/* {task.title.length > 18 ? `${task.title.slice(0, 18)}...` : task.title} */}
                            {task.title}
                        </div>
                        <div>
                            {task.status === 'completed' ?
                                (<FontAwesomeIcon icon={faCheck} beat style={{ color: "#63E6BE", marginLeft: '10px' }} />) :
                                (task.status === 'overdue' ?
                                    (<FontAwesomeIcon icon={faX} bounce style={{ color: "#f1092c", marginLeft: '10px' }} />) :
                                    (<FontAwesomeIcon icon={faSpinner} spin style={{ color: "#74C0FC", marginLeft: '10px' }} />))
                            }
                        </div>
                    </div>
                </Card.Title>
                <Card.Text style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,  // Limit to 1 lines for description
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal'
                }}>
                    {/* {task.description.length > 30 ? `${task.description.slice(0, 30)}...` : task.description} */}
                    {task.description}
                </Card.Text>
                <ListGroup className="list-group-flush" >
                    <ListGroup.Item style={listItemStyle} >
                        <strong>Due Date: </strong>{formattedDate}
                    </ListGroup.Item>
                    <ListGroup.Item style={listItemStyle} >
                        <strong>Priority: </strong>{task.priority}
                    </ListGroup.Item>
                    <ListGroup.Item style={listItemStyle} >
                        <strong>Status: </strong>{task.status}
                    </ListGroup.Item>
                </ListGroup>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    borderTop: '1px solid black',
                    paddingTop: '8px',
                    gap: '5px'
                }}>
                    <Button
                        variant='primary'
                        onClick={() => handleOpenEditModal(task)}
                        disabled={isDisable}
                        style={{ flex: '1 1 30%' }} // Allows wrapping with a minimum size
                    >
                        Edit
                    </Button>
                    <Button
                        variant='danger'
                        onClick={() => handleDeleteTask(task._id)}
                        style={{ flex: '1 1 30%' }} // Allows wrapping with a minimum size
                    >
                        Delete
                    </Button>
                    <Button
                        variant='success'
                        onClick={() => handleMarkTaskAsCompleted(task._id)}
                        disabled={isDisable}
                        style={{ flex: '1 1 30%' }} // Allows wrapping with a minimum size
                    >
                        Complete
                    </Button>
                </div>

            </Card.Body>
        </Card>
    )
}
