"use client";
import { useRef } from "react";
import * as Yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Nav } from 'react-bootstrap';
import { Plus, Search, ThreeDotsVertical, Image, Paperclip, Send } from 'react-bootstrap-icons';

const Messages = () => {
    const imageRef = useRef(null);
    const fileRef = useRef(null);

    const handleImageClick = () => {
        imageRef.current?.click();
    };
    const handleFileClick = () => {
        fileRef.current?.click();
    };
    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={imageRef}
                style={{ display: "none" }}
                onChange={(e) => console.log("image selected", e.target.files[0])}
            />
            <input
                type="file"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={(e) => console.log("file selected", e.target.files[0])}
            />
            <Container fluid className="vh-100 bg-light p-4">
                <Row className="h-100">
                    {/* LEFT SIDEBAR: User Profile & Message List */}
                    <Col md={4} className="d-flex flex-column h-100 pe-3">
                        {/* User Profile Card */}
                        <Card className="border-0 shadow-sm mb-3 p-3 rounded-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className="position-relative me-3">
                                        <div className=" rounded-circle" style={{ width: '50px', height: '50px' }}></div>
                                        <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold">Caryadee Lawrence</h6>
                                        <small className="text-muted">Available</small>
                                    </div>
                                </div>
                                <Button className="rounded-pill px-3 py-2 d-flex align-items-center gap-1 bg-emerald border-0" style={{ background: "#43DC80" }}>
                                    <Plus size={18} /> <span className="small fw-bold">New</span>
                                </Button>
                            </div>
                        </Card>
                        {/* Messages Navigation & List Card */}
                        <Card className="border-0 shadow-sm flex-grow-1 p-3 rounded-4 d-flex flex-column ">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Nav variant="pills" defaultActiveKey="all" className="gap-2">
                                    <Nav.Item><Nav.Link eventKey="all" className="text-dark fw-bold  bg-transparent">All Messages</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="unread" className="text-muted  bg-transparent">Unread</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="archived" className="text-muted  bg-transparent">Archived</Nav.Link></Nav.Item>
                                </Nav>
                                <ThreeDotsVertical className="text-muted" />
                            </div>
                            {/* Search Bar */}
                            <Form className="mb-3">
                                <InputGroup className="bg-light rounded-pill border p-1">
                                    <Form.Control
                                        placeholder="Search from people and group"
                                        className="bg-transparent border-0 shadow-none ps-3"
                                    />
                                    <InputGroup.Text className="bg-transparent border-0 text-muted">
                                        <Search size={16} />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form>
                            <div className="flex-grow-1 overflow-auto pe-1">
                                <div className="p-3 mb-2 rounded-3  d-flex align-items-start gap-3" style={{ background: "#FFFCE4" }}>
                                    <div className="position-relative ">
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '45px', height: '45px' }} />
                                        <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                    </div>
                                    <div className="flex-grow-1 min-w-0">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="mb-1 ">Roberto Charloz</h6>
                                            <small className="text-muted ">2m ago</small>
                                        </div>
                                        <p className="text-muted mb-0 small text-truncate-2">Hey, check my design update last night...</p>
                                    </div>
                                </div>

                                {/* Standard Chat Item */}
                                <div className="p-3 mb-2 rounded-3 d-flex align-items-start gap-3 hover-bg-light">
                                    <div className="position-relative ">
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '45px', height: '45px' }} />
                                        <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                    </div>
                                    <div className="flex-grow-1 min-w-0">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="mb-1 fw-bold text-truncate text-sm">Laura Chyan</h6>
                                            <small className="text-muted ">5m ago</small>
                                        </div>
                                        <p className="text-muted mb-0 small text-truncate-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </Col>

                    {/* RIGHT SIDEBAR: Chat Content Window */}
                    <Col md={8} className="h-100 ps-0">
                        <Card className="border-0 shadow-sm h-100 rounded-4 p-4 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                <div>
                                    <h5 className="mb-0 fw-bold">Roberto Charloz</h5>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <span className="text-muted small">Last seen 4:23 AM</span>
                                    <ThreeDotsVertical className="text-muted" />
                                </div>
                            </div>
                            <div>
                                {/* Left  Message */}
                                <div className="d-flex align-items-start gap-3 max-w-75">
                                    <div className="position-relative ">
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '45px', height: '45px' }} />
                                        <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                    </div>
                                    <div>
                                        <div className="bg-light p-3 rounded-4 rounded-top-0 text-dark">
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...
                                        </div>
                                        <small className="text-muted d-block mt-1 ps-2">4:30 AM</small>
                                    </div>
                                </div>

                                {/* Right Message */}
                                <div className="d-flex flex-column align-items-end max-w-75 ms-auto">
                                    <div className=" text-white p-3 rounded-4 rounded-end-0" style={{ backgroundColor: '#7B52FF', width: "400px" }}>
                                        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est...
                                    </div>
                                    <small className="text-muted d-block mt-1 pe-2">9:30 AM</small>
                                </div>
                                <div className="d-flex align-items-start gap-3 max-w-75 ms-auto justify-content-end">
                                    <div className="d-flex flex-column align-items-end">
                                        <div className=" text-white p-3 rounded-4 rounded-end-0" style={{ backgroundColor: '#7B52FF', width: "300px" }}>
                                            nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
                                        </div>
                                        <small className="text-muted d-block mt-1 pe-2">9:30 AM</small>
                                    </div>
                                    <div className="position-relative ">
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '45px', height: '45px' }} />
                                        <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                    </div>
                                </div>
                            </div>
                            {/* Message Input Box */}
                            <Formik
                                initialValues={{ message: "" }}
                                validationSchema={Yup.object({
                                    message: Yup.string().trim().required("Message is required"),
                                })}
                                onSubmit={(values, { resetForm }) => {
                                    console.log(values);
                                    resetForm();
                                }}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit} className="mt-auto">

                                        <InputGroup
                                            className="border border-success rounded-4 p-2 align-items-center bg-white"
                                            style={{ borderColor: "#2ECC71" }}
                                        >

                                            <Form.Control
                                                type="text"
                                                name="message"
                                                placeholder="Type message..."
                                                className="border-0 shadow-none ps-2"
                                                value={values.message}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <div className="d-flex align-items-center gap-2 px-2">
                                                <Image
                                                    size={20}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={handleImageClick}
                                                />

                                                <Paperclip
                                                    size={20}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={handleFileClick}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="rounded-3 px-4 py-2 border-0 d-flex align-items-center gap-2"
                                                style={{ background: "#43DC80" }}
                                            >
                                                <span className="fw-bold small">SEND</span>
                                            </Button>
                                        </InputGroup>

                                    </Form>
                                )}
                            </Formik>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Messages
