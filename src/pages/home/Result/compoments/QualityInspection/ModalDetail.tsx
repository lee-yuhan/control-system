import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { FC, useEffect, useImperativeHandle, useState } from 'react';
import { getQualityData } from '../../service';
import { useRequest, useSelector } from 'umi';

const Index: FC<{ mRef: any }> = ({ mRef }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { branchName, regionName } = useSelector((store: any) => store.home);
  const [latitude, setLatitude] = useState<string[]>([]);
  const [date, setDate] = useState<string>();

  const [pagesData, setPagesData] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  const {
    data,
    run: getQualityDataRun,
    loading,
  } = useRequest(getQualityData, {
    manual: true,
    formatResult(res) {
      return res?.data?.records;
    },
  });

  useEffect(() => {
    if (!regionName || !latitude?.length) return;
    getQualityDataRun({
      branchName,
      regionName,
      date,
      latitude: latitude?.toString(),
      current: pagesData.current,
      size: pagesData.pageSize,
    });
  }, [regionName, branchName, latitude, pagesData, date]);

  useImperativeHandle(mRef, () => ({
    showModal: (date: string, latitudes: string[]) => {
      setLatitude(latitudes);
      setDate(date);
      setVisible(true);
    },
  }));

  const columns = [
    {
      title: 'CRM编号/112流水号',
      dataIndex: 'serialNo',
    },
    {
      title: 'P6号/工单号',
      dataIndex: 'workNo',
    },
    {
      title: '区局',
      dataIndex: 'regionName',
    },
    {
      title: '支局',
      dataIndex: 'branchName',
    },
    {
      title: '工单操作类型',
      dataIndex: 'operationType',
    },
    {
      title: '完工日期',
      dataIndex: 'completeDate',
    },
    {
      title: '核查结果',
      dataIndex: 'checkResult',
    },
  ].map((item) => ({
    render: (value: string) => {
      return value ?? '-';
    },
    ...item,
  }));

  return (
    <Modal
      open={visible}
      footer={null}
      width={'70%'}
      onCancel={() => {
        setVisible(false);
      }}
      closeIcon={<CloseCircleOutlined />}
    >
      <Table
        style={{ marginTop: 30 }}
        columns={columns as any}
        loading={loading}
        dataSource={data}
        pagination={pagesData}
        onChange={(pagination) => {
          const { pageSize, current, total } = pagination;
          setPagesData({
            current: current!,
            pageSize: pageSize!,
            total: total!,
          });
        }}
        scroll={{ x: 'max-content' }}
      />
    </Modal>
  );
};

export default Index;
