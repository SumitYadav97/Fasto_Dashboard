"use client";
import { useRef, useState } from "react";
import * as Yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Nav } from 'react-bootstrap';
import { Plus, Search, ThreeDotsVertical, Image, Paperclip, ArrowLeft } from 'react-bootstrap-icons';

const Messages = () => {
    const imageRef = useRef(null);
    const fileRef = useRef(null);
    const [showChat, setShowChat] = useState(false);

    const defaultMessages = [
        {
            id: 1,
            sender: "Roberto Charloz",
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...",
            time: "4:30 AM",
            isMe: false,
            isImage: false
        },
        {
            id: 2,
            sender: "Me",
            text: "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est...",
            time: "9:30 AM",
            isMe: true,
            isImage: false
        }
    ];

    const [chatHistory, setChatHistory] = useState(defaultMessages);
    const handleImageClick = () => {
        imageRef.current?.click();
    };
    const handleFileClick = () => {
        fileRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newImageMessage = {
                id: Date.now(),
                sender: "Me",
                text: reader.result,
                time: timestamp,
                isMe: true,
                isImage: true
            };

            setChatHistory(prev => [...prev, newImageMessage]);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };
    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={imageRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
            <input
                type="file"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={(e) => console.log("file selected", e.target.files[0])}
            />
            <Container fluid className="vh-100 bg-light p-2 p-md-4">
                <Row className="h-100 g-0 g-md-3">
                    <Col
                        md={4}
                        className={`flex-column h-100 pe-md-3 ${showChat ? 'd-none d-md-flex' : 'd-flex'}`}
                    >
                        <Card className="border-0 shadow-sm mb-3 p-3 rounded-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className="position-relative me-3">
                                        <div className="rounded-circle bg-secondary-subtle" style={{ width: '50px', height: '50px' }}></div>
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
                        <Card className="border-0 shadow-sm flex-grow-1 p-3 rounded-4 d-flex flex-column overflow-hidden">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Nav variant="pills" defaultActiveKey="all" className="gap-1 gap-md-2 flex-nowrap overflow-x-auto text-nowrap">
                                    <Nav.Item><Nav.Link eventKey="all" className="text-dark fw-bold bg-transparent px-2">All</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="unread" className="text-muted bg-transparent px-2">Unread</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="archived" className="text-muted bg-transparent px-2">Archived</Nav.Link></Nav.Item>
                                </Nav>
                                <ThreeDotsVertical className="text-muted flex-shrink-0" />
                            </div>
                            <Form className="mb-3">
                                <InputGroup className="bg-light rounded-pill border p-1">
                                    <Form.Control
                                        placeholder="Search..."
                                        className="bg-transparent border-0 shadow-none ps-3"
                                    />
                                    <InputGroup.Text className="bg-transparent border-0 text-muted">
                                        <Search size={16} />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form>
                            <div className="flex-grow-1 overflow-auto pe-1">
                                {/* Clicking this contact activates chat view on mobile */}
                                <div
                                    className="p-3 mb-2 rounded-3 d-flex align-items-start gap-3"
                                    style={{ background: "#FFFCE4", cursor: "pointer" }}
                                    onClick={() => setShowChat(true)}
                                >
                                    <div className="position-relative flex-shrink-0">
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '45px', height: '45px' }} alt="user" className="rounded-circle" />
                                        <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                    </div>
                                    <div className="flex-grow-1 min-w-0">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="mb-1 text-truncate">Roberto Charloz</h6>
                                            <small className="text-muted flex-shrink-0 ms-2">2m ago</small>
                                        </div>
                                        <p className="text-muted mb-0 small text-truncate">Hey, check my design update last night...</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* RIGHT SIDEBAR: Hidden on mobile when chat view is inactive */}
                    <Col
                        md={8}
                        className={`h-100 ps-md-0 ${!showChat ? 'd-none d-md-flex' : 'd-flex'}`}
                    >
                        <Card className="border-0 shadow-sm h-100 rounded-4 p-3 p-md-4 d-flex flex-column justify-content-between overflow-hidden">
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                <div className="d-flex align-items-center gap-2">
                                    {/* Mobile Back Button */}
                                    <Button
                                        variant="link"
                                        className="p-0 me-2 text-dark d-md-none"
                                        onClick={() => setShowChat(false)}
                                    >
                                        <ArrowLeft size={24} />
                                    </Button>
                                    <div>
                                        <h5 className="mb-0 fw-bold text-truncate">Roberto Charloz</h5>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-2 gap-md-3">
                                    <span className="text-muted small text-nowrap">Last seen 4:23 AM</span>
                                    <ThreeDotsVertical className="text-muted" />
                                </div>
                            </div>

                            {/* Scrollable messages container */}
                            <div className="flex-grow-1 pe-1 mb-3" style={{ overflowY: 'auto', height: '0px' }}>
                                {chatHistory.map((msg) => {
                                    if (!msg.isMe) {
                                        return (
                                            <div key={msg.id} className="d-flex align-items-start gap-2 gap-md-3 max-w-85 max-w-md-75 mb-3">
                                                <div className="position-relative flex-shrink-0">
                                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '35px', height: '35px' }} alt="avatar" className="rounded-circle" />
                                                    <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="bg-light p-2 p-md-3 rounded-4 rounded-top-0 text-dark text-break">
                                                        {msg.isImage ? (
                                                            <img src={msg.text} alt="Shared attachment" className="img-fluid rounded-3" style={{ maxHeight: "200px" }} />
                                                        ) : (
                                                            msg.text
                                                        )}
                                                    </div>
                                                    <small className="text-muted d-block mt-1 ps-2" style={{ fontSize: '0.75rem' }}>{msg.time}</small>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={msg.id} className="d-flex align-items-start gap-2 gap-md-3 max-w-85 max-w-md-75 ms-auto justify-content-end mb-3">
                                                <div className="d-flex flex-column align-items-end min-w-0">
                                                    <div className={msg.isImage ? "p-1 rounded-4 rounded-end-0 bg-light border" : "text-white p-2 p-md-3 rounded-4 rounded-end-0 text-break"} style={{ backgroundColor: msg.isImage ? 'transparent' : '#7B52FF', maxWidth: "100%" }}>
                                                        {msg.isImage ? (
                                                            <img src={msg.text} alt="My uploaded snapshot" className="img-fluid rounded-3" style={{ maxHeight: "200px", display: "block" }} />
                                                        ) : (
                                                            msg.text
                                                        )}
                                                    </div>
                                                    <small className="text-muted d-block mt-1 pe-2" style={{ fontSize: '0.75rem' }}>{msg.time}</small>
                                                </div>
                                                <div className="position-relative flex-shrink-0">
                                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '35px', height: '35px' }} alt="avatar" className="rounded-circle" />
                                                    <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>

                            {/* Message Input Box */}
                            <Formik
                                initialValues={{ message: "" }}
                                validationSchema={Yup.object({
                                    message: Yup.string().trim().required("Message is required"),
                                })}
                                onSubmit={(values, { resetForm }) => {
                                    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    const newMessage = {
                                        id: Date.now(),
                                        sender: "Me",
                                        text: values.message,
                                        time: timestamp,
                                        isMe: true,
                                        isImage: false
                                    };
                                    setChatHistory(prev => [...prev, newMessage]);
                                    resetForm();
                                }}
                            >
                                {({ values, handleChange, handleBlur, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit} className="mt-auto">
                                        <InputGroup
                                            className="border border-success rounded-4 p-1 p-md-2 align-items-center bg-white"
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
                                            <div className="d-flex align-items-center gap-2 px-1 px-md-2">
                                                <Image size={18} style={{ cursor: "pointer" }} onClick={handleImageClick} />
                                                <Paperclip size={18} style={{ cursor: "pointer" }} onClick={handleFileClick} />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="rounded-3 px-3 px-md-4 py-2 border-0 d-flex align-items-center"
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
    );
};

export default Messages;