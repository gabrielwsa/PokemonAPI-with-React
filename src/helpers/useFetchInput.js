
export const useFetch = async(textoToRender) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${textoToRender}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}