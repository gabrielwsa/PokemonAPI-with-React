import { useState, useEffect, useCallback } from "react";
import { useFetch } from "../helpers/useFetch";
import { useSearch } from "../helpers/useSearch";
import { PokemonCard } from "./PokemonCard";
import { Loading } from "./Loading";

export const PokemonsList = ({ searchTerm }) => {
    // Estado para armazenar todos os pokémons
    const [pokemons, setPokemons] = useState([]);
    // Estado para armazenar os pokémons filtrados
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    // Estado para controlar o carregamento
    const [isLoading, setIsLoading] = useState(true);
    // Estado para controlar o carregamento da busca
    const [isSearching, setIsSearching] = useState(false);

    // Função para carregar todos os pokémons
    const loadPokemons = useCallback(async () => {
        try {
            setIsLoading(true);
            const pokemonsData = await useFetch();
            setPokemons(pokemonsData);
            setFilteredPokemons(pokemonsData);
        } catch (error) {
            console.error('Erro ao carregar pokémons:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Efeito que é executado uma vez quando o componente é montado
    useEffect(() => {
        loadPokemons();
    }, [loadPokemons]);

    // Função de busca com debounce
    const searchPokemon = useCallback(async (term) => {
        if (!term) {
            setFilteredPokemons(pokemons);
            return;
        }

        setIsSearching(true);
        try {
            const pokemonsData = await useSearch(term);
            if (pokemonsData) {
                setFilteredPokemons(pokemonsData);
            } else {
                setFilteredPokemons([]);
            }
        } catch (error) {
            console.error('Erro ao buscar pokémon:', error);
            setFilteredPokemons([]);
        } finally {
            setIsSearching(false);
        }
    }, [pokemons]);

    // Efeito que é executado quando o termo de busca muda
    useEffect(() => {
        const timer = setTimeout(() => {
            searchPokemon(searchTerm);
        }, 500); // Debounce de 500ms

        return () => clearTimeout(timer);
    }, [searchTerm, searchPokemon]);

    // Renderização da lista de pokémons
    return (
        // Container principal com padding
        <div style={{ padding: '20px' }}>
            {/* Container dos cards de pokémon com layout flexível */}
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                gap: '20px'
            }}>
                {/* Renderização condicional: mostra loading, pokémons filtrados ou mensagem de erro */}
                {(isLoading || isSearching) ? (
                    <Loading />
                ) : filteredPokemons.length > 0 ? (
                    // Mapeia os pokémons filtrados para criar os cards
                    filteredPokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                ) : (
                    // Mensagem exibida quando nenhum pokémon é encontrado
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '20px',
                        color: '#666'
                    }}>
                        {searchTerm ? 'Nenhum pokémon encontrado' : 'Carregando pokémons...'}
                    </div>
                )}
            </div>
        </div>
    )
}