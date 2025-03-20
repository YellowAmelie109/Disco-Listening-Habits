import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Pop', 'Hip-hop', 'Rock', 'idk', 'Rap'],//From the get several artists endpoint
  datasets: [
    {
      label: 'Songs',
      data: [25, 20, 8, 12, 34], //Number of artists with those genres*number of songs in the top 50 or 100 by that artist the user listens to
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {  //width controls both width and height of the pie chart
  return (
    <div style={{ width: '250px' }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart; //<PieChart /> in index.tsx to make it render
