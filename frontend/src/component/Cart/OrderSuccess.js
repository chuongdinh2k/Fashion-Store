import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Đơn đặt hàng của bạn đã được đặt thành công </Typography>
      <Link to="/orders">Xem đơn đặt hàng</Link>
    </div>
  );
};

export default OrderSuccess;
