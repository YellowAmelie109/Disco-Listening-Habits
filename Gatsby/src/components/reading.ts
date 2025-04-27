async function handleResponse(jsonObject : any){//looks at the json data and returns an object with the interresting infomation
    let songs = []
    let times_ms: number[] = []
    let number_of_songs: number = Object.keys(await jsonObject["items"]).length
    let artists = []
    let explicit_rate: number = 0

    for (let i = 0; i < number_of_songs; i++){//get the data for each line song that is listed as well as 
        const song = await jsonObject["items"][i];
        songs.push(await song["name"]);
        times_ms.push(await song["duration_ms"]);
        let element = []
        for (const key in await song["artists"]) {
            if (Object.prototype.hasOwnProperty.call(await song["artists"], key)) {
                element.push(await song["artists"][key]["name"]);
            };
        };
        if(element){
            artists.push(element);
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
    let songs = [] //gets the list of songs
    for (const key in await songInfo["songs"]) {
        if (Object.prototype.hasOwnProperty.call(songInfo["songs"], key)) {
            const element = [songInfo["songs"][key], songInfo["artists"][key]];
            songs.push(element);
        };
    };

    songInfo["songs"]  = await getSonginfo(songs)

    return songInfo //"songs" is a stored as a list of lists where the secondarry list would be in the form: [song name, artists[]?, tags[]]
};

async function getSonginfo(songs: any[]) {//pings audioscrobbler to find the song genr5a (if listed)
    var songData: string[][] = []
    for (let key in songs) {
        if (Object.prototype.hasOwnProperty.call(songs, key)) {
            const song = songs[key];
        
            const response = await fetch("https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=".concat(encodeURIComponent(song[1][0]), 
                "&track=", encodeURIComponent(song[0]),
                "&api_key=", "64773b9be5304689ec27ead878787c92",
                "&format=json"), {
                method: 'GET',
            });
            
            let currentData = await response.json()
            if (await currentData["toptags"] && await currentData["toptags"]["tag"] && await currentData["toptags"]["tag"][0]){
                songData.push([await song[1].join(", "), await song[0], await currentData["toptags"]["tag"][0]["name"]])
            }else{
                songData.push([await song[1].join(", "), await song[0], "Unknown"])
            }
        };
    }
    return await songData;
}

export async function getArtistInfo(){
    let authKey = window.localStorage.getItem('token')
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + authKey},
    });

    let jsonData = await response.json()
    if (Object.keys(jsonData["items"]).length > 5){
        return await jsonData["items"].slice(0,5)
    }
    return await jsonData["items"]

}
/**const token = window.localStorage.getItem('token');
console.log(main(token));
const responseJSON = main();
export default responseJSON;

export default getSonginfo([["radiohead", "paranoid+android"]])*/
