import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

import Forecast24hours from "./modalComponents/Forecast24hours";
import ForecastWeekly from "./modalComponents/ForecastWeekly";
import PrecProb from "./modalComponents/PrecProb";
import Sunshine from "./modalComponents/Sunshine";
import PrecipitationMillimeters from "./modalComponents/PrecipitationMillimeters";
import WebcamsPage from "./Webcam";
import CurrentWeather from "./modalComponents/CurrentWeather";
import { useModalDataStore } from "../hooks/state/useModalData";
import useAttributes from "../hooks/useAttributes";

type ModalProps = {
  modalData: any;
  setModalData: any;
};

const Modal = ({ modalData, setModalData }: ModalProps): React.JSX.Element => {
  const [modalPage, setModalPage] = React.useState(0);
  const { ModalData, ClosestTimestampIndex } = useModalDataStore();
  const { attributes } = useAttributes();
  const { fetchModalData } = useModalDataStore();
  useEffect(() => {
    const fetchModal = async () => {
      fetchModalData(modalData.data.id);
    };
    fetchModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData.open]);

  const formatSecondsAgo = (timestamp: any) => {
    const timeDifference = new Date().getTime() - new Date(timestamp).getTime();
    const seconds = Math.floor(Math.max(0, timeDifference) / 1000);
    if (seconds === 0) {
      return `just now`;
    }
    if (seconds < 60) {
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
    <>
      {modalData.open && (
        <div
          className={`${
            attributes.enableBigPopupTakefullviewport ? "fixed" : "absolute"
          } text-left flex justify-center items-end sm:items-center top-0 left-0 bottom-0 right-0 bg-neutral-800 bg-opacity-45 z-50`}
        >
          <div className="bg-neutral-100 dark:bg-neutral-900 dark:text-white flex-col h-[100%] sm:h-[80%]  max-w-5xl w-dvw md:w-[90dvw] xl:w-[65dvw] pt-4 sm:rounded-md gap-16">
            <div className="flex justify-between w-full px-4">
              <div className="flex-col max-w-[80%] flex">
                <span className="text-4xl font-bold truncate">
                  {modalData.data.name}
                </span>
                <span className="text-sm">
                  {ModalData.forecast?.Forecast3HoursInterval[
                    ClosestTimestampIndex
                  ].Date ? (
                    <>
                      Last update was{" "}
                      {formatSecondsAgo(
                        ModalData.forecast?.Forecast3HoursInterval[
                          ClosestTimestampIndex
                        ].Date
                      )}
                    </>
                  ) : (
                    "Last update was..."
                  )}
                </span>
              </div>
              <div
                className="bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-800 hover:bg-neutral-200 p-2 rounded-md flex justify-center items-center w-12 h-12 cursor-pointer"
                onClick={() => setModalData({ ...modalData, open: false })}
              >
                <MdClose size={30} />
              </div>
              {/* closeButton */}
            </div>
            <div className="flex items-center justify-around mt-3 p-1.5 gap-3 mx-4 dark:bg-neutral-800 bg-neutral-200 rounded-md shadow">
              <div
                onClick={() => setModalPage(0)}
                className={`${
                  modalPage === 0 && "bg-white dark:bg-black"
                } w-full px-2 py-1 rounded-lg flex-1 text-center cursor-pointer`}
              >
                Forecast
              </div>
              {attributes.enableWebcamsPage && (
                <div
                  onClick={() => setModalPage(1)}
                  className={`${
                    modalPage === 1 && "bg-white dark:bg-black"
                  } w-full px-2 py-1 rounded-lg flex-1 text-center cursor-pointer`}
                >
                  Nearby Webcams
                </div>
              )}
            </div>
            <div className="flex overflow-hidden h-[calc(100%-44px-60px-6px-16px-6px)]">
              <div
                className="flex-grow-0 flex-none mt-4 px-4 w-full overflow-y-auto transition-all"
                style={{ transform: `translateX(-${modalPage * 100}%)` }}
              >
                <CurrentWeather />
                <Forecast24hours />
                <ForecastWeekly modalData={modalData} />
                <div className="relative grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 mt-3 gap-3">
                  <Sunshine modalData={modalData} />
                  <PrecProb modalData={modalData} />
                  <PrecipitationMillimeters modalData={modalData} />
                </div>
              </div>
              {attributes.enableWebcamsPage && (
                <div
                  className="flex-none w-full px-4 transition-all"
                  style={{ transform: `translateX(-${modalPage * 100}%)` }}
                >
                  <WebcamsPage modalData={modalData} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
