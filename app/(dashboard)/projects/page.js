"use client";
import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Pagination } from 'react-bootstrap';
import { Calendar2DateFill, LightningFill, ThreeDotsVertical, List, Grid3x3GapFill } from 'react-bootstrap-icons';
import './../../../public/deadline.png'
import './../../../public/user2.png'
const projectsData = [
  {
    id: '#P-000441425',
    title: 'Redesign Kripton Mobile App',
    createdDate: 'Sep 8th, 2020',
    client: 'Alex Noer',
    pic: 'Yoast Esec',
    deadline: 'Tuesday, Sep 29th 2020',
    status: 'PENDING',
    statusColor: 'warning',

  },
  {
    id: '#P-000441425',
    title: 'Build Branding Persona for Etza.id',
    createdDate: 'Sep 8th, 2020',
    client: 'Kevin Sigh',
    pic: 'Yuri Hanako',
    deadline: 'Monday, Sep 26th 2020',
    status: 'ON PROGRESS',
    statusColor: 'info',
  },
  {
    id: '#P-000441425',
    title: 'Reduce Website Page Size Omah',
    createdDate: 'Sep 8th, 2020',
    client: 'Endge Aes',
    pic: 'Peter Parkur',
    deadline: 'Tuesday, Sep 29th 2020',
    status: 'CLOSED',
    statusColor: 'danger',
  },
  {
    id: '#P-000441425',
    title: 'Manage SEO for Eclan Company P..',
    createdDate: 'Sep 8th, 2020',
    client: 'Angela Moss',
    pic: 'Olivia Jonson',
    deadline: 'Tuesday, Sep 29th 2020',
    status: 'ON PROGRESS',
    statusColor: 'info',
  },
  {
    id: '#P-000441425',
    title: 'Redesign Kripton Mobile App',
    createdDate: 'Sep 8th, 2020',
    client: 'Tiffany',
    pic: 'Bella Sirait',
    deadline: 'Tuesday, Sep 29th 2020',
    status: 'PENDING',
    statusColor: 'warning',
  },
];

export default function ProjectDashboard() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '2rem 0' }}>
      <Container>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-4 fw-bold">
            <span className="text-dark d-flex align-items-center gap-2">
              All Projects<span className="badge rounded-pill" style={{ backgroundColor: '#43DC80', color: '#fff' }}>154</span>
            </span>
            <span className="text-muted d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
              On Progress <span className="badge rounded-pill" style={{ backgroundColor: '#2DB3FF', color: '#fff' }}>2</span>
            </span>
            <span className="text-muted d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
              Pending <span className="badge rounded-pill" style={{ backgroundColor: '#FFAB2D', color: '#fff' }}>4</span>
            </span>
            <span className="text-muted d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
              Closed  <span className="badge rounded-pill" style={{ backgroundColor: '#FF4C41', color: '#fff' }}>4</span>
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Button variant="success" className="px-4 py-2 rounded-3 fw-bold border-0" style={{ backgroundColor: '#4de193' }}>
              New Project
            </Button>
            <div className="d-flex text-muted gap-2 fs-5">
              <List style={{ cursor: 'pointer' }} className="text-secondary" />
              <Grid3x3GapFill style={{ cursor: 'pointer', opacity: 0.5,color:"#43DC80" }} />
            </div>
          </div>
        </div>
        {projectsData.map((project, index) => (
          <Card key={index} className="mb-3 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                {/* Project Info */}
                <Col md={4}>
                  {/* Removed text-success so the inline hex color works */}
                  <div className="fw-bold small mb-1" style={{ color: '#43DC80' }}>
                    {project.id}
                  </div>
                  <h6 className="fw-bold mb-1">{project.title}</h6>
                  <div className="text-muted small d-flex align-items-center gap-2 ">
                    <Calendar2DateFill size={12} /> Created on {project.createdDate}
                  </div>
                </Col>
                {/* Client Info */}
                <Col md={2} className="d-flex align-items-center gap-3">
                  <div > <img src='user2.png' size={18} style={{ height: "40px", width: "40px" }} /></div>
                  <div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>Client</div>
                    <div className="fw-bold small">{project.client}</div>
                  </div>
                </Col>

                {/* Person in Charge Info */}
                <Col md={2} className="d-flex align-items-center gap-3">
                  <div > <img src='user2.png' size={18} style={{ height: "40px", width: "40px" }} /></div>
                  <div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>Person in charge</div>
                    <div className="fw-bold small">{project.pic}</div>
                  </div>
                </Col>

                {/* Deadline */}
                <Col md={2} className="d-flex align-items-center gap-3">
                  <div> <div > <img src='deadline.png' size={18} style={{ height: "40px", width: "40px" }} /></div></div>
                  <div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>Deadline</div>
                    <div className="fw-bold small">{project.deadline}</div>
                  </div>
                </Col>

                {/* Status & Actions */}
                <Col md={2} className="d-flex justify-content-end align-items-center gap-3">
                  <Badge
                    bg={project.statusColor}
                    className={`bg-opacity-25 text-${project.statusColor} px-3 py-2 rounded-pill`}
                    style={{ border: 'none' }}
                  >
                    {project.status}
                  </Badge>
                  <ThreeDotsVertical style={{ cursor: 'pointer' }} className="text-muted" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}

        {/* Footer Pagination */}

      </Container>


    </div>
  );
}