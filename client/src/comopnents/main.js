import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "./context";
import HomeSlider from "./homeSlider";

export const MainPage = () => {
  const [showCategory, setshowCategory] = useState([]);
  const [latestProd, setlatestProd] = useState([]);
  const [saleItems, setSaleItems] = useState([]);

  const { usertype } = useContext(Context);

  useEffect(() => {
    if (usertype == "user" || usertype == "") {
      showSaleItems();
      showCategories();
      latestProducts();
    }
  }, []);

  const showSaleItems = async () => {
    try {
      const useApi = await fetch("https://stelina-backend.onrender.com/api/products-onSale");
      if(useApi.ok) {
        const resp = await useApi.json();
        if(resp.statuscode === 1) {
          setSaleItems(resp.onSaleData);
        } else {
          alert("error in getting sale items")
        }
      }
    } catch (error) {
      console.log(error, "in getting sales items data")
    }
  }

  const showCategories = async () => {
    try {
      const res = await fetch("https://stelina-backend.onrender.com/api/getall");
      const data = await res.json();
      // alert(data)
      if (data.statuscode === 1) {
        setshowCategory(data.data); // store array
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      console.log(showCategory);
    }
  };

  const latestProducts = async () => {
    try {
      const useApi = await fetch("https://stelina-backend.onrender.com/api/latestProducts");
      const resp = await useApi.json();

      if (resp.statuscode === 1) {
        // alert("data fetched");
        setlatestProd(resp.data);
        console.log(resp.data);
      } else {
        alert("failed");
      }
    } catch (error) {
      console.log("error in fetching latest products");
    }
  };

  return (
    <>
      <div className="">
        <div className="fullwidth-template">
          <HomeSlider/>
          {/* <div className="home-slider fullwidth rows-space-60">
            <div
              className="slider-owl owl-slick equal-container nav-center equal-container"
              data-slick='{"autoplay":true, "autoplaySpeed":10000, "arrows":true, "dots":true, "infinite":true, "speed":800, "rows":1}'
              data-responsive='[{"breakpoint":"2000","settings":{"slidesToShow":1}}]'
            >
              <div className="slider-item style4">
                <div className="slider-inner equal-element">
                  <div className="container">
                    <div className="slider-infor">
                      <h5 className="title-small">Sale up to 40% off!</h5>
                      <h3 className="title-big">
                        Limited time.
                        <br />
                        Be quick !
                      </h3>
                      <div className="price">
                        New Price:
                        <span className="number-price">$25.00</span>
                      </div>
                      <a
                        href="#"
                        className="button btn-shop-the-look bgroud-style"
                      >
                        Shop now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-item style5">
                <div className="slider-inner equal-element">
                  <div className="container">
                    <div className="slider-infor">
                      <h5 className="title-small">Start weekend off!</h5>
                      <h3 className="title-big">
                        Huge sale
                        <br />
                        Up to 75% Off
                      </h3>
                      <div className="when-code">
                        When Use Code:
                        <span className="number-code">STELINA</span>
                      </div>
                      <a
                        href="#"
                        className="button btn-view-promotion bgroud-style"
                      >
                        Shop now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-item style6">
                <div className="slider-inner equal-element">
                  <div className="container">
                    <div className="slider-infor">
                      <h5 className="title-small">Make your hand!</h5>
                      <h3 className="title-big">
                        New Trending <br />
                        Collection
                      </h3>
                      <div className="price">
                        Template Price:
                        <span className="number-price">$89.00</span>
                      </div>
                      <a
                        href="#"
                        className="button btn-lets-create bgroud-style"
                      >
                        Shop now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="banner-video-wrapp rows-space-40 type2">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="banner">
                    <div className="item-banner style9">
                      <div className="inner">
                        <div className="banner-content">
                          <h4 className="stelina-subtitle">Hurry up</h4>
                          <h3 className="title">
                            Big Sale To <br /> 30% Off
                          </h3>
                          <div className="code">
                            Use promo Code:
                            <span className="nummer-code">STELINA</span>
                          </div>
                          <a href="#" className="button btn-shop-now">
                            Shop now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="banner">
                    <div className="item-banner style9 type1">
                      <div className="inner">
                        <div className="banner-content">
                          <h4 className="stelina-subtitle">
                            Sale Up to 50% Off
                          </h4>
                          <h3 className="title">
                            {" "}
                            Get daily <br /> update
                          </h3>
                          <div className="code">
                            Use promo Code:
                            <span className="nummer-code">STELINA</span>
                          </div>
                          <a href="#" className="button btn-shop-now">
                            Shop now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="stelina-product produc-featured rows-space-40">
            <div className="container">
              <h3 className="custommenu-title-blog">Categories</h3>
              <ul className="row list-products auto-clear equal-container product-grid">
                {showCategory.map((category, index) => (
                  <li
                    key={index}
                    className="product-item col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1"
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
                          <Link to={`/productsGridView?id=${category._id}`}>
                            <img
                              // src={`/assets/uploadCategories/${
                              //   category.CategoryName
                              // }`}
                              src={category.CateImgPath.substring(16)}
                              alt={category.CateImgPath}
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
                          <a href="#">{category.CategoryName.split(".")[0]}</a>
                        </h5>

                        {/* <div className="group-info">
                          <div>
                            <button
                              onClick={() => {
                                editCateg(category);
                              }}
                              className="ctnl-btn"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                deleteCateg(category._id);
                              }}
                              className="ctnl-btn"
                            >
                              Delete
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* featured products */}

          <div class="product-in-stock-wrapp latest-product-section mb-5">
            <div class="container">
              <h3 class="custommenu-title-blog white">Latest Products</h3>
              <div class="stelina-product style3">
                <ul class="row list-products auto-clear equal-container product-grid">
                  {latestProd.map((product, index) => (
                    <li
                      key={index}
                      class="product-item  col-lg-4 col-md-6 col-sm-6 col-xs-6 col-ts-12 style-3"
                    >
                      <div class="product-inner equal-element">
                        <div class="product-thumb">
                          <div class="product-top">
                            <div class="flash">
                              <span class="onnew">
                                <span class="text">new</span>
                              </span>
                            </div>
                            {/* <div class="yith-wcwl-add-to-wishlist">
                              <div class="yith-wcwl-add-button">
                                <a href="#" tabindex="0">
                                  Add to Wishlist
                                </a>
                              </div>
                            </div> */}
                          </div>
                          <div class="thumb-inner">
                            <Link
                              to={`/productDetailedView?id=${product._id}&cid=${product.ProductCategory}`}
                            >
                              <img
                                src={`/assets/uploadProducts/${
                                  product.ProductName + ".jpg"
                                }`}
                                alt={product.ProductName}
                              />
                            </Link>
                          </div>
                          <a
                            href="#"
                            class="button quick-wiew-button"
                            tabindex="0"
                          >
                            Quick View
                          </a>
                        </div>
                        <div class="product-info">
                          <h5 class="product-name product_title">
                            <a href="#" tabindex="0">
                              {product.ProductName.split(".")[0]}
                            </a>
                          </h5>
                          <div class="group-info">
                            <div class="stars-rating">
                              <div class="star-rating">
                                <span class="star-3"></span>
                              </div>
                              <div class="count-star">(3)</div>
                            </div>
                            <div class="price">
                              <span>${product.ProductPrice}</span>
                            </div>
                          </div>
                          <div class="group-buttons">
                            {/* <div class="quantity">
                              <div class="control">
                                <a
                                  class="btn-number qtyminus quantity-minus"
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
                                  class="input-qty qty"
                                  size="4"
                                />
                                <a
                                  href="#"
                                  class="btn-number qtyplus quantity-plus"
                                >
                                  +
                                </a>
                              </div>
                            </div> */}
                            <Link
                              to={`/productDetailedView?id=${product._id}&cid=${product.ProductCategory}`}
                              class="add_to_cart_button button"
                              tabindex="0"
                            >
                              Shop now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="stelina-product produc-featured rows-space-40">
            <div className="container " style={{ marginTop: "100px" }}>
              <h3 className="custommenu-title-blog">Products on Sale</h3>
              <ul className="row list-products auto-clear equal-container product-grid">
                {saleItems.map((item, index) =>
                 <li className="product-item  col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1" key={index}>
                  <div className="product-inner equal-element">
                    <div className="product-top">
                      <div className="flash">
                        <span className="onnew">
                          <span className="text">Sale</span>
                        </span>
                      </div>
                    </div>
                    <div className="product-thumb">
                      <div className="thumb-inner">
                        <Link
                              to={`/productDetailedView?id=${item._id}&cid=${item.ProductCategory}`}
                            >
                              <img
                                src={(item.ImgPath).substring(16)}
                                alt={item.ProductName}
                              />
                            </Link>
                        
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name product_title">
                        <a href="#">{item.ProductName}</a>
                      </h5>
                      <div className="group-info">
                        <div className="stars-rating">
                          <div className="star-rating">
                            <span className="star-3"></span>
                          </div>
                          <div className="count-star">(3)</div>
                        </div>
                        <div className="price">
                          <del>${item.ProductPrice}</del>
                          <ins>${item.DiscountPrice}</ins>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                )}
                
                
              </ul>
            </div>
          </div>

          <div className="banner-pinmap-wrapp rows-space-70">
            <div>
              <div className="banner">
                <div className="item-banner style21">
                  <div className="inner">
                    <div className="banner-content container">
                      <div className="banner-content-inner">
                        <h4 className="stelina-subtitle">Style your chair</h4>
                        <h3 className="title">
                          Collection
                          <br />
                          Sale <span>15%</span> Off
                        </h3>
                        <div className="start-from">
                          start from <span>Dec 27</span> to <span>dec 29</span>
                        </div>
                        <a href="#" className="button btn-shop-now">
                          Shop now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stelina-testimonials-newsletter-wrapp">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="stelina-testimonials-wrapp">
                    <div className="stelina-testimonials default">
                      <div
                        className="owl-slick equal-container"
                        data-slick='{"autoplay":false, "autoplaySpeed":1000, "arrows":false, "dots":true, "infinite":true, "speed":800}'
                        data-responsive='[{"breakpoint":"2000","settings":{"slidesToShow":1}}]'
                      >
                        <div className="testimonial-item">
                          <div className="image">
                            <img
                              src="assets/images/testimonial-1.png"
                              alt="img"
                            />
                          </div>
                          <div className="info">
                            <h5 className="name">
                              Adam Smith
                              <span>Shop Owner</span>
                            </h5>
                            <div className="text">
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipiscing elit diam consequat est, eleifend
                                conubia himenaeos ac vel cursus interdum eu
                                varius non nam, scelerisque eros rhoncus
                                nascetur porttitor urna nisi gravida lacinia.
                                Quam dictumst non bibendum venenatis malesuada
                                nec lacinia volutpat ante
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="testimonial-item">
                          <div className="image">
                            <img
                              src="assets/images/testimonial-2.png"
                              alt="img"
                            />
                          </div>
                          <div className="info">
                            <h5 className="name">
                              Adam Smith
                              <span>Shop Owner</span>
                            </h5>
                            <div className="text">
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipiscing elit diam consequat est, eleifend
                                conubia himenaeos ac vel cursus interdum eu
                                varius non nam, scelerisque eros rhoncus
                                nascetur porttitor urna nisi gravida lacinia.
                                Quam dictumst non bibendum venenatis malesuada
                                nec lacinia volutpat ante
                              </p>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="stelina-newsletter default">
                    <div className="newsletter-head">
                      <h3 className="title">Newsletter</h3>
                      <div className="subtitle">
                        Get more special Deals, Events & Promotions
                      </div>
                    </div>
                    <div className="newsletter-form-wrap">
                      <input
                        className="input-text email email-newsletter"
                        type="email"
                        name="email"
                        placeholder="Your email here..."
                      />
                      <button className="button btn-submit submit-newsletter">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="banner-wrapp rows-space-30">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div className="banner">
                    <div className="item-banner style16">
                      <div className="inner">
                        <div className="banner-content">
                          <h3 className="title">
                            Products for <br />
                            choose
                          </h3>
                          <div className="description">
                            Wheel Collections <br />
                            New Arrivals
                          </div>
                          <a href="#" className="button btn-view-the-look">
                            Shop now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <div className="banner">
                    <div className="item-banner style15">
                      <div className="inner">
                        <div className="banner-content">
                          <h3 className="title">Summer Super Sale</h3>
                          <div className="description">
                            Stelina style, day by day <br />
                            functionality!
                          </div>
                          <a href="#" className="button btn-view-the-look">
                            Shop now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stelina-product layout1">
            <div style={{textAlign: "center", paddingBottom: "25px", color: "white"}}>
              <h3 style={{marginBottom: "0px", color: "white"}}>Weekly Featured</h3>
              <p>Let’s Shop our featured item this week</p>
            </div>
            
            {/* <div className="head">
                  <h3 className="title">Weekly Featured</h3>
                  <div className="subtitle">
                    Let’s Shop our featured item this week
                  </div>
              </div> */}
            <div className="container">
              
              <div className="container-wapper" style={{display: "flex", gap: "50px"}}>
                

                <div className="product-item style-1 product-type-variable">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        
                      </div>
                      <div className="product-thumb">
                        <div className="thumb-inner">
                          <a href="#">
                            <img
                              src="assets/images/product-item-black-1.jpg"
                              alt="img"
                            />
                          </a>
                          
                        </div>
                      </div>
                      <div className="product-info">
                        <h5 className="product-name product_title">
                          <a href="#">Terra Rossa</a>
                        </h5>
                        <div className="group-info">
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <div className="price">
                            <del>$65</del>
                            <ins>$45</ins>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-item style-1">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        
                      </div>
                      <div className="product-thumb">
                        <div className="thumb-inner">
                          <a href="#">
                            <img
                              src="assets/images/product-item-black-2.jpg"
                              alt="img"
                            />
                          </a>
                          
                        </div>
                      </div>
                      <div className="product-info">
                        <h5 className="product-name product_title">
                          <a href="#">Dainty Bangle</a>
                        </h5>
                        <div className="group-info">
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <div className="price">
                            <del>$65</del>
                            <ins>$45</ins>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-item style-1">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        
                      </div>
                      <div className="product-thumb">
                        <div className="thumb-inner">
                          <a href="#">
                            <img
                              src="assets/images/product-item-black-3.jpg"
                              alt="img"
                            />
                          </a>
                          
                        </div>
                      </div>
                      <div className="product-info">
                        <h5 className="product-name product_title">
                          <a href="#">The Alchemist</a>
                        </h5>
                        <div className="group-info">
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <div className="price">
                            <del>$65</del>
                            <ins>$45</ins>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-item style-1 product-type-variable">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        
                      </div>
                      <div className="product-thumb">
                        <div className="thumb-inner">
                          <a href="#">
                            <img
                              src="assets/images/product-item-black-4.jpg"
                              alt="img"
                            />
                          </a>
                          
                        </div>
                      </div>
                      <div className="product-info">
                        <h5 className="product-name product_title">
                          <a href="#">Garden A Winter </a>
                        </h5>
                        <div className="group-info">
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <div className="price">
                            <del>$65</del>
                            <ins>$45</ins>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-item style-1 product-type-variable">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        
                      </div>
                      <div className="product-thumb">
                        <div className="thumb-inner">
                          <a href="#">
                            <img
                              src="assets/images/product-item-black-5.jpg"
                              alt="img"
                            />
                          </a>
                          
                        </div>
                      </div>
                      <div className="product-info">
                        <h5 className="product-name product_title">
                          <a href="#">Melody Eau</a>
                        </h5>
                        <div className="group-info">
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <div className="price">
                            <del>$65</del>
                            <ins>$45</ins>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-item style-1 product-type-variable">
                    <div className="product-inner equal-element">
                      <div className="product-top">
                        
                      </div>
                      <div className="product-thumb">
                        <div className="thumb-inner">
                          <a href="#">
                            <img
                              src="assets/images/product-item-black-6.jpg"
                              alt="img"
                            />
                          </a>
                          
                        </div>
                      </div>
                      <div className="product-info">
                        <h5 className="product-name product_title">
                          <a href="#">Ambre Royal</a>
                        </h5>
                        <div className="group-info">
                          <div className="stars-rating">
                            <div className="star-rating">
                              <span className="star-3"></span>
                            </div>
                            <div className="count-star">(3)</div>
                          </div>
                          <div className="price">
                            <del>$65</del>
                            <ins>$45</ins>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                {/* <div
                  style={{ display: "flex", gap: "25px" }}
                  className="product-list-owl owl-slick equal-container nav-center-left"
                  data-slick='{"autoplay":true, "autoplaySpeed":1000, "arrows":true, "dots":false, "infinite":true, "speed":800,"infinite":false}'
                  data-responsive='[{"breakpoint":"2000","settings":{"slidesToShow":3}},{"breakpoint":"1200","settings":{"slidesToShow":2}},{"breakpoint":"992","settings":{"slidesToShow":1}},{"breakpoint":"768","settings":{"slidesToShow":2}},{"breakpoint":"481","settings":{"slidesToShow":1}}]'
                >
                  
                  
                </div> */}
              </div>
            </div>
          </div>

          <div className="stelina-blog-wraap default">
            <div className="container">
              <h3 className="custommenu-title-blog">Our Latest News</h3>
              <div className="stelina-blog style2">
                <div
                  className="owl-slick equal-container nav-center"
                  data-slick='{"autoplay":false, "autoplaySpeed":1000, "arrows":false, "dots":true, "infinite":true, "speed":800, "rows":1}'
                  data-responsive='[{"breakpoint":"2000","settings":{"slidesToShow":2}},{"breakpoint":"1200","settings":{"slidesToShow":1}},{"breakpoint":"992","settings":{"slidesToShow":1}},{"breakpoint":"768","settings":{"slidesToShow":1}},{"breakpoint":"481","settings":{"slidesToShow":1}}]'
                  style={{display: "flex", flexDirection: "column", gap: "25px"}}
                >
                  <div className="stelina-blog-item equal-element style2">
                    <div className="stelina-blog-inner">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            src="assets/images/slider-blog-thumb-5.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="blog-info">
                        <div className="post-top">
                          <a href="#">Tables</a>
                          <div className="post-item-share">
                            <a href="#" className="icon">
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <div className="box-content">
                              <a href="#">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-google-plus"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-pinterest"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-linkedin"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="post-date">Agust 17, 09:14 am</div>
                        <h2 className="blog-title">
                          <a href="#">
                            Please join us as we evolve and disrupt the industry
                            together
                          </a>
                        </h2>
                        <div className="blog-meta">
                          <div className="blog-meta-wrapp">
                            <span className="author">
                              <img
                                src="assets/images/avt-blog1.png"
                                alt="img"
                              />
                              Adam Smith
                            </span>
                            <span className="view">
                              <i
                                className="icon fa fa-eye"
                                aria-hidden="true"
                              ></i>
                              631
                            </span>
                            <span className="comment">
                              <i
                                className="icon fa fa-commenting"
                                aria-hidden="true"
                              ></i>
                              84
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="stelina-blog-item equal-element style2">
                    <div className="stelina-blog-inner">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            src="assets/images/slider-blog-thumb-6.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="blog-info">
                        <div className="post-top">
                          <a href="#">New Arrivals</a>
                          <div className="post-item-share">
                            <a href="#" className="icon">
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <div className="box-content">
                              <a href="#">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-google-plus"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-pinterest"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-linkedin"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="post-date">Agust 17, 09:14 am</div>
                        <h2 className="blog-title">
                          <a href="#">
                            Rosa was easy to deal, arrived quickly and very
                            happy
                          </a>
                        </h2>
                        <div className="blog-meta">
                          <div className="blog-meta-wrapp">
                            <span className="author">
                              <img
                                src="assets/images/avt-blog1.png"
                                alt="img"
                              />
                              Adam Smith
                            </span>
                            <span className="view">
                              <i
                                className="icon fa fa-eye"
                                aria-hidden="true"
                              ></i>
                              631
                            </span>
                            <span className="comment">
                              <i
                                className="icon fa fa-commenting"
                                aria-hidden="true"
                              ></i>
                              84
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="stelina-blog-item equal-element style2">
                    <div className="stelina-blog-inner">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            src="assets/images/slider-blog-thumb-7.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="blog-info">
                        <div className="post-top">
                          <a href="#">New Arrivals</a>
                          <div className="post-item-share">
                            <a href="#" className="icon">
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <div className="box-content">
                              <a href="#">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-google-plus"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-pinterest"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-linkedin"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="post-date">Agust 17, 09:14 am</div>
                        <h2 className="blog-title">
                          <a href="#">How to Build Your Perfect Dining</a>
                        </h2>
                        <div className="blog-meta">
                          <div className="blog-meta-wrapp">
                            <span className="author">
                              <img
                                src="assets/images/avt-blog1.png"
                                alt="img"
                              />
                              Adam Smith
                            </span>
                            <span className="view">
                              <i
                                className="icon fa fa-eye"
                                aria-hidden="true"
                              ></i>
                              631
                            </span>
                            <span className="comment">
                              <i
                                className="icon fa fa-commenting"
                                aria-hidden="true"
                              ></i>
                              84
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
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
