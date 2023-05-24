// 重复率
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import Trend from './Trend';
import Rank from './Rank';
import { Button } from 'antd';
const Index = () => {
  const [tabValue, setTabValue] = useState<string>('7');

  return (
    <CardWrapper
      extra={<Button className="export-btn">导出</Button>}
      header={
        <Tab
          value={tabValue}
          onChange={setTabValue}
          options={[
            {
              id: '7',
              name: '装维重复率趋势',
            },
            {
              id: 'aa1',
              name: '装维重复率排名',
            },
          ]}
        />
      }
    >
      {tabValue === '7' && <Trend />}
      {tabValue === 'aa1' && <Rank />}
    </CardWrapper>
  );
};

export default Index;
