import React from "react";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import Spinner from "../utils/Spinner";
import { useModalDataStore } from "../../hooks/state/useModalData";
type ForcecastWeeklyProps = {
  modalData: any;
};

const ForecastWeekly = ({ modalData }: ForcecastWeeklyProps) => {
  const { ModalData } = useModalDataStore();

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 w-full rounded-md  shadow  mt-3">
      <p className="text-md pt-4 pb-1.5 pl-4 text-neutral-700 dark:text-neutral-300 font-light">
        {ModalData &&
          ModalData.forecast &&
          ModalData.forecast.ForeCastDaily.length - 1}
        -day forecast
      </p>
      <>
        <div className="flex items-center gap-6 justify-evenly pt-0 p-4 overflow-x-auto">
          {ModalData && ModalData.forecast ? (
            ModalData.forecast.ForeCastDaily.map(
              (day: any, index: number) =>
                ModalData.forecast.ForeCastDaily[index].WeatherImgUrl && (
                  <div
                    key={index}
                    className={`${
                      new Date(day.Date).getDay() === new Date().getDay()
                        ? "bg-neutral-200 dark:bg-neutral-900"
                        : ""
                    } flex rounded-md p-2  min-w-[100px] flex-col items-center justify-center gap-1 text-center`}
                  >
                    <img
                      src={
                        ModalData.forecast.ForeCastDaily[index].WeatherImgUrl
                      }
                      className="w-[35px] h-[35px] mt-4"
                      alt="weather"
                    />
                    <span className="text-sm w-full gap-1 justify-center flex items-center dark:bg-red-400 bg-red-300 dark:text-white text-red-800 px-1.5 py-0.5 rounded-md">
                      <FaUpLong size={12} />
                      {ModalData && ModalData.forecast
                        ? ModalData.forecast.ForeCastDaily[index].MaxTemp || "-"
                        : "-"}
                      &#176;C
                    </span>
                    <span className="text-sm  mb-4 w-full justify-center flex items-center gap-1 dark:bg-blue-400 bg-blue-300 dark:text-white text-blue-800 px-1.5 py-0.5 rounded-md">
                      <FaDownLong size={12} />
                      {ModalData && ModalData.forecast
                        ? ModalData.forecast.ForeCastDaily[index].MinTemp || "-"
                        : "-"}
                      &#176;C
                    </span>
                    <p
                      className={`${
                        new Date(day.Date).getDay() === new Date().getDay()
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }`}
                    >
                      {new Date(day.Date).getDay() !== new Date().getDay()
                        ? days[
                            new Date(
                              ModalData.forecast.ForeCastDaily[index].Date
                            ).getDay()
                          ]
                        : "Today"}
                    </p>
                  </div>
                )
            )
          ) : (
            <div className="flex gap-2 items-center min-h-[150px]">
              <Spinner size={30} />
              <span>I'm getting this week's forecasts</span>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default ForecastWeekly;
