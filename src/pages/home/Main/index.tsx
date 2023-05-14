import { Col, Row } from 'antd';
import Rank from './components/Rank';

const Index = () => {
  return (
    <div
      style={{
        padding: '0 50px',
      }}
    >
      <Row gutter={40} style={{ marginBottom: 40 }}>
        <Col span={8}></Col>
        <Col span={8}></Col>
        <Col span={8}></Col>
      </Row>
      <Row gutter={40}>
        <Col span={8}></Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Rank />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
