import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useRef, useState } from 'react';
import SerciceRate from './SerciceRate';
import EvaluationRate from './EvaluationRate';
import { Button } from 'antd';

const Index = () => {
  const [tabValue, setTabValue] = useState<string>('6');

  const mRef = useRef<any>();

  return (
    <CardWrapper
      extra={
        <Button
          className="export-btn"
          onClick={() => {
            mRef?.current?.exportData();
          }}
        >
          导出
        </Button>
      }
      header={
        <Tab
          value={tabValue}
          onChange={setTabValue}
          options={[
            {
              id: '6',
              name: '服务十分满意度',
            },
            {
              id: '10',
              name: '测评低分工单数',
            },
          ]}
        />
      }
    >
      {tabValue === '10' && <EvaluationRate mRef={mRef} />}
      {tabValue === '6' && <SerciceRate mRef={mRef} />}
    </CardWrapper>
  );
};

export default Index;
