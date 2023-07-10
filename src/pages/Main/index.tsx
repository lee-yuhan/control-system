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
import {
  getHistoryAreaList,
  getHistoryChannelList,
  getHistoryTagList,
} from './services';

const Index = () => {
  const { branchName, regionName, gridName, channelName, tagName } =
    useSelector((store: any) => store.main);
  const dispatch = useDispatch();

  const { data: districtBureauList } = useRequest(getHistoryAreaList, {
    formatResult(res) {
      return map(res.data, (value) => ({
        label: value,
        value,
      }));
    },
    onSuccess: (res) => {
      handleChange({
        regionName: res?.[0]?.value,
      });
    },
  });

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

  const { data: channelList, run: getHistoryChannelListRun } = useRequest(
    getHistoryChannelList,
    {
      manual: true,
      formatResult(res) {
        return map(res.data, (value) => ({
          label: value,
          value,
        }));
      },
    },
  );

  useEffect(() => {
    handleChange({
      branchName: undefined,
    });
    if (!regionName) return;
    run(regionName);
    getHistoryChannelListRun(regionName);
  }, [regionName]);

  // const {
  //   run: getGripListRun,
  //   data: gripList,
  //   mutate,
  // } = useRequest(getGripList, {
  //   manual: true,
  //   formatResult(res) {
  //     return map(res.data, (value) => ({
  //       label: value,
  //       value,
  //     }));
  //   },
  // });

  const {
    run: getHistoryTagListRun,
    data: tagList,
    mutate,
  } = useRequest(getHistoryTagList, {
    manual: true,
    formatResult(res) {
      return map(res.data, (value) => ({
        label: value,
        value,
      }));
    },
  });

  useEffect(() => {
    if (!channelName) {
      mutate([]);
      return;
    }
    getHistoryTagListRun(channelName);
  }, [channelName]);

  const handleChange = (changeValues: any) => {
    dispatch({
      type: 'main/update',
      payload: changeValues,
    });
  };

  return (
    <BaseLayout>
      <div id="main-container" className="main-container">
        <Row style={{ height: 40 }}>
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
                showSearch
                popupMatchSelectWidth={false}
                getPopupContainer={() =>
                  document.getElementById('main-container') || document.body
                }
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
                showSearch
                popupMatchSelectWidth={false}
                value={branchName}
                getPopupContainer={() =>
                  document.getElementById('main-container') || document.body
                }
                onChange={(value) => {
                  handleChange({
                    branchName: value,
                  });
                }}
              />
            </SelectWrapper>

            {/* <SelectWrapper beforeBorder position="right">
              <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder="网格"
                showSearch
                popupMatchSelectWidth={false}
                options={gripList}
                value={gridName}
                onChange={(value) => {
                  handleChange({
                    gridName: value,
                  });
                }}
              />
            </SelectWrapper> */}
            <SelectWrapper beforeBorder afterBorder position="right">
              <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder="渠道"
                showSearch
                popupMatchSelectWidth={false}
                options={channelList}
                getPopupContainer={() =>
                  document.getElementById('main-container') || document.body
                }
                value={channelName}
                onChange={(value) => {
                  handleChange({
                    channelName: value,
                  });
                }}
              />
            </SelectWrapper>
            <SelectWrapper beforeBorder afterBorder position="right">
              <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder="标签"
                value={tagName}
                popupMatchSelectWidth={false}
                options={tagList}
                showSearch
                getPopupContainer={() =>
                  document.getElementById('main-container') || document.body
                }
                onChange={(value) => {
                  handleChange({
                    tagName: value,
                  });
                }}
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
        <Row gutter={[20, 20]} style={{ height: '100%' }}>
          <Col span={8}>
            <Row
              gutter={[20, 20]}
              style={{ height: '100%', flexDirection: 'column' }}
            >
              <Col>
                <InSaleOverview />
              </Col>
              <Col flex={1}>
                <InSaleTrend />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row
              gutter={[20, 20]}
              style={{ height: '100%', flexDirection: 'column' }}
            >
              <SaleMap />
              <Col flex={1}>
                <Rank />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row
              gutter={[20, 20]}
              style={{ height: '100%', flexDirection: 'column' }}
            >
              <Col>
                <AfterSaleOverview />
              </Col>
              <Col flex={1}>
                <AfterSaleTrend />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </BaseLayout>
  );
};

export default Index;
