"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addProject } from "./../store/ProjectSlice";
import { Container, Row, Col, Card, Button, Modal, Form, Dropdown } from "react-bootstrap";
import { Calendar2DateFill, Plus, LightningChargeFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { BsGrid3X3GapFill } from "react-icons/bs";

const getStatusConfig = (status) => {
  switch (status?.toUpperCase()) {
    case "ON PROGRESS":
      return { bg: "#E3F5FF", color: "#32A5FD" };
    case "CLOSED":
    case "DONE":
      return { bg: "#FFEBEB", color: "#FF544B" };
    case "PENDING":
    default:
      return { bg: "#FEEFD0", color: "#FFAB2D" };
  }
};

const getRandomAvatar = (id) => `https://i.pravatar.cc/100?u=${encodeURIComponent(id || 'default')}`;

// Months for the custom Calendar selector
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function ProjectDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const allProjects = useSelector((state) => state.projects.list) || [];

  const [filter, setFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);

  // Custom Calendar state inside Modal
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth()); // 0-11
  const [selectedDate, setSelectedDate] = useState(null); // Date object

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    personInCharge: "",
    status: "PENDING",
  });

  // Filter & Pagination Logic
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

  // Project Metrics
  const totalProjects = allProjects.length;
  const onProgressCount = allProjects.filter((p) => p.status?.toUpperCase() === "ON PROGRESS").length;
  const pendingCount = allProjects.filter((p) => p.status?.toUpperCase() === "PENDING").length;
  const closedCount = allProjects.filter((p) => p.status?.toUpperCase() === "CLOSED").length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format date for display
  const formatDisplayDate = (dateObj) => {
    if (!dateObj) return "Choose a date";
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    return dateObj.toLocaleDateString("en-US", options); // e.g. "Tuesday, Sep 29, 2020"
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Please select a deadline using the calendar.");
      return;
    }

    const newProjectItem = {
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title,
      client: formData.client,
      personInCharge: formData.personInCharge || "Yoast Esec",
      deadline: formatDisplayDate(selectedDate),
      status: formData.status,
      createdDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };
    dispatch(addProject(newProjectItem));

    // Reset Form
    setFormData({ title: "", client: "", personInCharge: "", status: "PENDING" });
    setSelectedDate(null);
    setCalYear(today.getFullYear());
    setCalMonth(today.getMonth());
    setShowModal(false);
  };

  // Native Interactive Calendar Helper Functions
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay(); // 0 = Sunday

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(calMonth, calYear);
    const firstDay = getFirstDayOfMonth(calMonth, calYear);
    const days = [];

    // Blank cells before the start of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ width: "14.28%", height: "35px" }}></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === calMonth &&
        selectedDate.getFullYear() === calYear;

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => setSelectedDate(new Date(calYear, calMonth, day))}
          className="d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "14.28%",
            height: "35px",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: isSelected ? "bold" : "normal",
            backgroundColor: isSelected ? "#39D98A" : "transparent",
            color: isSelected ? "#FFF" : "#2D3748",
            transition: "all 0.15s ease"
          }}
          onMouseEnter={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = "#EDF2F7";
          }}
          onMouseLeave={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {day}
        </div>
      );
    }
    return days;
  };
  return (
    <div style={{ backgroundColor: "#F8F9FB", minHeight: "100vh", padding: "1.5rem 2rem" }}>
      <Container fluid className="px-0">
        {/* TOP FILTER & ACTIONS HEADER */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 mt-2">
          {/* Filter Tabs */}
          <div className="d-flex align-items-center gap-4 flex-nowrap overflow-x-auto">
            <span onClick={() => setFilter("ALL")} className="d-flex align-items-center gap-2 text-nowrap" style={{ cursor: "pointer", fontSize: "0.95rem", fontWeight: filter === "ALL" ? "700" : "500", color: filter === "ALL" ? "#222" : "#888" }}>
              All Projects <span className="badge rounded-pill px-2 py-1" style={{ background: "#39D98A", color: "#fff", fontSize: "0.75rem" }}>{totalProjects}</span>
            </span>
            <span onClick={() => setFilter("ON PROGRESS")} className="d-flex align-items-center gap-2 text-nowrap" style={{ cursor: "pointer", fontSize: "0.95rem", fontWeight: filter === "ON PROGRESS" ? "700" : "500", color: filter === "ON PROGRESS" ? "#222" : "#888" }}>
              On Progress <span className="badge rounded-pill px-2 py-1" style={{ backgroundColor: "#32A5FD", color: "#fff", fontSize: "0.75rem" }}>{onProgressCount}</span>
            </span>
            <span onClick={() => setFilter("PENDING")} className="d-flex align-items-center gap-2 text-nowrap" style={{ cursor: "pointer", fontSize: "0.95rem", fontWeight: filter === "PENDING" ? "700" : "500", color: filter === "PENDING" ? "#222" : "#888" }}>
              Pending <span className="badge rounded-pill px-2 py-1" style={{ backgroundColor: "#FFAB2D", color: "#fff", fontSize: "0.75rem" }}>{pendingCount}</span>
            </span>
            <span onClick={() => setFilter("CLOSED")} className="d-flex align-items-center gap-2 text-nowrap" style={{ cursor: "pointer", fontSize: "0.95rem", fontWeight: filter === "CLOSED" ? "700" : "500", color: filter === "CLOSED" ? "#222" : "#888" }}>
              Closed <span className="badge rounded-pill px-2 py-1" style={{ backgroundColor: "#FF544B", color: "#fff", fontSize: "0.75rem" }}>{closedCount}</span>
            </span>
          </div>

          {/* Actions & View Toggles */}
          <div className="d-flex align-items-center gap-3">
            <Button onClick={() => setShowModal(true)} className="px-4 py-2 border-0 fw-bold d-flex align-items-center gap-1" style={{ backgroundColor: '#39D98A', color: '#fff', borderRadius: '10px', fontSize: '0.85rem' }}>
              <Plus size={20} /> New Project
            </Button>
            <div className="d-flex align-items-center gap-1 ps-2">
              {/* Grid / Kanban Page Redirect */}
              <button
                onClick={() => router.push("/kanban")}
                className="btn btn-link p-1.5 text-muted d-flex align-items-center justify-content-center"
                style={{ background: "transparent", border: "none" }}
                title="View Kanban Board"
              >
                <BsGrid3X3GapFill size={18} style={{ color: "#A0AEC0" }} />
              </button>
              {/* Calendar Page Redirect */}
              <button
                onClick={() => router.push("/calendar")}
                className="btn btn-link p-1.5 text-muted d-flex align-items-center justify-content-center"
                style={{ background: "transparent", border: "none" }}
                title="View Calendar"
              >
                <Calendar2DateFill size={18} style={{ color: "#A0AEC0" }} />
              </button>
            </div>
          </div>
        </div>
        {/* --- LIST VIEW WITH 5-COLUMN MATRIX --- */}
        {currentItems.map((project, index) => {
          const statusStyle = getStatusConfig(project.status);
          return (
            <Card key={project.id || index} className="mb-3 border-0 shadow-sm" style={{ borderRadius: "12px" }}>
              <Card.Body className="p-4">
                <Row className="align-items-center gy-3 gy-md-0">
                  {/* Column 1 of 5: PROJECT DETAILS (4/12 Grid) */}
                  <Col xs={12} md={4}>
                    <div className="fw-bold mb-1.5" style={{ color: "#39D98A", fontSize: "0.8rem", letterSpacing: "0.5px" }}>
                      #{project.id || `P-000441425`}
                    </div>
                    <h5 className="mb-2 text-wrap text-break" style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1E2022" }}>
                      {project.title}
                    </h5>
                    <small className="text-muted d-flex align-items-center gap-1" style={{ fontSize: "0.8rem" }}>
                      <Calendar2DateFill size={12} style={{ color: "#A0AEC0" }} /> Created on {project.createdDate || "Sep 8th, 2020"}
                    </small>
                  </Col>
                  {/* Column 2 of 5: CLIENT WITH AVATAR (2/12 Grid) */}
                  <Col xs={12} sm={4} md={2} className="d-flex align-items-center gap-3">
                    <img
                      src={getRandomAvatar(project.client)}
                      alt="Client"
                      className="rounded-circle bg-light"
                      style={{ width: "42px", height: "42px", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div>
                      <div className="text-muted" style={{ fontSize: "0.75rem" }}>Client</div>
                      <div className="text-dark fw-bold" style={{ fontSize: "0.88rem" }}>{project.client}</div>
                    </div>
                  </Col>
                  {/* Column 3 of 5: PERSON IN CHARGE (2/12 Grid) */}
                  <Col xs={12} sm={4} md={2} className="d-flex align-items-center gap-3">
                    <img
                      src={getRandomAvatar(project.personInCharge)}
                      alt="PIC"
                      className="rounded-circle bg-light"
                      style={{ width: "42px", height: "42px", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div>
                      <div className="text-muted" style={{ fontSize: "0.75rem" }}>Person in charge</div>
                      <div className="text-dark fw-bold" style={{ fontSize: "0.88rem" }}>{project.personInCharge || "Yoast Esec"}</div>
                    </div>
                  </Col>
                  {/* Column 4 of 5: DEADLINE (2/12 Grid) */}
                  <Col xs={12} sm={4} md={2} className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded-circle text-white"
                      style={{ width: "36px", height: "36px", backgroundColor: "#39D98A", flexShrink: 0 }}>
                      <LightningChargeFill size={16} />
                    </div>
                    <div>
                      <div className="text-muted" style={{ fontSize: "0.75rem" }}>Deadline</div>
                      <div className="text-dark fw-bold" style={{ fontSize: "0.88rem" }}>{project.deadline || "Tuesday, Sep 29th 2020"}</div>
                    </div>
                  </Col>
                  {/* Column 5 of 5: STATUS PILL (Full Width) & DOT MENU (2/12 Grid) */}
                  <Col xs={12} md={2} className="d-flex align-items-center justify-content-start justify-content-md-end gap-2">
                    <Button
                      className="px-3 py-1.5 border-0 w-100"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        borderRadius: "14px",
                        fontSize: "0.7rem",
                        fontWeight: "700",
                        letterSpacing: "0.6px",
                        width: "100%",
                        textTransform: "uppercase",
                        textAlign: "center"
                      }}
                    >
                      {project.status}
                    </Button>
                    <button className="btn btn-link p-1 text-muted d-flex align-items-center justify-content-center" style={{ border: "none", background: "none" }}>
                      <ThreeDotsVertical size={16} style={{ color: "#A0AEC0" }} />
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
        {safeData.length === 0 && (
          <div className="text-center text-muted my-5">No projects found.</div>
        )}
        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 1 && (
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 user-select-none gap-3">
            <div className="text-muted small fw-medium">
              Showing {FirstItem + 1} to {Math.min(LastItem, safeData.length)} from {safeData.length} data
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="btn bg-white rounded-pill px-3 py-1.5 shadow-sm d-flex align-items-center gap-1"
                style={{ border: '1px solid #E2E8F0', color: '#39D98A', fontSize: "0.85rem", fontWeight: "600" }}
              >
                &lt;&lt; Previous
              </button>
              {/* Pagination Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className="btn rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "36px",
                    height: "36px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    border: "none",
                    backgroundColor: currentPage === pageNum ? "#39D98A" : "transparent",
                    color: currentPage === pageNum ? "#FFF" : "#718096"
                  }}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn bg-white rounded-pill px-3 py-1.5 shadow-sm d-flex align-items-center gap-1"
                style={{ border: '1px solid #E2E8F0', color: '#39D98A', fontSize: "0.85rem", fontWeight: "600" }}
              >
                Next &gt;&gt;
              </button>
            </div>
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

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Person in Charge</Form.Label>
              <Form.Control type="text" name="personInCharge" required value={formData.personInCharge} onChange={handleInputChange} placeholder="Enter manager name" style={{ borderRadius: "8px" }} />
            </Form.Group>

            <Row className="gy-3">
              {/* MOUSE-DRIVEN CUSTOM CALENDAR SELECTOR */}
              <Col xs={12}>
                <Form.Label className="small text-muted fw-bold d-block">
                  Deadline Date: <span className="text-dark fw-bold ms-1">{formatDisplayDate(selectedDate)}</span>
                </Form.Label>

                {/* Calendar Card Container */}
                <Card className="border p-3" style={{ borderRadius: "10px", backgroundColor: "#FCFDFE" }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* Month Picker Dropdown */}
                    <Dropdown onSelect={(ekey) => setCalMonth(parseInt(ekey))}>
                      <Dropdown.Toggle size="sm" variant="outline-secondary" className="fw-bold" style={{ borderRadius: "6px" }}>
                        {MONTHS[calMonth]}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {MONTHS.map((m, idx) => (
                          <Dropdown.Item key={m} eventKey={idx}>{m}</Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* Year Picker Dropdown */}
                    <Dropdown onSelect={(ekey) => setCalYear(parseInt(ekey))}>
                      <Dropdown.Toggle size="sm" variant="outline-secondary" className="fw-bold" style={{ borderRadius: "6px" }}>
                        {calYear}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {Array.from({ length: 15 }, (_, i) => today.getFullYear() - 2 + i).map((yr) => (
                          <Dropdown.Item key={yr} eventKey={yr}>{yr}</Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  {/* Day Names Grid Header */}
                  <div className="d-flex text-center text-muted fw-bold mb-1" style={{ fontSize: "0.75rem" }}>
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => (
                      <div key={dayName} style={{ width: "14.28%" }}>{dayName}</div>
                    ))}
                  </div>
                  {/* Days Numeric Grid */}
                  <div className="d-flex flex-wrap text-center">
                    {renderCalendarDays()}
                  </div>
                </Card>
              </Col>
              <Col xs={12}>
                <Form.Group className="mb-2">
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
            <Button variant="light" onClick={() => setShowModal(false)} style={{ borderRadius: "8px" }}>Cancel</Button>
            <Button type="submit" style={{ backgroundColor: "#39D98A", borderColor: "#39D98A", borderRadius: "8px" }}>Save Project</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}