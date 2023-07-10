import mapImg from '@/newAssets/map.png';
import classNames from 'classnames';
import './index.less';
import { useState } from 'react';

const Index = () => {
  const [selectType, setSelectType] = useState('1');
  return (
    <div className="sale-map-box">
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          className={classNames('btn', {
            active: selectType === '1',
          })}
          onClick={() => {
            setSelectType('1');
          }}
        >
          售前
        </div>
        <div
          className={classNames('btn', {
            active: selectType === '2',
          })}
          onClick={() => {
            setSelectType('2');
          }}
        >
          售后
        </div>
      </div>
      <img
        src={mapImg}
        style={{ height: 440, objectFit: 'cover', margin: 'auto' }}
      />
    </div>
  );
};

export default Index;
