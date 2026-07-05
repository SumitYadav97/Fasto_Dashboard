'use client';
import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import './../../../public/user.png'
import { FaPhone, FaCommentDots, FaVideo, FaUserPlus, FaEllipsisVertical } from 'react-icons/fa6';
import { Grid3x3GapFill, List } from 'react-bootstrap-icons';
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
      <header className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div className="d-flex gap-4 align-items-center">
          <h5 className="mb-0 fw-bold text-dark">All Contact<Button
            className="ms-1 rounded-pill px-3 py-1 btn-sm border-0"
            style={{ backgroundColor: "#43DC80", color: "#ffffff" }} // Swap with your preferred Hex color
          >
            154
          </Button></h5>
          <h5 className="mb-0 text-muted fw-normal d-none d-sm-block">Pending Invitation <Badge bg="warning" text="light" pill className="ms-1">6</Badge></h5>
        </div>
        <div>
          <div className="d-flex align-items-center gap-3">
            <Button variant="success" className="px-4 py-2 rounded-3 fw-bold border-0" style={{ backgroundColor: '#4de193' }}>
              New Project
            </Button>
            <div className="d-flex text-muted gap-2 fs-5">
              <List style={{ cursor: 'pointer' }} className="text-secondary" />
              <Grid3x3GapFill style={{ cursor: 'pointer', opacity: 0.5, color: "#43DC80" }} />
            </div>
          </div>
        </div>
      </header>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {contactsData.map((contact) => (
          <Col key={contact.id}>
            <Card className="text-center h-100 border-0 shadow-sm position-relative p-3 rounded-4">
              <Button variant="link" className="text-muted position-absolute top-0 end-0 m-2 p-1">
                <FaEllipsisVertical size={14} />
              </Button>

              <div>
                <img src='user.png' />
              </div>
              {/* Text Info */}
              <Card.Body>
                <Card.Title className="h6 fw-bold mb-1 text-dark">{contact.name}</Card.Title>
                <Card.Text className="text-muted small mb-4">{contact.company}</Card.Text>
              </Card.Body>
              <div className="d-flex justify-content-center gap-2 mt-auto">
                <Button
                  variant="light"
                  className="rounded-circle text-white d-flex align-items-center justify-content-center border-0"
                  style={{ width: '38px', height: '38px', backgroundColor: '#43DC80' }}
                >
                  <FaPhone size={14} />
                </Button>

                <Button
                  variant="light"
                  className="rounded-circle text-white d-flex align-items-center justify-content-center border-0"
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: contact.activeChat ? '#32b866' : '#43DC80' 
                  }}
                >
                  <FaCommentDots size={14} />
                </Button>

                <Button
                  variant="light"
                  className="rounded-circle text-white d-flex align-items-center justify-content-center border-0"
                  style={{ width: '38px', height: '38px', backgroundColor: '#43DC80' }}
                >
                  <FaVideo size={14} />
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <footer className="text-center mt-5" >
        <Button className="px-5 rounded-3  " style={{ background: "#43DC80", border: "#43DC80" }}>
          Load More
        </Button>
      </footer>

    </Container>
  );
};

export default Contacts;