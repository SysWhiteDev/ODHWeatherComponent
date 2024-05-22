import React from "react";
import Spinner from "../utils/Spinner";
import {useModalDataStore} from "../../hooks/state/useModalData";
type PrecProbProps = {
  modalData: any;
};

const Sunshine = ({ modalData }: PrecProbProps) => {
  const {ModalData} = useModalDataStore();
  return (
    <>
      <div className="bg-neutral-50 overflow-hidden dark:bg-neutral-800 flex flex-col justify-between shadow rounded-md p-4">
        <p className="text-md text-neutral-700 dark:text-neutral-300 font-light">
          Sunshine hours
        </p>
        <p className="monospace text-3xl font-bold text-neutral-700 dark:text-neutral-300">
          {ModalData && ModalData.forecast ? (
            `${ModalData.forecast.ForeCastDaily.filter((day: any) => new Date(day.Date).getDay() === new Date().getDay())[0].SunshineDuration}h`
          ) : (
            <Spinner size={36} />
          )}
        </p>
      </div>
    </>
  );
};

export default Sunshine;
