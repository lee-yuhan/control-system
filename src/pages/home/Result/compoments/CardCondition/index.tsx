import { Form, Select } from 'antd';
import LabelsView from '@/compoments/LabelsView';
import { timeOptions } from './config';
import { FC, useMemo, useState } from 'react';
import useInitialState from '@/hooks/useInitialState';
import { useMount } from 'ahooks';
const Index: FC<{
  mode: string;
  onValuesChange: (values: any) => void;
}> = ({ mode, onValuesChange }) => {
  //   const [timeType, setTimeType] = useState<string[]>(['week']);
  const { customerTypeList } = useInitialState();

  const custTypeList = useMemo(() => {
    // mode为1，2，4，5时，只展示以下两个
    if (['1', '2', '4', '5'].includes(mode)) {
      return [
        {
          label: '政企',
          value: '政企',
        },
        {
          label: '公共客户',
          value: '公共客户',
        },
      ];
    }
    return customerTypeList;
  }, [customerTypeList, mode]);

  const defaultValues = useMemo(() => {
    return {
      latitude: ['0'],
      custType: custTypeList?.[0]?.value,
    };
  }, [custTypeList]);
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
        <Select placeholder="请选择客户类型" options={custTypeList} />
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
