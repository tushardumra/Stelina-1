import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./context";

export const AdminPage = () => {
  const [userState, setuserState] = useState("");
  const navigate = useNavigate();
  const {userName} = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token !== "") {
      setuserState("loggedIn");
    } else {
      setuserState("Logout");
    }
  }, []);

  const logout = () => {
    setuserState("Logout");
    localStorage.clear();
    sessionStorage.clear();
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
                Welcome Admin{" "}
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
              <ul className="header-user-links logout-btn">
                <li>
                  {userState === "loggedIn" ? (
                    <>
                      <>
                        <Link onClick={logout}>Logout</Link>
                      </>
                    </>
                  ) : (
                    <>Login</>
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
                {/* <div className="block-search-block">
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
                </div> */}
              </div>
              <div className="col-lg-4 col-sm-6 col-md-4 col-xs-5 col-ts-12">
                {/* <div className="logo">
                  <a href="index.html">
                    <img src="assets/images/logo.png" alt="logo" />
                  </a>
                </div> */}
              </div>
              <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12 col-ts-12">
                {/* <div className="header-control">
                  <div className="block-minicart stelina-mini-cart block-header stelina-dropdown">
                    <a
                      href="javascript:void(0);"
                      className="shopcart-icon"
                      data-stelina="stelina-dropdown"
                    >
                      Cart
                      <span className="count">0</span>
                    </a>
                    <div className="no-product stelina-submenu">
                      <p className="text">
                        You have
                        <span>0 item(s)</span>
                        in your bag
                      </p>
                    </div>
                  </div>
                  <a
                    className="menu-bar mobile-navigation menu-toggle"
                    href="#"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="header-nav-container">
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
                    <li className="menu-item menu-item-has-children">
                      <a
                        href="gridproducts.html"
                        className="stelina-menu-item-title"
                        title="Shop"
                      >
                        Manage Shop
                      </a>
                      <span className="toggle-submenu"></span>
                      <ul className="submenu">
                        <li className="menu-item">
                          <Link to="/addCategory">Add Category</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/addProduct">Add Product</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item  menu-item-has-children item-megamenu">
                      <a
                        href="#"
                        className="stelina-menu-item-title"
                        title="Pages"
                      >
                        Pages
                      </a>
                      <span className="toggle-submenu"></span>
                      <div className="submenu mega-menu menu-page">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 menu-page-item">
                            <div className="stelina-custommenu default">
                              <h2 className="widgettitle">Shop Pages</h2>
                              <ul className="menu">
                                <li className="menu-item">
                                  <a href="shoppingcart.html">Shopping Cart</a>
                                </li>
                                <li className="menu-item">
                                  <a href="checkout.html">Checkout</a>
                                </li>
                                <li className="menu-item">
                                  <a href="contact.html">Contact us</a>
                                </li>
                                <li className="menu-item">
                                  <a href="404page.html">404</a>
                                </li>
                                <li className="menu-item">
                                  <a href="login.html">Login/Register</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 menu-page-item">
                            <div className="stelina-custommenu default">
                              <h2 className="widgettitle">Product</h2>
                              <ul className="menu">
                                <li className="menu-item">
                                  <a href="productdetails-fullwidth.html">
                                    Product Fullwidth
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="productdetails-leftsidebar.html">
                                    Product left sidebar
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="productdetails-rightsidebar.html">
                                    Product right sidebar
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 menu-page-item"></div>
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 menu-page-item"></div>
                        </div>
                      </div>
                    </li>
                    <li className="menu-item  menu-item-has-children">
                      <a
                        href="inblog_right-siderbar.html"
                        className="stelina-menu-item-title"
                        title="Blogs"
                      >
                        Blog
                      </a>
                      <span className="toggle-submenu"></span>
                      <ul className="submenu">
                        <li className="menu-item menu-item-has-children">
                          <a
                            href="#"
                            className="stelina-menu-item-title"
                            title="Blog Style"
                          >
                            Blog Style
                          </a>
                          <span className="toggle-submenu"></span>
                          <ul className="submenu">
                            <li className="menu-item">
                              <Link to="/bloggridView">Grid</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/bloglistView">List</Link>
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
                            Post Layout
                          </a>
                          <span className="toggle-submenu"></span>
                          <ul className="submenu">
                            <li className="menu-item">
                              <Link to="/postleftSideView">Left Siderbar</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/postrightSideView">
                                Right Siderbar
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        href="about.html"
                        className="stelina-menu-item-title"
                        title="About"
                      >
                        About
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
