"use client";
import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Pagination } from 'react-bootstrap';
import { Calendar2DateFill, ThreeDotsVertical, List, Grid3x3GapFill, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { mockarooData } from '../Data/page';
import './../../../public/user2.png';
import './../../../public/deadline.png';

const getStatusConfig = (status) => {
  switch (status?.toUpperCase()) {
    case 'ON PROGRESS':
      return { bg: '#EDF7FF', color: '#32A5FD' };
    case 'CLOSED':
      return { bg: '#FFF0F0', color: '#FF544B' };
    case 'PENDING':
    default:
      return { bg: '#FFF5E6', color: '#FFAB2D' };
  }
};
export default function ProjectDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockarooData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mockarooData.length / itemsPerPage);
  const totalProjects = mockarooData.length;
  const onProgressCount = mockarooData.filter(p => p.status?.toUpperCase() === 'ON PROGRESS').length;
  const pendingCount = mockarooData.filter(p => p.status?.toUpperCase() === 'PENDING').length;
  const closedCount = mockarooData.filter(p => p.status?.toUpperCase() === 'CLOSED').length;

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', padding: '1.5rem' }}>
      <Container fluid className="px-4">
        <div
          className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white"
          style={{ borderRadius: '16px', boxShadow: '0px 2px 6px rgba(0,0,0,0.02)' }}
        >
          <div className="d-flex align-items-center gap-4">
            <span className="d-flex align-items-center gap-2 text-dark fw-bold" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
              All Projects
              <span className="badge rounded-pill d-flex align-items-center justify-content-center" style={{ backgroundColor: '#2ECC71', color: '#fff', padding: '4px 10px', fontSize: '0.75rem', fontWeight: '700' }}>
                {totalProjects}
              </span>
            </span>
            <span className="d-flex align-items-center gap-2 text-muted fw-normal" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
              On Progress
              <span className="badge rounded-pill d-flex align-items-center justify-content-center" style={{ backgroundColor: '#32A5FD', color: '#fff', padding: '4px 10px', fontSize: '0.75rem', fontWeight: '700' }}>
                {onProgressCount}
              </span>
            </span>
            <span className="d-flex align-items-center gap-2 text-muted fw-normal" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
              Pending
              <span className="badge rounded-pill d-flex align-items-center justify-content-center" style={{ backgroundColor: '#FFAB2D', color: '#fff', padding: '4px 10px', fontSize: '0.75rem', fontWeight: '700' }}>
                {pendingCount}
              </span>
            </span>
            <span className="d-flex align-items-center gap-2 text-muted fw-normal" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
              Closed
              <span className="badge rounded-pill d-flex align-items-center justify-content-center" style={{ backgroundColor: '#FF544B', color: '#fff', padding: '4px 10px', fontSize: '0.75rem', fontWeight: '700' }}>
                {closedCount}
              </span>
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Button
              className="px-4 py-2 border-0 fw-normal"
              style={{ backgroundColor: '#2ECC71', color: '#fff', borderRadius: '10px', fontSize: '0.85rem' }}
            >
              New Project
            </Button>
            <div className="d-flex text-muted gap-2 fs-5 align-items-center border-start ps-3">
              <List style={{ cursor: 'pointer' }} className="text-muted opacity-50" size={20} />
              <Grid3x3GapFill style={{ cursor: 'pointer', color: "#2ECC71" }} size={18} />
            </div>
          </div>
        </div>

        {/* Project List Items Loop */}
        {currentItems.map((project, index) => {
          const statusStyle = getStatusConfig(project.status);
          return (
            <Card key={project.id || index} className="mb-3 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <Card.Body className="p-4">
                <Row className="align-items-center">

                  {/* Project ID, Title, Creation Date Metrics */}
                  <Col md={4}>
                    <div className="fw-bold mb-1" style={{ color: '#2ECC71', fontSize: '0.8rem', letterSpacing: '0.02em' }}>
                      #P-000441{425 + project.id}
                    </div>
                    <h5 className="fw-bold mb-2 text-dark" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                      {project.title}
                    </h5>
                    <div className="text-muted d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
                      <Calendar2DateFill size={13} className="opacity-50" /> Created on {project.createdDate}
                    </div>
                  </Col>

                  {/* Client Info Mapping Section */}
                  <Col md={2} className="d-flex align-items-center gap-3">
                    <img src='user2.png' />
                    <div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Client</div>
                      <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                        {project.first_name} {project.last_name || ''}
                      </div>
                    </div>
                  </Col>

                  {/* Person in Charge Meta Mapping */}
                  <Col md={2} className="d-flex align-items-center gap-3">
                    <img src='user2.png' />
                    <div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Person in charge</div>
                      <div className="fw-bold text-dark text-truncate" style={{ fontSize: '0.85rem', maxWidth: '120px' }} title={project.email}>
                        {project.email ? project.email.split('@')[0] : 'N/A'}
                      </div>
                    </div>
                  </Col>

                  {/* Deadline Data Point Section */}
                  <Col md={2} className="d-flex align-items-center gap-3">
                    <img src='deadline.png' />
                    <div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Deadline</div>
                      <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{project.deadline}</div>
                    </div>
                  </Col>

                  {/* Custom Pill Component Styling Matching image_52da9e.png */}
                  <Col md={2} className="d-flex justify-content-end align-items-center gap-3">
                    <Button
                      className="text-center d-inline-flex align-items-center justify-content-center fw-bold text-uppercase border-0 shadow-none"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        fontSize: '0.7rem',
                        letterSpacing: '0.06em',
                        borderRadius: '100px',
                        width: '120px',
                        height: '34px',
                        cursor: 'default'
                      }}
                    >
                      {project.status}
                    </Button>
                    <ThreeDotsVertical style={{ cursor: 'pointer' }} className="text-muted opacity-50" size={18} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}

        {/* Bottom Pagination Bar Component */}
        <div className="d-flex justify-content-between align-items-center mt-4 text-muted small px-1">
          <div style={{ fontSize: '0.85rem' }} className="fw-normal">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, mockarooData.length)} from {mockarooData.length} data
          </div>
          <Pagination className="mb-0 align-items-center gap-1">
            <Button
              variant="outline-light"
              className="rounded-3 d-flex align-items-center gap-1 border-0 bg-white shadow-sm px-3 py-2 text-muted"
              style={{ fontSize: '0.8rem', color: '#2ECC71' }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={12} /> Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                className="border-0 fw-bold d-flex align-items-center justify-content-center shadow-sm"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  backgroundColor: currentPage === pageNumber ? '#2ECC71' : '#FFFFFF',
                  color: currentPage === pageNumber ? '#FFFFFF' : '#6C757D'
                }}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}
            <Button
              variant="outline-light"
              className="rounded-3 d-flex align-items-center gap-1 border-0 bg-white shadow-sm px-3 py-2 text-muted"
              style={{ fontSize: '0.8rem', color: '#2ECC71' }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next <ChevronRight size={12} />
            </Button>
          </Pagination>
        </div>
      </Container>
    </div>
  );
}