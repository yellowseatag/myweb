import React from 'react';
import { connect } from 'dva';
import styles from './Test.css';
import {Form } from 'antd';
import TestComponent from '../components/Test/Test';
import MainLayout from '../components/MainLayout/MainLayout';


function Test() {
  return (
    <MainLayout location={location} >
    <div className={styles.normal}>
      <TestComponent  />
    </div>
    </MainLayout>
  );
}
export default connect()(Test);
