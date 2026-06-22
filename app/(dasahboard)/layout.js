"use client";
import './../../public/fasto.png'
import React from "react";
import Sidebar from "./Sidebar/page"; // Adjust path if it's just component/Sidebar
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import Dashboard from "./page";
import { Messenger, Search } from 'react-bootstrap-icons';
import { IoNotifications } from 'react-icons/io5';
import './../../public/user2.png'
export default function DashboardLayout({ children }) {
  return (<>
<div className='mt-3 mb-3'>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        gap: "10px",
        marginLeft: "40px"
      }}
    >
      <img src="/fasto.png"
        alt=""
        width="42"
        height="42"
      />

      <h3 style={{ color: "#4B8067" }}> <b>Fasto</b></h3>
      <h4 style={{ marginLeft: "170px" }}> <b>Dashboard</b></h4>
      <div style={{marginLeft:"250px"}}>
      <input
    type="text"
    placeholder="Search here"
    style={{
      background: "#F1F1F1",
      color: "#AAAAAA",
      border: "none",
      width: "300px",
      padding: "10px 10px 10px 35px",
      borderRadius: "50px",
      outline: "none",
     
    }}
  />
  </div>
      <div style={{marginLeft:"120px"}} className='text-muted'>
        <Messenger />
      </div>
      <div style={{marginLeft:"20px"}} className='text-muted'>
        <IoNotifications    />
      </div>
      <div style={{marginLeft:"80px"}} > <img src="/user2.png"
        alt=""
        width="42"
        height="42"
      /></div>
      <div><b>Caryadee</b></div>
    </div>
</div>
    <Container fluid className="p-0">
      <Row className="g-0 min-vh-100">
        {/* Sidebar Column */}
        <Col md={2} className="bg-light border-end">
          <Sidebar />
        </Col>

        {/* Main Content Component Container */}
        <Col md={9} className="p-4 bg-light-subtle">
          <main>{children}</main>
          <Dashboard />
        </Col>
      </Row>
    </Container>
  </>
  );
}