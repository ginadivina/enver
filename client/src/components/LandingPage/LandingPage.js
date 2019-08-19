import React from 'react'
import '../../styles.css'
import {Carousel, Card, Col, Row, Layout } from 'antd';
const { Content } = Layout;

function LandingPage() {

    return (

        <Layout>

            <Content
                style={{
                    margin: 0,
                    minHeight: 500,
                }}>
            <Carousel autoplay>
                <div>
                    <h3>
                        Ask, answer, earn
                    </h3>
                </div>
                <div>
                    <h3>
                        Ask, answer, earn
                    </h3>
                </div>
                <div>
                    <h3>
                        Ask, answer, earn
                    </h3>
                </div>
            </Carousel>
            </Content>

        <Row style={{paddingTop: "30px"}}>

                <div style={{ padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                    </Row>
                </div>

        </Row>

        </Layout>

    )
}

export default LandingPage;
