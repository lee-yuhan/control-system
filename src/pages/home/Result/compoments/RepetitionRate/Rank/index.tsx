import LabelsView from '@/compoments/LabelsView';
import { Progress, Table } from 'antd';
import { useState } from 'react';
import './index.less';

const topColor = [
  'var(--danger-color)',
  'var(--danger-color)',
  'var(--danger-color)',
];
const Index = () => {
  const [type, setType] = useState<string[]>(['a']);

  const typeOptions = [
    {
      id: 'a',
      name: '支局TOP10',
    },
    {
      id: 'b',
      name: '楼宇TOP10',
    },
    {
      id: 'c',
      name: '网格TOP10',
    },
    {
      id: 'd',
      name: '设备TOP10',
    },
  ];

  const columns = [
    {
      title: '排名',
      dataIndex: 'index',

      render: (index: number) => {
        return (
          <div
            className="cs-row"
            style={{
              color: index < 3 ? topColor[index] : 'var(--background-color3)',
            }}
          >
            <span style={{ color: '#fff' }}>{index + 1}</span>
          </div>
        );
      },
    },
    {
      title: '名称',
    },
    {
      title: '区局',
    },
    {
      title: '设备重复数',
    },
    {
      title: '设备记录数',
    },
    {
      title: '重复率（%）',
      dataIndex: 'index',

      render: (index: number) => {
        return (
          <Progress
            strokeColor={
              index < 3 ? topColor[index] : 'var(--background-color3)'
            }
            style={{ margin: 0 }}
            percent={50}
            showInfo={false}
          />
        );
      },
    },
  ];

  const dataSource = Array(10)
    .fill('')
    ?.map((_, index) => ({
      index,
    }));

  return (
    <>
      <LabelsView
        single
        value={type}
        dataSource={typeOptions}
        onChange={setType as any}
        style={{ marginBottom: 4 }}
      />

      <Table
        rowClassName="cs-row-top-other"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};
export default Index;
