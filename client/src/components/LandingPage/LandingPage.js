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
                <carousel1>
                    <h3>
                        Ask, answer, earn
                    </h3>
                </carousel1>

                <carousel2>
                    <h3>
                        <br></br>
                    </h3>
                </carousel2>
            </Carousel>
            </Content>

        <Row style={{paddingTop: "50px"}}>
                <div style={{ padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Public Q&A" bordered={true}>
                                AskSV is a community to ask questions on whatever topic you need, and get answers from experts from within the community.
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Answer" bordered={true}>
                                Experts like you can help others on any topic at all. From programming and code reviews, to
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Earn" bordered={true}>
                                Questioners set the price of their question and get to pick the best answer.
                            </Card>
                        </Col>
                    </Row>
                </div>
            <Row>
                <br></br>
            </Row>
        </Row>
        </Layout>

    )
}

export default LandingPage;
