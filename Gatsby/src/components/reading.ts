//import token from "../components/authorization"

async function handleResponse(jsonObject : any){//looks at the json data and returns an object with the interresting infomation
    let songs: string[] = []
    let times_ms: number[] = []
    let number_of_songs: number = await jsonObject["total"]
    let artists: string[] = []
    let explicit_rate: number = 0

    for (let i = 0; i < number_of_songs; i++){//get the data for each line song that is listed as well as 
        const song = await jsonObject["items"][i];
        songs.push(await song["name"]);
        times_ms.push(await song["duration_ms"]);
        for (const key in await song["artists"]) {
            if (Object.prototype.hasOwnProperty.call(await song["artists"], key)) {
                const element = await song["artists"][key];
                artists.push(await element["name"]);
            };
        };
        if (await song["explicit"]){
            explicit_rate = explicit_rate + 1
        }
    };
    
    explicit_rate = explicit_rate / await number_of_songs

    let mean_time_ms: number = 0
    for (const key in times_ms) {
        if (Object.prototype.hasOwnProperty.call(times_ms, key)) {
            const element = times_ms[key];
            mean_time_ms = mean_time_ms + element;
        };
    };
    mean_time_ms = mean_time_ms / number_of_songs;
    let mean_time_s = mean_time_ms/1000

    return {"songs":songs, "artists":artists, "times_ms":times_ms, "mean_time_s":mean_time_s, "explicit_rate":explicit_rate}
};

async function getJsonData(authKey: string) {//from app.js gets the json from the spotify api
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + authKey},
    });

    let jsonData = await response.json()

    return await jsonData
};

async function main(authKey: string){
    let songInfo = await handleResponse(await getJsonData(authKey));

    let songs: string[][] = [][]

    for (const key in songInfo["songs"]) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = [songInfo["songs"][key], songInfo["artists"][key]];
            songs.push(element);
        };
    };

    songInfo["songs"]  = getSonginfo(songs)

    return songInfo
};

async function getSonginfo(songs: any[]) {
    var songData: string[][] = []
    
    for (const key in songs) {
        if (Object.prototype.hasOwnProperty.call(songs, key)) {
        const song = songs[key];
    
        const response = await fetch("https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=".concat(song[0], "&track=", song[1],"&api_key=", "64773b9be5304689ec27ead878787c92", "&format=json"), {
        method: 'GET',
        });
        
        let currentData = await response.json()

        songData.push([await currentData["toptags"]["@attr"]["track"], await currentData["toptags"]["@attr"]["artits"], await currentData["toptags"]["tags"]])
       }
    }
}
let key = "BQD7jtnnIM6b1M8lE8nFw6Id49gXrwfLHlR4WI4YiVJaQGn2woIa8Jepd1jr8aBGdrS3cln4DXLcSoW0_pH_IVHuXrxXpWy5LN4ePiWotnFjgihrGGIiE3UCOyraE_pD3Jl74VDlDe4QNeEw0aYAc0DQjeusRvYNfOxuE1pvOxoFYHYTi-91pm4G1gdi2vAYa7QTglgOhOIH-YwXrf7adMqP67c82mTPDuuwg_dmQHD9KiQtPXH6ijufVZQ"
//console.log(main(token))

const responseJSON = main(key)
export default responseJSON;

//export default getSonginfo([["radiohead", "paranoid+android"]])
