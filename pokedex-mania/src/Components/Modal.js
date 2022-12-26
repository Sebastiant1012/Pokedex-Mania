import { useEffect, useState } from "react";

const Modal = ({ url, setShowModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  
  //Obtiens les abilities par Id dans le premier render
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none w-screen h-screen shadow-2xl">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-300 outline-none focus:outline-none">
          <div className=" p-3 lg:p-5 w-[280px] md:w-[380px] xl:w-[580px] h-[350px]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl lg:text-2xl font-semibold capitalize text-slate-900">
                {data?.name}
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl flex justify-center items-center bg-slate-300 rounded-full">
                  x
                </span>
              </button>
            </div>
            {isLoading ? (
              <div className="flex w-full justify-center items-center h-full min-h-[300px]">
                <div className="w-16 h-16 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div>
                <p className="my-2 text-slate-700 font-semibold">
                  Generation:{" "}
                  <span className="text-yellow-600">
                    {data?.generation?.name}
                  </span>
                </p>
                <div className="text-sm md:text-base text-slate-700">
                  {
                    data?.effect_entries?.find((e) => e.language.name === "en")
                      .effect
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
