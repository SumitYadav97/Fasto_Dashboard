'use client';
import { useState } from 'react';
import { Row, Col, Button, Container, Image, Modal, Form } from 'react-bootstrap';
import { Grid3x3GapFill, List, Lock } from "react-bootstrap-icons";
import { TbWriting } from "react-icons/tb";
import { kanbanData as initialKanbanData } from '../Data/kanban_data/page';

const Kanban = () => {
    const [boardData, setBoardData] = useState(initialKanbanData);
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState('');
    const [role, setRole] = useState('');
    const [targetColumnId, setTargetColumnId] = useState(initialKanbanData[0]?.id || '');
    const [expandedColumns, setExpandedColumns] = useState({});

    const handleClose = () => {
        setShowModal(false);
        setTask('');
        setRole('');
    };
    const handleShow = () => setShowModal(true);

    const handleCreateProject = (e) => {
        e.preventDefault();
        if (!task.trim() || !role.trim()) return alert("Please fill in all fields.");

        const newCard = {
            id: `card-${Date.now()}`,
            task: task,
            role: role,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            assignees: []
        };
        const updatedBoard = boardData.map(column => {
            if (column.id === targetColumnId) {
                return {
                    ...column,
                    cards: [...column.cards, newCard]
                };
            }
            return column;
        });
        setBoardData(updatedBoard);
        handleClose();
    };
    const handleToggleLoadMore = (columnId) => {
        setExpandedColumns(prev => ({
            ...prev,
            [columnId]: !prev[columnId]
        }));
    };

    return (
        <Container fluid className="px-4 py-3">
            <section className="mb-2">
                <div><h3><b>Project Fasto V2.1</b></h3></div>
            </section>
            <div className="text-muted mb-3" style={{ fontSize: '14px' }}>
                Created by Lidya Chan on June 31, 2020
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="mb-4">
                <Button variant="secondary"> <TbWriting /> Edit</Button>
                <Button variant="secondary" style={{ marginLeft: "10px" }}> <Lock /> Private</Button>

                {/* Circle logos stacked container */}
                <div className="circle-container">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="circle" />
                    ))}
                </div>

                <div className="d-flex justify-content-end align-items-center gap-3 w-100">
                    <Button
                        variant="success"
                        className="py-2 rounded-3 fw-bold border-0"
                        style={{ backgroundColor: '#4de193' }}
                        onClick={handleShow}
                    >
                        New Project
                    </Button>
                    <div className="d-flex text-muted gap-2 fs-5">
                        <List style={{ cursor: 'pointer' }} className="text-secondary" />
                        <Grid3x3GapFill style={{ cursor: 'pointer', opacity: 0.5, color: "#43DC80" }} />
                    </div>
                </div>
            </div>

            <div className="container-fluid py-4 bg-light min-vh-100 rounded-3">
                <Row className="g-3">
                    {boardData.map((column) => {
                        // Check if current column instance has been expanded by the user
                        const isExpanded = !!expandedColumns[column.id];
                        const visibleCards = isExpanded ? column.cards : column.cards.slice(0, 5);
                        const hasMoreThanFive = column.cards.length > 5;

                        return (
                            <Col key={column.id} xs={12} md={6} lg={3}>

                                {/* Dynamic Column Header */}
                                <div className="p-3 rounded-3 text-white shadow-sm" style={{ backgroundColor: column.bgColor }}>
                                    <h6 className="m-0 fw-bold">
                                        {column.title} ({column.cards.length})
                                    </h6>
                                    <small className="opacity-75" style={{ fontSize: '11px' }}>{column.subtitle}</small>
                                </div>

                                {/* Cards Stack Container */}
                                <div className="d-flex flex-column gap-3 mt-3">
                                    {visibleCards.map((card) => (
                                        <div key={card.id} className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                            <span className="fw-bold mb-2" style={{ color: card.roleColor, fontSize: '12px' }}>
                                                {card.role}
                                            </span>
                                            <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                                                {card.task}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                                <small className="text-muted" style={{ fontSize: '12px' }}>{card.date}</small>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    {card.assignees && card.assignees.length > 0 ? (
                                                        card.assignees.map((avatarUrl, idx) => (
                                                            <Image
                                                                key={idx}
                                                                roundedCircle
                                                                src={avatarUrl}
                                                                alt="avatar"
                                                                style={{
                                                                    width: "40px",
                                                                    height: "40px",
                                                                    border: "2px solid #fff",
                                                                    marginLeft: idx === 0 ? "0px" : "-20px",
                                                                    zIndex: idx
                                                                }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <Button style={{ background: "#E7FFF0", color: "#43DC80", border: "none" }} className="btn-sm fw-semibold">
                                                            +Assign People
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {column.cards.length === 0 && (
                                        <div className="border border-2 border-secondary rounded-3 p-4 text-center text-muted bg-white opacity-75" style={{ borderStyle: 'dashed' }}>
                                            Move card here
                                        </div>
                                    )}

                                    {hasMoreThanFive && (
                                        <Button
                                            variant={isExpanded ? "outline-secondary" : "outline-success"}
                                            className="w-100 fw-bold border-2 py-2 mt-2"
                                            style={!isExpanded ? { color: '#4DE193', borderColor: '#4DE193' } : {}}
                                            onClick={() => handleToggleLoadMore(column.id)}
                                        >
                                            {isExpanded ? "Show Less" : `Load More (+${column.cards.length - 5} items)`}
                                        </Button>
                                    )}
                                    {column.hasAddCard && (
                                        <Button
                                            variant="success"
                                            className="text-white w-100 py-2 fw-bold border-0"
                                            style={{ backgroundColor: '#4DE193' }}
                                            onClick={() => { setTargetColumnId(column.id); handleShow(); }}
                                        >
                                            + Add Card
                                        </Button>
                                    )}

                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
            {/* NEW PROJECT CREATION MODAL */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold fs-5">Add New Project Task</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreateProject}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Role</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=" UI/UX DESIGNER or FRONTEND"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task details..."
                                value={task} // Fixed: changed from role to task
                                onChange={(e) => setTask(e.target.value)} // Fixed: changed from setRole to setTask
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Kanban Column Stage</Form.Label>
                            <Form.Select
                                value={targetColumnId}
                                onChange={(e) => setTargetColumnId(e.target.value)}
                            >
                                {boardData.map(col => (
                                    <option key={col.id} value={col.id}>{col.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={handleClose} className="fw-semibold">
                            Cancel
                        </Button>
                        <Button type="submit" variant="success" className="fw-bold px-4" style={{ backgroundColor: '#4de193', border: 'none' }}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};
export default Kanban;