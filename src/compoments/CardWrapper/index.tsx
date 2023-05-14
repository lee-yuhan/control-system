import { Button, Row, Col } from 'antd';
import { PropsWithChildren } from 'react';
import './index.less';

interface IProps extends PropsWithChildren<any> {
  header: React.ReactElement;
}

const Index = (props: IProps) => {
  return (
    <div className="card-container">
      <div>
        <Row justify="space-between" wrap={false} align="middle" gutter={8}>
          <Col flex={1}>{props.header}</Col>
          <Col>
            <Button className="export-btn">导出</Button>
          </Col>
        </Row>
      </div>
      <div className="card-content">{props.children}</div>
    </div>
  );
};

export default Index;
