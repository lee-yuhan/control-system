import { Col, Row } from 'antd';
import InstallQuality from './compoments/InstallQuality';
import QualityDiff from './compoments/QualityDiff';
import QualityInspection from './compoments/QualityInspection';
import RepetitionRate from './compoments/RepetitionRate';
import AssemblyMaintenanceQuality from './compoments/AssemblyMaintenanceQuality';
import SatisfactionRate from './compoments/SatisfactionRate';

const Index = () => {
  return (
    <div
      style={{
        padding: '0 50px',
      }}
    >
      <Row gutter={40} style={{ marginBottom: 40 }}>
        <Col span={8}>
          <InstallQuality />
        </Col>
        <Col span={8}>
          <SatisfactionRate />
        </Col>
        <Col span={8}>
          <QualityDiff />
        </Col>
      </Row>
      <Row gutter={40}>
        <Col span={8}>
          <AssemblyMaintenanceQuality />
        </Col>
        <Col span={8}>
          <RepetitionRate />
        </Col>
        <Col span={8}>
          <QualityInspection />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
