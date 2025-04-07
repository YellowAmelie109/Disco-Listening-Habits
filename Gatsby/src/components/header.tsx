import React, { useState } from "react";
import {get_code} from "./authorization"

const Header = () => { 
    async function handleToken(){
        let token = window.localStorage.getItem('token')||null;
        if (!token){
            get_code();
        } else{
            location.reload();
        };
        
    };

    async function getProfileData(authKey: string|null) {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + authKey},
        });
    
        let jsonData = await response.json()
    
        setUserName(await jsonData["display_name"])
    };

    function signOut(){
        window.localStorage.removeItem('token');
        location.reload();
    }

    let token = window.localStorage.getItem('token')||null
    const [userName,setUserName] = useState("Unknown")
    if (token){
        getProfileData(token)
        return(
        <div>
            <div style ={{float:'right'}}>
                <p>Logged in as: {userName}</p>
                <button type="button" onClick={() => signOut()}>Sign Out</button>
            </div>
        </div>
        );
    }
    else {
        return (
            <div>
                <div style={{float:'right'}}>
                    <button style = {{float:'right'}} type="button" onClick={() => handleToken()}>Login</button>
                    <p>Refresh or press login again if you just logged in</p>
                </div>
            </div>
        );
    };
};

export default Header;

