import "./App.css";
// import { Header } from "./comopnents/header";
// import { Footer } from "./comopnents/footer";
// import { SiteRoutes } from "./comopnents/siteRoutes";
// import { AdminPage } from "./comopnents/admin";
import { useEffect, useState } from "react";
import { Context } from "./comopnents/context";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AdminDashboard } from "./comopnents/adminDashboard";
// import { AdminPage2 } from "./comopnents/adminPage";
import { AdminLayout } from "./comopnents/AdminLayout";
import { Orders } from "./comopnents/orders";
import { Reports } from "./comopnents/reports";
import { Messages } from "./comopnents/messages";
import { Customers } from "./comopnents/customers";
import { PublicLayout } from "./comopnents/PublicLayout";
import { MainPage } from "./comopnents/main";
import { AboutPage } from "./comopnents/about";
import { ShopPage } from "./comopnents/shopPage";
import { ContactUs } from "./comopnents/contactUs";
import { LoginPage } from "./comopnents/login";
import { SignUpPage } from "./comopnents/signUp";
import { BlogGridPage } from "./comopnents/blogGrid";
import { BlogListPage } from "./comopnents/blogList";
import { BlogListSidebar } from "./comopnents/blogListSidebar";
import { PostLeftSide } from "./comopnents/postLeftSide";
import { PostRightSide } from "./comopnents/postRightSide";
import { ProductByCategory } from "./comopnents/productsByCategory";
import { ProductsList } from "./comopnents/wishList";
import { ProductDetails } from "./comopnents/productDetails";
import { ShoppingCart } from "./comopnents/shoppingCart";
import { CheckoutPage } from "./comopnents/checkout";
import { AfterOrder } from "./comopnents/afterOrder";
import { AdminPage2 } from "./comopnents/adminPage";
import { AddCategory } from "./comopnents/addCategory";
import { AddProduct } from "./comopnents/addProduct";
import { AdminManage } from "./comopnents/adminManage";
import { AdminRoute } from "./comopnents/adminRoute";
import HomeSlider from "./comopnents/homeSlider";

function App() {
  const [usertype, setusertype] = useState("");
  const [userid, setuserid] = useState("");
  const [userName, setuserName] = useState("");
  const [islogin, setislogin] = useState(false);
  // const [cartid, setcartid] = useState("");
  // const [totalPrice, settotalPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      let token = localStorage.getItem("user_token");

      if (token) {
        console.log("token is here");
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = parts[1];
          const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
          const tokenStr = atob(base64);
          const final = JSON.parse(tokenStr);
          console.log(final);
          console.log("my usertype is", final.usertype);
          setusertype(final.userRole);
          setuserid(final.id);
          setuserName(final.username);
          console.log("my userid is", final.id);
          const currentTime = Date.now() / 1000;
          console.log(currentTime);
          if (final.exp < currentTime) {
            localStorage.clear();
            navigate("/login");
            alert("session expired");
            // window.location.reload();
          }
        }
      }
    }, 1000);
  }, []);

//   useEffect(() => {

//   const checkSession = async () => {
//     const token = localStorage.getItem("user_token");

//     if (!token) return;

//     const res = await fetch("https://stelina-backend.onrender.com/api/verify-session", {
//       headers: {
//         Authorization: `Bearer ${JSON.parse(token)}`
//       }
//     });

//     const data = await res.json();

//     // 🔥 SESSION INVALID
//     if (data.statuscode === -1) {
//       localStorage.clear();
//       setislogin(false);
//       setusertype("");
//       navigate("/login");
//       alert("Session expired or role changed");
//     }

//     // 🔥 SESSION VALID (sync role with DB)
//     if (data.statuscode === 1) {
//       setusertype(data.role);
//       setuserName(data.username);
//       setislogin(true);
//     }
//   };

//   checkSession(); // run once immediately
//   const interval = setInterval(checkSession, 5000); // every 5 sec

//   return () => clearInterval(interval);

// }, []);


  return (
    <>
      <Context.Provider
        value={{
          usertype,
          setusertype,
          islogin,
          setislogin,
          userid,
          setuserid,
          userName,
          setuserName,
        }}
      >
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/homeSlider" element={<HomeSlider/>}/>
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/aboutpage" element={<AboutPage />} />
            <Route path="allProductShopPage" element={<ShopPage />} />
            <Route path="contactUs" element={<ContactUs />} />
            <Route path="/bloggridView" element={<BlogGridPage />} />
            <Route path="/bloglistView" element={<BlogListPage />} />
            <Route path="/bloglistSiderbar" element={<BlogListSidebar />} />
            <Route path="/postleftSideView" element={<PostLeftSide />} />
            <Route path="/postrightSideView" element={<PostRightSide />} />
            <Route path="/productsGridView" element={<ProductByCategory />} />
            <Route path="/wishlist" element={<ProductsList />} />
            <Route path="/productDetailedView" element={<ProductDetails />} />

            <Route path="/shoppingCart" element={<ShoppingCart />} />

            <Route path="/checkoutpage" element={<CheckoutPage />} />
            <Route path="/afterOrderPage" element={<AfterOrder />} />
          </Route>

          <Route path="/admin" element={usertype === "admin" ? <AdminLayout/> : <LoginPage/>}>
            <Route index element={<AdminDashboard/>} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addCategory" element={<AddCategory/>}/>
            <Route path="addProduct" element={<AddProduct/>}/>
            {/* <Route path="addProduct" element={<AddProduct/>}/> */}
            <Route path="reports" element={<Reports />} />
            <Route path="messages" element={<Messages />} />
            <Route path="customers" element={<Customers />} />
            <Route path="adminManage" element={<AdminManage/>}/>
          </Route>
        </Routes>

        {/* <SiteRoutes />
        <Footer /> */}
      </Context.Provider>
    </>
  );
}

export default App;
