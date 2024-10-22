import React, { useState } from 'react';
import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
    lat: 17.5497769,
    lng: 78.1548201, 
  };
  
  

function MapComponent() {
  const [mapLoaded, setMapLoaded] = useState(false); // Track if the map is loaded

  const handleOnLoad = () => {
    setMapLoaded(true);
  };

  const handleOnPolygonComplete = (polygon) => {
    const path = polygon.getPath();
    const coordinates = [];
    for (let i = 0; i < path.getLength(); i++) {
      coordinates.push({
        lat: path.getAt(i).lat(),
        lng: path.getAt(i).lng(),
      });
    }
    console.log('Polygon Coordinates:', coordinates);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['drawing']}
      onLoad={handleOnLoad}
    >
      {mapLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            mapTypeId: 'satellite',
            disableDefaultUI: true,
          }}
        >
          <DrawingManager
            onPolygonComplete={handleOnPolygonComplete}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon'],
              },
              polygonOptions: {
                fillColor: '#000',
                fillOpacity: 0.5,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                draggable: true,
              },
            }}
          />
        </GoogleMap>
      )}
    </LoadScript>
  );
}

export default MapComponent;
