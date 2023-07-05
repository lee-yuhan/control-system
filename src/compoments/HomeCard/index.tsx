import React, { FC } from 'react';
import './index.less';

const Index: FC<{
  title: string;
  children: React.ReactElement;
}> = ({ title, children }) => {
  return (
    <div className="home-card-box">
      <div className="title">{title}</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Index;
