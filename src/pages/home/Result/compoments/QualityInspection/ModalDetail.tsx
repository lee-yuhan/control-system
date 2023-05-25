import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { FC, useImperativeHandle, useState } from 'react';
import { getQualityData } from '../../service';
import { useRequest, useSelector } from 'umi';
import { useDebounceEffect } from 'ahooks';

const defaultPage = {
  current: 1,
  pageSize: 10,
  total: 0,
};

const Index: FC<{ mRef: any }> = ({ mRef }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { branchName, regionName } = useSelector((store: any) => store.home);
  const [latitude, setLatitude] = useState<string[]>([]);
  const [date, setDate] = useState<string>();

  const [pagesData, setPagesData] = useState(defaultPage);

  const {
    data,
    run: getQualityDataRun,
    loading,
    mutate,
  } = useRequest(getQualityData, {
    manual: true,
    onSuccess: (res) => {
      setPagesData({
        ...pagesData,
        total: res.total,
      });
    },
  });

  useDebounceEffect(
    () => {
      if ((!regionName || !latitude?.length) && !visible) return;
      getQualityDataRun({
        branchName,
        regionName,
        date,
        latitude: latitude?.toString(),
        current: pagesData.current,
        size: pagesData.pageSize,
      });
    },
    [
      regionName,
      branchName,
      latitude,
      pagesData?.current,
      pagesData?.pageSize,
      date,
      visible,
    ],
    { wait: 300 },
  );

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
        setPagesData(defaultPage);
        mutate([]);
      }}
      closeIcon={<CloseCircleOutlined />}
    >
      <Table
        style={{ marginTop: 30 }}
        columns={columns as any}
        loading={loading}
        dataSource={data?.records}
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
