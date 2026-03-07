import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "./context";

export const ShoppingCart = () => {
  const [cartList, setcartList] = useState([]);
  // const [productId, setproductId] = useState("");

  const { userid } = useContext(Context);
  // const {setcartid} = useContext(Context);

  const [params] = useSearchParams();
  const uId = params.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    showCartList();
  }, []);

  const showCartList = async () => {
    try {
      const useApi = await fetch(
        `https://stelina-backend.onrender.com/api/shoppingCartProducts/${uId}`,
        {
          method: "Get",
        },
      );

      const resp = await useApi.json();

      if (resp.statuscode === 1) {
        // console.log(resp.data[0]._id);
        setcartList(resp.data);
        // setprodQty(resp.data);
        // console.log(resp.data);
      } else {
        alert("error in fetching products for cart");
      }
    } catch (error) {
      console.log(error, "in fetching cart list data");
    }
  };

  // const increaseQty = (id, change) => {
  //   setcartList((prev) =>
  //     prev.map((item) =>
  //       item.scProductId === id
  //         ? { ...item, scProductCount: item.scProductCount + change }
  //         : item,
  //     ),
  //   );
  // };

  // const decreaseQty = (id, change) => {
  //   setcartList((prev) =>
  //     prev.map((item) =>
  //       item.scProductId === id && item.scProductCount > 1
  //         ? { ...item, scProductCount: item.scProductCount - change }
  //         : item,
  //     ),
  //   );
  // };

  const removeItem = async (id) => {
    try {
      const useApi = await fetch(`https://stelina-backend.onrender.com/api/deleteItem/${id}`, {
        method: "Delete",
      });

      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          alert("remove from cart");
          showCartList();
        } else {
          alert("error in removing item from cart");
        }
      }
    } catch (error) {
      console.log(error, "in deleting item from cart");
    }
  };

  let newQuantity;
  function handleQuantityChange(index, change) {
    const newCartData = [...cartList];
    newQuantity = newCartData[index].scProductCount + change;

    if (newQuantity < 1) return;
    newCartData[index].scProductCount = newQuantity;
    setcartList(newCartData);
  }

  // console.log(cartList);

  // const updateCartQty = () => {
  //   alert('working')
  //   navigate(`/checkoutpage?id=${userid}`, {
  //     $state: {newQuantity}
  //   })
  // }

  const updateAllCartQty = async () => {
    try {
      const useApi = await fetch(
        `https://stelina-backend.onrender.com/api/cart/update-all/${userid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: cartList.map((item) => ({
              _id: item._id,
              scProductCount: item.scProductCount,
            })),
          }),
        },
      );

      const resp = await useApi.json();

      if (resp.statuscode === 1) {
        navigate(`/checkoutpage?id=${userid}`, {
          state: { cartList },
        });
      } else {
        alert("Error updating cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const totalPrice = cartList.reduce(
    (sum, item) => sum + item.scProductPrice * item.scProductCount,
    0,
  );

  return (
    <>
      <div class="site-content">
        <main class="site-main  main-container no-sidebar">
          <div class="container">
            <div class="breadcrumb-trail breadcrumbs">
              <ul class="trail-items breadcrumb">
                <li class="trail-item trail-begin">
                  <a href="">
                    <span>Home</span>
                  </a>
                </li>
                <li class="trail-item trail-end active">
                  <span>Shopping Cart</span>
                </li>
              </ul>
            </div>
            <div class="row">
              <div class="main-content-cart main-content col-sm-12">
                <h3 class="custom_blog_title">Shopping Cart</h3>
                <div class="page-main-content">
                  <div class="shoppingcart-content">
                    <form action="shoppingcart.html" class="cart-form">
                      <table class="shop_table">
                        <thead>
                          <tr>
                            <th class="product-remove"></th>
                            <th class="product-thumbnail"></th>
                            <th class="product-name"></th>
                            <th class="product-price"></th>
                            <th class="product-quantity"></th>
                            <th class="product-subtotal"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartList.map((product, index) => (
                            <tr key={index} class="cart_item">
                              <td class="product-remove">
                                <a href="#" class="remove"></a>
                              </td>
                              <td class="product-thumbnail">
                                <a href="#">
                                  <img
                                    src={`/assets/uploadProducts/${
                                      product.scProductName + ".jpg"
                                    }`}
                                    alt={product.scProductName}
                                    class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"
                                  />
                                </a>
                              </td>
                              <td class="product-name" data-title="Product">
                                <a href="#" class="title">
                                  {product.scProductName}
                                </a>
                                <span class="attributes-select attributes-color">
                                  Black,
                                </span>
                                <span class="attributes-select attributes-size">
                                  XXL
                                </span>
                              </td>
                              <td
                                class="product-quantity"
                                data-title="Quantity"
                              >
                                <div class="quantity">
                                  <div class="control">
                                    <a
                                      onClick={(e) => {
                                        e.preventDefault();
                                        {
                                          handleQuantityChange(index, -1);
                                        }
                                      }}
                                      class="btn-number qtyminus quantity-minus"
                                      href="#"
                                    >
                                      -
                                    </a>
                                    <span class="input-qty qty">
                                      {product.scProductCount}
                                    </span>
                                    <a
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleQuantityChange(index, 1);
                                      }}
                                      href="#"
                                      class="btn-number qtyplus quantity-plus"
                                    >
                                      +
                                    </a>
                                  </div>
                                </div>
                              </td>
                              <td class="product-price" data-title="Price">
                                <span class="woocommerce-Price-amount amount">
                                  <span class="woocommerce-Price-currencySymbol">
                                    $
                                  </span>
                                  {(
                                    product.scProductPrice *
                                    product.scProductCount
                                  ).toFixed(2)}
                                </span>
                              </td>
                              <td class="product-remove">
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeItem(product.scProductId);
                                  }}
                                  class="remove"
                                ></a>
                              </td>
                            </tr>
                          ))}

                          <tr style={{display: "flex", justifyContent: "flex-end"}}>
                            <td class="actions">
                              <div class="coupon">
                                <label class="coupon_code">Coupon Code:</label>
                                <input
                                  type="text"
                                  class="input-text"
                                  placeholder="Promotion code here"
                                />
                                <a href="#" class="button"></a>
                              </div>
                              <div class="order-total">
                                <span class="title">Total Price:</span>{" "}
                                <span class="total-price">
                                  ${totalPrice.toFixed(2)}
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                    <div class="control-cart">
                      <Link to="/" class="button btn-continue-shopping">
                        Continue Shopping
                      </Link>
                      <Link
                        to={`/checkoutpage?id=${userid}`}
                        onClick={(e) => {
                          e.preventDefault();
                          updateAllCartQty();
                        }}
                        class="button btn-cart-to-checkout"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
