'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../store/contactSlice';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { FaPhone, FaCommentDots, FaVideo, FaEllipsisVertical } from 'react-icons/fa6';
import { Grid3x3GapFill, List } from 'react-bootstrap-icons';

// Import the mock data from your data directory
import { contactsData } from './../Data/contacts/page';
const Contacts = () => {
  const dispatch = useDispatch();
  const customContacts = useSelector((state) => state.contacts.customContacts);
  const allCombinedData = [...customContacts, ...contactsData];

  // --- State Hooks ---
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('all'); // 'all' or 'pending'
  const itemsPerPage = 12;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    activeChat: 'false'
  });
  const totalItems = allCombinedData.length;

  const totalPendingCount = allCombinedData.filter(
    (contact) => contact.activeChat === true || contact.activeChat === 'true'
  ).length;

  const filteredContacts = allCombinedData.filter((contact) => {
    if (filterType === 'pending') {
      return contact.activeChat === true || contact.activeChat === 'true';
    }
    return true;
  });
  const displayCount = filteredContacts.length;
  const totalPages = Math.ceil(displayCount / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    const isActive = number === currentPage;
    paginationItems.push(
      <button
        key={number}
        onClick={() => setCurrentPage(number)}
        className="border-0 d-flex align-items-center justify-content-center fw-semibold transition-all"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: isActive ? '#32b866' : 'transparent',
          color: isActive ? '#ffffff' : '#555555',
          fontSize: '0.9rem',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        {number}
      </button>
    );
  }
  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10';
    const newContactItem = {
      id: `CON-${Math.floor(10000 + Math.random() * 90000)}`,
      name: formData.name || 'New Contact',
      company: formData.company,
      activeChat: formData.activeChat === 'true',
      avatar: defaultAvatar
    };
    dispatch(addContact(newContactItem));

    setFormData({ name: '', company: '', activeChat: 'false' });
    setShowModal(false);
  };
  return (
    <Container className="py-4 bg-light" fluid="lg">
      <header className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div className="d-flex gap-4 align-items-center">
          {/* ALL CONTACTS BUTTON */}
          <h5
            className="mb-0 fw-bold text-dark d-flex align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => handleFilterChange('all')}
          >
            All Contact
            <span
              className="ms-2 d-inline-flex align-items-center justify-content-center rounded-pill fw-bold text-white"
              style={{
                backgroundColor: '#43DC80',
                fontSize: '0.75rem',
                padding: '0.25rem 0.6rem',
                minWidth: '24px',
                height: '20px'
              }}
            >
              {totalItems}
            </span>
          </h5>
          {/* PENDING INVITATIONS  BUTTON */}
          <Button
            variant="link"
            className="p-0 text-decoration-none d-none d-sm-block align-items-center"
            onClick={() => handleFilterChange(filterType === 'pending' ? 'all' : 'pending')}
          >
            <h5 className="mb-0 text-dark fw-bold d-flex align-items-center">
              Pending Invitation
              <span
                className="ms-2 d-inline-flex align-items-center justify-content-center rounded-pill fw-bold text-white"
                style={{
                  backgroundColor: '#FFAB2D',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.6rem',
                  minWidth: '24px',
                  height: '20px'
                }}
              >
                {totalPendingCount}
              </span>
            </h5>
          </Button>
        </div>
        <div>
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="success"
              className="px-4 py-2 rounded-3 fw-bold border-0"
              style={{ backgroundColor: '#4de193' }}
              onClick={() => setShowModal(true)}
            >
              New Contact
            </Button>
            <div className="d-flex text-muted gap-2 fs-5">
              <List style={{ cursor: 'pointer' }} className="text-secondary" />
              <Grid3x3GapFill style={{ cursor: 'pointer', opacity: 0.5, color: "#43DC80" }} />
            </div>
          </div>
        </div>
      </header>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {currentContacts.length > 0 ? (
          currentContacts.map((contact) => (
            <Col key={contact.id}>
              <Card className="text-center h-100 border-0 shadow-sm position-relative p-3 pt-4 rounded-4">
                {/* Options menu top right */}
                <Button variant="link" className="text-muted position-absolute top-0 end-0 m-2 p-1">
                  <FaEllipsisVertical size={16} />
                </Button>

                <div className="position-relative d-inline-block mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                  <img
                    src={contact.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10'}
                    style={{
                      height: '80px',
                      width: '80px',
                      objectFit: 'cover',
                      backgroundColor: '#c4c4c4'
                    }}
                    className="rounded-circle"
                    alt={contact.name}
                  />
                  {/* Green Status Dot Indicator styling for online users */}
                  {(contact.activeChat === true || contact.activeChat === 'true') && (
                    <span
                      className="position-absolute rounded-circle border border-2 border-white shadow-sm"
                      style={{
                        bottom: '4px',
                        right: '4px',
                        width: '18px',
                        height: '18px',
                        backgroundColor: '#43DC80',
                        zIndex: 2
                      }}
                    />
                  )}
                </div>
                <Card.Body className="p-0 mb-4">
                  <Card.Title className="h5 fw-bold mb-1 text-dark" style={{ letterSpacing: '-0.3px' }}>
                    {contact.name}
                  </Card.Title>
                  <Card.Text className="text-muted small fw-medium">{contact.company}</Card.Text>
                </Card.Body>

                <div className="d-flex justify-content-center gap-3 mt-auto pb-2">
                  <Button
                    variant="light"
                    className="rounded-circle d-flex align-items-center justify-content-center border-0"
                    style={{ width: '42px', height: '42px', backgroundColor: '#e2fbf0', color: '#32b866' }}
                  >
                    <FaPhone size={15} />
                  </Button>

                  <Button
                    variant="light"
                    className="rounded-circle d-flex align-items-center justify-content-center border-0"
                    style={{ width: '42px', height: '42px', backgroundColor: '#e2fbf0', color: '#32b866' }}
                  >
                    <FaCommentDots size={15} />
                  </Button>

                  <Button
                    variant="light"
                    className="rounded-circle d-flex align-items-center justify-content-center border-0"
                    style={{ width: '42px', height: '42px', backgroundColor: '#e2fbf0', color: '#32b866' }}
                  >
                    <FaVideo size={15} />
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center py-5 text-muted">
            No contacts found matching criteria.
          </Col>
        )}
      </Row>
      {totalPages > 1 && (
        <footer className="d-flex justify-content-center align-items-center gap-3 mt-5 user-select-none">
          {/* Previous Capsule Action Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn bg-white d-inline-flex align-items-center justify-content-center gap-2 fw-medium px-4 py-2 rounded-pill shadow-sm transition-all"
            style={{
              border: '1px solid #43DC80',
              color: '#32b866',
              opacity: currentPage === 1 ? 0.4 : 1,
              fontSize: '0.95rem'
            }}
          >
            <span>&lt;&lt;</span> Previous
          </button>
          <div
            className="d-inline-flex align-items-center gap-1 p-1 rounded-pill"
            style={{ backgroundColor: '#f0f0f2' }}
          >
            {paginationItems}
          </div>

          {/* Next Capsule Action Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn bg-white d-inline-flex align-items-center justify-content-center gap-2 fw-medium px-4 py-2 rounded-pill shadow-sm transition-all"
            style={{
              border: '1px solid #43DC80',
              color: '#32b866',
              opacity: currentPage === totalPages ? 0.4 : 1,
              fontSize: '0.95rem'
            }}
          >
            Next <span>&gt;&gt;</span>
          </button>
        </footer>
      )}

      {/* MODAL CONFIG FOR ADDING COMPLIANT CONTACT OBJECT SCHEMAS */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-dark fs-5">Add New Contact</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="py-3">
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Company / Role</Form.Label>
              <Form.Control
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Google Inc."
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small text-muted fw-bold">Invitation Status (Active Chat)</Form.Label>
              <Form.Select
                name="activeChat"
                value={formData.activeChat}
                onChange={handleInputChange}
                style={{ borderRadius: "8px" }}
              >
                <option value="false">Connected (All Contacts)</option>
                <option value="true">Pending Invitation</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button
              variant="light"
              onClick={() => setShowModal(false)}
              style={{ borderRadius: "8px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white border-0"
              style={{ backgroundColor: "#2ECC71", borderRadius: "8px" }}
            >
              Save Contact
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Contacts;