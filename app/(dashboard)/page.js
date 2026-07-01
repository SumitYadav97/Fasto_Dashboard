"use client";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Calendar, PlusSquare, StarFill, PersonFill, GridFill, ChatLeftTextFill, ChevronRight } from "react-bootstrap-icons";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ProjectCreatedChart = () => {
  const categories = ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: ["#2ed573"],
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: 4,
        borderRadiusApplication: "end",
        colors: {
          backgroundBarColors: Array(categories.length).fill("#f1f5f9"),
          backgroundBarOpacity: 1,
          backgroundBarRadius: 4,
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#94a3b8", fontSize: "11px" } },
    },
    yaxis: {
      show: false,
    },
    tooltip: { theme: "light" },
    dataLabels: { enabled: false },
  };

  const series = [
    {
      name: "Projects Created",
      data: [35, 48, 80, 42, 48, 48, 30, 45, 33, 46, 49, 40, 62, 70, 85],
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h6 style={{ color: "#0f172a", margin: "0 0 4px 0", fontWeight: "600" }}>Project Created</h6>
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a" }}>25%</span>
            <span style={{ color: "#2ed573", fontSize: "14px", lineHeight: "1" }}>▲</span>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>last month $563,443</span>
          </div>
        </div>
        <div style={{ cursor: "pointer", color: "#64748b", fontSize: "18px" }}>⋮</div>
      </div>
      <div style={{ marginTop: "15px" }}>
        <ReactApexChart options={options} series={series} type="bar" height={160} />
      </div>
    </div>
  );
};

const NewClientsChart = () => {
  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: ["#2ed573"],
    stroke: {
      curve: "smooth",
      width: 4,
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#94a3b8", fontSize: "12px", fontWeight: "500" } },
    },
    yaxis: {
      show: false,
    },
    markers: {
      size: [0, 0, 0, 6],
      colors: ["#62DC43"],
      strokeColors: "#fff",
      strokeWidth: 3,
      hover: { size: 8 }
    },
    tooltip: {
      theme: "light",
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        if (dataPointIndex === 3) {
          return (
            '<div style="padding: 8px 12px; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center;">' +
            '<div style="font-weight: 700; color: #0f172a; font-size: 13px;">567 Person</div>' +
            '<div style="color: #94a3b8; font-size: 11px; margin-top: 1px;">April 5th, 2020</div>' +
            '</div>'
          );
        }
        return `<div style="padding: 6px 10px; font-size: 12px;">${series[seriesIndex][dataPointIndex]} Persons</div>`;
      }
    },
    dataLabels: { enabled: false },
  };
  const series = [
    {
      name: "Clients",
      data: [12, 24, 18, 42],
    },
  ];
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px", position: "relative" }}>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h6 style={{ color: "#0f172a", margin: 0, fontWeight: "600" }}>New Clients</h6>
        <div style={{ cursor: "pointer", color: "#64748b" }}>⋮</div>
      </div>
      <ReactApexChart options={options} series={series} type="line" height={165} />
      <ChevronRight
        style={{
          position: "absolute",
          right: "15px",
          bottom: "22px",
          color: "#cbd5e1",
          fontSize: "14px",
          cursor: "pointer"
        }}
      />
    </div>
  );
};
const MonthlyTargetChart = () => {
  const options = {
    chart: {
      type: "radialBar",
      background: "transparent"
    },
    colors: ["#2ed573"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%"
        },
        track: {
          background: "#f1f5f9"
        },
        dataLabels: {
          name: { show: false },
          value: {
            show: true,
            fontSize: "20px",
            fontWeight: "700",
            color: "#0f172a",
            offsetY: 8
          }
        }
      }
    },
    stroke: {
      lineCap: "round"
    }
  };

  const series = [60];

  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h6 style={{ color: "#0f172a", margin: 0, fontWeight: "600" }}>Monthly Target</h6>
        <div style={{ cursor: "pointer", color: "#64748b" }}>⋮</div>
      </div>
      <ReactApexChart options={options} series={series} type="radialBar" height={165} />
      <div className="text-center" style={{ fontSize: "12px", color: "#94a3b8", marginTop: "0px" }}>
        100 Projects/ monthly
      </div>
    </div>
  );
};
const ReleasedChart = () => {
  const options = {
    chart: { type: "line", height: 350, stacked: false, toolbar: { show: false } },
    stroke: { width: [0, 2, 5], curve: "smooth" },
    plotOptions: { bar: { columnWidth: "50%" } },
    xaxis: { categories: [] },
  };
  const series = [
    { name: "TEAM A", type: "column", data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] },
    { name: "TEAM B", type: "area", data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43] },
  ];
  return <ReactApexChart options={options} series={series} type="line" height={230} />;
};

