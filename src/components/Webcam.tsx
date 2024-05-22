import React from "react";
type WebcamsPageProps = {
  modalData: any;
};

const WebcamsPage = ({ modalData }: WebcamsPageProps) => {
  const [loading, setLoading] = React.useState(true);
  const [webcamList, setWebcamList] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(
      `https://tourism.opendatahub.com/v1/WebcamInfo?pagenumber=1&pagesize=10&latitude=${modalData.data.position[0]}&longitude=${modalData.data.position[1]}&removenullvalues=true`,
    )
      .then((res) => res.json())
      .then((data) => {
        setWebcamList(data);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-2 pb-4 h-full overflow-y-auto">
      {!loading &&
        webcamList.Items.map((cam: any, index: any) => {
          return (
            <div
              key={index}
              onClick={() => window.open(cam.Webcamurl, "_blank")}
              className="bg-white dark:bg-neutral-800 hover:cursor-pointer flex-col md:flex-row dark:hover:bg-opacity-70 hover:bg-opacity-40 shadow rounded-md p-2 flex gap-4"
            >
              <img
                src={cam.ImageGallery[0].ImageUrl}
                alt="No Preview Available"
                className="w-full max-h-[250px] md:w-[250px] md:h-[150px] object-cover rounded-md"
              ></img>
              <div>
                <p className="text-2xl">{cam.Shortname}</p>
                <p className="opacity-60 text-sm">{cam.Id}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WebcamsPage;
