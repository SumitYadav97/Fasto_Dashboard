"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "./../store/ProjectSlice"; // Adjust path to your slice
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Calendar2DateFill, List, Grid3x3GapFill } from "react-bootstrap-icons";

const getStatusConfig = (status) => {
  switch (status?.toUpperCase()) {
    case "ON PROGRESS":
      return { bg: "#EDF7FF", color: "#32A5FD" };
    case "CLOSED":
      return { bg: "#FFF0F0", color: "#FF544B" };
    case "PENDING":
    default:
      return { bg: "#FFF5E6", color: "#FFAB2D" };
  }
};

export default function ProjectDashboard() {
  const dispatch = useDispatch();
  
  // Read dynamic project list directly from Redux store
  const allProjects = useSelector((state) => state.projects.list);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("ALL");
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    deadline: "",
    status: "PENDING",
  });

  const filteredData = allProjects.filter((p) => {
    if (filter === "ALL") return true;
    return p.status?.toUpperCase() === filter;
  });
  
  const safeData = filteredData || [];
  const LastItem = currentPage * itemsPerPage;
  const FirstItem = LastItem - itemsPerPage;
  const currentItems = safeData.slice(FirstItem, LastItem);
  const totalPages = Math.max(1, Math.ceil(safeData.length / itemsPerPage));

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  const getPaginationRange = (current, total) => {
    const delta = 1;
    const range = [];
    let left = Math.max(2, current - delta);
    let right = Math.min(total - 1, current + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    if (right < total - 1) range.push("...");
    if (total > 1) range.push(total);
    return range;
  };

  const totalProjects = allProjects.length;
  const onProgressCount = allProjects.filter((p) => p.status?.toUpperCase() === "ON PROGRESS").length;
  const pendingCount = allProjects.filter((p) => p.status?.toUpperCase() === "PENDING").length;
  const closedCount = allProjects.filter((p) => p.status?.toUpperCase() === "CLOSED").length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const newProjectItem = {
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title,
      client: formData.client,
      deadline: formData.deadline,
      status: formData.status,
      createdDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    dispatch(addProject(newProjectItem));
    setFormData({ title: "", client: "", deadline: "", status: "PENDING" });
    setShowModal(false);
  };

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", padding: "1rem" }}>
      <Container fluid className="px-0 px-sm-3">
        
        {/* TOP FILTER & ACTIONS HEADER */}
        <div className="p-3 bg-white mb-4"
          style={{ borderRadius: "16px", boxShadow: "0px 2px 6px rgba(0,0,0,0.02)" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            
            {/* Filter Tabs - Scrolls horizontally on Mobile if overflow occurs */}
            <div className="d-flex align-items-center gap-3 flex-nowrap overflow-x-auto pb-2 pb-md-0" style={{ WebkitOverflowScrolling: "touch" }}>
              <span onClick={() => setFilter("ALL")} className={`d-flex align-items-center gap-2 text-nowrap ${filter === "ALL" ? "text-dark fw-bold" : "text-muted"}`} style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                All <span className="badge rounded-pill" style={{ background: "#43DC80" }}>{totalProjects}</span>
              </span>

              <span onClick={() => setFilter("ON PROGRESS")} className={`d-flex align-items-center gap-2 text-nowrap ${filter === "ON PROGRESS" ? "text-dark fw-bold" : "text-muted"}`} style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                On Progress <span className="badge rounded-pill" style={{ backgroundColor: "#32A5FD", color: "#fff" }}>{onProgressCount}</span>
              </span>

              <span onClick={() => setFilter("PENDING")} className={`d-flex align-items-center gap-2 text-nowrap ${filter === "PENDING" ? "text-dark fw-bold" : "text-muted"}`} style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                Pending <span className="badge rounded-pill" style={{ backgroundColor: "#FFAB2D", color: "#fff" }}>{pendingCount}</span>
              </span>

              <span onClick={() => setFilter("CLOSED")} className={`d-flex align-items-center gap-2 text-nowrap ${filter === "CLOSED" ? "text-dark fw-bold" : "text-muted"}`} style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                Closed <span className="badge rounded-pill" style={{ backgroundColor: "#FF544B", color: "#fff" }}>{closedCount}</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3 border-top pt-2 pt-md-0 border-md-0">
              <Button
                onClick={() => setShowModal(true)}
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
        </div>

        {/* PROJECT LIST */}
        {currentItems.map((project, index) => {
          const statusStyle = getStatusConfig(project.status);
          return (
            <Card key={project.id || index} className="mb-3 border-0 shadow-sm" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-3 p-md-4">
                <Row className="align-items-center gy-3 gy-md-0">
                  
                  {/* Title & Info */}
                  <Col xs={12} md={5}>
                    <div className="fw-bold mb-1" style={{ color: "#43DC80", fontSize: "0.85rem" }}>{project.id}</div>
                    <h5 className="mb-1 text-wrap text-break">{project.title}</h5>
                    <small className="text-muted d-block mt-1">
                      <Calendar2DateFill className="me-1" /> Created: {project.createdDate}
                    </small>
                  </Col>
                  
                  {/* Client Info */}
                  <Col xs={6} md={3} className="border-top pt-2 pt-md-0 border-md-0">
                    <div className="small text-muted d-md-none fw-bold">Client</div>
                    <div className="text-dark fw-medium">{project.client}</div>
                  </Col>
                  
                  {/* Deadline */}
                  <Col xs={6} md={2} className="border-top pt-2 pt-md-0 border-md-0">
                    <div className="small text-muted d-md-none fw-bold">Deadline</div>
                    <div className="text-secondary">{project.deadline}</div>
                  </Col>
                  
                  {/* Status Badge */}
                  <Col xs={12} md={2} className="text-start text-md-end border-top pt-3 pt-md-0 border-md-0">
                    <Button 
                      className="w-100 w-md-auto px-3 py-1.5 font-weight-bold" 
                      style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: "none", borderRadius: "20px", fontSize: "0.85rem" }}
                    >
                      {project.status}
                    </Button>
                  </Col>

                </Row>
              </Card.Body>
            </Card>
          );
        })}

        {/* CUSTOM PILL-STYLE PAGINATION */}
        {totalPages > 1 && (
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 user-select-none gap-3">
            <div className="text-muted small fw-medium order-2 order-md-1">
              Showing {FirstItem + 1} to {Math.min(LastItem, safeData.length)} of {safeData.length}
            </div>

            <footer className="d-flex align-items-center gap-2 gap-sm-3 flex-wrap justify-content-center order-1 order-md-2">
              {/* Previous Capsule Action Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="btn bg-white d-inline-flex align-items-center justify-content-center gap-2 fw-medium px-3 py-2 rounded-pill shadow-sm transition-all"
                style={{
                  border: '1px solid #43DC80',
                  color: '#32b866',
                  opacity: currentPage === 1 ? 0.4 : 1,
                  fontSize: '0.85rem'
                }}
              >
                <span>&lt;&lt;</span> Prev
              </button>

              <div 
                className="d-inline-flex align-items-center gap-1 p-1 rounded-pill"
                style={{ backgroundColor: '#f0f0f2' }}
              >
                {getPaginationRange(currentPage, totalPages).map((page, i) => {
                  const isActive = page === currentPage;
                  if (page === "...") {
                    return (
                      <span key={i} className="px-1 text-muted fw-bold d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={`${page}-${i}`}
                      onClick={() => setCurrentPage(page)}
                      className="border-0 d-flex align-items-center justify-content-center fw-semibold transition-all"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? '#32b866' : 'transparent',
                        color: isActive ? '#ffffff' : '#555555',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Capsule Action Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn bg-white d-inline-flex align-items-center justify-content-center gap-2 fw-medium px-3 py-2 rounded-pill shadow-sm transition-all"
                style={{
                  border: '1px solid #43DC80',
                  color: '#32b866',
                  opacity: currentPage === totalPages ? 0.4 : 1,
                  fontSize: '0.85rem'
                }}
              >
                Next <span>&gt;&gt;</span>
              </button>
            </footer>
          </div>
        )}
      </Container>

      {/* INPUT FORM MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static" size="md">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Add New Project</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="py-3">
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Project Title</Form.Label>
              <Form.Control type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="Enter project name" style={{ borderRadius: "8px" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Client Name</Form.Label>
              <Form.Control type="text" name="client" required value={formData.client} onChange={handleInputChange} placeholder="Enter client name" style={{ borderRadius: "8px" }} />
            </Form.Group>

            <Row>
              <Col xs={12} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">Deadline Date</Form.Label>
                  <Form.Control type="date" name="deadline" required value={formData.deadline} onChange={handleInputChange} style={{ borderRadius: "8px" }} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">Initial Status</Form.Label>
                  <Form.Select name="status" value={formData.status} onChange={handleInputChange} style={{ borderRadius: "8px" }}>
                    <option value="PENDING">Pending</option>
                    <option value="ON PROGRESS">On Progress</option>
                    <option value="CLOSED">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
            <Button variant="light" onClick={() => setShowModal(false)} style={{ borderRadius: "8px" }}>
              Cancel
            </Button>
            <Button type="submit" style={{ backgroundColor: "#2ECC71", borderColor: "#2ECC71", borderRadius: "8px" }}>
              Save Project
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}