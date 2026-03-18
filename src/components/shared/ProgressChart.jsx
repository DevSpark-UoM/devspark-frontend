import React from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export const ProgressBarChart = ({ data }) => (
  <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
);

export const ProgressPieChart = ({ data }) => (
  <Doughnut data={data} options={{ cutout: '80%', maintainAspectRatio: false, plugins: { tooltip: { enabled: true, callbacks: { label: function(context) { const total = context.dataset.data.reduce((a, b) => a + b, 0); const percentage = ((context.raw / total) * 100).toFixed(1); return `${context.label}: ${percentage}%`; } } } } }} />
);

export const DailyProgressStackedBarChart = ({ data }) => (
  <Bar
    data={data}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 15
          }
        }
      },
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 10 } }
      }
    }}
  />
);

export const AdminProgressPieChart = ({ data }) => (
  <Pie
    data={data}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 10 } }
      }
    }}
  />
);