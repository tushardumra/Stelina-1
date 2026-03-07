import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { useNavigate } from "react-router-dom";

export const ContactUs = () => {

  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [msg, setmsg] = useState("");

  // const {islogin,setislogin} = useContext(Context);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("user_token");
  //   if(token) {
  //     setislogin(true);
  //   } else {
  //     setislogin(false);
  //   }
  // }, []);

  const sendMsg = async (e) => {
    e.preventDefault();
    const custinfo = {name, mail, phone, country, msg};

    const useApi = await fetch("https://stelina-backend.onrender.com/api/contact", {
      method: "Post",
      body: JSON.stringify(custinfo),
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    });

    if(useApi.ok) {
      const resp = await useApi.json();
      if(resp.statuscode === 1) {
        alert("we receive your message");
        setname("");
        setmail("");
        setphone("");
        setcountry("");
        setcountry("");
        setmsg("");
      } else {
        alert("error occured");
      }
    }
  }

  return (
    <>
      <div className="main-content main-content-contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-trail breadcrumbs">
                <ul className="trail-items breadcrumb">
                  <li className="trail-item trail-begin">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="trail-item trail-end active">Contact us</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="content-area content-contact col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="site-main">
                <h3 className="custom_blog_title">Contact us</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="page-main-content">
          <div className="google-map">
            <iframe
              width="100%"
              height="500"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-contact">
                  <div className="col-lg-8 no-padding">
                    <div className="form-message">
                      <h2 className="title">Send us a Message!</h2>
                      <form action="#" className="stelina-contact-fom" onSubmit={sendMsg}>
                        <div className="row">
                          <div className="col-sm-6">
                            <p>
                              <span className="form-label">Your Name *</span>
                              <span className="form-control-wrap your-name">
                                <input
                                  title="your-name"
                                  type="text"
                                  name="your-name"
                                  size="40"
                                  className="form-control form-control-name"
                                  required
                                  value={name}
                                  onChange={(e)=> setname(e.target.value)}
                                />
                              </span>
                            </p>
                          </div>
                          <div className="col-sm-6">
                            <p>
                              <span className="form-label">Your Email *</span>
                              <span className="form-control-wrap your-email">
                                <input
                                  title="your-email"
                                  type="email"
                                  name="your-email"
                                  size="40"
                                  className="form-control form-control-email"
                                  required
                                  value={mail}
                                  onChange={(e)=> setmail(e.target.value)}
                                />
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <p>
                              <span className="form-label">Phone</span>
                              <span className="form-control-wrap your-phone">
                                <input
                                  title="your-phone"
                                  type="text"
                                  name="your-phone"
                                  className="form-control form-control-phone"
                                  required
                                  value={phone}
                                  onChange={(e)=> setphone(e.target.value)}
                                />
                              </span>
                            </p>
                          </div>
                          <div className="col-sm-6">
                            <p>
                              <span className="form-label">Country</span>
                              <span className="form-control-wrap your-company">
                                <input
                                  title="your-country"
                                  type="text"
                                  name="your-country"
                                  className="form-control your-company"
                                  required
                                  value={country}
                                  onChange={(e)=> setcountry(e.target.value)}
                                />
                              </span>
                            </p>
                          </div>
                        </div>
                        <p>
                          <span className="form-label">Your Message</span>
                          <span className="wpcf7-form-control-wrap your-message">
                            <textarea
                              title="your-message"
                              name="your-message"
                              cols="40"
                              rows="9"
                              className="form-control your-textarea"
                              required
                              value={msg}
                              onChange={(e)=> setmsg(e.target.value)}
                            ></textarea>
                          </span>
                        </p>
                        <p>
                            <input
                              type="submit"
                              value="SEND MESSAGE"
                              className="form-control-submit button-submit"
                            />
                          </p>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-4 no-padding">
                    <div className="form-contact-information">
                      <form action="#" className="stelina-contact-info">
                        <h2 className="title">Contact information</h2>
                        <div className="info">
                          <div className="item address">
                            <span className="icon"></span>
                            <span className="text">
                              Restfield White City London G12 Ariel Way - United
                              Kingdom
                            </span>
                          </div>
                          <div className="item phone">
                            <span className="icon"></span>
                            <span className="text">(+800) 123 456 7890</span>
                          </div>
                          <div className="item email">
                            <span className="icon"></span>
                            <span className="text">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="9df4f3fbf2ddeee9f8f1f4f3fcf2e8e9fbf4e9b3fef2b3e8f6"
                              >
                                [email&#160;protected]
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="socials">
                          <a href="#" className="social-item" target="_blank">
                            <span className="icon fa fa-facebook"></span>
                          </a>
                          <a href="#" className="social-item" target="_blank">
                            <span className="icon fa fa-twitter-square"></span>
                          </a>
                          <a href="#" className="social-item" target="_blank">
                            <span className="icon fa fa-instagram"></span>
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="footer style7">
        <div className="container">
          <div className="container-wapper">
            <div className="row">
              <div className="box-footer col-xs-12 col-sm-4 col-md-4 col-lg-4 hidden-sm hidden-md hidden-lg">
                <div className="stelina-newsletter style1">
                  <div className="newsletter-head">
                    <h3 className="title">Newsletter</h3>
                  </div>
                  <div className="newsletter-form-wrap">
                    <div className="list">
                      Sign up for our free video course and <br /> urban garden
                      inspiration
                    </div>
                    <input
                      type="email"
                      className="input-text email email-newsletter"
                      placeholder="Your email letter"
                    />
                    <button className="button btn-submit submit-newsletter">
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
              <div className="box-footer col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <div className="stelina-custommenu default">
                  <h2 className="widgettitle">Quick Menu</h2>
                  <ul className="menu">
                    <li className="menu-item">
                      <a href="#">New arrivals</a>
                    </li>
                    <li className="menu-item">
                      <a href="#">Life style</a>
                    </li>
                    <li className="menu-item">
                      <a href="#">Accents</a>
                    </li>
                    <li className="menu-item">
                      <a href="#">Tables</a>
                    </li>
                    <li className="menu-item">
                      <a href="#">Dining</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="box-footer col-xs-12 col-sm-4 col-md-4 col-lg-4 hidden-xs">
                <div className="stelina-newsletter style1">
                  <div className="newsletter-head">
                    <h3 className="title">Newsletter</h3>
                  </div>
                  <div className="newsletter-form-wrap">
                    <div className="list">
                      Sign up for our free video course and <br /> urban garden
                      inspiration
                    </div>
                    <input
                      type="email"
                      className="input-text email email-newsletter"
                      placeholder="Your email letter"
                    />
                    <button className="button btn-submit submit-newsletter">
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
              <div className="box-footer col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <div className="stelina-custommenu default">
                  <h2 className="widgettitle">Information</h2>
                  <ul className="menu">
                    <li className="menu-item">
                      <a href="#">FAQs</a>
                    </li>
                    <li className="menu-item">
                      <a href="#">Track Order</a>
                    </li>
                    <li className="menu-item">
                      <a href="#">Delivery</a>
                    </li>
                    <li className="menu-item">
                      <a href="#">Contact Us</a>
                    </li>
                    <li className="menu-item">
                      <a href="#">Return</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-end">
              <div className="row">
                <div className="col-sm-12 col-xs-12">
                  <div className="stelina-socials">
                    <ul className="socials">
                      <li>
                        <a href="#" className="social-item" target="_blank">
                          <i className="icon fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-item" target="_blank">
                          <i className="icon fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-item" target="_blank">
                          <i className="icon fa fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="coppyright">
                    Copyright © 2020
                    <a href="#">Stelina</a>. All rights reserved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
      {/* <div className="footer-device-mobile">
        <div className="wapper">
          <div className="footer-device-mobile-item device-home">
            <a href="index.html">
              <span className="icon">
                <i className="fa fa-home" aria-hidden="true"></i>
              </span>
              Home
            </a>
          </div>
          <div className="footer-device-mobile-item device-home device-wishlist">
            <a href="#">
              <span className="icon">
                <i className="fa fa-heart" aria-hidden="true"></i>
              </span>
              Wishlist
            </a>
          </div>
          <div className="footer-device-mobile-item device-home device-cart">
            <a href="#">
              <span className="icon">
                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                <span className="count-icon">0</span>
              </span>
              <span className="text">Cart</span>
            </a>
          </div>
          <div className="footer-device-mobile-item device-home device-user">
            <a href="#">
              <span className="icon">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
              Account
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
};
