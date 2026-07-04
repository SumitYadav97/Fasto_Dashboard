"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./(dashboard)/header/page";
import Sidebar from "./(dashboard)/Sidebar/page";
import Dashboard from "./(dashboard)/page";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname(); 

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const getHeaderTitle = (path) => {
    switch (path) {
      case "/calendar": return "Calendar";
      case "/contacts": return "Contacts";
      case "/Data": return "Data Management";
      case "/kanban": return "Kanban Board";
      case "/messages": return "Messages";
      case "/projects": return "Projects";
      default: return "Dashboard"; 
    }
  };

  return (
    <Container fluid className="overflow-hidden p-0">
      <Header title={getHeaderTitle(pathname)} onToggleSidebar={handleToggleSidebar} />

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
          <div className="p-4">
            <Dashboard />
          </div>
        </Col>
      </Row>
    </Container>
  );
}