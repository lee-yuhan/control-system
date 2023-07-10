import { DatePicker as TDatePicker, Form, Select, Table } from 'antd';
import { useRequest } from 'umi';
import { IListItem, getList } from './service';

import { map, omit } from 'lodash';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import { Moment } from 'moment';
import './index.less';
import moment from 'moment';
import { getBranchList } from '@/service/commonServices';
import useInitialState from '@/hooks/useInitialState';

const MyDatePicker = TDatePicker.generatePicker<Moment>(momentGenerateConfig);

const DatePicker: any = MyDatePicker;

const Index = () => {
  const [pageInfo, setPageInfo] = useState<{
    current: number;
    pageSize: number;
    total: number;
  }>({ current: 1, pageSize: 10, total: 0 });

  const [list, setList] = useState<IListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { districtBureauList } = useInitialState();

  const [params, setParams] = useState<any>({
    // start: limitStartDate?.clone(),
    // end: limitEndDate?.clone(),
    dates: [moment().clone(), moment().clone()],
    regionName: districtBureauList?.[0]?.value,
    branchName: undefined,
  });

  const { data: branchList, run } = useRequest(getBranchList, {
    manual: true,
    formatResult(res) {
      return map(res.data, (value) => ({
        label: value,
        value,
      }));
    },
  });
  useEffect(() => {
    if (!params?.regionName) return;
    run(params?.regionName);
  }, [params?.regionName]);

  const handleRequest = useCallback(async () => {
    return;
    setLoading(true);
    const res = await getList({
      ...omit(params, 'dates'),
      start: params?.dates?.[0]?.clone(),
      end: params?.dates?.[1]?.clone(),
      page: pageInfo?.current,
      pageSize: pageInfo?.pageSize,
    });
    setLoading(false);

    setPageInfo({
      ...pageInfo,
      total: res?.total ?? (0 as any),
    });
    setList(res.data);
  }, [pageInfo.pageSize, params, pageInfo.current]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  const columns = useMemo(() => {
    return [
      {
        title: '区域',
        dataIndex: 'area',
      },
    ];
  }, []);

  return (
    <div className="score-box">
      <Form
        layout="inline"
        style={{ marginBottom: 20, gap: 8 }}
        onValuesChange={(_, allValues) => {
          setPageInfo({
            ...pageInfo,
            current: 1,
            total: 0,
          });
          setParams(allValues);
        }}
        initialValues={{
          ...params,
        }}
      >
        <Form.Item label="日期" name="dates">
          <DatePicker.RangePicker placeholder="请选择" allowClear={false} />
        </Form.Item>

        <Form.Item label="区局" name="regionName">
          <Select
            placeholder="请选择"
            showSearch
            popupMatchSelectWidth={false}
            optionFilterProp="label"
            options={districtBureauList}
          />
        </Form.Item>

        <Form.Item label="支局" name="branchName">
          <Select
            placeholder="请选择"
            allowClear
            showSearch
            popupMatchSelectWidth={false}
            optionFilterProp="label"
            options={branchList}
          />
        </Form.Item>
      </Form>

      <Table
        loading={loading}
        columns={columns}
        dataSource={list}
        scroll={{
          y: 550,
          x: 'max-content',
        }}
        pagination={{
          pageSizeOptions: ['10', '20', '50', '100'],
          ...pageInfo,
          onChange: (current: number, pageSize: number) => {
            setPageInfo({
              current,
              pageSize,
              total: pageInfo.total,
            });
          },
        }}
      />
    </div>
  );
};

export default Index;
