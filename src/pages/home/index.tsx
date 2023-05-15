import BannerCondition from '@/compoments/BannerCondition';
import Result from './Result';
import './index.less';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Button, Carousel } from 'antd';
import { useRef } from 'react';

import prev_btn from '@/assets/prev_btn.png';
import next_btn from '@/assets/next_btn.png';
import { useState } from 'react';
import Main from './Main';
import useInitialState from '@/hooks/useInitialState';
import { map } from 'lodash';

const Index = () => {
  // const { branchName, custType, regionName } = useSelector(
  //   (store: any) => store.home,
  // );
  const mRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [currPageNum, setCurrPageNum] = useState<number>(0);
  const { permissionList } = useInitialState();

  const onValuesChange = (changeValues: any) => {
    dispatch({
      type: 'home/update',
      payload: changeValues,
    });
  };

  const menuPermission = useMemo(() => {
    const result = permissionList?.filter((item) => item.type === 'MENU');
    return map(result, 'code');
  }, [permissionList]);

  console.log('menuPermission', menuPermission);

  return (
    <div className="home-container">
      <div className="home-content">
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
