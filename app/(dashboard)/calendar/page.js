"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; 
import { inviteUser, addAgenda } from "./../store/calendarSlice";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { ChevronLeft, ChevronRight, StarFill, Plus, PersonPlus, Calendar3 } from "react-bootstrap-icons";
import { BsGrid3X3GapFill } from "react-icons/bs";

export default function ProjectCalendar() {
  const dispatch = useDispatch();
  const router = useRouter(); 

  // Select state slices from Redux
  const allProjects = useSelector((state) => state.calendar?.projectDetails) || [];
  const tasksByDate = useSelector((state) => state.calendar?.tasksByDate) || {};

  // Calendar View States
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Modal Control States
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAgendaModal, setShowAgendaModal] = useState(false);

  const [inviteData, setInviteData] = useState({ name: "", email: "", projectId: "" });
  const [agendaData, setAgendaData] = useState({ date: "", variant: "success", taskCount: "1" });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const getStatusTheme = (variant) => {
    switch (variant) {
      case "bg-primary":
      case "purple":
        return { bg: "#F5F3FF", border: "none", primaryColor: "#A259FF", dayColor: "#1E1E2F" };
      case "bg-warning":
      case "warning":
        return { bg: "#FFF7ED", border: "none", primaryColor: "#FF8A00", dayColor: "#1E1E2F" };
      case "bg-success":
      case "success":
        return { bg: "#E8F8F0", border: "none", primaryColor: "#2ECC71", dayColor: "#1E1E2F" };
      default:
        return { bg: "#FFFFFF", border: "1px solid #E2E8F0", primaryColor: "#64748B", dayColor: "#1E1E2F" };
    }
  };
  const getOrdinal = (n) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return `${n}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`;
  };
  const weekOfMonth = Math.ceil(currentDate.getDate() / 7);
  const sidebarSubtitle = `${monthNames[currentMonth]}, ${getOrdinal(weekOfMonth)} Week`;

  const getCombinedSidebarItems = () => {
    // 1. Start with standard static project array items
    const items = [...allProjects];

    Object.keys(tasksByDate).forEach((dateKey) => {
      const agendaItem = tasksByDate[dateKey];
      if (!agendaItem) return;

    
      const [year, month, day] = dateKey.split("-");
      const monthIdx = parseInt(month, 10) - 1;

      // Ensure we only queue tasks belonging to currently active view month
      if (monthIdx === currentMonth && parseInt(year, 10) === currentYear) {
        const friendlyDateStr = `${monthNames[monthIdx]} ${parseInt(day, 10)}`;

        items.push({
          id: `agenda-${dateKey}`,
          title: `New Agenda Task Queue`,
          date: friendlyDateStr,
          avatars: agendaItem.tasks || 1, 
          iconBg: agendaItem.variant || "success",
        });
      }
    });

    return items;
  };

  const combinedSidebarItems = getCombinedSidebarItems();

  // Monday-start calendar matrix calculations
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayOfWeek = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarCells = [];

  // Previous Month Padding Days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarCells.push({ dayNum: daysInPrevMonth - i, isCurrentMonth: false, monthOffset: -1 });
  }
  // Current Month Days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push({ dayNum: day, isCurrentMonth: true, monthOffset: 0 });
  }
  // Next Month Padding Days
  const totalCellsNeeded = Math.ceil(calendarCells.length / 7) * 7;
  const nextMonthPadding = totalCellsNeeded - calendarCells.length;
  for (let day = 1; day <= nextMonthPadding; day++) {
    calendarCells.push({ dayNum: day, isCurrentMonth: false, monthOffset: 1 });
  }

  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const handleResetToToday = () => setCurrentDate(new Date());

  // Click handler for a calendar date block cell
  const handleDayCellClick = (cell) => {
    let targetYear = currentYear;
    let targetMonth = currentMonth + cell.monthOffset;

    if (targetMonth < 0) {
      targetMonth = 11;
      targetYear -= 1;
    } else if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }

    const formattedMonth = String(targetMonth + 1).padStart(2, "0");
    const formattedDay = String(cell.dayNum).padStart(2, "0");
    const localizedStringValue = `${targetYear}-${formattedMonth}-${formattedDay}`;

    setAgendaData((prev) => ({
      ...prev,
      date: localizedStringValue
    }));
    setShowAgendaModal(true);
  };

  const getTasksInfoForDay = (dayNum, isCurrentMonth) => {
    if (!isCurrentMonth) return { count: 0, variant: "" };

    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(dayNum).padStart(2, '0');
    const lookupKey = `${currentYear}-${formattedMonth}-${formattedDay}`;

    let taskCount = tasksByDate[lookupKey]?.tasks || 0;
    let variant = tasksByDate[lookupKey]?.variant || "";

    const matchingProjects = allProjects.filter((project) => {
      if (!project.date) return false;
      const projectDate = new Date(`${project.date}, ${currentYear}`);
      return projectDate.getDate() === dayNum && projectDate.getMonth() === currentMonth;
    });

    if (matchingProjects.length > 0) {
      taskCount += matchingProjects.length;
      if (!variant) {
        variant = matchingProjects[0].iconBg;
      }
    }

    return { count: taskCount, variant };
  };

  const getCellUiStyle = (dayNum, isCurrentMonth, tasksInfo) => {
    const today = new Date();
    const isToday = today.getDate() === dayNum && today.getMonth() === currentMonth && today.getFullYear() === currentYear;

    if (!isCurrentMonth) return { bg: "#F8FAFC", border: "1px solid #E2E8F0", dayColor: "#94A3B8", taskColor: "#94A3B8" };
    if (isToday) return { bg: "#2ECC71", border: "none", dayColor: "#FFFFFF", taskColor: "#FFFFFF" };
    if (tasksInfo.count === 0) return { bg: "#FFFFFF", border: "1px solid #E2E8F0", dayColor: "#1E1E2F", taskColor: "#94A3B8" };

    const theme = getStatusTheme(tasksInfo.variant);
    return { bg: theme.bg, border: theme.border, dayColor: theme.dayColor, taskColor: theme.primaryColor };
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    dispatch(inviteUser(inviteData));
    setInviteData({ name: "", email: "", projectId: "" });
    setShowInviteModal(false);
  };

  const handleAgendaSubmit = (e) => {
    e.preventDefault();
    dispatch(addAgenda({
      dateStr: agendaData.date,
      variant: agendaData.variant,
      taskCount: parseInt(agendaData.taskCount, 10)
    }));
    setAgendaData({ date: "", variant: "success", taskCount: "1" });
    setShowAgendaModal(false);
  };
  const renderAvatarStack = (count) => {
    const shown = Math.min(count || 0, 4);
    if (shown === 0) return <div style={{ height: 22 }} />;
    return (
      <div className="d-flex align-items-center">
        {Array.from({ length: shown }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "#E2E8F0",
              border: "2px solid #FFFFFF",
              marginLeft: i === 0 ? 0 : -8,
              flexShrink: 0
            }}
          />
        ))}
        {count > 4 && <span className="text-muted small ms-2">+{count - 4}</span>}
      </div>
    );
  };
  return (
    <div style={{ backgroundColor: "#F9FAFC", minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <Container fluid>
        <Row className="g-4">
          {/* LEFT PANEL */}
          <Col xl={4} lg={5} md={12}>
            <Card className="border-0 shadow-sm p-4 h-100" style={{ borderRadius: "24px", minHeight: "600px" }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold m-0" style={{ color: "#1E1E2F" }}>Projects Details</h5>
                <Button
                  variant="light"
                  className="px-2.5 py-1 fw-bold btn-sm d-flex align-items-center gap-1 border-0"
                  style={{ backgroundColor: "#E8F8F0", color: "#2ECC71", borderRadius: "10px", fontSize: "0.8rem" }}
                  onClick={() => setShowInviteModal(true)}
                >
                  <PersonPlus size={15} /> Invite People
                </Button>
              </div>
              <p className="text-muted small mb-4">{sidebarSubtitle}</p>

              <div className="d-flex flex-column gap-4" style={{ overflowY: "auto", maxHeight: "650px", paddingRight: "4px" }}>
                {combinedSidebarItems.length === 0 ? (
                  <div className="text-muted text-center py-5 small fst-italic">No projects or agendas added yet</div>
                ) : (
                  combinedSidebarItems.map((project, index) => {
                    const theme = getStatusTheme(project.iconBg);
                    return (
                      <div key={project.id || index} className="d-flex align-items-start gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            backgroundColor: theme.bg,
                            width: "42px",
                            height: "42px",
                            flexShrink: 0
                          }}
                        >
                          <StarFill size={16} style={{ color: theme.primaryColor }} />
                        </div>

                        <div className="flex-grow-1 border-bottom pb-3">
                          <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
                            {project.title}
                          </h6>
                          <div className="d-flex justify-content-between align-items-center">
                            {renderAvatarStack(project.avatars)}
                            <span className="text-muted" style={{ fontSize: "0.75rem" }}>{project.date}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          </Col>

          {/* RIGHT PANEL CALENDAR GRID */}
          <Col xl={8} lg={7} md={12}>
            <Card className="border-0 shadow-sm p-4 h-100" style={{ borderRadius: "24px" }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <Button variant="outline-success" className="fw-semibold px-3 py-1 btn-sm" style={{ borderRadius: "10px", borderColor: "#2ECC71", color: "#2ECC71" }} onClick={handleResetToToday}>
                  Today {new Date().getDate()}
                </Button>
                <div className="d-flex align-items-center gap-3">
                  <Button variant="light" className="rounded-circle p-1 border-0 bg-light d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }} onClick={handlePrevMonth}>
                    <ChevronLeft size={14} className="text-dark" />
                  </Button>
                  <h5 className="m-0 fw-bold px-1 text-dark" style={{ fontSize: "1.1rem" }}>
                    {monthNames[currentMonth]} {currentYear}
                  </h5>
                  <Button variant="light" className="rounded-circle p-1 border-0 bg-light d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }} onClick={handleNextMonth}>
                    <ChevronRight size={14} className="text-dark" />
                  </Button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    className="border-0 px-3 py-1.5 fw-bold btn-sm d-flex align-items-center gap-1"
                    style={{ backgroundColor: "#2ECC71", color: "#FFF", borderRadius: "10px" }}
                    onClick={() => {
                      const today = new Date();
                      const formattedMonth = String(today.getMonth() + 1).padStart(2, '0');
                      const formattedDay = String(today.getDate()).padStart(2, '0');
                      setAgendaData(prev => ({ ...prev, date: `${today.getFullYear()}-${formattedMonth}-${formattedDay}` }));
                      setShowAgendaModal(true);
                    }}
                  >
                    <Plus size={16} /> New Agenda
                  </Button>
                  {/* Navigation Switch Views Toggle */}
                  <div className="d-flex align-items-center gap-2 border-start ps-3" style={{ borderColor: "#E5E7EB" }}>
                    <button 
                      onClick={() => router.push("/kanban")} 
                      title="Kanban View"
                      className="btn btn-link p-2 text-muted hover-primary d-flex align-items-center justify-content-center" 
                      style={{ borderRadius: "8px", transition: "all 0.2s" }}
                    >
                      <BsGrid3X3GapFill size={19} style={{ color: "#9CA3AF" }} />
                    </button>
                    <button 
                      onClick={() => router.push("/calendar")} 
                      title="Calendar View"
                      className="btn btn-link p-2 text-muted hover-primary d-flex align-items-center justify-content-center"
                      style={{ borderRadius: "8px", transition: "all 0.2s", backgroundColor: "#EBFBEE" }}
                    >
                      <Calendar3 size={19} style={{ color: "#2ECC71" }} />
                    </button>
                  </div>
                </div>
              </div>
              <Row className="g-0 mb-3 text-center text-muted fw-semibold" style={{ fontSize: "0.75rem" }}>
                {daysOfWeek.map((day) => (
                  <Col key={day} style={{ flex: "1 0 14.28%" }}>{day}</Col>
                ))}
              </Row>
              <Row className="g-2 flex-wrap">
                {calendarCells.map((cell, index) => {
                  const tasksInfo = getTasksInfoForDay(cell.dayNum, cell.isCurrentMonth);
                  const ui = getCellUiStyle(cell.dayNum, cell.isCurrentMonth, tasksInfo);

                  return (
                    <Col key={index} style={{ flex: "1 0 14.28%", minWidth: "13%", aspectRatio: "1/1.05" }}>
                      <div
                        className="p-3 h-100 d-flex flex-column justify-content-between position-relative"
                        onClick={() => handleDayCellClick(cell)}
                        style={{
                          backgroundColor: ui.bg,
                          borderRadius: "16px",
                          border: ui.border,
                          cursor: "pointer",
                          transition: "all 0.15s ease-in-out"
                        }}
                      >
                        <span className="fw-bold" style={{ fontSize: "1rem", color: ui.dayColor }}>
                          {cell.dayNum}
                        </span>

                        <div style={{ overflow: "hidden" }}>
                          {cell.isCurrentMonth && tasksInfo.count > 0 && (
                            <span className="fw-bold" style={{ fontSize: "0.75rem", color: ui.taskColor }}>
                              {tasksInfo.count} {tasksInfo.count === 1 ? "Task" : "Tasks"}
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>

            </Card>
          </Col>

        </Row>
      </Container>

      {/* TEAM INVITE MODAL */}
      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)} centered style={{ borderRadius: "24px" }}>
        <Modal.Header closeButton className="border-0 pt-4 px-4">
          <Modal.Title className="fw-bold" style={{ color: "#1E1E2F" }}>Invite Team Member</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleInviteSubmit}>
          <Modal.Body className="px-4 pb-4">
            <Form.Group className="mb-3" controlId="inviteName">
              <Form.Label className="small fw-bold text-secondary">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter colleague's name"
                required
                value={inviteData.name}
                onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                style={{ borderRadius: "10px", padding: "0.6rem" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inviteEmail">
              <Form.Label className="small fw-bold text-secondary">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@company.com"
                required
                value={inviteData.email}
                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                style={{ borderRadius: "10px", padding: "0.6rem" }}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="inviteProject">
              <Form.Label className="small fw-bold text-secondary">Assign Project</Form.Label>
              <Form.Select
                required
                value={inviteData.projectId}
                onChange={(e) => setInviteData({ ...inviteData, projectId: e.target.value })}
                style={{ borderRadius: "10px", padding: "0.6rem" }}
              >
                <option value="">Choose active project queue...</option>
                {allProjects.map((proj, idx) => (
                  <option key={proj.id || idx} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 px-4 pb-4 d-flex gap-2">
            <Button variant="light" className="fw-semibold px-4" style={{ borderRadius: "10px" }} onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="border-0 px-4 fw-bold" style={{ backgroundColor: "#2ECC71", borderRadius: "10px" }}>
              Send Invitation
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* AGENDA CREATION MODAL */}
      <Modal show={showAgendaModal} onHide={() => setShowAgendaModal(false)} centered style={{ borderRadius: "24px" }}>
        <Modal.Header closeButton className="border-0 pt-4 px-4">
          <Modal.Title className="fw-bold" style={{ color: "#1E1E2F" }}>Add New Agenda</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAgendaSubmit}>
          <Modal.Body className="px-4 pb-4">
            <Form.Group className="mb-3" controlId="agendaDate">
              <Form.Label className="small fw-bold text-secondary">Selected Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={agendaData.date}
                onChange={(e) => setAgendaData({ ...agendaData, date: e.target.value })}
                style={{ borderRadius: "10px", padding: "0.6rem" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="agendaVariant">
              <Form.Label className="small fw-bold text-secondary">Theme Accent / Category</Form.Label>
              <Form.Select
                value={agendaData.variant}
                onChange={(e) => setAgendaData({ ...agendaData, variant: e.target.value })}
                style={{ borderRadius: "10px", padding: "0.6rem" }}
              >
                <option value="success">Success Mint Green</option>
                <option value="warning">Warning Peach Orange</option>
                <option value="purple">Primary Lavender Purple</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-1" controlId="agendaTasks">
              <Form.Label className="small fw-bold text-secondary">Number of Scheduled Tasks</Form.Label>
              <Form.Control
                type="number"
                min="1"
                required
                value={agendaData.taskCount}
                onChange={(e) => setAgendaData({ ...agendaData, taskCount: e.target.value })}
                style={{ borderRadius: "10px", padding: "0.6rem" }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 px-4 pb-4 d-flex gap-2">
            <Button variant="light" className="fw-semibold px-4" style={{ borderRadius: "10px" }} onClick={() => setShowAgendaModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="border-0 px-4 fw-bold" style={{ backgroundColor: "#2ECC71", borderRadius: "10px" }}>
              Save Agenda
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}