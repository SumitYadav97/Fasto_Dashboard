'use client';
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './../../../public/star1.png'
const Calendar = () => {
    return (
        <Container fluid className="p-0 h-100 bg-light">
            <Row className="h-100">
                <Col md={3} className="sidebar-panel h-100 p-4 bg-white border-right">
                    <h2 className="font-weight-bold mb-1">Projects Details</h2>
                    <p className="text-muted mb-4">September, 1st Week</p>
                    <Card className="mb-3 border-0 shadow-sm rounded p-3">
                        <Row className="align-items-center no-gutters">
                            <Col xs="auto" className="pr-3">
                                <div className="p-2 rounded-circle bg-none text-white d-flex align-items-center justify-content-center">
                                </div>
                            </Col>
                            <Col className='d-flex'>
                                <img src="star1.png" style={{ height: "20px", marginRight: "40px" }} />
                                <h6 className="project-title-text mb-0">Convert Apps to mobile version</h6>
                            </Col>
                            <Col xs="auto" className="ml-auto text-right p-0 pr-2">

                                <p className="project-date-text text-muted mb-1">
                                    Sep 3, 2020</p>
                                <div className="avatar-group-mock d-flex justify-content-end">
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="mb-3 border-0 shadow-sm rounded p-3">
                        <Row className="align-items-center no-gutters">
                            <Col xs="auto" className="pr-3">
                                <div className="p-2 rounded-circle bg-warning text-white d-flex align-items-center justify-content-center">
                                </div>
                            </Col>
                            <Col>
                                <h6 className="project-title-text mb-0">Usability testing for Fasto Web App v2</h6>
                                <small className="text-muted">Some Text</small>
                            </Col>
                            <Col xs="auto" className="ml-auto text-right p-0 pr-2">
                                <p className="project-date-text text-muted mb-1">Sep 3, 2020</p>
                                <div className="avatar-group-mock d-flex justify-content-end">
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="mb-3 border-0 shadow-sm rounded p-3">
                        <Row className="align-items-center no-gutters">
                            <Col xs="auto" className="pr-3">
                                <div className="p-2 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ backgroundColor: '#6f42c1' }}>
                                </div>
                            </Col>
                            <Col>
                                <h6 className="project-title-text mb-0">Create A/B testing fro Fasto Mobile App</h6>
                                <small className="text-muted">Some Text</small>
                            </Col>
                            <Col xs="auto" className="ml-auto text-right p-0 pr-2">
                                <p className="project-date-text text-muted mb-1">Sep 3, 2020</p>
                                <div className="avatar-group-mock d-flex justify-content-end">
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="mb-3 border-0 shadow-sm rounded p-3">
                        <Row className="align-items-center no-gutters">
                            <Col xs="auto" className="pr-3">
                                <div className="p-2 rounded-circle bg-warning text-white d-flex align-items-center justify-content-center">
                                </div>
                            </Col>
                            <Col>
                                <h6 className="project-title-text mb-0">Rebuild Code web using Laravel</h6>
                                <small className="text-muted">Some Text</small>
                            </Col>
                            <Col xs="auto" className="ml-auto text-right p-0 pr-2">
                                <p className="project-date-text text-muted mb-1">Sep 3, 2020</p>
                                <div className="avatar-group-mock d-flex justify-content-end">
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="mb-3 border-0 shadow-sm rounded p-3">
                        <Row className="align-items-center no-gutters">
                            <Col xs="auto" className="pr-3">
                                <div className="p-2 rounded-circle bg-none text-white d-flex align-items-center justify-content-center">
                                </div>
                            </Col>
                            <Col>
                                <h6 className="project-title-text mb-0">Fixing Bugs</h6>
                                <small className="text-muted">Some Text</small>
                            </Col>
                            <Col xs="auto" className="ml-auto text-right p-0 pr-2">
                                <p className="project-date-text text-muted mb-1">Sep 3, 2020</p>
                                <div className="avatar-group-mock d-flex justify-content-end">
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                    <div className="avatar-circle-mock bg-secondary ml-n2"></div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={9} className="calendar-panel h-100 p-4">
                    <Row className="mb-4 d-flex align-items-center justify-content-between">
                        <Col xs="auto">
                            <Button variant="outline-none" style={{ color: "#43DC80", }} className="font-weight-bold p-2 px-3">Today 26</Button>
                        </Col>

                        <Col className="text-center d-flex align-items-center justify-content-center">

                            <h2 className="calendar-month-year mb-0 font-weight-bold ml-3 mr-3">September 2020</h2>

                        </Col>

                        <Col xs="auto">
                            <Button variant='outline-none' className="btn-new-agenda font-weight-bold d-flex align-items-center p-2 px-3" style={{ background: "#43DC80", color: "#ffff" }}>
                                <span className="ml-2" >+ New Agenda</span>
                            </Button>
                        </Col>
                    </Row>
                    {/* Days of the Week Row */}
                    <Row className="mb-2 calendar-days-header text-center text-muted no-gutters border-bottom pb-2">
                        <Col><small className="font-weight-bold text-uppercase">Monday</small></Col>
                        <Col><small className="font-weight-bold text-uppercase">Tuesday</small></Col>
                        <Col><small className="font-weight-bold text-uppercase">Wednesday</small></Col>
                        <Col><small className="font-weight-bold text-uppercase">Thursday</small></Col>
                        <Col><small className="font-weight-bold text-uppercase">Friday</small></Col>
                        <Col><small className="font-weight-bold text-uppercase">Saturday</small></Col>
                        <Col><small className="font-weight-bold text-uppercase">Sunday</small></Col>
                    </Row>

                    <Container fluid className="calendar-grid no-gutters p-0">

                        <Row className="calendar-week no-gutters">
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0"><Card.Title className="text-muted"><h2>31</h2></Card.Title></Card></Col>
                            {/* Day 1 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0 border-none"><Card.Title><h2>1</h2></Card.Title></Card></Col>
                            {/* Day 2 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0 border-none">
                                <Card.Title><h2>2</h2>
                                </Card.Title></Card></Col>
                            {/* Day 3 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border border-success border-3" style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >3</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 4 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border border-warning" style={{ background: "#FFEED3" }}>
                                    <Card.Title className="text-dark font-weight-bold"><h2>4</h2>
                                    </Card.Title><Card.Text className="text-warning m-0"><b>6 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 5 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border border-none" style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2>5</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>

                                </Card></Col>
                            {/* Day 6 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: '#EEE5FF' }}>
                                    <Card.Title className="font-weight-bold">
                                        <h2 className='text-dark'>6</h2></Card.Title>
                                    <Card.Text className="m-0" style={{ color: '#8850FF' }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                        </Row>
                        {/* Week 2 Row */}
                        <Row className="calendar-week no-gutters">
                            {/* Day 7 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border border-none" style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2>7</h2></Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 8*/}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: "#FFEED3" }}>
                                    <Card.Title className="text-warning font-weight-bold">
                                        <h2 className='text-dark'>8</h2></Card.Title><Card.Text className="text-warning m-0">6 Task</Card.Text>
                                </Card></Col>
                            {/* Day 9*/}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >9</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 10 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0 border-none"><Card.Title><h2>10</h2></Card.Title></Card></Col>
                            {/* Day 11 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >11</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 12 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: '#EEE5FF' }}>
                                    <Card.Title className="font-weight-bold">
                                        <h2 className='text-dark'>12</h2></Card.Title>
                                    <Card.Text className="m-0" style={{ color: '#8850FF' }}><b>5 Task</b></Card.Text>
                                </Card></Col>                            {/* Day 13 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0 border-none"><Card.Title><h2>13</h2></Card.Title></Card></Col>
                        </Row>
                        {/* Week 3 Row */}
                        <Row className="calendar-week no-gutters">
                            {/* Day 14 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0 border-none"><Card.Title><h2>14</h2></Card.Title></Card></Col>
                            {/* Day 15 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: '#EEE5FF' }}>
                                    <Card.Title className="font-weight-bold">
                                        <h2 className='text-dark'>15</h2></Card.Title>
                                    <Card.Text className="m-0" style={{ color: '#8850FF' }}><b>5 Task</b></Card.Text>
                                </Card></Col>                            {/* Day 16 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0 border-none"><Card.Title><h2>16</h2></Card.Title></Card></Col>
                            {/* Day 17  */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >17</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 18 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: "#FFEED3" }}>
                                    <Card.Title className="text-warning font-weight-bold">
                                        <h2 className='text-dark'>18</h2></Card.Title><Card.Text className="text-warning m-0">6 Task</Card.Text>
                                </Card></Col>                            {/* Day 19 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >19</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>                            {/* Day 20 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0 border-none"><Card.Title><h2>20</h2></Card.Title></Card></Col>
                        </Row>
                        {/* Week 4 Row */}
                        <Row className="calendar-week no-gutters">
                            {/* Day 21 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: '#EEE5FF' }}>
                                    <Card.Title className="font-weight-bold">
                                        <h2 className='text-dark'>21</h2></Card.Title>
                                    <Card.Text className="m-0" style={{ color: '#8850FF' }}><b>5 Task</b></Card.Text>
                                </Card></Col>                            {/* Day 22 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0 border-none"><Card.Title><h2>22</h2></Card.Title></Card></Col>
                            {/* Day 23*/}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >23</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 24 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >24</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 25 (Purple Status) */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: '#EEE5FF' }}>
                                    <Card.Title className="font-weight-bold">
                                        <h2 className='text-dark'>25</h2></Card.Title>
                                    <Card.Text className="m-0" style={{ color: '#8850FF' }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 26 (Highlighted, bg-none) */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: '#43DC80' }}>
                                    <Card.Title className="font-weight-bold">
                                        <h2 className='text-light'>26</h2></Card.Title>
                                    <Card.Text className="m-0 text-light"><b>5 Task</b></Card.Text>
                                </Card></Col>                            {/* Day 27 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >27</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>                        </Row>
                        {/* Week 5 Row */}
                        <Row className="calendar-week no-gutters">
                            {/* Day 28 */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >28</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 28 Repeat */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 " style={{ background: "#ECFFF4" }}>
                                    <Card.Title className="text-none font-weight-bold">
                                        <h2 >28</h2>
                                    </Card.Title>
                                    <Card.Text style={{ color: "#43DC80" }}><b>5 Task</b></Card.Text>
                                </Card></Col>
                            {/* Day 30  */}
                            <Col className="mb-3 px-1">
                                <Card className="text-center p-3 h-100 border " style={{ background: "#FFEED3" }}>
                                    <Card.Title className="text-warning font-weight-bold">
                                        <h2 className='text-dark'>30</h2></Card.Title><Card.Text className="text-warning m-0">6 Task</Card.Text>
                                </Card></Col>                            {/* Day 1 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0"><Card.Title className="text-muted"><h2>1</h2></Card.Title></Card></Col>
                            {/* Day 2 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0"><Card.Title className="text-muted"><h2>2</h2></Card.Title></Card></Col>
                            {/* Day 3 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0"><Card.Title className="text-muted"><h2>3</h2></Card.Title></Card></Col>
                            {/* Day 4 */}
                            <Col className="mb-3 px-1"><Card className="text-center p-3 h-100 border-0"><Card.Title className="text-muted"><h2>4</h2></Card.Title></Card></Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Calendar;