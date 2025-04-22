//This file is meant for making a pie chart of genres, however, spotify only returns genres
//for a small amount of artists. A lot of popular artists do not have genres attached.

//It just so happens all the artists on the shared spotify account have genres, but 
//barely any have any genres for my home account.

import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {main} from './reading'

ChartJS.register(ArcElement, Tooltip, Legend, Title);


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
  function toTitleCase(str:string="") {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

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

  function countGenres(songs:string[]){
    let count = {};
    for (let i in songs) {
      let genre=toTitleCase(songs[i][2]);
      if (Object.keys(count).includes(genre)){
        count[genre] = count[genre] + 1
      } else{
        count[genre] = 1
      };
    };
    count = Object.fromEntries(
      Object.entries(count).sort(([, a], [, b]) => b - a)
    );
    let length = Object.keys(count).length;
    if (length > 6) {
      let other = 0;
      if (count["Unknown"]){
        other=count["Unknown"];
        delete count["Unknown"];
        length--;
      };
      let values = Object.values(count);
      other += values.slice(5).reduce((partialSum, a) => partialSum + a, 0); //Adds together the total count for each genre not in the top 5 genres
      for (let i = length; i > 4; i--){
        delete count[Object.keys(count)[i]];
      };
      count["Other"]=other
    }
    return (count);
  };

  let genreCount=countGenres(songs);
  if (JSON.stringify(songs) != "[\"\"]" ){
    return (
      <>
        <div style={{ width: '45%', float:'right' }}>
          <Pie data={{labels: Object.keys(genreCount),
                      datasets: [
                        {
                          label: 'Songs',
                          data: Object.values(genreCount), 
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
                    }} options = {{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Genres'
                        }
                      }
                    }}
                     />
        </div>
        <div>
          <ol style = {{maxWidth:"50%"}}>
            {songs.map((song:string,index:number) => (
              <li key={index}>{song[0]} - {song[1]} - {toTitleCase(song[2])}</li>
            ))}
          </ol>
        </div>
      </>
    );
  };
};

export default PieChart; //<PieChart /> in index.tsx to make it render
