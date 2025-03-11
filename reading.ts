import * as fs from 'fs';

function handleResponse(){
    const jsonData = fs.readFileSync('JSONS/response.json', 'utf8');
    const jsonObject = JSON.parse(jsonData);
    
    let songs: string[] = []
    let times_ms: number[] = []
    let number_of_songs: number = jsonObject["total"]
    let artists: string[] = []
    let explisit_rate: number = 0

    for (let i = 0; i < number_of_songs; i++){//get the data for each line song that is listed as well as 
        const song = jsonObject["items"][i];
        songs.push(song["name"]);
        times_ms.push(song["duration_ms"]);
        for (const key in song["artists"]) {
            if (Object.prototype.hasOwnProperty.call(song["artists"], key)) {
                const element = song["artists"][key];
                artists.push(element["name"]);
            };
        };
        if (song["explicit"]){
            explisit_rate = explisit_rate + 1
        }
    };
    
    explisit_rate = explisit_rate / number_of_songs

    let mean_time_ms: number = 0
    for (const key in times_ms) {
        if (Object.prototype.hasOwnProperty.call(times_ms, key)) {
            const element = times_ms[key];
            mean_time_ms = mean_time_ms + element;
        };
    };
    mean_time_ms = mean_time_ms / number_of_songs;
    let mean_time_s = mean_time_ms/1000

    return {"songs":songs, "mean_time_s":mean_time_s, "artists":artists, "explisit_rate":explisit_rate}
}

//console.log(handleResponse());
