import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const CheckoutPage = () => {
  const [orders, setorders] = useState([]);

  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [products, setproducts] = useState("");

  const [payOption, setpayOption] = useState("Cash On Delivery");
  const handleOptionChange = (e) => {
    setpayOption(e.target.value);
  };

  const [cardNo, setcardNo] = useState("");

  const [cardMonth, setcardMonth] = useState("");
  const [cardYear, setcardYear] = useState("");
  const [cardCVV, setcardCVV] = useState("");
  // const [total, settotal] = useState("");

  const { userid } = useContext(Context);

  const [params] = useSearchParams();
  const uId = params.get("id");

  // const location = useLocation();
  // const {newQuantity} = location.state || {};
  // console.log(newQuantity)

  const navigate = useNavigate();

  useEffect(() => {
    myOrders();
    
  }, []);

  const myOrders = async () => {
    try {
      const useApi = await fetch(
        `https://stelina-1-backend.onrender.com/api/shoppingCartProducts/${uId}`,
        {
          method: "Get",
        },
      );

      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          // alert("your orders");
          setorders(resp.data);
          const prodNames = resp.data.map(item => item.scProductName);
          console.log(prodNames)
          setproducts(prodNames);
        } else {
          alert("error in showing your orders");
        }
      }
    } catch (error) {
      console.log(error, "in fetching orders data from shopping cart db");
    }
  };

  const totalPrice = orders.reduce(
    (sum, item) => sum + item.scProductPrice * item.scProductCount,
    0,
  );

  console.log(totalPrice);

  const confirmOrder = async () => {
    try {
      const checkoutInfo = {
        userid,
        fullname,
        email,
        address,
        phone,
        zipcode,
        products,
        payOption,
        cardNo,
        cardMonth,
        cardYear,
        cardCVV,
        totalPrice,
      };

      const useApi = await fetch("https://stelina-1-backend.onrender.com/api/checkout", {
        method: "Post",
        body: JSON.stringify(checkoutInfo),
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });

      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          alert("Your Order is Confirmed");
          setfullname("");
          setemail("");
          setaddress("");
          setphone("");
          setzipcode("");
          setpayOption("");
          setcardNo("");
          setcardMonth("");
          setcardYear("");
          setcardCVV("");
          
          navigate(`/afterOrderPage?id=${uId}`, {
            state: {fullname, email, address, phone, zipcode, payOption}
          })
        } else {
          alert("error in confirming order");
        }
      }
    } catch (error) {
      console.log(error, "err in sending shipping address to database");
    }
  };

  

  return (
    <>
      <div className="main-content main-content-checkout">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-trail breadcrumbs">
                <ul className="trail-items breadcrumb">
                  <li className="trail-item trail-begin">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="trail-item trail-end active">Checkout</li>
                </ul>
              </div>
            </div>
          </div>
          <h3 className="custom_blog_title">Checkout</h3>
          <div className="checkout-wrapp">
            <div className="shipping-address-form-wrapp">
              <div className="shipping-address-form  checkout-form">
                <div className="row-col-1 row-col">
                  <div className="shipping-address">
                    <h3 className="title-form">Shipping Address</h3>
                    <p className="form-row form-row-first">
                      <label className="text">Full Name</label>
                      <input
                        title="fullname"
                        type="text"
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                        className="input-text"
                      />
                    </p>
                    <p className="form-row form-row-last">
                      <label className="text">Email</label>
                      <input
                        title="email"
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="input-text"
                      />
                    </p>
                    {/* <p className="form-row forn-row-col forn-row-col-1">
                      <label className="text">Country</label>
                      <select
                        title="country"
                        data-placeholder="United Kingdom"
                        className="chosen-select"
                        tabindex="1"
                        value={country}
                        onChange={(e) => setcountry(e.target.value)}
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Aland Islands">Aland Islands</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                      </select>
                    </p>
                    <p className="form-row forn-row-col forn-row-col-2">
                      <label className="text">State</label>
                      <select
                        title="state"
                        data-placeholder="London"
                        className="chosen-select"
                        tabindex="1"
                        value={state}
                        onChange={(e) => setstate(e.target.value)}
                      >
                        <option value="United States">London</option>
                        <option value="United Kingdom">tokyo</option>
                        <option value="Afghanistan">Seoul</option>
                        <option value="Aland Islands">Mexico city</option>
                        <option value="Albania">Mumbai</option>
                        <option value="Algeria">Delhi</option>
                        <option value="American Samoa">New York</option>
                        <option value="Andorra">Jakarta</option>
                        <option value="Angola">Sao Paulo</option>
                        <option value="Anguilla">Osaka</option>
                        <option value="Antarctica">Karachi</option>
                        <option value="Antigua and Barbuda">Matx-cơ-va</option>
                        <option value="Argentina">Toronto</option>
                        <option value="Armenia">Boston</option>
                      </select>
                    </p>
                    <p className="form-row forn-row-col forn-row-col-3">
                      <label className="text">City</label>
                      <select
                        title="city"
                        data-placeholder="London"
                        className="chosen-select"
                        tabindex="1"
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                      >
                        <option value="United States">London</option>
                        <option value="United Kingdom">tokyo</option>
                        <option value="Afghanistan">Seoul</option>
                        <option value="Aland Islands">Mexico city</option>
                        <option value="Albania">Mumbai</option>
                        <option value="Algeria">Delhi</option>
                        <option value="American Samoa">New York</option>
                        <option value="Andorra">Jakarta</option>
                        <option value="Angola">Sao Paulo</option>
                        <option value="Anguilla">Osaka</option>
                        <option value="Antarctica">Karachi</option>
                        <option value="Antigua and Barbuda">Matx-cơ-va</option>
                        <option value="Argentina">Toronto</option>
                        <option value="Armenia">Boston</option>
                      </select>
                    </p> */}

                    <p className="form-row form-row">
                      <label className="text">Address</label>
                      <textarea
                        title="address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        style={{ width: "100%", borderRadius: "25px" }}
                      ></textarea>
                    </p>
                    <p className="form-row form-row-first">
                      <label className="text">Phone</label>
                      <input
                        title="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                        className="input-text"
                        maxLength={10}
                        minLength={10}
                      />
                    </p>

                    <p className="form-row form-row-last">
                      <label className="text">Zip code</label>
                      <input
                        title="zip"
                        type="text"
                        value={zipcode}
                        onChange={(e) => setzipcode(e.target.value)}
                        className="input-text"
                        maxLength={6}
                        minLength={6}
                      />
                    </p>
                    <h3 className="title-form">Payment Method</h3>

                    <p className="form-row form-row-first">
                      <label>
                        <input
                          type="radio"
                          name="paymentopt"
                          value={"Prepaid"}
                          checked={payOption === "Prepaid"}
                          onChange={handleOptionChange}
                        />
                        <span style={{ marginLeft: "10px" }}>Prepaid</span>
                      </label>
                    </p>
                    <p className="form-row form-row-last">
                      <label className="option">
                        <input
                          type="radio"
                          name="paymentopt"
                          value={"Cash On Delivery"}
                          checked={payOption === "Cash On Delivery"}
                          onChange={handleOptionChange}
                        />
                        <span style={{ marginLeft: "10px" }}>
                          Cash On Delivery
                        </span>
                      </label>
                    </p>

                    {payOption === "Prepaid" ? (
                      <>
                        <div className="row-col-1 row-col">
                          <div className="payment-method">
                            <div className="group-button-payment">
                              <a href="#" className="button btn-credit-card">
                                Credit Card
                              </a>
                              <a href="#" className="button btn-paypal">
                                paypal
                              </a>
                            </div>
                            <p className="form-row form-row-card-number">
                              <label className="text">Card number</label>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="xxx - xxx - xxx - xxx"
                                maxLength={16}
                                minLength={16}
                                value={cardNo}
                                onChange={(e) => setcardNo(e.target.value)}
                              />
                            </p>
                            <p className="form-row forn-row-col forn-row-col-1">
                              <label className="text">Month</label>
                              <select
                                title="month"
                                data-placeholder="01"
                                className="chosen-select"
                                tabindex="1"
                                value={cardMonth}
                                onChange={(e) => setcardMonth(e.target.value)}
                              >
                                <option value="00">Month</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                              </select>
                            </p>
                            <p className="form-row forn-row-col forn-row-col-2">
                              <label className="text">Year</label>
                              <select
                                title="Year"
                                data-placeholder="2017"
                                className="chosen-select"
                                tabindex="1"
                                value={cardYear}
                                onChange={(e) => setcardYear(e.target.value)}
                              >
                                <option value="0000">Year</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                                <option value="2033">2033</option>
                                <option value="2034">2034</option>
                                <option value="2035">2035</option>
                              </select>
                            </p>
                            <p className="form-row forn-row-col forn-row-col-3">
                              <label className="text">CVV</label>
                              <input
                                type="number"
                                value={cardCVV}
                                onChange={(e) => setcardCVV(e.target.value)}
                                maxLength={3}
                                minLength={3}
                                style={{
                                  width: "60px",
                                  height: "20px",
                                  padding: "11px 0",
                                  border: "1px solid #dadada",
                                }}
                                className="chosen-select"
                              />
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>
                          In Cash on Delivery your order take 1 week to reach
                          your place.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="row-col-2 row-col">
                  <div className="your-order">
                    <h3 className="title-form">Your Order</h3>
                    <ul className="list-product-order">
                      {orders.map((product, index) => (
                        <li key={index} className="product-item-order">
                          <div className="product-thumb">
                            <a href="#">
                              <img
                                src={`/assets/uploadProducts/${
                                  product.scProductName + ".jpg"
                                }`}
                                alt={product.scProductName}
                              />
                            </a>
                          </div>
                          <div className="product-order-inner">
                            <h5 className="product-name">
                              <a href="#">{product.scProductName}</a>
                            </h5>
                            {/* <span className="attributes-select attributes-color">
                              Black,
                            </span>
                            <span className="attributes-select attributes-size">
                              XXL
                            </span> */}
                            <div className="price">
                              ${product.scProductPrice}
                              <span className="count">
                                x{product.scProductCount}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="order-total">
                      <span className="title">Total Price:</span>{" "}
                      <span className="total-price">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                
                className="button button-payment"
                onClick={confirmOrder}
              >
                Confirm Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
