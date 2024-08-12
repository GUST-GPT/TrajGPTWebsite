

import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import './App.css'; // Adjust the path as per your actual CSS file location

function App() {
  const [trajectoriesReceivedMap, setTrajectoriesReceivedMap] = useState(null);
  const [cityCenter, setCityCenter] = useState([40.712776, -74.005974]); // Default to New York City coordinates

  const handleCityUpdate = (coordinates) => {
    setCityCenter(coordinates);
  };
  const handleImageUpdate = (data) => {

    setTrajectoriesReceivedMap(data);
  };

  return (
    <Box className="body-background" sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header handleImageUpdate={handleImageUpdate} handleCityUpdate={handleCityUpdate} />
      <div style={{ marginTop: '1px', height: '100vh', width: '82vw' }}>
        <MapComponent trajectoriesReceived={trajectoriesReceivedMap} CityName={cityCenter} />
      </div>
    </Box>
  );
}

export default App;