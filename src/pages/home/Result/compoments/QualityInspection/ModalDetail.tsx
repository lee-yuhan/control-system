import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table } from 'antd';
import { FC, useImperativeHandle, useState } from 'react';
import { deleteQualityData, getQualityData } from '../../service';
import { useAccess, useRequest, useSelector } from 'umi';
import { useDebounceEffect } from 'ahooks';
import { compact } from 'lodash';

const defaultPage = {
  current: 1,
  pageSize: 10,
  total: 0,
};

const Index: FC<{ mRef: any; onDel?: () => void }> = ({ mRef, onDel }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { branchName, regionName } = useSelector((store: any) => store.home);
  const [latitude, setLatitude] = useState<string[]>([]);
  const [date, setDate] = useState<string>();
  const access = useAccess();

  const [pagesData, setPagesData] = useState(defaultPage);

  const {
    data,
    run: getQualityDataRun,
    loading,
    mutate,
    params,
    refresh,
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

  const { run: delRun, loading: delLoading } = useRequest(deleteQualityData, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');

      if (params?.[0]?.current === 1) {
        refresh();
      } else {
        setPagesData({
          ...pagesData,
          current: 1,
        });
      }

      console.log('params');

      onDel?.();
    },
  });

  const handleDel = (id: string) => {
    Modal.confirm({
      title: '提示',
      content: `您确定要删除?`,
      onOk: async () => {
        delRun(id);
      },
    });
  };

  const columns = compact([
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
    access?.get('BUTTON_quality_testing_delete') && {
      title: '操作',
      dataIndex: 'id',
      render: (id: string) => {
        return (
          <Button
            danger
            type="link"
            size="small"
            loading={delLoading}
            style={{ padding: 0 }}
            onClick={() => {
              handleDel(id);
            }}
          >
            删除
          </Button>
        );
      },
    },
  ]).map((item) => ({
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
