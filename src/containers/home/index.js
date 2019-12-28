import React from 'react';
import { Card, Col, Row, Button } from 'antd';

import chapter2 from './chapter2.png';
const { Meta } = Card;

const Home = () => {
  return (
    <div>
    <Row>
      <Col span={8}>
        <Card
        hoverable
        style={{ width: 300 }}
        cover={
          <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        >
        <Meta
        title="Chapter 1: Exploratory Data Analysis"
        description="'The main objective of this chapter is to revise the fundamentals of EDA, what it is, key concepts of profiling and quality assessment main dimensions of EDA, main challenges and opportunities in EDA.'"
        />
        <p />
        <Button href="/quiz/chapter1" type="primary" icon="caret-right" size="large">Start</Button>
        </Card>
      </Col>
      <Col span={8}>
        <Card
        hoverable
        style={{ width: 300 }}
        cover={
          <img
          alt="example"
          src={chapter2}
          />
        }
        >
        <Meta
        title="Chapter 2: Visual Aids in EDA"
        description="'The main objective of this chapter is to revise the fundamentals of EDA, what it is, key concepts of profiling and quality assessment main dimensions of EDA, main challenges and opportunities in EDA.'"
        />
        <p />
          <Button href="#" type="primary" icon="caret-right" size="large">Coming soon ...</Button>
        </Card>
      </Col>
    </Row>
    </div>
  );
}

export default Home;
