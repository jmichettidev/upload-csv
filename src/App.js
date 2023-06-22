import React, { useState } from 'react';
import Papa from 'papaparse';
import './App.css'; // Importe o arquivo CSS com o estilo criado

function App() {
  const [csvData, setCsvData] = useState([]);
  const [totalCol8, setTotalCol8] = useState(0);
  const [totalCol9, setTotalCol9] = useState(0);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (results) => {
        const data = results.data;
        setCsvData(data);
        calculateTotal(data);
        calculateTotalEstimate(data);
      },
    });
  };

  const calculateTotal = (data) => {
    let total = 0;
    for (let i = 1; i < data.length; i++) {
      const value = parseFloat(data[i][7]);
      if (!isNaN(value)) {
        total += value;
      }
    }
    setTotalCol8(total);
  };

  const calculateTotalEstimate = (data) => {
    let total = 0;
    for (let i = 1; i < data.length; i++) {
      const value = parseFloat(data[i][8]);
      if (!isNaN(value)) {
        total += value;
      }
    }
    setTotalCol9(total);
  };

  return (
    <div>
      <h1>Upload de Arquivo CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Total Concluido: {totalCol8}</p>
      <p>Total Estimado: {totalCol9}</p>
    </div>
  );
}

export default App;
