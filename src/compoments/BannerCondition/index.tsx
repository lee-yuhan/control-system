import { Button, Col, Form, Row, Select, Space } from 'antd';
import './index.less';
import { downloadOption } from './config';
import useInitialState from '@/hooks/useInitialState';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMount } from 'ahooks';
import { getBranchList, getGripList } from '@/service/commonServices';
import { useDispatch, useRequest, useSelector } from 'umi';
import { map } from 'lodash';

const Index: FC<{
  onValuesChange: (changeValues: any, values: any) => void;
}> = ({ onValuesChange }) => {
  const { districtBureauList } = useInitialState();
  const [downloadType, setDownloadType] = useState<number>(
    downloadOption?.[0]?.value,
  );
  const { branchName, regionName } = useSelector((store: any) => store.home);

  const dispatch = useDispatch();

  const defaultValues = useMemo(() => {
    return {
      regionName: districtBureauList?.[0]?.value,
      // branchName: branchList?.[0]?.value,
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

    // onSuccess: (res) => {
    //   dispatch({
    //     type: 'common/update',
    //     payload: {
    //       districtBureauList: res,
    //     },
    //   });
    // },
  });

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
    if (!regionName) return;
    run(regionName);
  }, [regionName]);

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
            <span className="condition-title">{SYSTEM_NAME}</span>
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
