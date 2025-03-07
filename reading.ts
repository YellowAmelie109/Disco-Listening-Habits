import * as fs from 'fs';


function handleResponse(){
    let songs: string[]

    const jsonData = fs.readFileSync('response.json', 'utf8');
    const jsonObject = JSON.parse(jsonData);

    for (const key in jsonObject) {
        if (Object.prototype.hasOwnProperty.call(jsonObject, key)) {
            const element = jsonObject[key];
            console.log(element)
        };
    };
    //console.log(jsonObject);
    //songs.push()
}

handleResponse()