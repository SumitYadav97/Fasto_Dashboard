"use client";
// import Link from 'next/link';
import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import { Calendar, Calendar2Fill, GearFill, HouseExclamationFill, Messenger, Person, PlusSquare } from "react-bootstrap-icons";
import { StarFill, PersonFill, GridFill, ChatLeftTextFill, } from "react-bootstrap-icons";
import './../../public/user.png'
import './../../public/user2.png'

const ApexChart = ({ title }) => {
  const options = {
    chart: {
      type: "area",
      height: 300,
      toolbar: { show: false },
    },
    title: {
      text: title,
      align: "left",
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  };

  const series = [
    { name: "Sales", data: [31, 40, 28, 51, 42, 109] },
    { name: "Revenue", data: [11, 32, 45, 32, 34, 52] },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={300}
    />
  );
};

const TemperatureChart = () => {
  const options = {
    chart: {
      type: "rangeArea",
      height: 300,
    },
    title: {
      text: "Temperature",
      align: "left",
    },
  };

  const series = [
    {
      name: "Temperature",
      data: [
        { x: "Jan", y: [-2, 4] },
        { x: "Feb", y: [-1, 6] },
        { x: "Mar", y: [3, 10] },
        { x: "Apr", y: [8, 16] },
        { x: "May", y: [13, 22] },
        { x: "Jun", y: [18, 26] },
      ],
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="rangeArea"
      height={300}
    />
  );
};

const DonutChart = () => {
  const options = {
    labels: ["A", "B", "C", "D", "E"],
    title: {
      text: "Revenue",
      align: "left",
    },
  };

  const series = [44, 55, 41, 17, 15];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={300}
    />
  );
};

const ReleasedChart = () => {
  const options = {
    chart: {
      type: "line",
      height: 350,
      stacked: false,
    },

    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },

    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },

    xaxis: {
      categories: [

      ],
    },
  };

  const series = [
    {
      name: "TEAM A",
      type: "column",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
      name: "TEAM B",
      type: "area",
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },

  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={290}
    />
  );
};

const Contacts = () => {
  const options = {
    chart: {
      type: "radialBar",
    },
    labels: ["Contacts"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },
  };

  const series = [70];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height={300}
    />
  );
};
const messages = [
  {
    id: 1,
    name: "Laura Chyon",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut",
    time: "5m ago",
  },
  {
    id: 2,
    name: "Olivia Relloq",
    text: "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    time: "25m ago",
  },
  {
    id: 3,
    name: "Keanu Tipes",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut",
    time: "41m ago",
  },
];
const sampleAvatar =
  "https://cdn-icons-png.flaticon.com/512/1999/1999625.png";

