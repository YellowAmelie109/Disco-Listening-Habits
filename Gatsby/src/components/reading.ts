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
    
    explicit_rate = explicit_rate / number_of_songs

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

async function getJsonData(authKey: string|null) {//from app.js gets the json from the spotify api
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + authKey},
    });

    let jsonData = await response.json()

    return await jsonData
};

export async function main(/**authKey: string|null*/){
    let songInfo = await handleResponse(await getJsonData(window.localStorage.getItem('token')));

    let songs: string[][] = [] //gets the list of songs
    for (const key in await songInfo["songs"]) {
        if (Object.prototype.hasOwnProperty.call(songInfo["songs"], key)) {
            const element = [songInfo["songs"][key], songInfo["artists"][key]];
            songs.push(await element);
        };
    };

    songInfo["songs"]  = await getSonginfo(songs)

    return songInfo //"songs" is a stored as a list of lists where the secondarry list would be in the form: [song name, artists[]?, tags[]]
};

async function getSonginfo(songs: any[]) {//pings audioscrobbler to find the song genr5a (if listed)
    var songData: string[][] = []
    
    for (const key in songs) {
        if (Object.prototype.hasOwnProperty.call(songs, key)) {
            const song = songs[key];
        
            const response = await fetch("https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=".concat(song[0], 
                "&track=", song[1],
                "&api_key=", "64773b9be5304689ec27ead878787c92",
                "&format=json"), {
                method: 'GET',
            });
            
            let currentData = await response.json()

            songData.push([await currentData["toptags"]["@attr"]["artist"], await currentData["toptags"]["@attr"]["track"], await currentData["toptags"]["tags"]])
       }
    }
    return await songData;
}
/**const token = window.localStorage.getItem('token');
console.log(main(token));
const responseJSON = main();
export default responseJSON;

export default getSonginfo([["radiohead", "paranoid+android"]])*/
