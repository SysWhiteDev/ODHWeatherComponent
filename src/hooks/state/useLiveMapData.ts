import { useState, useEffect } from "react";
let cachedData: any = [];

const useLiveMapData = () => {
  const [liveMapData, setLiveMapData] = useState<any>(cachedData);

  useEffect(() => {
    if (cachedData.length === 0) {
      fetch(
        "https://tourism.opendatahub.com/v1/Municipality?removenullvalues=true",
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const transformedData = data.map((location: any) => ({
            id: location.Id,
            name: location.Shortname,
            position: [
              location.GpsInfo[0].Latitude,
              location.GpsInfo[0].Longitude,
            ],
            updateTimestamp: null,
            currentTemp: null,
            minTemp: null,
            maxTemp: null,
            currentWeather: null,
          }));
          setLiveMapData(transformedData);
          cachedData = transformedData;
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error,
          );
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [liveMapData, setLiveMapData];
};

export default useLiveMapData;
