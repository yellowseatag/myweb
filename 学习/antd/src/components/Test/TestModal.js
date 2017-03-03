import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
class TestModal  extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModelHandler=()=>{
    this.setState({
      visible: true,
    });
  }
  hideModelHandler=()=>{
    this.setState({
      visible: false,
    });
  }
  handleOk=()=>{
    const {onOk}=this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  }
  render(){
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { title } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return(
      <div>
        <span onClick={this.showModelHandler.bind(this)} >
          {children }
        </span>
         <Modal
          title="新建项目"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.hideModelHandler.bind(this)}
         >
           <Form
            horizontal
           >
            <FormItem
              {...formItemLayout}
              label="title"
            >
            {
              getFieldDecorator('title', {
                initialValue: title,
              })(<Input />)
            }
            </FormItem>
           </Form>
         </Modal>
       </div>
    );
  }
}

export default Form.create()(TestModal);
//export default (TestModal);
