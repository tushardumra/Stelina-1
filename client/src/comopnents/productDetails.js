import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductByCategory } from "./productsByCategory";
import { Context } from "./context";

export const ProductDetails = () => {
  const [prodDetail, setprodDetail] = useState([]);
  const [prodBycate, setprodBycate] = useState([]);

  const [prodName, setprodName] = useState("");
  const [prodPrice, setprodPrice] = useState("");
  const [prodDesc, setprodDesc] = useState("");
  const [prodImg, setprodImg] = useState("");
  const [prodQty, setprodQty] = useState(1);

  const { userid,islogin,setislogin } = useContext(Context);
  
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      setislogin(true)
    } else {
      setislogin(false)
    }

    showProdDetails();
  }, []);

  const [params] = useSearchParams();
  const pId = params.get("id");
  const cId = params.get("cid"); 

  
  const showProdDetails = async () => {
    try {
      const useApi = await fetch(`https://stelina-1-backend.onrender.com/api/productDetails/${pId}`);

      const resp = await useApi.json();
      if(resp.statuscode === 1) {
        setprodDetail(resp.data);
        // console.log("hllo")
        // console.log(resp.data);
        setprodName(resp.data.ProductName);
        setprodPrice(resp.data.ProductPrice);
        setprodDesc(resp.data.ProductDesc);
        setprodImg(resp.data.ImgPath);
        showProdByCate();
      } else {
        console.log("failed to fetch details")
      }
    } catch (error) {
      console.log("Error here")
    }
  }

  const sendToWishlist = async () => {
    try {
      const productData = {prodName, prodPrice, prodDesc, prodImg, userid, pId};

      const useApi = await fetch("https://stelina-1-backend.onrender.com/api/saveInWishlist", {
        method: "Post",
        body: JSON.stringify(productData),
        headers: {
          "content-type": "application/json;charset=UTF-8"
        }
      });
      if(useApi.ok) {
        const resp = await useApi.json();
        // alert("hllo", resp)
        if(resp.statuscode === 2) {
          alert("This product is already exsist in the wishlist");
        } else if (resp.statuscode === 1){
          alert("product added to wishlist");
        } else {
          alert("error in sending product to wishlist")
        }
      } 
    } catch (error) {
      console.log(error, "in sending data to wishlist")
    }
  }

  const increaseQty = () => {
    setprodQty(prev => prev + 1);
  };

  const decreaseQty = () => {
    if (prodQty > 1) {
      setprodQty(prev => prev - 1);
    }
  };

  const addInCart = async () => {
    
    try {
      const productData = {prodName, prodPrice, prodQty, prodImg, userid, pId};

      const useApi = await fetch("https://stelina-1-backend.onrender.com/api/addInShoppingCart", {
        method: "Post",
        body: JSON.stringify(productData),
        headers: {
          "content-type": "application/json;charset=UTF-8"
        }
      });

      if(useApi.ok) {
        const resp = await useApi.json();
        if(resp.statuscode === 2) {
          alert("this product is already in the cart")
        } else if (resp.statuscode === 1) {
          alert("product  added to the cart")
        } else {
          alert("error in adding the product to cart")
        }
      }
    } catch (error) {
      console.log(error, " in sending data to shopping cart");
    }
  }

  const showProdByCate = async () => {
    try {
      console.log("product by category working")
      
      const useApi = await fetch(`https://stelina-1-backend.onrender.com/api/productsList/${cId}`);

      const resp = await useApi.json();
      if(resp.statuscode === 1) {
        setprodBycate(resp.data);
        console.log(resp.data)
      }
      else {
        alert("working")
        console.log("error in fetching product by categories")
      }
    } catch (error) {
      console.log("error in show product by categories")
    }
  }
  return (
    <>
      <div class="main-content main-content-details single no-sidebar">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb-trail breadcrumbs">
                <ul class="trail-items breadcrumb">
                  <li class="trail-item trail-begin">
                    <a href="index.html">Home</a>
                  </li>
                  <li class="trail-item">
                    <a href="#">Products</a>
                  </li>
                  <li class="trail-item trail-end active">{prodDetail.ProductName}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="content-area content-details full-width col-lg-9 col-md-8 col-sm-12 col-xs-12">
              <div class="site-main">
                <div class="details-product">
                  <div class="details-thumd">
                    <div class="image-preview-container image-thick-box image_preview_container">
                      <img
                        // id="img_zoom"
                        id="img_enlarge"
                        // data-zoom-image={`/assets/uploadProducts/${prodDetail.ProductName + ".jpg"}`}
                        data-zoom-image={(prodDetail?.ImgPath ?? "").substring(16)}
                        // src={`/assets/uploadProducts/${prodDetail.ProductName + ".jpg"}`}
                        src={(prodDetail?.ImgPath ?? "").substring(16)}
                        alt={prodDetail.ImgPath}
                        style={{objectFit: "cover"}}
                      />
                      <a href="#" class="btn-zoom open_qv">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div class="product-preview image-small product_preview">
                      <div
                        id="thumbnails"
                        class="thumbnails_carousel owl-carousel"
                        data-nav="true"
                        data-autoplay="false"
                        data-dots="false"
                        data-loop="false"
                        data-margin="10"
                        data-responsive='{"0":{"items":3},"480":{"items":3},"600":{"items":3},"1000":{"items":3}}'
                      >
                        <a
                          href="#"
                          data-image="assets/images/details-item-1.jpg"
                          data-zoom-image="assets/images/details-item-1.jpg"
                          class="active"
                        >
                          <img
                            src="assets/images/details-item-1.jpg"
                            data-large-image="assets/images/details-item-1.jpg"
                            alt="img"
                          />
                        </a>
                        <a
                          href="#"
                          data-image="assets/images/details-item-2.jpg"
                          data-zoom-image="assets/images/details-item-2.jpg"
                        >
                          <img
                            src="assets/images/details-item-2.jpg"
                            data-large-image="assets/images/details-item-2.jpg"
                            alt="img"
                          />
                        </a>
                        <a
                          href="#"
                          data-image="assets/images/details-item-3.jpg"
                          data-zoom-image="assets/images/details-item-3.jpg"
                        >
                          <img
                            src="assets/images/details-item-3.jpg"
                            data-large-image="assets/images/details-item-3.jpg"
                            alt="img"
                          />
                        </a>
                        <a
                          href="#"
                          data-image="assets/images/details-item-4.jpg"
                          data-zoom-image="assets/images/details-item-4.jpg"
                        >
                          <img
                            src="assets/images/details-item-4.jpg"
                            data-large-image="assets/images/details-item-4.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="details-infor">
                    <h1 class="product-title">{prodDetail.ProductName}</h1>
                    <div class="stars-rating">
                      <div class="star-rating">
                        <span class="star-5"></span>
                      </div>
                      <div class="count-star">(7)</div>
                    </div>
                    <div class="availability">
                      availability:
                      <a href="#">in Stock</a>
                    </div>
                    <div class="price">
                      <span>${prodDetail.ProductPrice}</span>
                    </div>
                    <div class="product-details-description">
                      <ul>
                        {prodDetail.ProductDesc}
                        
                      </ul>
                    </div>
                    <div class="variations">
                      <div class="attribute attribute_size">
                        <div class="size-text text-attribute">Size:</div>
                        <div class="list-size list-item" style={{textTransform: "lowercase"}}>
                          <a href="#" class="" style={{textTransform: "lowercase"}}>
                            10ml
                          </a>
                          <a href="#" class="" style={{textTransform: "lowercase"}}>
                            20ml
                          </a>
                          <a href="#" class="active" style={{textTransform: "lowercase"}}>
                            40ml
                          </a>
                          <a href="#" class="" style={{textTransform: "lowercase"}}>
                            60ml
                          </a>
                          <a href="#" class="" style={{textTransform: "lowercase"}}>
                            80ml
                          </a>
                          <a href="#" class="" style={{textTransform: "lowercase"}}>
                            100ml
                          </a>
                        </div>
                      </div>
                    </div>
                    {
                      islogin === true ?
                      <>
                        <div class="group-button">
                      <div class="yith-wcwl-add-to-wishlist">
                        <div class="yith-wcwl-add-button">
                          <Link to={`/wishlist?id=${userid}`} onClick={sendToWishlist}>Add to Wishlist</Link>
                        </div>
                      </div>
                      

                      <div class="quantity-add-to-cart">
                        <div class="quantity">
                          <div class="control">
                            <a
                              onClick={decreaseQty}
                              class="btn-number qtyminus quantity-minus"
                              href="#"
                            >
                              -
                            </a>
                            <span class="input-qty qty">{prodQty}</span>
                            <a
                              onClick={increaseQty}
                              href="#"
                              class="btn-number qtyplus quantity-plus"
                            >
                              +
                            </a>
                          </div>
                        </div>
                        <Link to={`/shoppingCart?id=${userid}`} onClick={addInCart} class="single_add_to_cart_button button">
                          Add to cart
                        </Link>
                      </div>
                    </div>
                      </> :
                      <>
                        <div class="group-button">
                      <div class="yith-wcwl-add-to-wishlist">
                        <div class="yith-wcwl-add-button">
                          <Link to={`/login`} >Add to Wishlist</Link>
                        </div>
                      </div>
                    
                      <div class="quantity-add-to-cart">
                        <div class="quantity">
                          <div class="control">
                            <Link
                              to={`/login`}
                              class="btn-number qtyminus quantity-minus"
                              href="#"
                            >
                              -
                            </Link>
                            <span class="input-qty qty">{prodQty}</span>
                            <Link
                              to={`/login`}
                              href="#"
                              class="btn-number qtyplus quantity-plus"
                            >
                              +
                            </Link>
                          </div>
                        </div>
                        <Link to={`/login`} class="single_add_to_cart_button button">
                          Add to cart
                        </Link>
                      </div>
                    </div>
                      </>
                    }

                  </div>
                </div>
                <div class="tab-details-product">
                  <ul class="tab-link">
                    <li class="active">
                      <a
                        data-toggle="tab"
                        aria-expanded="true"
                        href="#product-descriptions"
                      >
                        Descriptions{" "}
                      </a>
                    </li>
                    <li class="">
                      <a
                        data-toggle="tab"
                        aria-expanded="true"
                        href="#information"
                      >
                        Information{" "}
                      </a>
                    </li>
                    <li class="">
                      <a data-toggle="tab" aria-expanded="true" href="#reviews">
                        Reviews
                      </a>
                    </li>
                  </ul>
                  <div class="tab-container">
                    <div id="product-descriptions" class="tab-panel active">
                      <p>
                        Quisque quis ipsum venenatis, fermentum ante volutpat,
                        ornare enim. Phasellus molestie risus non aliquet
                        cursus. Integer vestibulum mi lorem, id hendrerit ante
                        lobortis non. Nunc ante ante, lobortis non pretium non,
                        vulputate vel nisi. Maecenas dolor elit, fringilla nec
                        turpis ac, auctor vulputate nulla. Phasellus sed laoreet
                        velit.
                      </p>
                      <p>
                        Proin fringilla urna vel mattis euismod. Etiam sodales,
                        massa non tincidunt iaculis, mauris libero scelerisque
                        justo, ut rutrum lectus urna sit amet quam. Nulla
                        maximus vestibulum mi vitae accumsan.
                      </p>
                    </div>
                    <div id="information" class="tab-panel">
                      <table class="table table-bordered">
                        <tr>
                          <td>Size</td>
                          <td> XS / S / M / L</td>
                        </tr>
                        <tr>
                          <td>Color</td>
                          <td>White/ Black/ Teal/ Brown</td>
                        </tr>
                        <tr>
                          <td>Properties</td>
                          <td>Colorful Dress</td>
                        </tr>
                      </table>
                    </div>
                    <div id="reviews" class="tab-panel">
                      <div class="reviews-tab">
                        <div class="comments">
                          <h2 class="reviews-title">
                            1 review for
                            <span>Glorious Eau</span>
                          </h2>
                          <ol class="commentlist">
                            <li class="conment">
                              <div class="conment-container">
                                <a href="#" class="avatar">
                                  <img
                                    src="assets/images/avartar.png"
                                    alt="img"
                                  />
                                </a>
                                <div class="comment-text">
                                  <div class="stars-rating">
                                    <div class="star-rating">
                                      <span class="star-5"></span>
                                    </div>
                                    <div class="count-star">(1)</div>
                                  </div>
                                  <p class="meta">
                                    <strong class="author">Cobus Bester</strong>
                                    <span>-</span>
                                    <span class="time">June 7, 2013</span>
                                  </p>
                                  <div class="description">
                                    <p>
                                      Simple and effective design. One of my
                                      favorites.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                        <div class="review_form_wrapper">
                          <div class="review_form">
                            <div class="comment-respond">
                              <span class="comment-reply-title">
                                Add a review{" "}
                              </span>
                              <form class="comment-form-review">
                                <p class="comment-notes">
                                  <span class="email-notes">
                                    Your email address will not be published.
                                  </span>
                                  Required fields are marked
                                  <span class="required">*</span>
                                </p>
                                <div class="comment-form-rating">
                                  <label>Your rating</label>
                                  <p class="stars">
                                    <span>
                                      <a class="star-1" href="#"></a>
                                      <a class="star-2" href="#"></a>
                                      <a class="star-3" href="#"></a>
                                      <a class="star-4" href="#"></a>
                                      <a class="star-5" href="#"></a>
                                    </span>
                                  </p>
                                </div>
                                <p class="comment-form-comment">
                                  <label>
                                    Your review
                                    <span class="required">*</span>
                                  </label>
                                  <textarea
                                    title="review"
                                    id="comment"
                                    name="comment"
                                    cols="45"
                                    rows="8"
                                  ></textarea>
                                </p>
                                <p class="comment-form-author">
                                  <label>
                                    Name
                                    <span class="">*</span>
                                  </label>
                                  <input
                                    title="author"
                                    id="author"
                                    name="author"
                                    type="text"
                                    value=""
                                  />
                                </p>
                                <p class="comment-form-email">
                                  <label>
                                    Email
                                    <span class="">*</span>
                                  </label>
                                  <input
                                    title="email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value=""
                                  />
                                </p>
                                <p class="form-submit">
                                  <input
                                    name="submit"
                                    type="submit"
                                    id="submit"
                                    class="submit"
                                    value="Submit"
                                  />
                                </p>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{clear: "left"}}></div>
                <div  class="related products product-grid">
                  <h2 class="product-grid-title">You may also like</h2>
                  <ul style={{display: "flex",justifyContent: "center" ,gap: "50px", flexWrap: "wrap"}}
                    class="owl-products owl-slick equal-container nav-center"
                    data-slick='{"autoplay":false, "autoplaySpeed":1000, "arrows":true, "dots":false, "infinite":true, "speed":800, "rows":1}'
                    data-responsive='[{"breakpoint":"2000","settings":{"slidesToShow":3}},{"breakpoint":"1200","settings":{"slidesToShow":2}},{"breakpoint":"992","settings":{"slidesToShow":2}},{"breakpoint":"480","settings":{"slidesToShow":1}}]'
                  >
                    {prodBycate.map((prodBycategory, index) =>
                      <li key={index} class="product-item style-1">
                      <div class="product-inner equal-element">
                        <div class="product-top">
                          <div class="flash">
                            <span class="onnew">
                              <span class="text">new</span>
                            </span>
                          </div>
                        </div>
                        <div class="product-thumb">
                          <div class="thumb-inner">
                            <Link to={`/productDetailedView?id=${prodBycategory._id}&cid=${prodBycategory.ProductCategory}`} style={{}}>
                              <img style={{height: "300px",width: "300px",objectFit: "cover"}}
                                // src={`/assets/uploadProducts/${prodBycategory.ProductName + ".jpg"}`}
                                src={(prodBycategory?.ImgPath ?? "").substring(16)}
                                alt={prodBycategory.ImgPath}
                              />
                            </Link>
                            {/* <div class="thumb-group">
                              <div class="yith-wcwl-add-to-wishlist">
                                <div class="yith-wcwl-add-button">
                                  <a href="#">Add to Wishlist</a>
                                </div>
                              </div>
                              <a href="#" class="button quick-wiew-button">
                                Quick View
                              </a>
                              <div class="loop-form-add-to-cart">
                                <button class="single_add_to_cart_button button">
                                  Add to cart
                                </button>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <div class="product-info">
                          <h5 class="product-name product_title">
                            <a href="#">{prodBycategory.ProductName}</a>
                          </h5>
                          <div class="group-info">
                            <div class="stars-rating">
                              <div class="star-rating">
                                <span class="star-3"></span>
                              </div>
                              <div class="count-star">(3)</div>
                            </div>
                            <div class="price">
                              {/* <del>{prodBycategory.ProductPrice}</del> */}
                              <ins>${prodBycategory.ProductPrice}</ins>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    )}
                    

                    {/* <div class="product-item style-1">
                      <div class="product-inner equal-element">
                        <div class="product-top">
                          <div class="flash">
                            <span class="onnew">
                              <span class="text">new</span>
                            </span>
                          </div>
                        </div>
                        <div class="product-thumb">
                          <div class="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-2.jpg"
                                alt="img"
                              />
                            </a>
                            <div class="thumb-group">
                              <div class="yith-wcwl-add-to-wishlist">
                                <div class="yith-wcwl-add-button">
                                  <a href="#">Add to Wishlist</a>
                                </div>
                              </div>
                              <a href="#" class="button quick-wiew-button">
                                Quick View
                              </a>
                              <div class="loop-form-add-to-cart">
                                <button class="single_add_to_cart_button button">
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="product-info">
                          <h5 class="product-name product_title">
                            <a href="#">Glorious Eau</a>
                          </h5>
                          <div class="group-info">
                            <div class="stars-rating">
                              <div class="star-rating">
                                <span class="star-3"></span>
                              </div>
                              <div class="count-star">(3)</div>
                            </div>
                            <div class="price">
                              <del>$65</del>
                              <ins>$45</ins>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-item style-1">
                      <div class="product-inner equal-element">
                        <div class="product-top">
                          <div class="flash">
                            <span class="onnew">
                              <span class="text">new</span>
                            </span>
                          </div>
                        </div>
                        <div class="product-thumb">
                          <div class="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-3.jpg"
                                alt="img"
                              />
                            </a>
                            <div class="thumb-group">
                              <div class="yith-wcwl-add-to-wishlist">
                                <div class="yith-wcwl-add-button">
                                  <a href="#">Add to Wishlist</a>
                                </div>
                              </div>
                              <a href="#" class="button quick-wiew-button">
                                Quick View
                              </a>
                              <div class="loop-form-add-to-cart">
                                <button class="single_add_to_cart_button button">
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="product-info">
                          <h5 class="product-name product_title">
                            <a href="#">Cuerpo Eau</a>
                          </h5>
                          <div class="group-info">
                            <div class="stars-rating">
                              <div class="star-rating">
                                <span class="star-3"></span>
                              </div>
                              <div class="count-star">(3)</div>
                            </div>
                            <div class="price">
                              <del>$65</del>
                              <ins>$45</ins>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-item style-1">
                      <div class="product-inner equal-element">
                        <div class="product-top">
                          <div class="flash">
                            <span class="onnew">
                              <span class="text">new</span>
                            </span>
                          </div>
                        </div>
                        <div class="product-thumb">
                          <div class="thumb-inner">
                            <a href="#">
                              <img
                                src="assets/images/product-item-4.jpg"
                                alt="img"
                              />
                            </a>
                            <div class="thumb-group">
                              <div class="yith-wcwl-add-to-wishlist">
                                <div class="yith-wcwl-add-button">
                                  <a href="#">Add to Wishlist</a>
                                </div>
                              </div>
                              <a href="#" class="button quick-wiew-button">
                                Quick View
                              </a>
                              <div class="loop-form-add-to-cart">
                                <button class="single_add_to_cart_button button">
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="product-info">
                          <h5 class="product-name product_title">
                            <a href="#">The Alchemist</a>
                          </h5>
                          <div class="group-info">
                            <div class="stars-rating">
                              <div class="star-rating">
                                <span class="star-3"></span>
                              </div>
                              <div class="count-star">(3)</div>
                            </div>
                            <div class="price">
                              <del>$65</del>
                              <ins>$45</ins>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
