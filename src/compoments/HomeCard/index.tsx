import { Form, Select } from 'antd';
import React, { FC } from 'react';
import './index.less';

const Index: FC<{
  title: React.ReactElement | string;
  children: React.ReactElement;
  style?: React.CSSProperties;
  hiddenSelect?: boolean;
  titleStyle?: React.CSSProperties;
}> = ({ title, children, style, hiddenSelect, titleStyle }) => {
  return (
    <div className="home-card-box" style={style}>
      {!hiddenSelect && (
        <Form
          layout="inline"
          style={{ position: 'absolute', top: 8, right: 0 }}
        >
          {/* <Form.Item>
            <Select placeholder="网格" options={[{}]}></Select>
          </Form.Item>
          <Form.Item>
            <Select placeholder="渠道" options={[{}]}></Select>
          </Form.Item> */}
          {/* <Form.Item>
            <Select placeholder="标签" options={[{}]}></Select>
          </Form.Item> */}
        </Form>
      )}
      <div className="title" style={titleStyle}>
        {title}
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Index;
