import { useEffect, useState } from "react";
import Pokemon from "../Components/Pokemon";

const Home = () => {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(null);
  // const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
   
    //Obtiens 20 pokemon de l'API dans le premier Render
    const array = Array.from({ length: 20 }, (_, i) => i + count);
    async function fetchData() {
      const dataArray = array.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
      });
      const data = await Promise.all(dataArray);
      return data;
    }
    fetchData().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, [count]);

  
  //Chercher pokemon avec ID
  const handleSearch = async () => {
    if (!searchText) return;

    setIsLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchText}`
    );
    const data = await response.json();
    setSearchData(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-full min-h-[500px]">
        <div className="w-16 h-16 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (searchData) {
    return (
      <main className="p-2 lg:p-4 xl:p-6">
        <div className="flex justify-around items-center max-w-xl mx-auto mb-4">
          <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white text-center my-3 lg:my-4 xl:my-6">
            Pokedex Mania Search
          </h1>
          <button
            className="bg-yellow-500 text-white px-1 py-2 rounded-md w-36 h-10 font-bold"
            onClick={() => {
              setSearchData(null);
              setSearchText("");
            }}
          >
            Clear Search
          </button>
        </div>
        <div className="w-[250px] mx-auto">
          <Pokemon pokemon={searchData} />
        </div>
      </main>
    );
  }

  return (
    <main className="p-2 lg:p-4 xl:p-6">
      <section className="lg:flex justify-around my-3 lg:my-4 xl:my-6 lg:max-w-2xl xl:max-w-[1200px] mx-auto items-center">
        <section>
          <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white ">
            Pokedex Mania
          </h1>
        </section>
        <div className="flex gap-x-2 items-center my-2 lg:m-0 ">
          <input
            placeholder="Insert name/id"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
            className="w-42 h-10 px-4 bg-slate-50 border-none focus:outline-none rounded-md text-slate-900"
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md font-bold"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {/* <div>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="px-3 py-2 bg-slate-100 cursor-pointer rounded-md "
          >
            <option value="id">ID</option>
            <option value="type">Type</option>
            <option value="generation">Generation</option>
          </select>
        </div> */}
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 lg:max-w-2xl xl:grid-cols-5 xl:max-w-[1200px] gap-y-4 xl:gap-x-3 mx-auto">
        {data.map((pokemon) => {
          return <Pokemon key={pokemon.id} pokemon={pokemon} />;
        })}
      </section>
      <section className="xl:max-w-[1200px] lg:max-w-2xl mx-auto lg:flex justify-around mt-4 lg:mt-8 xl:mt-10 mb-6">
        <div className="space-x-2">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md font-bold"
            onClick={() => {
              setCount((prev) => prev - 20);
            }}
          >
            Prev
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md font-bold"
            onClick={() => {
              setCount((prev) => prev + 20);
            }}
          >
            Next
          </button>
        </div>
        <div className="flex justify-between gap-x-2 items-center my-4 lg:m-0">
          <input
            placeholder="Insert page number"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="w-42 h-8 px-4 bg-slate-50 border-none focus:outline-none text-slate-900 rounded-md"
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md h-10 lg:h-auto font-bold"
            onClick={() => {
              if (page) {
                setCount(page * 20);
              }
            }}
          >
            Go To Page
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
