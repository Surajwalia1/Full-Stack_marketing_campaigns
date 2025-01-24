import React from 'react';

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My Project</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2025 My Project</p>
      </footer>
    </div>
  );
};

export default BasicLayout;
