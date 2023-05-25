import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Table, message } from 'antd';
import { FC, useEffect, useImperativeHandle, useState } from 'react';
import { useAccess, useRequest } from 'umi';
import { deleteQualityFileData, getQualityFileData } from '../../service';
import { compact } from 'lodash';

const defaultPage = {
  current: 1,
  pageSize: 10,
  total: 0,
};

const Index: FC<{ mRef: any; onDel?: () => void }> = ({ mRef, onDel }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const access = useAccess();

  const [pagesData, setPagesData] = useState(defaultPage);

  useImperativeHandle(mRef, () => ({
    showModal: () => {
      setPagesData(defaultPage);
      setVisible(true);
    },
  }));

  const {
    data,
    run: getQualityFileDataRun,
    loading,
    mutate,
  } = useRequest(getQualityFileData, {
    manual: true,
    onSuccess: (res) => {
      setPagesData({
        ...pagesData,
        total: res.total,
      });
    },
  });

  useEffect(() => {
    if (visible)
      getQualityFileDataRun({
        current: pagesData.current,
        size: pagesData.pageSize,
      });
  }, [visible, pagesData?.current, pagesData?.pageSize]);

  const { run: delRun, loading: delLoading } = useRequest(
    deleteQualityFileData,
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        setPagesData({
          ...pagesData,
          current: 1,
        });
        onDel?.();
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
    access.get('BUTTON_quality_testing_delete') && {
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
      width={'50%'}
      destroyOnClose
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
