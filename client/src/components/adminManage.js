import { useEffect, useRef, useState } from "react";

export const AdminManage = () => {
  // const [adminList, setAdminList] = useState([]);
  // const [custList, setCustList] = useState([]);

  const [admins, setAdmins] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    ShowUsersLists();
    // ShowCustList();

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ShowUsersLists = async () => {
    try {
      const useApi = await fetch("https://stelina-1-backend.onrender.com/api/admin-list", {
        method: "Get",
      });
      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          // setAdminList(resp.adminListData);
          const adminUsers = resp.users.filter((u) => u.role === "admin");
          const normalUsers = resp.users.filter((u) => u.role === "customer");

          setAdmins(adminUsers);
          setCustomers(normalUsers);
        } else {
          alert("Error in Showing Users List");
        }
      }
    } catch (error) {
      console.log(error, "in running Show User list Api");
    }
  };

  const toggleAdminRole = async (user, table, index) => {
    console.log(user)
    try {
      const res = await fetch(
        `https://stelina-1-backend.onrender.com/api/toggle-admin/${user._id}`,
        { method: "PUT" },
      );

      const data = await res.json();

      if (data.statuscode === 1) {
        if (table === "customer") {
          // remove from customers
          const updatedCustomers = [...customers];
          updatedCustomers.splice(index, 1);
          setCustomers(updatedCustomers);

          // add to admins
          setAdmins((prev) => [...prev, { ...user, role: "admin" }]);
        } else {
          // remove from admins
          const updatedAdmins = [...admins];
          updatedAdmins.splice(index, 1);
          setAdmins(updatedAdmins);

          // add to customers
          setCustomers((prev) => [...prev, { ...user, role: "customer" }]);
        }
      }
    } catch (error) {
      console.log(error, "in Updating Manage Admin tables");
    }
  };

  // const ShowCustList = async () => {
  //   try {
  //     const useApi = await fetch("https://stelina-1-backend.onrender.com/api/customers-list", {
  //       method: "Get"
  //     })
  //     if(useApi.ok) {
  //       const resp = await useApi.json();
  //       if(resp.statuscode === 1) {
  //         setCustList(resp.custListData);
  //       } else {
  //         alert("Error in Showing customers List")
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error, "in running Show customers list Api");
  //   }
  // }

  const ToggleActBtn = (tableName, idx) => {
    setOpenMenu((prev) =>
      prev?.table === tableName && prev?.index === idx
        ? null
        : { table: tableName, index: idx },
    );
  };

  return (
    <>
      {/* <h1>Admin Management Page</h1> */}
      <div className="lists-show-area">
        <div className="admin-list">
          <h2>Admin List</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Adm. Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{admin._id.slice(0, 5)}</td>
                  <td>{admin.UserName}</td>
                  <td>{admin.Email}</td>
                  <td className="action-cell">
                    <div className="action-wrapper">
                      <button
                        className="action-btn"
                        onClick={() => ToggleActBtn("admin", index)}
                      >
                        ...
                      </button>

                      {openMenu?.table === "admin" &&
                        openMenu?.index ===
                          index(
                            <div className="action-menu" ref={menuRef}>
                              <button
                                className="act-menu-item "
                                onClick={() =>
                                  toggleAdminRole(admin, "admin", index)
                                }
                              >
                                Remove Admin
                              </button>
                            </div>,
                          )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="customer-list">
          <h2>Customer List</h2>
          <table className="customer-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Cust. Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer._id.slice(0, 5)}</td>
                  <td>{customer.UserName}</td>
                  <td>{customer.Email}</td>
                  <td className="action-cell">
                    <div className="action-wrapper">
                      <button
                        className="action-btn"
                        onClick={() => ToggleActBtn("customer", index)}
                      >
                        ...
                      </button>

                      {openMenu?.table === "customer" &&
                        openMenu?.index ===
                          index(
                            <div className="action-menu" ref={menuRef}>
                              <button
                                className="act-menu-item "
                                onClick={() =>
                                  toggleAdminRole(customer, "customer", index)
                                }
                              >
                                Make Admin
                              </button>
                            </div>,
                          )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
