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
import { eachDayOfInterval, format, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RegistrationChart = ({ data }) => {
  const today = new Date();

  const last30Days = eachDayOfInterval({
    start: subDays(today, 29),
    end: today,
  }).map(date => format(date, 'yyyy-MM-dd'));

  const chartData = {
    labels: last30Days,
    datasets: [
      {
        label: 'Registrations',
        data: last30Days.map(date => {
          const registrationForDate = data.find(item => item.date === date);
          return registrationForDate ? registrationForDate.registrations : 0;
        }),
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
        ticks: {
          autoSkip: true,
          maxTicksLimit: 30,
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
      <h2 className={css.title}>Registrations Chart (Last 30 Days)</h2>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default RegistrationChart;
