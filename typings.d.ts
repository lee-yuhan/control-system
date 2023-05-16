/**
 * 一些需要 import/export 的全局类型，不能写在这个文件，应该写在 src/types.ts
 */
declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'react-resizable';
declare module 'dragm';
declare module 'react-copy-to-clipboard';
declare module 'xlsx';
declare module 'chroma-js';
declare module '*.json' {
  const value: any;
  export default value;
}
declare const PROJECT_KEY: string;

/** 深 Partial */
declare type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};

interface Window {
  less: {
    modifyVars: (e: any) => void;
  };
  reloadAuthorized: () => void;
  _hmt: {
    push: (...params: any[]) => void;
  };
  baseHost: string;
  disabledEncrypt: boolean;
}

declare const API_PREFIX: string;
declare const SYSTEM_NAME: string;
declare const ROUTES: any[];
declare const SKIN: ThemeType[];

type AjaxRes<T = any> = {
  retCode: string;
  retMsg: string;
  data: T;
};

interface OptionObject {
  label: string;
  value: string;
  disabled?: boolean;
  children?: OptionObject[];
}

type OptionList = OptionObject[];

// 辅助决策系统主题样式
type ThemeType = 'light' | 'dark';

declare module 'file-saver';
declare module 'xlsx-style-correct';
interface PpssContextType {
  /**
   * 项目唯一标识
   */
  PROJECT_KEY?: string;
  /**
   * 项目初始化数据
   */
  initialData?: Record<string, any>;
  echarts: {
    /**
     * echarts 全局配置，会在 useEchartsOption 中合并
     */
    preset?: Omit<any, 'series'>;
    /**
     * 主题色
     */
    theme: ThemeType;
  };
}

declare module 'react-cookies';

type IPermissionList = {
  code: string;
  title: string;
  type: 'MENU' | 'BUTTON';
}[];
