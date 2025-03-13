function handleResponse(jsonObject) {
    var songs = [];
    var times_ms = [];
    var number_of_songs = jsonObject["total"];
    var artists = [];
    var explisit_rate = 0;
    for (var i = 0; i < number_of_songs; i++) { //get the data for each line song that is listed as well as 
        var song = jsonObject["items"][i];
        songs.push(song["name"]);
        times_ms.push(song["duration_ms"]);
        for (var key in song["artists"]) {
            if (Object.prototype.hasOwnProperty.call(song["artists"], key)) {
                var element = song["artists"][key];
                artists.push(element["name"]);
            }
            ;
        }
        ;
        if (song["explicit"]) {
            explisit_rate = explisit_rate + 1;
        }
    }
    ;
    explisit_rate = explisit_rate / number_of_songs;
    var mean_time_ms = 0;
    for (var key in times_ms) {
        if (Object.prototype.hasOwnProperty.call(times_ms, key)) {
            var element = times_ms[key];
            mean_time_ms = mean_time_ms + element;
        }
        ;
    }
    ;
    mean_time_ms = mean_time_ms / number_of_songs;
    var mean_time_s = mean_time_ms / 1000;
    return { "songs": songs, "mean_time_s": mean_time_s, "artists": artists, "explisit_rate": explisit_rate };
}
