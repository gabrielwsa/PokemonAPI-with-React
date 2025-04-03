// Importação do hook useState do React
import { useState, useEffect } from "react";
import { useSearch } from "../helpers/useSearch";

// Componente de input de busca
export const SearchInput = ({ onSearch }) => {
    // Estado local para controlar o valor do input
    const [searchTerm, setSearchTerm] = useState("");
    // Estado para controlar o carregamento
    const [isLoading, setIsLoading] = useState(false);
    

    // Função que é chamada quando o valor do input muda
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Se o campo estiver vazio, limpa a busca
        if (!value.trim()) {
            onSearch("");
            return;
        }
    }

    // Função para buscar pokémon
    const searchPokemon = async (value) => {
        if (!value.trim()) return;
        
        setIsLoading(true);
        try {
            const result = await useSearch(value);
            // Se encontrou o pokémon, atualiza a lista
            if (result && result.length > 0) {
                onSearch(value);
            } else {
                onSearch("");
            }
        } catch (error) {
            // console.error("Erro ao buscar pokémon:", error);
            onSearch("");
        } finally {
            setIsLoading(false);
        }
    }

    // Efeito para buscar pokémon quando o termo de busca mudar
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchTerm.trim()) {
                await searchPokemon(searchTerm);
            }
        }, 500); // Debounce de 500ms

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Renderização do input de busca
    return (
        <div style={{ position: 'relative' }}>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleChange} 
                placeholder="Buscar pokemon" 
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '300px',
                    fontSize: '16px',
                    paddingRight: isLoading ? '40px' : '10px'
                }}
            />
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    border: '3px solid #f3f3f3',
                    borderTop: '3px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
            )}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
}
