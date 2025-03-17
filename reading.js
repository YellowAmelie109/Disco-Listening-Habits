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
    return __awaiter(this, void 0, void 0, function () {
        var songs, times_ms, number_of_songs, artists, explicit_rate, i, song, _a, _b, _c, _d, _e, _f, _g, _i, key_1, _h, _j, element, _k, _l, _m, mean_time_ms, key_2, element, mean_time_s;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    songs = [];
                    times_ms = [];
                    return [4 /*yield*/, jsonObject["total"]];
                case 1:
                    number_of_songs = _o.sent();
                    artists = [];
                    explicit_rate = 0;
                    i = 0;
                    _o.label = 2;
                case 2:
                    if (!(i < number_of_songs)) return [3 /*break*/, 16];
                    return [4 /*yield*/, jsonObject["items"][i]];
                case 3:
                    song = _o.sent();
                    _b = (_a = songs).push;
                    return [4 /*yield*/, song["name"]];
                case 4:
                    _b.apply(_a, [_o.sent()]);
                    _d = (_c = times_ms).push;
                    return [4 /*yield*/, song["duration_ms"]];
                case 5:
                    _d.apply(_c, [_o.sent()]);
                    return [4 /*yield*/, song["artists"]];
                case 6:
                    _e = _o.sent();
                    _f = [];
                    for (_g in _e)
                        _f.push(_g);
                    _i = 0;
                    _o.label = 7;
                case 7:
                    if (!(_i < _f.length)) return [3 /*break*/, 13];
                    _g = _f[_i];
                    if (!(_g in _e)) return [3 /*break*/, 12];
                    key_1 = _g;
                    _j = (_h = Object.prototype.hasOwnProperty).call;
                    return [4 /*yield*/, song["artists"]];
                case 8:
                    if (!_j.apply(_h, [_o.sent(), key_1])) return [3 /*break*/, 11];
                    return [4 /*yield*/, song["artists"][key_1]];
                case 9:
                    element = _o.sent();
                    _l = (_k = artists).push;
                    return [4 /*yield*/, element["name"]];
                case 10:
                    _l.apply(_k, [_o.sent()]);
                    _o.label = 11;
                case 11:
                    ;
                    _o.label = 12;
                case 12:
                    _i++;
                    return [3 /*break*/, 7];
                case 13:
                    ;
                    return [4 /*yield*/, song["explicit"]];
                case 14:
                    if (_o.sent()) {
                        explicit_rate = explicit_rate + 1;
                    }
                    _o.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 2];
                case 16:
                    ;
                    _m = explicit_rate;
                    return [4 /*yield*/, number_of_songs];
                case 17:
                    explicit_rate = _m / (_o.sent());
                    mean_time_ms = 0;
                    for (key_2 in times_ms) {
                        if (Object.prototype.hasOwnProperty.call(times_ms, key_2)) {
                            element = times_ms[key_2];
                            mean_time_ms = mean_time_ms + element;
                        }
                        ;
                    }
                    ;
                    mean_time_ms = mean_time_ms / number_of_songs;
                    mean_time_s = mean_time_ms / 1000;
                    return [2 /*return*/, { "songs": songs, "mean_time_s": mean_time_s, "artists": artists, "explicit_rate": explicit_rate }];
            }
        });
    });
}
function getJsonData(authKey) {
    return __awaiter(this, void 0, void 0, function () {
        var response, jsonData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0", {
                        method: 'GET',
                        headers: { 'Authorization': 'Bearer ' + authKey },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    jsonData = _a.sent();
                    return [4 /*yield*/, jsonData];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
;
function main(authKey) {
    return __awaiter(this, void 0, void 0, function () {
        var songInfo, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = handleResponse;
                    return [4 /*yield*/, getJsonData(authKey)];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                    songInfo = _b.sent();
                    console.log(songInfo);
                    return [2 /*return*/, songInfo];
            }
        });
    });
}
;
var key = "BQBKrzwshGu4eThAQZpK1Iv81T7ZnXRB9ce0WP3XHXkunw8vWKp4ipxLJ2YfKX9Xuj0is_8dduX2SqnsK2EGHHZG5DxPHQjWISwSnsOYbYml0tm_Wu5M0M4ZMum-GWEvjykX6D581i0wt0638QExhMV6tn5ftEjSG8JrlFUZIhQmeCq-jNY2TonHgmA0j1TX6h4Ig-ayMH41Sa_GDd9Wp-S60EC2Sl8EUQeiAuIIsGwXRddCKOLiXql-5UU";
main(key);
