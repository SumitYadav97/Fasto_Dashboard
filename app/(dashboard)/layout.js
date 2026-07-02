"use client";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./header/page";
import Sidebar from "./Sidebar/page";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container fluid className="overflow-hidden p-0">
      <Header onToggleSidebar={handleToggleSidebar} />
      <Row className="g-0 flex-nowrap">
        <Col
          style={{
            transition: "all 0.3s ease-in-out",
            width: isSidebarOpen ? "240px" : "0px",
            minWidth: isSidebarOpen ? "240px" : "0px",
            maxWidth: isSidebarOpen ? "240px" : "0px",
            opacity: isSidebarOpen ? 1 : 0,
            overflow: "hidden",
          }}
          className="bg-light min-vh-100"
        >
          <Sidebar isOpen={isSidebarOpen} />
        </Col>
        <Col className="bg-light min-vh-100 overflow-auto">
          {children}
        </Col>
      </Row>
    </Container>
  );
}