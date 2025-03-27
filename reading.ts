import { json } from "stream/consumers"

async function handleResponse(jsonObject){//looks at the json data and returns an object with the interresting infomation
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

    return {"songs":songs, "mean_time_s":mean_time_s, "artists":artists, "explicit_rate":explicit_rate}
}

async function getJsonData(authKey) {//from app.js gets the json from the spotify api
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + authKey},
    });

    let jsonData = await response.json()
    console.log(await jsonData)
    return await jsonData
};

async function main(authKey: string){
    let songInfo = await handleResponse(await getJsonData(authKey));
    console.log(songInfo)
    return songInfo
};

let key = "BQBvBN4nuW36ef6HW2B9zKsiYJt72pKXyBag2VstF0VkFJ5TG4BhmbOGIdBQHhvJLPpypU06ZDcdxgTRKYW3heOvzKWwss0USQ9bvKiudijmEPVALrrRwxABt2F2WE_D0DSxke3YOwC30_GIsebQ0DbMDVCONNfpGRQpAAlCWwZri2lMPQsOboLyNPu_cWW0Pv-_AeV4JEfyQSrQy3SYrPwpMwNOvKm74r11YuYOVuikGEJddGFJcSfuLz0"
//console.log(main(key))
const responseJSON = main(key)
//export default responseJSON;
console.log (responseJSON)