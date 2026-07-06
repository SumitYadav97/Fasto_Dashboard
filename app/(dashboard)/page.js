"use client";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Calendar, PlusSquare, StarFill, PersonFill, GridFill, ChatLeftTextFill, ChevronRight, ChatLeft } from "react-bootstrap-icons";
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
    chart: {
      type: "line",
      sparkline: { enabled: true },
      background: "transparent"
    },
    colors: ["#2ed573"],
    stroke: {
      curve: "smooth",
      width: 2.5
    },
    tooltip: { enabled: false }
  };

  const series = [
    {
      name: "Project Released",
      data: [35, 32, 45, 33, 30, 52, 38, 43, 14, 28, 25, 42, 36, 28]
    }
  ];

  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px 20px 0 24px", overflow: "hidden", height: "126px" }}>
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "16px" }}>
        <span style={{ color: "#475569", fontSize: "13.5px", fontWeight: "600" }}>Project Released</span>
        <div className="d-flex align-items-center gap-1">
          <span style={{ color: "#f97316", fontSize: "10px" }}>▼</span>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>4%</span>
        </div>
      </div>
      <div style={{ margin: "0 -24px -2px -24px" }}>
        <ReactApexChart options={options} series={series} type="line" height={72} />
      </div>
    </div>
  );
};

const ContactsChart = () => {
  const options = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true }
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
            fontSize: "13px",
            fontWeight: "600",
            color: "#2ed573",
            offsetY: 4
          }
        }
      }
    },
    stroke: {
      lineCap: "round"
    }
  };
  const series = [29];

  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "126px" }}>
      <div style={{ width: "85px", height: "85px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ReactApexChart options={options} series={series} type="radialBar" height={115} width={115} />
      </div>
      <div className="text-end">
        <h3 style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a", margin: "0 0 2px 0", lineHeight: "1" }}>567</h3>
        <p style={{ fontSize: "13px", color: "#64748b", margin: 0, fontWeight: "500" }}>Contacts Added</p>
      </div>
    </div>
  );
};

