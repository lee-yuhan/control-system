import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import LabelsView from '@/compoments/LabelsView';
import { Col, Progress, Row, Table } from 'antd';
import { random } from 'lodash';
import { useMemo, useState } from 'react';
import * as echarts from 'echarts';
import MenuButton from '../MenuButton';

const Index = () => {
  return (
    <>
      {/* <LabelsView
        single
        value={type}
        dataSource={typeOptions}
        onChange={setType as any}
        style={{ marginBottom: 4 }}
      /> */}
      <HomeCard title="售后概况">
        <Row>
          <Col span={8}>
            <MenuButton />
          </Col>
          <Col span={16}>
            {/* <Echarts5
        option={option}
      ></Echarts5> */}
          </Col>
        </Row>
      </HomeCard>
    </>
  );
};
export default Index;
