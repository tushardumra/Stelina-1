import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./context";
export const Header = () => {
  const navigate = useNavigate();
  // const [userState, setuserState] = useState("");
  // const [userName, setuserName] = useState("");

  // const user_id = JSON.parse(sessionStorage.getItem("db_id"));
  const { userid, userName, islogin, setislogin } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    // setuserName(JSON.parse(localStorage.getItem("user_name")));

    // alert(user_id)
    // setuserName(JSON.parse(localStorage.getItem("user_name")));
    // setuserName(uname);
    if (token) {
      // setuserState("loggedIn");
      setislogin(true);
    } else {
      // setuserState("logout");
      setislogin(false);
    }
  }, []);

  const logout = () => {
    // setuserState("logout");
    setislogin(false);
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("role");
    sessionStorage.removeItem("db_id");
    alert("logout successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="header style2">
        <div className="top-bar">
          <div className="container">
            <div className="top-bar-left">
              <div className="header-message">
                Welcome to our online store{" "}
                <span className="user-name">{userName}</span>
              </div>
            </div>
            <div className="top-bar-right">
              <div className="header-language">
                <div className="stelina-language stelina-dropdown">
                  <a
                    href="#"
                    className="active language-toggle"
                    data-stelina="stelina-dropdown"
                  >
                    <span>English (USD)</span>
                  </a>
                  <ul className="stelina-submenu">
                    <li className="switcher-option">
                      <a href="#">
                        <span>French (EUR)</span>
                      </a>
                    </li>
                    <li className="switcher-option">
                      <a href="#">
                        <span>Japanese (JPY)</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <ul className="header-user-links">
                <li>
                  {islogin === true ? (
                    <>
                      <a className="logoutbtn" onClick={logout}>
                        Logout
                      </a>  
                    </>
                  ) : (
                    <>
                      <span>
                        <Link to="/login">Login</Link>
                        {""} or {""}
                        <Link to="/signUp">Register</Link>
                      </span>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="main-header">
            <div className="row">
              <div className="col-lg-4 col-sm-6 col-md-4 col-xs-7 col-ts-12 header-element">
                <div className="block-search-block">
                  <form className="form-search">
                    <div className="form-content">
                      <div className="inner">
                        <input
                          type="text"
                          className="input"
                          name="s"
                          value=""
                          placeholder="Search here"
                        />
                        <button className="btn-search" type="submit">
                          <span className="icon-search"></span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-4 col-xs-5 col-ts-12">
                <div className="logo">
                  <a href="index.html">
                    <img src="assets/images/logo.png" alt="logo" />
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12 col-ts-12">
                <div className="header-control">
                  <div class="block-minicart stelina-mini-cart block-header stelina-dropdown">
                    {/* Shopping bag and wishlist buttons */}

                    <span className="shop-icons">
                      {islogin === true ? (
                        <>
                          <Link to={`/shoppingCart?id=${userid}`}>
                            <img
                              src="/assets/images/bag.png"
                              alt="shopping-bag-icon"
                              title="shopping-bag"
                              />
                            
                          </Link>
                          {/* <span className="item-count">0</span> */}
                          <Link to={`/wishlist?id=${userid}`}>
                            <img
                              src="/assets/images/e-commerce.png"
                              alt="wishlist-icon"
                              title="wishlist"
                            />
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/login">
                            <img
                              src="/assets/images/bag.png"
                              alt="shopping-bag-icon"
                            />
                          </Link>
                          <Link to="/login">
                            <img
                              src="/assets/images/e-commerce.png"
                              alt="wishlist-icon"
                            />
                          </Link>
                        </>
                      )}
                    </span>

                    {/* <div class="shopcart-description stelina-submenu">
                      <div class="content-wrap">
                        <h3 class="title">Shopping Cart</h3>
                        <ul class="minicart-items">
                          <li class="product-cart mini_cart_item">
                            <a href="#" class="product-media">
                              <img
                                src="assets/images/item-minicart-1.jpg"
                                alt="img"
                              />
                            </a>
                            <div class="product-details">
                              <h5 class="product-name">
                                <a href="#">Bibliotheque</a>
                              </h5>
                              <div class="variations">
                                <span class="attribute_color">
                                  <a href="#">Black</a>
                                </span>
                                ,
                                <span class="attribute_size">
                                  <a href="#">300ml</a>
                                </span>
                              </div>
                              <span class="product-price">
                                <span class="price">
                                  <span>$45</span>
                                </span>
                              </span>
                              <span class="product-quantity"> (x1) </span>
                              <div class="product-remove">
                                <a href="">
                                  <i
                                    class="fa fa-trash-o"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="product-cart mini_cart_item">
                            <a href="#" class="product-media">
                              <img
                                src="assets/images/item-minicart-2.jpg"
                                alt="img"
                              />
                            </a>
                            <div class="product-details">
                              <h5 class="product-name">
                                <a href="#">Soap Dining Solutions</a>
                              </h5>
                              <div class="variations">
                                <span class="attribute_color">
                                  <a href="#">Black</a>
                                </span>
                                ,
                                <span class="attribute_size">
                                  <a href="#">300ml</a>
                                </span>
                              </div>
                              <span class="product-price">
                                <span class="price">
                                  <span>$45</span>
                                </span>
                              </span>
                              <span class="product-quantity"> (x1) </span>
                              <div class="product-remove">
                                <a href="">
                                  <i
                                    class="fa fa-trash-o"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="product-cart mini_cart_item">
                            <a href="#" class="product-media">
                              <img
                                src="assets/images/item-minicart-3.jpg"
                                alt="img"
                              />
                            </a>
                            <div class="product-details">
                              <h5 class="product-name">
                                <a href="#">Dining Solutions Soap</a>
                              </h5>
                              <div class="variations">
                                <span class="attribute_color">
                                  <a href="#">Black</a>
                                </span>
                                ,
                                <span class="attribute_size">
                                  <a href="#">300ml</a>
                                </span>
                              </div>
                              <span class="product-price">
                                <span class="price">
                                  <span>$45</span>
                                </span>
                              </span>
                              <span class="product-quantity"> (x1) </span>
                              <div class="product-remove">
                                <a href="">
                                  <i
                                    class="fa fa-trash-o"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div class="subtotal">
                          <span class="total-title">Subtotal: </span>
                          <span class="total-price">
                            <span class="Price-amount"> $135 </span>
                          </span>
                        </div>
                        <div class="actions">
                          <a
                            class="button button-viewcart"
                            href="shoppingcart.html"
                          >
                            <span>View Bag</span>
                          </a>
                          <a
                            href="checkout.html"
                            class="button button-checkout"
                          >
                            <span>Checkout</span>
                          </a>
                        </div>
                      </div>
                    </div> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-nav-container">
          <div className="container">
            <div className="header-nav-wapper main-menu-wapper">
              <div className="header-nav">
                <div className="container-wapper">
                  <ul
                    className="stelina-clone-mobile-menu stelina-nav main-menu "
                    id="menu-main-menu"
                  >
                    <li className="">
                      <Link
                        to="/"
                        className="stelina-menu-item-title"
                        title="Home"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="/allProductShopPage"
                        className="stelina-menu-item-title"
                        title="Shop"
                      >
                        Shop
                      </Link>
                    </li>

                    <li className="menu-item  menu-item-has-children">
                      <a
                        href="inblog_right-siderbar.html"
                        className="stelina-menu-item-title"
                        title="Blogs"
                      >
                        Blogs
                      </a>
                      <span className="toggle-submenu"></span>
                      <ul className="submenu">
                        <li className="menu-item menu-item-has-children">
                          <a
                            href="#"
                            className="stelina-menu-item-title"
                            title="Blog Style"
                          >
                            Read Blogs
                          </a>
                          <span className="toggle-submenu"></span>
                          <ul className="submenu">
                            <li className="menu-item">
                              <Link to="/bloggridView">Grid View</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/bloglistView">List View</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/bloglistSiderbar">List Sidebar</Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item menu-item-has-children">
                          <a
                            href="#"
                            className="stelina-menu-item-title"
                            title="Post Layout"
                          >
                            {" "}
                            Blog Post
                          </a>
                          <span className="toggle-submenu"></span>
                          <ul className="submenu">
                            <li className="menu-item">
                              <Link to="/postleftSideView">
                                Left Siderbar View
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/postrightSideView">
                                Right Siderbar View
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <Link
                        to="/aboutpage"
                        className="stelina-menu-item-title"
                        title="About"
                      >
                        About
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to="/contactUs">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="header-device-mobile">
        <div className="wapper">
          <div className="item mobile-logo">
            <div className="logo">
              <a href="#">
                <img src="assets/images/logo.png" alt="img" />
              </a>
            </div>
          </div>
          <div className="item item mobile-search-box has-sub">
            <a href="#">
              <span className="icon">
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </a>
            <div className="block-sub">
              <a href="#" className="close">
                <i className="fa fa-times" aria-hidden="true"></i>
              </a>
              <div className="header-searchform-box">
                <form className="header-searchform">
                  <div className="searchform-wrap">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Enter keywords to search..."
                    />
                    <input
                      type="submit"
                      className="submit button"
                      value="Search"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="item mobile-settings-box has-sub">
            <a href="#">
              <span className="icon">
                <i className="fa fa-cog" aria-hidden="true"></i>
              </span>
            </a>
            <div className="block-sub">
              <a href="#" className="close">
                <i className="fa fa-times" aria-hidden="true"></i>
              </a>
              <div className="block-sub-item">
                <h5 className="block-item-title">Currency</h5>
                <form className="currency-form stelina-language">
                  <ul className="stelina-language-wrap">
                    <li className="active">
                      <a href="#">
                        <span>English (USD)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>French (EUR)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>Japanese (JPY)</span>
                      </a>
                    </li>
                    
                  </ul>
                  
                </form>
              </div>
                {islogin === true ?
                 <a className="logoutbtn" onClick={logout}>Logout</a> :
                 <Link></Link>
                }
            </div>
          </div>
          <div className="item menu-bar">
            <a className=" mobile-navigation  menu-toggle" href="#">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
