import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
    getOrderDetails,
    clearErrors,
    updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = ({ history, match }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(match.params.id, myForm));
    };

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Đã cập nhật đơn hàng thành công");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

    return (
        <Fragment>
            <MetaData title="Xử lý đơn hàng" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="confirmOrderPage"
                            style={{ display: order.orderStatus === "Đã giao hàng" ? "block" : "grid", }}>
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Thông tin vận chuyển</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Họ và tên:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Số điện thoại:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Địa chỉ nhà:</p>
                                            <span>
                                                {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Chi trả</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                                                {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "Đã trả tiển" : "Chưa trả tiền"}
                                            </p>
                                        </div>
                                        <div>
                                            <p>Tổng tiền:</p>
                                            <span>{order.totalPrice && order.totalPrice}vnd</span>
                                        </div>
                                    </div>

                                    <Typography>Tình trạng đặt hàng</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.orderStatus && order.orderStatus === "Đã giao hàng" ? "greenColor" : "redColor"}>
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Các mặt hàng đẵ đặt:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems && order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Sản phẩm" />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>{" "}
                                                <span>
                                                    {item.quantity} X {item.price}vnd ={" "}
                                                    <b>{item.price * item.quantity}vnd</b>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div style={{ display: order.orderStatus === "Đã giao hàng" ? "none" : "block" }}>
                                <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                                    <h1>Xử lý đơn hàng</h1>
                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Chọn danh mục</option>
                                            {order.orderStatus === "Đang chờ xử lý" && (
                                                <option value="Đã vận chuyển">Đã vận chuyển</option>
                                            )}
                                            {order.orderStatus === "Đã vận chuyển" && (
                                                <option value="Đã giao hàng">Đã giao hàng</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button id="createProductBtn" type="submit" disabled={loading ? true : false || status === "" ? true : false}>Tiến hành</Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
