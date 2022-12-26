import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PokemonDetails from "./Pages/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-details/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
