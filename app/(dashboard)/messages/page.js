"use client";
import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, InputGroup, Button, Nav } from 'react-bootstrap';
import { Plus, Search, ThreeDotsVertical, Image, Paperclip, ArrowLeft, FileEarmarkText } from 'react-bootstrap-icons';

const Messages = () => {
    const imageRef = useRef(null);
    const fileRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [showChat, setShowChat] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [chatHistory, setChatHistory] = useState([
        {
            id: 1,
            sender: "Roberto Charloz",
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...",
            time: "4:30 AM",
            isMe: false,
            isImage: false,
            isFile: false
        },
        {
            id: 2,
            sender: "Me",
            text: "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est...",
            time: "9:30 AM",
            isMe: true,
            isImage: false,
            isFile: false
        }
    ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMessage = {
            id: Date.now(),
            sender: "Me",
            text: messageInput.trim(),
            time: timestamp,
            isMe: true,
            isImage: false,
            isFile: false
        };
        setChatHistory(prev => [...prev, newMessage]);
        setMessageInput("");
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
                isImage: true,
                isFile: false
            };
            setChatHistory(prev => [...prev, newImageMessage]);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newFileMessage = {
            id: Date.now(),
            sender: "Me",
            text: file.name,
            time: timestamp,
            isMe: true,
            isImage: false,
            isFile: true
        };

        setChatHistory(prev => [...prev, newFileMessage]);
        e.target.value = "";
    };

    return (
        <div>
            {/*  ACCEPT ONLY JPEG AND PNG IMAGES */}
            <input
                type="file"
                accept=".jpeg,.jpg,.png"
                ref={imageRef}
                className="d-none"
                onChange={handleImageChange}
            />
            {/*  ACCEPT ONLY PDF AND DOC/DOCX FILES */}
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileRef}
                className="d-none"
                onChange={handleFileChange}
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
                                <Button className="rounded-pill px-3 py-2 d-flex align-items-center gap-1 border-0" style={{ background: "#43DC80" }}>
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

                    <Col
                        md={8}
                        className={`h-100 ps-md-0 ${!showChat ? 'd-none d-md-flex' : 'd-flex'}`}
                    >
                        <Card className="border-0 shadow-sm h-100 rounded-4 p-3 p-md-4 d-flex flex-column overflow-hidden">
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3 flex-shrink-0">
                                <div className="d-flex align-items-center gap-2">
                                    <Button
                                        variant="link"
                                        className="p-0 me-2 text-dark d-md-none"
                                        onClick={() => setShowChat(false)}
                                    >
                                        <ArrowLeft size={24} />
                                    </Button>
                                    <h5 className="mb-0 fw-bold text-truncate">Roberto Charloz</h5>
                                </div>
                                <div className="d-flex align-items-center gap-2 gap-md-3">
                                    <span className="text-muted small text-nowrap">Last seen 4:23 AM</span>
                                    <ThreeDotsVertical className="text-muted" />
                                </div>
                            </div>

                            <div className="flex-grow-1 overflow-y-auto pe-1 mb-3">
                                {chatHistory.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`d-flex align-items-start gap-2 gap-md-3 mb-3 w-75 ${msg.isMe ? 'ms-auto justify-content-end' : ''}`}
                                    >
                                        {!msg.isMe && (
                                            <div className="position-relative flex-shrink-0">
                                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '35px', height: '35px' }} alt="avatar" className="rounded-circle" />
                                                <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                            </div>
                                        )}

                                        <div className={`min-w-0 ${msg.isMe ? 'd-flex flex-column align-items-end' : ''}`}>
                                            <div
                                                className={`p-2 p-md-3 rounded-4 rounded-top-0 text-break ${msg.isMe
                                                    ? (msg.isImage || msg.isFile) ? 'p-2 bg-light border text-dark' : 'text-white'
                                                    : 'bg-light text-dark'
                                                    }`}
                                                style={{ backgroundColor: msg.isMe && !msg.isImage && !msg.isFile ? '#7B52FF' : undefined }}
                                            >
                                                {msg.isImage ? (
                                                    <img src={msg.text} alt="Attachment" className="img-fluid rounded-3" style={{ maxHeight: "200px" }} />
                                                ) : msg.isFile ? (
                                                    <div className="d-flex align-items-center gap-2 p-1">
                                                        <FileEarmarkText size={24} className="text-danger flex-shrink-0" />
                                                        <div className="min-w-0">
                                                            <div className="text-truncate fw-bold small">{msg.text}</div>
                                                            <small className="text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Document</small>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    msg.text
                                                )}
                                            </div>
                                            <small className="text-muted d-block mt-1 px-2" style={{ fontSize: '0.75rem' }}>{msg.time}</small>
                                        </div>

                                        {msg.isMe && (
                                            <div className="position-relative flex-shrink-0">
                                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWHhjLYmF_qh7AF05ua-ciqqYu8qWyvjV8lsSW_3C2g&s=10' style={{ width: '35px', height: '35px' }} alt="avatar" className="rounded-circle" />
                                                <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1"></span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <Form onSubmit={handleSendMessage} className="flex-shrink-0">
                                <InputGroup
                                    className="border rounded-4 p-1 p-md-2 align-items-center bg-white"
                                    style={{ borderColor: "#2ECC71" }}
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Type message..."
                                        className="border-0 shadow-none ps-2"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                    />
                                    <div className="d-flex align-items-center gap-2 px-1 px-md-2">
                                        <Image size={18} style={{ cursor: "pointer" }} onClick={() => imageRef.current?.click()} />
                                        <Paperclip size={18} style={{ cursor: "pointer" }} onClick={() => fileRef.current?.click()} />
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
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Messages;