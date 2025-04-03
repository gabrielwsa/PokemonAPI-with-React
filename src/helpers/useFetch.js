// Função que busca dados dos pokémons da API
export const useFetch = async() => {
    // URL da API para buscar os primeiros 151 pokémons
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=98`;
    // Faz a requisição para a API
    const response = await fetch(url);
    // Converte a resposta para JSON
    const data = await response.json();

    // Extrai as URLs individuais de cada pokémon
    const pokemonUrls = data.results.map(pokemon => pokemon.url);
    // Busca os dados detalhados de cada pokémon em paralelo
    const pokemons = await Promise.all(
        pokemonUrls.map(async (url) => {
            // Faz requisição para a URL do pokémon
            const response = await fetch(url);
            const pokemonData = await response.json();
            
            // Busca a descrição do pokémon na API de espécies
            const speciesResponse = await fetch(pokemonData.species.url);
            const speciesData = await speciesResponse.json();
            // Encontra a descrição em inglês
            const description = speciesData.flavor_text_entries.find(
                entry => entry.language.name === 'en'
            )?.flavor_text || 'No description available';

            // Retorna um objeto com os dados relevantes do pokémon
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.other['official-artwork'].front_default,
                description: description,
                types: pokemonData.types.map(type => type.type.name),
                stats: pokemonData.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat
                })),
                height: pokemonData.height / 10, // Convertendo para metros
                weight: pokemonData.weight / 10, // Convertendo para kg
                abilities: pokemonData.abilities.map(ability => ability.ability.name),
                moves: pokemonData.moves.slice(0, 5).map(move => move.move.name) // Pegando os 5 primeiros movimentos
            };
        })
    );

    // Retorna a lista de pokémons com seus dados
    return pokemons;
}