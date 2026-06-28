'use client';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Grid3x3GapFill, List, Lock } from "react-bootstrap-icons";
import { TbWriting } from "react-icons/tb";

const kanban = () => {
    return (<>
        <Container>
            <section>
                <div><h3><b>Project Fasto V2.1</b></h3></div>
            </section>
            <div className="mt-3">Created by Lidya Chan on June 31, 2020</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button variant="secondary"> <TbWriting />Edit</Button>
                <Button variant="secondary" style={{ marginLeft: "10px" }}> <Lock />Private</Button>
                {/* Circle logo */}
                <div className="circle-container">
                    <div className="circle" />
                    <div className="circle" />
                    <div className="circle" />
                    <div className="circle" />
                    <div className="circle" />
                    <div className="circle" />
                    <div className="circle" />
                </div>
                <div className="d-flex justify-content-end align-items-center gap-3 w-100">
                    <Button variant="success" className="py-2 rounded-3 fw-bold border-0" style={{ backgroundColor: '#4de193' }}>
                        New Project
                    </Button>
                    <div className="d-flex text-muted gap-2 fs-5">
                        <List style={{ cursor: 'pointer' }} className="text-secondary" />
                        <Grid3x3GapFill style={{ cursor: 'pointer', opacity: 0.5, color: "#43DC80" }} />
                    </div>
                </div>
            </div>
            <div className="container-fluid py-4 bg-light min-vh-100">
                <Row className="g-3">

                    {/* 1. TO-DO  */}
                    <Col xs={12} md={6} lg={3}>
                        {/* Header */}
                        <div className="p-3 rounded-3 text-white shadow-sm" style={{ backgroundColor: '#7B61FF' }}>
                            <h6 className="m-0 fw-bold">To-Do (45)</h6>
                            <small className="opacity-75" style={{ fontSize: '11px' }}>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className="d-flex flex-column gap-3 mt-3">
                            {/* Card 1 */}
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#20C997', fontSize: '12px' }}>Content Writer</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Prepare proposal for client meeting</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#20C997', fontSize: '12px' }}>Content Writer</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Prepare proposal for client meeting</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#20C997', fontSize: '12px' }}>Content Writer</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Prepare proposal for client meeting</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#20C997', fontSize: '12px' }}>Content Writer</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Prepare proposal for client meeting</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#20C997', fontSize: '12px' }}>Content Writer</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Prepare proposal for client meeting</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline-success" className="w-100 fw-bold border-2 py-2 mt-2" style={{ color: '#4DE193', borderColor: '#4DE193' }}>
                                Load More
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        {/* Header */}
                        <div className="p-3 rounded-3 text-white shadow-sm" style={{ backgroundColor: '#FFB800' }}>
                            <h6 className="m-0 fw-bold">On Progress (2)</h6>
                            <small className="opacity-75" style={{ fontSize: '11px' }}>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className="d-flex flex-column gap-3 mt-3">
                            {/* Card 1 */}
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#FD7E14', fontSize: '12px' }}>Graphic Designer</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Visual Graphic for Presentation to Client</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#FD7E14', fontSize: '12px' }}>Graphic Designer</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Visual Graphic for Presentation to Client</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <Button variant="success" className="text-white w-100 py-2 fw-bold border-0" style={{ backgroundColor: '#4DE193' }}>
                                + Add Card
                            </Button>
                        </div>
                    </Col>
                    {/* 3 COLUMN */}
                    <Col xs={12} md={6} lg={3}>
                        {/* Header */}
                        <div className="p-3 rounded-3 text-white shadow-sm" style={{ backgroundColor: '#42A5F5' }}>
                            <h6 className="m-0 fw-bold">Done (3)</h6>
                            <small className="opacity-75" style={{ fontSize: '11px' }}>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className="d-flex flex-column gap-3 mt-3">
                            {/* Card 1 */}
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#6F42C1', fontSize: '12px' }}>Digital Marketing</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Make Promotional Ads for Instagram Fasto's</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#6F42C1', fontSize: '12px' }}>Digital Marketing</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Make Promotional Ads for Instagram Fasto's</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
                                <span className="fw-bold mb-2" style={{ color: '#6F42C1', fontSize: '12px' }}>Digital Marketing</span>
                                <p className="fw-bold text-dark mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>Make Promotional Ads for Instagram Fasto's</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                                    <small className="text-muted" style={{ fontSize: '12px' }}>Aug 4, 2020</small>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                        <div className="rounded-circle border border-2 border-white" style={{ width: '24px', height: '24px', backgroundColor: '#c8c8c8', marginLeft: '-8px' }} />
                                    </div>
                                </div>
                            </div>
                            <Button variant="success" className="text-white w-100 py-2 fw-bold border-0" style={{ backgroundColor: '#4DE193' }}>
                                + Add Card
                            </Button>
                        </div>
                    </Col>
                    {/* 4 COLUMN */}
                    <Col xs={12} md={6} lg={3}>
                        {/* Header */}
                        <div className="p-3 rounded-3 text-white shadow-sm" style={{ backgroundColor: '#BA68C8' }}>
                            <h6 className="m-0 fw-bold">Revised (0)</h6>
                            <small className="opacity-75" style={{ fontSize: '11px' }}>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className="d-flex flex-column gap-3 mt-3">
                            <div className="border border-2 border-secondary rounded-3 p-4 text-center text-muted bg-white opacity-75" style={{ borderStyle: 'dashed' }}>
                                Move card here
                            </div>
                            <Button variant="success" className="text-white w-100 py-2 fw-bold border-0" style={{ backgroundColor: '#4DE193' }}>
                                + Add Card
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    </>

    )
}

export default kanban
