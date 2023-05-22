import LabelsView from '@/compoments/LabelsView';
import { Progress, Row, Space, Table } from 'antd';
import { random } from 'lodash';
import { useMemo, useState } from 'react';
import './index.less';

const topColor = [
  'var(--primary-color)',
  'var(--danger-color)',
  'var(--success-color)',
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
      dataIndex: 'name',
    },
    {
      title: '区局',
      dataIndex: 'regionName',
    },
    {
      title: '设备重复数',
      dataIndex: 'repeatNum',
      align: 'right',
    },
    {
      title: '设备记录数',
      dataIndex: 'recordNum',
      align: 'right',
    },
    {
      title: '重复率（%）',
      dataIndex: 'index',
      width: 120,
      render: (index: number, record: any) => {
        const rate = (record.repeatNum / record.recordNum) * 100;
        return (
          <Row align="middle" gutter={[8, 8]}>
            <span
              style={{
                fontWeight: 400,
                marginRight: 8,
                width: 45,
                textAlign: 'right',
              }}
            >
              {rate.toFixed(2)}
            </span>
            <Progress
              strokeColor={
                index < 3 ? topColor[index] : 'var(--background-color3)'
              }
              style={{ margin: 0, flex: 1 }}
              percent={rate}
              showInfo={false}
            />
          </Row>
        );
      },
    },
  ];

  const dataSource = useMemo(() => {
    console.log('type', type);
    const regionNames = ['宝山', '北区', '东区', '崇明', '奉贤'];
    const names = [
      '杨行支局',
      '张庙支局',
      '北虹口支局',
      '中虹口支局',
      '瑞虹支局',
    ];

    return Array(10)
      .fill('')
      ?.map((_, index) => ({
        index,
        name: names[random(0, 4)],
        regionName: regionNames[random(0, 4)],
        repeatNum: random(0, 50),
        recordNum: random(50, 100),
      }));
  }, [type?.[0]]);

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
        columns={columns as any}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};
export default Index;
