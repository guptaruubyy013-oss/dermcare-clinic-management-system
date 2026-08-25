import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container text-center py-5">
    <h1 className="display-3 fw-bold text-danger">404</h1>
    <p className="lead">Page Not Found</p>
    <Link to="/" className="btn btn-primary">Back to Home</Link>
  </div>
);

export default NotFound;