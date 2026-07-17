"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "./../store/ProjectSlice"; 
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Plus, Lock, ThreeDotsVertical, ChatRightText, Paperclip, PersonPlus } from "react-bootstrap-icons";
import { TbWriting } from "react-icons/tb";

const getColumnConfig = (status) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return { bg: "#7A52F4", label: "To-Do", tagColor: "#A259FF" };
    case "ON PROGRESS":
      return { bg: "#FFA12C", label: "On Progress", tagColor: "#FF8A00" };
    case "CLOSED":
    case "DONE":
      return { bg: "#3FA9F5", label: "Done", tagColor: "#00C2FF" };
    case "REVISED":
      return { bg: "#D946EF", label: "Revised", tagColor: "#E879F9" };
    default:
      return { bg: "#64748B", label: "Unknown", tagColor: "#94A3B8" };
  }
};

export default function KanbanDashboard() {
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projects?.list) || [];

  // Card Modal Control States
  const [showModal, setShowModal] = useState(false);
  const [activeStatusForModal, setActiveStatusForModal] = useState("PENDING");
  const [formData, setFormData] = useState({ title: "", client: "", deadline: "" });

  // Invite Modal Control States
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteFormData, setInviteFormData] = useState({ name: "", email: "" });

  // Task Input Form Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Invite Input Form Handler
  const handleInviteInputChange = (e) => {
    const { name, value } = e.target;
    setInviteFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = (status) => {
    setActiveStatusForModal(status);
    setShowModal(true);
  };

  // Submit Handler for creating new Kanban Card items
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newProjectItem = {
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title,
      client: formData.client || "General Task",
      deadline: formData.deadline 
        ? new Date(formData.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
        : "Aug 4, 2020",
      status: activeStatusForModal,
      createdDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    };
    dispatch(addProject(newProjectItem));
    setFormData({ title: "", client: "", deadline: "" });
    setShowModal(false);
  };

  // Submit Handler for sending new Invites
  const handleInviteSubmit = (e) => {
    e.preventDefault();
    console.log("Team Member Invited successfully:", inviteFormData);
    setInviteFormData({ name: "", email: "" });
    setShowInviteModal(false);
  };

  return (
    <div style={{ backgroundColor: "#F9FAFC", minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <Container fluid>
        
        {/* TOP CONTEXT HEADER */}
        <section className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <Button variant="light" className="d-flex align-items-center gap-2 border bg-white px-3 py-2 text-dark" style={{ borderRadius: "10px", fontSize: "0.9rem" }}> 
              <TbWriting size={16} /> <b>Edit</b>
            </Button>
            <Button variant="light" className="d-flex align-items-center gap-2 border bg-white px-3 py-2 text-dark" style={{ borderRadius: "10px", fontSize: "0.9rem" }}> 
              <Lock size={14} /> <b>Private</b>
            </Button>
            
            <div className="d-none d-md-flex align-items-center ms-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="rounded-circle border border-white" style={{ width: "32px", height: "32px", backgroundColor: "#E2E8F0", marginLeft: "-8px" }} />
              ))}
            </div>
          </div>
          
          <div>
            <Button 
              className="border-0 px-4 py-2 d-flex align-items-center gap-2 fw-bold" 
              style={{ backgroundColor: '#2ECC71', color: '#fff', borderRadius: '10px', fontSize: '0.9rem' }}
              onClick={() => setShowInviteModal(true)}
            >
              <PersonPlus size={18} /> Invite People
            </Button>
          </div>
        </section>

        {/* CLEAN 4 COLUMNS IN ONE ROW WITH NO SCROLLBAR CONTAINER */}
        <Row className="g-4">
          {["PENDING", "ON PROGRESS", "CLOSED", "REVISED"].map((colStatus) => {
            const columnConfig = getColumnConfig(colStatus);
            const columnProjects = allProjects.filter((p) => p.status?.toUpperCase() === colStatus);

            return (
              <Col key={colStatus} xs={12} sm={6} lg={3}>
                
                {/* Column Header */}
                <div className="p-3 text-white position-relative shadow-sm mb-3" style={{ backgroundColor: columnConfig.bg, borderRadius: "16px" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="m-0 fw-bold" style={{ fontSize: "1.05rem" }}>
                        {columnConfig.label} ({columnProjects.length})
                      </h5>
                      <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>Lorem ipsum dolor sit amet</span>
                    </div>
                    <ThreeDotsVertical size={18} style={{ cursor: "pointer", opacity: 0.9 }} />
                  </div>
                </div>

                {/* Sub-cards Stack */}
                <div className="d-flex flex-column gap-3 mb-3">
                  {columnProjects.map((project, index) => (
                    <Card key={project.id || index} className="border-0 shadow-sm" style={{ borderRadius: "14px" }}>
                      <Card.Body className="p-3">
                        <span className="fw-bold d-block mb-1" style={{ color: columnConfig.tagColor, fontSize: "0.75rem" }}>
                          {project.client}
                        </span>
                        
                        <h6 className="fw-bold text-dark mb-3" style={{ fontSize: "0.9rem", lineHeight: "1.45" }}>
                          {project.title}
                        </h6>

                        <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light">
                          <span className="text-muted fw-semibold" style={{ fontSize: "0.75rem" }}>
                            {project.deadline || "Aug 4, 2020"}
                          </span>
                          
                          <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: "0.75rem" }}>
                            <span className="d-flex align-items-center gap-1"><ChatRightText size={12} /> 4</span>
                            <span className="d-flex align-items-center gap-1"><Paperclip size={12} /> 1</span>
                            <div className="d-flex align-items-center ms-1">
                              <div className="rounded-circle" style={{ width: "20px", height: "20px", backgroundColor: "#CBD5E1", border: "1px solid #FFF" }} />
                              <div className="rounded-circle" style={{ width: "20px", height: "20px", backgroundColor: "#94A3B8", border: "1px solid #FFF", marginLeft: "-6px" }} />
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}

                  {/* Empty Slate Placeholder */}
                  {columnProjects.length === 0 && (
                    <div className="text-center text-muted py-5 bg-white rounded-4 border-2 shadow-sm" style={{ borderStyle: "dashed", borderColor: "#E2E8F0" }}>
                      <div className="p-2 text-center text-muted style-italic" style={{ fontSize: "0.85rem" }}>
                        Move card here
                      </div>
                    </div>
                  )}

                  {/* Add Card Button */}
                  <Button 
                    onClick={() => openAddModal(colStatus)}
                    className="w-100 py-2 border-0 fw-bold d-flex align-items-center justify-content-center gap-1 shadow-sm mt-1" 
                    style={{ backgroundColor: '#2ECC71', color: '#fff', borderRadius: '12px', fontSize: '0.85rem' }}
                  >
                    <Plus size={18} /> Add Card
                  </Button>
                </div>

              </Col>
            );
          })}
        </Row>

      </Container>

      {/* INPUT FORM MODAL (ADD CARD) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static" size="md">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Add Card to {getColumnConfig(activeStatusForModal).label}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="py-3">
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Card Title / Task Description</Form.Label>
              <Form.Control type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="Prepare proposal for client meeting" style={{ borderRadius: "8px" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Category Tag (e.g., Content Writer, Software Engineer)</Form.Label>
              <Form.Control type="text" name="client" required value={formData.client} onChange={handleInputChange} placeholder="Graphic Designer" style={{ borderRadius: "8px" }} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small text-muted fw-bold">Deadline Date</Form.Label>
              <Form.Control type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} style={{ borderRadius: "8px" }} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
            <Button variant="light" onClick={() => setShowModal(false)} style={{ borderRadius: "8px" }}>Cancel</Button>
            <Button type="submit" style={{ backgroundColor: "#2ECC71", borderColor: "#2ECC71", borderRadius: "8px" }}>Save Card</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* INVITE FORM MODAL (MATCHES ADD CARD MODAL DESIGN EXACTLY) */}
    {/* ========================================================= */}
      {/* 1. INPUT FORM MODAL (ADD CARD)                            */}
      {/* ========================================================= */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static" size="md">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Add Card to {getColumnConfig(activeStatusForModal).label}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="py-3">
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Card Title / Task Description</Form.Label>
              <Form.Control type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="Prepare proposal for client meeting" style={{ borderRadius: "8px" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Category Tag (e.g., Content Writer, Software Engineer)</Form.Label>
              <Form.Control type="text" name="client" required value={formData.client} onChange={handleInputChange} placeholder="Graphic Designer" style={{ borderRadius: "8px" }} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small text-muted fw-bold">Deadline Date</Form.Label>
              <Form.Control type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} style={{ borderRadius: "8px" }} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
            <Button variant="light" onClick={() => setShowModal(false)} style={{ borderRadius: "8px" }}>Cancel</Button>
            <Button type="submit" style={{ backgroundColor: "#2ECC71", borderColor: "#2ECC71", borderRadius: "8px" }}>Save Card</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* 2. INVITE FORM MODAL  */}

      {/* <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)} centered backdrop="static" size="md">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Invite Team Member</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleInviteSubmit}>
          <Modal.Body className="py-3">
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Colleague Full Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                required 
                value={inviteFormData.name} 
                onChange={handleInviteInputChange} 
                placeholder="Alex Morgan" 
                style={{ borderRadius: "8px" }} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Assign to Category / Column</Form.Label>
              <Form.Select 
                name="status"
                required
                value={inviteFormData.status || "PENDING"}
                onChange={handleInviteInputChange}
                style={{ borderRadius: "8px" }}
              >
                <option value="PENDING">To-Do</option>
                <option value="ON PROGRESS">On Progress</option>
                <option value="CLOSED">Done</option>
                <option value="REVISED">Revised</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small text-muted fw-bold">Select Date</Form.Label>
              <Form.Control 
                type="date" 
                name="date" 
                value={inviteFormData.date || ""} 
                onChange={handleInviteInputChange} 
                style={{ borderRadius: "8px" }} 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
            <Button variant="light" onClick={() => setShowInviteModal(false)} style={{ borderRadius: "8px" }}>Cancel</Button>
            <Button type="submit" style={{ backgroundColor: "#2ECC71", borderColor: "#2ECC71", borderRadius: "8px" }}>Send Invitation</Button>
          </Modal.Footer>
        </Form>
      </Modal> */}
    </div>
  );
}