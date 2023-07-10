import {
  Button,
  Col,
  DatePicker as TDatePicker,
  Form,
  Row,
  Select,
  Space,
} from 'antd';
import './index.less';
import { downloadOption, timeOptions } from './config';
import useInitialState from '@/hooks/useInitialState';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMount } from 'ahooks';
import { getBranchList, getGripList } from '@/service/commonServices';
import { useDispatch, useRequest, useSelector } from 'umi';
import { map } from 'lodash';
import LabelsView from '../LabelsView';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import { Moment } from 'moment';

const MyDatePicker = TDatePicker.generatePicker<Moment>(momentGenerateConfig);

const DatePicker: any = MyDatePicker;
const Index: FC<{
  onValuesChange: (changeValues: any, values: any) => void;
}> = ({ onValuesChange }) => {
  const { districtBureauList } = useInitialState();
  const [downloadType, setDownloadType] = useState<number>(
    downloadOption?.[0]?.value,
  );
  const { branchName, regionName, step, date } = useSelector(
    (store: any) => store.home,
  );
  const gripList = useSelector((store: any) => store.common.gripList);

  const dispatch = useDispatch();

  const defaultValues = useMemo(() => {
    return {
      regionName: districtBureauList?.[0]?.value,
      // branchName: branchList?.[0]?.value,
      gripList: undefined,
      latitude: ['1'],
      step: 7,
      date: moment(),
    };
  }, [districtBureauList]);
  useMount(() => {
    onValuesChange?.(defaultValues, defaultValues);
  });

  const {
    data: branchList,
    run,
    loading,
  } = useRequest(getBranchList, {
    manual: true,
    formatResult(res) {
      return map(res.data, (value) => ({
        label: value,
        value,
      }));
    },
  });
  useEffect(() => {
    if (!regionName) return;
    run(regionName);
  }, [regionName]);

  const { run: getGripListRun } = useRequest(getGripList, {
    manual: true,
    formatResult(res) {
      return map(res.data, (value) => ({
        label: value,
        value,
      }));
    },

    onSuccess: (res) => {
      dispatch({
        type: 'common/update',
        payload: {
          gripList: res,
        },
      });
    },
  });

  useEffect(() => {
    if (!branchName) {
      dispatch({
        type: 'common/update',
        payload: {
          gripList: [],
        },
      });
      return;
    }
    getGripListRun(branchName);
  }, [branchName]);

  return (
    <div className="condition-container">
      {/* <div className="condition-box"> */}
      <Row align="middle" justify="space-between">
        <Col className="left">
          <Space align="center">
            <span
              onClick={() => {
                window.open(`${window.location.origin}/main`);
              }}
              className="condition-title"
            >
              {SYSTEM_NAME}
            </span>
            <Form
              layout="inline"
              onValuesChange={onValuesChange}
              initialValues={defaultValues}
            >
              <Form.Item name="regionName">
                <Select
                  style={{ width: 110 }}
                  placeholder="请选择区局"
                  options={districtBureauList}
                />
              </Form.Item>
              <Form.Item name="branchName">
                <Select
                  style={{ minWidth: 140 }}
                  placeholder="请选择支局"
                  options={branchList}
                  loading={loading}
                  allowClear
                >
                  {/* {branchList?.map((item) => (
                    <Select.Option key={item.value}>{item.label}</Select.Option>
                  ))} */}
                </Select>
              </Form.Item>

              <Form.Item name="gridName">
                <Select
                  style={{ minWidth: 140 }}
                  showSearch
                  placeholder="请选择网格"
                  allowClear
                  options={gripList}
                />
              </Form.Item>
              <Form.Item name="date">
                <DatePicker allowClear={false} />
              </Form.Item>
              <Form.Item name="latitude">
                <LabelsView
                  single
                  //   value={timeType}
                  dataSource={timeOptions}
                  //   onChange={setTimeType as any}
                />
              </Form.Item>
              <Form.Item name="step" style={{ marginRight: 0 }}>
                <Select
                  style={{ width: 80 }}
                  options={Array(12)
                    .fill(null)
                    ?.map((_, index) => ({
                      label: index + 1,
                      value: index + 1,
                    }))}
                />
              </Form.Item>
            </Form>
          </Space>
        </Col>
        <Col className="right">
          <Space>
            <Select
              placeholder="请选择"
              value={downloadType}
              onChange={setDownloadType}
              style={{
                border: '1px solid var(--select-border)',
              }}
              options={downloadOption}
            />
            <Button type="primary">打标</Button>
          </Space>
        </Col>
      </Row>
      {/* </div> */}
    </div>
  );
};

export default Index;
