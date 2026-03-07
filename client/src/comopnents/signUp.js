import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUpPage = () => {

  const navigate = useNavigate();

  const [mailId, setmailId] = useState("");
  const [uname, setuname] = useState("");
  const [phone, setphone] = useState("");
  const [pwd, setpwd] = useState("");

  const register = async (e)=> {
    e.preventDefault()
    const userinfo = {mailId, uname, phone, pwd};
    const useApi = await fetch("https://stelina-backend.onrender.com/api/signup", {
      method: "Post",
      body: JSON.stringify(userinfo),
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });

    if (useApi) {
      const resp = await useApi.json();
      if(resp.statuscode === 1) {
        alert("sign sucessfully");
        localStorage.setItem("user_name", JSON.stringify(resp.UserName));
        navigate("/login")
      } else {
        alert("error occured");
      }
    }
  } 

  return (
    <>
      <div className="main-content main-content-login">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-trail breadcrumbs">
                <ul className="trail-items breadcrumb">
                  <li className="trail-item trail-begin">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="trail-item trail-end active">Authentication</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="content-area col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="site-main">
                <h3 className="custom_blog_title">Authentication</h3>
                <div className="customer_login">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="login-item">

                        <div className="welcome" id="signUpimg">
                          <div className="bgimg"></div>
                          {/* <h1>Welcome</h1>
                          <h4>To Your Perfume Store</h4>
                          <h3>Stelina</h3>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Necessitatibus, quisquam voluptatibus ullam
                            aut vel mollitia officiis eius vero praesentium
                            quaerat voluptatem dolor cum doloremque ratione,
                            sequi voluptas cumque molestiae et.
                          </p> */}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="login-item">
                        <h5 className="title-login">Register now</h5>
                        <form className="register"  onSubmit={register}>
                          <p className="form-row form-row-wide">
                            <label className="text">Name</label>
                            <input
                              title="name"
                              type="text"
                              autoComplete="off"
                              className="input-text"
                              value={uname}
                              onChange={(e)=> setuname(e.target.value)}
                            />
                          </p>
                          <p className="form-row form-row-wide">
                            <label className="text">Phone</label>
                            <input
                              title="phone"
                              type="text"
                              autoComplete="off"
                              className="input-text"
                              maxLength={10}
                              minLength={10}
                              value={phone}
                              onChange={(e)=> setphone(e.target.value)}
                            />
                          </p>
                          <p className="form-row form-row-wide">
                            <label className="text">Email</label>
                            <input
                              title="email"
                              type="email"
                              className="input-text"
                              value={mailId}
                              onChange={(e)=> setmailId(e.target.value)}
                            />
                          </p>
                          
                          <p className="form-row form-row-wide">
                            <label className="text">Password</label>
                            <input
                              title="pass"
                              type="password"
                              className="input-text"
                              value={pwd}
                              onChange={(e)=> setpwd(e.target.value)}
                            />
                          </p>
                          <p className="form-row">
                            <span className="inline">
                              {/* <input type="checkbox" id="cb2" /> */}
                              <label for="cb2" className="label-text">
                                I agree to <span>Terms & Conditions</span>
                              </label>
                            </span>
                          </p>
                          <p className="" style={{display: "flex",justifyContent: "space-between"}}>
                            <input
                              type="submit"
                              className="button-submit"
                              value="Register Now"
                            />
                            <Link style={{fontWeight: "bold"}} to="/login">Back to Login</Link>
                          </p>
                        </form>
                        {/* <div className="welcome">
                      <h1>Welcome Back</h1>
                      <h4>To Your Perfume Store</h4>
                      <h3>Stelina</h3>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, quisquam voluptatibus ullam aut vel mollitia officiis eius vero praesentium quaerat voluptatem dolor cum doloremque ratione, sequi voluptas cumque molestiae et.</p>
                    </div> */}
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
