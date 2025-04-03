// Componente que exibe os detalhes do pokémon
export const PokemonDetails = ({ pokemon, onClose }) => {
    // Função para formatar o nome do stat
    const formatStatName = (name) => {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
            }}>
                {/* Botão de fechar */}
                <button 
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer'
                    }}
                >
                    ✕
                </button>

                {/* Imagem do pokémon */}
                <div style={{ textAlign: 'center' }}>
                    <img 
                        src={pokemon.image} 
                        alt={pokemon.name}
                        style={{
                            width: '200px',
                            height: 'auto'
                        }}
                    />
                </div>

                {/* Nome e tipos */}
                <h2 style={{ 
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    margin: '10px 0'
                }}>
                    {pokemon.name}
                </h2>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    {pokemon.types.map(type => (
                        <span 
                            key={type}
                            style={{
                                padding: '5px 15px',
                                borderRadius: '20px',
                                backgroundColor: '#f0f0f0',
                                textTransform: 'capitalize'
                            }}
                        >
                            {type}
                        </span>
                    ))}
                </div>

                {/* Estatísticas */}
                <div style={{ marginBottom: '20px' }}>
                    <h3>Estatísticas</h3>
                    {pokemon.stats.map(stat => (
                        <div key={stat.name} style={{ marginBottom: '10px' }}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                marginBottom: '5px'
                            }}>
                                <span>{formatStatName(stat.name)}</span>
                                <span>{stat.value}</span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '10px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '5px'
                            }}>
                                <div style={{
                                    width: `${(stat.value / 255) * 100}%`,
                                    height: '100%',
                                    backgroundColor: '#3498db',
                                    borderRadius: '5px'
                                }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Informações básicas */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px'
                }}>
                    <div>
                        <h4>Altura</h4>
                        <p>{pokemon.height}m</p>
                    </div>
                    <div>
                        <h4>Peso</h4>
                        <p>{pokemon.weight}kg</p>
                    </div>
                </div>

                {/* Habilidades */}
                <div style={{ marginBottom: '20px' }}>
                    <h3>Habilidades</h3>
                    <div style={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>
                        {pokemon.abilities.map(ability => (
                            <span 
                                key={ability}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '15px',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {ability}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Movimentos */}
                <div>
                    <h3>Movimentos</h3>
                    <div style={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>
                        {pokemon.moves.map(move => (
                            <span 
                                key={move}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '15px',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {move}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}; 