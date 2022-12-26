import { useNavigate } from "react-router-dom";

const Pokemon = ({ pokemon }) => {
  // instances
  const navigate = useNavigate();

  return (
    <div
      className="bg-slate-300 py-2 w-[190px] md:w-auto rounded-md cursor-pointer"
      onClick={() => {
        navigate(`/pokemon-details/${pokemon.id}`);
      }}
    >
      <div className="h-44">
        <img
          src={pokemon.sprites?.other?.home?.front_default}
          alt={pokemon.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="px-4">
        <p className="text-yellow-700">{`#${pokemon.id}`}</p>
        <p className="capitalize text-slate-900 font-semibold text-lg">
          {pokemon.name}
        </p>
        <div className="flex justify-start gap-x-2 w-full mt-2">
          {pokemon.types.map((type) => {
            return (
              <span
                key={type.type.name}
                className="capitalize px-3 py-2 bg-slate-700 rounded-full text-white text-sm  border border-gray-9"
              >
                {type.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
