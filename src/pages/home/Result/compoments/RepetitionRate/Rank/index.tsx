import LabelsView from '@/compoments/LabelsView';
import { useDebounceEffect } from 'ahooks';
import { Progress, Row, Spin, Table } from 'antd';
import { tail } from 'lodash';
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
import { branchConfig, equipConfig, gridConfig } from './config';

const Index: FC<{
  mRef: any;
}> = ({ mRef }) => {
  const [type, setType] = useState<string[]>(['1']);
  const exRef = useRef<any>(null);
  const { branchName, regionName } = useSelector((store: any) => store.home);

  const { data, run, loading, mutate } = useRequest(getRankData, {
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
    (exportType: IExportType) => {
      if (exportType === 'ECHART_DATA') {
        window.open(
          `${API_PREFIX}/stat/rankExport?${qs.stringify(requestParams)}`,
        );
      } else {
        const params = {
          latitude: latitude?.toString(),
          branchName,
          regionName,
          mode: '7',
          token: cookie.load('AuthToken'),
        } as any;
        if (type.includes('3')) {
          params.type = type?.toString();
        }
        window.open(
          `${API_PREFIX}/stat/infoDetailExport?${qs.stringify(params)}`,
        );
      }
    },
    [requestParams, branchName, regionName, latitude, type],
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
    {
      id: '3',
      name: '设备TOP10',
    },
  ];

  const columns = useMemo(() => {
    if (type.includes('1')) {
      return branchConfig;
    }
    if (type.includes('2')) {
      return gridConfig;
    }
    if (type.includes('3')) {
      return equipConfig;
    }
    return [];
  }, [type]);

  return (
    <Spin spinning={loading}>
      <Row gutter={[4, 4]}>
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
          onChange={(val) => {
            mutate([]);
            setType(val as string[]);
          }}
          style={{ marginBottom: 4 }}
        />
      </Row>

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
