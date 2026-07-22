"use client";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addAgenda } from "./../store/calendarSlice";
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { ChevronLeft, ChevronRight, Plus, Calendar3, Calendar2DateFill } from "react-bootstrap-icons";
import { BsGrid3X3GapFill } from "react-icons/bs";

export default function ProjectCalendar() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux store state
  const projectList = useSelector((state) => state.projects?.list) || [];
  const tasksByDate = useSelector((state) => state.calendar?.tasksByDate) || {};

  // Helper to resolve avatar image
  const getImageUrl = (project, index) => {
    let img =
      project.clientImage ||
      project.image ||
      project.avatar ||
      project.client?.image ||
      project.client?.avatar;

    if (img && typeof img === "object") {
      img = img.src || img.url || img.avatar || null;
    }

    if (typeof img === "string" && img.trim() !== "" && !img.includes("placeholder")) {
      return img;
    }

    const uniqueFaces = ["https://i.pravatar.cc/100?u=akshat"];
    const faceIndex = (project.id ? Number(project.id) : index) % uniqueFaces.length;
    return uniqueFaces[isNaN(faceIndex) ? 0 : faceIndex];
  };

  const allProjects = useMemo(() => {
    return projectList.map((project, index) => {
      let formattedDate = "";
      let pYear = null;
      let pMonth = null;
      let pDay = null;

      if (project.deadline) {
        if (typeof project.deadline === "string" && project.deadline.includes("-") && !project.deadline.includes("T")) {
          const parts = project.deadline.split("-");
          if (parts.length === 3) {
            pYear = parseInt(parts[0], 10);
            pMonth = parseInt(parts[1], 10) - 1;
            pDay = parseInt(parts[2], 10);
          }
        }

        if (pYear === null) {
          const parsedDate = new Date(project.deadline);
          if (!isNaN(parsedDate.getTime())) {
            pYear = parsedDate.getFullYear();
            pMonth = parsedDate.getMonth();
            pDay = parsedDate.getDate();
          }
        }

        if (pYear !== null) {
          const tempDate = new Date(pYear, pMonth, pDay);
          formattedDate = tempDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }
      }

      let themeVariant = "success";
      const status = project.status?.toUpperCase();
      if (status === "PENDING") {
        themeVariant = "warning";
      } else if (status === "ON PROGRESS" || status === "IN PROGRESS" || status === "ONGOING") {
        themeVariant = "purple";
      }

      return {
        id: project.id,
        title: project.title,
        date: formattedDate,
        pYear,
        pMonth,
        pDay,
        iconBg: themeVariant,
        avatars: 1,
        image: getImageUrl(project, index),
      };
    });
  }, [projectList]);

  // Calendar States
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [showAgendaModal, setShowAgendaModal] = useState(false);
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
    const items = [...allProjects];

    Object.keys(tasksByDate).forEach((dateKey) => {
      const agendaItem = tasksByDate[dateKey];
      if (!agendaItem) return;

      const [year, month, day] = dateKey.split("-").map(Number);
      const monthIdx = month - 1;

      if (monthIdx === currentMonth && year === currentYear) {
        const friendlyDateStr = `${monthNames[monthIdx]} ${day}`;

        items.push({
          id: `agenda-${dateKey}`,
          title: `New Agenda Task Queue`,
          date: friendlyDateStr,
          avatars: agendaItem.tasks || 1,
          iconBg: agendaItem.variant || "success",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
        });
      }
    });

    return items;
  };

  const combinedSidebarItems = getCombinedSidebarItems();

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayOfWeek = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarCells = [];

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarCells.push({ dayNum: daysInPrevMonth - i, isCurrentMonth: false, monthOffset: -1 });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push({ dayNum: day, isCurrentMonth: true, monthOffset: 0 });
  }
  const totalCellsNeeded = Math.ceil(calendarCells.length / 7) * 7;
  const nextMonthPadding = totalCellsNeeded - calendarCells.length;
  for (let day = 1; day <= nextMonthPadding; day++) {
    calendarCells.push({ dayNum: day, isCurrentMonth: false, monthOffset: 1 });
  }

  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const handleResetToToday = () => setCurrentDate(new Date());

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
      date: localizedStringValue,
    }));
    setShowAgendaModal(true);
  };

  const getTasksInfoForDay = (dayNum, isCurrentMonth) => {
    if (!isCurrentMonth) return { count: 0, variant: "" };
    const formattedMonth = String(currentMonth + 1).padStart(2, "0");
    const formattedDay = String(dayNum).padStart(2, "0");
    const lookupKey = `${currentYear}-${formattedMonth}-${formattedDay}`;
    let taskCount = tasksByDate[lookupKey]?.tasks || 0;
    let variant = tasksByDate[lookupKey]?.variant || "";
    const matchingProjects = allProjects.filter((project) => {
      return (
        project.pDay === dayNum &&
        project.pMonth === currentMonth &&
        project.pYear === currentYear
      );
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
  const handleAgendaSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addAgenda({
        dateStr: agendaData.date,
        variant: agendaData.variant,
        taskCount: parseInt(agendaData.taskCount, 10),
      })
    );
    setAgendaData({ date: "", variant: "success", taskCount: "1" });
    setShowAgendaModal(false);
  };

  return (
    <div style={{ backgroundColor: "#F9FAFC", minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <Container fluid>
        <Row className="g-4">
          {/* LEFT PANEL */}
          <Col xl={4} lg={5} md={12}>
            <Card className="border-0 shadow-sm p-4 h-100" style={{ borderRadius: "24px" }}>
              <div className="mb-2">
                <h5 className="fw-bold m-0" style={{ color: "#1E1E2F" }}>Projects Details</h5>
              </div>
              <p className="text-muted small mb-4">{sidebarSubtitle}</p>
              <div className="d-flex flex-column gap-3">
                {combinedSidebarItems.length === 0 ? (
                  <div className="text-muted text-center py-5 small fst-italic">No projects or agendas added yet</div>
                ) : (
                  combinedSidebarItems.map((project, index) => {
                    const theme = getStatusTheme(project.iconBg);
                    return (
                      <div key={project.id || index} className="d-flex align-items-start gap-3 border-bottom pb-3 mb-2">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "44px",
                            height: "44px",
                            backgroundColor: theme.bg,
                            flexShrink: 0,
                          }}
                        >
                          <span style={{ color: theme.primaryColor, fontSize: "1.2rem", lineHeight: "1" }}>★</span>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.95rem", lineHeight: "1.4" }}>
                            {project.title}
                          </h6>
                          <div className="d-flex align-items-center gap-2 mt-1">
                            <img
                              src={project.image}
                              alt="Client Avatar"
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "1.5px solid #FFFFFF",
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.12)",
                                display: "block",
                              }}
                              onError={(e) => {
                                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.title}`;
                              }}
                            />
                            <span className="text-muted ms-2 fw-semibold" style={{ fontSize: "0.75rem" }}>
                              {project.date}
                            </span>
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
                <Button
                  variant="outline-success"
                  className="fw-semibold px-3 py-1 btn-sm"
                  style={{ borderRadius: "10px", borderColor: "#2ECC71", color: "#2ECC71" }}
                  onClick={handleResetToToday}
                >
                  Today {new Date().getDate()}
                </Button>
                <div className="d-flex align-items-center gap-3">
                  <Button
                    variant="light"
                    className="rounded-circle p-1 border-0 bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "32px", height: "32px" }}
                    onClick={handlePrevMonth}
                  >
                    <ChevronLeft size={14} className="text-dark" />
                  </Button>
                  <h5 className="m-0 fw-bold px-1 text-dark" style={{ fontSize: "1.1rem" }}>
                    {monthNames[currentMonth]} {currentYear}
                  </h5>
                  <Button
                    variant="light"
                    className="rounded-circle p-1 border-0 bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "32px", height: "32px" }}
                    onClick={handleNextMonth}
                  >
                    <ChevronRight size={14} className="text-dark" />
                  </Button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    className="border-0 px-3 py-1.5 fw-bold btn-sm d-flex align-items-center gap-1"
                    style={{ backgroundColor: "#2ECC71", color: "#FFF", borderRadius: "10px" }}
                    onClick={() => {
                      const today = new Date();
                      const formattedMonth = String(today.getMonth() + 1).padStart(2, "0");
                      const formattedDay = String(today.getDate()).padStart(2, "0");
                      setAgendaData((prev) => ({ ...prev, date: `${today.getFullYear()}-${formattedMonth}-${formattedDay}` }));
                      setShowAgendaModal(true);
                    }}
                  >
                    <Plus size={16} /> New Agenda
                  </Button>
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
                  <Col key={day} style={{ flex: "1 0 14.28%" }}>
                    {day}
                  </Col>
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
                          transition: "all 0.15s ease-in-out",
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
      {/* AGENDA CREATION MODAL */}
      <Modal show={showAgendaModal} onHide={() => setShowAgendaModal(false)} centered style={{ borderRadius: "24px" }}>
        <Modal.Header closeButton className="border-0 pt-4 px-4">
          <Modal.Title className="fw-bold" style={{ color: "#1E1E2F" }}>
            Add New Agenda Task
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAgendaSubmit}>
          <Modal.Body className="px-4 pb-4">
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">Deadline Date</Form.Label>
              <InputGroup>
                <InputGroup.Text
                  style={{ backgroundColor: "#F8F9FA", borderRight: "none", cursor: "pointer", borderRadius: "8px 0 0 8px" }}
                  onClick={(e) => {
                    const inputElem = e.currentTarget.nextElementSibling;
                    if (inputElem && typeof inputElem.showPicker === "function") {
                      inputElem.showPicker();
                    }
                  }}
                >
                  <Calendar2DateFill style={{ color: "#39D98A" }} size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  name="date"
                  required
                  value={agendaData.date}
                  onChange={(e) => setAgendaData({ ...agendaData, date: e.target.value })}
                  style={{ borderRadius: "0 8px 8px 0", borderLeft: "none" }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="agendaVariant">
              <Form.Label className="small fw-bold text-secondary">Visual Priority Color</Form.Label>
              <Form.Select
                value={agendaData.variant}
                onChange={(e) => setAgendaData({ ...agendaData, variant: e.target.value })}
                style={{ borderRadius: "10px", padding: "0.6rem" }}
              >
                <option value="success">Green (High/Finished)</option>
                <option value="warning">Orange (Pending/Alert)</option>
                <option value="purple">Purple (In Progress)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1" controlId="agendaCount">
              <Form.Label className="small fw-bold text-secondary">Task Queue Count</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="10"
                required
                value={agendaData.taskCount}
                onChange={(e) => setAgendaData({ ...agendaData, taskCount: e.target.value })}
                style={{ borderRadius: "10px", padding: "0.6rem" }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 px-4 pb-4 d-flex gap-2">
            <Button variant="light" onClick={() => setShowAgendaModal(false)} style={{ borderRadius: "10px" }}>
              Cancel
            </Button>
            <Button type="submit" variant="success" style={{ backgroundColor: "#2ECC71", borderColor: "#2ECC71", borderRadius: "10px" }}>
              Add Task Queue
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}