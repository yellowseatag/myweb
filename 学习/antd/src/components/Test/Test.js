import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import TestModal from './TestModal';
import { routerRedux } from 'dva/router';
import styles from './Test.css';

function Test ({dispatch,list: dataSource,total,page}){
  function createHandler(values) {
    dispatch({
      type: 'test/create',
      payload: values,
    });
  }
  function editHandler(values,id){
    dispatch({
      type:'test/edit',
      payload:{
        values,
        'id':id,
      }
    });
  }
  function deleteHandler(id){
    dispatch({
      type:'test/remove',
      payload:id,
    });
  }
  function pageChangeHandler(page){
    dispatch(routerRedux.push({
      pathname: '/test',
      query: { page },
    }));
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text,record)=>(
        <span className={styles.operation}>
          <TestModal record={record} onOk={editHandler.bind(null,record.id)} >
            <a>修改</a>
          </TestModal>
          <Popconfirm title='确认删除？' onConfirm={deleteHandler.bind(null,record.id)} >
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return(
    <div className={styles.normal}>
      <div className={styles.create}>
      <TestModal record={{}} onOk={createHandler} >
        <Button type="primary">新建</Button>
      </TestModal>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          pageSize={5}
          current={page}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

const mapStateToProps=(state)=> {
  const { list,total,page} = state.test;
  return {
    list,
    total,
    page,
  };
}
export default connect(mapStateToProps)(Test);
