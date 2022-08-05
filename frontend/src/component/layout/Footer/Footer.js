import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";


const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Tải App FashionShop</h4>
                <p>Tải App trên điện thoại android và IOS.</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>FASHION SHOPS.</h1>
                <p>Chất lượng cao là ưu tiên hàng đầu của chúng tôi.</p>

                <p>Bản quyền 2022 &copy; Shop thời trang.</p>
            </div>

            <div className="rightFooter">
                <h4>Kết nối với chúng tôi.</h4>
                <a href="http://instagram.com">Instagram</a>
                <a href="http://youtube.com">Youtube</a>
                <a href="http://facebook.com">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;
