import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
// import { response } from "express";

import { useEffect, useState } from "react";
import { Bar, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  RadialLinearScale,
  PointElement,
  LineElement,
);

export const AdminDashboard = () => {
  const [users, setUsers] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const [items, setItems] = useState({
    categories: 0,
    products: 0,
  });

  const [products, setProducts] = useState({
    deo: 0,
    edp: 0,
    attar: 0,
    edc: 0,
    parfum: 0,
  });

  const [payType, setPayType] = useState({
    totalpays: 0,
    cod: 0,
    prepaid: 0,
  });

  const [ordersCount, setOrdersCount] = useState({
    labels: 0,
    values: 0,
  });

  useEffect(() => {
    fetchCustomers();
    // fetchCategories();
    fetchProducts();
    fetchPayType();
    fetchOrders();
  }, []);

  // ---------- Customer Activity ---------

  const fetchCustomers = async () => {
    try {
      const res = await fetch("https://stelina-backend.onrender.com/api/customers-info");
      const resp = await res.json();

      if (resp.statuscode === 1) {
        const total = resp.custInfoData.length;
        const active = resp.custInfoData.filter(
          (c) => c.status === "active",
        ).length;
        const inactive = resp.custInfoData.filter(
          (c) => c.status === "inactive",
        ).length;

        setUsers({ total, active, inactive });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Doughnut Data
  const doughnutChart = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [users.active, users.inactive],
        backgroundColor: [
          "#4CAF50", // green
          "#E53935", // red
        ],
        borderWidth: 1,
        cutout: "50%",
      },
    ],
  };

  const options = {
    plugins: {
      centerText: {
        total: users.total,
      },
      legend: {
        position: "bottom",
      },
    },
  };

  // Center text plugin
  const centerText = {
    id: "centerText",
    beforeDraw(chart, args, pluginOptions) {
      const { ctx, width, height } = chart;

      ctx.save();

      const total = pluginOptions.total; // always latest value

      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#222";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(total, width / 2, height / 2 - 8);

      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#888";
      ctx.fillText("Total Users", width / 2, height / 2 + 16);

      ctx.restore();
    },
  };

  // ------------ Total Products and Category -----------
  const fetchCategories = async () => {
    try {
      const useApi = await fetch("https://stelina-backend.onrender.com/api/category-count", {
        method: "Get",
      });
      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          const categories = resp.categoryData.length;
          setItems((prev) => ({ ...prev, categories: categories }));
          console.log(resp.categoryData.length);
        }
      }
    } catch (error) {
      console.log(error, "in running CategoryCount API");
    }
  };

  const fetchProducts = async () => {
    try {
      const useApi = await fetch("https://stelina-backend.onrender.com/api/products-count", {
        method: "Get",
      });
      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          const products = resp.productData.length;
          setItems((prev) => ({ ...prev, products: products }));
          console.log(resp.productData.length);

          // for fetching products by category
          const deo = resp.productData.filter(
            (c) => c.ProdCateName === "Deodrant",
          );
          const edp = resp.productData.filter(
            (c) => c.ProdCateName === "Eau de Parfum",
          );
          const attar = resp.productData.filter(
            (c) => c.ProdCateName === "Attar",
          );
          const edc = resp.productData.filter(
            (c) => c.ProdCateName === "Eau de Cologn",
          );
          const parfum = resp.productData.filter(
            (c) => c.ProdCateName === "Parfum",
          );

          setProducts({ deo, edp, attar, edc, parfum });
        }
      }
    } catch (error) {
      console.log(error, "in running ProductCount API");
    }
  };

  // console.log(items.products, items.categories);

  // const pieChart = {
  //   labels: ["Product", "Category"],
  //   datasets: [
  //     {
  //       label: "Count",
  //       data: [items.products, items.categories],
  //       backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)"],
  //       hoverOffset: 4,
  //     },
  //   ],
  // };
  // const itemsOptions = {
  //   plugins: {
  //     legend: {
  //       position: "bottom",
  //     },
  //   },
  // };

  const polarAreaChart = {
    labels: ["Deodrant", "Eau de Parfum", "Attar", "Parfum", "Eau de Cologne"],
    datasets: [
      {
        label: "Products by Catgory",
        data: [
          products.deo.length,
          products.edp.length,
          products.attar.length,
          products.parfum.length,
          products.edc.length,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  const productOptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // --------- Payment Type Distribution Chart ---------
  const fetchPayType = async () => {
    try {
      const useApi = await fetch("https://stelina-backend.onrender.com/api/paytype", {
        method: "Get",
      });
      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          const totalpays = resp.paymentData.length;
          const cod = resp.paymentData.filter(
            (p) => p.PayType === "Cash On Delivery",
          ).length;
          console.log(resp.paymentData.length);
          console.log(cod);
          const prepaid = resp.paymentData.filter(
            (p) => p.PayType === "prepaid",
          ).length;
          console.log(prepaid);

          setPayType({ totalpays, cod, prepaid });
        }
      }
    } catch (error) {
      console.log(error, "in running paytype API");
    }
  };

  const pieChart2 = {
    labels: ["Cash On Delivery", "Prepaid"],
    datasets: [
      {
        label: "Count",
        data: [payType.cod, payType.prepaid],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };
  const paytypeOptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // --------- Orders Over Time Chart --------------
  const fetchOrders = async () => {
    try {
      const useApi = await fetch("https://stelina-backend.onrender.com/api/orders-over-time", {
        method: "Get",
      });
      if (useApi.ok) {
        const resp = await useApi.json();
        if (resp.statuscode === 1) {
          console.log(resp.ordersData);
          const OrdersData = resp.ordersData;
          const labels = OrdersData.map((items) => items._id);
          const values = OrdersData.map((items) => items.totalOrders);

          console.log(labels);
          console.log(values);
          setOrdersCount({ labels, values });
        } else {
          console.log("Error in showing Order over time data");
        }
      }
    } catch (error) {
      console.log(error, "in running Orders over time ");
    }
  };

  const LineChartData = {
    labels: ordersCount.labels,
    datasets: [
      {
        label: "Orders",
        data: ordersCount.values,
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.1,
      },
    ],
  };

  const BarChart = {
    labels: ordersCount.labels,
    datasets: [{
      label: 'My First Dataset',
      data: ordersCount.values,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  }

  return (
    <>
      <div className="dashboard-area">
        <h1>Dashboard</h1>
        <div className="dashboard-box">
          <div className="adm-top-row">
        
            <div className="user-activity">
              <div>
                <h3 style={{ textAlign: "center" }}>Customer Activity</h3>

                <div className="cust-activity-boxes">
                  <div className="activity-box">Total: {users.total}</div>
                  <div className="activity-box" style={{ color: "#4CAF50" }}>
                    Active: {users.active}
                  </div>
                  <div className="activity-box" style={{ color: "#E53935" }}>
                    Inactive: {users.inactive}
                  </div>
                </div>
                <div className="doughnut">
                  <Doughnut
                    data={doughnutChart}
                    options={options}
                    plugins={[centerText]}
                  />
                </div>
              </div>
            </div>

            <div className="total-items">
              <h3 style={{ textAlign: "center" }}>Payment Type</h3>

              <div className="cust-paytype-boxes">
                <div
                  className="paytype-box"
                  style={{ color: "rgb(255, 205, 86)" }}
                >
                  Prepaid:{" "}
                  {((payType.prepaid * 100) / payType.totalpays).toFixed()}
                  {"%"}
                </div>
                <div
                  className="paytype-box"
                  style={{ color: "rgb(54, 162, 235)" }}
                >
                  Cash On Delivery:{" "}
                  {((payType.cod * 100) / payType.totalpays).toFixed()}
                  {"%"}
                </div>
              </div>
              <div className="pie">
                <Pie data={pieChart2} options={paytypeOptions} />
              </div>
            </div>

            <div className="product-by-category">
              <div>
                <h3 style={{ textAlign: "center" }}>Products by Category</h3>
                <div className="product-by-cate-boxes">
                  <div
                    className="category-box"
                    style={{ color: "rgb(255, 99, 132)" }}
                  >
                    Deodrant: {products.deo.length}
                  </div>
                  <div
                    className="category-box"
                    style={{ color: "rgb(255, 205, 86)" }}
                  >
                    Attar: {products.attar.length}
                  </div>
                  <div
                    className="category-box"
                    style={{ color: "rgb(201, 203, 207)" }}
                  >
                    Parfum: {products.parfum.length}
                  </div>
                  <div
                    className="category-box"
                    style={{ color: "rgb(75, 192, 192)" }}
                  >
                    Eau de Parfum: {products.edp.length}
                  </div>

                  <div
                    className="category-box"
                    style={{ color: "rgb(54, 162, 235)" }}
                  >
                    Eau de Cologn: {products.edc.length}
                  </div>
                </div>

                <div className="doughnut">
                  <PolarArea data={polarAreaChart} options={productOptions} />
                </div>
              </div>
            </div>
          </div>

          <div className="sales-activity">
            <h3 style={{ textAlign: "center" }}>Orders Over Time</h3>
            <div className="LineChart">
              <Line data={LineChartData} />
              {/* <Bar data={BarChart}/> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
