import './index.less';
import { FC } from 'react';
import classnames from 'classnames';
import { Col, Row, Typography } from 'antd';

const Index: FC<{
  options: {
    id: string;
    name: string;
  }[];
  value: string;
  onChange: (value: string) => void;
}> = ({ options, value, onChange }) => {
  return (
    <Row className="cs-tab" wrap={false}>
      {options?.map((item) => (
        <Col
          flex={1}
          key={item.id}
          className={classnames('cs-tab-item', {
            'cs-tab-item-active': value === item.id,
          })}
          onClick={() => {
            onChange?.(item.id);
          }}
        >
          <Typography.Text ellipsis>{item.name}</Typography.Text>
        </Col>
      ))}
    </Row>
  );
};

export default Index;
