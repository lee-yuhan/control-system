import { Form, Select } from 'antd';
import React, { FC } from 'react';
import './index.less';

const Index: FC<{
  title: string;
  children: React.ReactElement;
  style?: React.CSSProperties;
}> = ({ title, children, style }) => {
  return (
    <div className="home-card-box" style={style}>
      <Form layout="inline" style={{ position: 'absolute', top: 25, right: 0 }}>
        <Form.Item>
          <Select placeholder="网格" options={[{}]}></Select>
        </Form.Item>
        <Form.Item>
          <Select placeholder="渠道" options={[{}]}></Select>
        </Form.Item>
        <Form.Item>
          <Select placeholder="标签" options={[{}]}></Select>
        </Form.Item>
      </Form>
      <div className="title">{title}</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Index;
