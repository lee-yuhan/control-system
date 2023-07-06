import { FC, useEffect, useState } from 'react';
import './index.less';
import classNames from 'classnames';
const Index: FC<{
  dataSource: {
    id: string;
    name: string;
  }[];
  onChange?: (id: string) => void;
}> = ({ dataSource, onChange }) => {
  const [activeKey, setActiveKey] = useState<string>(dataSource?.[0]?.id);

  useEffect(() => {
    onChange?.(activeKey);
  }, [activeKey]);

  return (
    <div className="menu-btn">
      {dataSource?.map((item) => (
        <div
          className={classNames('btn', {
            active: item.id === activeKey,
          })}
          key={item.id}
          onClick={() => {
            setActiveKey(item.id);
          }}
        >
          <div className="btn-content">{item.name}</div>
        </div>
      ))}
      {/* <div className="btn active">
        <div className="btn-content">1</div>
      </div>
     
      <div className="btn">
        <div className="btn-content">1</div>
      </div> */}
    </div>
  );
};

export default Index;
