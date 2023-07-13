import { Progress, Row } from 'antd';

export const topColor = [
  'var(--primary-color)',
  'var(--danger-color)',
  'var(--success-color)',
];

export const equipConfig = [
  {
    title: '排名',
    dataIndex: 'rank',
    render: (rank: number) => {
      return (
        <div
          className="cs-row"
          style={{
            color: rank <= 3 ? topColor[rank - 1] : 'var(--background-color3)',
          }}
        >
          <span style={{ color: '#fff' }}>{rank}</span>
        </div>
      );
    },
  },
  {
    title: '区局',
    dataIndex: 'regionName',
  },
  {
    title: '比例（%）',
    dataIndex: 'rate',
    width: 140,
    render: (value: number, _: any, index: number) => {
      return (
        <Row align="middle" gutter={[8, 8]} style={{ paddingRight: 4 }}>
          <span
            style={{
              fontWeight: 400,
              marginRight: 8,
              width: 45,
              textAlign: 'right',
            }}
          >
            {value?.toFixed(2)}
          </span>
          <Progress
            strokeColor={
              index < 3 ? topColor[index] : 'var(--background-color3)'
            }
            style={{ margin: 0, flex: 1 }}
            percent={value}
            showInfo={false}
          />
        </Row>
      );
    },
  },
];
