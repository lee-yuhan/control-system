import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useRef, useState } from 'react';
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
              name: '安装故障率排名',
            },
          ]}
        />
      }
    >
      {tabValue === 'rank' && <Rank mRef={mRef} />}
    </CardWrapper>
  );
};

export default Index;
