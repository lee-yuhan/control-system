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
  const [type, setType] = useState<string[]>(['week']);

  const typeOptions = [
    {
      id: 'a',
      name: '区局总评分排名',
    },
    {
      id: 'b',
      name: '支局总评分排名',
    },
    {
      id: 'c',
      name: '人员总评分排名',
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
      <span style={{ color: 'var(--text-color4)', fontSize: 9 }}>
        装维质量得分=【10分满意度 *30%（达标制：97%为满分）+ 质差修复 *20% +
        日常工单 *20%（政企安装改约率/上门登记率为达标制）+
        重复率*30%（30*（1-重复率）-（重复率-6%）*50）】*真实性权重-（低分占比-低分平均值）*5000
      </span>
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
