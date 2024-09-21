import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import css from './RegistrationChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RegistrationChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Registrations',
        data: data.map(item => item.registrations),
        backgroundColor: 'rgba(22, 119, 255, 0.6)',
        borderColor: 'rgba(22, 119, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Registrations',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h2 className={css.title}>Registrations Chart By Days</h2>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default RegistrationChart;
