import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const AfterOrder = () => {
  // const [orderinfo, setorderinfo] = useState([]);
  const [orders, setorders] = useState([]);
  const [orderId, setOrderId] = useState();

  const location = useLocation();
  const {fullname, email, address, phone, zipcode, payOption} = location.state || {};

  useEffect(() => {
    // deleteCart();
    myOrders();
  },[]);

  const [params] = useSearchParams();
  const uId = params.get("id");

  const myOrders = async () => {
    try {
      const useApi = await fetch(
        `https://stelina-1-backend.onrender.com/api/shoppingCartProducts/${uId}`,
        {
          method: "Get",
        }
      );

      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          // alert("your orders");
          setorders(resp.data);
          console.log(resp.data)
          setOrderId(resp.data._id)
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
    0
  );

  const addShipping = 10;
  const addTax = 5;

  const allTotal = totalPrice + addShipping + addTax;

  const billDate = new Date();
  const date = billDate.getDate();
  const month = billDate.toLocaleDateString('en-US', {month: "short"});
  const year = billDate.getFullYear();

  const idPart1 = Math.floor(Math.random()*1000)

  const idPart2 = Math.floor(Math.random()*10000000);

  // const afterOrderInfo = async () => {
    
  //   try {
  //     const useApi = await fetch(`https://stelina-1-backend.onrender.com/api/getOrderInfo/${uId}`, {
  //       method: "Get"
  //     });

  //     if(useApi.ok) {
  //       const resp = await useApi.json();
  //       if(resp.statuscode === 1) {
  //         // alert("your order summary");
  //         setorderinfo(resp.data);
  //       } else {
  //         console.log("err in fetching data about order");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error, "err in finding info from checkoutpage db")
  //   }
  // }

  const deleteCart = async () => {
    try {
      const useApi =await fetch(`https://stelina-1-backend.onrender.com/api/deleteCart/${uId}`, {
        method: "Delete"
      });
      if(useApi.ok) {
        // alert('working') 
        const resp = await useApi.json();
        if(resp.statuscode === 1) {
          alert("Thank you for shopping from us")
          
        } else {
          alert("error in deleting your whole cart");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="outer">
        <div className="inner" id="order-msg">
          <h1>Thank you for your purchase!</h1>
          <p>
            Your order will be processed within 24 hours working days.We will
            notify you by email once your order has been shipped.
          </p>
          <h4>Billing address</h4>
          <table className="bil-add-table">
            <tr>
              <th>Name</th>
              <td>{fullname}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{address},{""}{zipcode}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{email}</td>
            </tr>
          </table>
          <Link to="/" onClick={() => {
            deleteCart();
          }} id="backBtn">Back to home</Link>
        </div>

        <div className="inner" id="order-summary">
          <h3>Order Summary</h3>
          <hr />
          <div className="some-info">
            <div id="order-date">
              <p>Date</p>
              <span>{date}{" "}{month}{" "}{year}</span>
            </div>
            <div id="order-id">
              <p>Order Id</p>
              <span>{idPart1}-{idPart2}</span>
              {/* <span>{orderId}</span> */}
            </div>
            <div id="pay-method">
              <p>Payment Method</p>
              <span>{payOption}</span>
            </div>
          </div>
          <hr/>
          <div id="your-orders">
            <ul>
              {
                orders.map((item, index) =>
                  <li key={index} className="order-item">
                <div id="product-img">
                  <img
                    src={`/assets/uploadProducts/${item.scProductName + ".jpg"}`}
                    alt="item.scProductName"
                  />
                </div>
                <div id="product-name">
                  <Link>{item.scProductName}</Link>
                  <p>x{item.scProductCount}</p>
                </div>
                <div id="product-price">${item.scProductPrice}</div>
              </li>
                )
              }
              
            </ul>
          </div>
          <hr />
          <table style={{ border: "none" }}>
            <tr className="add-ons">
              <th>Sub total</th>
              <td className="add-on-prices">${totalPrice.toFixed(2)}</td>
            </tr>
            <tr className="add-ons">
              <th>Shipping</th>
              <td className="add-on-prices">${addShipping.toFixed(2)}</td>
            </tr>
            <tr className="add-ons">
              <th>Tax</th>
              <td className="add-on-prices">${addTax.toFixed(2)}</td>
            </tr>
          </table>
          <hr />
          <table style={{ border: "none", fontSize: "20px" }}>
            <tr>
              <th style={{ border: "none", fontWeight: "bold" }}>
                Order Total
              </th>
              <td style={{ border: "none" }} className="add-on-prices">
                ${allTotal.toFixed(2)}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="end-checkout-wrapp">
        <div className="end-checkout checkout-form">
          <div className="icon"></div>
          <h3 className="title-checkend">
            Congratulation! Your order has been processed.
          </h3>
          <div className="sub-title">
            Aenean dui mi, tempus non volutpat eget, molestie a orci. Nullam
            eget sem et eros laoreet rutrum. Quisque sem ante, feugiat quis
            lorem in.
          </div>
          <Link to="/" className="button btn-return">
            Return to Store
          </Link>
        </div>
</div> */
}
