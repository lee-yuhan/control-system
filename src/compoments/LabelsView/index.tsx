/**
 * 带样式的标签页
 * 支持单选多选
 */

import { Tag } from 'antd';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { memo, useCallback } from 'react';
import './index.less';

interface optionObject {
  id: string | number;
  name: string;
  disabled?: boolean;
  children?: optionObject[];
}
interface Props<T> {
  style?: React.CSSProperties;
  defaultValue?: string[];
  single?: boolean; // 是否单选
  value?: T[];
  onChange?: (value: T[]) => void;
  dataSource: optionObject[];
  className?: string;
  noLeftRadius?: boolean;
  noRightRadius?: boolean;
  disabled?: boolean;
}

const Index: React.FC<Props<string | number>> = (props) => {
  const {
    style,
    single = false,
    dataSource = [],
    defaultValue = single
      ? [dataSource?.[0]?.id]
      : dataSource?.map((p) => p.id), // 默认数值，有单选和多选分别
    value,
    onChange,
    className,
    noLeftRadius,
    noRightRadius,
    disabled = false,
  } = props;

  const [mergedValue, setInnerValue] = useMergedState(null, {
    value: value ?? [],
    defaultValue,
  });

  const toggleInner = useCallback(
    (item: any) => () => {
      if (item.disabled) {
        return;
      }
      const copy = mergedValue ? [...mergedValue] : [];
      if (single) {
        // 单选，比较简单
        setInnerValue([item.id]);
        onChange?.([item.id]);
        return;
      }
      const newValue =
        !!mergedValue && mergedValue.indexOf(item.id) >= 0
          ? copy.filter((p) => p !== item.id)
          : [...copy, item.id];
      setInnerValue(newValue);
      onChange?.(newValue);
    },
    [mergedValue, single, setInnerValue, onChange],
  );

  return (
    <div
      className={classNames(
        'tsie-labels-view',
        {
          'tsie-labels-view-noLeftRadius': noLeftRadius,
          'tsie-labels-view-noRightRadius': noRightRadius,
        },
        className,
      )}
      style={style}
    >
      {dataSource?.map((item) => (
        <Tag
          style={{
            maxWidth: `calc(100% / ${dataSource?.length}`,
          }}
          className={`tags-item ${
            mergedValue?.length && mergedValue?.indexOf(item.id) >= 0
              ? 'tag-selected'
              : 'tag-default'
          } ${item?.disabled || disabled ? 'tags-item--disabled' : ''}`}
          key={item.id}
          onClick={toggleInner(item)}
        >
          <div className="tag-item-content">{item.name}</div>
        </Tag>
      )) || []}
    </div>
  );
};

export default memo(Index);
