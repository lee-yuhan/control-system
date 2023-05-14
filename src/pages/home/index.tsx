import BannerCondition from '@/compoments/BannerCondition';
import Result from './Result';
import './index.less';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Button, Carousel } from 'antd';
import { useRef } from 'react';

import prev_btn from '@/assets/prev_btn.png';
import next_btn from '@/assets/next_btn.png';
import { useState } from 'react';
import Main from './Main';

const Index = () => {
  // const { branchName, custType, regionName } = useSelector(
  //   (store: any) => store.home,
  // );
  const mRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [currPageNum, setCurrPageNum] = useState<number>(0);

  const onValuesChange = (changeValues: any) => {
    dispatch({
      type: 'home/update',
      payload: changeValues,
    });
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <BannerCondition onValuesChange={onValuesChange} />
        {currPageNum === 1 && (
          <img
            className="prev-btn"
            src={prev_btn}
            alt=""
            onClick={() => {
              mRef?.current?.prev();
            }}
          />
        )}

        <Carousel
          dots={false}
          ref={mRef}
          afterChange={(value) => {
            setCurrPageNum(value);
          }}
        >
          <Main />

          <Result />
        </Carousel>
        {currPageNum === 0 && (
          <img
            className="next-btn"
            src={next_btn}
            alt=""
            onClick={() => {
              mRef?.current?.next();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
