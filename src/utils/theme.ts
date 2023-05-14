// antd主色
const primaryColor = {
  light: '#194BFC',
  dark: '#194BFC',
};

/**
 * 获取本地主题记录
 * 应用独立
 * @param defaultTheme
 * @returns
 */
export const getLocalStorageTheme = (
  defaultTheme: ThemeType = 'light',
): ThemeType => {
  try {
    const localTheme = localStorage.getItem(
      `${PROJECT_KEY}_theme`,
    ) as ThemeType | null;

    // 没有本地记录
    if (!localTheme) {
      return defaultTheme;
    }

    return localTheme;
  } catch (error) {
    return defaultTheme;
  }
};

/**
 * 设置默认主题，如果缓存有，就用缓存的主题
 * @param myTheme
 */
export const setTheme = async (myTheme?: ThemeType) => {
  const theme = getLocalStorageTheme(myTheme);
  await setPrimaryColor();
  changeTheme(theme);
};

export const changeTheme = (theme: ThemeType = 'light') => {
  if (!theme) {
    return;
  }
  let finalTheme = theme;

  setLocalStorageTheme(finalTheme);
  if (typeof window?.less?.modifyVars === 'function') {
    window?.less?.modifyVars({
      '@primary-color': primaryColor[finalTheme],
    });
  }
  let styleLink: any = document.getElementById('theme-style');
  const body = document.getElementsByTagName('body')[0];
  if (!styleLink) {
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    styleLink.href = `/theme/${finalTheme}.css`; // 切换 antd 组件主题
    body.className = `body-theme-${finalTheme}`; // 切换自定义组件的主题
    document.body.append(styleLink);
    return;
  }
  if (body.className === `body-theme-${finalTheme}`) {
    return;
  }
  styleLink.href = `/theme/${finalTheme}.css`;
  body.className = `body-theme-${finalTheme}`;
};

/**
 * 设置本地主题
 * 应用独立
 * @param theme
 */
export const setLocalStorageTheme = (theme: ThemeType) => {
  localStorage.setItem(`${PROJECT_KEY}_theme`, theme);
  // localStorage.setItem(`theme`, theme);
};

const setPrimaryColor = async () => {
  const publicPath = `${API_PREFIX}`; // 项目的publicPath，没有配置的可以置空
  const lessConfigNode = document.createElement('script');
  const lessScriptNode = document.createElement('script');
  const lessStyleNode = document.createElement('link');
  lessStyleNode.setAttribute('rel', 'stylesheet/less');
  lessStyleNode.setAttribute('href', `${publicPath}/color.less`);

  lessConfigNode.innerHTML = `
        less = {
          async: true,
          env: 'development',
        };
      `;
  lessScriptNode.src = `${publicPath}/less.min.js`;
  lessScriptNode.async = true;
  // 引入顺序不能改变
  await document.body.appendChild(lessStyleNode);
  await document.body.appendChild(lessConfigNode);
  await document.body.appendChild(lessScriptNode);
};
