import React, { useState } from "react";

function App() {
  const [number, setNumber] = useState(null);

  const generate = async () => {
    const res = await fetch("http://localhost:5000/random");
    const data = await res.json();
    setNumber(data.number);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={generate}>Generate Number</button>
      {number !== null && <h1>{number}</h1>}
    </div>
  );
}

export default App;


