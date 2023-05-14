import { Form, Select } from 'antd';
import LabelsView from '@/compoments/LabelsView';
import { timeOptions } from './config';
import { FC, useMemo, useState } from 'react';
import useInitialState from '@/hooks/useInitialState';
import { useMount } from 'ahooks';

const Index: FC<{
  onValuesChange: (values: any) => void;
}> = ({ onValuesChange }) => {
  //   const [timeType, setTimeType] = useState<string[]>(['week']);
  const { customerTypeList } = useInitialState();
  const defaultValues = useMemo(() => {
    return {
      latitude: ['0'],
      custType: customerTypeList?.[0]?.value,
    };
  }, [customerTypeList]);
  useMount(() => {
    onValuesChange?.(defaultValues);
  });
  return (
    <Form
      layout="inline"
      style={{ gap: 8 }}
      onValuesChange={(_, allValues) => {
        onValuesChange?.(allValues);
      }}
      initialValues={defaultValues}
    >
      <Form.Item style={{ marginRight: 0 }} name="custType">
        <Select placeholder="请选择客户类型" options={customerTypeList} />
      </Form.Item>
      <Form.Item style={{ marginRight: 0 }}>
        <Select placeholder="请选择网格" />
      </Form.Item>
      <Form.Item style={{ marginRight: 0 }} name="latitude">
        <LabelsView
          single
          //   value={timeType}
          dataSource={timeOptions}
          //   onChange={setTimeType as any}
        />
      </Form.Item>
    </Form>
  );
};

export default Index;
