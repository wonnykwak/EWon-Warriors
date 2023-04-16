import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

let tableContainer; 
function displayTables(tables) {
    // Remove any existing tables from the page
    tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";
  
    // Create and display a new table for each extracted table
    tables.forEach((tableData, index) => {
      const table = document.createElement("table");
      table.classList.add("extracted-table");
  
      // Create table headers
      const headerRow = document.createElement("tr");
      Object.keys(tableData[0]).forEach((key) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
      });
      table.appendChild(headerRow);
  
      // Create table rows
      tableData.forEach((row) => {
        const tableRow = document.createElement("tr");
        Object.values(row).forEach((value) => {
          const tableCell = document.createElement("td");
          tableCell.textContent = value;
          tableRow.appendChild(tableCell);
        });
        table.appendChild(tableRow);
      });
  
      // Add the table to the container
      tableContainer.appendChild(table);
    });
  }

const MyForm = () => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (event) => {
        try {
            const response = await axios.post("extract_data/", { user_prompt: inputValue });
            const tables = response.data.tables.map((tableJson) => JSON.parse(tableJson));
            // Process the tables and display them on the page
            displayTables(tables);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        event.preventDefault();
        const data = { input: inputValue };
        console.log("aaaaaaaaaaaa" + inputValue)
        const response = await fetch('/extract_data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    };

    return (
        
        <div class="form-container">
        <form className="search-bar" onSubmit={handleSubmit}>
            <div class="form-outline w-50" style={{textAlign:"center"}}>
                <input type="text" id="input1" class="form-control" name="data" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                <button class="btn btn-primary mt-3" type="submit">Submit</button>
            </div>
        </form>
        </div>
    );
};

export default MyForm;