import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Table, message } from 'antd';
import { FC, useEffect, useImperativeHandle, useState } from 'react';
import { useAccess, useRequest, useSelector } from 'umi';
import { deleteQualityFileData, getQualityFileData } from '../../service';
import { compact } from 'lodash';

const Index: FC<{ mRef: any }> = ({ mRef }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const access = useAccess();
  const { branchName, regionName } = useSelector((store: any) => store.home);
  const [latitude, setLatitude] = useState<string[]>([]);
  const [date, setDate] = useState<string>();

  const [pagesData, setPagesData] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  useImperativeHandle(mRef, () => ({
    showModal: () => {
      // setLatitude(latitudes);
      // setDate(date);
      setVisible(true);
    },
  }));

  const {
    data,
    run: getQualityFileDataRun,
    loading,
  } = useRequest(getQualityFileData, {
    manual: true,
    formatResult(res) {
      return res?.data?.records;
    },
  });

  useEffect(() => {
    if (!regionName || !latitude?.length) return;
    getQualityFileDataRun({
      current: pagesData.current,
      size: pagesData.pageSize,
    });
  }, [regionName, branchName, latitude, pagesData, date]);

  const { run: delRun, loading: delLoading } = useRequest(
    deleteQualityFileData,
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
      },
    },
  );

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
      title: '导入人',
      dataIndex: 'nickname',
    },
    {
      title: '导入文件名',
      dataIndex: 'fileName',
    },
    {
      title: '导入时间',
      dataIndex: 'createTime',
    },
    access.get('"quality_testing_delete') && {
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
  ]);

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
