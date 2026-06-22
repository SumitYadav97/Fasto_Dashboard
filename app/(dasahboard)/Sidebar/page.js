
"use client";
import Link from 'next/link';
import React from 'react'
import { Button, Col } from 'react-bootstrap';
import { Calendar2Fill, GearFill, GridFill, HouseExclamationFill, Messenger, PersonFill, StarFill } from "react-bootstrap-icons";


const Sidebar = () => {
  return (<>
     {/* Sidebar */}
     
   <div className="dashboard-card sidebar-card">
    <Button
      as={Link}
      href="/projects/new"
      className="w-100 mb-4 rounded-pill"
      style={{ background: "#36d97e", border: "none" }}
    >
      + New Project
    </Button>

    <div className="d-grid gap-3 text-start">
      <Button as={Link} href="/" variant="outline-secondary" className="rounded-pill border text-start d-flex align-items-center">
        <HouseExclamationFill className="me-2" /> Dashboard
      </Button>
      <Button as={Link} href="/projects" variant="outline-secondary" className="rounded-pill border text-start d-flex align-items-center">
        <StarFill className="me-2" /> Projects
      </Button>
      <Button as={Link} href="/contacts" variant="outline-secondary" className="rounded-pill border text-start d-flex align-items-center">
        <PersonFill className="me-2" /> Contacts
      </Button>
      <Button as={Link} href="/kanban" variant="outline-secondary" className="rounded-pill border text-start d-flex align-items-center">
        <GridFill className="me-2" /> Kanban
      </Button>
      <Button as={Link} href="/calendar" variant="outline-secondary" className="rounded-pill border text-start d-flex align-items-center">
        <Calendar2Fill className="me-2" /> Calendar
      </Button>
      <Button as={Link} href="/messages" variant="outline-secondary" className="rounded-pill border text-start d-flex align-items-center">
        <Messenger className="me-2" /> Messages
      </Button>
      <Button as={Link} href="/settings" variant="outline-secondary" className="rounded-pill border text-start d-flex align-items-center">
        <GearFill className="me-2" /> Setting
      </Button>
    </div>
  </div>
  </>
 
  )
}

export default Sidebar
