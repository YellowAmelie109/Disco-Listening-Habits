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
                getSonginfo([[song["name"], element["name"]]])
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

    return songInfo
};

let key = "BQBovzBm0hqpx-idOwpK-QVFLx-1U2dEFVW79wlWDuLdn9xZA7K2QLKakqydykE5jM5SrQA8ygOhVd4VIQTKAmU0Yr7z3MbCpmuFkzV93dCq68qjB_jRRmfSmiCYl_o6t21IrCTbbiFZFiIQGJ5YwIErsHB8khAuXYjRGRED0sEXtXjqfPS931Cn9FU_SpEVhbsxSF1Z2OQJJkRyHhzW_ksyxqSuyxtyNzfNqRyoEzDWf3wkZIayhGc22u0"
console.log(main(key))
const responseJSON = main(key)
export default responseJSON;

async function getSonginfo(songs: any[]) {
    var songData: string[]
    
    //for (const key in songs) {
    //    if (Object.prototype.hasOwnProperty.call(songs, key)) {
    const song = songs[0];
    
    const response = await fetch("https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=".concat(song[0], "&track=", song[1],"&api_key=", "64773b9be5304689ec27ead878787c92", "&format=json"), {
        method: 'GET',
    });


    console.log(await response);
    console.log(await response["toptags"]);
    console.log(await response["toptags"]["tag"]);
    if (await response["toptags"]["tag"] = []){
        console.log(await response["toptags"]["tag"][0]);            
    }
            //songData.push([song[0], song[1], ])
    //    }
    //}
    
}

//export default getSonginfo([["radiohead", "paranoid+android"]])
