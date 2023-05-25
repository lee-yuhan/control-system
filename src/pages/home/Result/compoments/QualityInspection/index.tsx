// 质检
import { Echarts5 } from '@/compoments/Echarts5';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import CardCondition from '../CardCondition';
import { addClickEvent, themeEhcartColor } from '@/utils/ehcart';
import { baseConfig, satisfactionNameMap } from '../../config';
import { getLocalStorageTheme } from '@/utils/theme';
import { map, merge, random } from 'lodash';
import { useRequest, useSelector } from 'umi';
import lineIcon2 from '../../../../../assets/icon_line2.png';
import lineIcon5 from '../../../../../assets/icon_line5.png';
import lineIcon1 from '../../../../../assets/icon_line1.png';
import legendIcon10 from '../../../../../assets/icon_legend10.png';
import legendIcon3 from '../../../../../assets/icon_legend3.png';
import * as echarts from 'echarts';
import { Button, Form, message, Space, Upload } from 'antd';
import moment from 'moment';
import { useEchartMouseAid } from '../../hook';
import LabelsView from '@/compoments/LabelsView';
import { obj2FormData } from '@/utils/tool';
import { getQualityInspectionData, uploadFile } from '../../service';
import ModalDetail from './ModalDetail';
import ExportDetail from './ExportDetail';

export const timeOptions = [
  {
    id: '1',
    name: '周维度',
  },
  {
    id: '2',
    name: '月维度',
  },
];

const Index = () => {
  const [tabValue, setTabValue] = useState<string>('10');
  const [latitude, setLatitude] = useState<string[]>([timeOptions?.[0].id]);
  const { branchName, regionName } = useSelector((store: any) => store.home);

  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);

  const mRef = useRef<any>(null);
  const dRef = useRef<any>(null);
  const eRef = useRef<any>(null);

  const { data, run, loading, refresh } = useRequest(getQualityInspectionData, {
    manual: true,
  });

  const option = useMemo(() => {
    return merge({}, baseConfig, {
      legend: {
        textStyle: {
          color: themeEhcartColor[theme]['--text-color2'],
        },
        data: [
          {
            name: '虚假工单数',
            icon: `image://${legendIcon3}`,
          },
          // {
          //   name: '环比',
          //   icon: `image://${legendIcon10}`,
          // },
        ],
      },
      xAxis: {
        data: map(data, 'latitude'),
      },
      series: [
        {
          name: '虚假工单数',
          type: 'line',
          data: map(data, 'value'),
          symbol: `image://${lineIcon2}`,
          symbolSize: 8,
          smooth: true,
          lineStyle: {
            color: themeEhcartColor[theme]['--danger-color'],
            width: 3,
          },
          label: {
            show: true,
            position: 'top',
            color: themeEhcartColor[theme]['--danger-color'],
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}`;
            },
          },
        },
        // {
        //   name: '环比',
        //   type: 'line',
        //   smooth: true,
        //   data: Array(7)
        //     .fill('')
        //     .map((_) => {
        //       return { value: random(0, 100) };
        //     }),
        //   symbol: `image://${lineIcon5}`,
        //   symbolSize: 8,
        //   lineStyle: {
        //     width: 0,
        //   },
        //   areaStyle: {
        //     opacity: 1,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: themeEhcartColor[theme]['--area-primary-color-start'],
        //       },
        //       {
        //         offset: 1,
        //         color: themeEhcartColor[theme]['--area-primary-color-end'],
        //       },
        //     ]),
        //   },
        //   label: {
        //     show: true,
        //     position: 'top',
        //     color: themeEhcartColor[theme]['--primary-color'],
        //     valueAnimation: true,
        //     // formatter: (p: { value: number }) => {
        //     //   return `${p.value ?? ''}`;
        //     // },
        //   },
        // },
      ],
    });
  }, [theme, tabValue, data]);

  // useEchartMouseAid(mRef, option, lineIcon5, lineIcon1);

  // 上传接口
  const { run: uploadFileRun, loading: uploadFileLoading } = useRequest(
    uploadFile,
    {
      manual: true,
      onSuccess: (res) => {
        message.success('导入成功');
        refresh();
      },
    },
  );

  useEffect(() => {
    if (!regionName || !latitude?.length) return;
    run({
      branchName,
      regionName,
      latitude: latitude?.toString(),
    });
  }, [regionName, latitude]);

  // 上传
  const upLoadFileprops = {
    accept: '.xls,.xlsx',
    showUploadList: false,
    beforeUpload: (file: File) => {
      const formData = obj2FormData({
        file,
      });

      uploadFileRun(formData);
      return false;
    },
  };

  const handleClick = useCallback(
    (xIndex: number) => {
      dRef?.current?.showModal(data?.[xIndex]?.date, latitude);
    },
    [dRef, data, latitude],
  );

  useEffect(() => {
    const inst = mRef.current;

    addClickEvent(inst, handleClick);
  }, [handleClick]);

  return (
    <CardWrapper
      extra={
        <Space size={4}>
          <Upload {...upLoadFileprops}>
            <Button loading={uploadFileLoading} className="export-btn">
              导入
            </Button>
          </Upload>
          <Button
            className="export-btn"
            onClick={() => {
              eRef?.current?.showModal();
            }}
          >
            查询
          </Button>
        </Space>
      }
      header={
        <Tab
          value={tabValue}
          onChange={setTabValue}
          options={[
            {
              id: '10',
              name: '工单真实性',
            },
            // {
            //   id: 'aa1',
            //   name: '质检规范性',
            // },
          ]}
        />
      }
    >
      <Form
        initialValues={{
          latitude: timeOptions?.[0].id,
        }}
      >
        <Form.Item style={{ marginRight: 0 }} name="latitude">
          <LabelsView
            value={latitude}
            single
            dataSource={timeOptions}
            onChange={setLatitude as any}
          />
        </Form.Item>
      </Form>
      <Echarts5 loading={loading} ref={mRef} option={option} />

      <ModalDetail mRef={dRef} />
      <ExportDetail mRef={eRef} onDel={refresh} />
    </CardWrapper>
  );
};

export default Index;
