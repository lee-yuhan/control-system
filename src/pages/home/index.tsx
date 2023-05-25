import BannerCondition from '@/compoments/BannerCondition';
import Result from './Result';
import './index.less';
import { useMemo } from 'react';
import { useDispatch } from 'umi';
import { Carousel } from 'antd';
import { useRef } from 'react';
import { useAccess } from 'umi';

import prev_btn from '@/assets/prev_btn.png';
import next_btn from '@/assets/next_btn.png';
import { useState } from 'react';
import Main from './Main';

const Index = () => {
  const mRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [currPageNum, setCurrPageNum] = useState<number>(0);
  const access = useAccess();

  const menuPermission = useMemo(() => {
    // 目前只展示第二屏
    return ['second-screen'];
    // const result = permissionList?.filter((item) => item.type === 'MENU');
    // return map(result, 'code');
  }, [access]);

  const onValuesChange = (changeValues: any) => {
    dispatch({
      type: 'home/update',
      payload: changeValues,
    });
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* <div className='home-bg'></div> */}
        <BannerCondition onValuesChange={onValuesChange} />

        {menuPermission?.length > 1 && currPageNum === 1 && (
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
          {menuPermission.includes('first-screen') && <Main />}
          {menuPermission.includes('second-screen') && <Result />}
        </Carousel>
        {menuPermission?.length > 1 && currPageNum === 0 && (
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
