// 重复率
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useRef, useState } from 'react';
import Trend from './Trend';
import Rank from './Rank';
import { Button } from 'antd';
const Index = () => {
  const [tabValue, setTabValue] = useState<string>('rank');
  const mRef = useRef<any>(null);
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
              id: 'rank',
              name: '维修重复率排名',
            },
            {
              id: '7',
              name: '维修重复率趋势',
            },
          ]}
        />
      }
    >
      {tabValue === 'rank' && <Rank mRef={mRef} />}

      {tabValue === '7' && <Trend mRef={mRef} />}
    </CardWrapper>
  );
};

export default Index;
