"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./header/page";
import Sidebar from "./Sidebar/page";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMobileOffcanvas, setShowMobileOffcanvas] = useState(false);
  const pathname = usePathname();
  const cleanPath = pathname?.replace(/\/$/, "") || "/";
  const renderFullWidth =
    cleanPath === "/" ||
    cleanPath === "/auth/login" ||
    cleanPath === "/auth/signup";
  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // Mobile View <768px
      setShowMobileOffcanvas(true);
    } else {
      // Desktop View 
      setIsSidebarOpen((prev) => !prev);
    }
  };

  const getHeaderTitle = (path) => {
    const normalized = path?.replace(/\/$/, "").toLowerCase() || "";

    if (normalized.startsWith("/dashboard")) return "Dashboard";
    if (normalized.startsWith("/calendar")) return "Calendar";
    if (normalized.startsWith("/contacts") || normalized.startsWith("/contact")) return "Contacts";
    if (normalized.startsWith("/data")) return "Data Management";
    if (normalized.startsWith("/kanban")) return "Kanban Board";
    if (normalized.startsWith("/messages")) return "Messages";
    if (normalized.startsWith("/projects")) return "Projects";
    if (normalized.startsWith("/setting")) return "Settings";

    return "Dashboard";
  };
  return (
    <Provider store={store}>
      {renderFullWidth ? (
        <main className="w-100 min-vh-100 bg-light">
          {children}
        </main>
      ) : (
        <Container fluid className="overflow-hidden p-0">
          <Header title={getHeaderTitle(pathname)} onToggleSidebar={handleToggleSidebar} />
          <Row className="g-0 flex-nowrap">
            {/* DESKTOP SIDEBAR */}
            <Col
              style={{
                transition: "all 0.3s ease-in-out",
                width: isSidebarOpen ? "240px" : "0px",
                minWidth: isSidebarOpen ? "240px" : "0px",
                maxWidth: isSidebarOpen ? "240px" : "0px",
                opacity: isSidebarOpen ? 1 : 0,
                overflow: "hidden",
              }}
              className="bg-light min-vh-100 d-none d-md-block"
            >
              <Sidebar isOpen={isSidebarOpen} />
            </Col>
            {/* MAIN CONTENT */}
            <Col className="bg-light min-vh-100 overflow-auto">
              {children}
            </Col>
          </Row>
          {/* MOBILE OFFCANVAS */}
          <div className="d-md-none">
            <Sidebar
              isOpen={true}
              showMobileOffcanvas={showMobileOffcanvas}
              setShowMobileOffcanvas={setShowMobileOffcanvas}
            />
          </div>
        </Container>
      )}
    </Provider>
  );
}