const avatars = [
  sampleAvatar,
  sampleAvatar,
  sampleAvatar,
  sampleAvatar,

];
const Dashboard = () => (
  <Row className="g-4">
    {/* Sidebar */}
    {/* <Col lg={2}>
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
      
        <Button 
          as={Link} 
          href="/" 
          variant="outline-secondary" 
          className="rounded-pill border text-start d-flex align-items-center"
        >
          <HouseExclamationFill className="me-2" />
          Dashboard
        </Button>

    
        <Button 
          as={Link} 
          href="/projects" 
          variant="outline-secondary" 
          className="rounded-pill border text-start d-flex align-items-center"
        >
          <StarFill className="me-2" /> Projects
        </Button>

       
        <Button 
          as={Link} 
          href="/contacts" 
          variant="outline-secondary" 
          className="rounded-pill border text-start d-flex align-items-center"
        >
          <PersonFill className="me-2" /> Contacts
        </Button>

     
        <Button 
          as={Link} 
          href="/kanban" 
          variant="outline-secondary" 
          className="rounded-pill border text-start d-flex align-items-center"
        >
          <GridFill className="me-2" /> Kanban
        </Button>

        
        <Button 
          as={Link} 
          href="/calendar" 
          variant="outline-secondary" 
          className="rounded-pill border text-start d-flex align-items-center"
        >
          <Calendar2Fill className="me-2" /> Calendar
        </Button>

        <Button 
          as={Link} 
          href="/messages" 
          variant="outline-secondary" 
          className="rounded-pill border text-start d-flex align-items-center"
        >
          <Messenger className="me-2" /> Messages
        </Button>

        <Button 
          as={Link} 
          href="/settings" 
          variant="outline-secondary" 
          className="rounded-pill border text-start d-flex align-items-center"
        >
          <GearFill className="me-2" /> Setting
        </Button>
      </div>
    </div>
    </Col> */}

    {/* Main Content */}
    <Col md={12} lg={12}>
      <Row className="g-4">
        {/* Card 1 */}
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm stat-card">
            <div className="card-underline underline-purple"></div>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold">78</h2>
                <small>Total Project Handled</small>
              </div>
              <StarFill className=" icon-purple" />
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm stat-card">
            <div className="card-underline underline-orange"></div>

            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold">214</h2>
                <small>Contacts You Have</small>
              </div>

              <PersonFill className="icon icon-orange" />
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm stat-card">
            <div className="card-underline underline-pink"></div>

            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold">93</h2>
                <small>Total Unfinished Task</small>
              </div>

              <GridFill className="icon icon-pink" />
            </Card.Body>
          </Card>
        </Col>

        {/* Card 4 */}
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm stat-card">
            <div className="card-underline underline-blue"></div>

            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold">12</h2>
                <small>Unread Messages</small>
              </div>

              <ChatLeftTextFill className="icon icon-blue" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Top Stats */}
      <Row className="g-4 mb-4 mt-3">
        <Col md={6}>
          <div className="dashboard-card">
            <ApexChart title="North Region" />
          </div>
        </Col>

        <Col md={3}>
          <div className="dashboard-card">
            <TemperatureChart />
          </div>
        </Col>

        <Col md={3}>
          <div className="dashboard-card">
            <DonutChart />
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Left */}
        <Col lg={6}>
          <Row className="g-4 mb-4">
            <Col md={6}>
              <div className="dashboard-card">
                <h6>Project Released</h6>
                <ReleasedChart />
              </div>
            </Col>

            <Col md={6}>
              <div className="dashboard-card">
                <h6>Contacts Added</h6>
                <Contacts />
              </div>
            </Col>
          </Row>

          <div className="dashboard-card">
            <h6>Recent Messages</h6>
            <Card className="border-0 shadow-sm p-2">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="fw-bold mb-0">Recent Messages</h6>

                  <button className="new_message rounded-pill">
                    + New Message
                  </button>
                </div>

                {/* Message 1 */}
                <div className="d-flex mb-4">
                  <div className="position-relative me-3">
                    <img src="/user.png"
                      alt=""
                      width="45"
                      height="45"
                      className="rounded-circle"
                    />

                  </div>

                  <div>
                    <h6 className="mb-1">Laura Chyan</h6>
                    <p className="small text-muted mb-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <small className="text-muted">5m ago</small>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <img src="/user2.png"
                      alt=""
                      width="45"
                      height="45"
                      className="rounded-circle"
                    />
                  </div>

                  <div>
                    <h6 className="mb-1">Olivia Rellaq</h6>
                    <p className="small text-muted mb-2">
                      Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                    </p>
                    <small className="text-muted">25m ago</small>
                  </div>
                </div>

                {/* Message 3 */}
                <div className="d-flex">
                  <div className="position-relative me-3">
                    <img src="/user.png"
                      alt=""
                      width="45"
                      height="45"
                      className="rounded-circle"
                    />

                  </div>
                  <div>
                    <h6 className="mb-1">Keanu Tipes</h6>
                    <p className="small text-muted mb-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <small className="text-muted">41m ago</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Right */}
        <Col lg={6}>
          <Row className="g-4 ">
            <Col md={6} lg={6}>
              <div className="dashboard-card border-bottom">

                <div><h5>Upcoming Projects</h5></div>
                <div className="mt-3 "><b>Redesign Kripton <div>Mobile App</div>
                </b></div>
                <div className="yoast mt-3">Yoast Esac</div>
                <div className="text-muted mt-3"><Calendar /> Created on sep 8th 2020</div>
                <div className="mt-3 text-muted"><img src="/deadline.png" alt="Deadline" style={{ height: "50px", width: "50px" }} />Deadline</div>
                <div className="mt-3"><b>Tuesday,Sep 29th 2020</b></div>

              </div>
              <div className="dashboard-card  border-bottom">

                <div><h5>Upcoming Projects</h5></div>
                <div className="mt-3 "><b>Redesign Kripton <div>Mobile App</div>
                </b></div>
                <div className="text-muted mt-3"><Calendar /> Created on sep 8th 2020</div>
                <div className="mt-3 text-muted"><img src="/deadline.png" alt="Deadline" style={{ height: "50px", width: "50px" }} />Deadline</div>
                <div className="mt-3"><b>Tuesday,Sep 29th 2020</b></div>

              </div>
              <div className="dashboard-card  border-bottom">

                <div><h5>Upcoming Projects</h5></div>
                <div className="mt-3 "><b>Redesign Kripton <div>Mobile App</div>
                </b></div>
                <div className="text-muted mt-3"><Calendar /> Created on sep 8th 2020</div>
                <div className="mt-3 text-muted"><img src="/deadline.png" alt="Deadline" style={{ height: "50px", width: "50px" }} />Deadline</div>
                <div className="mt-3"><b>Tuesday,Sep 29th 2020</b></div>

              </div>
            </Col>

            <Col md={6} lg={6}>
              <div>
                <div className="todo-card">
                  <Card.Body className="d-flex justify-content-between align-items-center to-do"
                    style={{ height: "110px", borderRadius: "20px" }}>
                    <div className="todo-text">
                      <h5> <b>Quick To-Do List</b></h5>
                      <p>Lorem ipsum</p>
                    </div>
                    <PlusSquare className="icon icon-plus" />
                  </Card.Body>
                </div>
                {/* To-do-card=1 */}
                <Card className="mt-3">
                  <Card.Body>
                    <p className="graphic-designer mt-3">
                      <b>Graphic Designer</b>
                    </p>

                    <p>
                      <b>Visual Graphic for Presentation to Client</b>
                    </p>


                    <div className="d-flex align-items-center justify-content-between">
                      <p className="text-muted mb-0">Aug 4 2020</p>

                      <div className="avatar-group">
                        {avatars.map((avatar, index) => (
                          <img
                            key={index}
                            src={avatar}
                            alt={`avatar-${index}`}
                            className="avatar-group-img"
                            style={{
                              left: `${index * 18}px`,
                              zIndex: avatars.length - index,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                {/* To-do-card=2 */}
                <Card className="mt-3">
                  <Card.Body>
                    <p className="graphic-designer mt-3">
                      <b>Graphic Designer</b>
                    </p>

                    <p>
                      <b>Visual Graphic for Presentation to Client</b>
                    </p>


                    <div className="d-flex align-items-center justify-content-between">
                      <p className="text-muted mb-0">Aug 4 2020</p>

                      <div className="avatar-group">
                        {avatars.map((avatar, index) => (
                          <img
                            key={index}
                            src={avatar}
                            alt={`avatar-${index}`}
                            className="avatar-group-img"
                            style={{
                              left: `${index * 18}px`,
                              zIndex: avatars.length - index,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                {/* To-do-card=1 */}
                <Card className="mt-3">
                  <Card.Body>
                    <p className="graphic-designer mt-3">
                      <b>Graphic Designer</b>
                    </p>

                    <p>
                      <b>Visual Graphic for Presentation to Client</b>
                    </p>

                    {/* Date + Avatar Group */}
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="text-muted mb-0">Aug 4 2020</p>

                      <div className="avatar-group">
                        {avatars.map((avatar, index) => (
                          <img
                            key={index}
                            src={avatar}
                            alt={`avatar-${index}`}
                            className="avatar-group-img"
                            style={{
                              left: `${index * 18}px`,
                              zIndex: avatars.length - index,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default Dashboard;