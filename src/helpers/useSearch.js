// Função para buscar pokémons que contenham o termo de busca
export const useSearch = async (term) => {
    try {
        // console.log('Iniciando busca com termo:', term);
        
        // Usa a rota de busca específica da API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`);
        if (!response.ok) {
            // console.log('Pokémon não encontrado:', term);
            return [];
        }
        
        const pokemonData = await response.json();
        console.log('Pokémon encontrado:', pokemonData.name);
        
        // Retorna o pokémon encontrado no formato esperado
        return [{
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites?.other?.['official-artwork']?.front_default || pokemonData.sprites.front_default,
            types: pokemonData.types.map(type => type.type.name),
            stats: pokemonData.stats.map(stat => ({
                name: stat.stat.name,
                value: stat.base_stat
            })),
            height: pokemonData.height,
            weight: pokemonData.weight,
            abilities: pokemonData.abilities.map(ability => ability.ability.name),
            moves: pokemonData.moves.slice(0, 5).map(move => move.move.name)
        }];
    } catch (error) {
        // console.error('Erro ao buscar pokémon:', error);
        return [];
    }
} 