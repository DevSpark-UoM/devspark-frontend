import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export const ProgressBarChart = ({ data }) => (
  <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
);

export const ProgressPieChart = ({ data }) => (
  <Doughnut data={data} options={{ cutout: '80%', maintainAspectRatio: false }} />
);