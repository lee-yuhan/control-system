import { Button, Layout, Row, Space } from 'antd';
import './index.less';
import { changeTheme } from '@/utils/theme';
import headerLogo from '@/assets/logo.png';
import { logout } from '@/service/commonServices';
import { history } from 'umi';
import cookie from 'react-cookies';

const { Header } = Layout;

type Props = {
  theme: ThemeType;
  onThemeChange: () => void;
  history?: any;
};
export default ({ theme, onThemeChange }: Props) => {
  return (
    <Header className="layoutHeader">
      <Row justify="space-between">
        <div className="header-title">
          <img className="header-logo" src={headerLogo} alt="logo" />
        </div>
        <Space>
          <Button
            onClick={() => {
              changeTheme(theme === 'light' ? 'dark' : 'light');
              onThemeChange?.();
            }}
          >
            切换主题
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              logout();
              cookie.remove('AuthToken');
              history.replace('/Login');
            }}
          >
            退出账户
          </Button>
        </Space>
      </Row>
    </Header>
  );
};
