import { Row, Col, Input, DatePicker as TDatePicker, Select } from 'antd';
import SelectWrapper from '@/compoments/SelectWrapper';
import { CaretDownOutlined } from '@ant-design/icons';

import type { Moment } from 'moment';
import './index.less';

import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import Header from './components/Header';

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
    </div>
  );
};

export default Index;
