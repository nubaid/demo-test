import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import CustomerContainer from "./containers/CustomerContainer";
import HomeContainer from "./containers/HomeContainer";
import Layout from "./components/customers/Layout";

const DecoratedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <Layout location={props.location} history={props.history}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

const App = props => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <DecoratedRoute exact path="/" component={CustomerContainer} />
          <DecoratedRoute component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
