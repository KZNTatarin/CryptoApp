import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { portfolio, crypto } from "../data";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {


  const data = {
    labels: portfolio.map((c) => c.id),
    datasets: [
      {
        label: "$",
        data: portfolio.map((c) => c.totalPrice),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: 400,
      }}
    >
      <Pie data={data} />
    </div>
  );
}
