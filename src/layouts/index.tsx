import { FrownOutlined, SyncOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import HeaderBase from './Header';
import './index.less';
import { getLocalStorageTheme } from '@/utils/theme';

export type Props = {
  /**
   * 头部
   */
  Header?: React.ReactNode;
  children?: React.ReactNode;
  /**
   * 自定义侧边栏点击，有一些，要打开新页面的，可以自己写
   */
  onSiderClick?: (path: string) => void;
  /**
   * react 自带 的跳转；不能用umi的跳转会无效
   */
  history?: any;
  className?: string;
  showHeaderLogo?: boolean;
  /** 是否只展示内容 */
  onlyContent?: boolean;
};

const PpssContext = React.createContext<PpssContextType>({
  echarts: {
    theme: 'light',
  },
});
const BaseLayout = (props: Props) => {
  const { className, onlyContent = false } = props;

  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const dispatch = useDispatch();

  const [theme, ppssContext] = useMemo(
    () => {
      const newTheme: ThemeType = getLocalStorageTheme();

      const newContext = {
        echarts: {
          theme: newTheme,
          preset: {
            backgroundColor: 'transparent',
          },
        },
      };
      return [newTheme, newContext];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeChangeTag],
  );

  const {
    Header = (
      <HeaderBase
        onThemeChange={() => {
          dispatch({
            type: 'common/changeTheme',
          });
        }}
        theme={theme}
        {...props}
      />
    ),
  } = props;

  // const { pathname } = useLocation();
  // const { routes } = initialState;

  // if (process.env.NODE_ENV !== 'development') {
  //   if (!routes || !routes?.[`${pathname}`]) {
  //     return <Redirect to="/Exception/404" />;
  //   }
  //   if (!access || !access?.[`${pathname}`]) {
  //     return <Redirect to="/Exception/403" />;
  //   }
  // }
  if (onlyContent) {
    return (
      <ConfigProvider space={{ size: 'middle' }} locale={zhCN}>
        <PpssContext.Provider value={ppssContext}>
          <Layout
            className={`BaseLayout  ${className ?? ''}`}
            style={{ height: '100vh', overflowY: 'hidden' }}
          >
            {props.children}
          </Layout>
        </PpssContext.Provider>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider
      space={{ size: 'middle' }}
      locale={zhCN}
      autoInsertSpaceInButton={false}
    >
      <PpssContext.Provider value={ppssContext}>
        <Layout
          className={`BaseLayout  ${className ?? ''}`}
          style={{ height: '100vh', overflowY: 'hidden' }}
        >
          {Header}
          <div style={{ overflowY: 'auto', height: '100%' }}>
            {props.children}
          </div>
        </Layout>
      </PpssContext.Provider>
    </ConfigProvider>
  );
};

export default BaseLayout;
