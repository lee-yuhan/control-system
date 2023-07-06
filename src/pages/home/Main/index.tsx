import { Row, Col, Select } from 'antd';
import SelectWrapper from '@/compoments/SelectWrapper';
import { CaretDownOutlined } from '@ant-design/icons';
import './index.less';
import HomeCard from '@/compoments/HomeCard';
import Rank from './components/Rank';
import InSaleTrend from './components/InSaleTrend';
import AfterSaleOverview from './components/AfterSaleOverview';
import InSaleOverview from './components/InSaleOverview';
import mapImg from '@/newAssets/map.png';

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
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <InSaleOverview />

            <InSaleTrend />
          </Col>
          <Col span={8}>
            <Row style={{ flexDirection: 'column' }} gutter={[20, 20]}>
              <Col>
                <div style={{ height: 500, padding: 20, textAlign: 'center' }}>
                  <img src={mapImg} style={{ width: '100%', margin: 'auto' }} />
                </div>
              </Col>
              <Col flex={1}>
                <Rank />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <AfterSaleOverview />

            <HomeCard title="售后工单趋势">
              <>34</>
            </HomeCard>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
