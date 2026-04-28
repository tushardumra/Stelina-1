import { useContext, useState } from "react";
import { Context } from "./context";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { setislogin, setusertype, setuserid } = useContext(Context);

  const [mail, setmail] = useState("");
  const [pwd, setpwd] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const userinfo = { mail, pwd };
    const useApi = await fetch("https://stelina-1-backend.onrender.com/api/login", {
      method: "Post",
      body: JSON.stringify(userinfo),
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });

    if (useApi.ok) {
      const resp = await useApi.json();

      if (resp.statuscode === 1) {
        alert("login successfully");
        const role = resp.userInfo.UserType;
        // const role = resp.userRole;
        setusertype(role);
        setislogin(true);
        sessionStorage.setItem("db_id", JSON.stringify(resp.userInfo._id));
        localStorage.setItem("user_token", JSON.stringify(resp.authToken));
        localStorage.setItem(
          "user_name",
          JSON.stringify(resp.userInfo.UserName),
        );
        // setuserid(resp.userInfo._id);
        setuserid(resp.userId)
        localStorage.setItem("role", role);
        console.log(role)
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else if (resp.statuscode === 0) {
        alert(resp.msg);
      } else {
        alert("cridential mismatch");
      }
    }
  };

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
                  <li className="trail-item trail-end active">
                    Authentication
                  </li>
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
                        <h5 className="title-login">Login your Account</h5>
                        <form className="login">
                          <p className="form-row form-row-wide">
                            <label className="text">Email</label>
                            <input
                              title="email"
                              type="email"
                              className="input-text"
                              onChange={(e) => setmail(e.target.value)}
                            />
                          </p>
                          <p className="form-row form-row-wide">
                            <label className="text">Password</label>
                            <input
                              title="password"
                              type="password"
                              className="input-text"
                              onChange={(e) => setpwd(e.target.value)}
                            />
                          </p>
                          <p className="lost_password">
                            <span className="inline">
                              {/* <input type="checkbox" id="cb1" /> */}
                              <label for="cb1" className="label-text">
                                Remember me
                              </label>
                            </span>
                            <a href="#" className="forgot-pw">
                              Forgot password?
                            </a>
                          </p>
                          <p className="form-row" style={{display: "flex", justifyContent: "space-between"}}>
                            <input
                              type="submit"
                              className="button-submit"
                              value="login"
                              onClick={login}
                            />
                            <Link style={{fontWeight: "bold"}} to="/signUp">New Customer</Link>
                          </p>
                        
                        </form>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="login-item">
                        <div className="welcome" id="loginImg">
                          {/* <h1>Welcome Back</h1>
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
