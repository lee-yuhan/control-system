// 满意率
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import SerciceRate from './SerciceRate';
import EvaluationRate from './EvaluationRate';

const Index = () => {
  const [tabValue, setTabValue] = useState<string>('aa');

  return (
    <CardWrapper
      header={
        <Tab
          value={tabValue}
          onChange={setTabValue}
          options={[
            {
              id: 'aa',
              name: '服务十分满意率',
            },
            {
              id: '6',
              name: '测评满意率',
            },
          ]}
        />
      }
    >
      {tabValue === 'aa' && <SerciceRate />}
      {tabValue === '6' && <EvaluationRate />}
    </CardWrapper>
  );
};

export default Index;
