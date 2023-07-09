import { Col, Row } from 'antd';
import InstallQuality from './compoments/InstallQuality';
import QualityDiff from './compoments/QualityDiff';
import QualityInspection from './compoments/QualityInspection';
import RepetitionRate from './compoments/RepetitionRate';
import AssemblyMaintenanceQuality from './compoments/AssemblyMaintenanceQuality';
import SatisfactionRate from './compoments/SatisfactionRate';
import { useLoginRecordAid } from '../hooks';
import { useMemo, useState } from 'react';
import { useEventListener } from 'ahooks';
import './index.less';

const Index = () => {
  // 记录
  useLoginRecordAid(2);

  // 去除顶部以及 padding

  const [minHeight, setMinHeight] = useState<string>();

  const minHeightStyle = useMemo(() => {
    return {
      minHeight: minHeight,
    };
  }, [minHeight]);

  useEventListener('resize', () => {
    const clientHeight = document.documentElement.clientHeight;
    const minHeight = (clientHeight - 72 - 95 - 50) / 2;
    setMinHeight(`${Math.floor(minHeight)}px`);
  });

  return (
    <div className="result-container">
      <Row gutter={40} style={{ marginBottom: 40, ...minHeightStyle }}>
        <Col span={8}>
          <SatisfactionRate />
        </Col>
        <Col span={8}>
          <InstallQuality />
        </Col>
        <Col span={8}>
          <AssemblyMaintenanceQuality />
        </Col>
      </Row>

      <Row gutter={40} style={{ ...minHeightStyle }}>
        <Col span={8}>
          <QualityDiff />
        </Col>
        <Col span={8}>
          <QualityInspection />
        </Col>
        <Col span={8}>
          <RepetitionRate />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
