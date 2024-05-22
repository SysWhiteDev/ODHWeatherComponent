import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import useLiveMapData from "../hooks/state/useLiveMapData";
import { useModalDataStore } from "../hooks/state/useModalData";
import Spinner from "./utils/Spinner";
import useAttributes from "../hooks/useAttributes";

type BaseMapProps = {
  className?: string;
  startingPos: any;
  markerList: any;
  setModal: any;
  modal: any;
};

const BaseMap = ({
  className,
  startingPos,
  setModal,
  modal,
}: BaseMapProps): React.JSX.Element => {
  const { attributes } = useAttributes();
  const [markers, setMarkers] = useLiveMapData();
  const { findClosestTimestampIndex } = useModalDataStore();

  const formatSecondsAgo = (timestamp: any) => {
    const timeDifference = new Date().getTime() - new Date(timestamp).getTime();
    const seconds = Math.floor(Math.max(0, timeDifference) / 1000);
    if (seconds === 0) {
      return `just now`;
    }
    else if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minute${
        Math.floor(seconds / 60) !== 1 ? "s" : ""
      } ago`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hour${
        Math.floor(seconds / 3600) !== 1 ? "s" : ""
      } ago`;
    } else {
      return `${Math.floor(seconds / 86400)} day${
        Math.floor(seconds / 86400) !== 1 ? "s" : ""
      }ago`;
    }
  };

  return (
    <MapContainer
      className={className}
      center={startingPos}
      zoom={13}
      scrollWheelZoom
      zoomControl={false}
      attributionControl={false}
    >
      <ZoomControl position={"bottomright"}></ZoomControl>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker: any, index: any) => {
        return (
          <Marker
            eventHandlers={{
              click: async () => {
                try {
                  const response = await fetch(
                    `https://tourism.opendatahub.com/v1/Weather/Forecast?locfilter=mun${marker.id}`
                  );
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  const data = await response.json();

                  await findClosestTimestampIndex(data).then(
                    (ClosestTimestampIndex: any) => {
                      const updatedMarkers = markers.map(
                        (targetMarker: any) => {
                          if (targetMarker.id === marker.id) {
                            return {
                              ...targetMarker,
                              updateTimestamp:
                                data[0].Forecast3HoursInterval[
                                  ClosestTimestampIndex
                                ].Date,
                              currentTemp:
                                data[0].Forecast3HoursInterval[
                                  ClosestTimestampIndex
                                ].Temperature,
                              maxTemp: data[0].ForeCastDaily.filter(
                                (day: any) =>
                                  new Date(day.Date).getDay() ===
                                  new Date().getDay()
                              )[0].MaxTemp,
                              minTemp: data[0].ForeCastDaily.filter(
                                (day: any) =>
                                  new Date(day.Date).getDay() ===
                                  new Date().getDay()
                              )[0].MinTemp,
                              image: data[0].ForeCastDaily.filter(
                                (day: any) =>
                                  new Date(day.Date).getDay() ===
                                  new Date().getDay()
                              )[0].WeatherImgUrl,
                              weatherStatus: data[0].ForeCastDaily.filter(
                                (day: any) =>
                                  new Date(day.Date).getDay() ===
                                  new Date().getDay()
                              )[0].WeatherDesc,
                            };
                          }
                          return targetMarker;
                        }
                      );

                      setMarkers(updatedMarkers);
                    }
                  );
                } catch (error) {
                  console.error(
                    "There was a problem with your fetch operation:",
                    error
                  );
                }
              },
            }}
            position={marker.position}
            key={index}
          >
            <Popup className="min-w-[300px]">
              <>
                {marker.minTemp && marker.maxTemp && marker.currentTemp ? (
                  <>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold truncate">
                        {marker.name}
                      </span>
                      <span className="text-xs">
                        Last update was{" "}
                        {formatSecondsAgo(marker.updateTimestamp)}
                      </span>
                    </div>
                    <div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <span className="text-4xl">
                            {marker.currentTemp}&#176;C
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center">
                              <FaDownLong color="blue" className="mr-0.5" />
                              {marker.minTemp}&#176;C
                            </span>
                            <span className="flex items-center">
                              <FaUpLong color="red" className="mr-0.5" />
                              {marker.maxTemp}&#176;C
                            </span>
                          </div>
                        </div>
                        <div>
                          {/* TODO: Current Weather Icon Component */}
                          <img
                            src={marker.image}
                            alt="weather"
                            className="w-[50px] h-[50px]"
                          />
                        </div>
                      </div>
                    </div>
                    {attributes.enableBigPopup && (
                      <button
                        onClick={() =>
                          setModal({
                            ...modal,
                            open: true,
                            data: marker,
                          })
                        }
                        className="transition-all w-full mt-2.5 justify-center duration-200 flex items-center bg-opacity-70 text-sm backdrop-blur px-5 py-1.5 bg-gray-300 dark:bg-gray-800 shadow rounded-md hover:bg-opacity-100 hover:dark:bg-opacity-85 text-black dark:text-white"
                      >
                        More info
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex flex-row gap-1.5 justify-center min-h-[160px] items-center">
                    <Spinner size={25} />
                    <span>I am retrieving the weather data</span>
                  </div>
                )}
              </>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default BaseMap;
