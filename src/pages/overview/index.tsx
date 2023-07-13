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
  }>({ current: 1, pageSize: 20, total: 0 });

  const [list, setList] = useState<IListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { districtBureauList } = useInitialState();

  const [params, setParams] = useState<any>({
    // start: limitStartDate?.clone(),
    // end: limitEndDate?.clone(),
    dates: [moment().clone().startOf('month'), moment().clone()],
    regionName: undefined,
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
    setLoading(true);
    const resParams = {
      ...omit(params, 'dates'),
      start: params?.dates?.[0]?.clone(),
      end: params?.dates?.[1]?.clone(),
      page: pageInfo?.current,
      pageSize: pageInfo?.pageSize,
    };
    const res = await getList(resParams);
    setLoading(false);

    setPageInfo({
      ...pageInfo,
      total: res?.data?.total ?? (0 as any),
    });
    setList(res?.data?.records);
  }, [pageInfo.pageSize, params, pageInfo.current]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  const columns = useMemo(() => {
    return [
      {
        title: '区域',
        dataIndex: 'regionName',
        width: 100,
      },
      {
        title: '支局',
        dataIndex: 'branchName',
        width: 100,
      },
      {
        title: '日期',
        dataIndex: 'batch',
        width: 150,
      },
      {
        title: '装维10分满意工单数',
        dataIndex: 'zw10myNum',
      },
      {
        title: '装维1-3分满意工单数',
        dataIndex: 'zw13myNum',
      },
      {
        title: '装维参评工单数',
        dataIndex: 'zwCpAllnum',
      },

      {
        title: '质差上门工单数',
        dataIndex: 'zcSmNum',
      },
      {
        title: '质差工单数',
        dataIndex: 'zcAllnum',
      },
      {
        title: '质差10分满意工单数',
        dataIndex: 'zc10myNum',
      },

      {
        title: '质差参评工单数',
        dataIndex: 'zcCpAllnum',
      },
      {
        title: '政企维修履约数',
        dataIndex: 'wxZqLyNum',
      },
      {
        title: '政企维修履约总数',
        dataIndex: 'wxZqLyAllnum',
      },
      {
        title: '公客维修履约数',
        dataIndex: 'wxGkLyNum',
      },
      {
        title: '公客维修履约总数',
        dataIndex: 'wxGkLyAllnum',
      },
      {
        title: '政企维修改约数',
        dataIndex: 'wxZqGyNum',
      },
      {
        title: '政企维修改约总数',
        dataIndex: 'wxZqGyAllnum',
      },

      {
        title: '公客维修改约数',
        dataIndex: 'wxGkGyNum',
      },
      {
        title: '公客维修改约总数',
        dataIndex: 'wxGkGyAllnum',
      },
      {
        title: '政企安装履约数',
        dataIndex: 'azZqLyNum',
      },

      {
        title: '政企安装履约总数',
        dataIndex: 'azZqLyAllnum',
      },

      {
        title: '公客安装履约数',
        dataIndex: 'azGkLyNum',
      },

      {
        title: '公客安装履约总数',
        dataIndex: 'azGkLyAllnum',
      },

      {
        title: '政企安装改约数',
        dataIndex: 'azZqGyNum',
      },

      {
        title: '政企安装改约总数',
        dataIndex: 'azZqGyAllnum',
      },

      {
        title: '公客安装改约数',
        dataIndex: 'azGkGyNum',
      },
      {
        title: '公客安装改约总数',
        dataIndex: 'azGkGyAllnum',
      },
      {
        title: '重复维修数',
        dataIndex: 'wxCfwxNum',
      },
      {
        title: '重复维修总数',
        dataIndex: 'wxCfwxAllnum',
      },
      // {
      //   title: '安装局方原因退单数',
      //   dataIndex: 'azTdAllnum',
      // },
      {
        title: '安装有原因退单总数',
        dataIndex: 'azTdAllnum',
      },

      // {
      //   title: '安装工单总数',
      //   dataIndex: 'azTdAllnum',
      // },
      {
        title: '安装有原因退单总数',
        dataIndex: 'azTdAllnum',
      },

      {
        title: '装维10分满意度',
        dataIndex: 'zw10myRate',
      },

      {
        title: '装维10分评分',
        dataIndex: 'zw10myScore',
      },

      {
        title: '质差上门率',
        dataIndex: 'zcSmRate',
      },
      {
        title: '质差10分满意度',
        dataIndex: 'zc10myRate',
      },

      {
        title: '质差修复评分',
        dataIndex: 'zcScore',
      },

      {
        title: '公客维修履约率',
        dataIndex: 'wxGkLyRate',
      },

      {
        title: '政企维修履约率',
        dataIndex: 'wxZqLyRate',
      },
      {
        title: '公客维修改约率',
        dataIndex: 'wxGkGyRate',
      },
      {
        title: '政企维修改约率',
        dataIndex: 'wxZqGyRate',
      },

      {
        title: '公客安装履约率',
        dataIndex: 'azGkLyRate',
      },

      {
        title: '政企安装履约率',
        dataIndex: 'azZqLyRate',
      },
      {
        title: '公客安装改约率',
        dataIndex: 'azGkGyRate',
      },
      {
        title: '政企安装改约率',
        dataIndex: 'azZqGyRate',
      },

      {
        title: '局方原因退单率',
        dataIndex: 'azTdRate',
      },
      {
        title: '装维日常工作评分',
        dataIndex: 'zwScore',
      },
      {
        title: '重复维修率',
        dataIndex: 'wxCfwxRate',
      },

      {
        title: '装维其他指标评分',
        dataIndex: 'zwOtherScore',
      },
      {
        title: '质量评分',
        dataIndex: 'allScore1',
      },
      {
        title: '质量排名',
        dataIndex: 'allRanking1',
      },
      {
        title: '装维1-3分占比',
        dataIndex: 'zw13myRate',
      },
      // {
      //   title: '装维1-3分扣分',
      //   dataIndex: 'allRanking1',
      // },

      {
        title: '总评分',
        dataIndex: 'allScore2',
      },
      {
        title: '最终排名',
        dataIndex: 'allRanking2',
      },
      // {
      //   title: '装维不是10分满意工单汇总',
      //   dataIndex: 'allRanking2',
      // },
      {
        title: '装维1-3分满意工单汇总',
        dataIndex: 'zw13myGd',
        width: 200,
      },
      {
        title: '质差没有上门工单汇总',
        dataIndex: 'zcNoSmGd',
        width: 200,
      },

      {
        title: '质差不是10分满意工单汇总',
        dataIndex: 'zcNo10myGd',
        width: 200,
      },
      {
        title: '政企维修没有履约工单汇总',
        dataIndex: 'wxZqNoLyGd',
        width: 200,
      },

      {
        title: '公客维修没有履约工单汇总',
        dataIndex: 'wxGkNoLyGd',
        width: 200,
      },
      {
        title: '政企维修改约工单汇总',
        dataIndex: 'wxZqGyGd',
        width: 200,
      },

      {
        title: '公客维修改约工单汇总',
        dataIndex: 'wxGkGyGd',
        width: 200,
      },
      {
        title: '政企安装没有履约工单汇总',
        dataIndex: 'azZqNoLyGd',
        width: 200,
      },

      {
        title: '公客安装没有履约工单汇总',
        dataIndex: 'azGkNoLyGd',
        width: 200,
      },
      {
        title: '政企安装改约工单汇总',
        dataIndex: 'azZqGyGd',
        width: 200,
      },

      {
        title: '公客安装改约工单汇总',
        dataIndex: 'azGkGyGd',
        width: 200,
      },
      {
        title: '重复维修工单汇总',
        dataIndex: 'wxCfwxGd',
        width: 200,
      },
      {
        title: '安装局方原因退单工单汇总',
        dataIndex: 'azTdGd',
        width: 200,
      },
    ].map((item) => ({
      render: (value: string) => {
        return value || '-';
      },
      ...item,
    }));
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
            allowClear
            popupMatchSelectWidth={false}
            optionFilterProp="label"
            options={districtBureauList}
            getPopupContainer={(trigger) => trigger.parentNode}
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
            getPopupContainer={(trigger) => trigger.parentNode}
          />
        </Form.Item>
      </Form>

      <Table
        loading={loading}
        columns={columns}
        dataSource={list}
        scroll={{
          x: 'max-content',
        }}
        pagination={{
          pageSizeOptions: ['20', '50', '100'],
          showSizeChanger: true,
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
