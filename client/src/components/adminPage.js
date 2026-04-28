import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ArchiveRestore,
  ChartLine,
  ChevronDown,
  Grid2X2Plus,
  LayoutDashboard,
  Mail,
  ShoppingBag,
  SquareMenu,
  Store,
  StoreIcon,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { SiteRoutes } from "./siteRoutes";

export const AdminPage2 = () => {
  const [userState, setuserState] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [isactive, setIsactive] = useState(false);

  const { userName } = useContext(Context);
  const navigate = useNavigate();

  const { usertype } = useContext(Context);

  const location = useLocation();

  useEffect(() => {
    if (usertype == "admin") {
      const token = localStorage.getItem("user_token");
      if (token !== "") {
        setuserState("loggedIn");
      } else {
        setuserState("Logout");
      }
    }

    if (
      location.pathname.includes("/admin/addCategory") ||
      location.pathname.includes("/admin/addProduct")
    ) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [location]);

  const logout = () => {
    setuserState("Logout");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="adminDashboard">
        {/* <!-- Sidebar --> */}
        <aside className={`admSidebar ${sidebarOpen ? "open" : ""}`}>
          <div>
            <button
              className="admClose-sidebar"
              onClick={() => setSidebarOpen(false)}
            >
              <X color="#ab8e66" />
            </button>

            <div style={{ backgroundColor: "#f3f3f3" }} className="admLogo">
              <a href="index.html">
                <img src="/assets/images/logo.png" alt="logo" />
              </a>
            </div>
            <ul className="admMenu">
              {/* <li className={`navlink ${isactive===true ? "  navlink active-link" : "navlink"}`}>
                <LayoutDashboard />
                <Link to="/admin/dashboard" onClick={() => setIsactive(false)} active>Dashboard</Link>
              </li> */}
              <li className="navlink">
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <LayoutDashboard />
                  Dashboard
                </NavLink>
              </li>

              {/* <li className={`navlink ${isactive ? "  navlink active-link" : "navlink"}`}>
                <ShoppingBag />
                <Link to="/admin/orders" onClick={() => setIsactive(!isactive)}>Orders</Link>
              </li> */}

              <li className="navlink">
                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <ShoppingBag />
                  Orders
                </NavLink>
              </li>

              <li className={`navlink ${dropdownOpen ? "active-parent" : ""}`}>
                <div className={`adm-dropdown ${dropdownOpen ? "open" : ""}`}>
                  <div className="dropdown-name" onClick={() => setDropdownOpen(prev => !prev)}>
                    <StoreIcon/>
                    <span>Manage Store</span>
                    <span className="down-arrow">
                      <ChevronDown size={20}/>
                    </span>

                  </div>
                  {dropdownOpen && (
                      <ul className="adm-submenu">
                        {/* <li className="navlink">
                      <Grid2X2Plus />
                      <Link to="/admin/addCategory">Add Category</Link>
                    </li> */}
                        <li className="navlink">
                          <NavLink
                            to="/admin/addCategory"
                            className={({ isActive }) =>
                              isActive ? "active-link" : ""
                            }
                          >
                            <Grid2X2Plus />
                            Add Category
                          </NavLink>
                        </li>

                        {/* <li className="navlink">
                      <ArchiveRestore />
                      <Link to="/admin/addProduct">Add Product</Link>
                    </li> */}

                        <li className="navlink">
                          <NavLink
                            to="/admin/addProduct"
                            className={({ isActive }) =>
                              isActive ? "active-link" : ""
                            }
                          >
                            <ArchiveRestore />
                            Add Product
                          </NavLink>
                        </li>
                      </ul>
                    )}
                </div>
              </li>

              {/* <li className="navlink">
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <div className={`adm-dropdown ${dropdownOpen ? "open" : ""}`}>
                    <div
                      className="dropdown-name"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <Store />
                      <span id="manageStore">Manage Store</span>
                      <span className="down-arrow">
                        <ChevronDown size={20} />
                      </span>
                    </div>
                    
                  </div>
                </NavLink>
              </li> */}

              {/* <li
                className={`adm-dropdown navlink ${dropdownOpen ? "open" : ""}`}
              ></li> */}
              {/* <li className="navlink">
                <ChartLine />
                <Link to="/admin/reports">Reports</Link>
              </li> */}

              {/* <li className="navlink">
                <NavLink
                  to="/admin/reports"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <ChartLine />
                  Reports
                </NavLink>
              </li> */}

              {/* <li className="navlink">
                <Mail />
                <Link to="/admin/messages">Messages</Link>
              </li> */}
              <li className="navlink">
                <NavLink
                  to="/admin/messages"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <Mail />
                  Messages
                </NavLink>
              </li>

              {/* <li className="navlink">
                <Users />
                <Link to="/admin/customers">Customers</Link>
              </li> */}
              <li className="navlink">
                <NavLink
                  to="/admin/customers"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <Users />
                  Customers
                </NavLink>
              </li>

              {/* <li>
                <UserCog/>
                <Link to="/admin/adminManage">Manage Admin</Link>
              </li> */}
            </ul>
          </div>

          {/* <div className="adminProfile">
              <div className="adm-header-message">
                <span>Welcome Admin</span>{" "}
                <span className="user-name">{userName}</span>
              </div>
              <div className="adm-logout-btn">
                {userState === "loggedIn" ? (
                    <>
                      <>
                        <Link onClick={logout} className="admin-logout-btn">Logout</Link>
                      </>
                    </>
                  ) : (
                    <>Login</>
                  )}
              </div>
            </div> */}
          <p className="copyright">
            Stelina
            <br />
            All rights reserved
          </p>
        </aside>
        {/* <!-- Header --> */}

        {/* Main Section */}
        <main className="admMain">
          <header className="admHeader">
            <div>
              <button
                className="admMenu-toggle"
                onClick={() => setSidebarOpen(true)}
              >
                <SquareMenu size={33} strokeWidth={1} color="#ab8e66" />
              </button>
            </div>
            <div className="adminProfile">
              <div className="adm-header-message">
                <span>Welcome Admin</span>{" "}
                <span className="user-name">{userName}</span>
              </div>
              <div className="adm-logout-btn">
                {userState === "loggedIn" ? (
                  <>
                    <>
                      <a onClick={logout} className="admin-logout-btn">
                        Logout
                      </a>
                    </>
                  </>
                ) : (
                  <>Login</>
                )}
              </div>
            </div>
          </header>
          <Outlet />
          {/* <AdminPage2/> */}
          {/* <SiteRoutes/> */}
        </main>
      </div>
    </>
  );
};
