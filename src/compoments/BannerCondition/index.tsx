import { Button, Col, Form, Row, Select, Space } from 'antd';
import './index.less';
import { downloadOption } from './config';
import useInitialState from '@/hooks/useInitialState';
import { FC, useMemo, useState } from 'react';
import { useMount } from 'ahooks';

const Index: FC<{
  onValuesChange: (changeValues: any, values: any) => void;
}> = ({ onValuesChange }) => {
  const { districtBureauList, branchList } = useInitialState();
  const [downloadType, setDownloadType] = useState<number>(
    downloadOption?.[0]?.value,
  );

  const defaultValues = useMemo(() => {
    return {
      regionName: districtBureauList?.[0]?.value,
      // branchName: branchList?.[0]?.value,
    };
  }, [districtBureauList]);
  useMount(() => {
    onValuesChange?.(defaultValues, defaultValues);
  });
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
                  style={{ minWidth: 110 }}
                  placeholder="请选择支局"
                  options={branchList}
                >
                  {branchList?.map((item) => (
                    <Select.Option key={item.value}>{item.label}</Select.Option>
                  ))}
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
