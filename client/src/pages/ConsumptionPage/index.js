import React, { useState } from 'react'
import CalendarComponent from '../../components/CalendarComponent'
import Transaction from '../../components/Transaction'
import { Button, Col, Dropdown, DropdownItem, Form, FormLabel, ListGroup, Modal, Row } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';

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

  const handleDateChange = (day) => {
    setSelectedDate(day);
    const formattedDate = format(day, "yyyy-MM-dd");
  };

  const handleShow = () => setShow(true); // handle show modal
  // handle close modal
  const handleClose = () => {
    setShow(false);
    setType('Income');
    setCategory('');
    setAmount(0);
    setDescription('');
  }

  // handle type switch
  const toggleType = () => {
    setType(prevType => (prevType === 'Income' ? 'Expense' : 'Income'));
    setCategory(''); // Clear category selection when switching types
  };

  // handle add new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();

    // close modal
    handleClose();
  };

  return (
    <div className='consumptionpage-container p-2'>
      <div className='consumption-header'>
        <CalendarComponent onDateChange={handleDateChange} />
      </div>
      <div className='consumption-main'>
        <div className='total-transactions d-flex flex-row justify-content-between align-items-center mb-3'>
          <div className='total-incomes'>
            <strong>Income: {totalIncome}</strong>
          </div>
          <Button
            className='d-flex flex-row justify-content-center align-items-center'
            style={{ gap: '8px' }}
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Transaction for {selectedDate.toDateString()}
          </Button>
          <div className='total-expenses'>
            <strong>Expense: {totalExpense}</strong>
          </div>
        </div>

        {/* Modal with the form inside */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form 
              onSubmit={handleAddTransaction}
              style={{ border: '1px solid black', padding: '10px', borderRadius: '10px' }}
            >
              <Row className='mb-3'>
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
              <div className='d-flex justify-content-center'>
                <Button type='submit'>Add Transaction</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <div className='transaction-list'>
          <ListGroup>
            {/* Render transaction list here */}


          </ListGroup>
        </div>
      </div>
    </div>
  )
}
