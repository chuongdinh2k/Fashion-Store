import React, { useState, Fragment } from "react";
import "./Search.css";
import MetaData from "../layout/MetaData";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products");
        }
    };

    return (
        <Fragment>
            <MetaData title="Tìm sản phẩm -- cửa hàng thời trang" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="TÌM KIẾM" />
            </form>
        </Fragment>
    );
};

export default Search;
