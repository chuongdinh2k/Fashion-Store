import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { loading, isAuthenticated, user,token } = useSelector((state) => state.user);
    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === false && !token) {
                            return <Redirect to="/login" />;
                        }

                        if (isAdmin === true && user.role !== "admin" && !token) {
                            return <Redirect to="/login" />;
                        }

                        return <Component {...props} />;
                    }}
                />
            )}
        </Fragment>
    );
};

export default ProtectedRoute;
