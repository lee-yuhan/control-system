import LabelsView from '@/compoments/LabelsView';
import { useDebounceEffect } from 'ahooks';
import { Progress, Row, Space, Spin, Table } from 'antd';
import { random, tail } from 'lodash';
import {
  useMemo,
  useState,
  useImperativeHandle,
  FC,
  useRef,
  useCallback,
} from 'react';
import { useRequest, useSelector } from 'umi';
import { getRankData } from '../../../service';
import { timeOptions } from '../../CardCondition/config';
import './index.less';
import qs from 'qs';
import ExportTypeModal, { IExportType } from '../../ExportTypeModal';
import cookie from 'react-cookies';

const topColor = [
  'var(--primary-color)',
  'var(--danger-color)',
  'var(--success-color)',
];
const Index: FC<{
  mRef: any;
}> = ({ mRef }) => {
  const [type, setType] = useState<string[]>(['1']);
  const exRef = useRef<any>(null);
  const { branchName, regionName } = useSelector((store: any) => store.home);

  const { data, run, loading } = useRequest(getRankData, {
    manual: true,
  });

  const [latitude, setLatitude] = useState(['1']);

  const requestParams = useMemo(() => {
    return {
      latitude: latitude?.toString(),
      type: type?.toString(),
      limit: 10,
    };
  }, [latitude, type]);

  const handleExport = useCallback(
    (type: IExportType) => {
      if (type === 'ECHART_DATA') {
        window.open(
          `${API_PREFIX}/stat/rankExport?${qs.stringify(requestParams)}`,
        );
      } else {
        window.open(
          `${API_PREFIX}/stat/infoDetailExport?${qs.stringify({
            latitude: latitude?.toString(),
            branchName,
            regionName,
            mode: '7',
            token: cookie.load('AuthToken'),
          })}`,
        );
      }
    },
    [requestParams, branchName, regionName, latitude],
  );

  useImperativeHandle(mRef, () => ({
    exportData: () => {
      exRef?.current?.showModal();
    },
  }));

  useDebounceEffect(
    () => {
      run(requestParams);
    },
    [latitude, type, run],
    { wait: 400 },
  );

  const typeOptions = [
    {
      id: '1',
      name: '支局TOP10',
    },
    // {
    //   id: 'b',
    //   name: '楼宇TOP10',
    // },
    {
      id: '2',
      name: '网格TOP10',
    },
    // {
    //   id: 'd',
    //   name: '设备TOP10',
    // },
  ];

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      render: (rank: number) => {
        return (
          <div
            className="cs-row"
            style={{
              color:
                rank <= 3 ? topColor[rank - 1] : 'var(--background-color3)',
            }}
          >
            <span style={{ color: '#fff' }}>{rank}</span>
          </div>
        );
      },
    },
    {
      title: '名称',
      dataIndex: 'branchName',
    },
    {
      title: '区局',
      dataIndex: 'regionName',
    },
    {
      title: '设备重复数',
      dataIndex: 'num',
      align: 'right',
    },
    {
      title: '设备记录数',
      dataIndex: 'totalNum',
      align: 'right',
    },
    {
      title: '重复率（%）',
      dataIndex: 'rate',
      width: 120,
      render: (value: number, record: any, index: number) => {
        // const rate = (record.repeatNum / record.recordNum) * 100;
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

  return (
    <Spin spinning={loading}>
      <LabelsView
        single
        value={latitude}
        dataSource={tail(timeOptions)}
        onChange={setLatitude as any}
      />

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
        dataSource={data}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <ExportTypeModal mRef={exRef} onConfirm={handleExport} />
    </Spin>
  );
};
export default Index;
