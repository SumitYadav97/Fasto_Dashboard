"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HouseDoorFill,
  StarFill,
  PersonFill,
  GridFill,
  Calendar2Fill,
  ChatRightTextFill,
  GearFill,
  ChevronDown,
  ChevronRight
} from "react-bootstrap-icons";

const Sidebar = ({ isOpen = true }) => {
  const pathname = usePathname();

  // Manage open/closed state of dropdowns
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  // Helper to check active routes
  const isActive = (path) => pathname === path;

  if (!isOpen) return null;

  return (
    <div className="sidebar-container d-flex flex-column justify-content-between">
      {/* Navigation Links */}
      <div className="sidebar-links-wrapper">

        {/* Dashboard Link (Active State Example) */}
        <Link
          href="/"
          className={`sidebar-link ${isActive('/') ? 'active' : ''}`}
        >
          <span className="icon-wrapper">
            <HouseDoorFill size={20} />
          </span>
          <span className="link-text">Dashboard</span>
        </Link>

        {/* Projects (Standard Link - No Dropdown) */}
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
          className={`sidebar-link justify-content-between ${isActive('/messages') ? 'active' : ''}`}
        >
          <span className="d-flex align-items-center">
            <span className="icon-wrapper">
              <ChatRightTextFill size={20} />
            </span>
            <span className="link-text">Messages</span>
          </span>
          <span className="arrow-indicator"><ChevronRight size={14} /></span>
        </Link>

        {/* Settings */}
        <Link
          href="/settings"
          className={`sidebar-link ${isActive('/settings') ? 'active' : ''}`}
        >
          <span className="icon-wrapper">
            <GearFill size={20} />
          </span>
          <span className="link-text">Settings</span>
        </Link>

      </div>

      {/* Footer Branding Area */}
      <div className="sidebar-footer">
        <p className="footer-title">Fasto Saas Admin Dashboard</p>
        <p className="footer-copy">© 2020 All Rights Reserved</p>
        <p className="footer-author">
          Made with <span className="heart-icon">❤️</span> by Peterdraw
        </p>
      </div>
    </div>
  );
};

export default Sidebar;