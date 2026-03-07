import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const [prodName, setprodName] = useState("");
  const [prodCate, setprodCate] = useState([]); // for category list names
  const [selectedCate, setselectedCate] = useState(""); // for show category name while editmode on
  const [prodCateName, setprodCateName] = useState("");
  const [prodPrice, setprodPrice] = useState("");
  const [prodDesc, setprodDesc] = useState("");
  const [prodImg, setprodImg] = useState(null);

  const [isSaleOn, setIsSaleOn] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");

  const [showProduct, setshowProduct] = useState([]);

  const [editmode, seteditmode] = useState(false);
  const [oldpic, setoldpic] = useState("");
  const [prodId, setprodId] = useState("");

  const { usertype } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (usertype == "admin") {
      cateInList();
      showProducts();
    } else {
      navigate("/login");
    }
  }, []);

  const cateInList = async () => {
    const useApi = await fetch("https://stelina-backend.onrender.com/api/getCategories", {
      method: "Get",
    });

    if (useApi.ok) {
      const resp = await useApi.json();
      if (resp.statuscode === 1) {
        // alert("fetched");
        setprodCate(resp.data);
      } else {
        alert("not fetched");
      }
    }
  };

  const addProducts = async (e) => {
    e.preventDefault();

    if (editmode === true) {
      const UpProductInfo = new FormData();
      UpProductInfo.append("product_name", prodName);
      UpProductInfo.append("product_category", selectedCate);
      UpProductInfo.append("product_price", prodPrice);
      UpProductInfo.append("product_desc", prodDesc);
      UpProductInfo.append("oldProd_img", oldpic);

      if (prodImg) {
        UpProductInfo.append("product_img", prodImg); // send new image if selected
      }

      try {
        const useApi = await fetch(
          `https://stelina-backend.onrender.com/api/update-product/${prodId}`,
          {
            method: "Put",
            body: UpProductInfo,
          },
        );
        if (useApi.ok) {
          const resp = await useApi.json();
          if (resp.statuscode === 1) {
            alert("category updated successfully");
            setprodName("");
            setprodCate("");
            setprodPrice("");
            setprodDesc("");
            setprodImg(null);
            seteditmode(false);
            showProducts();
          } else {
            alert("product not updating");
          }
        }
      } catch (error) {
        console.log(error, "error in updating product");
      }
    } else {

      const selectedCategoryObj = prodCate.find(
        (c) => c._id === selectedCate
      );
      const categoryName = selectedCategoryObj?.CategoryName;

      const productInfo = new FormData();
      productInfo.append("product_name", prodName);
      productInfo.append("product_category", selectedCate);
      productInfo.append("prod_cate_name", categoryName);
      productInfo.append("product_price", prodPrice);
      productInfo.append("product_desc", prodDesc);
      productInfo.append("product_img", prodImg);
      productInfo.append("product_sale", isSaleOn);
      if (isSaleOn) {
        productInfo.append("discount_price", discountPrice);
      }

      try {
        const useApi = await fetch("https://stelina-backend.onrender.com/api/uploadProducts", {
          method: "Post",
          body: productInfo,
        });

        const data = await useApi.json();
        console.log("Response:", data);
        setprodName("");
        setselectedCate("");
        setprodPrice("");
        setprodDesc("");
        setprodImg(null);
        window.location.reload();
      } catch (error) {
        console.log("error");
      }
    }
  };

  const showProducts = async () => {
    try {
      const useApi = await fetch("https://stelina-backend.onrender.com/api/getProducts");

      const resp = await useApi.json();
      console.log(resp);

      if (resp.statuscode === 1) {
        setshowProduct(resp.data);
      } else {
        console.log("failed!");
      }
    } catch (error) {
      console.log("error here");
    }
  };

  const editProd = (info) => {
    setprodName(info.ProductName);
    setselectedCate(info.ProductCategory);
    setprodPrice(info.ProductPrice);
    setprodDesc(info.ProductDesc);
    setoldpic(info.ImgPath);
    seteditmode(true);
    setprodId(info._id);
    // alert(info._id);
  };

  const deleteProd = async (id) => {
    const useApi = await fetch(`https://stelina-backend.onrender.com/api/deleteProd/${id}`, {
      method: "Delete",
    });

    if (useApi.ok) {
      const items = await useApi.json();
      if (items.statuscode === 1) {
        alert("Deleted");
        showProducts();
      } else {
        alert("error occured");
      }
    }
  };

  return (
    <>
      <div className="main-content main-content-login">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <div className="breadcrumb-trail breadcrumbs">
                <ul className="trail-items breadcrumb">
                  <li className="trail-item trail-begin">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="trail-item trail-end active">Add Product</li>
                </ul>
              </div> */}
            </div>
          </div>
          <div className="row" style={{paddingTop: "45px"}}>
            <div className="content-area col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="site-main">
                <h3 className="custom_blog_title">
                  {editmode == true ? <>Edit</> : <>Add</>} Product
                </h3>
                <div className="customer_login ">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                      <div className="login-item ">
                        <h5 className="title-login">
                          {editmode == true ? <>Edit</> : <>Add</>} your Product
                        </h5>
                        <div className="login product-form">
                          <p className="form-row form-row-wide">
                            <label className="">Product Name</label>
                            <input
                              title="productname"
                              name="productname"
                              type="text"
                              required
                              className="input-text"
                              value={prodName}
                              onChange={(e) => setprodName(e.target.value)}
                            />
                          </p>
                          {/* {editmode == true ? (
                            <>
                              <label>Current Category Name</label>
                              <p>{selectedCate}</p>
                            </>
                          ) : (
                            <></>
                          )} */}
                          <p className="">
                            <label>Product Category</label> <br />
                            <select
                              className="category-sel"
                              value={selectedCate}
                              onChange={(e) => setselectedCate(e.target.value)}
                            >
                              <option selected>Choose Category</option>
                              {prodCate.map((a) => (
                                <option key={a._id} value={a._id}>
                                  {a.CategoryName}
                                </option>
                              ))}
                              {/* {Array.isArray(prodCate) &&
                                prodCate.map((a) => (
                                  <option
                                    value={{ id: a._id, name: a.CategoryName }}
                                  >
                                    {a.CategoryName}
                                  </option>
                                ))} */}
                            </select>
                          </p>
                          <p>
                            <label>Product Price</label>
                            <input
                              type="text"
                              title="productprice"
                              name="productprice"
                              required
                              className=""
                              value={prodPrice}
                              onChange={(e) => setprodPrice(e.target.value)}
                            />
                          </p>
                          <p>
                            <label>Product Description</label>
                            <textarea
                              className="product-desc"
                              value={prodDesc}
                              onChange={(e) => setprodDesc(e.target.value)}
                            ></textarea>
                          </p>
                          {editmode == true ? (
                            <>
                              <p className="form-row form-row-wide">
                                <label className="oldpicLabel">
                                  Old Product Image
                                </label>
                                <p>
                                  <img
                                    src={oldpic.substring(16)}
                                    alt={oldpic}
                                    className="oldpic"
                                  />
                                </p>
                              </p>
                            </>
                          ) : (
                            <></>
                          )}
                          <p className="form-row form-row-wide">
                            <label className="">
                              {editmode == true ? (
                                <>Select New Product Image</>
                              ) : (
                                <>Product Image</>
                              )}
                            </label>
                            <input
                              title="productimg"
                              name="productimg"
                              type="file"
                              className="input-file"
                              onChange={(e) => setprodImg(e.target.files[0])}
                            />
                          </p>
                          <p className="onsale">
                            <label>Is Sale on</label>
                            <input
                              type="checkbox"
                              id="saleOn"
                              name="saleOn"
                              checked={isSaleOn}
                              onChange={(e) => {
                                setIsSaleOn(e.target.checked);
                                if (!e.target.checked) setDiscountPrice("");
                              }}
                            />
                          </p>
                          {isSaleOn && (
                            <p>
                              <label>Enter Discounted Price</label>
                              <input
                                type="text"
                                title="productprice"
                                name="productprice"
                                value={discountPrice}
                                onChange={(e) =>
                                  setDiscountPrice(e.target.value)
                                }
                              />
                            </p>
                          )}

                          {editmode == true ? (
                            <>
                              <p className="form-row">
                                <button
                                  className=" prd-cat-btn"
                                  onClick={addProducts}
                                >
                                  Update Product
                                </button>
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="form-row">
                                <button
                                  className=" prd-cat-btn"
                                  onClick={addProducts}
                                >
                                  Add Product
                                </button>
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="login-item">
                        <div
                          className="addProductImgSec"
                          id="perfumesImg"
                        ></div>
                      </div>
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
          <h3 className="custommenu-title-blog">Products</h3>
          <ul className="row list-products auto-clear equal-container product-grid">
            {showProduct.map((product, index) => (
              <li
                key={index}
                className="product-item col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1"
              >
                <div className="product-inner equal-element">
                  <div className="product-top">
                    <div className="flash">
                      <span className="onnew">
                        <span className="text">new</span>
                      </span>
                    </div>
                  </div>
                  <div className="product-thumb">
                    <div className="thumb-inner">
                      <a href="#">
                        <img
                          // src={`/assets/uploadProducts/${
                          //   product.ProductName + ".jpg"
                          // }`}
                          src={product.ImgPath.substring(16)}
                          alt={product.ProductName}
                        />
                      </a>
                      <div className="thumb-group">
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
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <h5 className="product-name product_title">
                      <a href="#">{product.ProductName.split(".")[0]}</a>
                    </h5>

                    <div className="group-info">
                      <div>
                        <button
                          onClick={() => {
                            editProd(product);
                          }}
                          className="ctnl-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteProd(product._id);
                          }}
                          className="ctnl-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          ;
        </div>
      </div>
    </>
  );
};