const ContactsChart = () => {
  const options = {
    chart: { type: "radialBar" },
    labels: ["Contacts"],
    plotOptions: { radialBar: { hollow: { size: "70%" } } },
  };
  const series = [70];
  return <ReactApexChart options={options} series={series} type="radialBar" height={230} />;
};

const sampleAvatar = "https://cdn-icons-png.flaticon.com/512/1999/1999625.png";
const avatars = [sampleAvatar, sampleAvatar, sampleAvatar, sampleAvatar];

const Dashboard = () => (
  <Row className="g-4">
    <Col md={12} lg={12}>
      <Row className="g-4">
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm stat-card">
            <div className="card-underline underline-purple"></div>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold">78</h2>
                <small>Total Project Handled</small>
              </div>
              <StarFill className="icon-purple" />
            </Card.Body>
          </Card>
        </Col>
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

      {/* Charts Grid Layout */}
      <Row className="g-4 mb-4 mt-3">
        <Col md={6}>
          <div className="dashboard-card p-0 border-0">
            <ProjectCreatedChart />
          </div>
        </Col>
        <Col md={3}>
          <div className="dashboard-card p-0 border-0">
            <NewClientsChart />
          </div>
        </Col>
        <Col md={3}>
          <div className="dashboard-card p-0 border-0">
            <MonthlyTargetChart />
          </div>
        </Col>
      </Row>
      <Row className="g-4">
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
                <ContactsChart />
              </div>
            </Col>
          </Row>

          <div className="dashboard-card">
            <h6>Recent Messages</h6>
            <Card className="border-0 shadow-sm p-2">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="fw-bold mb-0">Recent Messages</h6>
                  <button className="new_message rounded-pill">+ New Message</button>
                </div>

                <div className="d-flex mb-4">
                  <div className="me-3">
                    <img src="/user.png" alt="" width="45" height="45" className="rounded-circle" />
                  </div>
                  <div>
                    <h6 className="mb-1">Laura Chyan</h6>
                    <p className="small text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <small className="text-muted">5m ago</small>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="me-3">
                    <img src="/user2.png" alt="" width="45" height="45" className="rounded-circle" />
                  </div>
                  <div>
                    <h6 className="mb-1">Olivia Rellaq</h6>
                    <p className="small text-muted mb-2">Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>
                    <small className="text-muted">25m ago</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Right Elements  */}
        <Col lg={6}>
          <Row className="g-4">
            <Col md={6} lg={6}>
              <div className="dashboard-card border-bottom">
                <h5>Upcoming Projects</h5>
                <div className="mt-3"><b>Redesign Kripton <div>Mobile App</div></b></div>
                <div className="yoast mt-3">Yoast Esac</div>
                <div className="text-muted mt-3"><Calendar /> Created on sep 8th 2020</div>
                <div className="mt-3"><b>Tuesday,Sep 29th 2020</b></div>
              </div>
            </Col>

            <Col md={6} lg={6}>
              <div>
                <div className="todo-card">
                  <Card.Body className="d-flex justify-content-between align-items-center to-do" style={{ height: "110px", borderRadius: "20px" }}>
                    <div className="todo-text">
                      <h5><b>Quick To-Do List</b></h5>
                      <p>Lorem ipsum</p>
                    </div>
                    <PlusSquare className="icon icon-plus" />
                  </Card.Body>
                </div>

                <Card className="mt-3">
                  <Card.Body>
                    <p className="graphic-designer mt-3"><b>Graphic Designer</b></p>
                    <p><b>Visual Graphic for Presentation to Client</b></p>
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