import React, { useEffect, useState } from 'react'
import CalendarTransaction from '../../components/CalendarTransaction'
import Transaction from '../../components/Transaction'
import { Button, Col, Dropdown, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, isToday } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ConsumptionPage.css';

export default function ConsumptionPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactionList, setTransactionList] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState('');
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [transactionIdToEdit, setTransactionIdToEdit] = useState(null);

  // fetch transaction list by day
  const fetchTransactionByDay = async () => {
    const userID = getUserIdFromLocalStorage();
    if (!userID) return;

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    try {
      const res = await axios.get(`http://localhost:3001/api/getTransaction/${userID}/${formattedDate}`);
      setTransactionList(res.data.transactions || []);
    } catch (error) {
      console.error("Error:", error);
      setTransactionList([]);
    }
  };

  useEffect(() => {
    fetchTransactionByDay();
    getTotalAmount();
  }, [selectedDate]);

  useEffect(() => {
    getTotalAmount();
  }, [transactionList]);

  // calculate total amount income / expense transaction
  const getTotalAmount = () => {
    let total_income = 0;
    let total_expense = 0;

    transactionList.forEach(transaction => {
      if (transaction.type === 'Income') {
        total_income += transaction.amount;
      } else if (transaction.type === 'Expense') {
        total_expense += transaction.amount;
      }
    });

    setTotalIncome(total_income);
    setTotalExpense(total_expense);
  };

  // handle selet other day
  const handleDateChange = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
  };

  const handleShow = () => setShow(true); // handle show modal

  // handle close modal
  const handleClose = () => {
    setShow(false);
    setType('Income');
    setCategory('');
    setAmount(0);
    setDescription('');
    setTransactionIdToEdit(null);
  }

  // handle show edit modal 
  const handleOpenEditModal = (transaction) => {
    setTransactionIdToEdit(transaction._id);
    setType(transaction.type);
    setCategory(transaction.category);
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setShow(true);
  }

  // handle type switch
  const toggleType = () => {
    setType(prevType => (prevType === 'Income' ? 'Expense' : 'Income'));
    setCategory(''); // Clear category selection when switching types
  };

  // Get user id from local storage
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

  // handle add new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    // Get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    const reqData = {
      user,
      type,
      category,
      amount,
      description
    };

    try {
      const res = await axios.post('http://localhost:3001/api/addTransaction', reqData);
      setTransactionList((prevTransaction) => {
        return [...prevTransaction, res.data.transaction];
      });
      console.log('Add transaction successfully');
      toast.success(`A ${res.data.transaction.type} transaction for ${res.data.transaction.category} has been added!`);
    } catch (error) {
      console.error("Error: ", error);
      console.log('Failed to add transaction!')
      toast.error('Failed to add transaction!');
    }

    // close modal
    handleClose();
  };


  // Format display for total amout
  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B'; // Billions
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M'; // Millions
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K'; // Thousands
    } else {
      return num.toString(); // Normal format
    }
  };

  // handle delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteTransaction/${id}`);
      setTransactionList(transactionList.filter((transaction) => transaction._id !== id));
      console.log('Delete transaction successfully!');
      toast.success('Delete transaction successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Delete transaction failed!');
    }
  };

  // handle edit transaction
  const handleEditTransaction = async (e) => {
    e.preventDefault();

    const reqData = {
      type, 
      category, 
      amount,
      description
    };

    try {
      const res = await axios.put(`http://localhost:3001/api/editTransaction/${transactionIdToEdit}`, reqData);
      const updatedTransaction = res.data.updatedTransaction;
      console.log(updatedTransaction);
      setTransactionList((prevTransactionList) => 
        prevTransactionList.map((transaction) => 
          transaction._id === updatedTransaction._id ? updatedTransaction : transaction)
      );
      console.log('Update transaction successfully');
      toast.success('Update transaction successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Update transaction failed!');
    }

    // close modal after edit
    handleClose();
  };

  return (
    <div className='consumptionpage-container p-2'>
      {/* header contains calender component for selecting day */}
      <div className='consumption-header'>
        <CalendarTransaction onDateChange={handleDateChange} />
      </div>
      <div className='consumption-main'>
        <div className='total-transactions d-flex flex-row justify-content-between align-items-center mb-3'>
          {/* display total incomes of selected day */}
          <div className='total-incomes'>
            <strong style={{color: 'green'}}>Income: {formatNumber(totalIncome)}</strong>
          </div>
          {/* add transaction btn just display when selected date is today */}
          {isToday(selectedDate) && (
            <Button
              className='d-flex flex-row justify-content-center align-items-center'
              style={{ gap: '8px' }}
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={faPlus} />
              {/* Add Transaction for {format(selectedDate, "yyyy-MM-dd").toString()} */}
              <div className='add-btn-text'>Add Transaction</div>
            </Button>
          )}
          {/* display total expenses of selected day */}
          <div className='total-expenses'>
            <strong style={{color: 'red'}}>Expense: {formatNumber(totalExpense)}</strong>
          </div>
        </div>

        {/* Modal with the form inside */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form
              onSubmit={transactionIdToEdit ? handleEditTransaction : handleAddTransaction}
              style={{ border: '1px solid black', padding: '10px', borderRadius: '10px' }}
            >
              <Row className='mb-3'>
                {/* Transaction type field */}
                <Form.Group as={Col} >
                  <Form.Label><strong>Type:</strong></Form.Label>
                  <div className='d-flex flex-row justify-content-between'>
                    <Form.Label>Income</Form.Label>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={type === 'Expense'}
                      onChange={toggleType}
                    />
                    <Form.Label>Expense</Form.Label>
                  </div>
                </Form.Group>
                {/* Transaction category field */}
                <Form.Group as={Col}>
                  <Form.Label><strong>Category:</strong></Form.Label>
                  <Dropdown onSelect={(eventKey) => setCategory(eventKey)}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {category || `${type} category`}
                    </Dropdown.Toggle>
                    {type === 'Income' ?
                      (<Dropdown.Menu>
                        <Dropdown.Item eventKey={'Salary'}>Salary</Dropdown.Item>
                        <Dropdown.Item eventKey={'Business Profit'}>Business Profit</Dropdown.Item>
                        <Dropdown.Item eventKey={'Investment Returns'}>Investment Returns</Dropdown.Item>
                        <Dropdown.Item eventKey={'Freelancing'}>Freelancing</Dropdown.Item>
                        <Dropdown.Item eventKey={'Rental Income'}>Rental Income</Dropdown.Item>
                        <Dropdown.Item eventKey={'Gift or Donation'}>Gift or Donation</Dropdown.Item>
                        <Dropdown.Item eventKey={'Interest Income'}>Interest Income</Dropdown.Item>
                        <Dropdown.Item eventKey={'Dividends'}>Dividends</Dropdown.Item>
                        <Dropdown.Item eventKey={'Refunds'}>Refunds</Dropdown.Item>
                        <Dropdown.Item eventKey={'Bonuses'}>Bonuses</Dropdown.Item>
                        <Dropdown.Item eventKey={'Other'}>Other</Dropdown.Item>
                      </Dropdown.Menu>)
                      :
                      (<Dropdown.Menu>
                        <Dropdown.Item eventKey={'Rent or Mortgage'}>Rent or Mortgage</Dropdown.Item>
                        <Dropdown.Item eventKey={'Groceries'}>Groceries</Dropdown.Item>
                        <Dropdown.Item eventKey={'Utilities'}>Utilities</Dropdown.Item>
                        <Dropdown.Item eventKey={'Transportation'}>Transportation</Dropdown.Item>
                        <Dropdown.Item eventKey={'Insurance'}>Insurance</Dropdown.Item>
                        <Dropdown.Item eventKey={'Entertainment'}>Entertainment</Dropdown.Item>
                        <Dropdown.Item eventKey={'Dining Out'}>Dining Out</Dropdown.Item>
                        <Dropdown.Item eventKey={'Healthcare'}>Healthcare</Dropdown.Item>
                        <Dropdown.Item eventKey={'Debt Payments'}>Debt Payments</Dropdown.Item>
                        <Dropdown.Item eventKey={'Subscriptions'}>Subscriptions</Dropdown.Item>
                        <Dropdown.Item eventKey={'Shopping'}>Shopping</Dropdown.Item>
                        <Dropdown.Item eventKey={'Travel'}>Travel</Dropdown.Item>
                        <Dropdown.Item eventKey={'Other'}>Other</Dropdown.Item>
                      </Dropdown.Menu>)
                    }
                  </Dropdown>
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                {/* Transaction amount field */}
                <Form.Group as={Col}>
                  <Form.Label><strong>Amount:</strong></Form.Label>
                  <Form.Control
                    type='number'
                    value={amount}
                    required
                    placeholder='Enter your amount of transaction'
                    onChange={(e) => setAmount(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {/* Transaction description field */}
                <Form.Group as={Col}>
                  <Form.Label><strong>Description:</strong></Form.Label>
                  <Form.Control
                    type='text'
                    value={description}
                    placeholder='Transaction description'
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Row>
              {/* div contains submit btn for form */}
              <div className='d-flex justify-content-center'>
                <Button type='submit'>{transactionIdToEdit ? 'Update Transaction'  : 'Add Transaction'}</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        {/* div contains transaction list */}
        <div className='transaction-list d-flex justify-content-center'>
          {transactionList.length > 0 ? (
            <ListGroup style={{ width: '100%' }}>
              {transactionList.map((transaction) => (
                <Transaction 
                  key={transaction._id} 
                  transaction={transaction} 
                  formatNumber={formatNumber} 
                  handleDeleteTransaction={handleDeleteTransaction}
                  handleOpenEditModal={handleOpenEditModal}
                />
              ))}
            </ListGroup>
          ) : (
            <div>No transactions for this day</div>
          )}
        </div>
      </div>
    </div>
  )
}
