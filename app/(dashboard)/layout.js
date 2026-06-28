"use client";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./header/page";
import Sidebar from "./Sidebar/page";
export default function Layout({ children }) {
  return (
    <>
      <Container fluid>
        <Header />
        <Row className="g-0 ">

        <Col md={2} className="bg-light min-vh-100">
          <Sidebar />
        </Col>
          <Col md={10} className="bg-ligh">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}