import { Row, Col, Select } from 'antd';
import SelectWrapper from '@/compoments/SelectWrapper';
import { CaretDownOutlined } from '@ant-design/icons';
import './index.less';
import HomeCard from '@/compoments/HomeCard';
import Rank from './components/Rank';
import InSaleTrend from './components/InSaleTrend';
import AfterSaleOverview from './components/AfterSaleOverview';
import InSaleOverview from './components/InSaleOverview';
import AfterSaleTrend from './components/AfterSaleTrend';
import BaseLayout from '@/newLayouts';
import { useDispatch, useRequest, useSelector } from 'umi';
import { getBranchList, getGripList } from '@/service/commonServices';
import { map } from 'lodash';
import { useEffect } from 'react';
import useInitialState from '@/hooks/useInitialState';
import SaleMap from './components/SaleMap';

const Index = () => {
  const { districtBureauList } = useInitialState();
  const { branchName, regionName, gridName } = useSelector(
    (store: any) => store.main,
  );
  const dispatch = useDispatch();

  const {
    data: branchList,
    run,
    loading,
  } = useRequest(getBranchList, {
    manual: true,
    formatResult(res) {
      return map(res.data, (value) => ({
        label: value,
        value,
      }));
    },
  });

  useEffect(() => {
    if (!regionName) return;
    run(regionName);
  }, [regionName]);

  const {
    run: getGripListRun,
    data: gripList,
    mutate,
  } = useRequest(getGripList, {
    manual: true,
    formatResult(res) {
      return map(res.data, (value) => ({
        label: value,
        value,
      }));
    },
  });

  useEffect(() => {
    if (!regionName) return;
    run(regionName);
  }, [regionName]);

  useEffect(() => {
    handleChange({
      gridName: undefined,
    });
    if (!branchName) {
      mutate([]);
      return;
    }

    getGripListRun(branchName);
  }, [branchName]);

  const handleChange = (changeValues: any) => {
    dispatch({
      type: 'main/update',
      payload: changeValues,
    });
  };

  // branchName: '',
  // regionName: '',
  // latitude: ['1'],
  // gridName: undefined,

  return (
    <BaseLayout>
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
                placeholder="区局"
                options={districtBureauList}
                value={regionName}
                popupMatchSelectWidth={false}
                onChange={(value) => {
                  handleChange({
                    regionName: value,
                  });
                }}
              />
            </SelectWrapper>
            <SelectWrapper beforeBorder position="right">
              <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder="支局"
                options={branchList}
                popupMatchSelectWidth={false}
                value={branchName}
                onChange={(value) => {
                  handleChange({
                    branchName: value,
                  });
                }}
              />
            </SelectWrapper>

            <SelectWrapper beforeBorder position="right">
              <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder="网格"
                popupMatchSelectWidth={false}
                options={gripList}
                value={gridName}
                onChange={(value) => {
                  handleChange({
                    gridName: value,
                  });
                }}
              />
            </SelectWrapper>
            <SelectWrapper beforeBorder afterBorder position="right">
              <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder="渠道"
                popupMatchSelectWidth={false}
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
                  <SaleMap />
                </Col>
                <Col flex={1}>
                  <Rank />
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <AfterSaleOverview />

              <AfterSaleTrend />
            </Col>
          </Row>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Index;