const UpcomingProjects = () => {
  const projects = [
    {
      client: "Yoast Esac",
      title: "Redesign Kripton Mobile App",
      created: "Sep 8th, 2020",
      deadline: "Tuesday, Sep 29th 2020"
    },
    {
      client: "Yoast Esac",
      title: "Build Branding Persona for Etza.id",
      created: "Sep 8th, 2020",
      deadline: "Tuesday, Sep 29th 2020"
    },
    {
      client: "Yoast Esac",
      title: "Manage SEO for Eclan Company Profile",
      created: "Sep 8th, 2020",
      deadline: "Tuesday, Sep 29th 2020"
    }
  ];

  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px", height: "100%", boxShadow: "0 2px 12px rgba(0,0,0,0.02)" }}>
      <h5 style={{ color: "#0f172a", fontWeight: "700", fontSize: "16px", marginBottom: "24px" }}>Upcoming Projects</h5>

      {projects.map((proj, idx) => (
        <div key={idx} style={{ marginBottom: idx !== projects.length - 1 ? "40px" : "0" }}>
          <div style={{ color: "#2ed573", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
            {proj.client}
          </div>

          <div className="d-flex justify-content-between align-items-start">
            <h6 style={{ color: "#0f172a", fontWeight: "700", fontSize: "14.5px", lineHeight: "1.4", margin: 0, maxWidth: "85%" }}>
              {proj.title}
            </h6>
            <span style={{ color: "#64748b", fontSize: "16px", cursor: "pointer", marginTop: "-2px" }}>⋮</span>
          </div>

          <div className="d-flex align-items-center gap-2 mt-2" style={{ color: "#94a3b8", fontSize: "12px" }}>
            <Calendar size={12} />
            <span>Created on {proj.created}</span>
          </div>

          <div className="d-flex align-items-center gap-3 mt-3">
            <img src="deadline.png" alt="Deadline" style={{ width: "42px", height: "42px", objectFit: "contain" }} />
            <div>
              <div style={{ color: "#94a3b8", fontSize: "11px", fontWeight: "500" }}>Deadline</div>
              <div style={{ color: "#0f172a", fontSize: "13px", fontWeight: "600", marginTop: "1px" }}>{proj.deadline}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// const sampleAvatar = "https://cdn-icons-png.flaticon.com/512/1999/1999625.png";
// const taskCardsData = [
//   {
//     category: "Graphic Designer",
//     categoryColor: "#d97706",
//     title: "Visual Graphic for Presentation to Client",
//     date: "Aug 4, 2020",
//     avatarsCount: 4,
//   },
//   {
//     category: "Database Engineer",
//     categoryColor: "#22c55e",
//     title: "Build Database Design for Fasto Admin v2",
//     date: "Aug 4, 2020",
//     avatarsCount: 3,
//   },
//   {
//     category: "Digital Marketing",
//     categoryColor: "#a855f7",
//     title: "Make Promotional Ads for Instagram Fasto's",
//     date: "Aug 4, 2020",
//     avatarsCount: 3,
//     hasComments: true,
//     commentsText: "2 Comment"
//   }
// ];

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
              <div className="dashboard-card p-0 border-0">
                <ReleasedChart />
              </div>
            </Col>
            <Col md={6}>
              <div className="dashboard-card p-0 border-0">
                <ContactsChart />
              </div>
            </Col>
          </Row>

          <div className="dashboard-card">
            <h6>Recent Messages</h6>
            <Card className="border-light shadow-sm p-2">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="fw-bold mb-0">Recent Messages</h6>
                  <button className="new_message rounded-pill">+ New Message</button>
                </div>

                <div className="d-flex mb-4">
                  <div className="me-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10" alt="" width="45" height="45" className="rounded-circle" />
                  </div>
                  <div>
                    <h6 className="mb-1">Laura Chyan</h6>
                    <p className="small text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <small className="text-muted">5m ago</small>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="me-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10" alt="" width="45" height="45" className="rounded-circle" />
                  </div>
                  <div>
                    <h6 className="mb-1">Olivia Rellaq</h6>
                    <p className="small text-muted mb-2">Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor</p>
                    <small className="text-muted">25m ago</small>
                  </div>
                </div>
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10" alt="" width="45" height="45" className="rounded-circle" />
                  </div>
                  <div>
                    <h6 className="mb-1">Keanu Tipes</h6>
                    <p className="small text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
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
              <UpcomingProjects />
            </Col>

            <Col md={6} lg={6}>
              <div>
                <div className="todo-card">
                  <Card.Body
                    className="d-flex justify-content-between align-items-center to-do text-white p-4"
                    style={{
                      height: "110px",
                      borderRadius: "20px",
                      backgroundColor: "#8A42CE",
                      width: "auto"
                    }}
                  >
                    <div className="todo-text text-start overflow-hidden me-auto">
                      <h5 className="mb-1"><b>Quick To-Do List</b></h5>
                      <p className="mb-0 opacity-50 text-nowrap" style={{ fontSize: '0.8rem' }}>
                        Lorem ipsum dolor sit amet
                      </p>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center text-white"
                      style={{
                        backgroundColor: "#AB6BFA",
                        width: "40px",
                        height: "40px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontSize: "1.35rem",
                       marginBottom:"5px"
                       
                      }}
                    >
                      +
                    </div>
                  </Card.Body>
                </div>
                <div className="p-3" style={{ backgroundColor: "#f8fafc", maxWidth: "400px" }}>

                  <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
                    <Card.Body className="p-4">
                      <div style={{ color: "#BA8B54", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                        Graphic Deisgner
                      </div>
                      <h6 style={{ color: "#0f172a", fontWeight: "700", fontSize: "14px", lineHeight: "1.5", marginBottom: "20px" }}>
                        Visual Graphic for Presentation to Client
                      </h6>
                      <div className="d-flex align-items-center justify-content-between">
                        <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "500" }}>Oct 12, 2026</span>

                        {/* Avatar Group Container */}
                        <div className="avatar-group" style={{ height: "40px", position: "relative", minWidth: "70px" }}>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 1"
                            style={{ width: "40px", height: "40px", left: "0px", zIndex: "4", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 2"
                            style={{ width: "40px", height: "40px", left: "14px", zIndex: "3", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 3"
                            style={{ width: "40px", height: "40px", left: "40px", zIndex: "2", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 4"
                            style={{ width: "40px", height: "40px", left: "42px", zIndex: "1", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 mt-3 pt-2" style={{ borderTop: "1px solid #f1f5f9", color: "#64748b", fontSize: "12px", fontWeight: "500" }}>
                        <ChatLeft size={13} />
                        <span>4 comments</span>
                      </div>
                    </Card.Body>
                  </Card>

                  {/* --- CARD 2: --- */}
                  <Card className="mt-3 border-0 shadow-sm" style={{ borderRadius: "16px" }}>
                    <Card.Body className="p-4">
                      <div style={{ color: "#68E35D", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                        Database Engineer
                      </div>
                      <h6 style={{ color: "#0f172a", fontWeight: "700", fontSize: "14px", lineHeight: "1.5", marginBottom: "20px" }}>
                        Build Database Design for Fasto Admin v2
                      </h6>
                      <div className="d-flex align-items-center justify-content-between">
                        <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "500" }}>Oct 15, 2026</span>

                        {/* Avatar Group Container */}
                        <div className="avatar-group" style={{ height: "40px", position: "relative", minWidth: "55px" }}>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 1"
                            style={{ width: "40px", height: "40px", left: "0px", zIndex: "3", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 2"
                            style={{ width: "40px", height: "40px", left: "14px", zIndex: "2", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 3"
                            style={{ width: "40px", height: "40px", left: "40px", zIndex: "1", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                        </div>
                      </div>

                    </Card.Body>
                  </Card>
                  {/* --- CARD : 3  --- */}
                  <Card className="mt-3 border-0 shadow-sm" style={{ borderRadius: "16px" }}>
                    <Card.Body className="p-4">
                      <div style={{ color: "#BC37DD", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                        Digital Marketing
                      </div>
                      <h6 style={{ color: "#0f172a", fontWeight: "700", fontSize: "14px", lineHeight: "1.5", marginBottom: "20px" }}>
                        Make Promotional Ads for Instagram Fasto’s                      </h6>
                      <div className="d-flex align-items-center justify-content-between">
                        <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "500" }}>Oct 15, 2026</span>

                        {/* Avatar Group Container */}
                        <div className="avatar-group" style={{ height: "40px", position: "relative", minWidth: "55px" }}>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 1"
                            style={{ width: "40px", height: "40px", left: "0px", zIndex: "3", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 2"
                            style={{ width: "40px", height: "40px", left: "14px", zIndex: "2", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1UudzAjmRWshl8nje_qRavdCv5V9IqDvvGNmPMmS6A&s=10"
                            alt="Google Logo 3"
                            style={{ width: "40px", height: "40px", left: "40px", zIndex: "1", position: "absolute", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff", objectFit: "contain", padding: "3px" }}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
);
export default Dashboard;