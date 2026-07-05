import React from 'react';
import { Badge, Container } from 'react-bootstrap';
import { Messenger, Search } from 'react-bootstrap-icons';
import { IoNotifications } from 'react-icons/io5';

const Header = ({ onToggleSidebar, title }) => {
  const badgeStyle = {
    backgroundColor: '#43DC80 !important',
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
          <div className=" position-relative">
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
                marginLeft: "250px",
              }}
            />
          </div>
          <div className="text-muted position-relative d-inline-block ms-3" style={{ fontSize: '1.4rem', cursor: 'pointer' }}>
            <Messenger />
            <Badge
              pill
              className="position-absolute top-0 start-100 translate-middle rounded-circle px-2 py-1"
              style={badgeStyle}
            >
              6
            </Badge>
          </div>
          <div className="text-muted position-relative d-inline-block ms-3" style={{ fontSize: '1.4rem', cursor: 'pointer' }}>
            <IoNotifications />
            <Badge
              pill
              className="position-absolute top-0 start-100 translate-middle rounded-circle px-2 py-1"
              style={badgeStyle}
            >
              4
            </Badge>
          </div>
          <div className="ms-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10"
              alt="User profile"
              width="42"
              height="42"
              className="rounded-circle"
            />
          </div>
          <div className="text-dark"><b>Caryadee</b></div>

        </div>
      </div>
    </Container>
  );
};

export default Header;