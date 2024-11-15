import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX, faSpinner, faPenToSquare, faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

// function for formatting date
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
                        {/* display title */}
                        <div style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,  // Limit to 1 line for title
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'normal'
                        }}>
                            {task.title}
                        </div>
                        {/* display status icon */}
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
                {/* display description */}
                <Card.Text style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,  // Limit to 1 lines for description
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal'
                }}>
                    {task.description}
                </Card.Text>
                <ListGroup className="list-group-flush" >
                    {/* display duedate */}
                    <ListGroup.Item style={listItemStyle} >
                        <strong>Due Date: </strong>{formattedDate}
                    </ListGroup.Item>
                    {/* display priority */}
                    <ListGroup.Item style={listItemStyle} >
                        <strong>Priority: </strong>{task.priority}
                    </ListGroup.Item>
                    {/* display status */}
                    <ListGroup.Item style={listItemStyle} >
                        <strong>Status: </strong>{task.status}
                    </ListGroup.Item>
                </ListGroup>
                {/* div contains btn to click for updating, deleting, marking */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    borderTop: '1px solid black',
                    paddingTop: '8px',
                    gap: '5px'
                }}>
                    {/* btn edit */}
                    <Button
                        variant='primary'
                        onClick={() => handleOpenEditModal(task)}
                        disabled={isDisable}
                        style={{ flex: '1 1 30%' }} // Allows wrapping with a minimum size
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    {/* btn delete */}
                    <Button
                        variant='danger'
                        onClick={() => handleDeleteTask(task._id)}
                        style={{ flex: '1 1 30%' }} // Allows wrapping with a minimum size
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    {/* btn mark as complete */}
                    <Button
                        variant='success'
                        onClick={() => handleMarkTaskAsCompleted(task._id)}
                        disabled={isDisable}
                        style={{ flex: '1 1 30%' }} // Allows wrapping with a minimum size
                    >
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
