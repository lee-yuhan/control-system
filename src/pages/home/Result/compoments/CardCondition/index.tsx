import { Form, Select } from 'antd';
import LabelsView from '@/compoments/LabelsView';
import { timeOptions } from './config';
import { FC, useEffect, useMemo, useState } from 'react';
import useInitialState from '@/hooks/useInitialState';
import { useDebounceEffect, useMount } from 'ahooks';
import { useSelector } from 'umi';
const Index: FC<{
  params: any;
  mode: string;
  onValuesChange: (values: any) => void;
}> = ({ params, mode, onValuesChange }) => {
  const { customerTypeList } = useInitialState();
  const [form] = Form.useForm();
  const gripList = useSelector((store: any) => store.common.gripList);
  const isSpecial = useMemo(() => {
    return ['1', '2', '4', '5'].includes(mode);
  }, [mode]);

  const custTypeList = useMemo(() => {
    // mode为1，2，4，5时，只展示以下两个
    if (isSpecial) {
      return [
        {
          label: '政企',
          value: '政企',
        },
        {
          label: '公众客户',
          value: '公众客户',
        },
      ];
    }
    return customerTypeList;
  }, [customerTypeList, mode]);

  const defaultValues = useMemo(() => {
    return {
      latitude: ['0'],
      custType: isSpecial ? custTypeList?.[0]?.value : undefined,
    };
  }, [custTypeList]);

  useMount(() => {
    onValuesChange?.(defaultValues);
  });

  useDebounceEffect(
    () => {
      form.setFieldValue('gridName', undefined);
      onValuesChange?.({
        ...params,
        gridName: undefined,
      });
    },
    [gripList],
    { wait: 300 },
  );

  return (
    <Form
      form={form}
      layout="inline"
      style={{ gap: 8 }}
      onValuesChange={(_, allValues) => {
        onValuesChange?.(allValues);
      }}
      initialValues={defaultValues}
    >
      <Form.Item style={{ marginRight: 0 }} name="custType">
        <Select
          placeholder="请选择客户类型"
          style={{ minWidth: 120 }}
          allowClear={!isSpecial}
          options={custTypeList}
        />
      </Form.Item>
      <Form.Item style={{ marginRight: 0 }} name="gridName">
        <Select
          style={{ minWidth: 140 }}
          showSearch
          placeholder="请选择网格"
          allowClear
          options={gripList}
        />
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
