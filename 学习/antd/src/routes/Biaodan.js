import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './Biaodan.css';

class Biaodan extends Component {
  state={
    loading:false,
    iconLoading:false,
    delayLoading:false,
  }
  enterLoading=()=>{
    this.setState({loading:true});
  }

  enterIconLoading=()=>{
    this.setState({iconLoading:true});
  }
  delayLoading=()=>{
    this.setState({delayLoading:true});
    setTimeout(()=>this.setState({
      delayLoading:false,
    }),150);
  }
  render() {
    return (
      <div>

          <Button type="primary" loading={this.state.loading} onClick={this.enterLoading.bind(this)}>
            Click me!
          </Button>
          <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading.bind(this)}>
            Click me!
          </Button>
          <Button type="primary" loading={this.state.delayLoading} onClick={this.delayLoading}>
            Won&apos;t show loading
          </Button>
        </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(Biaodan);
