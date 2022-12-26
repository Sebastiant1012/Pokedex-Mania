import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Components/Modal";

const PokemonDetails = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  // instances
  const navigate = useNavigate();
  const { id } = useParams();

 
  //Obtiens pokemon informatios par Id dans le premier render
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-full min-h-[500px]">
        <div className="w-16 h-16 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main>
      <section>
        <div className="md:flex items-center md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-4 px-2 mt-2">
          <button
            className="bg-yellow-500 text-white px-1 py-2 rounded-md md:w-36 w-36 h-10 font-bold"
            onClick={() => navigate("/")}
          >
            Back to home
          </button>
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white md:text-center my-3 lg:my-4 xl:my-6 capitalize flex-grow">
            {data.name}
            <span className="ml-2 text-yellow-500">{`#${data?.id}`}</span>
          </h1>
          <div className="flex items-center gap-x-2">
            <button
              className="bg-yellow-500 text-white px-4 md:py-2 rounded-md w-16 md:w-20 h-10 font-bold"
              disabled={Number(id) === 1}
              onClick={() => navigate(`/pokemon-details/${Number(id) - 1}`)}
            >
              Prev
            </button>
            <button
              className="bg-yellow-500 text-white px-4 md:py-2 rounded-md w-16 md:w-20 h-10 font-bold"
              onClick={() => navigate(`/pokemon-details/${Number(id) + 1}`)}
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto -mt-10 lg:-mt-12 mb-2 md:mb-4">
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <img
              src={data.sprites?.other?.home?.front_default}
              alt={data.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="text-center text-lg">
          <p className="text-white">
            Height: <span className="text-yellow-500">{data.height}</span>
          </p>
          <p className="text-white">
            Weight: <span className="text-yellow-500">{data.weight}</span>
          </p>

          {/* Calcule le total de stats de base*/}
          <p className="text-white">
            Total base stat:{" "}
            <span className="text-yellow-500">
              {data.stats.reduce(
                (acc, curr) => acc + Number(curr.base_stat),
                0
              )}
            </span>
          </p>

          <p className="text-white">
            Base experience:{" "}
            <span className="text-yellow-500">{data.base_experience}</span>
          </p>
        </div>

        <div>
          <h2 className="text-lg lg:text-2xl xl:text-3xl font-bold text-white text-center my-3 lg:my-4 xl:my-6 capitalize flex-grow">
            Abilities
          </h2>
          <div className="flex flex-wrap justify-center items-center md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
            {data.abilities.map((ability) => {
              return (
                <span
                  key={ability.ability.name}
                  className="capitalize px-3 py-2 bg-slate-500 rounded-full text-white text-sm  border border-gray-9 mx-1 cursor-pointer"
                  onClick={() => {
                    setUrl(ability.ability.url);
                    setShowModal(true);
                  }}
                >
                  {ability.ability.name}
                </span>
              );
            })}
          </div>
        </div>

        <div className="md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto p-2 md:p-4 mt-3 md:mt-6">
          <table>
            <thead>
              <tr>
                <th className="text-yellow-600">Name</th>
                <th className="text-yellow-600">Base Stat</th>
                <th className="text-yellow-600">Effort</th>
              </tr>
            </thead>

            <tbody>
              {data.stats.map((stat) => {
                return (
                  <tr key={stat.stat.name}>
                    <td>{stat.stat.name}</td>
                    <td>{stat.base_stat}</td>
                    <td>{stat.effort}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      {showModal && <Modal url={url} setShowModal={setShowModal} />}
    </main>
  );
};

export default PokemonDetails;
