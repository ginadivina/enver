import React from 'react'
import {Carousel,Card, Col, Row } from 'antd';

function LandingPage() {

    return (

    <div>
        <Row style={{zIndex: -1}}>
            <Col style={{ background: '#ecfdff', minHeight: "500px"}}>
            <Carousel dots={false} autoplay>
                <div>
                    <h1>Ask
                        Answer
                        Earn
                    </h1>
                    <p>Bounty your question<br/>
                        Pick The best answer<br/>
                        Get paid for your knowledge<br/></p>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
            </Carousel>
            </Col>
        </Row>
        <Row style={{paddingTop: "30px",  paddingRight: "10%"}}>
            <Col>
                <div style={{ padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8} style={{paddingLeft: "10%"}}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8} style={{paddingRight: "10%"}}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </div>

    )
}

export default LandingPage;
