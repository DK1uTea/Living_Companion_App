import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Dropdown, Button, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Task from '../../components/Task';
import axios from 'axios';

export default function TodoPage() {
  const [show, setShow] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('');

  const fetchTasks = async () => {
    const userID = getUserIdFromLocalStorage();
    if (!userID) return; 

    try {
      const res = await axios.get(`http://localhost:3001/api/getTasks/${userID}`);
      setTodoList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getUserIdFromLocalStorage = () => {   
    try {
      const user = JSON.parse(localStorage.getItem('user'));     
      console.log(user);
      return user._id;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));  
    const taskDueDate = new Date(dueDate);

    const reqData = {
      user,
      title,
      description,
      dueDate: taskDueDate,
      priority: priority.toLowerCase(),
    };

    try {
      const res = await axios.post('http://localhost:3001/api/addTask', reqData);
      console.log('Add task succesfully!');
      setTodoList((prevTodoList) => {
        return [res.data.task, ...prevTodoList];
      });
    } catch (error) {
      console.error(error);
    }

    // Close Modal
    handleClose();
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-do Tracking</h1>

      {/* Button to trigger the modal */}
      <Button variant='primary' onClick={handleShow} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FontAwesomeIcon icon={faPlus} />
        Add Task
      </Button>

      {/* Modal with the form inside */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={handleAddTask} style={{ border: '1px solid black', padding: '10px', borderRadius: '10px' }}>
            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>Task title:</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Enter your task title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Task description:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your task description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>Due Date:</Form.Label>
                <Form.Control
                  type='Date'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Priority:</Form.Label>
                <Dropdown onSelect={(eventKey) => setPriority(eventKey)}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {priority || 'Choose priority'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey={'Low'}>Low</Dropdown.Item>
                    <Dropdown.Item eventKey={'Medium'}>Medium</Dropdown.Item>
                    <Dropdown.Item eventKey={'High'}>High</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Row>
            <Button type='submit'>Add Task</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Display existing tasks */}
      <Container className='task-display mt-3'>
        <Row>
          {todoList.map((task) => (
            <Col key={task._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Task task={task} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
