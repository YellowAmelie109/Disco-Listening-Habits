import React, { useState } from "react";
import {get_code} from "./authorization";

const headerStyle = {
    listStyleType: "none",
    marginTop: "3em",
    marginLeft: "5%",
    padding: 4,
    backgroundColor: "#111400",
    position: "fixed",
    top: 0,
    right:0,
    left:0,
    borderRadius: "0.75em",
    width:"90%",
    height: "2.5em",
    textAlign: "center",
}

const buttonStyle = {
    backgroundColor: "#e1ff00",
    color: "#111400",
    textAlign: "center",
    cursor: "pointer",
    border: "none",
    borderRadius: "0.25em",
    height: "2em",
    marginTop: "0.5em",
}

const Header = () => { 
    async function handleToken(){ //Gets token when button clicked
        let token = window.localStorage.getItem('token')||null;
        if (!token){
            get_code();
        } else{
            location.reload();
        };
        
    };

    async function getProfileData(authKey: string|null) { //Returns spotify username of user
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + authKey},
        });
    
        let jsonData = await response.json()
    
        setUserName("Logged in as: " + await jsonData["display_name"])
    };

    function signOut(){ //Removes token from local storage
        window.localStorage.removeItem('token');
        location.reload();
    }

    function handleClick(token:string|null){
        if (!token){
            handleToken();
            //setLogStatus("Sign out")
        }
        else{
            signOut();
            //setLogStatus("Sign in")
        }
    }

    let token:string|null = null
    typeof window !== "undefined"? (() => { 
        token = window.localStorage.getItem('token')||null //Gets token is there is one already stored, otherwise is null
    })(): "";
    const [userName,setUserName] = useState("Please log in") //Ensures username can be displayed as it may be returned after rendering
    const [logStatus,setLogStatus] = useState("Sign in")
    if (token){ //Logged in state
        getProfileData(token)
        if (logStatus === "Sign in"){
            setLogStatus("Sign out")
        }
    }

    return(
    <div>
        <ul style = {headerStyle}>
                <li style = {{float:"left",marginLeft:1}}>
                    <a href="https://itsdisco.com">
                        <img src={require("../images/DiscoLogo.png").default} style = {{height:"2.25em"}}/>
                    </a>
                </li>
                <li style = {{display:"inline-block",color:"#fcffd9", marginTop:"0.55em"}}>{userName}</li>
                <li style = {{float:"right",marginRight:"1em"}}>
                    <button type="button" style = {buttonStyle} onClick={() => handleClick(token)}>{logStatus}</button>
                </li>
            </ul>
        </div>
        );
    
    /*else { //Logged out state
        return (
            <div>
                <ul style = {headerStyle}>
                    <li style = {{float:"left",marginLeft:"1em"}}>Disco logo</li>
                    <li style = {{float:"right",marginRight:"1em"}}>
                        <button type="button" onClick={() => handleToken()}>Sign in</button>
                    </li>
                </ul>
            </div>
        );
    };*/
};

export default Header;

