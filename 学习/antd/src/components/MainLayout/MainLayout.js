import React from 'react';
import styles from './MainLayout.css';
import Header from './Header';

function MainLayout({ ...args }) {
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          {args.children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
