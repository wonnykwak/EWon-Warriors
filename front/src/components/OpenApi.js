import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

let tableContainer; 
function displayTables(tables) {
  // Remove any existing tables from the page
  tableContainer = document.getElementById("bob");
  console.log(tableContainer);
  tableContainer.innerHTML = "";

  // Create and display a new table for each extracted table
  tables.forEach((tableData, index) => {
    const table = document.createElement("table");
    table.classList.add("extracted-table");
    table.style.borderCollapse = "collapse";
    table.style.width = "80%";
    table.style.margin = "20px auto";
    table.style.marginBottom = "20px";

    // Create table headers
    
    const headerRow = document.createElement("tr");
    Object.keys(tableData[0]).forEach((key) => {
      const headerCell = document.createElement("th");
      headerCell.textContent = key;
      headerCell.style.border = "1px solid black";
      headerCell.style.padding = "8px";
      headerCell.style.textAlign = "left";
      headerCell.style.backgroundColor = "#f2f2f2";
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);


    // Create table rows
    tableData.forEach((row) => {
      
      const tableRow = document.createElement("tr");
      Object.values(row).forEach((value) => {
        const tableCell = document.createElement("td");
        tableCell.textContent = value;
        tableCell.style.border = "1px solid black";
        tableCell.style.padding = "8px";
        tableRow.appendChild(tableCell);
      });
      table.appendChild(tableRow);
  
    });

    // Add the table to the container
    tableContainer.appendChild(table);
  });
}

const MyForm = () => {
  console.log("hello")
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (event) => {      
        event.preventDefault();  
            const response = await axios.post("extract_data/", { user_prompt: inputValue }, 
              {
                headers: {
                  'Authorization': 'Token django-insecure-!kv1n!tj$^jna+%+4tm_ual=u#3yi8(*xzah+yjm^ty%jqtz3g',
                  'Content-Type': 'application/json'
                }
              }
            );
            const tables = response.data.tables.map((tableJson) => JSON.parse(tableJson));
            //const { tables } = await response.json();
            console.log(tables)
            //const parsedTables = tables.map(table => JSON.parse(table));
            // Process the tables and display them on the page
            displayTables(tables);
          //  catch (error) {
          //   console.error("Error fetching data:", error);
          // }
       
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    };

    return (
        
        <div className="form-container">
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="form-outline w-50" style={{textAlign:"center"}}>
                <input type="text" id="input1" className="form-control" name="data" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                <button className="btn btn-primary mt-3" type="submit">Search</button>
            </div>
        </form>
        </div>
    );
};

export default MyForm;