// Importação do hook useState do React
import { useState } from "react";
import { PokemonDetails } from "./PokemonDetails";

// Componente que exibe um card de pokémon
export const PokemonCard = ({ pokemon }) => {
    // Estado para controlar a visibilidade dos detalhes
    const [showDetails, setShowDetails] = useState(false);

    // Função que é chamada quando o card é clicado
    const handleClick = () => {
        setShowDetails(true);
    };

    // Função para fechar os detalhes
    const handleCloseDetails = () => {
        setShowDetails(false);
    };

    // Renderização do card
    return (
        <>
            {/* Card do pokémon */}
            <div 
                className="pokemon-card"
                onClick={handleClick}
                style={{
                    width: '200px',
                    padding: '15px',
                    margin: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    transition: 'transform 0.2s',
                    ':hover': {
                        transform: 'scale(1.05)'
                    }
                }}
            >
                {/* Imagem do pokémon */}
                <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                    }}
                />
                {/* Nome do pokémon */}
                <h3 style={{ 
                    textAlign: 'center', 
                    textTransform: 'capitalize',
                    margin: '10px 0'
                }}>
                    {pokemon.name}
                </h3>
                {/* Container dos tipos do pokémon */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '5px',
                    marginBottom: '10px'
                }}>
                    {/* Mapeia os tipos do pokémon para criar badges */}
                    {pokemon.types.map(type => (
                        <span 
                            key={type}
                            style={{
                                padding: '5px 10px',
                                borderRadius: '15px',
                                backgroundColor: '#f0f0f0',
                                fontSize: '12px',
                                textTransform: 'capitalize',
                                backgroundColor: type === 'grass' ? '#568203' : type === 'fire' ? '#fd5c63' : type === 'water' ? '#7CB9E8' : type === 'poison' ? '#DDA0DD' : type === 'electric' ? '#FFD700' : type === 'psychic' ? '#FF69B4' : type === 'ice' ? '#98D8D8' : type === 'dragon' ? '#7038F8' : type === 'dark' ? '#705848' : type === 'fairy' ? '#EE99AC' : 'white'
                            }}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </div>

            {/* Modal de detalhes do pokémon */}
            {showDetails && (
                <PokemonDetails 
                    pokemon={pokemon} 
                    onClose={handleCloseDetails} 
                />
            )}
        </>
    );
};