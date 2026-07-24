"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {HouseDoorFill,StarFill,PersonFill,GridFill,Calendar2Fill,ChatDotsFill,ChevronRight,
} from "react-bootstrap-icons";
import { RiSettingsFill } from 'react-icons/ri';

const Sidebar = ({ isOpen = true, showMobileOffcanvas, setShowMobileOffcanvas }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
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
    <div className="sidebar-container d-flex flex-column h-100">
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

          {/* Footer Branding Area - Positioned strictly right below Settings */}
          <div className="sidebar-footer mt-4 pt-3 px-3">
            <p className="footer-title mb-1 text-muted" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
              Fasto Saas Admin Dashboard
            </p>
            <p className="footer-copy text-muted mb-0" style={{ fontSize: '0.7rem' }}>
              © 2026 Indixpert Technologies Private Limited
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP VIEW */}
      {!isMobile && (
        <div className="h-100 d-none d-md-block">
          <NavLinks />
        </div>
      )}

      {/* MOBILE VIEW */}
      {isMobile && (
        <Offcanvas
          show={!!showMobileOffcanvas}
          onHide={handleClose}
          placement="start"
          className="bg-white d-md-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fw-bold fs-6 d-flex align-items-center gap-2">
              <img src="/fasto.png" alt="Fasto Logo" width="42" height="42" />
              Fasto
            </Offcanvas.Title>
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