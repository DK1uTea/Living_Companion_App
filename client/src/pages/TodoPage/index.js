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
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [taskIdToEdit, setTaskIdToEdit] = useState(null);

  // Fetch all tasks of user
  const fetchTasks = async () => {
    const userID = getUserIdFromLocalStorage();
    if (!userID) return; 

    try {
      const res = await axios.get(`http://localhost:3001/api/getTasks/${userID}`);
      setTodoList(res.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Get user id from local storage
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

  // Handle Add Task
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

  // Handle Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteTask/${id}`);
      setTodoList(todoList.filter((task) => task._id !== id));
      console.log('Delete task successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Edit Task
  const handleEditTask = async (e) => {
    e.preventDefault();
    const taskDueDate = new Date(dueDate);

    const reqData = {
      title,
      description,
      dueDate: taskDueDate,
      priority: priority.toLowerCase(),
    };

    console.log(reqData);

    try {
      const res = await axios.put(`http://localhost:3001/api/editTask/${taskIdToEdit}`, reqData);
      const updatedTask = res.data.updatedTask;
      console.log(updatedTask);
      // Update the specific task in the todoList using map
      setTodoList((prevTodoList) =>
        prevTodoList.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      console.log('Updated task succesfully');
    } catch (error) {
      console.error(error);
    }

    handleClose(); // clode modal
  };

  const handleShow = () => setShow(true); // handle show modal
  const handleClose = () => { // handle close modal
    setShow(false);
    setTaskIdToEdit(null);
    setTitle('');
    setDescription('');
    setDueDate(null);
    setPriority('');
  };

  // Open modal for editing task
  const handleOpenEditModal = (task) => {
    setTaskIdToEdit(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate ? task.dueDate.split('T')[0] : null);
    setPriority(task.priority);
    setShow(true);
  };

  // Handle Mark task as completed
  const handleMarkTaskAsCompleted = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/markTaskAsCompleted/${id}`);
      const taskCompleted = res.data.task;
      // Update the specific task in the todoList using map
      setTodoList((prevTodoList) =>
        prevTodoList.map((task) =>
          task._id === taskCompleted._id ? taskCompleted : task
        )
      );
      console.log('Task has been marked as completed!');
    } catch (error) {
      console.error(error);
    }
  }

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
          <Form onSubmit={taskIdToEdit ? handleEditTask : handleAddTask} 
                style={{ border: '1px solid black', padding: '10px', borderRadius: '10px' }}
          >
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
            <Button type='submit'>{taskIdToEdit ? 'Update Task' : 'Add Task'}</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Display existing tasks */}
      <Container className='task-display mt-3'>
        <Row>
          {todoList.map((task) => (
            <Col key={task._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Task 
                task={task} 
                handleDeleteTask={handleDeleteTask} 
                handleOpenEditModal={handleOpenEditModal} 
                handleMarkTaskAsCompleted={handleMarkTaskAsCompleted}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
