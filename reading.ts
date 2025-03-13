function handleResponse(jsonObject){//looks at the json data and returns an object with the interresting infomation
    let songs: string[] = []
    let times_ms: number[] = []
    let number_of_songs: number = jsonObject["total"]
    let artists: string[] = []
    let explicit_rate: number = 0

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

    return {"songs":songs, "mean_time_s":mean_time_s, "artists":artists, "explicit_rate":explicit_rate}
}

async function getJsonData(authKey) {//from app.js gets the json from the spotify api
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + authKey},
    });

    let jsonData = await response.json()
    console.log(jsonData)
    return jsonData
};

async function main(authKey){
    return await handleResponse(getJsonData(authKey));
};

let key = "BQDGUIRmELnT8dIj6mpwbJKytF99ewzFW6-JzrLdhUOt71mHFBsnk27ZPXCnSHHhV2c2Ko0mggQrSgCaxSQnvcDhdnjcpMfQ2jIC4nEmy32Ppo4hHAoKAFisGRCBbscN1YJlD1GG7q8V780-WAZhvVkMRQrat8aNhxW2wBsBxxJ7tEkOjRNIsRgabNhUVcFgE4bD4m_aF-Cwodq8HE0e_-Nk-plgc3mfeladpUGuJiLXgLVzfiNWEXrkm6c"
console.log(main(key))
