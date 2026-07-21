"use client";
import React, { useState, useEffect } from 'react';
import { Badge, Container } from 'react-bootstrap';
import { Messenger } from 'react-bootstrap-icons';
import { IoNotifications } from 'react-icons/io5';

const Header = ({ onToggleSidebar, title, user: userProp }) => {
  const [currentUser, setCurrentUser] = useState(userProp || null);

  useEffect(() => {
    if (!currentUser) {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          setCurrentUser(JSON.parse(storedUserData));
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e);
        }
      }
    }
  }, [currentUser]);

  const displayName = currentUser?.name || userProp?.name || "Cletus Duinkerk";

  const badgeStyle = {
    backgroundColor: '#43DC80',
    fontSize: '0.65rem',
    transform: 'translate(40%, -40%)'
  };

  return (
    <Container fluid>
      <div className="mt-3 mb-3">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
          className="px-2"
        >
          {/* Logo Section */}
          <img src="/fasto.png" alt="Fasto Logo" width="42" height="42" />
          <h3 style={{ color: "#4B8067" }} className="mb-0"><b>Fasto</b></h3>

          <img
            src="grid.png"
            alt="toggle menu"
            onClick={onToggleSidebar}
            style={{ cursor: "pointer" }}
            className="ms-4"
          />
          <h4 className="mb-0 ms-2"><b>{title}</b></h4>

          {/* Search Box */}
          <div className="position-relative ms-3">
            <input
              type="text"
              placeholder="Search here"
              style={{
                background: "#F1F1F1",
                color: "#AAAAAA",
                border: "none",
                width: "360px",
                padding: "10px 15px",
                borderRadius: "50px",
                outline: "none",
              }}
            />
          </div>
          {/* Right Aligned Section */}
          <div className="text-muted position-relative d-inline-block ms-auto" style={{ fontSize: '1.4rem', cursor: 'pointer' }}>
            <Messenger />
            <Badge
              pill
              className="position-absolute top-0 start-100 translate-middle rounded-circle px-2 py-1 bg-success"
              style={badgeStyle}
            >
              6
            </Badge>
          </div>

          <div className="text-muted position-relative d-inline-block ms-3" style={{ fontSize: '1.4rem', cursor: 'pointer' }}>
            <IoNotifications />
            <Badge
              pill
              className="position-absolute top-0 start-100 translate-middle rounded-circle px-2 py-1 bg-success"
              style={badgeStyle}
            >
              4
            </Badge>
          </div>

          {/* Dynamic User Profile Info */}
          <div className="ms-3 d-flex align-items-center gap-2">
            <div className="text-dark"><b>{displayName}</b></div>
            <img
              src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
              alt="User profile"
              width="42"
              height="42"
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />
          </div>

        </div>
      </div>
    </Container>
  );
};

export default Header;