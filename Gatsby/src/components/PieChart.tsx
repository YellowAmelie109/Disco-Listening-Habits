//This file is meant for making a pie chart of genres, however, spotify only returns genres
//for a small amount of artists. A lot of popular artists do not have genres attached.

//It just so happens all the artists on the shared spotify account have genres, but 
//barely any have any genres for my home account.

import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {main} from './reading'

ChartJS.register(ArcElement, Tooltip, Legend);


export const data = {
  labels: ['Pop', 'Hip-hop', 'Rock', 'idk', 'Rap'],
  datasets: [
    {
      label: 'Songs',
      data: [25, 20, 8, 12, 34], 
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
  async function handleJSON(){
    let songData = await main();
    setSongs(songData["songs"])
  }
  const [songs,setSongs] = React.useState([""])
  React.useEffect(() => {
    if (localStorage.getItem('token')){
      handleJSON();
    };
  }, []);
  return (
    <>
      <div style={{ width: '45%', float:'right' }}>
        <Pie data={{labels: ['Pop', 'Hip-hop', 'Rock', 'Rap','Metal','Other'],
                    datasets: [
                      {
                        label: 'Songs',
                        data: [25, 20, 8, 12, 10, 40], 
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(17, 20, 0, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(17, 20, 0, 1)'
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }} />
      </div>
      <div>
        <ol>
          {songs.map((song:string,index:number) => (
            <li key={index}>{song}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default PieChart; //<PieChart /> in index.tsx to make it render
