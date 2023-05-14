import { Button, Col, Form, Row, Select, Space } from 'antd';
import './index.less';
import { downloadOption } from './config';
import useInitialState from '@/hooks/useInitialState';
import { FC, useMemo } from 'react';
import { useMount } from 'ahooks';

const Index: FC<{
  onValuesChange: (changeValues: any, values: any) => void;
}> = ({ onValuesChange }) => {
  const { districtBureauList, branchList } = useInitialState();
  const defaultValues = useMemo(() => {
    return {
      regionName: districtBureauList?.[0]?.value,
      branchName: branchList?.[0]?.value,
    };
  }, [districtBureauList, branchList]);
  useMount(() => {
    onValuesChange?.(defaultValues, defaultValues);
  });
  return (
    <div className="condition-container">
      <Row align="middle" justify="space-between">
        <Col className="left">
          <Space align="center">
            <span className="condition-title">装维管控平台</span>
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
                  style={{ width: 110 }}
                  placeholder="请选择支局"
                  options={branchList}
                />
              </Form.Item>
            </Form>
          </Space>
        </Col>
        <Col className="right">
          <Space>
            <Select
              placeholder="请选择"
              style={{
                border: '1px solid var(--select-border)',
              }}
              options={downloadOption}
            />
            <Button type="primary">打标</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
