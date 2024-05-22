import { useEffect, useState } from "react";
import Spinner from "./components/utils/Spinner";
import useLiveMapData from "./hooks/state/useLiveMapData";
import BaseMap from "./components/Map";
import Modal from "./components/Modal";
import useAttributes from "./hooks/useAttributes";
function App({
  enableWebcamsPage,
  startingPosition,
  enableBigPopup,
  enableBigPopupTakefullviewport,
}: any) {
  // Load component attributes
  const { attributes } = useAttributes();
  useEffect(() => {
    attributes.enableWebcamsPage =
      (enableWebcamsPage === undefined && true) || enableWebcamsPage;
    attributes.startingPosition =
      (startingPosition === undefined && [46.4892643, 11.3265582]) ||
      JSON.parse(startingPosition);
    attributes.enableBigPopup =
      (enableBigPopup === undefined && true) || enableBigPopup;
    attributes.enableBigPopupTakefullviewport =
      (enableBigPopupTakefullviewport === undefined && false) ||
      enableBigPopupTakefullviewport;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [locations] = useLiveMapData();
  const [modal, setModal] = useState({
    open: false,
    data: {
      name: "Bolzano",
    },
  });
  return (
    <>
      {locations.length !== 0 ? (
        <>
          <div className="relative flex justify-center h-full items-center bg-neutral-700  text-center overflow-hidden">
            <BaseMap
              startingPos={attributes.startingPosition}
              markerList={locations}
              className="w-full h-full overflow-hidden z-0"
              modal={modal}
              setModal={setModal}
            />
            {attributes.enableBigPopup && (
              <Modal modalData={modal} setModalData={setModal} />
            )}
          </div>
        </>
      ) : (
        <div className="flex bg-white dark:bg-neutral-950 text-black dark:text-white h-full justify-center items-center">
          <p className="flex gap-2.5 items-center mx-4 text-clip">
            <Spinner size={26} />
            I'm exploring all the places...
          </p>
        </div>
      )}
    </>
  );
}

export default App;
