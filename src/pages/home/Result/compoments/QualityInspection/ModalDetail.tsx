import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import { FC, useImperativeHandle, useState } from 'react';

const Index: FC<{ mRef: any }> = ({ mRef }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(mRef, () => ({
    showModal: () => {
      setVisible(true);
    },
  }));

  const handleDel = () => {
    Modal.confirm({
      title: '提示',
      content: `您将要删除 ?`,
      onOk: async () => {},
    });
  };

  const columns = [
    {
      title: 'CRM编号/112流水号',
      dataIndex: 'index',
    },
    {
      title: 'P6号/工单号',
      dataIndex: 'name',
    },
    {
      title: '区局',
      dataIndex: 'regionName',
    },
    {
      title: '支局',
      dataIndex: 'repeatNum',
    },
    {
      title: '工单操作类型',
      dataIndex: 'recordNum',
    },
    {
      title: '完工日期',
      dataIndex: 'recordNum',
    },
    {
      title: '核查结果',
      dataIndex: 'recordNum',
    },
    {
      title: '操作',
      render: () => {
        return (
          <Button
            danger
            type="link"
            size="small"
            style={{ padding: 0 }}
            onClick={handleDel}
          >
            删除
          </Button>
        );
      },
    },
  ];

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
        dataSource={[{ name: 123123 }]}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </Modal>
  );
};

export default Index;
