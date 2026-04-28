import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

export const Reports = () => {
  const [users, setUsers] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("https://stelina-1-backend.onrender.com/api/customers-info");
      const resp = await res.json();

      if (resp.statuscode === 1) {
        const total = resp.custInfoData.length;
        const active = resp.custInfoData.filter(
          (c) => c.status === "active"
        ).length;
        const inactive = resp.custInfoData.filter(
          (c) => c.status === "inactive"
        ).length;

        setUsers({ total, active, inactive });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Doughnut Data
  const data = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [users.active, users.inactive],
        backgroundColor: [
          "#4CAF50", // green
          "#E53935", // red
        ],
        borderWidth: 1,
        cutout: "70%",
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

  return (
    <div style={{ width: "420px", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center" }}>Customer Activity</h2>

      <div style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px"
    }}>
      <div>Total: {users.total}</div>
      <div style={{color:"#4CAF50"}}>Active: {users.active}</div>
      <div style={{color:"#E53935"}}>Inactive: {users.inactive}</div>
     </div>

      <Doughnut data={data} options={options} plugins={[centerText]} />
    </div>
  );
};
