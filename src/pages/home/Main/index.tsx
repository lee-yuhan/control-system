import { Row, Col, Select } from 'antd';
import SelectWrapper from '@/compoments/SelectWrapper';
import { CaretDownOutlined } from '@ant-design/icons';
import './index.less';
import HomeCard from '@/compoments/HomeCard';

const Index = () => {
  return (
    <div className="main-container">
      <Row>
        <Col flex={1}></Col>
        <Col
          span={8}
          style={{
            display: 'flex',
            position: 'relative',
            top: -10,
            paddingLeft: 40,
          }}
        >
          <SelectWrapper beforeBorder position="right">
            <Select
              suffixIcon={<CaretDownOutlined />}
              style={{ pointerEvents: 'none' }}
              placeholder="日"
            />
          </SelectWrapper>
          <SelectWrapper beforeBorder position="right">
            <Select
              suffixIcon={<CaretDownOutlined />}
              style={{ pointerEvents: 'none' }}
              placeholder="日"
            />
          </SelectWrapper>

          <SelectWrapper beforeBorder position="right">
            <Select
              suffixIcon={<CaretDownOutlined />}
              style={{ pointerEvents: 'none' }}
              placeholder="日"
            />
          </SelectWrapper>

          {/* <Input
            style={{
              border: '1px solid #387AFF',
              background: '#021646',
              color: '#fff',
              marginLeft: 20,
              maxWidth: 150,
            }}
            readOnly
          ></Input> */}
        </Col>
      </Row>

      {/* 内容 */}
      <div>
        <Row>
          <Col span={8}>
            <HomeCard title="12">
              <>12</>
            </HomeCard>
          </Col>
          <Col span={8}>
            <Row style={{ flexDirection: 'column' }}>
              <Col>12</Col>
              <Col>12</Col>
            </Row>
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
