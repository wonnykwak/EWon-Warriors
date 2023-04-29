import React, { Component } from "react";
import { HashLink } from "react-router-hash-link";

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Link } from 'react-router-dom';
import SecondPage from "./SecondPage";

function FrontScreen() {

            AOS.init();

    return (
        <div className="front-div">
            {/* <div>
                <img className="background-picture" src = "images/green.jpeg" />
                
            </div> */}
            <div className = "title-words">
                <h1 data-aos="slide-right" data-aos-delay="4000"> Insurance </h1> 
                <h3 data-aos="slide-left"> Simplified. </h3>
                
                
                <HashLink to={"#SecondPage"}>
                    Explore
                </HashLink>
                
                
            </div>
            
            
        
    </div>
    )
}
export default FrontScreen;