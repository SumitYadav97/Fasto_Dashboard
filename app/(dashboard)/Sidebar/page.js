"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HouseDoorFill,
  StarFill,
  PersonFill,
  GridFill,
  Calendar2Fill,
  ChatDotsFill,
  ChevronRight
} from "react-bootstrap-icons";
import { BsFillHeartFill } from 'react-icons/bs';
import { RiSettingsFill } from 'react-icons/ri';

const Sidebar = ({ isOpen = true }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => {
    const cleanPathname = pathname?.replace(/\/$/, "") || "";
    const cleanTarget = path?.replace(/\/$/, "") || "";
    return cleanPathname === cleanTarget;
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!isOpen) return null;

  return (
    <div className="sidebar-container d-flex flex-column justify-content-between">
      <div className="sidebar-top">
        {/* Sidebar Navigation Links */}
        <div className="sidebar-links-wrapper">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <span className="icon-wrapper">
              <HouseDoorFill size={20} />
            </span>
            <span className="link-text">Dashboard</span>
          </Link>

          {/* Projects */}
          <Link
            href="/projects"
            className={`sidebar-link ${isActive('/projects') ? 'active' : ''}`}
          >
            <span className="icon-wrapper">
              <StarFill size={20} />
            </span>
            <span className="link-text">Projects</span>
          </Link>

          {/* Contact */}
          <Link
            href="/contacts"
            className={`sidebar-link justify-content-between ${isActive('/contacts') ? 'active' : ''}`}
          >
            <span className="d-flex align-items-center">
              <span className="icon-wrapper">
                <PersonFill size={20} />
              </span>
              <span className="link-text">Contact</span>
            </span>
            <span className="arrow-indicator"><ChevronRight size={14} /></span>
          </Link>

          {/* Kanban */}
          <Link
            href="/kanban"
            className={`sidebar-link justify-content-between ${isActive('/kanban') ? 'active' : ''}`}
          >
            <span className="d-flex align-items-center">
              <span className="icon-wrapper">
                <GridFill size={20} />
              </span>
              <span className="link-text">Kanban</span>
            </span>
            <span className="arrow-indicator"><ChevronRight size={14} /></span>
          </Link>

          {/* Calendar */}
          <Link
            href="/calendar"
            className={`sidebar-link ${isActive('/calendar') ? 'active' : ''}`}
          >
            <span className="icon-wrapper">
              <Calendar2Fill size={20} />
            </span>
            <span className="link-text">Calendar</span>
          </Link>

          {/* Messages */}
          <Link
            href="/messages"
            className={`sidebar-link ${isActive('/messages') ? 'active' : ''}`}
          >
            <span className="icon-wrapper">
              <ChatDotsFill size={20} />
            </span>
            <span className="link-text">Messages</span>
          </Link>
          {/* Settings */}
          <Link
            href="/setting"
            className={`sidebar-link ${isActive('/setting') ? 'active' : ''}`}
          >
            <span className="icon-wrapper">
              <RiSettingsFill size={20} />
            </span>
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
};

export default Sidebar;