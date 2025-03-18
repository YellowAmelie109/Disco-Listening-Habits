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
    return songInfo
};

let key = "BQANdXNYVlbdfiIWz4P8U8645l5tF8lXIclddwsGvf9MN7fQMOiK1RDnyJuHDQYlmRA5NKcUJ9bXjtQUjENnS7hZKM1FNJDsD68ZnbHnHirKCw2QNWK5ZVVVWusmlEubpy062KrF-DnBK0izjzr6WpA09UgW6nfPM6rOcQugH0ZWkCV1qpKZDMG9dI6Q8BZLvb2voRBUGralGt_PjltX-Fz5NcRm3Uw7KGcIhXTuyxuL-WCljGAex_FR3FQ"
console.log(main(key))
const responseJSON = main(key)
export default responseJSON;
