import { useMount } from 'ahooks';
import { compact } from 'lodash';
import moment, { Moment } from 'moment';
import { useMemo } from 'react';
import { limitDate } from '../config';
import { getWeekDate, getWeekNum, numText } from './config';

export const useDateAid = () => {
  const rageTimesDate = (
    date: [Moment, Moment],
    type: 'years' | 'months',
  ): string[] => {
    if (!date || date.length !== 2) {
      return [];
    }
    const format = type === 'months' ? 'YYYY-MM' : 'YYYY';

    const startTime = date[0];
    const endTime = date[1];
    const listLength = moment(endTime)?.diff(moment(startTime), type) + 1 || 0;
    if (listLength < 0) {
      return [];
    }
    return Array(listLength)
      .fill('')
      .reduce((total, p, index) => {
        const day = moment(startTime).add(index, type).format(format);
        return [...total, day];
      }, []);
  };

  const yearOption = useMemo(() => {
    const a = limitDate.clone().diff(moment('2023-01-01'), 'years');

    const b = rageTimesDate(
      [
        moment('2023-01-01').clone(),
        moment('2023-01-01').clone().add(a, 'years'),
      ],
      'years',
    );
    return b?.map((val) => ({
      value: val,
      label: `${val}年`,
    }));
  }, []);

  const monthOptions = yearOption?.map((item, index) => ({
    ...item,
    children: compact(
      Array(12)
        .fill(null)
        .map((m, i) => {
          // 表示今年
          if (yearOption?.length - 1 === index) {
            const month = limitDate.month();
            if (i > month) {
              return null;
            }
          }
          return {
            value: `${item.value}-${i + 1}`,
            label: `${i + 1}月`,
          };
        }),
    ),
  }));

  const weekOptions = monthOptions?.map((item) => ({
    ...item,
    children: item.children?.map((a) => {
      const weekNums = getWeekNum(moment(a.value));
      return {
        ...a,
        children: weekNums?.map((w, wi) => ({
          value: w,
          label: `第${numText[wi]}周`,
        })),
      };
    }),
  }));

  return {
    yearOption,
    monthOptions,
    weekOptions,
  };
};
