import { Layout, Row, Col } from 'antd';
import './index.less';
import moment from 'moment';
import { useState } from 'react';
import { useInterval } from 'ahooks';

type Props = {
  theme: ThemeType;
  onThemeChange: () => void;
  history?: any;
};
export default ({ theme, onThemeChange }: Props) => {
  const [date, setDate] = useState(moment());

  useInterval(() => {
    setDate(moment());
  }, 1000);

  return (
    <div className="new-layout-header">
      <Row>
        <Col span={10}>
          <div className="header-left">
            <span
              style={{
                fontSize: 18,
                color: '#92B0BF',
                marginRight: 10,
              }}
            >
              {moment(date).format('YYYY.MM.DD')}
            </span>
            <span
              style={{
                fontSize: 20,
              }}
            >
              {moment(date).format('HH:mm:')}
            </span>

            <span
              style={{
                fontSize: 20,
                color: '#EF4864',
              }}
            >
              {moment(date).format('ss')}
            </span>
          </div>
        </Col>
        <Col span={4}></Col>

        <Col span={10}>
          <div className="header-right">
            {/* <span
                            style={{
                                fontSize: 20,
                            }}
                        >
                            13°
                        </span>
                        <span style={{ color: "#92B0BF", fontSize: 16 }}>
                            晴转多云
                        </span> */}
          </div>
        </Col>
      </Row>
      <div
        className="header-title"
        onClick={() => {
          window.open(`${window.location.origin}/score`);
        }}
      >
        {SYSTEM_NAME}
      </div>
    </div>
  );
};
