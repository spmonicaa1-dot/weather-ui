import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "CPKRPQXTDKKW34FUEHEDYRSZB"; 

  const fetchWeather = async () => {
    if (!city || !date) {
      setError("Please enter city and select a date");
      return;
    }

    try {
      setLoading(true);
      setError("");
    
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );

      if (!response.ok) throw new Error("Data not found for this city/date");

      const data = await response.json();

      setWeather({
        cityName: data.address,
        temp: data.days[0].temp,
        humidity: data.days[0].humidity,
        condition: data.days[0].conditions,
        description: data.days[0].description,
        date: data.days[0].datetime
      });

    } catch (err) {
      setError("Error fetching data. Check city name or API limits.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🌦️ Universal Weather Dashboard</h2>
      <p>(Past, Current & Future)</p>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter city (e.g. Chennai)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <button onClick={fetchWeather} style={styles.button}>Get Weather</button>
      </div>

      {loading && <p>Searching records...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={styles.card}>
          <h3>{weather.cityName.toUpperCase()}</h3>
          <p><strong>Date:</strong> {weather.date}</p>
          <hr />
          <p><strong>Temperature:</strong> {weather.temp} °C</p>
          <p><strong>Condition:</strong> {weather.condition}</p>
          <p style={{fontSize: '14px', color: '#666'}}>{weather.description}</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px", fontFamily: "Segoe UI, Arial" },
  searchBox: { marginBottom: "20px", display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' },
  input: { padding: "10px", width: "200px", borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: "10px 20px", cursor: "pointer", backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' },
  card: { marginTop: "20px", display: "inline-block", padding: "30px", borderRadius: "15px", backgroundColor: "#fff", boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '1px solid #eee', maxWidth: '400px' }
};

export default App;