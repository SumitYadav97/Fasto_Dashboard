import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./(dashboard)/Sidebar/page";
import Header from "./(dashboard)/header/page";
import Dashboard from "./(dashboard)/page";

export default function Home() {
  return (
    <Container fluid>
    <Header/>
      <Row>
        <Col md={2} className="bg-light min-vh-100">
          <Sidebar />
        </Col>
        <Col md={10} className="p-4">
          <Dashboard />
        </Col>
      </Row>
    </Container>
  );
}