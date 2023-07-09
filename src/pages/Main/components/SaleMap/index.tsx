import mapImg from '@/newAssets/map.png';
import classNames from 'classnames';
import './index.less';

const Index = () => {
  return (
    <div
      className="sale-map-box"
      style={{ height: 500, padding: 20, textAlign: 'center' }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <div className={classNames('btn active')}>售前</div>
        <div className={classNames('btn')}>售后</div>
      </div>
      <img src={mapImg} style={{ width: '100%', margin: 'auto' }} />
    </div>
  );
};

export default Index;
