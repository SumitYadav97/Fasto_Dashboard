"use client";
import React, { useState } from "react";
import {Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
} from "react-bootstrap";
import {
  Calendar2DateFill,
  List,
  Grid3x3GapFill,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";
import { mockarooData } from "../Data/page";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("ALL");
  const itemsPerPage = 5;

  const filteredData = mockarooData.filter((p) => {
    if (filter === "ALL") return true;
    return p.status?.toUpperCase() === filter;
  });
  const safeData = filteredData || [];
  const LastItem = currentPage * itemsPerPage;
  const FirstItem = LastItem - itemsPerPage;
  const currentItems = safeData.slice(FirstItem, LastItem);
  const totalPages = Math.max(
    1,
    Math.ceil(safeData.length / itemsPerPage)
  );
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

  const totalProjects = mockarooData.length;
  const onProgressCount = mockarooData.filter(
    (p) => p.status?.toUpperCase() === "ON PROGRESS"
  ).length;
  const pendingCount = mockarooData.filter(
    (p) => p.status?.toUpperCase() === "PENDING"
  ).length;
  const closedCount = mockarooData.filter(
    (p) => p.status?.toUpperCase() === "CLOSED"
  ).length;

  return (
    <div
      style={{
        backgroundColor: "#F8F9FA",
        minHeight: "100vh",
        padding: "1.5rem",
      }}
    >
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white"
          style={{ borderRadius: "16px", boxShadow: "0px 2px 6px rgba(0,0,0,0.02)" }}>

          <div className="d-flex align-items-center gap-4">

            <span
              onClick={() => setFilter("ALL")}
              className="d-flex align-items-center gap-2 text-dark fw-bold"
              style={{ cursor: "pointer", fontSize: "0.9rem" }}
            >
              All Projects
              <span className="badge rounded-pill " style={{background:"#43DC80"}}>
                {totalProjects}
              </span>
            </span>

            <span
              onClick={() => setFilter("ON PROGRESS")}
              className="d-flex align-items-center gap-2 text-muted"
              style={{ cursor: "pointer" }}
            >
              On Progress
              <span className="badge rounded-pill"
                style={{ backgroundColor: "#32A5FD", color: "#fff" }}>
                {onProgressCount}
              </span>
            </span>

            <span
              onClick={() => setFilter("PENDING")}
              className="d-flex align-items-center gap-2 text-muted"
              style={{ cursor: "pointer" }}
            >
              Pending
              <span className="badge rounded-pill"
                style={{ backgroundColor: "#FFAB2D", color: "#fff" }}>
                {pendingCount}
              </span>
            </span>

            <span
              onClick={() => setFilter("CLOSED")}
              className="d-flex align-items-center gap-2 text-muted"
              style={{ cursor: "pointer" }}
            >
              Closed
              <span className="badge rounded-pill"
                style={{ backgroundColor: "#FF544B", color: "#fff" }}>
                {closedCount}
              </span>
                <div className="d-flex align-items-center gap-3">
            <Button
              className="px-4 py-2 border-0 fw-normal"
              style={{ backgroundColor: '#2ECC71', color: '#fff', borderRadius: '10px', fontSize: '0.85rem',marginLeft:"300px" }}
            >
              New Project
            </Button>
            <div className="d-flex text-muted gap-2 fs-5 align-items-center border-start ps-3">
              <List style={{ cursor: 'pointer' }} className="text-muted opacity-50" size={20} />
              <Grid3x3GapFill style={{ cursor: 'pointer', color: "#2ECC71" }} size={18} />
            </div>
          </div>
            </span>
          </div>
        </div>
        {/* LIST */}
        {currentItems.map((project, index) => {
          const statusStyle = getStatusConfig(project.status);

          return (
            <Card
              key={project.id || index}
              className="mb-3 border-0 shadow-sm"
              style={{ borderRadius: "16px" }}
            >
              <Card.Body className="p-4">
                <Row className="align-items-center">

                  <Col md={4}>
                    <div className="fw-bold mb-1 " style={{color:"#43DC80"}}>
                      {project.id}
                    </div>
                    <h5>{project.title}</h5>
                    <small className="text-muted">
                      <Calendar2DateFill /> {project.createdDate}
                    </small>
                  </Col>

                  <Col md={2}>{project.client}</Col>
                  <Col md={2}>{project.client?.split(" ")[0]}</Col>
                  <Col md={2}>{project.deadline}</Col>

                  <Col md={2} className="text-end">
                    <Button
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        border: "none",
                        borderRadius: "20px",
                      }}
                    >
                      {project.status}
                    </Button>
                  </Col>

                </Row>
              </Card.Body>
            </Card>
          );
        })}

        {/* PAGINATION */}
        <div className="d-flex justify-content-between align-items-center mt-4">

          <div>
            Showing {FirstItem + 1} to{" "}
            {Math.min(LastItem, safeData.length)} of {safeData.length}
          </div>

          <Pagination>

            <Button style={{background:"#2ECC71",border:"#2ECC71"}}
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
            >
              <ChevronLeft /> Prev
            </Button>

            {getPaginationRange(currentPage, totalPages).map(
              (page, i) =>
                page === "..." ? (
                  <span key={i} className="px-2">
                    ...
                  </span>
                ) : (
                  <Button 
                    key={`${page}-${i}`}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      background:
                        currentPage === page ? "#2ECC71" : "#2ECC71",
                      color:
                        currentPage === page ? "#fff" : "#000",
                      margin: "0 2px",
                      border:"#2ECC71"
                    }}
                  >
                    {page}
                  </Button>
                )
            )}

            <Button style={{background:"#2ECC71",border:"#2ECC71"}}
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
            >
              Next <ChevronRight />
            </Button>

          </Pagination>
        </div>
      </Container>
    </div>
  );
}