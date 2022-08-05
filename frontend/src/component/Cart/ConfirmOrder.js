import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.10;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        history.push("/process/payment");
    };

    return (
        <Fragment>
            <MetaData title="Xác nhận đơn hàng" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Thông tin vận chuyển</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Họ và tên:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Số điện thoại:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Địa chỉ nhà:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Các mặt hàng trong giỏ hàng của bạn:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
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
                <div>
                    <div className="orderSummary">
                        <Typography>Thông tin hóa đơn</Typography>
                        <div>
                            <div>
                                <p>Tổng phụ:</p>
                                <span>{subtotal}vnd</span>
                            </div>
                            <div>
                                <p>Chi phí vận chuyển:</p>
                                <span>{shippingCharges}vnd</span>
                            </div>
                            <div>
                                <p>Thuế:</p>
                                <span>{tax}vnd</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Tổng cộng:</b>
                            </p>
                            <span>{totalPrice}vnd</span>
                        </div>

                        <button onClick={proceedToPayment}>Tiến hành thanh toán</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;
