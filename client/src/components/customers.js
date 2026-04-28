import { useEffect, useRef, useState } from "react";

export const Customers = () => {
  const [activeCust, setActiveCust] = useState([]);
  const [inactiveCust, setInactiveCust] = useState([]);

  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  // const [confirmBox, setConfirmBox] = useState({
  //   show: false,
  //   customer: null,
  //   table: null,
  //   index: null,
  // });

  useEffect(() => {
    ShowCustInfo();
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ShowCustInfo = async () => {
    try {
      const useApi = await fetch("https://stelina-1-backend.onrender.com/api/customers-info", {
        method: "Get",
      });

      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          const active = resp.custInfoData.filter(c => c.status === "active");
          const inactive = resp.custInfoData.filter(c => c.status === "inactive");

          setActiveCust(active);
          setInactiveCust(inactive);
        } else {
          alert("Error in showing Customers Info");
        }
      }
    } catch (error) {
      console.log(error, "in customers-info Api");
    }
  };

  const ToggleActBtn = (tableName, idx) => {
    setOpenMenu((prev) =>
      prev?.table === tableName && prev?.index === idx
        ? null
        : { table: tableName, index: idx },
    );
  };

  const toggleCustomerStatus = async (customer, tableType, index) => {
  try {
    const res = await fetch(
      `https://stelina-1-backend.onrender.com/api/toggle-customer-status/${customer._id}`,
      { method: "PUT" }
    );

    const data = await res.json();

    if (data.statuscode === 1) {

      if (tableType === "active") {
        // remove from active
        const updatedActive = [...activeCust];
        updatedActive.splice(index, 1);
        setActiveCust(updatedActive);

        // add to inactive
        setInactiveCust(prev => [...prev, { ...customer, status: "inactive" }]);
      }
      else {
        // remove from inactive
        const updatedInactive = [...inactiveCust];
        updatedInactive.splice(index, 1);
        setInactiveCust(updatedInactive);

        // add to active
        setActiveCust(prev => [...prev, { ...customer, status: "active" }]);
      }
    }

  } catch (error) {
    console.log(error);
  }
};


  return (
    <>
      <div className="table-show-area">
        <div className="active-customers">
          <h2>Active Customers</h2>
          <table>
            <thead className="table-show-data">
              <tr>
                <th></th>
                <th>Cust. Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            {activeCust.map((customer, index) => (
              <tbody className="table-show-data" key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{customer._id.slice(0, 5)}</td>
                  <td>{customer.UserName}</td>
                  <td>{customer.Email}</td>
                  <td>{customer.Phone == "" ? "_" : customer.Phone}</td>
                  {/* <td className={`dots ${showActBtn ? "open" : ""}`} onClick={()=>{setShowActBtn(true)}}>
                      ...
                      <div className="action-btns">
                        
                      </div>
                      {showActBtn && (
                          <button>Disable Accout</button>
                        )}
                    </td> */}
                  <td class="action-cell">
                    <div class="action-wrapper">
                      <button
                        class="action-btn"
                        onClick={() => ToggleActBtn("active", index)}
                      >
                        ⋯
                      </button>

                      {openMenu?.table === "active" &&
                        openMenu?.index === index && (
                          <div className="action-menu" ref={menuRef}>
                            <button
                              className="act-menu-item delete"
                              onClick={() =>
                                toggleCustomerStatus(customer,
                                  "active",
                                  index,)
                              }
                            >
                              Disable
                            </button>

                            {/* <button className="act-menu-item edit">Edit</button>
    <button className="act-menu-item delete">Delete</button> */}
                          </div>
                        )}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className="inactive-customers">
          <h2>Inactive Customers</h2>
          <table>
            <thead className="table-show-data">
              <tr>
                <th></th>
                <th>Cust. Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            {inactiveCust.map((customer, index) => (
              <tbody className="table-show-data" key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{customer._id.slice(0, 5)}</td>
                  <td>{customer.UserName}</td>
                  <td>{customer.Email}</td>
                  <td>{customer.Phone == "" ? "_" : customer.Phone}</td>
                  {/* <td className={`dots ${showActBtn ? "open" : ""}`} onClick={()=>{setShowActBtn(true)}}>
                      ...
                      <div className="action-btns">
                        
                      </div>
                      {showActBtn && (
                          <button>Disable Accout</button>
                        )}
                    </td> */}
                  <td class="action-cell">
                    <div class="action-wrapper">
                      <button
                        class="action-btn"
                        onClick={() => ToggleActBtn("inactive", index)}
                      >
                        ⋯
                      </button>

                      {openMenu?.table === "inactive" &&
                        openMenu?.index === index && (
                          <div className="action-menu" ref={menuRef}>
                            <button
                              className="act-menu-item view"
                              onClick={() =>
                                toggleCustomerStatus(customer,
                                  "inactive",
                                  index,)
                              }
                            >
                              Enable
                            </button>

                            {/* <button className="act-menu-item edit">Edit</button> */}
                            {/* <button className="act-menu-item delete">Delete</button> */}
                          </div>
                        )}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};
