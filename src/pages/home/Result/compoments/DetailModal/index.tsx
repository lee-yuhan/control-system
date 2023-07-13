import { Form, Input, Modal, Rate, Table } from 'antd';
import {
  FC,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Moment } from 'moment';
import './index.less';
import { getDetailData } from './service';
import { useSelector } from 'umi';
import { useDebounceEffect } from 'ahooks';
import { satisfactionNameMap } from '../../config';

const Index: FC<{
  mRef: any;
}> = ({ mRef }) => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dateStr, setDateStr] = useState('');
  const [params, setParams] = useState<{
    custType: string | undefined;
    date: any;
    latitude: any;
    mode: string;
    branchName: string;
    regionName: string;
  }>();
  const { branchName, regionName, latitude } = useSelector(
    (store: any) => store.home,
  );
  useImperativeHandle(mRef, () => ({
    showModal: async (mode: string, date: string, custType?: string) => {
      const resParams = {
        custType,
        date,
        latitude: latitude?.toString(),
        mode,
        branchName,
        regionName,
      };

      setDateStr(date);
      setOpen(true);
      setParams(resParams);
    },
  }));

  useDebounceEffect(
    () => {
      if (!params) return;
      setLoading(true);
      getDetailData(params)
        .then((res) => {
          setDataSource(res.data);
        })
        .catch((e) => {})
        .finally(() => {
          setLoading(false);
        });
    },
    [params?.custType, params?.date, params?.latitude, params?.mode],
    { wait: 200 },
  );

  const columns = useMemo(() => {
    if (!params) return [];
    return [
      {
        title: '名称',
        dataIndex: 'branchName',
      },
      {
        title: '环比',
        dataIndex: 'rate',
        width: 200,
        align: 'right',
        render: (value: string) => {
          return `${value ?? 0}%`;
        },
      },
      {
        title: `${satisfactionNameMap[params?.mode]}`,
        dataIndex: 'satisfaction',
        width: 200,
        align: 'right',
        render: (value: string) => {
          return `${value ?? 0}${
            params?.mode === '6' || params?.mode === '10' ? '' : '%'
          }`;
        },
      },
    ];
  }, [params]);

  return (
    <Modal
      destroyOnClose
      open={open}
      width="50%"
      footer={<></>}
      closable
      onCancel={() => {
        setDataSource([]);
        setOpen(false);
      }}
    >
      <Form
        className="modal-form"
        layout="inline"
        style={{ marginBottom: 20, gap: 8 }}
      >
        <Form.Item label="日期">
          <Input value={dateStr} readOnly />
        </Form.Item>

        <Form.Item label="区局">
          <Input value={regionName} readOnly />
        </Form.Item>

        {branchName && (
          <Form.Item label="支局">
            <Input value={branchName} readOnly />
          </Form.Item>
        )}
      </Form>
      <Table
        scroll={{
          y: 400,
        }}
        style={{ marginTop: 15 }}
        pagination={false}
        rowKey="survey_id"
        loading={loading}
        columns={columns as any}
        dataSource={dataSource}
      ></Table>
    </Modal>
  );
};

export default Index;
