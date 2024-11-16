import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, ListGroup, Modal, Row, Tab, Tabs } from 'react-bootstrap'
import Habit from '../../components/Habit'
import axios from 'axios'
import CalendarHabit from '../../components/CalendarHabit'

export default function HabitPage() {
  const [dailyHabitList, setDailyHabitList] = useState([]);
  const [weeklyHabitList, setWeeklyHabitList] = useState([]);
  const [monthlyHabitList, setMonthlyHabitList] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [targetCount, setTargetCount] = useState(1);
  const [show, setShow] = useState(false);
  const [habitIdToEdit, setHabitIdToEdit] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  // fetch habit list follow by frequency from server
  const fetchHabit = async () => {
    const userId = getUserIdFromLocalStorage();
    if (!userId) return;

    try {
      const res = await axios.get(`http://localhost:3001/api/getHabit/${userId}`);
      setDailyHabitList(res.data.dailyHabits || []);
      setWeeklyHabitList(res.data.weeklyHabits || []);
      setMonthlyHabitList(res.data.monthlyHabits || []);
      console.log('Fetch habit list successfully!');
    } catch (error) {
      console.error('Error fetching habits', error);
    }
  }

  useEffect(() => {
    fetchHabit();
  }, []);

  useEffect(() => {
    if (frequency === 'daily') {
      setTargetCount(1); // Cập nhật targetCount về 1 khi frequency là daily
    }
  }, [frequency]);

  // get useId from local storage
  const getUserIdFromLocalStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      return user._id || null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  // handle add habit
  const handleAddHabit = async (e) => {
    e.preventDefault();
    // get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const reqData = {
      user,
      name,
      description,
      frequency,
      targetCount
    }
    console.log(reqData);
    try {
      const res = await axios.post('http://localhost:3001/api/addHabit', reqData);
      const newHabit = res.data.habit;
      switch (newHabit.frequency) {
        case 'daily':
          setDailyHabitList((prevHabit) => [...prevHabit, newHabit]);
          console.log(`Add new habit successfully`, newHabit);
          break;
        case 'weekly':
          setWeeklyHabitList((prevHabit) => [...prevHabit, newHabit]);
          console.log(`Add new habit successfully`, newHabit);
          break;
        default:
          setMonthlyHabitList((prevHabit) => [...prevHabit, newHabit]);
          console.log(`Add new habit successfully`, newHabit);
          break;
      }
    } catch (error) {
      console.error('Error adding habit', error);
    }
    handleClose();
  };

  // handle show modal
  const handleShow = () => setShow(true);

  // handle close modal
  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
    setFrequency('');
    setTargetCount(1);
    setHabitIdToEdit(null);
  };

  // handle show edit modal
  const handleOpenEditModal = (habit) => {
    setHabitIdToEdit(habit._id);
    setName(habit.name);
    setDescription(habit.description);
    setFrequency(habit.frequency);
    setTargetCount(habit.targetCount);
    setShow(true);
  }

  // handle delete habit
  const handleDeleteHabit = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteHabit/${id}`);
      setDailyHabitList((prev) => prev.filter(habit => habit._id !== id));
      setWeeklyHabitList((prev) => prev.filter(habit => habit._id !== id));
      setMonthlyHabitList((prev) => prev.filter(habit => habit._id !== id));
      console.log(`Delete habit with id: ${id} successfully!`);
    } catch (error) {
      console.error('Error deleting habit', error);
    }
  };

  // hanlde edit habit
  const handleEditHabit = async (e) => {
    e.preventDefault();

    const reqData = {
      name,
      description,
      frequency,
      targetCount
    };

    try {
      const res = await axios.put(`http://localhost:3001/api/editHabit/${habitIdToEdit}`, reqData);
      const updatedHabit = res.data.updatedHabit;
      setDailyHabitList((prev) => {
        return prev.map((habit) => {
          return habit._id === updatedHabit._id ? updatedHabit : habit
        })
      });
      setWeeklyHabitList((prev) => {
        return prev.map((habit) => {
          return habit._id === updatedHabit._id ? updatedHabit : habit
        })
      });
      setMonthlyHabitList((prev) => {
        return prev.map((habit) => {
          return habit._id === updatedHabit._id ? updatedHabit : habit
        })
      });
      console.log('Update habit successfully!', updatedHabit);
    } catch (error) {
      console.error('Error editing habit', error);
    }
    handleClose();
  };

  // handle show calendar
  const handleShowCalendar = (habit) => {
    setSelectedHabit(habit);
    setShowCalendar(true);
  };

  // handle close calendar
  const handleCloseCalendar = () => {
    setSelectedHabit(null);
    setShowCalendar(false);
  };

  // handle mark habit as completed
  const handleMarkHabitAsCompleted = async (habit) => {
    const today = new Date().toISOString().split('T')[0]; // Chỉ lấy phần ngày
    console.log('Today:', today);

    // Kiểm tra nếu ngày đã tồn tại trong danh sách
    const completedDates = habit.completedDates.map(date => new Date(date).toISOString().split('T')[0]);
    if (completedDates.includes(today)) {
      alert('Habit has already been completed for today!');
      return;
    }

    const reqData = {
      date: today, // Gửi ngày dưới dạng YYYY-MM-DD
    };

    try {
      const res = await axios.put(`http://localhost:3001/api/markHabitAsCompleted/${habit._id}`, reqData);
      const updatedHabit = res.data.updatedHabit;

      // Update habit lists
      setDailyHabitList((prev) => prev.map(h => h._id === updatedHabit._id ? updatedHabit : h));
      setWeeklyHabitList((prev) => prev.map(h => h._id === updatedHabit._id ? updatedHabit : h));
      setMonthlyHabitList((prev) => prev.map(h => h._id === updatedHabit._id ? updatedHabit : h));

      console.log('Habit has been marked as completed for today!');
    } catch (error) {
      console.error('Error marking habit', error);
    }
  };

  return (
    <div className='habitpage-container p-2'>
      {/* header contains add button */}
      <div className='habitpage-container-header d-flex justify-content-center align-items-center'>
        <Button
          className='d-flex flex-row align-items-center justify-content-center mb-2'
          style={{ gap: '8px' }}
          onClick={handleShow}
        >
          <FontAwesomeIcon icon={faPlus} />
          <div>Add Habit</div>
        </Button>
      </div>
      {/* Modal with form inside */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form
            onSubmit={habitIdToEdit ? handleEditHabit : handleAddHabit}
            style={{ border: '1px solid black', padding: '10px', borderRadius: '10px' }}
          >
            <Row className='mb-3'>
              {/* Habit name field */}
              <Form.Group as={Col}>
                <Form.Label><strong>Name:</strong></Form.Label>
                <Form.Control
                  required
                  type='text'
                  value={name}
                  placeholder='Enter your habit name'
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* Habit description field */}
              <Form.Group as={Col}>
                <Form.Label><strong>Description:</strong></Form.Label>
                <Form.Control
                  type='text'
                  value={description}
                  placeholder='Enter your habit description'
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              {/* Habit frequency field */}
              <Form.Group as={Col}>
                <Form.Label><strong>Frequency:</strong></Form.Label>
                <Dropdown onSelect={(eventKey) => setFrequency(eventKey)}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {frequency || 'Frequency'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey={'daily'}>daily</Dropdown.Item>
                    <Dropdown.Item eventKey={'weekly'}>weekly</Dropdown.Item>
                    <Dropdown.Item eventKey={'monthly'}>monthly</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              {/* Habit target count field */}
              <Form.Group as={Col}>
                <Form.Label><strong>Target count:</strong></Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={targetCount}
                  placeholder="Enter your target count"
                  disabled={frequency === 'daily'} // disable when frequency is 'daily'
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    // Xác định giới hạn dựa trên frequency
                    let maxTarget = 1; // Default for daily
                    if (frequency === 'weekly') {
                      maxTarget = 7; // Weekly habits, max 7
                    } else if (frequency === 'monthly') {
                      // Lấy số ngày của tháng hiện tại
                      const today = new Date();
                      maxTarget = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // Last day of current month
                    }

                    // Kiểm tra giá trị nhập vào không vượt quá maxTarget
                    if (inputValue <= maxTarget) {
                      setTargetCount(inputValue); // Chỉ cập nhật nếu hợp lệ
                    }
                  }}
                  max={
                    frequency === 'weekly' ? 7 :
                      frequency === 'monthly' ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() : 1
                  } // Thiết lập max giá trị
                ></Form.Control>
                {frequency === 'daily' && (
                  <Form.Text className="text-muted">
                    Target count is default 1 applicable for daily frequency.
                  </Form.Text>
                )}
                {frequency === 'weekly' && (
                  <Form.Text className="text-muted">
                    Maximum target count for weekly frequency is 7.
                  </Form.Text>
                )}
                {frequency === 'monthly' && (
                  <Form.Text className="text-muted">
                    Maximum target count for monthly frequency is the number of days in the current month.
                  </Form.Text>
                )}
              </Form.Group>
            </Row>
            {/* div contains submit btn for form */}
            <div className='d-flex justify-content-center'>
              <Button type='submit'>
                {habitIdToEdit ? 'Update Habit' : 'Add Habit'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Popup calender for viewing details habit */}
      <CalendarHabit s
        showCalendar={showCalendar}
        handleCloseCalendar={handleCloseCalendar}
        selectedHabit={selectedHabit}
      />
      {/* Tab for showing habits by frequency */}
      <Tabs
        defaultActiveKey="weekly"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        {/* Tab for daily */}
        <Tab eventKey="daily" title="Daily">
          <div className='daily-habit-list'>
            <ListGroup>
              {dailyHabitList.map((dailyHabit) => (
                <Habit
                  key={dailyHabit._id}
                  habit={dailyHabit}
                  handleOpenEditModal={handleOpenEditModal}
                  handleDeleteHabit={handleDeleteHabit}
                  handleShowCalendar={handleShowCalendar}
                  handleMarkHabitAsCompleted={handleMarkHabitAsCompleted}
                />
              ))}
            </ListGroup>
          </div>
        </Tab>
        {/* Tab for weekly */}
        <Tab eventKey="weekly" title="Weekly">
          <div className='weekly-habit-list'>
            <ListGroup>
              {weeklyHabitList.map((weeklyHabit) => (
                <Habit
                  key={weeklyHabit._id}
                  habit={weeklyHabit}
                  handleOpenEditModal={handleOpenEditModal}
                  handleDeleteHabit={handleDeleteHabit}
                  handleShowCalendar={handleShowCalendar}
                  handleMarkHabitAsCompleted={handleMarkHabitAsCompleted}
                />
              ))}
            </ListGroup>
          </div>
        </Tab>
        {/* Tab for monthly */}
        <Tab eventKey="monthly" title="Monthly">
          <div className='monthly-habit-list'>
            <ListGroup>
              {monthlyHabitList.map((monthlyHabit) => (
                <Habit
                  key={monthlyHabit._id}
                  habit={monthlyHabit}
                  handleOpenEditModal={handleOpenEditModal}
                  handleDeleteHabit={handleDeleteHabit}
                  handleShowCalendar={handleShowCalendar}
                  handleMarkHabitAsCompleted={handleMarkHabitAsCompleted}
                />
              ))}
            </ListGroup>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
