import React, { useState } from "react";
import {getArtistInfo} from "./reading";

const imageStyle = {
    width: '20%',
    display: 'inline-block',
}

const textStyle = {
    width: '20%',
    display: 'inline-block',
    textAlign: 'center',
    maxWidth: '95%',
    overflow: 'auto',
}

const artistList = () => {
    async function handleJSON(){
        setArtists(await getArtistInfo());
    }

    const [artists, setArtists] = React.useState([]);
    React.useEffect(() => {
        if (localStorage.getItem('token')){
        handleJSON();
        };
    }, []);
    if (artists.length === 5){
        return(
            <div>
                <h2 style = {{paddingLeft: 8}}>Top Artists:</h2>
                <img src={artists[0]["images"][0]["url"]} style = {imageStyle} alt = {artists[0]["name"]}></img>
                <img src={artists[1]["images"][0]["url"]} style = {imageStyle} alt = {artists[1]["name"]}></img>
                <img src={artists[2]["images"][0]["url"]} style = {imageStyle} alt = {artists[2]["name"]}></img>
                <img src={artists[3]["images"][0]["url"]} style = {imageStyle} alt = {artists[3]["name"]}></img>
                <img src={artists[4]["images"][0]["url"]} style = {imageStyle} alt = {artists[4]["name"]}></img>
                <p style = {textStyle}>{artists[0]["name"]}</p>
                <p style = {textStyle}>{artists[1]["name"]}</p>
                <p style = {textStyle}>{artists[2]["name"]}</p>
                <p style = {textStyle}>{artists[3]["name"]}</p>
                <p style = {textStyle}>{artists[4]["name"]}</p>
            </div>
        )
    }else if (artists.length === 1){
        return(
            <div>
                <h2 style = {{paddingLeft:8}}>Top Artists:</h2>
                <img src={artists[0]["images"][0]["url"]} style = {imageStyle} alt = {artists[0]["name"]}></img>
                <p style = {{width:"20%",overflow:"auto",textAlign:"center"}}>{artists[0]["name"]}</p>
            </div>
        )
    }
}
export default artistList;
