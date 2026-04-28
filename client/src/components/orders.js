import { useEffect, useState } from "react";

export const Orders = () => {
  const [ordersInfo, setOrdersInfo] = useState([]);

  useEffect(() => {
    ShowOrdersData();
  }, []);

  const ShowOrdersData = async () => {
    try {
      const useApi = await fetch("https://stelina-1-backend.onrender.com/api/customers-orders", {
        method: "Get",
      });
      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          setOrdersInfo(resp.custOrdData);
          console.log(resp.custOrdData);
          const prodnames = resp.custOrdData.map((item) => item.Products);
          console.log(prodnames);
          // const prd = prodnames.map(item => )
        } else {
          alert("Error in showing Orders data");
        }
      }
    } catch (error) {
      console.log(error, "in running your Customer order Api");
    }
  };
  return (
    <>
      <div className="table-show-area">
        <h1>Orders placed by customers</h1>
        <table className="table-show-data">
          <thead>
            <tr>
              <th></th>
              <th>Order Id</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Order Date</th>
              <th>Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            {ordersInfo.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order._id.slice(0, 10)}</td>
                <td>
                  {order.Products.flat().join(", ")}
                </td>
                <td>${order.TotalPrice}</td>
                {/* <td>{order.scProductCount}</td>
                <td>${order.scProductPrice}</td> */}
                <td>{order.FullName}</td>
                <td>{order.Email}</td>
                <td>{order.Address}, {order.Zipcode}</td>
                <td>{(order.Addon).split("T")[0].split("-").reverse().join("-")}</td>
                <td>{order.PayType}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
