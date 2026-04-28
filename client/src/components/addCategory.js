import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./context";

export const AddCategory = () => {
  const [categoryname, setcategoryname] = useState("");
  const [categoryimg, setcategoryimg] = useState(null);

  const [showCategory, setshowCategory] = useState([]);

  const [catId, setcatId] = useState("");
  const [oldpic, setoldpic] = useState("");
  const [editmode, seteditmode] = useState(false);

  const {usertype} = useContext(Context);
  const navigate = useNavigate();  

  useEffect(() => {
    if (usertype=="admin") {
      showCategories();
    } else {
      navigate('/login');
    }
    
  }, []);

  const addCategories = async (e) => {
    e.preventDefault();

    if (editmode === true) {
      const formData = new FormData();
      formData.append("category_name", categoryname);
      formData.append("old_photo", oldpic);

      if (categoryimg) {
        formData.append("category_img", categoryimg); // ✅ send new image if selected
      }

      try {
        const useApi = await fetch(`https://stelina-1-backend.onrender.com/api/update-category/${catId}`, {
          method: "Put",
          body: formData,
        });
        if(useApi.ok) {
          const resp = await useApi.json();
          if(resp.statuscode === 1){
            alert("category updated successfully")
            setcategoryname("");
            setcategoryimg(null);
            seteditmode(false);
            showCategories();
          } else {
            alert("category not updating")
          }
        }
      } catch (error) {
        console.log(error, "error in updating category")
      }

    } else {
      const formData = new FormData();
      formData.append("category_name", categoryname);
      formData.append("category_img", categoryimg);

      try {
        const useApi = await fetch(
          "https://stelina-1-backend.onrender.com/api/uploadCategories",
          {
            method: "POST",
            body: formData,
          },
        );

        const datta = await useApi.json();
        console.log("Response:", datta);
        setcategoryname("");
        setcategoryimg(null);
        showCategories();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  const editCateg = (info) => {
    setcategoryname(info.CategoryName);
    setoldpic(info.CateImgPath);
    setcatId(info._id);
    // alert(info._id)
    seteditmode(true);
  };
  

  const showCategories = async () => {
    try {
      const useApi = await fetch("https://stelina-1-backend.onrender.com/api/getall");

      if(useApi.ok){
      const resp = await useApi.json();
      // alert(data)
      if (resp.statuscode === 1) {
        setshowCategory(resp.data); // store array
        console.log(resp.data);
      } else {
        console.log("failed");
      }}
    } catch (err) {
      console.error(err);
    } finally {
      console.log(showCategory);
    }
  };

  const deleteCateg = async (id) => {
    const useApi = await fetch(`https://stelina-1-backend.onrender.com/api/deleteCate/${id}`, {
      method: "Delete",
    });

    if (useApi.ok) {
      const items = await useApi.json();
      if (items.statuscode === 1) {
        alert("deleted");
        showCategories();
      } else {
        alert("error occured");
      }
    }
  };


  // const updateCateg = async () => {
  //   alert("working")
  // }

  return (
    <>
      <div className="main-content main-content-login">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <div className="breadcrumb-trail breadcrumbs">
                <ul className="trail-items breadcrumb">
                  <li className="trail-item trail-begin">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="trail-item trail-end active">
                    Product Category
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
          <div className="row" style={{paddingTop: "45px"}}>
            <div className="content-area col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="site-main">
                <h3 className="custom_blog_title">
                  {editmode == true ? <>Edit </> : <>Add </>}Category
                </h3>
                <div className="customer_login">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="login-item">
                        <h5 className="title-login">
                          {editmode == true ? <>Edit </> : <>Add </>} your
                          Product Category
                        </h5>
                        <form
                          className="login product-form"
                          onSubmit={addCategories}
                        >
                          <p className="form-row form-row-wide inputs-gap">
                            <label className="text">
                              {editmode == true ? (
                                <>Change category name </>
                              ) : (
                                <>Category Name </>
                              )}
                            </label>
                            <input
                              title="categoryname"
                              name="categoryname"
                              type="text"
                              required
                              className="input-text"
                              value={categoryname}
                              onChange={(e) => setcategoryname(e.target.value)}
                            />
                          </p>
                          {editmode == true ? (
                            <>
                              <p className="form-row form-row-wide">
                                <label className="oldpicLabel">Old photo</label>
                                <p>
                                  <img
                                    src={oldpic.substring(16)}
                                    alt={oldpic.substring(6)}
                                    className="oldpic"
                                  />
                                </p>
                              </p>
                            </>
                          ) : (
                            <></>
                          )}
                          <p className="form-row form-row-wide inputs-gap">
                            <label className="text">
                              {editmode == true ? (
                                <>Change category image</>
                              ) : (
                                <>Category Image</>
                              )}
                            </label>
                            <input
                              title="categoryimg"
                              name="categoryimg"
                              type="file"
                              className="input-text"
                              // value={categoryimg}
                              onChange={(e) =>
                                setcategoryimg(e.target.files[0])
                              }
                            />
                          </p>

                          {editmode == true ? (
                            <>
                              <p className="form-row">
                                <input
                                  type="submit"
                                  className="button-submit"
                                  value="Update"
                                />
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="form-row">
                                <input
                                  type="submit"
                                  className="button-submit"
                                  value="Add"
                                />
                              </p>
                            </>
                          )}
                        </form>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="login-item">
                        <div className="categoryImgSec" id="perfumesImg2"></div>
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
          <h3 className="custommenu-title-blog">Categories</h3>
          <ul className="row list-products auto-clear equal-container product-grid">
            {showCategory.map((category, index) => (
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
                          // src={`/assets/uploadCategories/${category.CategoryName + ".jpg"}`}
                          src={category.CateImgPath.substring(16)}
                          alt={category.CateImgPath}
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
                      <a href="#">{category.CategoryName.split(".")[0]}</a>
                    </h5>

                    <div className="group-info">
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
