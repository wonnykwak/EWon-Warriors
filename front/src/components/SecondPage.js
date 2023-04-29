import React, { Component } from "react";
import OpenApi from "./OpenApi";

function SecondPage() {
    return (
        <div id="SecondPage" class="main-page-div">
            <h1 style={{fontFamily:'Red Hat Display', fontSize:"8vh", textAlign:"center", paddingTop:"3%", paddingBottom:"1%"}}> InsureIQ.io </h1> 
            <p style={{fontFamily:'Red Hat Display', textAlign:"center"}}> Ask me a question </p>
            <OpenApi />
            <table>
                <tr>
                    <td class="rounded-box"><div class="table-div"><img class="medimg" src="images/medimg.png"/> <h3 class="table-words"> Medicine </h3> </div> </td>
                    <td class="rounded-box"><div class="table-div"><img class="medimg" src="images/emergency.jpg"/> <h3 class="table-words"> Emergency Health </h3> </div></td>
                    <td class="rounded-box"><div class="table-div"><img class="medimg" src="images/visit.jpg"/> <h3 class="table-words"> Doctor's Visits </h3> </div></td>
                </tr>
                <tr>
                    <td class="rounded-box"><div class="table-div"><img class="medimg" src="images/injury.png"/> <h3 class="table-words"> Major Injuries </h3> </div></td>
                    <td class="rounded-box"><div class="table-div"><img class="medimg" src="images/immunization.jpeg"/> <h3 class="table-words"> Immunizations </h3> </div></td>
                    <td class="rounded-box"><div class="table-div"><img class="medimg" src="images/dental.jpeg"/> <h3 class="table-words"> Dental Care </h3> </div></td>
                </tr>
            </table>
        
        </div>
    )
}
export default SecondPage;