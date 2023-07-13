import LabelsView from '@/compoments/LabelsView';
import { useDebounceEffect } from 'ahooks';
import { Form, Progress, Row, Select, Spin, Table } from 'antd';
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
import './index.less';
import qs from 'qs';
import cookie from 'react-cookies';
import { equipConfig } from './config';
import CardCondition from '../../CardCondition';
import { getFailureRankData } from '../../../service';
import ExportTypeModal, { IExportType } from '../../ExportTypeModal';

export const timeOptions = [
  {
    id: '1',
    name: '周维度',
  },
  {
    id: '2',
    name: '月维度',
  },
];

const Index: FC<{
  mRef: any;
}> = ({ mRef }) => {
  const exRef = useRef<any>(null);
  const [params, setParams] = useState({
    custType: '',
    latitude: ['1'],
  });

  const { data, run, loading, mutate } = useRequest(getFailureRankData, {
    manual: true,
  });

  const requestParams = useMemo(() => {
    return {
      latitude: params?.latitude?.toString(),
      limit: 20,
      custType: params?.custType,
    };
  }, [params?.latitude, params?.custType]);

  useImperativeHandle(mRef, () => ({
    exportData: () => {
      // exRef?.current?.showModal();
      handleExport('ECHART_DATA');
    },
  }));

  useDebounceEffect(
    () => {
      mutate([]);
      run(requestParams);
    },
    [requestParams, run],
    { wait: 400 },
  );

  const columns = useMemo(() => {
    return equipConfig;
  }, []);

  const handleExport = useCallback(
    (exportType: IExportType) => {
      // if (exportType === 'ECHART_DATA') {
      window.open(
        `${API_PREFIX}/stat/rankExport?${qs.stringify({
          ...requestParams,
          type: 4,
        })}`,
      );
      // } else {
      // const resParams = {
      //   latitude: params?.latitude?.toString(),
      //   mode: '7',
      //   custType: params?.custType,
      //   token: cookie.load('AuthToken'),
      // } as any;
      // window.open(
      //   `${API_PREFIX}/stat/infoDetailExport?${qs.stringify(resParams)}`,
      // );
      // }
    },
    [requestParams, params?.custType, params?.latitude],
  );

  return (
    <Spin spinning={loading}>
      <Form
        layout="inline"
        initialValues={{
          latitude: timeOptions?.[0].id,
          custType: '政企',
        }}
        onValuesChange={(_, allValue) => {
          setParams(allValue);
        }}
      >
        <Form.Item style={{ marginRight: 0 }} name="custType">
          <Select
            placeholder="请选择客户类型"
            style={{ minWidth: 120 }}
            options={[
              {
                label: '政企',
                value: '政企',
              },
              {
                label: '公众客户',
                value: '公众客户',
              },
            ]}
          />
        </Form.Item>
        <Form.Item style={{ marginRight: 0 }} name="latitude">
          <LabelsView single dataSource={timeOptions} />
        </Form.Item>
      </Form>
      <Table
        rowClassName="cs-row-top-other"
        columns={columns as any}
        style={{ marginTop: 10 }}
        dataSource={data}
        pagination={false}
        scroll={{ x: 'max-content', y: 360 }}
      />
      <ExportTypeModal mRef={exRef} onConfirm={handleExport} />
    </Spin>
  );
};
export default Index;
