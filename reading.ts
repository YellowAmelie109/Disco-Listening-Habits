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

async function getJsonData(authKey) {//from app.js
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + authKey.access_token },
    });

    return await response.json();
};
function main(authKey){
    return handleResponse(getJsonData(authKey));
};
