import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import SerciceRate from './SerciceRate';
import EvaluationRate from './EvaluationRate';
import { Button } from 'antd';

const Index = () => {
  const [tabValue, setTabValue] = useState<string>('6');

  return (
    <CardWrapper
      extra={<Button className="export-btn">导出</Button>}
      header={
        <Tab
          value={tabValue}
          onChange={setTabValue}
          options={[
            {
              id: '6',
              name: '测评满意率',
            },
          ]}
        />
      }
    >
      {tabValue === '6' && <EvaluationRate />}
    </CardWrapper>
  );
};

export default Index;
