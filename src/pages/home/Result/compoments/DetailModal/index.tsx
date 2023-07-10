import { Form, Input, Modal, Rate, Table } from 'antd';
import { FC, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { Moment } from 'moment';
import './index.less';
import { getDetailData } from './service';
import { useSelector } from 'umi';

const Index: FC<{
  mRef: any;
}> = ({ mRef }) => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dateStr, setDateStr] = useState('');
  const { branchName, regionName } = useSelector((store: any) => store.home);
  useImperativeHandle(mRef, () => ({
    showModal: async (params: string) => {
      console.log('params', params);

      setDateStr(params);
      setOpen(true);
      return;

      setLoading(true);
      const res = await getDetailData(params);
      setDataSource(res.data);
      setLoading(false);
    },
  }));

  const columns = useMemo(() => {
    return [
      {
        title: '名称',
        dataIndex: '',
      },
      {
        title: '总分',
        dataIndex: 'score',
        width: 200,
        align: 'right',
      },
    ];
  }, []);

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
      <Form layout="inline" style={{ marginBottom: 20, gap: 8 }}>
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
          y: 500,
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
