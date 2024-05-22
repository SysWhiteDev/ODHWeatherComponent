import { useEffect, useRef } from "react";
import { useModalDataStore } from "../../hooks/state/useModalData";
import Spinner from "../utils/Spinner";

const CurrentWeather = () => {
  const { ModalData, ClosestTimestampIndex, fetchModalData } =
    useModalDataStore();

  const timeout = useRef<any>(null);
  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    
    timeout.current = setTimeout(() => {
      fetchModalData(ModalData.id);
    }, 3600000); // 1h
  }, [ModalData.id, fetchModalData]);

  return (
    <div className="overflow-hidden bg-neutral-50 dark:bg-neutral-800 w-full rounded-md shadow p-4">
      <div className="flex items-center justify-start text-md pb-4 text-neutral-700 dark:text-neutral-300 font-light">
        Current Weather{" "}
        <div className="flex text-white animate-pulse items-center ml-1.5 text-sm  whitespace-nowrap bg-red-500 px-1.5 py-.5 rounded-md font-bold">
          <div className="h-2 w-2 mr-1  bg-white rounded-full"></div>
          LIVE
        </div>
      </div>
      <>
        <div className="flex flex-col items-center gap-4 justify-around">
          {ModalData && ModalData.forecast ? (
            <>
              <div className="flex flex-col items-center my-7 justify-center">
                <p className="text-8xl font-normal">
                  {
                    ModalData.forecast.Forecast3HoursInterval[
                      ClosestTimestampIndex
                    ].Temperature
                  }
                  &#176;C
                </p>
                <span className="text-lg opacity-100 dark:opacity-70">
                  <span className="dark:text-blue-400 text-blue-500">
                    {ModalData.forecast.ForeCastDaily.filter((day: any) => new Date(day.Date).getDay() === new Date().getDay())[0].MinTemp}&#176;
                  </span>{" "}
                  /{" "}
                  <span className="dark:text-red-400 text-red-500">
                    {ModalData.forecast.ForeCastDaily.filter((day: any) => new Date(day.Date).getDay() === new Date().getDay())[0].MaxTemp}&#176;
                  </span>
                </span>
              </div>
              <div className="overflow-auto w-full">
                <div className="grid gap-2">
                  <div className="flex flex-row truncate py-1 justify-center rounded-lg items-center pl-1 pr-2.5 gap-1.5 bg-black bg-opacity-10 dark:bg-opacity-20">
                    <img
                      src={
                        ModalData &&
                        ModalData.forecast &&
                        ModalData.forecast.Forecast3HoursInterval[
                          ClosestTimestampIndex
                        ].WeatherImgUrl
                      }
                      alt="weather"
                      className="w-[30px] h-[30px] translate-y-[3px]"
                    />
                    <p className="text-sm truncate font-semibold">
                      {ModalData.forecast.Forecast3HoursInterval[
                        ClosestTimestampIndex
                      ].WeatherDesc.charAt(0).toUpperCase() +
                        ModalData.forecast.Forecast3HoursInterval[
                          ClosestTimestampIndex
                        ].WeatherDesc.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Spinner size={220} />
              <div className="flex flex-2 flex-col">
                <div className="animate-pulse hidden md:visible">
                  <div className="w-[120%] h-8 animation-pulse rounded-md bg-neutral-700"></div>
                </div>
                <p className="font-light text-lg opacity-70">
                  I am talking with the servers...
                </p>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default CurrentWeather;
