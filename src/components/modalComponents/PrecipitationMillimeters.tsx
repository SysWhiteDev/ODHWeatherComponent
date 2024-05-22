import Spinner from "../utils/Spinner";
import {useModalDataStore} from "../../hooks/state/useModalData";

type PrecProbProps = {
  modalData: any;
};

const PrecipitationMillimeters = ({ modalData }: PrecProbProps) => {
  const {ModalData, ClosestTimestampIndex} = useModalDataStore();

  return (
    <>
      <div className="bg-neutral-50 overflow-hidden dark:bg-neutral-800 flex flex-col justify-between shadow rounded-md p-4">
        <p className="text-md text-neutral-700 dark:text-neutral-300 font-light">
          Millimeters of Precipitation
        </p>
        <p className="monospace text-3xl font-bold text-neutral-700 dark:text-neutral-300">
          {ModalData && ModalData.forecast ? (
            `${ModalData.forecast.Forecast3HoursInterval[ClosestTimestampIndex].Precipitation}mm`
          ) : (
            <Spinner size={36} />
          )}
        </p>
      </div>
    </>
  );
};

export default PrecipitationMillimeters;
