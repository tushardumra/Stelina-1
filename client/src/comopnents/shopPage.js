import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./context";

export const ShopPage = () => {
  const [allProducts, setallProducts] = useState([]);

  // const {usertype} = useContext(Context);
  // const navigate = useNavigate();

  useEffect(() => {
    // if(usertype=="user") {
    //   showAllProducts();
    // } else {
    //   navigate('/login')
    // }
    showAllProducts();
  }, []);

  const showAllProducts = async () => {
    try {
      const useApi = await fetch("https://stelina-1-backend.onrender.com/api/allShopProducts", {
        method: "Get",
      });

      const resp = await useApi.json();

      if (resp.statuscode === 1) {
        setallProducts(resp.data);
      } else {
        alert("error in showing all products");
      }
    } catch (error) {
      console.log(
        error,
        "in fetching all products data from add Product Section",
      );
    }
  };
  return (
    <>
      <div className="stelina-product produc-featured rows-space-40">
        <div className="container shop-page-top" style={{ marginTop: "100px" }}>
          <h3 className="custommenu-title-blog">All Products</h3>
          <ul className="row list-products auto-clear equal-container product-grid">
            {allProducts.map((product, index) => (
              <li
                key={index}
                className="product-item  col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1"
              >
                <div className="product-inner equal-element">
                  <div className="product-top">
                    {/* <div className="flash">
                      <span className="onnew">
                        <span className="text">new</span>
                      </span>
                    </div> */}
                  </div>
                  <div className="product-thumb">
                    <div className="thumb-inner">
                      <Link to={`/productDetailedView?id=${product._id}&cid=${product.ProductCategory}`}>
                        <img
                          // src={`/assets/uploadProducts/${product.ProductName}`}
                          src={product.ImgPath.substring(16)}
                          alt="img"
                        />
                      </Link>
                      {/* <div className="thumb-group">
                        <div className="yith-wcwl-add-to-wishlist">
                          <div className="yith-wcwl-add-button">
                            <a href="#">Add to Wishlist</a>
                          </div>
                        </div>
                        <a href="#" className="button quick-wiew-button">
                          Quick View
                        </a>
                        <div className="loop-form-add-to-cart">
                          <button className="single_add_to_cart_button button">
                            Add to cart
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="product-info">
                    <h5 className="product-name product_title">
                      <a href="#">{product.ProductName}</a>
                    </h5>
                    <div className="group-info">
                      <div className="stars-rating">
                        <div className="star-rating">
                          <span className="star-3"></span>
                        </div>
                        <div className="count-star">(3)</div>
                      </div>
                      <div className="price">
                        {/* <del>${product.ProductPrice}</del> */}
                        <ins>${product.ProductPrice}</ins>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
