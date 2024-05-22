import React from "react";
import Spinner from "../utils/Spinner";
import { useModalDataStore } from "../../hooks/state/useModalData";
import { IoRainy } from "react-icons/io5";

const ForecastWeekly = () => {
  const { ModalData, ClosestTimestampIndex } = useModalDataStore();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 w-full rounded-md  shadow  mt-3">
      <p className="text-md pt-4 pb-1.5 pl-4 text-neutral-700 dark:text-neutral-300 font-light">
        3 hours gap forecast
      </p>
      <>
        <div className="flex items-center gap-6 justify-evenly pt-0 p-4 overflow-x-auto">
          {ModalData && ModalData.forecast ? (
            ModalData.forecast.Forecast3HoursInterval.map(
              (day: any, index: number) =>
                new Date(
                  ModalData.forecast.Forecast3HoursInterval[index].Date
                ) >
                  new Date(
                    ModalData.forecast.Forecast3HoursInterval[
                      ClosestTimestampIndex
                    ].Date
                  ) &&
                ModalData.forecast.Forecast3HoursInterval[ClosestTimestampIndex]
                  .WeatherImgUrl && (
                  <div
                    key={index}
                    className={`${
                      new Date(
                        ModalData.forecast.Forecast3HoursInterval[index].Date
                      ).getTime() ===
                      new Date(
                        ModalData.forecast.Forecast3HoursInterval[
                          ClosestTimestampIndex
                        ].Date
                      ).getTime()
                        ? "bg-neutral-200 dark:bg-neutral-900"
                        : ""
                    } flex rounded-md p-2  min-w-[100px] flex-col items-center justify-center gap-1 text-center`}
                  >
                    <img
                      src={
                        ModalData.forecast.Forecast3HoursInterval[index]
                          .WeatherImgUrl
                      }
                      className="w-[35px] h-[35px] mt-4"
                      alt="weather"
                    />
                    <span className="flex flex-row -translate-y-1.5 gap-1.5 items-center">
                      <IoRainy />
                      {
                        ModalData.forecast.Forecast3HoursInterval[index]
                          .PrecipitationProbability
                      }
                      %
                    </span>
                    <span className="mb-4 -translate-y-1.5 font-semibold">
                      {
                        ModalData.forecast.Forecast3HoursInterval[index]
                          .Temperature
                      }
                      &#176;C
                    </span>

                    <p
                      className={`${
                        new Date(
                          ModalData.forecast.Forecast3HoursInterval[index].Date
                        ).getTime() ===
                        new Date(
                          ModalData.forecast.Forecast3HoursInterval[
                            ClosestTimestampIndex
                          ].Date
                        ).getTime()
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }`}
                    >
                      {new Date(
                        ModalData.forecast.Forecast3HoursInterval[index].Date
                      ).getTime() !==
                      new Date(
                        ModalData.forecast.Forecast3HoursInterval[
                          ClosestTimestampIndex
                        ].Date
                      ).getTime()
                        ? new Date(
                            ModalData.forecast.Forecast3HoursInterval[
                              index
                            ].Date
                          )
                            .toISOString()
                            .substring(11, 16)
                        : "Now"}
                    </p>
                  </div>
                )
            )
          ) : (
            <div className="flex gap-2 items-center min-h-[150px]">
              <Spinner size={30} />
              <span>I'm getting today's forecast</span>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default ForecastWeekly;
