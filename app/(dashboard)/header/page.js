import React from 'react';
import { Messenger, Search } from 'react-bootstrap-icons';
import { IoNotifications } from 'react-icons/io5';
const Header = ({ onToggleSidebar, title }) => {
  return (
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
        <img src="/fasto.png" alt="" width="42" height="42" />
        <h3 style={{ color: "#4B8067" }}> <b>Fasto</b></h3>
        <img
          src='grid.png'
          alt="toggle menu"
          onClick={onToggleSidebar}
          style={{ marginLeft: "50px", cursor: "pointer" }}
        />

        <h4 style={{ marginLeft: "170px" }}> <b>{title}</b></h4>
        
        <div style={{ marginLeft: "250px" }}>
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
        <div style={{ marginLeft: "120px" }} className='text-muted'>
          <Messenger />
        </div>
        <div style={{ marginLeft: "20px" }} className='text-muted'>
          <IoNotifications />
        </div>
        <div style={{ marginLeft: "65px" }} >
          <img src="/user2.png" alt="" width="42" height="42" />
        </div>
        <div><b>Caryadee</b></div>
      </div>
    </div>
  )
}

export default Header;