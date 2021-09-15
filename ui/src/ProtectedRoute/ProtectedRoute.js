import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const ProtectedRoute = (prop) => {
  const { component: Component, ...rest } = prop;
  return (
    <Route
      {...rest}
      render={(props) =>
        prop.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: props.location.pathname,
            }}
          />
        )
      }
    />
  );

};
const mapToStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

export default connect(mapToStateToProps)(ProtectedRoute);
