"use client";


import { Container, Row, Col } from "react-bootstrap";
import Header from "./header/page";
import Sidebar from "./Sidebar/page";

export default function Layout({ children }) {
  return (
    <>
      <Container fluid>
        <Header />
        <Row className="g-0 min-vh-100">

          <Col md={2} className="bg-light border-end min-vh-100">
            <Sidebar />
          </Col>
          <Col md={10} className="p-4 bg-light-subtle">
            {children}
          </Col>

        </Row>
      </Container>
    </>
  );
}