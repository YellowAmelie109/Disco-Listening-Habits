var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    return { "songs": songs, "mean_time_s": mean_time_s, "artists": artists, "explicit_rate": explisit_rate };
}
function getJson(authKey) {
    function getUserData(authKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://api.spotify.com/v1/me", {
                            method: 'GET',
                            headers: { 'Authorization': 'Bearer ' + authKey.access_token },
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    ;
    var jsonObject = getUserData(authKey);
    return jsonObject;
}
