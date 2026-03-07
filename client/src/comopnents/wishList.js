import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Context } from "./context";

export const ProductsList = () => {
  const [prodList, setprodList] = useState([]);

  // const [prodName, setprodName] = useState("");
  // const [prodPrice, setprodPrice] = useState("");
  // const [prodImg, setprodImg] = useState("");
  // const [prodId, setprodId] = useState("");

  // const {userid} = useContext(Context);
  // alert(userid);

  useEffect(() => {
    showWishList();
  }, []);

  const [params] = useSearchParams();
  const uId = params.get("id");

  const showWishList = async () => {
    try {
      const useApi = await fetch(
        `https://stelina-backend.onrender.com/api/wishlistProducts/${uId}`,
        {
          method: "Get",
        },
      );
      // console.log("this is wishlist")

      const resp = await useApi.json();
      // console.log(resp.data)

      if (resp.statuscode === 1) {
        // alert("your wishlist");
        setprodList(resp.data);
        // setprodName(resp.data.wlProductName);
        // setprodPrice(resp.data.wlProductPrice);
        // setprodImg(resp.data.wlProductImage);
        // setprodId(resp.data.wlProductId);
      } else {
        alert("error in fetching products for wishlist");
      }
    } catch (error) {
      console.log(error, "here");
    }
  };

  const removeFromWishlist = async (id) => {
    console.log(id);
    try {
      const useApi = await fetch(
        `https://stelina-backend.onrender.com/api/removefromWishlist/${id}`,
        {
          method: "Delete",
        },
      );
      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          alert("remove from wishlist");
          showWishList();
        } else {
          alert("delete in wishlist is not working");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-content main-content-product no-sidebar">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-trail breadcrumbs">
                <ul className="trail-items breadcrumb">
                  <li className="trail-item trail-begin">
                    <Link to="/">Home</Link>
                    {/* <a href="index.html">Home</a> */}
                  </li>
                  <li className="trail-item trail-end active">
                    Wishlist
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="content-area  shop-grid-content full-width col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="site-main">
                {/* <div className="shop-top-control">
                  <form className="select-item select-form">
                    <span className="title">Sort</span>
                    <select
                      title="sort"
                      data-placeholder="12 Products/Page"
                      className="chosen-select"
                    >
                      <option value="1">12 Products/Page</option>
                      <option value="2">9 Products/Page</option>
                      <option value="3">10 Products/Page</option>
                      <option value="4">8 Products/Page</option>
                      <option value="5">6 Products/Page</option>
                    </select>
                  </form>
                  <form className="filter-choice select-form">
                    <span className="title">Sort by</span>
                    <select
                      title="by"
                      data-placeholder="Price: Low to High"
                      className="chosen-select"
                    >
                      <option value="1">Default sorting</option>
                      <option value="2">Sort by popularity</option>
                      <option value="3">Sort by average rating</option>
                      <option value="4">Sort by newness</option>
                      <option value="5">Sort by price: low to high</option>
                    </select>
                  </form>
                  
                </div> */}

                <h3 className="custom_blog_title">Product List</h3>

                <ul className="row list-products auto-clear equal-container product-list wl-mobile-view">
                  {prodList.map((product, index) => (
                    <li
                      key={index}
                      className="product-item style-list col-lg-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-ts-12"
                    >
                      <div
                        style={{ padding: "15px" }}
                        className="product-inner equal-element mv-product-inner "
                      >
                        {/* <div className="product-top">
                            <div className="flash">
                              <span className="onnew">
                                <span className="text">new</span>
                              </span>
                            </div>
                          </div> */}
                        <div className="products-bottom-content mv-product-content">
                          <div className="product-thumb">
                            <div className="thumb-inner">
                              <Link>
                                <img
                                  src={`/assets/uploadProducts/${product.wlProductName + ".jpg"}`}
                                  alt={product.wlProductName}
                                />
                              </Link>
                              <a href="#" className="button quick-wiew-button">
                                Quick View
                              </a>
                            </div>
                          </div>
                          <div className="product-info-left">
                            <div className="yith-wcwl-add-to-wishlist">
                              <div className="yith-wcwl-add-button">
                                <a href="#">Add to Wishlist</a>
                              </div>
                            </div>
                            <h5 className="product-name product_title">
                              <a href="#">{product.wlProductName}</a>
                            </h5>
                            <div className="stars-rating">
                              <div className="star-rating">
                                <span className="star-3"></span>
                              </div>
                              <div className="count-star">(3)</div>
                            </div>
                            <ul className="product-attributes">
                              <li>Category:</li>
                              <li>
                                <a href="#">Plastic</a>
                              </li>
                              <li>
                                <a href="#"> Woody</a>
                              </li>
                            </ul>
                            <ul className="attributes-display">
                              <li className="swatch-color">Description:</li>
                              <p
                                style={{ lineHeight: "1.4", fontSize: "14px" }}
                              >
                                {product.wlProductDesc}
                              </p>
                            </ul>

                            <ul className="attributes-display">
                              <li className="swatch-text-label">Bottle Size:</li>
                              <li className="swatch-text-label">
                                <a href="#">XS</a>
                              </li>
                              <li className="swatch-text-label">
                                <a href="#">S</a>
                              </li>
                              <li className="swatch-text-label">
                                <a href="#">M</a>
                              </li>
                              <li className="swatch-text-label">
                                <a href="#">L</a>
                              </li>
                              <li className="swatch-text-label">
                                <a href="#">XL</a>
                              </li>
                            </ul>
                          </div>
                          <div
                            style={{ padding: "60px" }}
                            className="product-info-right inWishlist"
                          >
                            {/* <span id="removeItem">X</span> */}
                            <button
                              id="removeItem"
                              onClick={() => {
                                removeFromWishlist(product.wlProductId);
                              }}
                            >
                              X
                            </button>
                            <div className="price">
                              Price: ${product.wlProductPrice}
                            </div>

                            <form className="cart">
                              <div className="single_variation_wrap">
                                {/* <div className="quantity">
                                  <div className="control">
                                    <a
                                      className="btn-number qtyminus quantity-minus"
                                      href="#"
                                    >
                                      -
                                    </a>
                                    <input
                                      type="text"
                                      data-step="1"
                                      data-min="0"
                                      value="1"
                                      title="Qty"
                                      className="input-qty qty"
                                      size="4"
                                    />
                                    <a
                                      href="#"
                                      className="btn-number qtyplus quantity-plus"
                                    >
                                      +
                                    </a>
                                  </div>
                                </div> */}
                                <Link
                                  to={`/productDetailedView?id=${product.wlProductId}`}
                                  className="single_add_to_cart_button button"
                                >
                                  Add to cart
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}

                  {/* {
                    prodList.map((product) => (
                      
                      <li className="product-item style-list col-lg-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-ts-12">
                        <div className="product-inner equal-element">
                          <div className="product-top">
                            <div className="flash">
                              <span className="onnew">
                                <span className="text">new</span>
                              </span>
                            </div>
                          </div>
                          <div className="products-bottom-content">
                            <div className="product-thumb">
                              <div className="thumb-inner">
                                <a href="#">
                                  <img
                                    src="assets/images/product-item-4.jpg"
                                    alt="img"
                                  />
                                </a>
                                <a href="#" className="button quick-wiew-button">
                                  Quick View
                                </a>
                              </div>
                            </div>
                            <div className="product-info-left">
                              <div className="yith-wcwl-add-to-wishlist">
                                <div className="yith-wcwl-add-button">
                                  <a href="#">Add to Wishlist</a>
                                </div>
                              </div>
                              <h5 className="product-name product_title">
                                <a href="#">Bibliotheque</a>
                              </h5>
                              <div className="stars-rating">
                                <div className="star-rating">
                                  <span className="star-3"></span>
                                </div>
                                <div className="count-star">(3)</div>
                              </div>
                              <ul className="product-attributes">
                                <li>Material:</li>
                                <li>
                                  <a href="#">Plastic</a>
                                </li>
                                <li>
                                  <a href="#"> Woody</a>
                                </li>
                              </ul>
                              <ul className="attributes-display">
                                <li className="swatch-color">Color:</li>
                                <li className="swatch-color">
                                  <a href="#">Black</a>
                                </li>
                                <li className="swatch-color">
                                  <a href="#">White</a>
                                </li>
                                <li className="swatch-color">
                                  <a href="#">Brown</a>
                                </li>
                              </ul>
                              <ul className="attributes-display">
                                <li className="swatch-text-label">Pots Size:</li>
                                <li className="swatch-text-label">
                                  <a href="#">XS</a>
                                </li>
                                <li className="swatch-text-label">
                                  <a href="#">S</a>
                                </li>
                                <li className="swatch-text-label">
                                  <a href="#">M</a>
                                </li>
                                <li className="swatch-text-label">
                                  <a href="#">L</a>
                                </li>
                                <li className="swatch-text-label">
                                  <a href="#">XL</a>
                                </li>
                              </ul>
                            </div>
                            <div className="product-info-right">
                              <div className="price">$45</div>
                              <div className="product-list-message">
                                <i className="icon fa fa-truck" aria-hidden="true"></i>
                                UK Free Delivery
                              </div>
                              <form className="cart">
                                <div className="single_variation_wrap">
                                  <div className="quantity">
                                    <div className="control">
                                      <a
                                        className="btn-number qtyminus quantity-minus"
                                        href="#"
                                      >
                                        -
                                      </a>
                                      <input
                                        type="text"
                                        data-step="1"
                                        data-min="0"
                                        value="1"
                                        title="Qty"
                                        className="input-qty qty"
                                        size="4"
                                      />
                                      <a
                                        href="#"
                                        className="btn-number qtyplus quantity-plus"
                                      >
                                        +
                                      </a>
                                    </div>
                                  </div>
                                  <button className="single_add_to_cart_button button">
                                    Add to cart
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  } */}
                </ul>
                <div className="pagination clearfix style2">
                  <div className="nav-link">
                    <a href="#" className="page-numbers">
                      <i className="icon fa fa-angle-left" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="page-numbers">
                      1
                    </a>
                    <a href="#" className="page-numbers">
                      2
                    </a>
                    <a href="#" className="page-numbers current">
                      3
                    </a>
                    <a href="#" className="page-numbers">
                      <i className="icon fa fa-angle-right" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="wrapper-sidebar shop-sidebar">
                <div className="widget woof_Widget">
                  <div className="widget widget-categories">
                    <h3 className="widgettitle">Categories</h3>
                    <ul className="list-categories">
                      <li>
                        <input type="checkbox" id="cb1" />
                        <label for="cb1" className="label-text">
                          New Arrivals
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="cb2" />
                        <label for="cb2" className="label-text">
                          Dining
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="cb3" />
                        <label for="cb3" className="label-text">
                          Desks
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="cb4" />
                        <label for="cb4" className="label-text">
                          Accents
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="cb5" />
                        <label for="cb5" className="label-text">
                          Accessories
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="cb6" />
                        <label for="cb6" className="label-text">
                          Tables
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="widget widget_filter_price">
                    <h4 className="widgettitle">Price</h4>
                    <div className="price-slider-wrapper">
                      <div
                        data-label-reasult="Range:"
                        data-min="0"
                        data-max="3000"
                        data-unit="$"
                        className="slider-range-price "
                        data-value-min="0"
                        data-value-max="1000"
                      ></div>
                      <div className="price-slider-amount">
                        <span className="from">$45</span>
                        <span className="to">$215</span>
                      </div>
                    </div>
                  </div>
                  <div className="widget widget-brand">
                    <h3 className="widgettitle">Brand</h3>
                    <ul className="list-brand">
                      <li>
                        <input id="cb7" type="checkbox" />
                        <label for="cb7" className="label-text">
                          New Arrivals
                        </label>
                      </li>
                      <li>
                        <input id="cb8" type="checkbox" />
                        <label for="cb8" className="label-text">
                          Dining
                        </label>
                      </li>
                      <li>
                        <input id="cb9" type="checkbox" />
                        <label for="cb9" className="label-text">
                          Desks
                        </label>
                      </li>
                      <li>
                        <input id="cb10" type="checkbox" />
                        <label for="cb10" className="label-text">
                          Accents
                        </label>
                      </li>
                      <li>
                        <input id="cb11" type="checkbox" />
                        <label for="cb11" className="label-text">
                          Accessories
                        </label>
                      </li>
                      <li>
                        <input id="cb12" type="checkbox" />
                        <label for="cb12" className="label-text">
                          Tables
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="widget widget_filter_size">
                    <h4 className="widgettitle">Size</h4>
                    <ul className="list-brand">
                      <li>
                        <input id="cb13" type="checkbox" />
                        <label for="cb13" className="label-text">
                          14.0 mm
                        </label>
                      </li>
                      <li>
                        <input id="cb14" type="checkbox" />
                        <label for="cb14" className="label-text">
                          14.4 mm
                        </label>
                      </li>
                      <li>
                        <input id="cb15" type="checkbox" />
                        <label for="cb15" className="label-text">
                          14.8 mm
                        </label>
                      </li>
                      <li>
                        <input id="cb16" type="checkbox" />
                        <label for="cb16" className="label-text">
                          15.2 mm
                        </label>
                      </li>
                      <li>
                        <input id="cb17" type="checkbox" />
                        <label for="cb17" className="label-text">
                          15.6 mm
                        </label>
                      </li>
                      <li>
                        <input id="cb18" type="checkbox" />
                        <label for="cb18" className="label-text">
                          16.0 mm
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="widget widget-color">
                    <h4 className="widgettitle">Color</h4>
                    <div className="list-color">
                      <a href="#" className="color1"></a>
                      <a href="#" className="color2 "></a>
                      <a href="#" className="color3 active"></a>
                      <a href="#" className="color4"></a>
                      <a href="#" className="color5"></a>
                      <a href="#" className="color6"></a>
                      <a href="#" className="color7"></a>
                    </div>
                  </div>
                  <div className="widget widget-tags">
                    <h3 className="widgettitle">Popular Tags</h3>
                    <ul className="tagcloud">
                      <li className="tag-cloud-link">
                        <a href="#">Office</a>
                      </li>
                      <li className="tag-cloud-link">
                        <a href="#">Accents</a>
                      </li>
                      <li className="tag-cloud-link">
                        <a href="#">Flowering</a>
                      </li>
                      <li className="tag-cloud-link active">
                        <a href="#">Accessories</a>
                      </li>
                      <li className="tag-cloud-link">
                        <a href="#">Hot</a>
                      </li>
                      <li className="tag-cloud-link">
                        <a href="#">Tables</a>
                      </li>
                      <li className="tag-cloud-link">
                        <a href="#">Dining</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="widget newsletter-widget">
                  <div className="newsletter-form-wrap ">
                    <h3 className="title">Subscribe to Our Newsletter</h3>
                    <div className="subtitle">
                      More special Deals, Events & Promotions
                    </div>
                    <input
                      type="email"
                      className="email"
                      placeholder="Your email letter"
                    />
                    <button type="submit" className="button submit-newsletter">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <ul className="row list-products auto-clear equal-container product-list">
                  <li className="product-item style-list col-lg-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-ts-12">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        <div className="flash">
                          <span className="onnew">
                            <span className="text">new</span>
                          </span>
                        </div>
                      </div>
                      <div className="products-bottom-content">
                        <div className="product-thumb">
                          <div className="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-4.jpg"
                                alt="img"
                              />
                            </a>
                            <a href="#" className="button quick-wiew-button">
                              Quick View
                            </a>
                          </div>
                        </div>
                        <div className="product-info-left">
                          <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                              <a href="#">Add to Wishlist</a>
                            </div>
                          </div>
                          <h5 className="product-name product_title">
                            <a href="#">Bibliotheque</a>
                          </h5>
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <ul className="product-attributes">
                            <li>Material:</li>
                            <li>
                              <a href="#">Plastic</a>
                            </li>
                            <li>
                              <a href="#"> Woody</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-color">Color:</li>
                            <li className="swatch-color">
                              <a href="#">Black</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">White</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">Brown</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-text-label">Pots Size:</li>
                            <li className="swatch-text-label">
                              <a href="#">XS</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">S</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">M</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">L</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">XL</a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-info-right">
                          <div className="price">$45</div>
                          <div className="product-list-message">
                            <i className="icon fa fa-truck" aria-hidden="true"></i>
                            UK Free Delivery
                          </div>
                          <form className="cart">
                            <div className="single_variation_wrap">
                              <div className="quantity">
                                <div className="control">
                                  <a
                                    className="btn-number qtyminus quantity-minus"
                                    href="#"
                                  >
                                    -
                                  </a>
                                  <input
                                    type="text"
                                    data-step="1"
                                    data-min="0"
                                    value="1"
                                    title="Qty"
                                    className="input-qty qty"
                                    size="4"
                                  />
                                  <a
                                    href="#"
                                    className="btn-number qtyplus quantity-plus"
                                  >
                                    +
                                  </a>
                                </div>
                              </div>
                              <button className="single_add_to_cart_button button">
                                Add to cart
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="product-item style-list col-lg-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-ts-12">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        <div className="flash">
                          <span className="onnew">
                            <span className="text">new</span>
                          </span>
                        </div>
                      </div>
                      <div className="products-bottom-content">
                        <div className="product-thumb">
                          <div className="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-1.jpg"
                                alt="img"
                              />
                            </a>
                            <a href="#" className="button quick-wiew-button">
                              Quick View
                            </a>
                          </div>
                        </div>
                        <div className="product-info-left">
                          <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                              <a href="#">Add to Wishlist</a>
                            </div>
                          </div>
                          <h5 className="product-name product_title">
                            <a href="#">Bibliotheque</a>
                          </h5>
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <ul className="product-attributes">
                            <li>Material:</li>
                            <li>
                              <a href="#">Plastic</a>
                            </li>
                            <li>
                              <a href="#"> Woody</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-color">Color:</li>
                            <li className="swatch-color">
                              <a href="#">Black</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">White</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">Brown</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-text-label">Pots Size:</li>
                            <li className="swatch-text-label">
                              <a href="#">XS</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">S</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">M</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">L</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">XL</a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-info-right">
                          <div className="price">$45</div>
                          <div className="product-list-message">
                            <i className="icon fa fa-truck" aria-hidden="true"></i>
                            UK Free Delivery
                          </div>
                          <form className="cart">
                            <div className="single_variation_wrap">
                              <div className="quantity">
                                <div className="control">
                                  <a
                                    className="btn-number qtyminus quantity-minus"
                                    href="#"
                                  >
                                    -
                                  </a>
                                  <input
                                    type="text"
                                    data-step="1"
                                    data-min="0"
                                    value="1"
                                    title="Qty"
                                    className="input-qty qty"
                                    size="4"
                                  />
                                  <a
                                    href="#"
                                    className="btn-number qtyplus quantity-plus"
                                  >
                                    +
                                  </a>
                                </div>
                              </div>
                              <button className="single_add_to_cart_button button">
                                Add to cart
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="product-item style-list col-lg-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-ts-12">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        <div className="flash">
                          <span className="onnew">
                            <span className="text">new</span>
                          </span>
                        </div>
                      </div>
                      <div className="products-bottom-content">
                        <div className="product-thumb">
                          <div className="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-2.jpg"
                                alt="img"
                              />
                            </a>
                            <a href="#" className="button quick-wiew-button">
                              Quick View
                            </a>
                          </div>
                        </div>
                        <div className="product-info-left">
                          <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                              <a href="#">Add to Wishlist</a>
                            </div>
                          </div>
                          <h5 className="product-name product_title">
                            <a href="#">Bibliotheque</a>
                          </h5>
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <ul className="product-attributes">
                            <li>Material:</li>
                            <li>
                              <a href="#">Plastic</a>
                            </li>
                            <li>
                              <a href="#"> Woody</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-color">Color:</li>
                            <li className="swatch-color">
                              <a href="#">Black</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">White</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">Brown</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-text-label">Pots Size:</li>
                            <li className="swatch-text-label">
                              <a href="#">XS</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">S</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">M</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">L</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">XL</a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-info-right">
                          <div className="price">$45</div>
                          <div className="product-list-message">
                            <i className="icon fa fa-truck" aria-hidden="true"></i>
                            UK Free Delivery
                          </div>
                          <form className="cart">
                            <div className="single_variation_wrap">
                              <div className="quantity">
                                <div className="control">
                                  <a
                                    className="btn-number qtyminus quantity-minus"
                                    href="#"
                                  >
                                    -
                                  </a>
                                  <input
                                    type="text"
                                    data-step="1"
                                    data-min="0"
                                    value="1"
                                    title="Qty"
                                    className="input-qty qty"
                                    size="4"
                                  />
                                  <a
                                    href="#"
                                    className="btn-number qtyplus quantity-plus"
                                  >
                                    +
                                  </a>
                                </div>
                              </div>
                              <button className="single_add_to_cart_button button">
                                Add to cart
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="product-item style-list col-lg-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-ts-12">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        <div className="flash">
                          <span className="onnew">
                            <span className="text">new</span>
                          </span>
                        </div>
                      </div>
                      <div className="products-bottom-content">
                        <div className="product-thumb">
                          <div className="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-3.jpg"
                                alt="img"
                              />
                            </a>
                            <a href="#" className="button quick-wiew-button">
                              Quick View
                            </a>
                          </div>
                        </div>
                        <div className="product-info-left">
                          <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                              <a href="#">Add to Wishlist</a>
                            </div>
                          </div>
                          <h5 className="product-name product_title">
                            <a href="#">Bibliotheque</a>
                          </h5>
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <ul className="product-attributes">
                            <li>Material:</li>
                            <li>
                              <a href="#">Plastic</a>
                            </li>
                            <li>
                              <a href="#"> Woody</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-color">Color:</li>
                            <li className="swatch-color">
                              <a href="#">Black</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">White</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">Brown</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-text-label">Pots Size:</li>
                            <li className="swatch-text-label">
                              <a href="#">XS</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">S</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">M</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">L</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">XL</a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-info-right">
                          <div className="price">$45</div>
                          <div className="product-list-message">
                            <i className="icon fa fa-truck" aria-hidden="true"></i>
                            UK Free Delivery
                          </div>
                          <form className="cart">
                            <div className="single_variation_wrap">
                              <div className="quantity">
                                <div className="control">
                                  <a
                                    className="btn-number qtyminus quantity-minus"
                                    href="#"
                                  >
                                    -
                                  </a>
                                  <input
                                    type="text"
                                    data-step="1"
                                    data-min="0"
                                    value="1"
                                    title="Qty"
                                    className="input-qty qty"
                                    size="4"
                                  />
                                  <a
                                    href="#"
                                    className="btn-number qtyplus quantity-plus"
                                  >
                                    +
                                  </a>
                                </div>
                              </div>
                              <button className="single_add_to_cart_button button">
                                Add to cart
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="product-item style-list col-lg-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-ts-12">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        <div className="flash">
                          <span className="onnew">
                            <span className="text">new</span>
                          </span>
                        </div>
                      </div>
                      <div className="products-bottom-content">
                        <div className="product-thumb">
                          <div className="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-5.jpg"
                                alt="img"
                              />
                            </a>
                            <a href="#" className="button quick-wiew-button">
                              Quick View
                            </a>
                          </div>
                        </div>
                        <div className="product-info-left">
                          <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                              <a href="#">Add to Wishlist</a>
                            </div>
                          </div>
                          <h5 className="product-name product_title">
                            <a href="#">Bibliotheque</a>
                          </h5>
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <ul className="product-attributes">
                            <li>Material:</li>
                            <li>
                              <a href="#">Plastic</a>
                            </li>
                            <li>
                              <a href="#"> Woody</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-color">Color:</li>
                            <li className="swatch-color">
                              <a href="#">Black</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">White</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">Brown</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-text-label">Pots Size:</li>
                            <li className="swatch-text-label">
                              <a href="#">XS</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">S</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">M</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">L</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">XL</a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-info-right">
                          <div className="price">$45</div>
                          <div className="product-list-message">
                            <i className="icon fa fa-truck" aria-hidden="true"></i>
                            UK Free Delivery
                          </div>
                          <form className="cart">
                            <div className="single_variation_wrap">
                              <div className="quantity">
                                <div className="control">
                                  <a
                                    className="btn-number qtyminus quantity-minus"
                                    href="#"
                                  >
                                    -
                                  </a>
                                  <input
                                    type="text"
                                    data-step="1"
                                    data-min="0"
                                    value="1"
                                    title="Qty"
                                    className="input-qty qty"
                                    size="4"
                                  />
                                  <a
                                    href="#"
                                    className="btn-number qtyplus quantity-plus"
                                  >
                                    +
                                  </a>
                                </div>
                              </div>
                              <button className="single_add_to_cart_button button">
                                Add to cart
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="product-item style-list col-lg-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-ts-12">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        <div className="flash">
                          <span className="onnew">
                            <span className="text">new</span>
                          </span>
                        </div>
                      </div>
                      <div className="products-bottom-content">
                        <div className="product-thumb">
                          <div className="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-6.jpg"
                                alt="img"
                              />
                            </a>
                            <a href="#" className="button quick-wiew-button">
                              Quick View
                            </a>
                          </div>
                        </div>
                        <div className="product-info-left">
                          <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                              <a href="#">Add to Wishlist</a>
                            </div>
                          </div>
                          <h5 className="product-name product_title">
                            <a href="#">Bibliotheque</a>
                          </h5>
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <ul className="product-attributes">
                            <li>Material:</li>
                            <li>
                              <a href="#">Plastic</a>
                            </li>
                            <li>
                              <a href="#"> Woody</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-color">Color:</li>
                            <li className="swatch-color">
                              <a href="#">Black</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">White</a>
                            </li>
                            <li className="swatch-color">
                              <a href="#">Brown</a>
                            </li>
                          </ul>
                          <ul className="attributes-display">
                            <li className="swatch-text-label">Pots Size:</li>
                            <li className="swatch-text-label">
                              <a href="#">XS</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">S</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">M</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">L</a>
                            </li>
                            <li className="swatch-text-label">
                              <a href="#">XL</a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-info-right">
                          <div className="price">$45</div>
                          <div className="product-list-message">
                            <i className="icon fa fa-truck" aria-hidden="true"></i>
                            UK Free Delivery
                          </div>
                          <form className="cart">
                            <div className="single_variation_wrap">
                              <div className="quantity">
                                <div className="control">
                                  <a
                                    className="btn-number qtyminus quantity-minus"
                                    href="#"
                                  >
                                    -
                                  </a>
                                  <input
                                    type="text"
                                    data-step="1"
                                    data-min="0"
                                    value="1"
                                    title="Qty"
                                    className="input-qty qty"
                                    size="4"
                                  />
                                  <a
                                    href="#"
                                    className="btn-number qtyplus quantity-plus"
                                  >
                                    +
                                  </a>
                                </div>
                              </div>
                              <button className="single_add_to_cart_button button">
                                Add to cart
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul> */
}
