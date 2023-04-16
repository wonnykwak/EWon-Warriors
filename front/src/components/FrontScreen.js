import React, { Component } from "react";
import { HashLink } from "react-router-hash-link";

import { Link } from 'react-router-dom';
import SecondPage from "./SecondPage";

function FrontScreen() {
    return (
        <div className="front-div">
            <div>
            
                <video autoPlay loop muted plays-inline style={{zIndex: "-1", objectFit: "contain", width: "100%", minHeight: "100%", position: "absolute", objectFit: "cover"}}> 
                
                    <source src="videos/video.mp4" type="video/mp4" /> 
                </video>
                
            </div>
            <div className = "title-words">
                <h1> Insurance </h1> 
                <h3> Simplified. </h3>
                <p> No More Confusing SHIP</p>
                {/* <HashLink to="#SecondPage">
                    
                    <h1> Hello </h1>
                {/* </HashLink> */}
                {/* <Link to="../public/second.html">
                    <button>Go to Other File</button>
                </Link> */} 
                <HashLink to={"#SecondPage"}>
                Hello
                </HashLink>
                
                
            </div>
            
        
    </div>
    )
}
export default FrontScreen;