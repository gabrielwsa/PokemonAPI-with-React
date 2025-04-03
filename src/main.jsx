import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PokemonApp } from "./PokemonApp";
import "./styles.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokemonApp />
  </StrictMode>
)