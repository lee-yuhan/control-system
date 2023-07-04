import { CaretDownOutlined } from '@ant-design/icons';
import { Cascader, CascaderProps, Select, SelectProps } from 'antd';
import React, { FC } from 'react';
import './index.less';
import classNames from 'classnames';

type IProps = {
  skewDeg?: string;
  position?: string;
  beforeBorder?: boolean;
  afterBorder?: boolean;
  children?: React.ReactElement;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const Index: FC<IProps> = (props: IProps) => {
  const {
    // skewDeg = "-45deg",
    children,
    position = 'left',
    beforeBorder,
    afterBorder,
    style,
    innerStyle,
  } = props;
  return (
    <div
      className={classNames(
        'select-wrapper',
        position === 'left' ? 'select-wrapper-left' : 'select-wrapper-right',
      )}
      style={style}
    >
      <div
        className={classNames('select-box', {
          'select-border-before': beforeBorder,
          'select-border-after': afterBorder,
        })}
        style={innerStyle}
      >
        {children}
      </div>
    </div>
  );
};
export default Index;
