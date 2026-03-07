import { Route, Routes } from "react-router-dom";
import { MainPage } from "./main";
import { LoginPage } from "./login";
import { SignUpPage } from "./signUp";
import { ContactUs } from "./contactUs";
import { BlogGridPage } from "./blogGrid";
import { BlogListPage } from "./blogList";
import { BlogListSidebar } from "./blogListSidebar";
import { PostLeftSide } from "./postLeftSide";
import { PostRightSide } from "./postRightSide";
// import { AddCategory } from "./addCategory";
// import { AddProduct } from "./addProduct";
import { ProductByCategory } from "./productsByCategory";
import { ProductsList } from "./wishList";
import { ProductDetails } from "./productDetails";
import { AboutPage } from "./about";
import { ShoppingCart } from "./shoppingCart";
import { ShopPage } from "./shopPage";
import { CheckoutPage } from "./checkout";
import { AfterOrder } from "./afterOrder";
import { AdminDashboard } from "./adminDashboard";
// import { AdminPage, AdminPage2 } from "./adminPage";
import { Orders } from "./orders";
import { Reports } from "./reports";
import { Messages } from "./messages";
import { Customers } from "./customers";

export const SiteRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<MainPage />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/aboutpage" element={<AboutPage />} />
          <Route path="/allProductShopPage" element={<ShopPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
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
        {/* <Route path="/" element={<MainPage/>}/> */}

        {/* <Route path="/addCategory" element={<AddCategory/>}/>
        <Route path="/addProduct" element={<AddProduct/>} /> */}
        {/* Admin Layout */}
        {/* <Route path="/adminPage2" element={<AdminPage2 />}>
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="adminOrders" element={<Orders />} />
          <Route path="adminReports" element={<Reports />} />
          <Route path="adminMessages" element={<Messages />} />
          <Route path="customersData" element={<Customers />} />
        </Route> */}

        {/* <Route path="/adminPage2" element={<AdminPage2/>}/> */}
      </Routes>
    </>
  );
};
