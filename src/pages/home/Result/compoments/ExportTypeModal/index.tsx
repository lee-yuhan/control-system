import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal, Radio } from 'antd';
import { FC, useImperativeHandle, useState } from 'react';

export type IExportType = 'ECHART_DATA' | 'DETAAIL_DATA';

const Index: FC<{ mRef: any; onConfirm?: (value: IExportType) => void }> = ({
  mRef,
  onConfirm,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<IExportType>('ECHART_DATA');

  useImperativeHandle(mRef, () => ({
    showModal: () => {
      setType('ECHART_DATA');
      setVisible(true);
    },
  }));

  return (
    <Modal
      open={visible}
      width={'40%'}
      destroyOnClose
      onOk={() => {
        onConfirm?.(type);
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}
      closeIcon={<CloseCircleOutlined />}
    >
      <Radio.Group
        style={{ marginTop: 30 }}
        onChange={(e) => {
          setType(e.target.value);
        }}
        value={type}
      >
        <Radio value={'ECHART_DATA'}>图表数据</Radio>
        <Radio value={'DETAAIL_DATA'}>工单明细</Radio>
      </Radio.Group>
    </Modal>
  );
};

export default Index;
