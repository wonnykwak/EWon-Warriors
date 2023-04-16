import React, { Component } from "react";
import OpenApi from "./OpenApi";

function SecondPage() {
    return (
        <div>
            <h1 style={{fontFamily:"PT Serif", fontSize:"8vh", textAlign:"center", paddingTop:"3%", paddingBottom:"3%"}}> InsureIQ.io </h1> 
            <OpenApi />
            <table>
                <tr>
                    <td class="rounded-box">Medicine</td>
                    <td class="rounded-box">Emergency Health</td>
                    <td class="rounded-box">Concussions</td>
                </tr>
                <tr>
                    <td class="rounded-box">Major Injuries</td>
                    <td class="rounded-box">Minor Injuries</td>
                    <td class="rounded-box">Hygiene</td>
                </tr>
            </table>
        
        </div>
    )
}
export default SecondPage;