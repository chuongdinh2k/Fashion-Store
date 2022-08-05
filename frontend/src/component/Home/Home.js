import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";


// const product = {
//     name: "Blue Tshirt",
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     price: "$300",
//     _id: "thedung"
// }

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Cửa hàng thời trang" />

                    <div className="banner">
                        <p>Chào mừng bạn đến
                            cửa hàng thời trang</p>
                        <h1>TÌM HIỂU SẢN PHẨM TUYỆT VỜI DƯỚI ĐÂY</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Sản Phẩm Nổi Bật</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home