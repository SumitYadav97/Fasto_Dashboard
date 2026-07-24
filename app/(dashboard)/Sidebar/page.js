"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  HouseDoorFill,
  StarFill,
  PersonFill,
  GridFill,
  Calendar2Fill,
  ChatDotsFill,
  ChevronRight,
} from "react-bootstrap-icons";
import { RiSettingsFill } from 'react-icons/ri';

const Sidebar = ({ isOpen = true, showMobileOffcanvas, setShowMobileOffcanvas }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Bootstrap md breakpoint is 768px
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => {
    const cleanPathname = pathname?.replace(/\/$/, "") || "";
    const cleanTarget = path?.replace(/\/$/, "") || "";
    return cleanPathname === cleanTarget;
  };

  const handleClose = () => {
    if (setShowMobileOffcanvas) setShowMobileOffcanvas(false);
  };

  if (!isOpen) return null;

  const NavLinks = () => (
    <div className="sidebar-container d-flex flex-column justify-content-between h-100">
      <div className="sidebar-top">
        <div className="sidebar-links-wrapper">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={handleClose}
            className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <span className="icon-wrapper"><HouseDoorFill size={20} /></span>
            <span className="link-text">Dashboard</span>
          </Link>
          {/* Projects */}
          <Link
            href="/projects"
            onClick={handleClose}
            className={`sidebar-link ${isActive('/projects') ? 'active' : ''}`}
          >
            <span className="icon-wrapper"><StarFill size={20} /></span>
            <span className="link-text">Projects</span>
          </Link>
          {/* Contact */}
          <Link
            href="/contacts"
            onClick={handleClose}
            className={`sidebar-link justify-content-between ${isActive('/contacts') ? 'active' : ''}`}
          >
            <span className="d-flex align-items-center">
              <span className="icon-wrapper"><PersonFill size={20} /></span>
              <span className="link-text">Contact</span>
            </span>
            <span className="arrow-indicator"><ChevronRight size={14} /></span>
          </Link>
          {/* Kanban */}
          <Link
            href="/kanban"
            onClick={handleClose}
            className={`sidebar-link justify-content-between ${isActive('/kanban') ? 'active' : ''}`}
          >
            <span className="d-flex align-items-center">
              <span className="icon-wrapper"><GridFill size={20} /></span>
              <span className="link-text">Kanban</span>
            </span>
            <span className="arrow-indicator"><ChevronRight size={14} /></span>
          </Link>
          {/* Calendar */}
          <Link
            href="/calendar"
            onClick={handleClose}
            className={`sidebar-link ${isActive('/calendar') ? 'active' : ''}`}
          >
            <span className="icon-wrapper"><Calendar2Fill size={20} /></span>
            <span className="link-text">Calendar</span>
          </Link>
          {/* Messages */}
          <Link
            href="/messages"
            onClick={handleClose}
            className={`sidebar-link ${isActive('/messages') ? 'active' : ''}`}
          >
            <span className="icon-wrapper"><ChatDotsFill size={20} /></span>
            <span className="link-text">Messages</span>
          </Link>
          {/* Settings */}
          <Link
            href="/setting"
            onClick={handleClose}
            className={`sidebar-link ${isActive('/setting') ? 'active' : ''}`}
          >
            <span className="icon-wrapper"><RiSettingsFill size={20} /></span>
            <span className="link-text">Settings</span>
          </Link>
        </div>
      </div>
      {/* Footer Branding Area */}
      <div className="sidebar-footer">
        <p className="footer-title">Fasto Saas Admin Dashboard</p>
        <p className="footer-copy">© 2026 Indixpert Technologies Private Limited</p>
      </div>
    </div>
  );
  return (
    <>
      {/* DESKTOP VIEW */}
      {!isMobile && (
        <div className="h-100">
          <NavLinks />
        </div>
      )}

      {/* MOBILE VIEW: Offcanvas < 768px */}
      {isMobile && (
        <Offcanvas
          show={!!showMobileOffcanvas}
          onHide={handleClose}
          placement="start"
          className="bg-white"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fw-bold fs-5">Fasto Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <NavLinks />
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
};

export default Sidebar;