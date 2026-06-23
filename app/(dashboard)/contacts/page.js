'use client'; // Required in Next.js for interactive third-party UI components

import React from 'react';
// Correct named imports from react-bootstrap
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import './../../../public/user.png'

// Standardized completely to 'react-icons/fa6' to fix Next.js bundle errors
import { FaPhone, FaCommentDots, FaVideo, FaUserPlus, FaEllipsisVertical } from 'react-icons/fa6';

const contactsData = [
  { id: 1, name: "Abdul Kean", company: "Highspeed Inc.", activeChat: false },
  { id: 2, name: "Angela Moss", company: "Redblue Studios", activeChat: false },
  { id: 3, name: "Brian Samuel", company: "Maximize Team Management", activeChat: true },
  { id: 4, name: "Benny Chagur", company: "Highspeed Inc.", activeChat: false },
  { id: 5, name: "Chyntia Lawra", company: "Zero Two Studios", activeChat: false },
  { id: 6, name: "Cloe Simatupang", company: "Zero Two Studios", activeChat: false },
  { id: 7, name: "Engeline O'conner", company: "Beep Beep Inc.", activeChat: false },
  { id: 8, name: "Franklin Jr.", company: "Zero Two Studios", activeChat: false },
  { id: 9, name: "Geovanny", company: "Ui Designer", activeChat: false },
  { id: 10, name: "Henry Charlotte", company: "Ui Designer", activeChat: false },
  { id: 11, name: "Ivankov Shee", company: "Ui Designer", activeChat: false },
  { id: 12, name: "Nindy Leeacovic", company: "Ui Designer", activeChat: false },
];

const Contacts = () => {
  return (
    <Container className="py-4 bg-light" fluid="lg">

      {/* Dashboard Header */}
      <header className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div className="d-flex gap-4 align-items-center">
          <h5 className="mb-0 fw-bold text-dark">All Contact <Badge bg="success" pill className="ms-1">154</Badge></h5>
          <h5 className="mb-0 text-muted fw-normal d-none d-sm-block">Pending Invitation <Badge bg="warning" text="dark" pill className="ms-1">6</Badge></h5>
        </div>
        <div>
          <Button variant="success" className="d-flex align-items-center gap-2">
            <FaUserPlus /> New Contact
          </Button>
        </div>
      </header>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {contactsData.map((contact) => (
          <Col key={contact.id}>
            <Card className="text-center h-100 border-0 shadow-sm position-relative p-3 rounded-4">

              {/* Menu Dot */}
              <Button variant="link" className="text-muted position-absolute top-0 end-0 m-2 p-1">
                <FaEllipsisVertical size={14} />
              </Button>

              {/* <div className="position-relative mx-auto my-3" style={{ width: '80px', height: '80px' }}>
                <div className="w-100 h-100 rounded-circle bg-secondary bg-opacity-25"></div>
                <span className="position-absolute bottom-0 end-0 border border-white border-2 bg-success rounded-circle p-1" style={{ width: '12px', height: '12px' }}></span>
              </div> */}
              <div>
                <img src='user.png' />
              </div>

              {/* Text Info */}
              <Card.Body>
                <Card.Title className="h6 fw-bold mb-1 text-dark">{contact.name}</Card.Title>
                <Card.Text className="text-muted small mb-4">{contact.company}</Card.Text>
              </Card.Body>

              <div className="d-flex justify-content-center gap-2 mt-auto">
                <Button variant="light" className="rounded-circle text-success d-flex align-items-center justify-content-center border-0" style={{ width: '38px', height: '38px', backgroundColor: '#ebfaf1' }}>
                  <FaPhone size={14} />
                </Button>
                <Button variant={contact.activeChat ? "success" : "light"} className={`rounded-circle d-flex align-items-center justify-content-center border-0 ${!contact.activeChat && 'text-success'}`} style={{ width: '38px', height: '38px', backgroundColor: contact.activeChat ? undefined : '#ebfaf1' }}>
                  <FaCommentDots size={14} />
                </Button>
                <Button variant="light" className="rounded-circle text-success d-flex align-items-center justify-content-center border-0" style={{ width: '38px', height: '38px', backgroundColor: '#ebfaf1' }}>
                  <FaVideo size={14} />
                </Button>
              </div>

            </Card>
          </Col>
        ))}
      </Row>
      <footer className="text-center mt-5">
        <Button variant="outline-success" className="px-5 rounded-3 fw-semibold">
          Load More
        </Button>
      </footer>

    </Container>
  );
};

export default Contacts;