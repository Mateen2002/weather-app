import React, { useState, useEffect } from 'react';

const LocationDetector = ({ onDetectLocation }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        onDetectLocation(latitude, longitude);
      }, (error) => {
        setError(error.message);
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, [onDetectLocation]);

  return (
    <div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LocationDetector;
