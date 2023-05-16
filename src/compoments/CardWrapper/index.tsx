import { Button, Row, Col, Spin, Space } from 'antd';
import { FC, PropsWithChildren } from 'react';
import './index.less';
import React from 'react';

interface IProps extends PropsWithChildren<any> {
  header: React.ReactElement;
  loading?: boolean;
  extra?: React.ReactElement;
}

const Index: FC<IProps> = ({ extra, loading = false, header, children }) => {
  return (
    <Spin spinning={loading}>
      <div className="card-container">
        <div>
          <Row justify="space-between" wrap={false} align="middle" gutter={8}>
            <Col flex={1}>{header}</Col>
            <Col>
              <Space size={4}>
                {extra}
                <Button className="export-btn">导出</Button>
              </Space>
            </Col>
          </Row>
        </div>
        <div className="card-content">{children}</div>
      </div>
    </Spin>
  );
};

export default Index;
