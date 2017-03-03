import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import Test from "./routes/Test.js";
import Biaodan from "./routes/Biaodan.js";
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/test" component={Test} />
      <Route path="/biaodan" component={Biaodan} />
    </Router>
  );
}

export default RouterConfig;
